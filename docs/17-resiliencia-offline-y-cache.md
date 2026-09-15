# 17 · Resiliencia, trabajo sin conexión y caché

> **Estado: diseñado, no construido.** Este documento define cómo la aplicación tolerará los
> cortes de red y trabajará sin conexión. Se escribe antes de programar para que la arquitectura
> ([`07-arquitectura.md`](07-arquitectura.md)) y la PWA ([ADR-016](adr/ADR-016-flutter-web-pwa.md))
> lo soporten desde el primer día. La implementación llega con la aplicación.

---

## 1. Qué se quiere lograr

| Requisito (lo que pediste) | Cómo lo cubre este diseño |
|---|---|
| Resiliente a la reconexión | Cola de operaciones que se reintenta sola al volver la señal (§5, §6) |
| Caché para **todos** los datos | Copia local de los datos que la persona ya vio, en el dispositivo (§4) |
| Que se active en la desconexión | Al detectar que no hay red, la app lee de la caché y encola las escrituras (§4, §5) |
| Caché purgable por el usuario | Apartado en **Configuración → Datos sin conexión** para vaciarla (§7) |

El objetivo de fondo: **en el taller la señal va y viene, y el trabajo no puede parar por eso.**
Registrar una venta o un gasto debe funcionar aunque en ese instante no haya internet.

---

## 2. El modelo de datos ya juega a favor

Dos decisiones ya tomadas hacen que el trabajo sin conexión sea **seguro**, no un parche:

- **Doble fecha** ([`04-modelo-de-datos.md`](04-modelo-de-datos.md) §1): `fecha_movimiento` es
  cuándo ocurrió; `creado_en` es cuándo se digitó. Un movimiento hecho sin señal se **sincroniza**
  cuando vuelve la conexión, pero se **contabiliza** el día en que realmente pasó. La cola sin
  conexión no distorsiona la contabilidad. Es exactamente lo que anticipó
  [ADR-007](adr/ADR-007-pwa.md) y lo que sostiene [ADR-016](adr/ADR-016-flutter-web-pwa.md).
- **Solo escritura** ([ADR-004](adr/ADR-004-base-solo-escritura.md)): nada se edita ni se borra;
  se agrega. Reproducir la cola en orden nunca "pisa" un dato anterior, así que los conflictos de
  sincronización se reducen al mínimo (§8).

---

