# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [7.19.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/CLAUDE.md "Historial de cambios") | [🔄 Vivo](docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-20 | [Proceso](docs/INDICE.md#etiqueta-proceso) |

**El idioma del proyecto es el español**, incluidos el código, los nombres de clase, los comentarios,
los mensajes de commit y las pruebas. `Movimiento`, `aporteAUtilidad`, `esRegistroTardio`.

---

## 1. Cuatro repositorios, uno dentro de otro

Este repositorio es **la especificación**: documentación, ADR, mockup, contrato y la herramienta que
verifica todo eso. Los tres repositorios de código viven dentro de `repositories/` y **cada uno es un
repositorio git independiente**, ignorado por este ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)):

| Carpeta | Proyecto | Qué es |
|---|---|---|
| `repositories/backend-api` | `prisma_api` | Java 25 · Spring Boot 4 · Gradle. Lo único que habla con la base |
| `repositories/backend-db` | `prisma_db` | Migraciones de PostgreSQL, semilla y scripts. No es un servicio |
| `repositories/frontend-flutter` | `prisma_front` | Flutter, web por defecto. No decide nada |

> **Grep y Glob desde la raíz no entran a `repositories/`**, porque está en el `.gitignore` de este
> repositorio. Hay que pasar `path` dentro de la carpeta del repositorio de código.

**Este repositorio es público.** Nada de datos internos: cuentas, claves, URL privadas ni nombres de
clientes.

---

## 2. Comandos

### Documentación — se corre en **cada** cambio de un `.md`

```bash
node scripts/docs/documentar.mjs enlazar      # pone anclas, enlaces y bloques generados
node scripts/docs/documentar.mjs verificar    # falla si algo quedó roto o sin enlazar
```

`verificar --base <SHA>` es lo que corre la integración continua: exige además que todo documento
cuyo contenido cambió haya subido su versión. `enlazar --en-seco` muestra lo que cambiaría.

### API (`repositories/backend-api`)

```bash
./gradlew build                                  # formato + análisis + pruebas + compilación
./gradlew spotlessApply                          # formatea; sin esto, build falla
./gradlew test --tests '*MovimientoTest'         # una sola clase de prueba
./gradlew bootRun                                # queda en http://localhost:8081
./gradlew laVersionSubio --args=origin/develop   # C-05: la versión subió un paso
```

`build` incluye `spotlessCheck`, y `-Werror` está activo: **un aviso del compilador rompe la
compilación**. Las reglas de ArchUnit corren siempre, aunque se filtre por clase.

> **Si Gradle falla con `Unable to establish loopback connection`** (Windows con los sockets AF_UNIX
> rotos), anteponer a cada comando:
> `JAVA_TOOL_OPTIONS='-Djdk.net.unixdomain.tmpdir=C:\no-existe\prisma-uds'`. Con una carpeta que no
> existe, la JDK cae sola a TCP. Apuntar a una ruta válida **no** sirve.

### Front (`repositories/frontend-flutter`)

```bash
flutter pub get
dart format --set-exit-if-changed .
dart analyze --fatal-infos
flutter test                                     # incluye test/frontera_test.dart
flutter test test/frontera_test.dart             # un solo archivo
dart run tool/la_version_subio.dart origin/develop   # C-05: la versión subió un paso
flutter run -d chrome --dart-define=PRISMA_API_URL=http://localhost:8081 --dart-define=PRISMA_AMBIENTE=dev --dart-define=PRISMA_API_MAJOR=0
```

Flutter Web no lee variables de entorno en el navegador: la configuración entra con `--dart-define`
**al compilar** y queda dentro del artefacto, así que ahí no va ningún secreto.

### Base (`repositories/backend-db`)

```powershell
supabase start                 # PostgreSQL, Auth y Studio en Docker
./scripts/db/reset-local.ps1   # aplica las migraciones y carga la semilla
./scripts/db/la-version-subio.ps1 -Base origin/develop   # C-05: la migración publica su versión
```

Queda en `postgresql://postgres:postgres@127.0.0.1:54322/postgres`, que es donde la busca la
configuración por defecto de la API. **Una migración aplicada no se edita jamás:** si estaba mal, se
escribe otra que corrige.

