# 16 · Base de datos: snapshots y datos de prueba

> **Estado: construido.** Esta es la primera pieza de código ejecutable del proyecto.
> Convierte el esquema que describe [`04-modelo-de-datos.md`](04-modelo-de-datos.md) en una
> base de datos real, reproducible en cualquier ambiente con un comando.

> ### 📍 Estos archivos viven en `prisma_db`, no aquí
>
> Desde el [ADR-025](adr/ADR-025-cuatro-repositorios.md), `supabase/` y `scripts/db/` tienen
> repositorio propio, `prisma_db`, que en disco va en `repositories/backend-db`. **Todas las rutas
> de este documento son relativas a `prisma_db`.** Antes vivieron dentro de `prisma_api`
> ([ADR-023](adr/ADR-023-tres-repositorios.md)).
>
> Separarlos de la API tiene un precio que vale la pena repetir: **una migración y el código que
> depende de ella ya no entran en el mismo commit.** Por eso la migración se publica antes que la
> API que la necesita, y compatible con la API que ya corre. Al revés se produce el fallo más caro
> de todos: una versión desplegada esperando una columna que todavía no existe.
>
> Lo que sí se queda aquí es **este documento** y el [modelo de datos](04-modelo-de-datos.md):
> decidir qué debe existir y ejecutar el cambio son dos cosas distintas.

---

## 1. Qué resuelve

| Necesidad | Cómo se resuelve |
|---|---|
| Recrear la BD en otro ambiente sin problemas | **Migraciones versionadas** (`supabase/migrations/`) |
| Recrear la BD localmente para desarrollar | `supabase db reset` (migraciones + seed) |
| Datos de prueba realistas y estables | **Seed fijo** (`supabase/seed.sql`), los 5 usuarios del mockup |
| Datos de volumen para pruebas de carga | **Generador parametrizable** (`scripts/db/generar-datos-prueba.sql`) |
| Copia puntual del estado actual | **Snapshot** (`scripts/db/snapshot.ps1`) |

La idea de fondo: **el esquema vive en migraciones, no en un dump.** Un dump es una foto de
un momento; las migraciones son la receta reproducible. Los snapshots se usan para llevarse los
**datos**, no para definir la estructura.

---

## 2. Mapa de archivos

```
supabase/
  config.toml                          Configuración de la pila local
  migrations/
    20260915120000_esquema_inicial.sql Todo el esquema (doc 04 + tabla exportaciones del doc 13)
  seed.sql                             Datos de prueba fijos y deterministas

scripts/db/
  reset-local.ps1                      Recrea la BD local (migraciones + seed)
  snapshot.ps1                         Toma un snapshot (esquema y/o datos) con marca de tiempo
  restore.ps1                          Restaura un snapshot .sql sobre una BD destino
  generar-datos-prueba.ps1             Wrapper del generador de volumen (opcional)
  generar-datos-prueba.sql             Generador parametrizable y categórico

snapshots/                             Salida de snapshot.ps1 (ignorada por git)
```

---

## 3. Requisitos