## 3. Las tres capas

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Cascarón de la app (Service Worker)                        │
│    HTML, CSS, JS e íconos cacheados → la app ABRE sin red      │
├──────────────────────────────────────────────────────────────┤
│ 2. Caché de datos (IndexedDB en el dispositivo)               │
│    Lo que ya se consultó: movimientos, pedidos, catálogos...   │
├──────────────────────────────────────────────────────────────┤
│ 3. Cola de escrituras pendientes (IndexedDB)                  │
│    Cada registro hecho sin red espera aquí su turno de subir   │
└──────────────────────────────────────────────────────────────┘
```

| Capa | Tecnología prevista | Qué guarda | Vida |
|---|---|---|---|
| Cascarón | Service Worker de Flutter Web (`flutter_service_worker.js`) | Archivos de la app | Hasta la próxima versión |
| Caché de datos | IndexedDB | Respuestas ya leídas | Hasta purgar o expirar |
| Cola de escritura | IndexedDB | Operaciones sin confirmar | Hasta subir con éxito |

---

## 4. Lecturas sin conexión

- **Con red:** la app pide a `prisma_api` y, de paso, **guarda una copia** en la caché de datos
  (estrategia *stale-while-revalidate*: muestra lo cacheado al instante y refresca por detrás).
- **Sin red:** la app lee directamente de la caché y marca la pantalla con un aviso visible
  (**"Sin conexión — mostrando datos guardados"**) para que nadie confunda una cifra vieja con la
  actual.
- **Qué se cachea:** lo que la persona ya consultó (su día a día). No se precargan datos que su
  rol no puede ver: la caché **nunca** contiene más de lo que Row Level Security ya le entregó a
  través de la API ([ADR-012](adr/ADR-012-identidad-a-postgres.md)).

---

## 5. Escrituras sin conexión (la cola)

1. La persona registra un movimiento; la app lo valida localmente y lo **encola** en IndexedDB.
2. La interfaz confirma con un estado **"Pendiente de sincronizar"** (no un "listo" que mentiría).
3. Cuando vuelve la red, la cola se **envía en orden**, una operación a la vez.
4. Cada operación subida con éxito se retira de la cola; si falla, se reintenta con espera
   creciente (*backoff*).

> **Idempotencia:** cada operación encolada lleva un identificador propio (UUID generado en el
> dispositivo). Si la señal se cae justo después de subir pero antes de confirmar, el reintento
> **no duplica** el registro, porque el servidor reconoce ese identificador.

---

## 6. Detección de conexión y reconexión

| Estado | Cómo se detecta | Qué hace la app |
|---|---|---|
| **En línea** | `navigator.onLine` + un *ping* liviano a `prisma_api` | Lee en vivo; vacía la cola pendiente |
| **Sin conexión** | Falla el *ping* o `offline` | Lee de la caché; encola escrituras; muestra el aviso |
| **Reconectando** | Vuelve `online` | Reintenta la cola con *backoff*; al terminar, quita el aviso |

`navigator.onLine` por sí solo miente a veces (dice "en línea" con wifi sin salida). Por eso la
señal real es un *ping* corto al servidor, no solo el estado del navegador.

---

## 7. Purga de la caché por el usuario

En **Configuración → Datos sin conexión**, la persona ve y controla su caché:

| Elemento | Qué muestra / hace |
|---|---|
| Espacio usado | Cuánto ocupa la caché de datos en el dispositivo |
| Última sincronización | Cuándo se actualizó por última vez con el servidor |
| Operaciones pendientes | Cuántas escrituras esperan subir (§5) |
| **Vaciar caché de datos** | Borra la copia local de lecturas. Se vuelve a llenar al reconectar |
| **Forzar re-sincronización** | Descarta lo cacheado y baja todo de nuevo |

> **Guardia importante:** vaciar la caché **no** descarta la **cola de escrituras pendientes** sin
> una advertencia explícita. Borrar operaciones sin subir es perder registros que nunca llegaron
> al servidor. Si hay pendientes, la app avisa y pide confirmar por separado.

---

## 8. Conflictos y su resolución

Gracias al diseño de solo escritura, los conflictos son raros y su manejo es simple:

| Situación | Resolución |
|---|---|
| Dos dispositivos registran movimientos distintos sin red | Ambos entran al subir; son filas nuevas, no se pisan |
| Se corrige un dato hecho sin conexión | Contra-asiento (§5.3 del doc 04), nunca edición |
| El servidor rechaza una operación de la cola (validación, permiso) | Queda marcada como **"No sincronizada"** con el motivo; la persona la revisa, no se pierde en silencio |

No hay "última escritura gana" que borre trabajo: **nada se sobrescribe**, así que no hay nada que
perder en una fusión.

---

## 9. Seguridad de los datos en el dispositivo

Trabajar sin conexión implica guardar datos en el equipo, y eso tiene un costo que hay que nombrar:

- **RLS protege el servidor, no el dispositivo.** Lo que la caché guarda ya pasó por RLS, pero una
  vez en el equipo, quien tenga acceso al equipo desbloqueado puede verlo. Por eso solo se cachea
  lo que ese rol ya podía ver, y la caché se puede purgar (§7).
- **Cerrar sesión limpia la caché de datos y la cola confirmada.** No debe quedar información del
  negocio en un dispositivo compartido tras salir.
- **Nada de secretos en la caché.** Contraseñas y tokens de larga vida no se cachean; la sesión se
  maneja con los mecanismos del proveedor ([ADR-009](adr/ADR-009-login-por-usuario.md)).

Este punto se cruza con [`11-riesgos-y-proteccion-de-datos.md`](11-riesgos-y-proteccion-de-datos.md)
y debe revisarse allí cuando se implemente.

---

## 10. Lo que este diseño NO cubre (todavía)

| Tema | Estado |
|---|---|
| Cifrado en reposo de la caché local | A evaluar en la fase de construcción (§9) |
| Sincronización en segundo plano (*Background Sync API*) | Deseable; soporte desigual en iOS |
| Trabajo colaborativo en tiempo real | Fuera de alcance; el negocio es de pocas personas |
| Límite de tamaño de la caché y expiración por antigüedad | Se define con datos reales de uso |

---

## 11. Estado y siguiente paso

Diseño listo; **implementación pendiente de que exista la aplicación web** (Flutter Web, ver
[ADR-011](adr/ADR-011-stack-flutter-dart.md)). Cuando se andamie la app, esta especificación se
traduce en: el service worker que genera Flutter Web para el cascarón, una capa de caché y cola
sobre `cliente_api.dart` —el único punto de salida a la red del front, coherente con la
arquitectura hexagonal, [ADR-002](adr/ADR-002-arquitectura-hexagonal.md)— y la pantalla de
Configuración del §7.

---

### 🧭 Navegación

**⬅️ Anterior:** [16 · Base de datos: snapshots y datos de prueba](16-base-de-datos-y-snapshots.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [18 · Distribución multiplataforma y automatización](18-distribucion-y-pipelines.md)