---

## 3. Reglas del proyecto

**Antes de escribir código se escribe el plan, y el plan es un archivo** ([22 §10](docs/22-documentacion.md#planes)). Cada plan de
trabajo queda en `plan/NN-titulo.md` —dos dígitos, un guion y el título en minúsculas—, numerado en
el orden en que se fue decidiendo. El número que toca es el mayor que haya más uno: **arranca en 01,
no salta y no se repite**, y `verificar` falla si se rompe. El plan dice qué se va a hacer, qué se
decidió y por qué, y cómo se va a verificar: los tres títulos del commit, pero en futuro. No lleva
encabezado ni versión, y no se corrige: si resultó equivocado, se escribe el siguiente.

**Una tarea es una rama `feature/<id>` y un PR a `develop`** ([21 §6.5](docs/21-trabajo-en-paralelo.md#65-ramas-e-integración)). Se trae `develop`, se
abre `feature/2.19` con el id del plan, se trabaja, **se deja la documentación al día antes de
abrir el PR** —versión subida, `enlazar` y `verificar`— y se abre el PR contra `develop`. **La
rama se empuja siempre, desde su primer commit y sin que haya que pedirlo**, también cuando el
commit no es una tarea del plan: lo que solo vive en la máquina no está respaldado ni se puede
revisar. `develop`, `main` y las ramas de ambiente no se mueven por cuenta propia. Y entonces **se espera a que lo acepten: no se empieza otra tarea hasta que el PR esté
aceptado**, salvo que la siguiente esté marcada ⚡ en el tablero y no toque lo que está en revisión.
`main` es la rama de publicación y solo recibe lo que se publica. **Este repositorio no tiene
`develop`**: aquí la base es `main`.

**Una tarea del plan es un commit, y el commit explica por qué** ([ADR-028](docs/adr/ADR-028-un-commit-por-tarea.md)). El asunto lleva
sprint y número —`Sprint 3 / 3.11: marca de registro tardio`— y el cuerpo son **tres líneas, una por
título**: `Hace:`, `Decide:` y `Verifica:`, esta última con el conteo de pruebas y **qué se rompió a
propósito para verlas fallar**. Dos tareas no van en un mismo commit aunque toquen la misma clase.
Lo que no es tarea —documentación, herramientas— va aparte y sin número. Los mensajes van **en
español sin tildes**, como el resto del historial.

**Y el mensaje entero no pasa de 256 caracteres** ([ADR-031](docs/adr/ADR-031-commit-de-256-caracteres.md)), contando asunto, cuerpo y
trailers: `printf '%s' "$(git log -1 --pretty=%B)" | wc -c`. Descontados el asunto y el
`Co-Authored-By`, quedan unos 50 caracteres por línea, que es una frase. **El porqué largo no va en
el commit: va en el plan**, que no tiene tope y se escribió antes. Lo comprueba
`verificar --base <SHA>` en cada PR, y los commits de fusión quedan exentos.

**Y la versión del proyecto sube un paso en cada PR que cambia lo que se publica** ([ADR-034](docs/adr/ADR-034-la-version-sube-en-cada-pr.md)): el
PATCH, el MINOR o el MAJOR siguiente de la que hay en `develop` —en el front, con el `+BUILD` uno
más—. Si el PR agrega una migración, la última publica en `schema_version` la versión siguiente del
esquema, y `verificar-base.sql` pasa a esperarla. Las pruebas, los README y los flujos no piden
versión. Lo exige la prueba [C-05](docs/12-pruebas-y-calidad.md#c-05), en el trabajo «La versión subió» de cada integración continua, y es
lo que hace que «Acerca de» diga la verdad: estuvo diciendo `0.2.0` después de diecisiete PR.

**Todo `.md` lleva encabezado con versión, estado y fechas** ([ADR-027](docs/adr/ADR-027-documentacion-versionada.md), [`docs/22-documentacion.md`](docs/22-documentacion.md)). Al
cambiar un documento: subir su versión (MAJOR si alguien actuaría mal con la anterior), poner la
fecha de hoy, correr `enlazar` y luego `verificar`. **Los bloques `<!-- generado:… -->` no se editan
a mano**, ni las marcas ⚡ 🔒 ⏭️ de [`TODO.md`](TODO.md); 🚧 y ✏️ sí las pone una persona.

**El plan manda sobre el tablero.** [`docs/08-plan-de-desarrollo.md`](docs/08-plan-de-desarrollo.md) dice qué hay que hacer, en qué
carril y de qué depende; [`TODO.md`](TODO.md) dice en qué va. Los dos tienen que enumerar las mismas 142 tareas y
la verificación falla si no. **Una tarea nueva entra primero al plan**, nunca al tablero.

**Nunca `git add -A` en este repositorio**: hay archivos sueltos en la raíz que no son del proyecto.
Rutas explícitas y mirar `git status` antes.

**No inventar reglas de negocio.** Si un documento no cubre un caso, se decide lo mínimo, se escribe
el porqué en el commit y se anota en [`TODO.md`](TODO.md) [§10](TODO.md#10-decisiones-de-construcción-que-conviene-revisar), que es la lista de decisiones que quien dirige
tiene que revisar.

---

## 4. Arquitectura

### Quién decide qué

```
prisma_front  ──HTTP──▶  prisma_api  ──SQL──▶  prisma_db
  pinta                   decide todo           impone lo que no se puede romper
```

- **El front no decide nada**: ni una regla, ni un permiso, ni un mensaje, ni una cifra, ni qué
  opciones de menú existen. Tampoco habla con Supabase ([ADR-018](docs/adr/ADR-018-front-sin-decisiones.md)). `test/frontera_test.dart` lo
  comprueba y rompe la compilación.
- **La API es lo único que habla con la base** y donde vive toda la lógica.
- **Los permisos viven en PostgreSQL, no en la pantalla** ([ADR-006](docs/adr/ADR-006-rls-por-rol.md)). Row Level Security evalúa el
  **tipo** de usuario de la sesión —Gerencia u Operación—, y una prueba tiene que ver el rechazo
  venir de la base, no de un `if` de la API.

### La API por dentro

Arquitectura hexagonal con cuatro paquetes bajo `com.prismamy.api`, y **las flechas apuntan siempre
hacia adentro** ([ADR-002](docs/adr/ADR-002-arquitectura-hexagonal.md)):

| Paquete | Qué vive ahí |
|---|---|
| `dominio/modelo`, `dominio/servicio`, `dominio/puerto` | El núcleo: objetos de valor, reglas puras y los puertos que declara |
| `aplicacion` | Un caso de uso por clase. No conoce HTTP |
| `infraestructura` | Adaptadores: PostgreSQL, Supabase, PDF. No conoce la interfaz |
| `interfaz` | HTTP: controladores, el sobre, el catálogo de códigos, los formularios |

`ReglaDeDependenciasTest` (ArchUnit) **falla la compilación** si alguien mete Spring en `dominio` o un
cálculo de plata en un controlador. Una clase fuera de las cuatro capas también falla.

### Las piezas que ya existen y que todo lo nuevo usa

- **`Dinero`** — pesos enteros en un `long`, nunca decimales ([ADR-003](docs/adr/ADR-003-dinero-entero.md)). Sumar y restar fallan al
  desbordar; las fracciones solo entran por `porcentaje`, `veces` y `dividido`, y las tres redondean
  a peso entero con `HALF_UP`. El formato colombiano (`$1.350.784`, `−$1.255.000`) se arma a mano.
- **`Movimiento` y `TipoDeMovimiento`** — los nueve tipos del ENUM `tipo_movimiento` con su efecto
  sobre utilidad, caja y patrimonio, que es la tabla de [04 §4.3](docs/04-modelo-de-datos.md#43-movimientos--el-libro-único) convertida en tipo. **Los cálculos
  suman, no vuelven a clasificar:** `aporteAUtilidad()`, `aporteACaja(cuenta)` y
  `aporteAPatrimonio()` devuelven lo que un movimiento le suma a cada cifra, con signo. Lo anulado
  aporta cero a todo.
- **`Pedido` y `EstadoDePedido`** — cinco estados y los siete pasos que existen entre ellos.
  Entregado y cancelado son finales: lo que haya que corregir después va por contra-asiento.
- **`Costeo` y `CalcularMargenes`** — los tres márgenes de [05 §7.2](docs/05-reglas-financieras.md#72-los-tres-márgenes). El margen por hora viaja
  vacío, no en cero, cuando el ítem no consume tiempo.
- **`Duracion`** — el único sitio donde se divide entre 60, con la precisión suficiente para que el
  redondeo a peso ocurra una sola vez y al final.
- **`ZonaDelNegocio`** — `America/Bogota` vive en el dominio y no en la configuración: decide a qué
  día pertenece un registro, y con eso a qué mes ([RNF-08](docs/03-requisitos-y-bdd.md#rnf-08)).

### El contrato con el front

- **Toda respuesta lleva el sobre `{status, mensaje, data}`**, también los errores, dentro y fuera de
  los controladores. El `status` es de cinco dígitos, `HTTP(3) + caso(2)`, así que el código del
  sobre y el HTTP nunca pueden contradecirse.
- **`CatalogoDeCodigos` es la fuente única** de los códigos y de sus mensajes en español. De ahí
  salen la respuesta, Swagger y la traducción de restricciones de la base; copiar esa lista sería
  tenerla tres veces. La prueba [C-03](docs/12-pruebas-y-calidad.md#c-03) la cruza con el código fuente en los dos sentidos.
- **Las reglas de un formulario las dicta la API**, generadas del propio validador ([RF-102](docs/03-requisitos-y-bdd.md#rf-102)): el
  front no trae ningún umbral ni mensaje propio.
- **`contrato/openapi.json` es el contrato acordado**, y `prisma_api` guarda una copia fijada que la
  prueba [C-04](docs/12-pruebas-y-calidad.md#c-04) compara con el OpenAPI generado ([ADR-022](docs/adr/ADR-022-openapi-generado.md)). Un cambio de contrato se acuerda antes de
  implementarse, y el archivo va en LF byte a byte.
- **Toda petición exige `Idempotency-Key`**, lea o escriba ([20 §5.1](docs/20-contrato-de-api.md#51-la-cabecera)): desde el [ADR-030](docs/adr/ADR-030-contrato-sin-get.md) todo
  viaja por `POST`, así que la regla no cuelga del verbo. Se eximen dos rutas exactas, el ingreso y
  la renovación de sesión. La clave la genera el front cuando la persona decide la acción y la
  reutiliza en cada reintento ([ADR-020](docs/adr/ADR-020-idempotencia.md)), y el filtro que la exige **abre la única transacción
  de la petición**, para que la fila de la clave y el efecto caigan en la misma.

### La base

Solo escritura ([ADR-004](docs/adr/ADR-004-base-solo-escritura.md)): `DELETE` y `TRUNCATE` revocados, nada se borra. Se anula con motivo,
autor, fecha y dispositivo, y la auditoría la escriben triggers, no la API ([ADR-005](docs/adr/ADR-005-auditoria-por-triggers.md)). Toda
restricción lleva **nombre explícito**, porque de ese nombre cuelga su mensaje en español.

---

## 5. Dónde está la respuesta

Antes de escribir código, el documento manda. Si el código contradice a un documento, el código está
mal.

| Pregunta | Documento |
|---|---|
| ¿Qué fórmula es? ¿Sube la utilidad, la caja o el patrimonio? | [`05-reglas-financieras.md`](docs/05-reglas-financieras.md) — **el más importante** |
| ¿Qué columna, qué restricción, qué política RLS? | [`04-modelo-de-datos.md`](docs/04-modelo-de-datos.md) |
| ¿Qué tarea es esto y de qué depende? | [`08-plan-de-desarrollo.md`](docs/08-plan-de-desarrollo.md) y [`TODO.md`](TODO.md) |
| ¿Qué tiene que pasar para decir que está terminado? | [08 §4](docs/08-plan-de-desarrollo.md#4-definición-de-terminado) |
| ¿Qué requisito o qué escenario BDD cubre? | [`03-requisitos-y-bdd.md`](docs/03-requisitos-y-bdd.md) |
| ¿Cómo se comporta la pantalla? | [`10-ux-y-mockups.md`](docs/10-ux-y-mockups.md) y el mockup de `mockup/` |
| ¿Cómo responde la API, con qué código? | [`20-contrato-de-api.md`](docs/20-contrato-de-api.md) |
| ¿Qué prueba hay que escribir? | [`12-pruebas-y-calidad.md`](docs/12-pruebas-y-calidad.md) |
| ¿Cómo se versiona y se promueve? | [`19-ambientes-y-entrega.md`](docs/19-ambientes-y-entrega.md) |
| ¿Por qué se decidió así? | [`docs/adr/`](docs/adr/README.md) |

El índice navegable de los 61 documentos está en [`docs/INDICE.md`](docs/INDICE.md).

---

## 6. Dónde va el proyecto hoy

El estado al día vive en [`TODO.md`](TODO.md) [§1](TODO.md#1-hecho-en-progreso-y-pendiente), con una tabla por sprint que calcula la herramienta. En
resumen: el [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0) está cerrado, el dominio que no necesita base de datos
ya está construido y probado, y **la base del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) está aplicada y verificada en dev y en qa** ([1.1](docs/08-plan-de-desarrollo.md#tarea-1-1) a
[1.5](docs/08-plan-de-desarrollo.md#tarea-1-5)): dominios, nombres, borrado revocado, auditoría por triggers y RLS juzgando a una sesión de
verdad. La identidad ya llega hasta PostgreSQL ([1.6](docs/08-plan-de-desarrollo.md#tarea-1-6)), la sesión contra Supabase Auth ya entrega
sesión ([2.1](docs/08-plan-de-desarrollo.md#tarea-2-1)) y **toda petición pasa por el filtro de idempotencia** ([1.14](docs/08-plan-de-desarrollo.md#tarea-1-14)), que exige la cabecera
y abre esa única transacción. **El acceso está cerrado de punta a punta** —se entra, se recarga y se
sigue dentro ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2))— y **Gerencia ya da de alta a quien haga falta** ([2.7](docs/08-plan-de-desarrollo.md#tarea-2-7)), que era lo último que
solo sabía hacer la semilla. **El [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) arrancó: el libro ya llega a PostgreSQL** ([3.3](docs/08-plan-de-desarrollo.md#tarea-3-3)), con el
autor y el instante que puso el caso de uso y la base juzgando quién escribe. Y **qa dejó de ir
atrás** ([1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)): se le aplicaron las cinco migraciones que le faltaban y su informe entero salió en
`OK`, así que dev y qa vuelven a ser el mismo esquema. **Y Gerencia ya mira la pantalla como la ve
la empleada** ([2.18](docs/08-plan-de-desarrollo.md#tarea-2-18)), sin que el front recorte nada: alternar el modo es volver a pedirle el menú
a la API. **Y la base ya no rechaza en jerga** ([1.8](docs/08-plan-de-desarrollo.md#tarea-1-8)): una tabla cruza `(objeto, restricción)` con
el catálogo de códigos, y [C-01](docs/12-pruebas-y-calidad.md#c-01) la compara con `pg_constraint` en las dos direcciones, así que
agregar una restricción y olvidar su mensaje pasa a ser un rojo. **Y el contrato de pedidos quedó
acordado** ([4.10](docs/08-plan-de-desarrollo.md#tarea-4-10)): nueve operaciones que estrenan el rango de códigos de pedidos y clientes, con
lo que destraba la gestión de clientes ([4.2](docs/08-plan-de-desarrollo.md#tarea-4-2)) y todo el [Sprint 4](docs/08-plan-de-desarrollo.md#sprint-4). **Y el de movimientos también** ([3.13](docs/08-plan-de-desarrollo.md#tarea-3-13)): el libro se
registra con `PUT` a su propio id, se anula con motivo, se le adjunta el soporte y se lee con
filtros, y el rango `20`–`29` pasó de tres códigos a nueve. Con eso se destraban a la vez los
endpoints de movimientos ([3.4](docs/08-plan-de-desarrollo.md#tarea-3-4)) y el registro rápido del front ([3.5](docs/08-plan-de-desarrollo.md#tarea-3-5)); y entró una tarea que no
existía, la tabla `adjuntos` ([3.14](docs/08-plan-de-desarrollo.md#tarea-3-14)), que la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6) y la [4.8](docs/08-plan-de-desarrollo.md#tarea-4-8) daban por hecha. **Y el de productos
cerró el cuarto contrato seguido** ([5.10](docs/08-plan-de-desarrollo.md#tarea-5-10)): seis operaciones que estrenan el rango `40`–`49` y casi
no deciden nada, porque transcriben el dominio que ya estaba construido; lo que sí deciden es que **a
Operación no le llegan ni el costo ni los márgenes ni los minutos**, porque `costos_producto` lleva
RLS. Tenía 24 tareas detrás —el catálogo ([5.2](docs/08-plan-de-desarrollo.md#tarea-5-2)) y, tras él, el pedido con líneas ([4.3](docs/08-plan-de-desarrollo.md#tarea-4-3)), la
entrega ([4.5](docs/08-plan-de-desarrollo.md#tarea-4-5)) y casi todo el [Sprint 6](docs/08-plan-de-desarrollo.md#sprint-6)—. **Y el carril Base recuperó cuatro tareas que nadie
había presupuestado** ([2.21](docs/08-plan-de-desarrollo.md#tarea-2-21), [2.22](docs/08-plan-de-desarrollo.md#tarea-2-22), [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) y [4.11](docs/08-plan-de-desarrollo.md#tarea-4-11)): reglas que el contrato ya promete y la base
todavía no impone, y que tenían bloqueadas a la [2.8](docs/08-plan-de-desarrollo.md#tarea-2-8), la [2.9](docs/08-plan-de-desarrollo.md#tarea-2-9), la [2.15](docs/08-plan-de-desarrollo.md#tarea-2-15), la [2.16](docs/08-plan-de-desarrollo.md#tarea-2-16) y la [4.9](docs/08-plan-de-desarrollo.md#tarea-4-9) sin
figurar en ninguna parte. **Y el contrato de capital es el quinto seguido** ([7.9](docs/08-plan-de-desarrollo.md#tarea-7-9)): diez operaciones para
las inversiones, los aportes, el retiro partido en pro-labore y distribución, el pro-labore, los
sobres y el patrimonio, en el rango `90`–`99`, que estaba reservado. A diferencia de los tres
anteriores, **no transcribe un dominio construido**: sale de los documentos, y lo que decide está en el [`TODO.md`](TODO.md)
[§10](TODO.md#10-decisiones-de-construcción-que-conviene-revisar), junto con que **sus formularios todavía no tienen pantalla**. **Y la aplicación está en línea en dev** ([0.8](docs/08-plan-de-desarrollo.md#tarea-0-8) y [0.9](docs/08-plan-de-desarrollo.md#tarea-0-9)): fusionar a
`develop` entrega, la API arranca leyendo el `PORT` que le inyectan y no recibe tráfico hasta que
alcanza la base. **Y entró una tarea que nadie había escrito, la [1.21](docs/08-plan-de-desarrollo.md#tarea-1-21)**: Supabase le daba a `anon`
—clave pública— permiso de leer y escribir sobre las veintiséis tablas, y por la Data API se leía el
libro entero. Está apagada en dev y qa, y la migración la cierra donde viaja. **Y el [H4](docs/08-plan-de-desarrollo.md#h4) necesitaba
una tarea que no estaba en ninguna parte, la [3.16](docs/08-plan-de-desarrollo.md#tarea-3-16)**: el andamio no tenía diseño para celular
—la barra lateral medía 224 px en cualquier pantalla— y el mockup sí lo tenía, así que la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6)
pasó a depender de ella. **Y el front estrenó pantalla de sección** ([3.5](docs/08-plan-de-desarrollo.md#tarea-3-5)): Movimientos pinta el
formulario que la API describe, registra con un `PUT` a su propio id y **encola la intención antes
de salir a la red**, así que sin señal no se pierde; dónde vive cada pantalla lo dice un solo
archivo, la única excepción nombrada en la prueba de la frontera. **Y el libro ya se registra de
punta a punta** ([3.4](docs/08-plan-de-desarrollo.md#tarea-3-4)): `PUT /api/v0/movimientos/{id}` es el primer endpoint que escribe en el
libro, y la respuesta **se lee de la base después de escribir** —en la misma transacción— porque el
contrato declara nombres que la petición no trae. **Y el andamio ya cabe en un celular**
([3.16](docs/08-plan-de-desarrollo.md#tarea-3-16)): de 760 px para abajo, como el mockup, el menú va arriba y de lado y la insignia
baja al pie de la pantalla. **Y la base ya sabe guardar un soporte** ([3.14](docs/08-plan-de-desarrollo.md#tarea-3-14)): `adjuntos` estaba en
el catálogo y en el diagrama desde el principio y no tenía `CREATE TABLE`, y ahora la tiene junto
con el bucket privado `soportes`, que **impone el techo de 5 MB y los cuatro tipos de contenido
antes de que los bytes se guarden**, no después. **Y el [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) quedó acordado entero** ([8.11](docs/08-plan-de-desarrollo.md#tarea-8-11)), que
era el último contrato por acordar de los que el plan tenía: la nómina con sus empleadas, sus
adelantos y su liquidación, el simulador que responde si se puede contratar, el cotizador con su PDF
y el validador de anticipo mínimo, y el importador de CSV. Son 25 operaciones y 17 códigos que
estrenan a la vez **los tres rangos que quedaban vacíos**, con lo que los diez módulos del plan ya
tienen el suyo. Lo que decide es **cómo baja un archivo**: dentro del sobre, en base64 y con tope de
5 MB, para que ninguna ruta tenga dos formas de contestar. Y con él entró al plan la [8.12](docs/08-plan-de-desarrollo.md#tarea-8-12), las
tablas del cotizador, que estaban en el catálogo del [04](docs/04-modelo-de-datos.md) sin `CREATE TABLE` y que ninguna tarea
creaba. **Y las tres listas del registro rápido ya se llenan** ([1.10](docs/08-plan-de-desarrollo.md#tarea-1-10)): decían «no se pudieron
cargar las opciones» y era cierto —el formulario «movimiento» nombraba dos rutas que nadie servía—,
y ahora existen las cuatro operaciones de cuentas y categorías, con las cuentas **sin saldo** para
que Operación elija sin ver la caja. El «solo Gerencia» que el contrato promete desde la [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17)
**lo impone por fin la base**, con el molde de `cargos`: hasta esa migración, Operación creaba las
dos. En el front, el panel «Cuentas de dinero» vive dentro de Movimientos y se pinta solo si la
navegación lo dice. **Y el [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0) cerró partiendo su última tarea** ([0.4](docs/08-plan-de-desarrollo.md#tarea-0-4)): pedía los cuatro
proyectos de Supabase, dev y qa llevan meses en pie y los dos de pago —uat y prod, que firma
Gerencia— son ahora la [9.12](docs/08-plan-de-desarrollo.md#tarea-9-12), en el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9), junto a las tareas que los necesitan. **Y el carril
Contrato se cerró** ([6.10](docs/08-plan-de-desarrollo.md#tarea-6-10)): el contrato de reportes es el décimo y último, y con él los diez
módulos del plan están acordados antes de implementarse. Son seis operaciones —el Inicio entero en
una consulta, el año mes a mes, los meses cerrados, la descarga en CSV o PDF, el cierre de un mes y
los saldos por cuenta— y cinco códigos, cuatro de ellos en el rango `60`–`69`, **el último que
seguía vacío**. Lo que decide es que **el Inicio no se pinta con seis llamadas**, que el promedio de
ganancias y el punto de equilibrio **faltan en vez de valer cero** cuando no hay de dónde sacarlos,
y que **cerrar un mes no manda cifras**: el snapshot lo calcula la API porque después nadie lo
corrige. Detrás se abren siete tareas, entre ellas el dashboard ([6.3](docs/08-plan-de-desarrollo.md#tarea-6-3)) y el reporte anual
([6.5](docs/08-plan-de-desarrollo.md#tarea-6-5)). **Y los permisos dejaron de suponerse**
([1.7](docs/08-plan-de-desarrollo.md#tarea-1-7)): una usuaria de Operación entra por HTTP con su usuario y su contraseña, y desde esa
sesión se recorren [P-01](docs/12-pruebas-y-calidad.md#p-01) a [P-32](docs/12-pruebas-y-calidad.md#p-32) —el patrimonio, los costos, la auditoría y las cuatro tablas de
Gerencia llegan vacías; el desprendible propio llega y el ajeno no; ascenderse sola o registrarse un
adelanto los rechaza PostgreSQL—, y de cada rechazo se afirma **que lo dijo la base**: el `42501` de
una política o el `P0001` de un trigger, no que lanzó algo. [P-32](docs/12-pruebas-y-calidad.md#p-32) repite la lectura **sin capa de
aplicación en medio** y el resultado no cambia. Con ella entró **la tubería que corre lo que habla
con la base** ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) [§3](#3-reglas-del-proyecto)): descarga `prisma_db` por etiqueta y levanta Supabase, así que [C-01](docs/12-pruebas-y-calidad.md#c-01) y las
demás **por fin gatean un PR**. **Y el libro dejó de aceptar lo que la API rechaza**
([3.15](docs/08-plan-de-desarrollo.md#tarea-3-15)): `movimientos` impone las tres reglas de la cuenta de destino —falta, sobra, o es la
misma de origen, que además le **bajaba el saldo** a esa cuenta— y su fecha se juzga con el día de
Bogotá y no con el huso de la sesión, que de siete a doce de la noche dejaba entrar el mañana.
Esquema `0.6.0`. **Y la idempotencia dejó de ser decorado** ([1.15](docs/08-plan-de-desarrollo.md#tarea-1-15)): [I-02](docs/12-pruebas-y-calidad.md#i-02) corta la
petición en los tres sitios donde puede caer —entre las dos escrituras, después del efecto y
matándole la conexión sin avisar— y cuenta las filas de las dos tablas. **Y la clave pública dejó
de abrir el libro** ([1.21](docs/08-plan-de-desarrollo.md#tarea-1-21)): `anon` leía las 352 filas de `movimientos` de la base local, y ya
no alcanza ni una tabla, ni la secuencia, ni las cinco funciones; lo que se cree después nace
cerrado. Esquema `0.7.0`, y con eso **el [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) queda cerrado entero**, el primero que lo
está. **Y desactivar a alguien ya deja rastro** ([2.21](docs/08-plan-de-desarrollo.md#tarea-2-21)): `usuarios` era la única tabla de
negocio sin auditar —la genérica busca la baja en `anulado_en` y ahí se da de baja con
`desactivado_en`—, así que la bitácora de la pantalla solo sabía enseñar filas de `cargos`. Con su
trigger entran la columna `motivo`, las cinco acciones con nombre que el contrato ya prometía y
`fn_registrar_evento`, que es lo único que puede escribir un evento en una tabla con RLS y sin
política de inserción. Esquema `0.8.0`, y detrás se destraban la [2.9](docs/08-plan-de-desarrollo.md#tarea-2-9), la [2.15](docs/08-plan-de-desarrollo.md#tarea-2-15) y la [2.16](docs/08-plan-de-desarrollo.md#tarea-2-16).
Van 74 de las 142 tareas.

Mientras no exista el ambiente qa —hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9), por [ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md)—, «terminado» quiere decir
fusionado a `develop` con la integración continua en verde.

Para la base hay además una forma de preguntarle si cumple el modelo, en vez de suponerlo:
`scripts/db/verificar-base.sql` de `prisma_db` contesta `OK` o `>>> FALLA` por cada promesa del
[04](docs/04-modelo-de-datos.md), y corre dentro de una transacción que se revierte ([16 §5.1](docs/16-base-de-datos-y-snapshots.md#51-comprobar-que-quedó-como-dice-el-modelo)).