| Herramienta | Para qué | Nota |
|---|---|---|
| [Supabase CLI](https://supabase.com/docs/guides/cli) | Migraciones, seed, dump, reset | `supabase --version` |
| Docker Desktop | Correr la BD local (`supabase start`) | Requerido solo para el ambiente local |
| `psql` | Restaurar snapshots y generar volumen | Viene con PostgreSQL; el CLI de Supabase también lo trae |

---

## 4. Recrear la BD **localmente** (el caso más común)

```powershell
supabase start                 # levanta PostgreSQL + Auth + Studio en Docker
./scripts/db/reset-local.ps1   # aplica migraciones y carga el seed
```

Al terminar tienes la base completa con datos de prueba y estos usuarios listos para entrar
(los mismos del [mockup](../mockup/prisma-mockup.html), ver README §3):

| Usuario | Contraseña | Tipo | Estado |
|---|---|---|---|
| `yuliana` | `prisma2026` | Gerencia | Activa |
| `marcela` | `prisma2026` | Operación | Activa |
| `daniela` | `prisma2026` | Operación | Activa |
| `camila` | `temporal01` | Operación | Clave temporal (obliga a cambiarla) |
| `lorena` | `prisma2026` | Operación | **Desactivada** (prueba del rechazo) |

> El login usa el **correo sintético** `usuario@usuarios.prismamy.co` por dentro
> ([ADR-009](adr/ADR-009-login-por-usuario.md)); nunca se teclea el correo.

---

## 5. Recrear la BD en **otro ambiente** (qa, uat, prod, otro equipo)

El esquema se aplica con migraciones, no con un dump:

> **Las migraciones se promueven en orden: dev → qa → uat → prod, y una ya aplicada no se
> edita.** Los cuatro ambientes y el procedimiento completo están en
> [`19-ambientes-y-entrega.md`](19-ambientes-y-entrega.md) §2 y en
> [ADR-013](adr/ADR-013-cuatro-ambientes.md). Aquí va solo el comando.

```powershell
supabase link --project-ref <ref-del-proyecto>   # una sola vez
supabase db push                                  # aplica las migraciones al remoto
```

`db push` aplica solo lo que falte, así que es seguro correrlo de nuevo tras cada migración
nueva. **El seed NO se aplica a remoto** (crea usuarios con contraseñas conocidas): en
producción los usuarios reales los crea Gerencia desde la app.

---

## 6. Snapshots (llevarse el estado actual)

```powershell
# Esquema + datos de la BD local, con marca de tiempo, en /snapshots
./scripts/db/snapshot.ps1

# Del proyecto remoto vinculado
./scripts/db/snapshot.ps1 -Target linked

# Solo datos
./scripts/db/snapshot.ps1 -DataOnly
```

Restaurar sobre una base con el esquema ya aplicado:

```powershell
./scripts/db/restore.ps1 -File .\snapshots\20260915_120000_data.sql
```

> **Snapshot ≠ respaldo del usuario.** Esto es una herramienta de desarrollo. El respaldo
> exportable para Gerencia (con manifiesto y verificación) es otra cosa y se especifica en
> [`13-respaldo-y-exportacion.md`](13-respaldo-y-exportacion.md). No confundir.

---

## 7. Datos de prueba de volumen (opcional)

El seed fijo es pequeño y estable. Para pruebas de carga hay un generador **categórico**:
cada conteo controla una categoría y un `0` la omite.

```powershell
./scripts/db/generar-datos-prueba.ps1                          # 30 clientes, 80 pedidos, 400 movimientos
./scripts/db/generar-datos-prueba.ps1 -Movimientos 5000        # solo movimientos
./scripts/db/generar-datos-prueba.ps1 -Clientes 200 -Pedidos 0 -Movimientos 0
```

Requiere el seed fijo cargado (usa sus cuentas, categorías, productos y a `yuliana` como autor).
Corre `reset-local.ps1` antes si quieres partir de cero.

---

## 8. Sembrar usuarios de prueba (nota técnica)

`seed.sql` inserta directamente en `auth.users` y `auth.identities`. Ese esquema pertenece a
Supabase (GoTrue) y **sus columnas pueden cambiar entre versiones del CLI**. Si el bloque de
auth falla al correr `db reset`:

1. Revisa las columnas que tu versión exige: `\d auth.users` y `\d auth.identities` en `psql`.
2. Ajusta el `INSERT` a esas columnas (lo más habitual es que `auth.identities` pida o sobre
   `provider_id`).
3. Alternativa robusta: crear los usuarios con la API de administración de Supabase y luego
   insertar solo las filas de `public.usuarios` con esos `id`.

El seed desactiva los triggers durante la carga (`session_replication_role = replica`) para
que sea limpio y rápido; los reactiva al final.

---

## 9. Límites conocidos (heredados del doc 04)

- **Tablas sin `CREATE TABLE` en la doc:** `adjuntos`, `cotizaciones` y `cotizacion_lineas`
  aparecen en el catálogo y el diagrama del doc 04 pero no tienen definición escrita. **No se
  inventaron**: quedan pendientes de especificar antes de agregarlas a una migración.
- **Auditoría de `usuarios`:** el doc 04 §5.4 dice que necesita una variante propia del trigger
  (detecta `desactivado_en`, no `anulado_en`) y no la especifica. Por eso `usuarios` aún no
  tiene trigger de auditoría de fila.
- **Política RLS de `exportaciones`:** el doc 13 §7 dice "acceso exclusivo de Gerencia" pero no
  escribe la política; en la migración se creó una coherente con el patrón, marcada como tal.

Cada uno de estos puntos está comentado en el propio SQL para que no pase desapercibido.

---

## 10. Tareas programadas dentro de la base

Dos tablas del modelo se limpian solas. Van aquí y no solo en el doc 04 porque **una tarea
programada que nadie mira es una tarea que se cae en silencio**, y quien administra la base es
quien tiene que saber que existen.

| Tarea | Tabla | Cuándo corre | Retención |
|---|---|---|---|
| `purgar_peticiones_idempotentes` | `peticiones_idempotentes` | `20 3 * * *` — cada día a las 3:20 | 72 horas |
| `purgar_nonces_vistos` | `nonces_vistos` | `*/10 * * * *` — cada diez minutos | 5 minutos |

### 10.1 Qué hace falta en cada ambiente

`pg_cron` es una extensión y **se habilita una sola vez por ambiente**, desde el panel de Supabase
o con `CREATE EXTENSION IF NOT EXISTS pg_cron;` ejecutado por el rol de migraciones. Son los
cuatro ambientes de [`ADR-013`](adr/ADR-013-cuatro-ambientes.md): dev, qa, uat y prod.

Las dos purgas corren como el **rol de migraciones**, no como la aplicación. Es dueño de las
tablas y el único rol del proyecto con `BYPASSRLS`, así que atraviesa el `FORCE ROW LEVEL
SECURITY` sin necesitar una política de `DELETE` escrita para él. Conceder `DELETE` al rol de la
API sería el error: abriría el borrado a quien atiende peticiones de usuario para resolver una
tarea de madrugada.

### 10.2 Cómo se vigila que siguen corriendo

Las dos fallan distinto y por eso se vigilan distinto:

| Si se cae… | Qué pasa | Gravedad |
|---|---|---|
| `purgar_peticiones_idempotentes` | La tabla crece. No se pierde información ni se rompe la idempotencia: cada fila trae su `expira_en` y la API ignora las vencidas | Higiene |
| `purgar_nonces_vistos` | La tabla crece **rápido**: una fila por petición, y solo necesita recordarlas cinco minutos | Corrección |

La comprobación es la misma para las dos y no necesita herramientas nuevas: **si la fila más
vieja supera su ventana de retención, algo dejó de correr.**

```sql
-- Devuelve filas solo cuando hay un problema. Vacío es la respuesta sana.
SELECT 'peticiones_idempotentes' AS tabla, min(expira_en) AS mas_vieja
  FROM peticiones_idempotentes WHERE expira_en < NOW() - INTERVAL '2 hours'
UNION ALL
SELECT 'nonces_vistos', min(expira_en)
  FROM nonces_vistos WHERE expira_en < NOW() - INTERVAL '30 minutes';
```

El margen —dos horas y treinta minutos— es deliberado: da espacio a que una ejecución se salte
sin levantar una alarma falsa, y sigue detectando que la tarea lleva días muerta.

---

## 11. Snapshots incrementales (diseño)

> **Estado: diseñado, no construido.** El `snapshot.ps1` actual es **completo** (vuelca todo).
> Aquí se especifica cómo hacerlo **incremental** cuando el volumen lo justifique.

El diseño de solo escritura ([ADR-004](adr/ADR-004-base-solo-escritura.md)) hace el snapshot
incremental natural: como **nada se edita ni se borra**, "lo nuevo desde la última vez" se
identifica por la marca de tiempo de creación.

### 11.1 Incremental propio (por marca de tiempo)

- Cada tabla de negocio tiene `creado_en`; `auditoria` además tiene `fecha_hora` y un `id`
  `BIGSERIAL` siempre creciente.
- Se guarda un **cursor** (`snapshots/.cursor.json`) con el corte del último snapshot.
- Un incremento exporta solo las filas con `creado_en > cursor` por tabla (`\copy ... WHERE`).
- **Cadena:** un snapshot **base** + N **incrementos**. Restaurar = base, luego cada incremento
  en orden.

| Aspecto | Incremental propio |
|---|---|
| Tamaño | Pequeño: solo el delta |
| Frecuencia | Barato de correr seguido |
| Encaje | Perfecto con las tablas append-only |
| Punto ciego | Una **anulación posterior** (un `UPDATE` que llena `anulado_en`) no la ve un corte por `creado_en`. Se complementa capturando también filas con `anulado_en > cursor` / `desactivado_en > cursor`. Se documenta por tabla. |

Sketch del comando (una tabla):

```sql
\copy (SELECT * FROM movimientos
       WHERE creado_en > :cursor OR anulado_en > :cursor) TO 'mov_delta.csv' CSV HEADER
```

En el script, esto sería un modo `-Incremental` de `snapshot.ps1` que lee y actualiza el cursor.

### 11.2 Alternativa del proveedor (PITR)

Supabase (plan de pago) ofrece **Point-in-Time Recovery** basado en WAL: recuperación a cualquier
segundo, sin escribir scripts. Es la opción recomendada para el **respaldo real de producción**;
el incremental propio es para **desarrollo** y para llevarse deltas de forma portable.

| | Incremental propio | PITR del proveedor |
|---|---|---|
| Para qué | Desarrollo, deltas portables | Respaldo de producción |
| Costo | Gratis (scripts) | Plan de pago de Supabase |
| Granularidad | Por corte de `creado_en` | Al segundo |
| Esfuerzo | Mantener cursor + orden | Ninguno |

---

### 🧭 Navegación

**⬅️ Anterior:** [15 · Glosario](15-glosario.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [17 · Resiliencia, trabajo sin conexión y caché](17-resiliencia-offline-y-cache.md)
