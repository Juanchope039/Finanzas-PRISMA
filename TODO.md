# Tareas de PRISMA

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [6.26.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/TODO.md "Historial de cambios") | [🔄 Vivo](docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-20 | [Plan](docs/INDICE.md#etiqueta-plan) · [Paralelo](docs/INDICE.md#etiqueta-paralelo) |

Lo hecho y lo pendiente, con los números de tarea del
[plan de desarrollo](docs/08-plan-de-desarrollo.md). El plan dice **qué** hay que hacer, **en qué
carril** y **de qué depende**; este archivo dice **en qué va**. Si discrepan sobre qué hay que
hacer, manda el plan.

| Marca | Significa | Quién la pone |
|---|---|---|
| `[x]` | **Hecha** y verificada: pruebas en verde y commit en `develop` | Quien la termina |
| 🚧 | **En progreso:** alguien la tiene en las manos ahora | Quien la toma |
| ⚡ | **Puede empezar hoy:** todo lo que necesita ya está hecho | La herramienta, del plan |
| 🔒 | Espera a otra tarea que todavía no está hecha | La herramienta, del plan |
| ✏️ | Escrita pero sin verificar: SQL que todavía no corrió contra ninguna base | Quien la escribe |
| ⏭️ | Movida a otro sprint | La herramienta, del plan |

Cada tarea dice su **carril**: **API** (`prisma_api`), **Base** (`prisma_db`), **Front**
(`prisma_front`), **Contrato** (`contrato/`, los dos lados) o **Decisión** (sin código).

---

## 1. Hecho, en progreso y pendiente

Las tres preguntas de siempre. Las secciones 2 a 6 enumeran **las 142 tareas del plan**, una por una
y con su marca; aquí está el resumen. Que no falte ninguna no depende de la memoria de nadie: la
herramienta compara el tablero con el plan y la verificación falla si alguna no está.

### 1.1 Sprint por sprint

<!-- generado:plan-tablero · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
| Sprint | Tareas | ✅ Hechas | 🚧 En progreso | ⬜ Pendientes | Días que faltan |
|---|---:|---:|---:|---:|---:|
| [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0) · Dos proyectos, cuatro ambientes, tubería y contrato de respuesta | 19 | 19 | 0 | 0 | 0 |
| [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) · Base de datos, RLS, identidad propagada e idempotencia | 21 | 21 | 0 | 0 | 0 |
| [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) · Acceso, usuarios, cargos y canal firmado | 22 | 13 | 0 | 9 | 9,5 |
| [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) · Movimientos | 16 | 10 | 0 | 6 | 7 |
| [Sprint 4](docs/08-plan-de-desarrollo.md#sprint-4) · Pedidos y anticipos | 11 | 2 | 0 | 9 | 11 |
| [Sprint 5](docs/08-plan-de-desarrollo.md#sprint-5) · Productos y costeo | 10 | 4 | 0 | 6 | 6,5 |
| [Sprint 6](docs/08-plan-de-desarrollo.md#sprint-6) · Reportes y KPIs | 10 | 1 | 0 | 9 | 14,5 |
| [Sprint 7](docs/08-plan-de-desarrollo.md#sprint-7) · Capital, retiros y patrimonio | 9 | 1 | 0 | 8 | 12 |
| [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) · Nómina, cotizador y cierre | 12 | 1 | 0 | 11 | 16,5 |
| [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) · Promoción, PWA y endurecimiento | 12 | 1 | 0 | 11 | 10 |
| **Total** | **142** | **73** | **0** | **69** | **87** |
<!-- /generado:plan-tablero -->

### 1.2 ✅ Hecho

Lo que tiene su commit en `develop` con la integración continua en verde, que es lo que la
[definición de terminado](docs/08-plan-de-desarrollo.md#4-definición-de-terminado) exige mientras no exista el ambiente qa ([ADR-026](docs/adr/ADR-026-railway-al-final.md)).

| Carril | Qué hay | Tareas |
|---|---|---|
| **API · cimientos** | Esqueleto hexagonal con su regla de dependencias verificada, el sobre `{status, mensaje, data}` en toda respuesta, el catálogo de códigos de cinco dígitos, la consulta de versión, el descriptor de formulario, el contrato v0.5.0 fijado y los hilos virtuales de Java 25 | [0.1](docs/08-plan-de-desarrollo.md#tarea-0-1) · [0.2](docs/08-plan-de-desarrollo.md#tarea-0-2) · [0.6](docs/08-plan-de-desarrollo.md#tarea-0-6) · [0.7](docs/08-plan-de-desarrollo.md#tarea-0-7) · [0.11](docs/08-plan-de-desarrollo.md#tarea-0-11) · [0.14](docs/08-plan-de-desarrollo.md#tarea-0-14) … [0.18](docs/08-plan-de-desarrollo.md#tarea-0-18) |
| **API · dominio** | `Dinero`; `Movimiento` con los nueve tipos y su efecto sobre las tres cifras; `Pedido` con sus cinco estados; `Producto`, `Costeo` partido en materia y tiempo, la tarifa por hora, los tres márgenes y el cuadro que lee cada producto contra el resto del taller; y `RegistrarMovimiento`, el primer caso de uso, con la marca de registro tardío | [1.9](docs/08-plan-de-desarrollo.md#tarea-1-9) · [3.1](docs/08-plan-de-desarrollo.md#tarea-3-1) · [3.2](docs/08-plan-de-desarrollo.md#tarea-3-2) · [3.11](docs/08-plan-de-desarrollo.md#tarea-3-11) · [4.1](docs/08-plan-de-desarrollo.md#tarea-4-1) · [5.1](docs/08-plan-de-desarrollo.md#tarea-5-1) · [5.3](docs/08-plan-de-desarrollo.md#tarea-5-3) · [5.6](docs/08-plan-de-desarrollo.md#tarea-5-6) |
| **API · la base** | `ConIdentidad`, **la única puerta a PostgreSQL**: abre la transacción, le dice a la base quién pregunta y se vuelve `authenticated`, y fuera de ella ninguna consulta sale —ni por un `DataSource` o un `@Transactional` de otra clase, que ArchUnit impide—. Probada contra la base local conectada como `prisma_api`: Gerencia ve el pro-labore, Operación no, y la conexión vuelve al pool sin la identidad de nadie. **Y el libro ya llega a la base**: `MovimientosEnPostgres` guarda lo que `RegistrarMovimiento` decide, con el autor y el instante que puso el caso de uso; registrar a nombre de otra persona lo rechaza `mov_insercion` y no un `if`, y la bitácora la escribe el trigger con la persona de la sesión. **Y ya se le puede pedir por HTTP**: `PUT /api/v0/movimientos/{id}` registra un ingreso, un gasto o una transferencia con el formulario que la API describe, y devuelve lo que quedó escrito —con los nombres de la cuenta, la categoría y quien registró, leídos de la base dentro de la misma transacción—. Los cuatro rechazos que no caben en el descriptor estrenan código propio, `42223` a `42226` | [1.6](docs/08-plan-de-desarrollo.md#tarea-1-6) · [3.3](docs/08-plan-de-desarrollo.md#tarea-3-3) · [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4) |
| **API · los permisos** | **Ya no se suponen: se prueban con una sesión de verdad.** Marcela entra por HTTP con su usuario y su contraseña, y de esa sesión de Operación salen [P-01](docs/12-pruebas-y-calidad.md#p-01) a [P-32](docs/12-pruebas-y-calidad.md#p-32): el patrimonio, los costos, la auditoría y las cuatro tablas de Gerencia llegan vacías; el desprendible propio llega y el ajeno no; y ascenderse sola, crear un usuario, tocar el catálogo de cargos o registrarse un adelanto los rechaza PostgreSQL, con el `42501` de una política o el `P0001` de un trigger en el fallo. [P-32](docs/12-pruebas-y-calidad.md#p-32) repite la lectura **sin capa de aplicación en medio** y el resultado no cambia. **Y la tubería por fin las corre**: un trabajo descarga `prisma_db` por etiqueta y levanta Supabase ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) [§3](#3-sprint-1--base-rls-identidad-e-idempotencia)), así que [C-01](docs/12-pruebas-y-calidad.md#c-01) y las demás gatean un PR | [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7) |
| **API · el acceso** | Las cuatro operaciones de `/sesiones` contra Supabase Auth, el **canal firmado** comprobando cada petición y la navegación que dicta qué ve cada sesión. La sesión dura 30 días en la cookie `prisma_renovacion` —`HttpOnly`, así que el front no la ve—, cada renovación estrena token y clave de firma, y un token vencido responde `40100` para que el cliente renueve en vez de mandar a la pantalla de acceso | [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1) · [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2) · [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12) · [2.13](docs/08-plan-de-desarrollo.md#tarea-2-13) · [2.14](docs/08-plan-de-desarrollo.md#tarea-2-14) |
| **API y Front · las personas** | **Quién entra al sistema, administrado desde el sistema**: crear con clave temporal, editar el nombre, el cargo y el tipo, desactivar con motivo escrito y restablecer la contraseña —que además corta las sesiones abiertas—. **Ni un permiso vive en la API**: crear lo autoriza `usuarios_insercion`, y al último usuario activo de Gerencia lo rechaza un trigger que estaba puesto desde el esquema inicial. La identidad se crea contra GoTrue con la clave de servicio, acotada a eso por el [ADR-033](docs/adr/ADR-033-service-role-solo-en-auth.md) y vigilada por una prueba que rompe la compilación si aparece en otro archivo | [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) |
| **Front** | El proyecto Flutter con su integración continua, la insignia de versión y ambiente, el bloqueo por MAJOR incompatible y `Dinero` en Dart | [0.3](docs/08-plan-de-desarrollo.md#tarea-0-3) · [0.12](docs/08-plan-de-desarrollo.md#tarea-0-12) · [0.13](docs/08-plan-de-desarrollo.md#tarea-0-13) · [1.9](docs/08-plan-de-desarrollo.md#tarea-1-9) |
| **Front · sistema de diseño** | La tabla, el panel de confirmación en línea, la píldora de estado y los formatos colombianos de fecha y porcentaje; el cliente HTTP con clave de idempotencia; y el panel «Acerca de» | [0.19](docs/08-plan-de-desarrollo.md#tarea-0-19) · [1.19](docs/08-plan-de-desarrollo.md#tarea-1-19) · [2.10](docs/08-plan-de-desarrollo.md#tarea-2-10) |
| **Front · formularios** | El renderizador del descriptor: pinta los campos que manda la API con su teclado, sus límites, sus opciones y sus avisos, y no trae ninguna regla propia | [1.18](docs/08-plan-de-desarrollo.md#tarea-1-18) |
| **Front · la sesión** | **La puerta**: sin sesión se ve «Entra con tu usuario», y quien entra con una clave temporal va a «Crea tu contraseña» en vez de al tablero —que ni siquiera se construye hasta que la cambie—. Los dos formularios los manda la API, y los rechazos también: el «Usuario o contraseña incorrectos» que se lee en pantalla no está escrito en ninguna parte del front. **Recargar la página ya no saca a nadie**: lo primero que hace la aplicación al abrirse es renovar con la cookie, y si un token vence a media jornada el cliente lo repone y reintenta sin que se note. Arriba, la identidad con su menú de la sesión; a la izquierda, el menú que dicta la API | [2.6](docs/08-plan-de-desarrollo.md#tarea-2-6) · [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2) · [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12) · [2.14](docs/08-plan-de-desarrollo.md#tarea-2-14) |
| **Front · sin conexión** | La PWA con su manifiesto en español y la cola local en IndexedDB: cada intención se guarda con su clave **antes** de intentar enviarse, y se reintenta con la espera de [17 §5.2](docs/17-resiliencia-offline-y-cache.md#52-cuánto-se-espera-entre-reintentos) hasta que la API la acepte o la rechace con motivo | [9.1](docs/08-plan-de-desarrollo.md#tarea-9-1) |
| **Contrato** | El contrato v0.17.0 en [`contrato/openapi.json`](contrato/openapi.json), **entero**: el sobre, el descriptor con sus listas, cuentas y categorías, y **los sprints [2](docs/08-plan-de-desarrollo.md#sprint-2), [3](docs/08-plan-de-desarrollo.md#sprint-3), [4](docs/08-plan-de-desarrollo.md#sprint-4), [5](docs/08-plan-de-desarrollo.md#sprint-5), [6](docs/08-plan-de-desarrollo.md#sprint-6), [7](docs/08-plan-de-desarrollo.md#sprint-7) y [8](docs/08-plan-de-desarrollo.md#sprint-8) acordados antes de implementarlos** —`/sesiones`, `/usuarios`, `/cargos`, `/bitacora`, `/navegacion` y las tres cabeceras del canal firmado; los movimientos con su registro, su anulación, su adjunto y su libro con filtros; los clientes, los pedidos y sus anticipos; los productos con su costeo, su cuadro de márgenes y lo que Operación no recibe; y el capital: las inversiones, los aportes, el retiro partido en pro-labore y distribución, el pro-labore, los sobres y el patrimonio; y la nómina entera con el simulador, el cotizador y el importador; y los reportes: el Inicio en una sola consulta —las tres cifras, las alertas, los saldos, los sobres, los doce meses y los pendientes—, el año mes a mes con el promedio de ganancias y el punto de equilibrio, el cierre mensual y la descarga en CSV o PDF— | [0.15](docs/08-plan-de-desarrollo.md#tarea-0-15) · [0.18](docs/08-plan-de-desarrollo.md#tarea-0-18) · [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17) · [2.19](docs/08-plan-de-desarrollo.md#tarea-2-19) · [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13) · [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10) · [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10) · [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10) · [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9) · [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11) |
| **Base** | **El esquema ya no está solo escrito: está probado contra una base.** 25 tablas con la semilla del mockup, los nueve dominios de [04 §4.1](docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes) en sus 62 columnas, toda restricción con nombre explícito, `DELETE` y `TRUNCATE` revocados a todo el que no sea el dueño, los quince triggers de auditoría escribiendo y las 34 políticas juzgando a una sesión de verdad —Operación no alcanza los retiros ni el pro-labore; Gerencia sí—, también sobre el catálogo de cargos, que lee todo el mundo y escribe solo Gerencia, y sobre las claves de idempotencia, que cada persona alcanza solo si son suyas, Gerencia incluida. `schema_version` y el rol `prisma_api`, con el que **RLS ya juzga a la API**. La semilla es fija, re-ejecutable y con filas en toda tabla que preguntan las pruebas de permisos, y `sembrar.ps1` la lleva a dev y a qa sin dejarla acercarse a uat ni a prod. Y esto ya no es solo dev: **qa quedó al día con la promoción de la [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)**, con sus 109 comprobaciones en `OK` y `schema_version` en `0.3.0`. Y con la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14) el esquema estrena la tabla `adjuntos` —la ficha del soporte, con su trigger y sus dos flechas excluyentes— y el **bucket privado `soportes`**, que impone el techo de 5 MB y los cuatro tipos de contenido **antes** de que los bytes se guarden: son 123 comprobaciones en `OK` contra la base local, y `0.4.0` **todavía sin promover a dev ni a qa**. Y con la [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) el libro impone al fin **las tres reglas de la cuenta de destino** —un gasto ya no llega con destino, y una transferencia ya no va de una cuenta a sí misma, que además le **bajaba el saldo** a esa cuenta— y **la fecha se juzga con el día de Bogotá y no con el huso de la sesión**, que de siete a doce de la noche aceptaba el mañana que la API rechaza: 141 comprobaciones en `OK`, y la `0.6.0` esperando promoción como la `0.4.0` | [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) · [0.5](docs/08-plan-de-desarrollo.md#tarea-0-5) · [0.10](docs/08-plan-de-desarrollo.md#tarea-0-10) · [1.1](docs/08-plan-de-desarrollo.md#tarea-1-1) … [1.5](docs/08-plan-de-desarrollo.md#tarea-1-5) · [1.11](docs/08-plan-de-desarrollo.md#tarea-1-11) · [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13) · [2.3](docs/08-plan-de-desarrollo.md#tarea-2-3) · [2.4](docs/08-plan-de-desarrollo.md#tarea-2-4) · [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14) · [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) |
| **Decisión** | Cuatro repositorios ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)), Java 25 y Gradle ([ADR-024](docs/adr/ADR-024-java-25-y-gradle.md)), Railway al final ([ADR-026](docs/adr/ADR-026-railway-al-final.md)), documentación versionada ([ADR-027](docs/adr/ADR-027-documentacion-versionada.md)), el esquema por etiqueta ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md)) y el mockup confirmado ([H0](docs/08-plan-de-desarrollo.md#h0)) | [1.20](docs/08-plan-de-desarrollo.md#tarea-1-20) |

**701 pruebas en verde en la API** —y 131 más contra la base local, que desde la [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7) sí corre la tubería— y 260 en el front. El dominio se prueba con las cifras de los
documentos [05](docs/05-reglas-financieras.md) y [06](docs/06-nomina-y-capacidad-de-pago.md): si una prueba falla, o se rompió el código o el documento dice
otra cosa.

### 1.3 🚧 En progreso

Nada en las manos ahora mismo.

**El alta de usuarios volvió a servir, y falta ejercitarla contra dev.** Crear a alguien respondía
«algo salió mal» con cualquier nombre de usuario, porque faltaba `SUPABASE_SERVICE_ROLE_KEY` en el
despliegue de la API y el fallo no sabía decirlo: `ProveedorNoDisponible` no tenía código propio.
Dejaba sin servir la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) recién terminada. **El arreglo entró en los dos repositorios**
—el `50300` que estrenó el contrato `0.9.0`— **y la variable ya está cargada en Railway**, que era lo
único que el código no podía hacer solo. Es un arreglo suelto: no lleva número de tarea y no entra en
las cuentas de abajo. Su plan es `plan/23-el-alta-decia-algo-salio-mal.md`, reconstruido el
2026-09-19 ([§10](#10-decisiones-de-construcción-que-conviene-revisar)). **Queda ejercitarlo contra dev** con una sesión de Gerencia: es lo
único del arreglo que no se ve desde fuera.

**Lo siguiente, en cuanto alguien lo tome:** cerrar la base del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) destrabó lo que la estaba
esperando. En el carril API **la prueba de permisos con sesión real ya está** ([1.7](docs/08-plan-de-desarrollo.md#tarea-1-7)), y con ella
la tubería que corre lo que habla con la base: [C-01](docs/12-pruebas-y-calidad.md#c-01) y las demás **por fin gatean un PR**, que era el
agujero por el que la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14) fusionó `adjuntos` sin sus mensajes y nadie lo vio en días.
**Y en su primera corrida encontró dos rojos que nadie veía**: una prueba de la propia [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7) que daba
por hecho que el reloj del ejecutor está en Bogotá, y dos de la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) que se apoyaban en una política
de contraseñas que ningún archivo declaraba ([§10](#10-decisiones-de-construcción-que-conviene-revisar)). El filtro de idempotencia
([1.14](docs/08-plan-de-desarrollo.md#tarea-1-14)) ya salió de esa lista: necesitaba la transacción de la [1.6](docs/08-plan-de-desarrollo.md#tarea-1-6) y la tabla de la [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13), y con las dos
quedó hecho; detrás de él se abre la prueba de corte ([1.15](docs/08-plan-de-desarrollo.md#tarea-1-15)). En el carril Base, con
`cargos` ([2.3](docs/08-plan-de-desarrollo.md#tarea-2-3)), la tabla de idempotencia ([1.13](docs/08-plan-de-desarrollo.md#tarea-1-13)), su purga ([1.16](docs/08-plan-de-desarrollo.md#tarea-1-16)) y la semilla reproducible
([1.11](docs/08-plan-de-desarrollo.md#tarea-1-11)) y la primera promoción a qa ([1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)) cerradas, sigue la tabla `usuarios` ([2.4](docs/08-plan-de-desarrollo.md#tarea-2-4)). El
carril Contrato **está cerrado**: con la [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10) se acordaron los diez módulos del plan, y no queda
ninguna funcionalidad por negociar. **El acceso está cerrado de punta a punta**: con la
sesión de 30 días ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)) se entra, se recarga la página y se sigue dentro, se sale por el menú de
la sesión y quien entra con clave temporal la cambia y llega al tablero. Y con la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) **Gerencia ya
puede dar de alta a alguien**, que era lo último que solo sabía hacer `seed.sql`. Lo que queda del
[Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) es el catálogo de cargos ([2.8](docs/08-plan-de-desarrollo.md#tarea-2-8)), el registro de cada ingreso ([2.9](docs/08-plan-de-desarrollo.md#tarea-2-9)) y lo que cuelga de
la pantalla de usuarios: su tabla completa ([2.15](docs/08-plan-de-desarrollo.md#tarea-2-15)), la bitácora ([2.16](docs/08-plan-de-desarrollo.md#tarea-2-16)) y la clave
obligatoria al reactivar ([2.17](docs/08-plan-de-desarrollo.md#tarea-2-17)). **Con la [2.18](docs/08-plan-de-desarrollo.md#tarea-2-18) el carril Front cerró su parte del sprint:**
Gerencia ya mira la pantalla como la ve la empleada, y sale de ahí con un clic. **Y el [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) es el que más se movió: el libro llega
a PostgreSQL** ([3.3](docs/08-plan-de-desarrollo.md#tarea-3-3)) **y su contrato ya está acordado** ([3.13](docs/08-plan-de-desarrollo.md#tarea-3-13)). **Y los dos que destrabó ya están**: los
endpoints ([3.4](docs/08-plan-de-desarrollo.md#tarea-3-4)) y el registro rápido del front ([3.5](docs/08-plan-de-desarrollo.md#tarea-3-5)), que fueron a la vez, así que el libro se
registra hoy de punta a punta y detrás se abre el sprint entero: el adjunto ([3.6](docs/08-plan-de-desarrollo.md#tarea-3-6)), las
transferencias ([3.7](docs/08-plan-de-desarrollo.md#tarea-3-7)), el listado ([3.8](docs/08-plan-de-desarrollo.md#tarea-3-8)) y la anulación ([3.9](docs/08-plan-de-desarrollo.md#tarea-3-9)). Con el contrato entró también una tarea nueva: **la tabla
`adjuntos` no existía y ninguna tarea la creaba** ([3.14](docs/08-plan-de-desarrollo.md#tarea-3-14)). La lista al día la calcula la herramienta,
y está justo abajo.

> **El [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0) está cerrado.** La base existe, tiene dueño distinto del de la API y **RLS ya
> juzga**: conectada como `prisma_api`, la misma consulta devuelve cero filas de `usuarios` y las
> cuatro `cuentas`, porque lo decide la base y no un `if`. Lo último que le faltaba era la [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4), y
> **se partió**: dev y qa llevan meses en pie, y uat y prod son de pago, los firma Gerencia y hasta
> el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) no hay nada que promover a ellos, así que son la [9.12](docs/08-plan-de-desarrollo.md#tarea-9-12). El carril Base ya siguió: el
> [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) tiene cerrada su mitad de base ([1.1](docs/08-plan-de-desarrollo.md#tarea-1-1) a [1.5](docs/08-plan-de-desarrollo.md#tarea-1-5)).

### 1.4 ⬜ Pendiente: lo que puede empezar hoy, en paralelo

Calculado de las dependencias del plan con lo marcado como hecho. Cada fila es un carril: **todo lo
de una misma fila se puede trabajar a la vez que lo de las demás.**

<!-- generado:plan-listas-ya · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
| Carril | Pueden empezar hoy, porque todo lo que necesitan ya está hecho |
|---|---|
| **API** | [2.11](docs/08-plan-de-desarrollo.md#tarea-2-11) · [2.17](docs/08-plan-de-desarrollo.md#tarea-2-17) · [3.7](docs/08-plan-de-desarrollo.md#tarea-3-7) · [3.8](docs/08-plan-de-desarrollo.md#tarea-3-8) · [3.9](docs/08-plan-de-desarrollo.md#tarea-3-9) · [3.12](docs/08-plan-de-desarrollo.md#tarea-3-12) · [4.2](docs/08-plan-de-desarrollo.md#tarea-4-2) · [4.4](docs/08-plan-de-desarrollo.md#tarea-4-4) · [5.2](docs/08-plan-de-desarrollo.md#tarea-5-2) · [5.4](docs/08-plan-de-desarrollo.md#tarea-5-4) · [5.7](docs/08-plan-de-desarrollo.md#tarea-5-7) · [5.8](docs/08-plan-de-desarrollo.md#tarea-5-8) · [7.1](docs/08-plan-de-desarrollo.md#tarea-7-1) · [7.2](docs/08-plan-de-desarrollo.md#tarea-7-2) · [7.3](docs/08-plan-de-desarrollo.md#tarea-7-3) · [7.7](docs/08-plan-de-desarrollo.md#tarea-7-7) · [8.1](docs/08-plan-de-desarrollo.md#tarea-8-1) · [9.4](docs/08-plan-de-desarrollo.md#tarea-9-4) · [9.6](docs/08-plan-de-desarrollo.md#tarea-9-6) · [9.8](docs/08-plan-de-desarrollo.md#tarea-9-8) · [9.11](docs/08-plan-de-desarrollo.md#tarea-9-11) |
| **Base** | [2.5](docs/08-plan-de-desarrollo.md#tarea-2-5) · [2.21](docs/08-plan-de-desarrollo.md#tarea-2-21) · [2.22](docs/08-plan-de-desarrollo.md#tarea-2-22) · [4.11](docs/08-plan-de-desarrollo.md#tarea-4-11) · [8.12](docs/08-plan-de-desarrollo.md#tarea-8-12) |
| **Front** | [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6) · [5.9](docs/08-plan-de-desarrollo.md#tarea-5-9) · [9.7](docs/08-plan-de-desarrollo.md#tarea-9-7) · [9.9](docs/08-plan-de-desarrollo.md#tarea-9-9) |
| **Decisión** | [9.12](docs/08-plan-de-desarrollo.md#tarea-9-12) |
<!-- /generado:plan-listas-ya -->

### 1.5 Cuánto falta

<!-- generado:plan-restante · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
Quedan **69 tareas y 87 días de trabajo** de 142 tareas del plan.

| Carriles activos | Desarrollo que falta | Con la estabilización |
|:---:|---:|---:|
| 1 | 13,1 semanas | **16,1 semanas** |
| 2 | 7,3 semanas | **10,3 semanas** |
| 3 | 6,1 semanas | **9,1 semanas** |
<!-- /generado:plan-restante -->

### 1.6 Para destrabar, en orden de lo que más libera

El orden sale de las dependencias del [plan](docs/08-plan-de-desarrollo.md): cuántas tareas pendientes cuelgan de cada una, directa
o indirectamente. No es el orden en que se descubrieron.

- [x] **El contrato de reportes, indicadores, alertas y cierre mensual** ([6.10](docs/08-plan-de-desarrollo.md#tarea-6-10)) — hecho, y
      **era la última tarea del carril Contrato**: con ella los diez módulos del plan están acordados
      antes de implementarse ([21 §3.2](docs/21-trabajo-en-paralelo.md#32-contrato-acordado-y-contrato-generado-no-se-contradicen)). Tenía **siete tareas detrás** por medio día: dos directas —el
      dashboard ([6.3](docs/08-plan-de-desarrollo.md#tarea-6-3)) y el reporte anual ([6.5](docs/08-plan-de-desarrollo.md#tarea-6-5))— y cinco indirectas: el gráfico de doce meses
      ([6.4](docs/08-plan-de-desarrollo.md#tarea-6-4)), el cierre mensual ([6.8](docs/08-plan-de-desarrollo.md#tarea-6-8)), el Inicio de solo consulta con su descarga ([6.9](docs/08-plan-de-desarrollo.md#tarea-6-9)) y,
      fuera del sprint, el simulador ([8.5](docs/08-plan-de-desarrollo.md#tarea-8-5)) y las unidades por vender ([8.6](docs/08-plan-de-desarrollo.md#tarea-8-6)). El `v0.17.0` estrena
      el rango `60`–`69`, **el último que seguía vacío**. Como el de capital y el de nómina, sale de
      los documentos y no de un dominio construido. Lo que decide: que **el Inicio es una sola
      consulta y no seis**; que **el promedio de ganancias y el punto de equilibrio faltan en vez de
      valer cero** cuando no hay de dónde sacarlos; que **cerrar un mes no manda cifras**, solo el
      período; y que **el aviso de caja libre del retiro lo impone la API** con el `40990`. Y cerró la
      consulta sin contrato que el `0.11.0` daba por escrita: los saldos por cuenta de la [3.12](docs/08-plan-de-desarrollo.md#tarea-3-12)
- [x] **El contrato de nómina, simulador, cotizaciones e importación** ([8.11](docs/08-plan-de-desarrollo.md#tarea-8-11)) — hecho: tenía
      **once tareas detrás**, que es el [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) entero menos él mismo. Seis directas —las empleadas
      ([8.1](docs/08-plan-de-desarrollo.md#tarea-8-1)), el simulador ([8.5](docs/08-plan-de-desarrollo.md#tarea-8-5)), el cotizador ([8.8](docs/08-plan-de-desarrollo.md#tarea-8-8)), el anticipo mínimo ([8.9](docs/08-plan-de-desarrollo.md#tarea-8-9)), el importador ([8.10](docs/08-plan-de-desarrollo.md#tarea-8-10)) y las
      tablas del cotizador ([8.12](docs/08-plan-de-desarrollo.md#tarea-8-12))— y cinco indirectas: los adelantos ([8.3](docs/08-plan-de-desarrollo.md#tarea-8-3)), la liquidación en la base
      ([8.2](docs/08-plan-de-desarrollo.md#tarea-8-2)), el desprendible ([8.4](docs/08-plan-de-desarrollo.md#tarea-8-4)), las unidades por vender ([8.6](docs/08-plan-de-desarrollo.md#tarea-8-6)) y las horas pagadas contra
      facturadas ([8.7](docs/08-plan-de-desarrollo.md#tarea-8-7)). El `v0.15.0` estrena **los tres rangos que quedaban vacíos** —`50`–`59`,
      `70`–`79` y `80`–`89`— y con eso los diez módulos del plan tienen el suyo. Como el de capital,
      **sale de los documentos y no de un dominio construido**. Lo que decide es **cómo baja un
      archivo**: dentro del sobre, en base64 y con tope de 5 MB, que sirve también para la descarga de
      la [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10) y para devolver un adjunto ([3.6](docs/08-plan-de-desarrollo.md#tarea-3-6)). **Y cerró la migración sin tarea que la [8.8](docs/08-plan-de-desarrollo.md#tarea-8-8) daba por
      hecha**: `cotizaciones` y `cotizacion_lineas` son ahora la [8.12](docs/08-plan-de-desarrollo.md#tarea-8-12).
- [x] **El contrato de capital** ([7.9](docs/08-plan-de-desarrollo.md#tarea-7-9)) — hecho: tenía **19 tareas detrás** por medio día de trabajo.
      Cuatro directas —las inversiones ([7.1](docs/08-plan-de-desarrollo.md#tarea-7-1)), los aportes ([7.2](docs/08-plan-de-desarrollo.md#tarea-7-2)), el pro-labore ([7.3](docs/08-plan-de-desarrollo.md#tarea-7-3)) y los sobres
      ([7.7](docs/08-plan-de-desarrollo.md#tarea-7-7))— y quince indirectas: el retiro partido ([7.4](docs/08-plan-de-desarrollo.md#tarea-7-4)), el patrimonio ([7.5](docs/08-plan-de-desarrollo.md#tarea-7-5)) y su alerta ([7.6](docs/08-plan-de-desarrollo.md#tarea-7-6)), y
      las tres cifras ([6.1](docs/08-plan-de-desarrollo.md#tarea-6-1)), que esperan al pro-labore y al retiro, con casi todo el [Sprint 6](docs/08-plan-de-desarrollo.md#sprint-6) detrás. El
      `v0.13.0` le da a Capital el rango `90`–`99`, que estaba reservado, y **a diferencia de los tres
      contratos anteriores no transcribe un dominio construido**: sale de los documentos. Lo que
      decide es cómo se parte un retiro cuando nadie lo dice, que el pro-labore y los sobres se
      definen desde el día en que se guardan, y que una inversión puede entrar sin cuenta. **Dejó para
      quien dirige que ninguno de sus cinco formularios tiene pantalla**, en el [§10](#10-decisiones-de-construcción-que-conviene-revisar).
- [x] **El contrato de productos y costeo** ([5.10](docs/08-plan-de-desarrollo.md#tarea-5-10)) — hecho: tenía **24 tareas detrás** por medio día
      de trabajo, y era lo que más liberaba. Dos directas —el catálogo ([5.2](docs/08-plan-de-desarrollo.md#tarea-5-2)) y el cuadro
      comparativo ([5.9](docs/08-plan-de-desarrollo.md#tarea-5-9))— y 22 indirectas, porque la cadena no se queda en el sprint: la [5.2](docs/08-plan-de-desarrollo.md#tarea-5-2)
      destraba el pedido con líneas ([4.3](docs/08-plan-de-desarrollo.md#tarea-4-3)), y de ahí salen la función de entrega ([4.5](docs/08-plan-de-desarrollo.md#tarea-4-5)) —del camino
      crítico—, las tres cifras ([6.1](docs/08-plan-de-desarrollo.md#tarea-6-1)) y con ellas casi todo el [Sprint 6](docs/08-plan-de-desarrollo.md#sprint-6). El `v0.12.0` estrena el
      rango `40`–`49`, y el contrato casi no decide: **transcribe el dominio que ya estaba
      construido** por la [5.1](docs/08-plan-de-desarrollo.md#tarea-5-1), la [5.3](docs/08-plan-de-desarrollo.md#tarea-5-3) y la [5.6](docs/08-plan-de-desarrollo.md#tarea-5-6). Lo que sí decide es que **a Operación no le
      llegan el costo, los márgenes ni los minutos**, con lo que la [5.8](docs/08-plan-de-desarrollo.md#tarea-5-8) deja de ser un `if`.
- [x] **El contrato de movimientos** ([3.13](docs/08-plan-de-desarrollo.md#tarea-3-13)) — hecho: tenía **32 tareas detrás** por medio día de
      trabajo, y era lo único que les faltaba a los endpoints ([3.4](docs/08-plan-de-desarrollo.md#tarea-3-4)). El `v0.11.0` llena el rango
      `20`–`29`, que estaba en tres de nueve. Un movimiento se registra con `PUT` a su propio id, se
      anula con motivo, se le adjunta el soporte y se lee con filtros; **se acordó antes de
      implementarlo** ([21 §3.2](docs/21-trabajo-en-paralelo.md#32-contrato-acordado-y-contrato-generado-no-se-contradicen)), así que el carril Front puede pintar el registro rápido ([3.5](docs/08-plan-de-desarrollo.md#tarea-3-5)) sin
      esperar a la API. **Y cerró la migración sin tarea que el [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10) había dejado anotada**: la tabla
      `adjuntos` es ahora la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14).
- [x] **El contrato de pedidos** ([4.10](docs/08-plan-de-desarrollo.md#tarea-4-10)) — hecho: tenía **22 tareas detrás**, una directa —la
      gestión de clientes ([4.2](docs/08-plan-de-desarrollo.md#tarea-4-2))— y 21 indirectas, y la [4.5](docs/08-plan-de-desarrollo.md#tarea-4-5) está en el camino crítico. El
      `v0.10.0` estrena el rango `30`–`39`, que estaba entero libre. **Dejó una pregunta para
      Gerencia y una migración sin tarea:** el mockup no tiene pantalla de clientes y `pedidos` no
      tiene dónde guardar el motivo de la cancelación, las dos en el [§10](#10-decisiones-de-construcción-que-conviene-revisar).
- [x] **Poner qa al día** ([1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)) — hecho: **dev y qa vuelven a ser el mismo esquema**, y con eso se
      destraba la prueba de permisos contra qa ([2.11](docs/08-plan-de-desarrollo.md#tarea-2-11)). El retrato de antes desmintió al tablero en
      lo que más importaba: qa **sí** rechazaba ya el saldo negativo, el sobre del 120 % y el motivo
      en blanco, porque los dominios ([1.1](docs/08-plan-de-desarrollo.md#tarea-1-1)) y la revocación del borrado ([1.2](docs/08-plan-de-desarrollo.md#tarea-1-2)) llevaban tiempo
      aplicados allá. Lo que de verdad le faltaba eran cinco migraciones: las claves de idempotencia
      ([1.13](docs/08-plan-de-desarrollo.md#tarea-1-13)), su purga ([1.16](docs/08-plan-de-desarrollo.md#tarea-1-16)), las dos tablas del canal firmado ([2.20](docs/08-plan-de-desarrollo.md#tarea-2-20)) y las dos filas de versión.
      De 45 comprobaciones en falla a **109 en `OK`**. Queda al revés: dev sin la `0.3.0`.
- [ ] ⚡ **uat y prod** ([9.12](docs/08-plan-de-desarrollo.md#tarea-9-12)) · Decisión — son los dos proyectos de Supabase que faltan, y
      desde que la [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) se partió tienen tarea propia, en el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9). Los dos son **de pago**
      ([19 §8.1](docs/19-ambientes-y-entrega.md#81-qué-se-paga-y-qué-no)), y **ya no falta averiguar nada:** el expediente está en el
      [§7.1](#71-el-expediente-de-uat-y-prod) con la cifra —≈ 55 USD al mes—, cada fuente con su fecha de consulta y las cuatro
      condiciones del [ADR-026](docs/adr/ADR-026-railway-al-final.md) comprobadas contra Railway una por una. Lo que falta es la firma de
      Gerencia, que es el paso 2 del [09 §3.1](docs/09-plan-de-implantacion.md#31-alistamiento-técnico-de-los-ambientes), y hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) no hay nada que promover a ellos.
- [x] **El repositorio de movimientos** ([3.3](docs/08-plan-de-desarrollo.md#tarea-3-3)) — hecho: tenía **36 tareas detrás** y abría el
      [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) entero. Lo que el dominio calcula ya llega a PostgreSQL con la persona de la sesión,
      y quien juzga si puede escribirlo es `mov_insercion`, no la API. Detrás se abren los saldos por
      cuenta ([3.12](docs/08-plan-de-desarrollo.md#tarea-3-12)) y el anticipo como pasivo ([4.4](docs/08-plan-de-desarrollo.md#tarea-4-4)), y los endpoints ([3.4](docs/08-plan-de-desarrollo.md#tarea-3-4)) quedan esperando solo
      a su contrato.
- [x] **La gestión de usuarios** ([2.7](docs/08-plan-de-desarrollo.md#tarea-2-7)) — hecha: era lo que más quedaba por destrabar del
      [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2), y detrás se abren la tabla única de activos y desactivados ([2.15](docs/08-plan-de-desarrollo.md#tarea-2-15)), la bitácora
      con su reversión ([2.16](docs/08-plan-de-desarrollo.md#tarea-2-16)) y el cambio obligatorio al reactivar ([2.17](docs/08-plan-de-desarrollo.md#tarea-2-17)). **Hasta hoy las únicas
      personas que existían eran las seis de `seed.sql`**, con contraseñas conocidas; ahora Gerencia
      da de alta a quien haga falta, y el aviso de este mismo [§10](#10-decisiones-de-construcción-que-conviene-revisar) sobre esas contraseñas por fin se
      puede cerrar. Con ella entró el [ADR-033](docs/adr/ADR-033-service-role-solo-en-auth.md), que resolvió una contradicción que llevaba abierta
      desde el [CU-29](docs/02-casos-de-uso.md#cu-29): crear una identidad no tenía credencial con la que hacerse.
- [x] **La sesión de 30 días** ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)) — hecha: era lo último del acceso. La aplicación pasa de
      «entra y no la recargues» a usarse un día entero, y con ella entraron las tres operaciones de
      `/sesiones` que el front llamaba contra un 404.
- [x] **El filtro de firma** ([2.13](docs/08-plan-de-desarrollo.md#tarea-2-13)) — hecho: tenía **41 tareas detrás** y era el último eslabón
      del camino crítico [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1) → [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12) → esta. El canal firmado existe de los dos lados, y con él
      entró en servicio el registro de idempotencia.
- [x] **Una sola licencia** · Decisión — resuelta: **AGPL-3.0 en los cuatro repositorios**. La API y
      la base venían con GPL-3.0 del `Initial commit` con que GitHub crea un repositorio, sin que
      nadie la hubiera elegido, y el hueco caía justo donde importa: PRISMA no se distribuye, se
      **sirve por la red**, así que la GPL no obliga a publicar nada a quien tome la API, la
      modifique y la ofrezca como servicio. La sección 13 de la AGPL es lo que cierra eso, y estaba
      puesta en el front —que no decide nada— y no en la API, donde vive toda la lógica.
- [x] **La sesión contra Supabase Auth** ([2.1](docs/08-plan-de-desarrollo.md#tarea-2-1)) — hecha: era lo que más liberaba, con 51 tareas
      detrás, y con ella arranca el [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) entero. El carril Front deja de estar parado, y la
      puerta a la base de la [1.6](docs/08-plan-de-desarrollo.md#tarea-1-6) pasa de estar probada a estar usada.
- [x] **La tabla `usuarios`** ([2.4](docs/08-plan-de-desarrollo.md#tarea-2-4)) — hecha: ya se le ve cumplir el [04 §4.2](docs/04-modelo-de-datos.md#42-cargos-usuarios-y-cuentas) con sesión de verdad.
      Destrabó la [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1), y con ella el [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) entero.
- [x] **El filtro de idempotencia** ([1.14](docs/08-plan-de-desarrollo.md#tarea-1-14)) — hecha: tenía **46 tareas detrás**, y ninguna vuelve a
      tocarse por esto. Toda petición bajo `/api/v0/` exige `Idempotency-Key` ([ADR-020](docs/adr/ADR-020-idempotencia.md)) salvo el
      ingreso y la renovación, y **el filtro abre la única transacción de la petición**, que es lo
      que hace que la clave y el efecto caigan juntos. Registrar la clave espera al filtro de sesión
      ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)): hasta ese día ninguna petición trae identidad.
- [x] **La identidad hasta PostgreSQL** ([1.6](docs/08-plan-de-desarrollo.md#tarea-1-6)) — hecha: RLS ya juzga a la persona y no a
      `prisma_api`. Destrabó la prueba de permisos ([1.7](docs/08-plan-de-desarrollo.md#tarea-1-7)) y, con la tabla de la [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13), la idempotencia
      ([1.14](docs/08-plan-de-desarrollo.md#tarea-1-14)); el acceso del [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) espera ahora a la tabla `usuarios` ([2.4](docs/08-plan-de-desarrollo.md#tarea-2-4)).

---

## 2. Sprint 0 · proyectos, ambientes y contrato

- [x] [**0.1**](docs/08-plan-de-desarrollo.md#tarea-0-1) Proyecto `prisma_api`: Java 25, Spring Boot 4 y Gradle, con el esqueleto hexagonal · API
- [x] [**0.2**](docs/08-plan-de-desarrollo.md#tarea-0-2) Regla de frontera con ArchUnit en la integración continua · API
- [x] [**0.3**](docs/08-plan-de-desarrollo.md#tarea-0-3) Proyecto `prisma_front` en Flutter, web por defecto · Front
- [x] [**0.4**](docs/08-plan-de-desarrollo.md#tarea-0-4) Los proyectos **dev y qa** de Supabase · Decisión — los dos gratuitos, cada uno con
      su base, sus claves y su almacenamiento, y encima el esquema, la semilla y el rol `prisma_api`,
      con el que RLS ya juzga a la API. **Los dos de pago se fueron al [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9)**, a la [9.12](docs/08-plan-de-desarrollo.md#tarea-9-12): uat y
      prod los firma Gerencia y hasta allá no hay nada que promover a ellos
- [x] [**0.5**](docs/08-plan-de-desarrollo.md#tarea-0-5) Rol `prisma_api` sin `BYPASSRLS`, sin `SUPERUSER` y sin ser dueño de las tablas ·
      Base — creado en dev y en qa; en dev ya se comprobó que RLS lo juzga
- [x] [**0.6**](docs/08-plan-de-desarrollo.md#tarea-0-6) Secretos fuera del repositorio: variables de entorno en la API y `--dart-define` en el
      front · API, Front
- [x] [**0.7**](docs/08-plan-de-desarrollo.md#tarea-0-7) Integración continua por proyecto: formato, análisis, pruebas y compilación · API, Front
- [x] [**0.8**](docs/08-plan-de-desarrollo.md#tarea-0-8) Imagen de la API arrancando **en dev**, en Railway ([ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md)) · API — la aplicación
      lee el `PORT` que le inyectan, y la sonda de disponibilidad mira la base en vez de responder
      `UP` con ella caída: `/actuator/health/readiness` contesta `UP` en dev, así que arranca **y**
      alcanza la base. Los otros tres ambientes, en el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9)
- [x] [**0.9**](docs/08-plan-de-desarrollo.md#tarea-0-9) Entrega a dev al fusionar ([ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md)), con la receta de construcción del front
      —`Dockerfile`, `nginx` y `.dockerignore`— que hasta ahora no existía · API, Front — dev sirve
      la `0.3.0`, que es lo último de `develop`, y los dos servicios tienen su último despliegue en
      `SUCCESS`. Se marcó **al ver el despliegue en verde**, no al fusionar, como fijó `plan/15`: el
      artefacto publicado ya trae `X-Prisma-Firma`
- [x] [**0.10**](docs/08-plan-de-desarrollo.md#tarea-0-10) SemVer y migraciones con `schema_version` · Base — la tabla guarda una fila por
      versión publicada y hoy va por la `0.3.0`, con sus etiquetas de [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) puestas. Desde el
      [ADR-034](docs/adr/ADR-034-la-version-sube-en-cada-pr.md) la API la lee de la base, en vez de la variable `PRISMA_ESQUEMA`, y cada migración
      publica la suya en su mismo PR
- [x] [**0.11**](docs/08-plan-de-desarrollo.md#tarea-0-11) `POST /api/v0/consultas/version`: versión de la API, del esquema y ambiente · API
- [x] [**0.12**](docs/08-plan-de-desarrollo.md#tarea-0-12) Insignia `v0.1.0 · Desarrollo` en el pie de la barra lateral y franja de ambiente · Front
- [x] [**0.13**](docs/08-plan-de-desarrollo.md#tarea-0-13) El front comprueba el MAJOR de la API y bloquea con la pantalla del mockup · Front
- [x] [**0.14**](docs/08-plan-de-desarrollo.md#tarea-0-14) Sobre `{status, mensaje, data}` en toda respuesta, también en los errores · API
- [x] [**0.15**](docs/08-plan-de-desarrollo.md#tarea-0-15) Catálogo único de códigos de cinco dígitos · API, Contrato
- [x] [**0.16**](docs/08-plan-de-desarrollo.md#tarea-0-16) Prueba [C-03](docs/12-pruebas-y-calidad.md#c-03): el catálogo contra el código fuente, en los dos sentidos · API
- [x] [**0.17**](docs/08-plan-de-desarrollo.md#tarea-0-17) Descriptor de formulario generado del propio validador ([RF-102](docs/03-requisitos-y-bdd.md#rf-102)) · API
- [x] [**0.18**](docs/08-plan-de-desarrollo.md#tarea-0-18) Swagger en `/docs` y prueba [C-04](docs/12-pruebas-y-calidad.md#c-04) contra la copia fijada del contrato · API, Contrato
- [x] [**0.19**](docs/08-plan-de-desarrollo.md#tarea-0-19) Sistema de diseño del mockup en widgets: tablas, paneles de confirmación en línea, y
      fechas y porcentajes con el formato colombiano · Front — la tabla se desplaza de lado cuando
      no cabe en vez de encoger las columnas, y el panel de confirmación no trae ninguna regla:
      el campo y el mensaje de error se los pasan

**Hecho fuera de la numeración:**

- [x] CORS con un origen por ambiente · API
- [x] Hilos virtuales de Java 25 en cada petición, vigilados por `HilosVirtualesTest` · API
- [x] Java 25, Gradle y Spring Boot 4 ([ADR-024](docs/adr/ADR-024-java-25-y-gradle.md)) · API
- [x] Cuatro repositorios en GitHub, cada uno con su remoto ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)); este, desde el 16/09/2026 · Decisión
- [x] Contrato v0.2.0 en `contrato/`, con su copia fijada en la API · Contrato
- [x] Alojamiento: Railway, al final del desarrollo ([ADR-026](docs/adr/ADR-026-railway-al-final.md)) · Decisión
- [x] Hito [H0](docs/08-plan-de-desarrollo.md#h0): mockup confirmado por Gerencia el 16/09/2026 · Decisión

**Hito [H1](docs/08-plan-de-desarrollo.md#h1):** la insignia y el sobre en toda respuesta ya se cumplen; el despliegue automático a dev
se cierra con la [0.9](docs/08-plan-de-desarrollo.md#tarea-0-9), que volvió a este sprint por [ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md).

---

## 3. Sprint 1 · base, RLS, identidad e idempotencia

✏️ quiere decir que el SQL ya está en la migración inicial de `prisma_db`
(`20260915120000_esquema_inicial.sql`) pero nunca corrió contra una base: no cuenta como hecho
hasta aplicarlo y probarlo.

- [x] [**1.1**](docs/08-plan-de-desarrollo.md#tarea-1-1) Esquema completo con restricciones con nombre explícito · Base — en dev: los **nueve
      dominios** de [04 §4.1](docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes) puestos en sus **61 columnas** —solo doce traían la regla escrita a
      mano—, once restricciones y un índice renombrados como los llama el documento, y **ninguna
      restricción con el nombre que le puso PostgreSQL**
- [x] [**1.2**](docs/08-plan-de-desarrollo.md#tarea-1-2) Revocar `DELETE` y `TRUNCATE` · Base — a **todos** los roles menos al dueño, no solo a
      `authenticated`: `anon` borraba filas de verdad por la Data API y **vaciaba `auditoria` con un
      `TRUNCATE`**, que no pasa por RLS
- [x] [**1.3**](docs/08-plan-de-desarrollo.md#tarea-1-3) Triggers de auditoría sobre las tablas de negocio · Base — las catorce tablas de
      [04 §5.4](docs/04-modelo-de-datos.md#54-auditoría-por-triggers) escriben, y la anulación queda marcada `ANULAR` y no `UPDATE`. Una sesión no puede
      escribir la bitácora por su cuenta
- [x] [**1.4**](docs/08-plan-de-desarrollo.md#tarea-1-4) `fn_es_gerencia` y políticas RLS · Base — probadas **con sesión real**: Operación se ve
      solo a sí misma y no alcanza retiros, pro-labore, sobres, cierres, costos ni bitácora;
      Gerencia ve todo y ni ella degrada a la última Gerencia
- [x] [**1.5**](docs/08-plan-de-desarrollo.md#tarea-1-5) `FORCE ROW LEVEL SECURITY` · Base — en **catorce** tablas, en dev y en qa. No en
      `usuarios` ni en `auditoria`, que [04 §7.1](docs/04-modelo-de-datos.md#71-force-row-level-security-por-qué-ahora-sí-hace-falta) excluye a propósito: a la primera le volvería la
      recursión infinita y la segunda dejaría de escribirse entera
- [x] [**1.6**](docs/08-plan-de-desarrollo.md#tarea-1-6) Transacción por petición con `request.jwt.claims` y `SET LOCAL ROLE authenticated` · API —
      `ConIdentidad` fija los claims con `set_config(…, true)` y el rol con `SET LOCAL`, así que los dos se
      van con la transacción; los repositorios piden el acceso a `jdbc()`, que fuera de ella lanza
      `ConsultaSinIdentidad` ([T-01](docs/12-pruebas-y-calidad.md#t-01)). Siete pruebas contra la base local, conectada como `prisma_api`, y
      rotas a propósito: sin el `true`, la identidad de una petición se quedaba pegada a la conexión
      y la siguiente veía lo que no debía. Las corre `./gradlew integracion`, no `build`
- [x] [**1.7**](docs/08-plan-de-desarrollo.md#tarea-1-7) Prueba de permisos con sesión real · API — marcela entra **por HTTP, con su
      usuario y su contraseña**, y de esa sesión de Operación salen [P-01](docs/12-pruebas-y-calidad.md#p-01) a [P-32](docs/12-pruebas-y-calidad.md#p-32): el patrimonio, los costos, la
      auditoría y las cuatro tablas de Gerencia llegan vacías —y la base tiene filas en todas, o el
      vacío no probaría nada—; el desprendible propio llega y el ajeno no; y crear un usuario,
      ascenderse sola, tocar el catálogo de cargos, corregir un cliente o registrarse un adelanto
      los rechaza PostgreSQL. De cada rechazo se afirma **que trajo el `42501` de una política o el
      `P0001` de un trigger**, no que lanzó algo. [P-32](docs/12-pruebas-y-calidad.md#p-32) repite la lectura **sin capa de aplicación en
      medio** y el resultado no cambia. **Y la tubería ya las corre**: un trabajo nuevo descarga
      `prisma_db` por etiqueta y levanta Supabase ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) [§3](#3-sprint-1--base-rls-identidad-e-idempotencia)), así que [C-01](docs/12-pruebas-y-calidad.md#c-01) y las demás por fin
      gatean un PR. Rota a propósito abriendo `usuarios_lectura`: [P-10](docs/12-pruebas-y-calidad.md#p-10) y [P-32](docs/12-pruebas-y-calidad.md#p-32) en rojo las dos
- [x] [**1.8**](docs/08-plan-de-desarrollo.md#tarea-1-8) Traducción restricción → código del catálogo · API —
      `TraduccionDeRestricciones` cruza `(objeto, restricción)` con el catálogo, y [C-01](docs/12-pruebas-y-calidad.md#c-01) la compara
      con `pg_constraint` en las dos direcciones: renombrar una restricción falla las dos a la vez
- [x] [**1.9**](docs/08-plan-de-desarrollo.md#tarea-1-9) `Dinero` en Java y en Dart · API, Front — en la API, sumas que fallan al desbordar,
      porcentaje `HALF_UP` y formato colombiano; en el front, un tipo sin operadores y su formato en
      `ui/formato/moneda.dart`. Pruebas con las cifras de los documentos [05](docs/05-reglas-financieras.md) y [06](docs/06-nomina-y-capacidad-de-pago.md), verificadas en negativo
- [x] [**1.10**](docs/08-plan-de-desarrollo.md#tarea-1-10) Cuentas y categorías: endpoints y pantalla ([RF-97](docs/03-requisitos-y-bdd.md#rf-97)) · API, Front, Base —
      salió de un rojo que se veía en dev: las tres listas del registro rápido decían «no se
      pudieron cargar las opciones», y el aviso era cierto, porque las rutas que el formulario
      «movimiento» nombra en `origen` estaban acordadas desde la [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17) y no las servía nadie. Ahora
      existen las cuatro operaciones: las cuentas **sin saldo**, para que Operación elija sin ver la
      caja; el árbol de categorías con su naturaleza, su marca de fijo y su madre; y el alta de cada
      una, que estrena `42220`, `42221` y `42222` y el tipo de campo `casilla`. El «solo Gerencia»
      del contrato **lo impone ahora la base** —`cuentas_escritura` y `categorias_escritura`, con el
      molde de `cargos`—, que era la decisión que el [§10](#10-decisiones-de-construcción-que-conviene-revisar) le dejó anotada a esta tarea: sin la
      migración, Operación creaba las dos. En el front, el panel «Cuentas de dinero» vive dentro de
      Movimientos y **se pinta solo si la navegación lo dice**, en el campo `puedeGestionarCuentas`
      que estrena el contrato `0.16.0`. 133 comprobaciones de la base en `OK`, 701 pruebas y 12 de
      integración en la API, y 317 en el front
- [x] [**1.11**](docs/08-plan-de-desarrollo.md#tarea-1-11) Semilla reproducible para dev y qa · Base — ids y fechas escritos,
      re-ejecutable sin borrar nada, y con filas en toda tabla que leen [P-01](docs/12-pruebas-y-calidad.md#p-01) a [P-31](docs/12-pruebas-y-calidad.md#p-31), porque una tabla
      vacía hace pasar «no ve lo ajeno» por la razón equivocada. `scripts/db/sembrar.ps1` la lleva a
      dev y a qa, y se niega con uat y prod. 78 comprobaciones en `OK` contra la base local, y la
      semilla corrida entera contra dev dentro de una transacción revertida
- [x] [**1.12**](docs/08-plan-de-desarrollo.md#tarea-1-12) Primera promoción de migraciones dev → qa · Base — corrida con el
      procedimiento del [16 §5.3](docs/16-base-de-datos-y-snapshots.md#53-promover-a-qa-paso-a-paso), que estrenó su paso 0: apuntar el CLI a qa, porque
      `--linked` obedece al último `supabase link` y ese apuntaba a dev. El retrato de antes dio **45
      comprobaciones en falla de 109**; el de después, **109 en `OK`**, con la semilla recargada. Se
      aplicaron **cinco** migraciones y no las cuatro que decían los documentos: los dominios y la
      revocación del borrado **ya estaban en qa**, y lo que le faltaba de verdad era la idempotencia
      entera, el canal firmado entero y la purga. `schema_version` publica `0.3.0`, que esta misma
      tarea escribió para no dejar a la `0.2.0` describiendo de menos
- [x] [**1.13**](docs/08-plan-de-desarrollo.md#tarea-1-13) Tabla `peticiones_idempotentes` · Base — transcrita del [04 §4.9](docs/04-modelo-de-datos.md#49-claves-de-idempotencia) en
      una migración nueva, con su índice por vencimiento, las tres políticas `idem_*` y `FORCE`. Cada
      persona lee, escribe y sella solo sus claves, **y Gerencia no es excepción**; nadie que atienda
      peticiones borra una. `verificar-base.sql` lo pregunta con sesión de verdad ([P-33](docs/12-pruebas-y-calidad.md#p-33), [P-34](docs/12-pruebas-y-calidad.md#p-34) y
      [P-37](docs/12-pruebas-y-calidad.md#p-37)) y lo vio fallar abriendo cada política. Sin trigger de auditoría ni purga, que es la [1.16](docs/08-plan-de-desarrollo.md#tarea-1-16)
- [x] [**1.14**](docs/08-plan-de-desarrollo.md#tarea-1-14) Filtro de idempotencia · API — el filtro abre **la única transacción de la
      petición** y corre la cadena adentro, así que la fila de la clave y el efecto se confirman o se
      revierten juntos ([20 §5.5](docs/20-contrato-de-api.md#55-la-regla-que-hace-que-esto-sea-real-y-no-decorativo)); una regla de ArchUnit deja que nadie más la abra. La cabecera se
      exige en toda petición, lea o escriba, con las dos de sesión exentas por ruta exacta, y la
      frontera la escribe un solo sitio que usan el filtro **y** el OpenAPI generado. Las cuatro
      situaciones del [20 §5.2](docs/20-contrato-de-api.md#52-las-cuatro-situaciones) probadas contra la base, más la clave vencida que se reutiliza y el
      `5xx` que no se guarda: 447 pruebas en verde y 20 de integración
- [x] [**1.15**](docs/08-plan-de-desarrollo.md#tarea-1-15) Prueba de corte entre el efecto y la clave · API — [I-02](docs/12-pruebas-y-calidad.md#i-02)
      no espera el corte: lo provoca en los tres sitios donde puede caer. **Entre las dos
      escrituras** —con la fila de la clave ya puesta, que el endpoint mira antes de reventar,
      para que el verde no sea el de una operación que nunca empezó—, **después del efecto**, y
      **sin aviso**: le matan la conexión desde fuera con el gasto ya escrito, así que nadie pide
      ningún `rollback` y lo que cumple la promesa es PostgreSQL. Los tres cuentan **las filas de
      las dos tablas**. Rotos a propósito sacando la clave a su propia transacción: los cortes en
      rojo e [I-01](docs/12-pruebas-y-calidad.md#i-01) en verde, que es justo lo que el [12 §10.1](docs/12-pruebas-y-calidad.md#101-i-02--el-corte-es-lo-que-hace-real-la-idempotencia) dice que
      pasa. 131 de integración
- [x] [**1.16**](docs/08-plan-de-desarrollo.md#tarea-1-16) Purga de claves vencidas a las 72 horas · API, Base — `pg_cron` agenda
      `purgar_peticiones_idempotentes` con el horario y la sentencia del [04 §4.9](docs/04-modelo-de-datos.md#49-claves-de-idempotencia), corriendo como el
      rol de migraciones y no como el de la aplicación, que sigue sin `DELETE`. `verificar-base.sql`
      no mira el catálogo: siembra una clave vencida y una vigente, corre la purga y pregunta qué
      quedó ([P-38](docs/12-pruebas-y-calidad.md#p-38)), y comprueba que la vigilancia del [16 §10.2](docs/16-base-de-datos-y-snapshots.md#102-cómo-se-vigila-que-siguen-corriendo) calla sana y habla con una fila
      vieja ([P-39](docs/12-pruebas-y-calidad.md#p-39)). 83 comprobaciones en `OK` y cinco roturas a propósito vistas fallar
- [x] [**1.17**](docs/08-plan-de-desarrollo.md#tarea-1-17) Contrato de cuentas y categorías · Contrato — `openapi.json` v0.3.0: leer y crear
      de `/cuentas` y `/categorias`, los formularios `cuenta` y `categoria` con sus mensajes, y los
      códigos `42220` a `42222`. El descriptor suma `opciones`, `origen` y el tipo `casilla`, que es
      lo que una lista necesitaba para pintarse sin que el front decida nada. La copia fijada en
      `prisma_api` sube con la [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10)
- [x] [**1.18**](docs/08-plan-de-desarrollo.md#tarea-1-18) Renderizador del descriptor de formulario en el front ([RF-102](docs/03-requisitos-y-bdd.md#rf-102)) · Front — pinta los cinco
      tipos de campo con el teclado, los límites, las opciones y los avisos que manda la API, y
      entrega los valores listos para una `Accion`. Un descriptor que no se puede pintar entero no se
      pinta: la prueba que sostiene el requisito cambia el mensaje en el descriptor y exige que
      cambie el de la pantalla
- [x] [**1.19**](docs/08-plan-de-desarrollo.md#tarea-1-19) Cliente HTTP con `Idempotency-Key`, generada una vez por acción ([ADR-020](docs/adr/ADR-020-idempotencia.md)) · Front — la
      clave nace con la `Accion` y no con la petición: reenviar la misma acción es reintentar, y
      crear otra es hacer otra cosa
- [x] [**1.20**](docs/08-plan-de-desarrollo.md#tarea-1-20) Decidir cómo consiguen la API y su CI el esquema de `prisma_db` · Decisión — por
      **etiqueta** ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md)): `prisma_db` etiqueta cada versión del esquema, la API declara la que
      necesita en `prisma.esquema` y su integración continua descarga ese repositorio en esa etiqueta
      y levanta la base con el Supabase CLI. Las pruebas de integración llevan etiqueta de JUnit y no
      corren en la compilación normal, que es la única forma de trabajar sin Docker
- [x] [**1.21**](docs/08-plan-de-desarrollo.md#tarea-1-21) `anon` no toca nada · Base — la migración escribe el bloque del
      [04 §9.1](docs/04-modelo-de-datos.md#91-anon-no-toca-nada) y le suma el `EXECUTE` de las cinco funciones, que ese bloque no nombra.
      No era teórico: contra la base local, `anon` —cuya clave es pública— leía **las 352 filas de
      `movimientos`**, miraba la secuencia de la auditoría y ejecutaba `fn_es_gerencia`. Apagar la
      Data API lo tapa en el proyecto donde se apaga y en ninguno más, así que **uat y prod nacerían
      abiertos**; el `ALTER DEFAULT PRIVILEGES` es lo que hace que la próxima tabla nazca cerrada.
      `schema_version` publica `0.7.0`, y `verificar-base.sql` lo pregunta volviéndose `anon` en vez
      de mirar el catálogo: **150 comprobaciones en `OK`**, nueve suyas

---

## 4. Sprint 2 · acceso, usuarios, cargos y canal firmado

- [x] [**2.1**](docs/08-plan-de-desarrollo.md#tarea-2-1) Autenticación contra Supabase Auth desde la API, con el correo sintético en el
      servidor · API — `POST /api/v0/sesiones`, y con ella **la primera transacción con identidad
      que abre una petición de verdad**: la ficha de `usuarios` se lee con RLS juzgando, no con un
      `if`. El usuario se normaliza y el correo se arma en el servidor ([ADR-009](docs/adr/ADR-009-login-por-usuario.md)); un usuario que no
      existe y una contraseña equivocada responden **el mismo cuerpo byte a byte** ([A-04](docs/12-pruebas-y-calidad.md#a-04)), y el
      desactivado responde `40301` solo con la contraseña correcta. Trae el tipo de campo `clave`,
      el formulario «acceso» y los códigos `40104` y `40301`. Veintisiete pruebas nuevas, 417 en
      verde, y siete más entrando con las cinco personas de la semilla contra el Supabase local
- [x] [**2.2**](docs/08-plan-de-desarrollo.md#tarea-2-2) Sesión de 30 días y enrutamiento según la navegación que dicta la API · API, Front —
      **la sesión sobrevive a recargar la página**, que es lo que faltaba para que la aplicación se
      pueda usar: el token y la clave de firma siguen viviendo solo en memoria ([ADR-021](docs/adr/ADR-021-canal-firmado.md)) y lo que
      queda es la cookie `prisma_renovacion`, `HttpOnly`, que el front **no puede leer** —se comprobó
      en Chrome: `document.cookie` viene vacío—. Con ella entran las otras tres operaciones de
      `/sesiones`, que el front llamaba y respondían 404: renovar, cerrar y cambiar la propia
      contraseña. Un token vencido pasa a responder `40100` y no `40101`, y con eso el cliente
      renueva y reintenta solo en vez de mandar a la pantalla de acceso cada hora. Arriba, el topbar
      del [10 §5.3](docs/10-ux-y-mockups.md#53-la-sesión-en-el-topbar) con la identidad ([RF-83](docs/03-requisitos-y-bdd.md#rf-83)) y el menú de la sesión, donde «Gestión de usuarios»
      aparece solo si la API lo dijo
- [x] [**2.3**](docs/08-plan-de-desarrollo.md#tarea-2-3) Tabla `cargos` con semilla y RLS · Base — **sin migración nueva**: la tabla,
      sus seis cargos de arranque y sus dos políticas ya eran las del [04 §4.2](docs/04-modelo-de-datos.md#42-cargos-usuarios-y-cuentas) y el [§7](docs/04-modelo-de-datos.md#7-seguridad-por-tipo-de-usuario-rls). Lo
      que la cierra es verla juzgar con sesión real ([P-14](docs/12-pruebas-y-calidad.md#p-14) y [P-15](docs/12-pruebas-y-calidad.md#p-15)): Operación lee el catálogo, no
      crea un cargo y su intento de desactivar uno no alcanza ninguna fila; Gerencia crea y desactiva,
      y ni ella desactiva sin motivo. Once comprobaciones en `verificar-base.sql`, en verde en local
      y en dev
- [x] [**2.4**](docs/08-plan-de-desarrollo.md#tarea-2-4) Tabla `usuarios` con `usuario`, `nombre_completo`, `cargo_id` y `tipo` · Base —
      **sin migración nueva**, como la [2.3](docs/08-plan-de-desarrollo.md#tarea-2-3): la tabla ya traía las trece columnas del [04 §4.2](docs/04-modelo-de-datos.md#42-cargos-usuarios-y-cuentas), sus
      nueve restricciones con nombre y el índice parcial `idx_usuarios_tipo`. Lo que la cierra es
      verla cumplir: el formato de `usuario`, el único **sin distinguir mayúsculas** —que es para lo
      que está el `CITEXT`—, el nombre de tres letras, el cargo que tiene que existir y la
      desactivación con motivo, autor y hora. Diez comprobaciones más en `verificar-base.sql`, cada
      una **diciendo con qué sesión corre**: `tg_congelar_ficha_propia` es un trigger `BEFORE` y
      rechaza antes que la restricción a todo el que no sea Gerencia, ni siquiera el dueño de la
      tabla
- [ ] ✏️⚡ [**2.5**](docs/08-plan-de-desarrollo.md#tarea-2-5) Trigger `tg_proteger_ultima_gerencia` · Base — escrito en la migración inicial
- [x] [**2.6**](docs/08-plan-de-desarrollo.md#tarea-2-6) Pantalla de acceso y cambio obligatorio de contraseña · Front — las dos capas del
      mockup, con sus campos pedidos a `POST /api/v0/consultas/formularios`, «acceso» y «cambio-de-clave».
      «Crea tu contraseña» no se puede saltar porque el tablero **no está en el árbol** hasta que la
      cambie ([BDD-32-1](docs/03-requisitos-y-bdd.md#bdd-32-1)), y ningún mensaje de la API vive en el front: una prueba de frontera
      falla si aparece. Trae el sexto tipo de campo del descriptor, `clave`, que el contrato v0.4.0
      agregó y el renderizador de la [1.18](docs/08-plan-de-desarrollo.md#tarea-1-18) todavía no conocía
- [x] [**2.7**](docs/08-plan-de-desarrollo.md#tarea-2-7) Gestión de usuarios: crear, editar, desactivar con motivo y restablecer clave · API, Front —
      Gerencia ya puede dar de alta a alguien, que hasta ahora solo sabía hacerlo `seed.sql`. Las
      seis operaciones acordadas menos la reactivación, que es la [2.15](docs/08-plan-de-desarrollo.md#tarea-2-15), y **ni un permiso escrito
      en la API**: quien decide si Gerencia puede crear es `usuarios_insercion`, y al último usuario
      de Gerencia lo rechaza un trigger que estaba puesto desde el esquema inicial. El descriptor
      estrena `opciones` y `origen`, que el contrato declaraba y ningún formulario usaba
- [ ] 🔒 [**2.8**](docs/08-plan-de-desarrollo.md#tarea-2-8) Catálogo de cargos · API, Front
- [ ] 🔒 [**2.9**](docs/08-plan-de-desarrollo.md#tarea-2-9) Registro de cada inicio de sesión con fecha, dispositivo e IP · API, Base
- [x] [**2.10**](docs/08-plan-de-desarrollo.md#tarea-2-10) Panel «Acerca de» ([RF-100](docs/03-requisitos-y-bdd.md#rf-100)) · Front, API — los seis datos de [19 §5.3](docs/19-ambientes-y-entrega.md#53-el-panel-acerca-de), y lo que
      no se pudo consultar lo dice en vez de inventarlo
- [ ] ⚡ [**2.11**](docs/08-plan-de-desarrollo.md#tarea-2-11) La prueba de permisos del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1), también contra la base de qa · API
- [x] [**2.12**](docs/08-plan-de-desarrollo.md#tarea-2-12) Clave de firma de sesión, solo en memoria en el front · API, Front — la API ya la entregaba; ahora el front **firma con ella**: `Authorization` y las tres cabeceras del [20 §6.1](docs/20-contrato-de-api.md#61-las-tres-cabeceras) en cada petición con sesión, y ninguna en las dos rutas exentas
- [x] [**2.13**](docs/08-plan-de-desarrollo.md#tarea-2-13) Filtro de firma: HMAC, nonce y marca de tiempo (`40101` a `40103`) · API — el
      canal firmado existe por fin de los dos lados: desde la [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12) el front mandaba las tres
      cabeceras y **nadie las miraba**. Los cuatro casos del [H3](docs/08-plan-de-desarrollo.md#h3) corren contra la base: pasa firmada,
      `40103` al reenviarla tal cual, `40102` con la marca corrida seis minutos a cualquiera de los
      dos lados, y `40101` con un byte cambiado en el cuerpo después de firmar
- [x] [**2.14**](docs/08-plan-de-desarrollo.md#tarea-2-14) Navegación dictada por la API ([RF-103](docs/03-requisitos-y-bdd.md#rf-103)) · API, Front — la API
      decide qué secciones ve cada tipo y el front las pinta **sin ninguna lista propia**: una
      prueba de frontera falla si alguien escribe una en `lib/`. Y con ella el filtro de firma
      **publica la identidad**, que es lo que destraba el registro de idempotencia: llevaba desde
      la [1.14](docs/08-plan-de-desarrollo.md#tarea-1-14) escrito y sin usarse porque ninguna petición traía identidad
- [ ] 🔒 [**2.15**](docs/08-plan-de-desarrollo.md#tarea-2-15) Tabla única de usuarios activos y desactivados ([RF-84](docs/03-requisitos-y-bdd.md#rf-84) a [RF-87](docs/03-requisitos-y-bdd.md#rf-87)) · API, Front
- [ ] 🔒 [**2.16**](docs/08-plan-de-desarrollo.md#tarea-2-16) Bitácora de cambios y reversión sin borrar ([RF-88](docs/03-requisitos-y-bdd.md#rf-88), [RF-89](docs/03-requisitos-y-bdd.md#rf-89), [RF-91](docs/03-requisitos-y-bdd.md#rf-91)) · Base, API, Front
- [ ] ⚡ [**2.17**](docs/08-plan-de-desarrollo.md#tarea-2-17) Cambio de clave obligatorio al reactivar ([RF-90](docs/03-requisitos-y-bdd.md#rf-90)) · API, Front
- [x] [**2.18**](docs/08-plan-de-desarrollo.md#tarea-2-18) Vista previa de Operación para Gerencia ([RF-92](docs/03-requisitos-y-bdd.md#rf-92) a [RF-94](docs/03-requisitos-y-bdd.md#rf-94)) · Front, API — el
      contrato ya la declaraba entera y ahora el servidor la cumple: `vista=operacion` devuelve el
      menú de Operación y el aviso de la franja, y **volver a mi vista es pedir la navegación con el
      cuerpo vacío**, que por eso no tiene un `vista=gerencia`. **El front no recorta el menú: lo
      vuelve a pedir** ([ADR-018](docs/adr/ADR-018-front-sin-decisiones.md)), y `frontera_test.dart` ya lo hacía imposible de otra forma. Las dos
      banderas siguen saliendo del tipo **real**: `puedeGestionarUsuarios` cae ([A-17](docs/12-pruebas-y-calidad.md#a-17)) y
      `puedeVerComoOperacion` no ([A-18](docs/12-pruebas-y-calidad.md#a-18)), o Gerencia quedaría atrapada. La franja no se cierra
      ([A-19](docs/12-pruebas-y-calidad.md#a-19)), se apila con la de ambiente, y su texto lo redacta la API: el título y el párrafo del
      [RF-94](docs/03-requisitos-y-bdd.md#rf-94) entraron al mapa de `frontera_test.dart`, así que escribirlos en `lib/` rompe la
      compilación
- [x] [**2.20**](docs/08-plan-de-desarrollo.md#tarea-2-20) Tablas del canal firmado: `sesiones` y `nonces_vistos` · Base — apareció al ir a
      hacer la [2.13](docs/08-plan-de-desarrollo.md#tarea-2-13): el filtro no tenía dónde leer la clave de firma que la [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12) entrega
      y olvida, y `nonces_vistos` llevaba días especificada en el [04 §4.10](docs/04-modelo-de-datos.md#410-los-nonce-vistos) sin que ninguna
      migración la creara. Aplicada en la base local y con sus **catorce** comprobaciones en `OK`
      dentro de las 109 de `verificar-base.sql`
- [x] [**2.19**](docs/08-plan-de-desarrollo.md#tarea-2-19) Contrato de acceso, usuarios, cargos y canal firmado · Contrato — v0.4.0: `/sesiones`,
      `/navegacion`, `/usuarios`, `/cargos` y `/bitacora`, siete formularios más y los códigos `40100`
      a `40104`, `40301`, `40302`, `40910` a `40913` y `42210` a `42214`. El canal firmado va con sus
      tres cabeceras `X-Prisma-`; cómo se arma la firma, al byte, vive en [20 §6.2](docs/20-contrato-de-api.md#62-cómo-se-arma-la-firma) y no se copia aquí
- [ ] ⚡ [**2.21**](docs/08-plan-de-desarrollo.md#tarea-2-21) Auditoría de `usuarios` y eventos con nombre · Base — sin ella la bitácora
      solo puede enseñar filas de `cargos`, y la esperan la [2.9](docs/08-plan-de-desarrollo.md#tarea-2-9), la [2.15](docs/08-plan-de-desarrollo.md#tarea-2-15) y la [2.16](docs/08-plan-de-desarrollo.md#tarea-2-16)
- [ ] ⚡ [**2.22**](docs/08-plan-de-desarrollo.md#tarea-2-22) `cargos`: nombre único sin mayúsculas y el cargo que no se desactiva · Base — dos
      códigos que el contrato promete desde el `0.4.0` y que hoy no tienen regla en la base

---

## 5. Sprints 3 a 8 · funcionalidades en cadenas paralelas

**Las cadenas avanzan a la vez y comparten lo mínimo**: cada una tiene sus tablas y su rango de
códigos ([21 §4.3](docs/21-trabajo-en-paralelo.md#43-fase-2--rebanadas-verticales-sprints-3-a-8)). El orden exacto dentro de cada una lo dan las dependencias del plan.

### Cadena A · el dinero

**[Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) · Movimientos**

- [x] [**3.1**](docs/08-plan-de-desarrollo.md#tarea-3-1) Dominio `Movimiento`, tipos y su efecto sobre utilidad, caja y patrimonio · API —
      los nueve tipos con su efecto sobre las tres cifras, y `aporteAUtilidad`, `aporteACaja` y
      `aporteAPatrimonio`, que devuelven lo que un movimiento le suma a cada una. Lo anulado aporta cero
- [x] [**3.2**](docs/08-plan-de-desarrollo.md#tarea-3-2) Caso de uso `RegistrarMovimiento` con doble fecha · API — la del movimiento la trae
      quien registra y la de digitación la pone el reloj del servidor; el futuro se rechaza y «hoy» es
      el día en `America/Bogota`
- [x] [**3.3**](docs/08-plan-de-desarrollo.md#tarea-3-3) Repositorio de movimientos contra PostgreSQL · API — `MovimientosEnPostgres`
      guarda por `ConIdentidad` el autor y el instante que puso el caso de uso, y la base juzga:
      registrar a nombre de otra persona lo rechaza `mov_insercion`
- [x] [**3.4**](docs/08-plan-de-desarrollo.md#tarea-3-4) Endpoints de movimientos con sus códigos del catálogo · API —
      `PUT /api/v0/movimientos/{id}` con el formulario «movimiento» y los cuatro códigos que
      estrenan el rango: la fecha futura, la cuenta, la categoría y la cuenta de destino. **La
      respuesta se lee de la base después de escribir**, en la misma transacción, porque el
      contrato declara nombres que la petición no trae. `prisma_api` en `0.4.0`, contrato `0.14.0`
      y 649 pruebas
- [x] [**3.5**](docs/08-plan-de-desarrollo.md#tarea-3-5) Formulario de registro rápido para celular, pintado del descriptor · Front —
      **la primera pantalla de sección**: el formulario «movimiento» lo describe la API, el registro
      es un `PUT` a su propio id —generado con la clave de idempotencia— y la intención se encola
      antes de salir a la red, así que sin señal queda «Pendiente de sincronizar». `prisma_front` en
      `0.4.0+4`, con 276 pruebas
- [ ] ⚡ [**3.6**](docs/08-plan-de-desarrollo.md#tarea-3-6) Foto del recibo comprimida, subida a través de la API · Front, API
- [ ] ⚡ [**3.7**](docs/08-plan-de-desarrollo.md#tarea-3-7) Transferencias entre cuentas · API
- [ ] ⚡ [**3.8**](docs/08-plan-de-desarrollo.md#tarea-3-8) Listado con filtros · API, Front
- [ ] ⚡ [**3.9**](docs/08-plan-de-desarrollo.md#tarea-3-9) Anulación con motivo obligatorio · API, Front
- [ ] 🔒 [**3.10**](docs/08-plan-de-desarrollo.md#tarea-3-10) Corrección por contra-asiento · API
- [x] [**3.11**](docs/08-plan-de-desarrollo.md#tarea-3-11) Marca de registro tardío · API — más de 7 días entre lo que ocurrió y lo que se
      digitó, contados en días de Bogotá
- [ ] ⚡ [**3.12**](docs/08-plan-de-desarrollo.md#tarea-3-12) Saldos por cuenta · API
- [x] [**3.13**](docs/08-plan-de-desarrollo.md#tarea-3-13) Contrato de movimientos · Contrato — registrar con `PUT` a su propio id,
      anular con motivo, adjuntar el soporte y el libro con filtros; ocho esquemas, el formulario
      `movimiento` y seis códigos del rango 20-29. Contrato `0.11.0`
- [x] [**3.14**](docs/08-plan-de-desarrollo.md#tarea-3-14) Tabla `adjuntos` y bucket de soportes · Base — la ficha del soporte
      con sus dos flechas excluyentes, su trigger de auditoría —el decimoquinto— y el bucket
      privado `soportes`, que **impone el techo de 5 MB y los cuatro tipos antes que el `CHECK`**.
      Esquema `0.4.0`, con 123 comprobaciones en `OK` contra la base local. **Falta promoverla a
      dev y a qa**
- [x] [**3.15**](docs/08-plan-de-desarrollo.md#tarea-3-15) `movimientos`: destino solo en transferencias, origen distinto del destino y la
      fecha contra el día de Bogotá · Base — las dos del destino solo las rechazaba el dominio de la
      API, y la transferencia a la misma cuenta **bajaba el saldo** en `v_saldos_cuenta`. Y
      `fecha_no_futura` dejó de mirar `CURRENT_DATE`, que es el día del huso con que se conecte la
      sesión: con la base en `UTC` aceptaba, de siete a doce de la noche, el mañana que la API
      rechaza con `42223`. Esquema `0.6.0`, con 141 comprobaciones en `OK` contra la base local.
      **Le deja dos filas a la API**, que van en el PR que suba su `prisma.esquema`, y **falta
      promoverla a dev y a qa**
- [x] [**3.16**](docs/08-plan-de-desarrollo.md#tarea-3-16) El andamio en el celular · Front — de 760 px para abajo, como el
      mockup, **el menú va arriba y de lado**: el logo y las pestañas en una barra fija, el topbar
      debajo a todo el ancho y la insignia al pie de la pantalla. Girar el celular no borra lo que
      se estaba escribiendo. `prisma_front` en `0.5.0+5`, con 296 pruebas

**[Sprint 6](docs/08-plan-de-desarrollo.md#sprint-6) · Reportes y KPIs**

- [ ] 🔒 [**6.1**](docs/08-plan-de-desarrollo.md#tarea-6-1) Utilidad causada, flujo de caja y caja libre · API
- [ ] 🔒 [**6.2**](docs/08-plan-de-desarrollo.md#tarea-6-2) Pruebas con el ejemplo de septiembre completo · API
- [ ] 🔒 [**6.3**](docs/08-plan-de-desarrollo.md#tarea-6-3) Dashboard con las tres cifras · Front
- [ ] 🔒 [**6.4**](docs/08-plan-de-desarrollo.md#tarea-6-4) Gráfico de 12 meses · Front
- [ ] 🔒 [**6.5**](docs/08-plan-de-desarrollo.md#tarea-6-5) Reporte mensual y anual con promedio de ganancias · API, Front
- [ ] 🔒 [**6.6**](docs/08-plan-de-desarrollo.md#tarea-6-6) Punto de equilibrio · API
- [ ] 🔒 [**6.7**](docs/08-plan-de-desarrollo.md#tarea-6-7) Alertas: caja libre negativa, anticipos y pedidos estancados · API, Front
- [ ] 🔒 [**6.8**](docs/08-plan-de-desarrollo.md#tarea-6-8) Cierre mensual con snapshot inmutable · Base, API
- [ ] 🔒 [**6.9**](docs/08-plan-de-desarrollo.md#tarea-6-9) Inicio de solo consulta y su descarga en CSV o PDF ([RF-95](docs/03-requisitos-y-bdd.md#rf-95), [RF-96](docs/03-requisitos-y-bdd.md#rf-96)) · Front, API
- [x] [**6.10**](docs/08-plan-de-desarrollo.md#tarea-6-10) Contrato de reportes, indicadores, alertas y cierre mensual · Contrato —
      v0.17.0: seis operaciones, veintiún esquemas y cinco códigos, cuatro de ellos en el rango
      `60`–`69`, el último que quedaba vacío. **Cierra el carril Contrato**: los diez módulos del
      plan quedan acordados antes de implementarse

**[Sprint 7](docs/08-plan-de-desarrollo.md#sprint-7) · Capital, retiros y patrimonio**

- [ ] ⚡ [**7.1**](docs/08-plan-de-desarrollo.md#tarea-7-1) Inversiones en activos · API, Front
- [ ] ⚡ [**7.2**](docs/08-plan-de-desarrollo.md#tarea-7-2) Aportes de capital · API, Front
- [ ] ⚡ [**7.3**](docs/08-plan-de-desarrollo.md#tarea-7-3) Pro-labore con justificación · API, Front
- [ ] 🔒 [**7.4**](docs/08-plan-de-desarrollo.md#tarea-7-4) Retiro con división automática en pro-labore y distribución · API
- [ ] 🔒 [**7.5**](docs/08-plan-de-desarrollo.md#tarea-7-5) Cálculo de patrimonio · API
- [ ] 🔒 [**7.6**](docs/08-plan-de-desarrollo.md#tarea-7-6) Alerta de descapitalización a 12 meses · API
- [ ] ⚡ [**7.7**](docs/08-plan-de-desarrollo.md#tarea-7-7) Los cuatro sobres con historial · API, Front
- [ ] 🔒 [**7.8**](docs/08-plan-de-desarrollo.md#tarea-7-8) Panel de sobres: asignado contra usado · Front
- [x] [**7.9**](docs/08-plan-de-desarrollo.md#tarea-7-9) Contrato de inversiones, aportes, retiros, pro-labore y sobres · Contrato — v0.13.0:
      diez operaciones, veintitrés esquemas y cinco códigos que estrenan el rango `90`–`99`. El
      retiro se registra de una vez y se parte solo si no se dice cómo: pro-labore hasta completar
      el del mes y el resto distribución. El pro-labore y los sobres no se editan: cada cambio es una
      fila nueva, vigente desde el día en que se guarda

### Cadena B · el pedido

**[Sprint 5](docs/08-plan-de-desarrollo.md#sprint-5) · Productos y costeo**

- [x] [**5.1**](docs/08-plan-de-desarrollo.md#tarea-5-1) Dominio `Producto` y servicio `calcularMargenes` · API — los tres márgenes de
      [05 §7.2](docs/05-reglas-financieras.md#72-los-tres-márgenes) reproducidos producto por producto, con el margen por hora vacío —no en cero—
      cuando el ítem no consume tiempo
- [ ] ⚡ [**5.2**](docs/08-plan-de-desarrollo.md#tarea-5-2) Catálogo de productos y servicios · API, Front
- [x] [**5.3**](docs/08-plan-de-desarrollo.md#tarea-5-3) Costeo unitario: insumo, consumibles y minutos de trabajo · API — las dos fórmulas
      de [05 §7.1](docs/05-reglas-financieras.md#71-costo-unitario): el costo partido en materia y tiempo, y la tarifa por hora que sale del
      pro-labore o del salario. Reproduce la tabla de [06 §4.1](docs/06-nomina-y-capacidad-de-pago.md#41-el-margen-de-contribución-correcto). Atar el costeo al historial de cada producto es
      la [5.5](docs/08-plan-de-desarrollo.md#tarea-5-5), y el tiempo de máquina del bordado, la [5.4](docs/08-plan-de-desarrollo.md#tarea-5-4)
- [ ] ⚡ [**5.4**](docs/08-plan-de-desarrollo.md#tarea-5-4) Costeo de bordado por tiempo de máquina · API
- [ ] 🔒 [**5.5**](docs/08-plan-de-desarrollo.md#tarea-5-5) Historial de costos con fecha de vigencia · Base, API
- [x] [**5.6**](docs/08-plan-de-desarrollo.md#tarea-5-6) Margen por hora · API — `CompararMargenes` arma el cuadro de [10 §4.4](docs/10-ux-y-mockups.md#44-productos-y-servicios),
      ordenado por margen por hora y también por porcentaje, y lee cada producto contra la mediana de
      los demás: con la tabla de [05 §7.2](docs/05-reglas-financieras.md#72-los-tres-márgenes), solo el rompecabezas rinde menos. Trae la lectura, su nivel y el
      texto con los montos; el endpoint es la [5.2](docs/08-plan-de-desarrollo.md#tarea-5-2) y su contrato, la [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10)
- [ ] ⚡ [**5.7**](docs/08-plan-de-desarrollo.md#tarea-5-7) Sugerencia de precio por margen objetivo · API
- [ ] ⚡ [**5.8**](docs/08-plan-de-desarrollo.md#tarea-5-8) Costos y márgenes ocultos al tipo Operación: la API no los envía · API
- [ ] ⚡ [**5.9**](docs/08-plan-de-desarrollo.md#tarea-5-9) Cuadro comparativo ordenable por margen por hora · Front
- [x] [**5.10**](docs/08-plan-de-desarrollo.md#tarea-5-10) Contrato de productos, servicios y costeo · Contrato — v0.12.0: seis
      operaciones, once esquemas y dos códigos que estrenan el rango `40`–`49`. El formulario se
      guarda de una vez y el costo no se sobrescribe: si cambió, entra una fila nueva. **A Operación
      no le llegan ni el costo ni los márgenes ni los minutos**, porque `costos_producto` lleva RLS

**[Sprint 4](docs/08-plan-de-desarrollo.md#sprint-4) · Pedidos y anticipos**

- [x] [**4.1**](docs/08-plan-de-desarrollo.md#tarea-4-1) Dominio `Pedido`, estados y transiciones · API — los cinco estados y los siete pasos
      que existen entre ellos; entregado y cancelado son finales, y anular no es cancelar
- [ ] ⚡ [**4.2**](docs/08-plan-de-desarrollo.md#tarea-4-2) Gestión de clientes · API, Front
- [ ] 🔒 [**4.3**](docs/08-plan-de-desarrollo.md#tarea-4-3) Pedido con líneas de producto · API, Front
- [ ] ⚡ [**4.4**](docs/08-plan-de-desarrollo.md#tarea-4-4) `CobrarAnticipo`: crea pasivo, no ingreso · API
- [ ] 🔒 [**4.5**](docs/08-plan-de-desarrollo.md#tarea-4-5) Función en la base que entrega el pedido y causa la venta en una transacción · Base
- [ ] 🔒 [**4.6**](docs/08-plan-de-desarrollo.md#tarea-4-6) Listado ordenado por fecha con filtros · API, Front
- [ ] 🔒 [**4.7**](docs/08-plan-de-desarrollo.md#tarea-4-7) Resaltado de pedidos estancados · API, Front
- [ ] 🔒 [**4.8**](docs/08-plan-de-desarrollo.md#tarea-4-8) Factura adjunta al pedido · API, Front
- [ ] 🔒 [**4.9**](docs/08-plan-de-desarrollo.md#tarea-4-9) Cancelación con destino del anticipo · API
- [x] [**4.10**](docs/08-plan-de-desarrollo.md#tarea-4-10) Contrato de clientes, pedidos y anticipos · Contrato — v0.10.0:
      nueve operaciones, catorce esquemas y nueve códigos que estrenan el rango `30`–`39`. La entrega
      recibe lo que recibe `fn_entregar_pedido` y nada más; cancelar y anular son dos operaciones
- [ ] ⚡ [**4.11**](docs/08-plan-de-desarrollo.md#tarea-4-11) `pedidos`: el motivo de la cancelación y el destino del anticipo · Base — el
      contrato los declara desde el `0.10.0` y la tabla no tiene dónde guardarlos; la [4.9](docs/08-plan-de-desarrollo.md#tarea-4-9) los espera

**[Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) · Cotizador**

- [ ] 🔒 [**8.8**](docs/08-plan-de-desarrollo.md#tarea-8-8) Cotizaciones y remisiones en PDF con logo · API, Front
- [ ] 🔒 [**8.9**](docs/08-plan-de-desarrollo.md#tarea-8-9) Validador de anticipo mínimo · API
- [x] [**8.11**](docs/08-plan-de-desarrollo.md#tarea-8-11) Contrato de nómina, simulador, cotizaciones e importación · Contrato — v0.15.0:
      25 operaciones, 46 esquemas y 17 códigos que estrenan a la vez los tres rangos que quedaban
      vacíos. Un archivo baja dentro del sobre, en base64: es el esquema `Documento`
- [ ] ⚡ [**8.12**](docs/08-plan-de-desarrollo.md#tarea-8-12) Tablas `cotizaciones` y `cotizacion_lineas` · Base — el
      contrato de la [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11) promete un cotizador y las dos tablas no tienen `CREATE TABLE`

### Amortiguador · Nómina

La toma el carril que termine primero su cadena: es la funcionalidad más independiente del sistema.

- [ ] ⚡ [**8.1**](docs/08-plan-de-desarrollo.md#tarea-8-1) Registro de empleadas · API, Front
- [ ] 🔒 [**8.2**](docs/08-plan-de-desarrollo.md#tarea-8-2) Liquidación de nómina en la base, descontando adelantos · Base
- [ ] 🔒 [**8.3**](docs/08-plan-de-desarrollo.md#tarea-8-3) Adelantos como cuenta por cobrar · API
- [ ] 🔒 [**8.4**](docs/08-plan-de-desarrollo.md#tarea-8-4) Desprendible PDF con acceso restringido al propio · API
- [ ] 🔒 [**8.5**](docs/08-plan-de-desarrollo.md#tarea-8-5) Simulador de capacidad de pago · API, Front
- [ ] 🔒 [**8.6**](docs/08-plan-de-desarrollo.md#tarea-8-6) Traducción a unidades de producto por vender · API
- [ ] 🔒 [**8.7**](docs/08-plan-de-desarrollo.md#tarea-8-7) Horas pagadas contra horas facturadas · API, Front
- [ ] 🔒 [**8.10**](docs/08-plan-de-desarrollo.md#tarea-8-10) Importador de CSV con mapeo y reporte de errores · API, Front — sin cadena asignada

---

## 6. Sprint 9 · promoción, PWA y endurecimiento

**No se parte: lo hacen todos los carriles juntos**, porque consiste en integrar y probar lo de todos.

- [x] [**9.1**](docs/08-plan-de-desarrollo.md#tarea-9-1) PWA instalable y cola persistente con la clave guardada antes de enviar · Front — el
      manifiesto en español con el tema del mockup, y la cola en IndexedDB que sobrevive a cerrar la
      aplicación: guarda la intención con su clave antes de enviarla, reintenta con la espera de
      [17 §5.2](docs/17-resiliencia-offline-y-cache.md#52-cuánto-se-espera-entre-reintentos) y deja «no sincronizada», con el mensaje de la API, lo que se rechazó con motivo
- [ ] 🔒 [**9.2**](docs/08-plan-de-desarrollo.md#tarea-9-2) Ambiente uat con datos anonimizados y su semilla · Base, API
- [ ] 🔒 [**9.3**](docs/08-plan-de-desarrollo.md#tarea-9-3) Promoción de uat a prod sin recompilar · API, Front
- [ ] ⚡ [**9.4**](docs/08-plan-de-desarrollo.md#tarea-9-4) Reversión ensayada en qa, con el tiempo medido · API, Front
- [ ] 🔒 [**9.5**](docs/08-plan-de-desarrollo.md#tarea-9-5) Prueba de permisos con sesión real en los cuatro ambientes · API
- [ ] ⚡ [**9.6**](docs/08-plan-de-desarrollo.md#tarea-9-6) Pruebas de extremo a extremo de los flujos críticos en qa · API, Front
- [ ] ⚡ [**9.7**](docs/08-plan-de-desarrollo.md#tarea-9-7) Rendimiento en celular real con 4G · Front
- [ ] ⚡ [**9.8**](docs/08-plan-de-desarrollo.md#tarea-9-8) Repaso de secretos: nada en los repositorios y `service_role` solo en migraciones · API
- [ ] ⚡ [**9.9**](docs/08-plan-de-desarrollo.md#tarea-9-9) El front rechaza de verdad un MAJOR de API distinto · Front
- [ ] 🔒 [**9.10**](docs/08-plan-de-desarrollo.md#tarea-9-10) Etiquetar `1.0.0` del front y de la API · API, Front
- [ ] ⚡ [**9.11**](docs/08-plan-de-desarrollo.md#tarea-9-11) Swagger detrás de autenticación en prod · API
- [ ] ⚡ [**9.12**](docs/08-plan-de-desarrollo.md#tarea-9-12) Los proyectos uat y prod de Supabase, los dos de pago · Decisión — salió
      de partir la [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4); el expediente y la cifra están en el [§7.1](#71-el-expediente-de-uat-y-prod) y lo único que falta es la firma

---

## 7. Decisiones pendientes

| # | Decisión | Quién | Bloquea | Estado |
|---|---|---|---|---|
| 1 | Dónde se aloja la API | Quien dirige | Tarea [0.8](docs/08-plan-de-desarrollo.md#tarea-0-8) | ✅ Railway, al final ([ADR-026](docs/adr/ADR-026-railway-al-final.md)) |
| 2 | Dónde se publica el front web | Quien dirige | Tarea [0.9](docs/08-plan-de-desarrollo.md#tarea-0-9) | ✅ Railway, al final ([ADR-026](docs/adr/ADR-026-railway-al-final.md)) |
| 3 | El pago de uat y prod, los dos proyectos de Supabase que faltan | Quien dirige crea; Gerencia paga | Tarea [9.12](docs/08-plan-de-desarrollo.md#tarea-9-12) | 🟡 dev y qa quedaron configurados, con el esquema y la semilla aplicados, y con ellos se cerró la [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4). **El expediente está listo y la cifra es ≈ 55 USD al mes** ([§7.1](#71-el-expediente-de-uat-y-prod)); falta la firma de Gerencia, que es el paso 2 del [09 §3.1](docs/09-plan-de-implantacion.md#31-alistamiento-técnico-de-los-ambientes) |
| 4 | PostgreSQL para desarrollar sin Docker | Quien dirige | Tareas [0.5](docs/08-plan-de-desarrollo.md#tarea-0-5) y [0.10](docs/08-plan-de-desarrollo.md#tarea-0-10) | ✅ El proyecto dev de Supabase, mientras Docker no arranque |
| 5 | Remotos de los repositorios | Quien dirige | Integración continua | ✅ Los cuatro en GitHub |
| 6 | Cómo consiguen la API y su CI el esquema de `prisma_db` | Carril API | Tareas [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7), [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) y [1.15](docs/08-plan-de-desarrollo.md#tarea-1-15) | ✅ Por etiqueta, con el Supabase CLI en la tubería ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md)) |
| 7 | Quién trabaja cada carril, y quién sabe Flutter y Java para revisar el contrato | Quien dirige | Trabajar con más de un carril | ⬜ |
| 8 | Contrato por etiqueta de git o como paquete publicado | Los dos lados | El primer cambio de contrato | ✅ **Por etiqueta**: `contrato-vX.Y.Z` en cada fusión que cambie `openapi.json`, como se inclinaba el [21 §8](docs/21-trabajo-en-paralelo.md#8-qué-hay-que-decidir-antes-de-abrir-un-segundo-carril). Un paquete publicado pedía un registro y credenciales que no existen, para resolver dependencias que nadie tiene |
| 9 | Quién desempata un cambio de contrato | Quien dirige | El primer desacuerdo | ✅ **Quien dirige**, que además es quien revisa los PR: partir las dos cosas dejaría a alguien decidiendo sobre lo que no lee |
| 10 | Supuestos [S1](docs/01-vision-y-alcance.md#s1) a [S5](docs/01-vision-y-alcance.md#s5) de [01 §6](docs/01-vision-y-alcance.md#6-supuestos) | Gerencia | [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) | ⬜ Por confirmar; el mockup ya está confirmado |
| 11 | El dominio, del que dependen el correo sintético, la URL de la API y CORS | Gerencia | — | ✅ `prisma.com`: la API en `api.prisma.com` y `api-dev.prisma.com`, el correo sintético en `@usuarios.prisma.com`. Se cambió sin migrar nada porque todavía no existe ningún usuario real; desde el primero, «fijo de por vida» quiere decir exactamente eso ([ADR-009](docs/adr/ADR-009-login-por-usuario.md)) |
| 12 | Plazos de conservación y registro de bases de datos personales (Ley 1581) | Un abogado | Go-live | ⬜ |
| 13 | Qué objetivos nativos se publican | Gerencia | Nada hoy: no hay disparador | ⬜ |
| 14 | Una sola licencia para los cuatro repositorios | Quien dirige | Nada técnico | ✅ **AGPL-3.0 en los cuatro**: PRISMA se sirve por la red y no se distribuye, y la sección 13 es lo único que obliga a publicar lo que alguien modifique de un servicio |
| 15 | Encabezado de licencia en cada archivo fuente | Quien dirige | Nada técnico | ⬜ Hoy no lo lleva ninguno. La AGPL lo recomienda, pero son cientos de archivos en tres lenguajes y el `LICENSE` del repositorio ya dice cuál rige |

**Lo que el modelo de datos todavía no define** ([`04-modelo-de-datos.md`](docs/04-modelo-de-datos.md)):

- [ ] La variante del trigger de auditoría para `usuarios`, que detecta `desactivado_en` · [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2)
- [x] El `CREATE TABLE` de `adjuntos` · lo escribió la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14) en el [04 §4.12](docs/04-modelo-de-datos.md#412-adjuntos--el-soporte-de-un-movimiento-o-de-un-pedido)
- [ ] ⚡ El `CREATE TABLE` de `cotizaciones` y `cotizacion_lineas` · [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8), tarea [8.12](docs/08-plan-de-desarrollo.md#tarea-8-12)

### 7.1 El expediente de uat y prod

Lo que le falta a la fila 3 para poder decidirse. **Ningún documento del proyecto traía una cifra**:
el [19 §8.1](docs/19-ambientes-y-entrega.md#81-qué-se-paga-y-qué-no) decía «es una factura, y es pequeña», y eso no es un número. Aquí están, **consultadas
el 2026-09-18**, con su fuente, porque un precio sin fecha envejece sin avisar.

**1 · Cuánto cuesta al mes**

| Proveedor | Qué hay que contratar | Al mes |
|---|---|---:|
| Supabase | Plan **Pro** en una organización nueva para uat y prod: 25 USD de plan + 10 por proyecto − 10 de crédito incluido | **35 USD** |
| Railway | Plan **Pro** por espacio de trabajo, 20 USD con 20 USD de crédito incluido | **20 USD** |
| | **Total** | **≈ 55 USD** |

- **El plan de Supabase es por organización, no por proyecto**, y la cuenta tiene **dos proyectos
  gratuitos en total** repartidos como quiera: dev y qa ya los gastaron. Así que uat y prod no caben
  en el plan gratuito ni aunque se aceptara que se pausen. Se pueden tener una organización gratuita
  y una de pago a la vez, y por eso lo barato es **dejar dev y qa donde están y abrir una
  organización nueva para los dos de pago**: meter los cuatro en una sola sube a 55 USD solo en
  Supabase, y lo único que se gana es que dev y qa dejen de pausarse.
- **El plan gratuito pausa el proyecto tras una semana de inactividad; el Pro dice «nunca».** Eso, y
  no otra cosa, es lo que compra el [RNF-20](docs/03-requisitos-y-bdd.md#rnf-20).
- **Railway cobra lo que se usa, no lo que se reserva**: 10 USD por GB al mes y 20 por vCPU al mes,
  facturado por segundo. uat con 768 MB y prod con 1 GB ([09 §3.2](docs/09-plan-de-implantacion.md#32-alojar-la-api-de-java-en-los-cuatro-ambientes)) son 1,75 GB, o sea **17,50 USD de
  memoria** si los dos estuvieran siempre en su piso, más la CPU que gasten. Cabe en el crédito de
  20 del plan Pro, pero **justo**: el de Hobby son 5 USD y no alcanza. Y dev ya está en Railway
  ([ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md)), así que lo que gaste cuenta contra el mismo crédito.
- Fuentes: [supabase.com/pricing](https://supabase.com/pricing), [su guía de facturación](https://supabase.com/docs/guides/platform/billing-on-supabase),
  [railway.com/pricing](https://railway.com/pricing) y [su referencia de precios](https://docs.railway.com/reference/pricing).

**2 · Qué desbloquea**

`9.12` → [9.2](docs/08-plan-de-desarrollo.md#tarea-9-2) uat en pie → [9.3](docs/08-plan-de-desarrollo.md#tarea-9-3) promover sin recompilar y [9.5](docs/08-plan-de-desarrollo.md#tarea-9-5) permisos en los cuatro ambientes →
[9.10](docs/08-plan-de-desarrollo.md#tarea-9-10) etiquetar `1.0.0` → [H10](docs/08-plan-de-desarrollo.md#h10) → go-live. **[H10](docs/08-plan-de-desarrollo.md#h10) es «Gerencia aprueba en UAT exactamente el
artefacto que irá a prod»**, y sin uat contratado esa firma no tiene sobre qué hacerse.

**3 · Qué pasa si se aplaza**

Nada, hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9): antes no hay nada que promover ahí, y el [ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md) ya decidió no abrir
los cuatro ambientes ahora. Lo que no se puede aplazar es **decidirlo**: el [09 §3.1](docs/09-plan-de-implantacion.md#31-alistamiento-técnico-de-los-ambientes) dice que «dos de
los pasos cuestan plata y hay que decidirlos con tiempo», y una decisión de gasto descubierta la
semana de la firma se toma mal o se pospone. Posponerla mueve el go-live.

**Las cuatro condiciones del [ADR-026](docs/adr/ADR-026-railway-al-final.md), comprobadas contra Railway**

| # | Condición | Cómo responde Railway |
|---|---|---|
| 1 | Se promueve la imagen, no se recompila | Despliega imágenes de contenedor, que es lo que la API ya produce. **Falta el registro de imágenes**, que no existe todavía y sin el cual esta condición no se cumple entre ambientes |
| 2 | uat y prod no se duermen | **No descarta ningún plan**, que era el miedo: dormirse es un interruptor por servicio —«Serverless», en los ajustes de despliegue— que viene apagado. Se deja apagado en uat y prod y ya. Encendido, duerme el servicio a los 10 minutos sin actividad y **la primera petición puede contestar 502**, que es exactamente lo que invalidaría la revisión de Gerencia |
| 3 | Los secretos viven en el gestor del proveedor | Variables por ambiente, que es como ya corre dev |
| 4 | La `service_role` no entra en el servicio de la API | No depende del proveedor: es nuestra ([ADR-033](docs/adr/ADR-033-service-role-solo-en-auth.md)) |

El [ADR-026](docs/adr/ADR-026-railway-al-final.md) las numera como tres porque junta las dos últimas en una; se separan aquí porque se
comprueban por separado.

**Quién hace cada paso del [09 §3.1](docs/09-plan-de-implantacion.md#31-alistamiento-técnico-de-los-ambientes)**

De los nueve, **el paso 2 es el único de Gerencia** —contratar lo que hay que pagar, antes de
levantar uat— y los otros ocho son de apoyo técnico. Ninguno de esos ocho puede correr para uat y
prod hasta que el 2 esté hecho, porque los proyectos todavía no existen.

**Y lo que uat exige y no es dinero:** datos **realistas y anonimizados**, con su propia semilla
([9.2](docs/08-plan-de-desarrollo.md#tarea-9-2)). La de dev y qa no entra ahí nunca —lleva nombres reales del equipo—, y `sembrar.ps1` solo
admite `dev` y `qa` para que la regla no dependa de que alguien se acuerde. Es el riesgo [R-23](docs/11-riesgos-y-proteccion-de-datos.md) y es
la Ley 1581.

**Lo que este expediente deja fuera a propósito**, para que una decisión de gasto no se convierta en
una reunión de todo: las cuatro del [21 §8](docs/21-trabajo-en-paralelo.md#8-qué-hay-que-decidir-antes-de-abrir-un-segundo-carril) —quién trabaja cada carril, los permisos de escritura,
contrato por etiqueta o por paquete, y quién desempata un cambio de contrato—; el **plan pago de
dev**; el **registro de imágenes** de la condición 1; y **apagar la Data API** o revocarle el acceso
a `anon`.

**Dos de esa lista tienen fecha externa y no esperan a Gerencia:**

- **Las claves heredadas.** Supabase «deprecia las claves `anon` y `service_role` para finales de
  2026» y las reemplaza por `sb_publishable_…` y `sb_secret_…` ([su documentación](https://supabase.com/docs/guides/api/api-keys), consultada el
  2026-09-18). Crear uat y prod con claves que van a morir es hacer el trabajo dos veces, y las
  variables que hoy las nombran están en el [09 §3.2](docs/09-plan-de-implantacion.md#32-alojar-la-api-de-java-en-los-cuatro-ambientes).
- **Las contraseñas de la semilla en dev**, hoy alcanzables desde internet.

---

## 8. Documentación

- [x] Encabezado con versión, estado, fechas y etiquetas en los 57 documentos de los cuatro
      repositorios ([ADR-027](docs/adr/ADR-027-documentacion-versionada.md))
- [x] Toda referencia enlazada a su sitio exacto, con anclas propias y «Referenciado desde»
- [x] Las reglas escritas en [`22-documentacion.md`](docs/22-documentacion.md), y la herramienta en `scripts/docs/`
- [x] El plan organizado por carriles, con dependencias, oleadas, camino crítico y calendario calculado
- [x] La integración continua de este repositorio verifica la documentación en cada push y cada PR

---

## 9. A vigilar

- **La integración continua no corre [C-01](docs/12-pruebas-y-calidad.md#c-01), y por eso estuvo un día en rojo sin que nadie lo
  viera.** El trabajo de CI de `prisma_api` corre `./gradlew build`, que **excluye la etiqueta
  `integracion`** ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) [§4](docs/12-pruebas-y-calidad.md#4-juego-de-datos-de-prueba-oficial)), así que la prueba que cruza la tabla de traducción con `pg_constraint`
  solo falla en la máquina de quien la corra a mano contra una base con el esquema puesto. Se
  descubrió al hacer la [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10): la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14) había fusionado la tabla `adjuntos` sin sus nueve filas,
  y **su PR pudo fusionarse igual**. Lo arregló `plan/49-adjuntos-sin-mensaje.md`; lo que queda por
  decidir es si [C-01](docs/12-pruebas-y-calidad.md#c-01) debe correr en la CI, que pide levantarle una base con el esquema y la
  semilla. Mientras no corra, **toda promesa de las que solo miran las pruebas de integración
  —[C-01](docs/12-pruebas-y-calidad.md#c-01) entre ellas— depende de que alguien se acuerde de correrlas**

- **«La versión subió» avisa, pero todavía no bloquea el botón de fusionar.** Es un trabajo más de la
  integración continua de los tres repositorios de código, y GitHub deja fusionar un PR en rojo
  mientras la comprobación no esté marcada como obligatoria en la protección de `develop`. Lo que sí
  hace hoy en la API y el front, aunque se fusione en rojo, es parar el despliegue: el empuje a
  `develop` también la corre, y Railway no construye dev con la integración continua en rojo.
  `prisma_db` no se despliega, así que ahí la única cerradura es esa casilla. **Y esa casilla no
  existe:** los tres repositorios de código son privados en el plan gratuito, y GitHub responde
  *«Upgrade to GitHub Pro or make this repository public»* tanto a la protección de rama como a los
  rulesets (comprobado el 2026-09-19 contra su API). No es que nadie la haya marcado: no está. Las
  dos salidas cuestan algo —pagar el plan, o hacer públicos unos repositorios de los que `prisma_db`
  lleva la semilla con nombres reales del equipo ([R-23](docs/11-riesgos-y-proteccion-de-datos.md))—, así que **se decidió dejarlo y escribirlo
  aquí**: API y front quedan cubiertos de hecho por Railway, y el hueco real, el único, es que un PR
  de `prisma_db` con la versión sin subir se puede fusionar.
- **A `movimientos` le faltan dos restricciones con nombre.** La base exige cuenta de destino en una
  transferencia (`transferencia_con_destino`), pero no prohíbe que la traiga un gasto, ni que una
  transferencia vaya de una cuenta a sí misma: las dos cosas entrarían sin que nada avisara y
  dejarían un registro que no significa nada. El dominio de la API ya las rechaza (tarea [3.1](docs/08-plan-de-desarrollo.md#tarea-3-1)), y la
  base tendría que hacerlo también. Ya no se pueden sumar a la migración inicial —está aplicada, y
  una migración aplicada no se edita ([ADR-004](docs/adr/ADR-004-base-solo-escritura.md))—: van en una migración nueva y con nombre explícito,
  como pide [04 §4.1](docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes). Antes hay que escribirlas en el [04](docs/04-modelo-de-datos.md), que es donde se decide qué debe existir.
- **`fecha_no_futura` mira el día de la sesión, y no el de Bogotá.** Compara con `CURRENT_DATE`, que
  PostgreSQL calcula en el huso de la sesión, y pgjdbc le pone a la sesión el de la JVM que se
  conecta (comprobado en la [3.3](docs/08-plan-de-desarrollo.md#tarea-3-3)). En esta máquina es `America/Bogota`, pero el contenedor de la API corre en
  UTC: entre las 7 de la noche y la medianoche del taller, la base aceptaría un movimiento con fecha
  de mañana. Hoy no pasa, porque `RegistrarMovimiento` lo rechaza antes con el día de Bogotá
  ([RNF-08](docs/03-requisitos-y-bdd.md#rnf-08)); pero la regla de la base es la que no se puede saltar ([ADR-015](docs/adr/ADR-015-validacion-tres-capas.md)), y hoy depende de
  quién se conecte. Se cierra en la base —comparando con `(now() AT TIME ZONE 'America/Bogota')::date`—
  o fijando el huso de la conexión; cualquiera de las dos es una decisión, y va primero al [04](docs/04-modelo-de-datos.md).
- **`cuentas` y `categorias` ya llevan RLS, y la decidió la [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10).** El [04 §7](docs/04-modelo-de-datos.md#7-seguridad-por-tipo-de-usuario-rls) las dejaba a
  propósito sin política, y entonces el «solo Gerencia» del contrato de la [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17) no lo imponía
  nadie: **Operación podía crear las dos**. Se tomó la primera de las dos salidas —política, no
  `if`— con el molde que el esquema inicial ya usaba para `cargos`: lectura `USING (TRUE)`, que es
  lo que el [§7](#7-decisiones-pendientes) quería conservar, y escritura `FOR ALL` con `fn_es_gerencia()`. `FOR ALL` y no
  `FOR INSERT` para que la anulación, que es un `UPDATE`, no quede abierta el día que exista ese
  endpoint. Lo que queda por revisar es si alguna de las otras siete tablas sin RLS está en el
  mismo caso.
- **`fn_auditar` lee `OLD.anulado_en` en cinco tablas que no tienen esa columna**, y hay que
  comprobarlo contra una base antes de arreglarlo. Son `costos_producto`, `prolabore_config`,
  `nomina_detalle`, `sobres_config` y `cierres_mensuales`: leyendo la función, un `UPDATE` sobre
  cualquiera falla con `42703`, que además la API no sabe traducir. **Nada lo caza hoy:**
  `verificar-base.sql` solo actualiza `cargos`, y la semilla corre con los triggers apagados. La
  prueba es un `UPDATE` con sesión de Gerencia sobre una fila de cada una; el arreglo lleva migración
  propia, versión de esquema y una comprobación por tabla auditada. **Bloquea a la [5.5](docs/08-plan-de-desarrollo.md#tarea-5-5)**, que anula
  costos, y a la [6.8](docs/08-plan-de-desarrollo.md#tarea-6-8), la [8.2](docs/08-plan-de-desarrollo.md#tarea-8-2) y las 7.x.
- **Quedan 30 diferencias entre lo que sirve la API y lo acordado, y son del contrato.** El arreglo
  de la copia fijada cerró 31 de 61 —las cabeceras de firma, que faltaban en **todas** las
  operaciones con sesión; dos `operationId`; ocho descripciones; el `201` de crear usuario; las dos
  etiquetas; el `cuando` del `40101`— y dejó medidas las que no son del código: los `minLength` y
  `maxLength` que la API emite de sus `@Size` y el acordado no declara; cinco descripciones de
  esquema que el acordado no tiene; el `style: simple` que springdoc le pone a `Set-Cookie`; la
  etiqueta de `cargos-asignables`, donde **el acordado es el que está mal** porque `cargos` la lee
  todo el mundo ([P-14](docs/12-pruebas-y-calidad.md#p-14)); y el `requestBody` de la navegación, que el acordado declara obligatorio y
  el código acepta ausente —cambiarlo es una decisión, porque el front vuelve a su vista pidiéndola
  sin cuerpo—. Las del `DescriptorDeCampo` se cierran con los tipos que le faltan: `casilla` ya está, con la
  [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10) —lo estrena `esFijo` del formulario «categoria»—, y queda `numero`, de la [5.2](docs/08-plan-de-desarrollo.md#tarea-5-2). **Hasta que estén, la copia fijada no puede ser el acordado byte a
  byte**, que es lo que haría exigible la promesa del [21 §3.1](docs/21-trabajo-en-paralelo.md#31-el-punto-débil-de-tener-repositorios-separados-y-cómo-se-tapa).
- **Las reglas del dominio todavía no tienen código del catálogo.** `Movimiento`, `Pedido` y
  `Costeo` rechazan lo que no se puede registrar con excepciones de Java, y hoy eso saldría como
  `50000`, «algo salió mal». Las de `Movimiento` y `Pedido` **ya tienen nombre y mensaje acordados**
  ([3.13](docs/08-plan-de-desarrollo.md#tarea-3-13), [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10) y [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10)). **Las de `Movimiento` ya se emiten** desde la [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4): la fecha futura y
  las tres situaciones de la cuenta de destino tienen excepción de dominio y código propio. Las de
  `Pedido` y `Costeo` esperan a la [4.3](docs/08-plan-de-desarrollo.md#tarea-4-3) y a la [5.2](docs/08-plan-de-desarrollo.md#tarea-5-2), y hasta entonces ninguno de esos mensajes es el
  que verá el taller.
- **El contra-asiento se quedó sin ruta acordada.** La [3.10](docs/08-plan-de-desarrollo.md#tarea-3-10) corrige un movimiento errado creando
  otro que lo reversa, con `corrige_a_id` apuntando al original ([04 §5.3](docs/04-modelo-de-datos.md#53-corrección-por-contra-asiento)), pero `corrigeAId` no
  entró al contrato de la [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13): no cabe en el formulario «movimiento» —el descriptor pinta
  todos sus campos, y ese no se pinta— y darle ruta propia era decidir desde aquí una pantalla que
  nadie ha diseñado. La [3.10](docs/08-plan-de-desarrollo.md#tarea-3-10) depende hoy solo de la [3.9](docs/08-plan-de-desarrollo.md#tarea-3-9), así que hay que acordarle el contrato
  antes de implementarla ([21 §3.2](docs/21-trabajo-en-paralelo.md#32-contrato-acordado-y-contrato-generado-no-se-contradicen)).
- **Nadie comprueba que la categoría sea de la naturaleza del movimiento.** Un gasto con una
  categoría de ingreso entra: la base no lo impide —`categorias.naturaleza` no se cruza con
  `movimientos.tipo`—, el dominio no lo mira y el contrato de la [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13) no le dio código, porque
  ningún documento escribe esa regla. O se escribe en el [05](docs/05-reglas-financieras.md) y entonces tiene código y
  restricción, o se dice por qué da igual.
- **El mockup le muestra el tiempo a Operación y la base no se lo deja ver.** En la tabla de
  productos, las columnas de costo y margen llevan la marca de Gerencia y la de «Tiempo» no; pero
  `minutos_trabajo` vive en `costos_producto`, que lleva la política `costos_solo_gerencia`, así que
  **PostgreSQL no le devuelve ni una fila a una sesión de Operación** ([04 §7](docs/04-modelo-de-datos.md#7-seguridad-por-tipo-de-usuario-rls)). El contrato de la
  [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10) siguió a la base, que es lo que [ADR-006](docs/adr/ADR-006-rls-por-rol.md) manda, y le declara a Operación el nombre, el tipo,
  la unidad y el precio. O se ajusta el mockup, o los minutos salen de la tabla de costos: mientras
  tanto, esa columna no se puede pintar para Operación.
- **`productos` deja apagarse sin motivo, y `cargos` no.** Las dos tablas dicen «inactivo» con
  `activo` y guardan el porqué en `anulado_*`, pero solo `cargos` tiene el `CHECK`
  `desactivacion_con_motivo` que amarra las dos cosas ([04 §4.2](docs/04-modelo-de-datos.md#42-cargos-usuarios-y-cuentas)). El contrato promete que ningún
  producto sale del catálogo sin motivo escrito, y hoy esa promesa la sostendría solo la API, que es
  la capa que [ADR-015](docs/adr/ADR-015-validacion-tres-capas.md) dice que sí se puede saltar. Cerrarlo es una restricción nueva, y entra
  primero al [04](docs/04-modelo-de-datos.md).
- **La semilla y los documentos no dicen la misma tarifa por hora.** `prolabore_config` siembra
  $1.500.000 sobre 160 horas, que dan **$9.375**; el [05 §7.4](docs/05-reglas-financieras.md#74-el-indicador-que-concilia-los-dos-mundos) y el [06 §4.1](docs/06-nomina-y-capacidad-de-pago.md#41-el-margen-de-contribución-correcto) trabajan con **$9.400**, que
  es lo que la semilla escribe a mano en `costos_producto.tarifa_hora`. Mientras la tarifa fuera un
  número de ejemplo daba igual; desde el contrato de la [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10) la calcula la API con esa división,
  así que los costeos de la [5.2](docs/08-plan-de-desarrollo.md#tarea-5-2) saldrían 25 pesos por hora por debajo de los del documento.
- **Anular desde el libro un movimiento que pertenece a otro registro lo deja cojo.** La anulación
  del contrato de la [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13) sirve para cualquier movimiento, y varios no están solos: el de un
  anticipo tiene su fila en `anticipos`, el de una inversión en `activos`, el de un aporte o un retiro
  en `aportes_retiros` y el de un adelanto en `adelantos`. Anular el movimiento deja esa fila en pie,
  apuntando a una plata que ya no suma: un activo comprado con plata que no salió, un anticipo que el
  pedido sigue contando. La [3.9](docs/08-plan-de-desarrollo.md#tarea-3-9) tiene que decidir si rechaza anular desde el libro lo que
  pertenece a otro registro, para que se anule desde su pantalla, o si arrastra ese registro en la
  misma transacción. Cualquiera de las dos cambia una operación del `0.11.0`, así que pasa primero
  por el contrato.
- **El patrimonio empezaría en cero el día del corte.** El [09 §4.1](docs/09-plan-de-implantacion.md#41-qué-se-migra-y-qué-no) pide migrar los aportes de
  capital históricos «como base del patrimonio», y no tienen por dónde entrar:
  `aportes_retiros.movimiento_id` no admite nulo, así que todo aporte es un movimiento, y uno de antes
  del corte le subiría a la caja una plata que ya está en los saldos iniciales. Tampoco están en el
  libro las utilidades de antes del corte. Los activos sí pueden entrar sin movimiento, y el contrato
  de la [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9) lo usa. Falta un patrimonio inicial —o aportes históricos sin movimiento— y se
  decide en el [04](docs/04-modelo-de-datos.md) antes de la [7.5](docs/08-plan-de-desarrollo.md#tarea-7-5), que es la que lo calcula.
- **Cinco lecturas del contrato llevan la clave de idempotencia de una escritura.**
  `consultas/clientes`, `/costeo`, `/movimientos`, `/pedidos` y `/productos` —las que agregaron la
  [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10), la [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13) y la [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10)— copiaron la cabecera `Idempotency-Key` de una operación que escribe, y
  dicen que la clave «se reutiliza en cada reintento». La API genera otro texto para todo lo que
  cuelga de `/consultas/`, «UUID v4 nuevo en cada consulta» (`ConfiguracionDelContrato`), así que
  el día que la API fije el contrato acordado la [C-04](docs/12-pruebas-y-calidad.md#c-04) fallaría en esas cinco. Las cinco lecturas
  del `0.13.0` ya llevan el de lectura. Es un arreglo del contrato, y va con las correcciones del
  carril Contrato.
- **Dinero con decimales en la frontera.** Cuando llegue el primer endpoint que recibe plata (tarea
  1.10), comprobar con una prueba que un JSON con `1500.5` en un campo de dinero se rechaza y no se
  trunca a `1500` en silencio. [ADR-003](docs/adr/ADR-003-dinero-entero.md) exige rechazarlo, y la conversión de Jackson hay que verla,
  no suponerla.
- **La base de desarrollo es compartida.** Mientras dev sea el proyecto de Supabase en la nube, todos
  los carriles desarrollan contra la misma base, que es lo que [21 §6.4](docs/21-trabajo-en-paralelo.md#64-ambientes) pide evitar. Con un carril no
  estorba; con varios, cada uno necesita su PostgreSQL local.
- **La cookie `prisma_renovacion` todavía no se guardaría.** Es `HttpOnly` y el front nunca la lee,
  pero en la web `package:http` sale con `withCredentials` en falso y el navegador descarta un
  `Set-Cookie` de otro origen. Encenderlo es de la [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2), que es la que renueva la sesión al
  recargar; hasta entonces la sesión vive solo mientras la pestaña esté abierta.
- **Las dos llamadas que el contrato manda firmar salen sin firma.** El cambio de contraseña y
  la consulta del formulario `cambio-de-clave` exigen las tres cabeceras `X-Prisma-`, y el front todavía no
  sabe firmar: eso es la [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12). Contra una API que ya filtre responderían `40101`; hoy no existe
  ninguna, porque la [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1) tampoco está. La firma entrará en `ClienteApi`, en un solo sitio.
- **Ninguna petición abre todavía la transacción con identidad.** `ConIdentidad` existe y está
  probada, pero lo que convierte cada petición HTTP en un `conIdentidad` llega con quien trae la
  identidad —el token de la [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1)— o con la [1.14](docs/08-plan-de-desarrollo.md#tarea-1-14), que además tiene que retener la respuesta hasta
  confirmar para guardarla junto con su clave. Hasta entonces ningún endpoint toca la base.
- **La tubería de [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) todavía no existe**, solo la decisión. Las pruebas de integración ya
  existen ([1.6](docs/08-plan-de-desarrollo.md#tarea-1-6)) y se corren a mano con `./gradlew integracion` contra la base local; el trabajo de
  integración continua que descarga `prisma_db` por etiqueta y levanta Supabase se monta con la
  [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7). `prisma_db` es privado, así que necesita el secreto `PRISMA_DB_TOKEN` en `prisma_api`, y ese lo
  crea quien dirige. Y `prisma_db` solo tiene la etiqueta `esquema-v0.1.0`, siete migraciones por
  detrás de lo que dice su `develop`: poner la que falta es parte de la promoción de la [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12).
- **Sin qa hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9)** ([ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md)): mientras tanto, «terminado» es fusionado a `develop` con la
  integración continua en verde. Que dev ya esté en línea no crea la puerta de qa.
- **Los íconos de la PWA siguen siendo los de la plantilla de Flutter.** El logo del taller es
  apaisado —760×253— y volverlo un ícono cuadrado de 192 y 512 píxeles es una decisión de diseño,
  no un recorte: hay que decidir si va la marca sola o el nombre sobre el color de la insignia.
- **El service worker de la PWA no se ha visto funcionar en un navegador de verdad.** Lo genera
  Flutter con su estrategia «offline-first» y el navegador integrado de las herramientas no deja
  registrar ninguno, ni siquiera uno vacío. Falta abrir la compilación web en Edge o Chrome y
  comprobar que se registra, que la aplicación abre sin red y que ofrece instalarse; y eso también
  es parte de la [9.7](docs/08-plan-de-desarrollo.md#tarea-9-7) y de la [9.6](docs/08-plan-de-desarrollo.md#tarea-9-6).
- **La pantalla «Datos sin conexión» de [17 §7](docs/17-resiliencia-offline-y-cache.md#7-purga-de-la-caché-por-el-usuario) no existe todavía**, ni el aviso de «pendiente de
  sincronizar» que la [9.1](docs/08-plan-de-desarrollo.md#tarea-9-1) dejó listo para pintar: la cola ya cuenta cuántas esperan y quién las
  muestre llega con el registro rápido ([3.5](docs/08-plan-de-desarrollo.md#tarea-3-5)).
- **El servicio de Railway conectado a `prisma_front`** intentaba construir en cada push y fallaba,
  porque no había receta de construcción para Flutter. Ya la hay ([0.9](docs/08-plan-de-desarrollo.md#tarea-0-9)): falta revisar en la consola
  si ese servicio se reconfigura o se borra, para no terminar con dos y sin saber cuál es el bueno.

---

## 10. Decisiones de construcción que conviene revisar

Las tomó quien construyó, no quien dirige el proyecto. Ninguna contradice a los documentos: son
huecos que los documentos no cubrían y que el código tuvo que llenar para poder existir.

**Del [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0):**

- [ ] Los errores 405, 406 y 415 responden 400 con el código `40000`
- [ ] `@PendienteDeEmitir` marca en el catálogo los códigos que todavía nadie emite
- [ ] El catálogo de códigos va dentro del OpenAPI, en `x-prisma-codigos`
- [ ] La pantalla de versión incompatible tiene tres filas de versiones y no las dos del mockup
- [ ] Se siguió el texto del mockup y no el literal del escenario [BDD-101-1](docs/03-requisitos-y-bdd.md#bdd-101-1)

**De poner dev en línea ([ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md)):**

- [ ] **Dev construye desde el repositorio y no promueve una imagen**, que es lo contrario de lo que
      pide [19 §2.3](docs/19-ambientes-y-entrega.md#23-el-artefacto-se-promueve-no-se-reconstruye). Cumplirlo pide publicar la imagen en un registro desde la integración continua
      y que el alojamiento despliegue esa etiqueta; es trabajo de la promoción del [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9)
- [ ] **La API y el front quedan en dos dominios distintos**, por decisión de quien dirige. La cookie
      `prisma_renovacion` de la [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2) va a exigir `SameSite=None` y `allowCredentials=true` —hoy en
      `false` con su justificación escrita—, y `*.up.railway.app` está en la Public Suffix List, así
      que ni siendo subdominios hermanos la comparten. La alternativa era un dominio con `nginx`
      haciendo de proxy
- [ ] **Las contraseñas de la semilla quedan alcanzables desde internet.** Mientras sigan siendo las
      de la semilla, el enlace de dev no se comparte fuera de quien tenga que verlo. Cambiarlas en el
      proyecto dev es lo que cierra el riesgo
- [ ] El nivel de registro de `org.springframework.jdbc.core` en dev pasa a salir de `LOG_SQL`, con
      `INFO` por defecto: las consultas llevan adentro el correo sintético de cada persona, y dev ya
      no es solo una máquina
- [ ] La imagen que compila el front es `ghcr.io/cirruslabs/flutter`, fijada por versión. Es una
      dependencia de un tercero en tiempo de construcción; la alternativa sin terceros es clonar
      Flutter por git sobre Debian, más lenta
- [ ] El `railway.json` de cada repositorio guarda la sonda, su tiempo de espera y la política de
      reinicio. Son decisiones de entrega que hoy no describe ningún documento

**Del canal firmado ([ADR-021](docs/adr/ADR-021-canal-firmado.md)), y la 2.13 tiene que leer lo mismo:**

- [ ] **`sha256(cuerpo)` se escribe en hexadecimal minúsculo.** El [20 §6.2](docs/20-contrato-de-api.md#62-cómo-se-arma-la-firma) nombra el
      resumen pero no dice en qué base se escribe, y hay que elegir una o la firma no es
      reproducible. Se eligió hexadecimal porque es lo que imprime un `sha256sum`, así que una firma
      se puede rehacer a mano desde una terminal cuando haya que depurarla
- [ ] **La clave de firma se usa decodificada de Base64, no como texto.** Son los bytes que la API
      generó; firmar con las letras del Base64 sería firmar con otra clave —una que nadie eligió— y
      funcionaría igual de bien hasta el día en que el otro extremo decodificara
- [ ] 🔒 **El front firma aunque todavía nadie comprueba.** El filtro es la [2.13](docs/08-plan-de-desarrollo.md#tarea-2-13); hasta que exista,
      las cabeceras viajan y se ignoran. El orden inverso dejaría dev roto entre una tarea y la
      siguiente

**Del filtro de firma ([2.13](docs/08-plan-de-desarrollo.md#tarea-2-13)) y sus tablas ([2.20](docs/08-plan-de-desarrollo.md#tarea-2-20)):**

- [ ] **`sesiones` guarda el `sha256` del token, no el token.** El [20 §6](docs/20-contrato-de-api.md#6-el-canal-firmado) no dice dónde vive la
      clave de firma del lado del servidor, y había que elegir por dónde encontrarla. Con el resumen
      alcanza, y una copia de la tabla no entrega tokens con los que entrar
- [ ] **El `sub` sale de decodificar el token sin verificar su firma.** Toda consulta pasa por
      `ConIdentidad` ([ADR-012](docs/adr/ADR-012-identidad-a-postgres.md)), así que el filtro necesita un `sub` **antes** de poder buscar la
      sesión. No autentica a nadie: un `sub` falsificado encuentra la sesión de otra persona y la
      firma no cuadra igual, y el rechazo es `40101`. Verificar el token de verdad es la [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)
- [ ] **El filtro de firma no publica identidad**, aunque la averigua: no llama a
      `IdentidadDeLaPeticion.poner`. Hacerlo destrabaría de paso el registro de idempotencia, que
      hoy exige la cabecera sin anotar nada, pero eso es la [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2) con su contrato de cookie y su
      prueba, y meterla aquí sería meterla sin tarea
- [ ] **La purga de `sesiones` no la pide ningún documento.** Se agrega con el mismo criterio y el
      mismo rol que las otras dos: una clave de firma vencida no deja entrar, pero seguir
      guardándola es superficie de ataque a cambio de nada
- [ ] **La regla de arquitectura ganó una segunda envoltura**, `SesionesDelRecienAutenticado`.
      Abrir la transacción sigue siendo cosa de los filtros; la excepción del ingreso ya existía
      para leer la ficha y ahora hay que guardar la sesión en esa misma ruta exenta. Se enumera la
      clase, como la primera, en vez de abrirle la puerta al paquete
- [ ] **El contrato subió a `0.6.0` sin que cambiara ninguna operación.** Los tres códigos del canal
      firmado dejaron de llevar `pendienteDeEmitir`, que es un cambio del documento aunque no lo sea
      del comportamiento: la prueba [C-04](docs/12-pruebas-y-calidad.md#c-04) lo trata como cambio de contrato y obliga a pasar por aquí
- [ ] **El proveedor de identidad falso devolvía un vencimiento fijo** —`2026-09-17T15:00:00Z`— y
      pasó a ser relativo. Una fecha escrita a mano deja de ser futura al día siguiente de
      escribirla, y desde que la sesión se guarda, `sesiones_vence_despues` la rechaza. Lo
      encontraron las pruebas de integración, no la compilación: es el tipo de fallo que solo
      aparece contra una base de verdad
- [ ] **El vencimiento viaja como `OffsetDateTime` en UTC y no como `java.sql.Timestamp`**, que no
      lleva zona: contra un `TIMESTAMPTZ`, el valor guardado dependería del huso de la máquina que
      atienda la petición, y en `America/Bogota` son cinco horas sobre una ventana que dura una
- [ ] **La consulta de vigilancia del [16 §10.2](docs/16-base-de-datos-y-snapshots.md) sigue preguntando por una sola tabla**, aunque
      desde la [2.20](docs/08-plan-de-desarrollo.md#tarea-2-20) se purguen tres. Ampliarla es cambiar ese documento, no el guion de
      verificación, y no había tarea para hacerlo

**De la navegación dictada ([2.14](docs/08-plan-de-desarrollo.md#tarea-2-14)):**

- [ ] ⚡ **El [10 §2.1](docs/10-ux-y-mockups.md#21-navegación-por-rol) y el contrato no listan las mismas secciones.** El contrato fija ocho
      claves y el documento nombra además **«Configuración»** para Gerencia y **«Inicio»** y **«Mi
      desprendible»** para Operación, que no tienen ninguna. Se emiten las ocho del contrato, porque
      una clave que el front no conoce no se pinta. **Lo decide quien dirija**: o el 10 se pone al
      día, o el contrato gana dos claves
- [ ] 🔒 **El filtro de firma publica la identidad, y eso adelanta media [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2).** Se publica
      **después** de que el HMAC cuadre, nunca al leer el `sub`: el token no está verificado, pero
      una firma que cuadra sí autentica —solo quien tiene la clave de esa sesión puede producirla—.
      Lo demás de la [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2) —la expiración a 30 días, la cookie de renovación y el enrutamiento del
      front— llegó después, y está en el bloque de abajo
- [ ] **El código `40302` entra al catálogo de la API.** El contrato acordado lo tenía desde la
      [2.19](docs/08-plan-de-desarrollo.md#tarea-2-19) marcado como pendiente de la [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1), que no lo emitió. Lo emite esta tarea: quien entró con
      la contraseña temporal no recibe menú
- [x] **La operación ya acepta `vista=operacion`** — lo cerró la [2.18](docs/08-plan-de-desarrollo.md#tarea-2-18). Estuvo declarado sin
      emitirse desde la [2.19](docs/08-plan-de-desarrollo.md#tarea-2-19), que es el error que esta misma lista tenía anotado para la cookie de
      renovación, y la copia fijada del contrato convergió hacia el acordado sin subirle la versión:
      no se declaró nada nuevo, se empezó a cumplir lo que ya estaba escrito
- [ ] **El menú pinta y no lleva a ninguna parte todavía.** Las pantallas de cada sección son de los
      sprints 3 a 8; la activa se marca y el contenido es un marcador de posición

**De la sesión de 30 días ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)):**

- [ ] ⚡ **Cerrar sesión no apaga la clave de firma, y el contrato dice que sí.** Se revoca la
      renovación en el proveedor y se vence la cookie, así que **nadie vuelve a entrar con ella**;
      pero el token de acceso que ya salió sigue sirviendo hasta que venza, como mucho una hora, y
      `sesiones` no admite `UPDATE` ni `DELETE` ([ADR-004](docs/adr/ADR-004-base-solo-escritura.md)), así que no hay dónde marcar esa fila.
      **Cerrarla del todo es una tarea de Base**, como lo fue la [2.20](docs/08-plan-de-desarrollo.md#tarea-2-20), y la decide quien dirija: o se
      agrega esa tarea, o el contrato se pone al día con lo que de verdad ocurre
- [ ] **La cookie lleva dentro el testigo de renovación del proveedor**, no una referencia a una
      fila. Es lo que evitó una migración: con una cookie opaca habría que ir actualizando la fila
      que apunta, y esta tabla no se actualiza. Es `HttpOnly`, así que el front no la lee —se
      comprobó en Chrome—, y lo que se guarda del lado del servidor sigue siendo solo el resumen del
      token
- [ ] **`SameSite=None` en vez del `Strict` que decía el contrato.** El front y la API viven en
      dominios distintos desde el [ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md) y `*.up.railway.app` está en la Public Suffix List: con
      `Strict` la cookie no viaja nunca. **Va con un dominio único y `nginx` de proxy volvería a ser
      `Strict`**, que es lo que ese mismo ADR dejó anotado como alternativa. Mientras tanto la API
      responde con credenciales permitidas, y eso obliga a que `ORIGENES_PERMITIDOS` nunca sea `*`
- [ ] **Un token vencido responde `40100` y ya no `40101`.** Antes, una petición perfectamente
      firmada con la sesión caducada recibía «tu firma no cuadra», y el front no tenía cómo saber
      que lo que tocaba era renovar. La fila de `sesiones` se lee ahora sin filtrar por vencimiento y
      es la base quien dice si sigue viva
- [ ] **Renovar dos veces seguidas devuelve la clave de firma guardada, no una nueva.** GoTrue tiene
      una ventana en la que reutiliza la sesión ya emitida —para que un reintento no deje a nadie
      fuera— y devuelve el mismo token; como la tabla no admite `UPDATE`, la clave recién generada no
      se guardaba y el cliente firmaba con una que la base no conocía. Lo encontró la prueba de
      integración, no la compilación
- [ ] **El `40302` solo lo emite la navegación.** Mientras `debeCambiarClave` siga puesto, el
      contrato dice que todo lo que no sea cambiar la clave, renovar, cerrar o pedir un formulario
      responde `40302`; hoy la única operación con sesión que lo comprueba es la navegación, que es
      la que decide qué se pinta. Cuando existan más habrá que decidir si esa regla vive en un filtro
- [ ] **«Cambiar el tema» no entró al menú de la sesión**, aunque el [10 §5.3](docs/10-ux-y-mockups.md#53-la-sesión-en-el-topbar) lo lista. El front
      sigue el tema del sistema y ninguna tarea ha pedido otra cosa: agregarlo sería inventar una
      preferencia que nadie acordó dónde se guarda
- [ ] **El formulario «cambio-de-clave» estrena el mínimo en un campo de tipo `clave`.** El
      generador de descriptores solo admitía `@Size` en un texto, y el contrato pide ocho caracteres
      en una contraseña. Una contraseña se cuenta igual que un texto; lo único que su tipo cambia es
      que se pinta oculta

**Del contrato sin GET ([ADR-030](docs/adr/ADR-030-contrato-sin-get.md)):**

- [ ] La copia fijada de `prisma_api` declara el contrato `0.5.0` aunque solo sirva tres de sus 26 operaciones. Declara contra qué versión está escrita, no cuánto implementa; dejarla en `0.2.0` habría dado dos contratos distintos con el mismo número
- [ ] Las lecturas van a `POST /api/v0/consultas/<recurso>`, con `cargos/asignables` aplanado a `cargos-asignables`
- [ ] Las seis consultas sin datos que filtrar viajan sin cuerpo; solo bitácora, navegación y formularios lo llevan
- [ ] Las dos operaciones de sesión siguen exentas de `Idempotency-Key`, por la razón que ya tenían: no hay clave de firma todavía y su respuesta trae secretos
- [ ] La sonda del despliegue es `GET /actuator/health/readiness`, que ya existía y no es del contrato. `/version` nunca fue una sonda de salud: es el contrato de compatibilidad de [ADR-014](docs/adr/ADR-014-semver.md), y el documento [09](docs/09-plan-de-implantacion.md) decía lo contrario por error
- [ ] El prefijo `/api/v0` lo pone un `WebMvcConfigurer` sobre el paquete de los controladores, no cada anotación. Swagger, `/error` y Actuator quedan fuera

**Del proyecto dev de Supabase (tarea [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4)):**

- [ ] Supabase enciende RLS sola en cada tabla nueva de `public`, con un event trigger suyo,
      `ensure_rls`. Se apagó en las seis que [04 §7](docs/04-modelo-de-datos.md#7-seguridad-por-tipo-de-usuario-rls) deja sin RLS a propósito, en una migración
      aparte: con RLS encendida y cero políticas habrían quedado mudas en cuanto exista el rol
      `prisma_api`
- [ ] Las cuatro vistas que nacieron sin `security_invoker` ya lo llevan, por el mismo motivo que
      [04 §5.6](docs/04-modelo-de-datos.md#56-la-bitácora-de-la-pantalla-es-una-vista-no-una-tabla-nueva) se lo exige a `v_bitacora_usuarios`. Hoy no cambia nada; el día que esas
      tablas restrinjan filas, la fuga habría sido silenciosa
- [x] **La Data API exponía `public`, y era más grande de lo que esta casilla decía.** No eran «las
      seis tablas sin RLS»: `anon` tenía `SELECT`, `INSERT` y `UPDATE` sobre **las veintiséis**, y la
      sonda con la clave anónima —que es pública por diseño— devolvía filas en las seis **y en
      `movimientos`**, porque su política `mov_lectura` es `USING (true)`. O sea, **el libro del
      taller entero**. Solo `usuarios` quedaba tapada. Se cerró el 2026-09-19 con las dos cosas que
      hacían falta: `db_schema` pasó a vacío en dev y en qa —PostgREST contesta ahora `503
      PGRST002`— y entró al plan la [1.21](docs/08-plan-de-desarrollo.md#tarea-1-21), **ya escrita**, que se lo revoca con una migración ([04 §9.1](docs/04-modelo-de-datos.md#91-anon-no-toca-nada)),
      porque una casilla de consola no viaja a uat ni a prod
- [ ] El proyecto firma los JWT con clave asimétrica **ES256**, no con un secreto compartido:
      `SUPABASE_JWT_SECRET` va vacío y la verificación del token ([2.1](docs/08-plan-de-desarrollo.md#tarea-2-1)) tendrá que ir contra el
      JWKS del proyecto
- [ ] Las claves `anon` y `service_role` son las heredadas, y Supabase las retira a finales de
      2026: antes del go-live hay que pasar a las publicables y secretas
- [ ] La semilla necesitó `SET search_path = public, extensions`, porque `pgcrypto` no vive en
      `public` y sin eso `gen_salt()` no existe
- [ ] El `.env` de la API lo carga `spring.config.import`, que no estaba en ninguna parte: hasta
      ahora el archivo se llenaba y no lo leía nadie

**De las tareas [0.5](docs/08-plan-de-desarrollo.md#tarea-0-5) y [0.10](docs/08-plan-de-desarrollo.md#tarea-0-10):**

- [ ] **La contraseña del rol `prisma_api` no está en la migración.** [04 §9](docs/04-modelo-de-datos.md#9-el-rol-con-el-que-se-conecta-la-api) la escribe como
      `:'clave_prisma_api'`, que es sintaxis de `psql` y no existe dentro de un archivo de
      migración, y este repositorio es público. El rol nace sin contraseña —con `LOGIN` y sin
      contraseña no autentica— y se le fija la suya por ambiente, desde fuera
- [ ] Esa migración tampoco puede reafirmar `NOSUPERUSER` ni `NOBYPASSRLS` con un `ALTER ROLE`:
      cambiar esos dos atributos exige ser superusuario, y el rol con el que Supabase aplica las
      migraciones no lo es. Quedan fijados en el `CREATE ROLE`, y la verificación los comprueba
- [ ] **`schema_version` no la describe ningún documento.** La nombran [ADR-014](docs/adr/ADR-014-semver.md), [19 §4.1](docs/19-ambientes-y-entrega.md#41-tres-cosas-versionadas-por-separado) y el
      [RNF-23](docs/03-requisitos-y-bdd.md#rnf-23), pero ninguno dice qué columnas lleva. Se decidió un **histórico**: una fila por
      versión publicada, no un número que se pisa, que es lo coherente con [ADR-004](docs/adr/ADR-004-base-solo-escritura.md)
- [ ] **qa reusa el proyecto de Supabase que sobraba** en vez de crear uno nuevo, y su rol
      `prisma_api` queda sin contraseña hasta que algo apunte ahí

**De la tarea [1.5](docs/08-plan-de-desarrollo.md#tarea-1-5):**

- [ ] **`exportaciones` lleva `FORCE` aunque [04 §7.1](docs/04-modelo-de-datos.md#71-force-row-level-security-por-qué-ahora-sí-hace-falta) no la nombre** en su bloque SQL. Ese mismo
      párrafo dice «son catorce de las dieciséis tablas con RLS» y justifica solo dos exclusiones,
      `usuarios` y `auditoria`: sin `exportaciones` la lista se queda en trece. Se tomó por descuido
      de la lista y no por decisión
- [ ] `schema_version` se queda **sin** `FORCE`: es tabla técnica, no la describe el [04](docs/04-modelo-de-datos.md), su lectura
      es abierta y quien la escribe es el rol de migraciones

**De la tarea [1.6](docs/08-plan-de-desarrollo.md#tarea-1-6):**

- [ ] **Una transacción con identidad no se abre dentro de otra**, ni dentro de una transacción
      ajena: se rechaza. Unidas, el `SET LOCAL` de adentro seguiría vigente cuando el cuerpo ya
      terminó. [07 §7.2](docs/07-arquitectura.md#72-la-solución-obligatoria) dice «una transacción por petición» pero no qué pasa si se anidan
- [ ] Los claims llevan `sub` y `role: authenticated`, con la forma que ya usa `verificar-base.sql`, y
      nada más del token
- [ ] El `JdbcClient` se usa pero no se guarda: cada consulta se lo pide a `ConIdentidad.jdbc()`
- [ ] **La prueba de integración le pone a `prisma_api` una contraseña local** antes de empezar,
      conectada como el dueño, y se niega si la base no es de esta máquina. La migración deja ese rol
      sin contraseña a propósito
- [ ] `./gradlew integracion` no guarda estado ni usa la caché de Gradle: lo que mira es la base, que
      Gradle no ve como entrada
- [ ] El ejemplo de [07 §7.2](docs/07-arquitectura.md#72-la-solución-obligatoria) se corrigió: fijaba los claims con `jdbc.update`, y el controlador de
      PostgreSQL rechaza una actualización que devuelve filas

**De la tarea [2.6](docs/08-plan-de-desarrollo.md#tarea-2-6):**

- [ ] **El botón de mostrar va en los dos campos de clave**, y no solo en el primero como el mockup:
      el descriptor dice `clave` en `claveNueva` y en `repeticion`, y el renderizador no puede
      distinguirlos sin traerse una regla propia
- [ ] **Una contraseña no se recorta:** los espacios del principio y del final viajan tal cual. Un
      campo de texto sí se recorta, como hasta ahora
- [ ] `ClienteApi.enviarSinClave` existe solo para las dos rutas que el contrato exime de
      `Idempotency-Key`. El inicio de sesión tampoco pasa por la cola de pendientes: reintentar un
      ingreso sin red no significa nada
- [ ] **Tres avisos los escribe la pantalla**, porque no hay sobre del que sacarlos: no se pudo
      conectar, el servidor respondió algo que no se entiende y no se pudo cargar el formulario.
      Ninguno habla de una regla de negocio
- [ ] Un rechazo con errores por campo se pinta bajo su campo y no se repite arriba

**De las tareas [1.1](docs/08-plan-de-desarrollo.md#tarea-1-1) a [1.4](docs/08-plan-de-desarrollo.md#tarea-1-4):**

- [ ] **Los tres `CHECK` de `exportaciones` los bautizó el código.** El [13 §8](docs/13-respaldo-y-exportacion.md#8-tabla-de-registro) es el único sitio
      del proyecto que escribe restricciones sin nombre, y uno de los tres se llamaba
      `exportaciones_check`: un nombre que PostgreSQL numera **por posición** y que cambiaría con la
      siguiente restricción que entre a esa tabla. Se siguió el patrón del [04 §4.1](docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes):
      `exportaciones_alcance_tipo_valido`, `exportaciones_formato_valido` y
      `manifiesto_salvo_en_pantalla`
- [ ] **`DELETE` y `TRUNCATE` se le revocaron también a `anon` y a `service_role`**, que [04 §5.1](docs/04-modelo-de-datos.md#51-revocación-real-del-borrado) no
      nombra. No fue precaución: con `anon` —clave pública, Data API abierta— se borró una fila de
      verdad y se vació `auditoria` entera con un `TRUNCATE`, que **no pasa por RLS**. `service_role`
      entra aunque sea el rol «administrador», por coherencia con [ADR-004](docs/adr/ADR-004-base-solo-escritura.md): la única excepción del
      modelo, la purga de claves vencidas, la corre el dueño
- [ ] **`schema_version` se queda en `0.1.0`** aunque el esquema haya cambiado. Ningún documento dice
      cuándo sube el SemVer del esquema; el precedente de la [1.5](docs/08-plan-de-desarrollo.md#tarea-1-5) es no moverlo, y `prisma_api`
      declara `0.1.0` en su configuración, que no puede viajar en el mismo commit ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)). Cuándo y
      cómo se publica una versión nueva del esquema es lo que tiene que escribir la [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)
- [x] **Los docs [07](docs/07-arquitectura.md) y [12](docs/12-pruebas-y-calidad.md) nombraban una restricción `movimientos_valor_positivo` que no
      existe.** El [04](docs/04-modelo-de-datos.md), que es el que manda sobre el esquema, hace de esa regla un dominio: quien
      rechaza un valor cero es `dinero_positivo_mayor_que_cero`. Corregido en los dos por la [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8), y
      la tabla salió del [04](docs/04-modelo-de-datos.md). **El [ADR-015](docs/adr/ADR-015-validacion-tres-capas.md) se queda como estaba**: está reemplazado, y un
      documento reemplazado «se conserva como historia» ([22 §4](docs/22-documentacion.md))
- [ ] **La verificación de la base es un guion SQL** (`scripts/db/verificar-base.sql`) y no un marco
      de pruebas: `prisma_db` no tiene ninguno, y lo que hay que comprobar son respuestas de
      PostgreSQL a sesiones de verdad. Corre dentro de una transacción que termina en `ROLLBACK`

**De la tarea [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13):**

- [ ] **`peticiones_idempotentes` no exige que la clave venza después de creada**, y `nonces_vistos`
      sí lo exige (`nonces_vistos_vence_despues`, [04 §4.10](docs/04-modelo-de-datos.md#410-los-nonce-vistos)). Se transcribió el [04 §4.9](docs/04-modelo-de-datos.md#49-claves-de-idempotencia) tal cual:
      sumarlo sería una regla que el documento no escribió. Si hace falta, entra primero al [04](docs/04-modelo-de-datos.md) y
      después en una migración nueva
- [ ] **La migración no repite el `REVOKE DELETE`**: la tabla nace sin borrado por los
      `ALTER DEFAULT PRIVILEGES` de la [1.2](docs/08-plan-de-desarrollo.md#tarea-1-2), como dice el [04 §4.9](docs/04-modelo-de-datos.md#49-claves-de-idempotencia), y `verificar-base.sql` lo comprueba en
      ella. Ese amparo depende de qué rol crea la tabla: los privilegios por defecto de `postgres` quitan
      el borrado, pero los de `supabase_admin` lo conceden. Hoy las migraciones las aplica `postgres`, y
      si algún día no fuera así, la fila de la [1.2](docs/08-plan-de-desarrollo.md#tarea-1-2) del guion lo diría

**Del dominio (tareas [3.1](docs/08-plan-de-desarrollo.md#tarea-3-1), [3.2](docs/08-plan-de-desarrollo.md#tarea-3-2), [4.1](docs/08-plan-de-desarrollo.md#tarea-4-1), [5.1](docs/08-plan-de-desarrollo.md#tarea-5-1), [5.3](docs/08-plan-de-desarrollo.md#tarea-5-3) y [5.6](docs/08-plan-de-desarrollo.md#tarea-5-6)):**

- [ ] El dominio rechaza dos cosas que la base permite: un gasto con cuenta de destino, y una
      transferencia de una cuenta a sí misma ([§9](#9-a-vigilar))
- [ ] El margen por hora de un ítem que no consume tiempo de taller **no existe**, y viaja vacío en
      vez de cero: pintarlo como cero lo dejaría de último en el cuadro comparativo de la tarea [5.9](docs/08-plan-de-desarrollo.md#tarea-5-9),
      como si fuera el peor negocio del taller
- [ ] Un tiempo con más de dos decimales se rechaza en vez de redondearse, porque es lo que la
      columna `NUMERIC(6,2)` puede guardar
- [ ] Un pedido `cotizado` no se puede entregar sin confirmarse antes
- [ ] El identificador de un movimiento lo genera la API y no la base, para que repetir una petición
      que se cortó no cree dos ([ADR-020](docs/adr/ADR-020-idempotencia.md))
- [ ] La zona `America/Bogota` vive en el dominio y no en la configuración, porque cambiarla
      cambiaría a qué mes pertenece un movimiento ([RNF-08](docs/03-requisitos-y-bdd.md#rnf-08))
- [ ] La tarifa por hora se calcula aparte y el costeo guarda la que tenía cuando se produjo:
      recalcularla desde el pro-labore de hoy cambiaría los costos de los pedidos viejos
- [ ] Un mes sin horas productivas no tiene tarifa y se rechaza; un costo mensual en cero sí da
      tarifa cero
- [ ] Un producto rinde menos cuando deja por hora menos del 70 % de la mediana de **los demás**, que
      es la regla del formulario del mockup. No se tomó el umbral fijo de $30.000 con que el mockup
      pinta la columna de la tabla: depende de los precios del taller de ejemplo
- [ ] La mediana de una cantidad par es el promedio de los dos del centro, redondeado a peso; el
      mockup tomaba el de arriba
- [ ] Vender a pérdida es alerta crítica y rendir menos, alta. [11 §2](docs/11-riesgos-y-proteccion-de-datos.md#2-riesgos-del-negocio-que-el-sistema-ayuda-a-detectar) pone «margen por hora bajo
      o negativo» juntos en Alta; [12 §5](docs/12-pruebas-y-calidad.md#5-casos-límite-que-deben-probarse) pide el negativo en rojo, y el rojo es de lo crítico ([10 §3.1](docs/10-ux-y-mockups.md#31-color))
- [ ] Pérdida es margen negativo, no margen cero: el mockup avisaba «vendes a pérdida» también en cero

**Del contrato (tarea [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17)):**

- [ ] Crear categorías queda como algo de Gerencia: la matriz de [01 §4](docs/01-vision-y-alcance.md#4-matriz-de-tipos-de-usuario-y-permisos) nombra las cuentas de dinero
      y no dice nada de las categorías
- [ ] `casilla` es un quinto tipo de campo del descriptor, para el `BOOLEAN` de `es_fijo`
- [ ] Una lista trae `opciones` —fijas— o `origen` —la ruta que las da—, y nunca las dos
- [ ] ⚡ `POST /api/v0/consultas/cuentas` no devuelve saldos, ni a Gerencia: los saldos son la [3.12](docs/08-plan-de-desarrollo.md#tarea-3-12)
- [ ] Tres códigos nuevos para las reglas que no caben en el descriptor: `42220`, `42221` y `42222`
- [ ] Editar y anular cuentas y categorías no entran al contrato todavía, porque ningún requisito
      las pide

**De la purga de las claves vencidas (tarea [1.16](docs/08-plan-de-desarrollo.md#tarea-1-16)):**

- [ ] **El horario quedó literal, y no corre de madrugada.** `pg_cron` agenda en el huso de
      `cron.timezone`, que en Supabase es `GMT` y no admite un huso por tarea, así que el
      `20 3 * * *` del [04 §4.9](docs/04-modelo-de-datos.md#49-claves-de-idempotencia) corre a las **22:20 de Bogotá**. Se dejó el valor escrito en vez de
      cambiarlo por la espalda. Si se quiere de madrugada de verdad es `20 8 * * *`, y hay que
      cambiar el [04](docs/04-modelo-de-datos.md) y el [16 §10](docs/16-base-de-datos-y-snapshots.md#10-tareas-programadas-dentro-de-la-base)
- [ ] **No se tocó `prisma_api`, aunque el plan ponga el carril «API, Base».** Los documentos
      movieron la purga dentro de la base: corre como el rol de migraciones, y [04 §4.9](docs/04-modelo-de-datos.md#49-claves-de-idempotencia) y
      [16 §10.1](docs/16-base-de-datos-y-snapshots.md#101-qué-hace-falta-en-cada-ambiente) dicen que darle `DELETE` al rol de la API sería el error. Una prueba en la API que
      solo leyera `cron.job` probaría la base desde el repositorio equivocado
- [ ] **La purga de `nonces_vistos` no entra todavía:** su tabla es del [04 §4.10](docs/04-modelo-de-datos.md) y llega con el canal
      firmado del [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2). La consulta de vigilancia pregunta por la tabla que existe

**De la primera promoción a qa (tarea [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)):**

- [ ] **La versión del esquema sube a `0.2.0`, y luego a `0.3.0`, y esa regla no la escribió ningún
      documento.** [19 §4.2](docs/19-ambientes-y-entrega.md#42-las-reglas) define MAJOR, MINOR y PATCH **para la API**; del esquema solo se
      sabe que lleva SemVer propio. Se decidió lo mínimo: mientras todo siga en `0.y.z` y ninguna API
      en producción escriba, una tabla nueva y unas restricciones más estrictas son **MINOR**. Es la
      decisión que esta lista le pedía a la [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12), y responde la entrada de arriba sobre
      `schema_version`
- [ ] **La `0.2.0` describe cuatro cambios y la base tiene cinco, y se arregló con una fila más y no
      corrigiéndola.** Entre que se fusionó y que se promovió entraron las dos tablas del canal
      firmado ([2.20](docs/08-plan-de-desarrollo.md#tarea-2-20)), que su descripción no nombra. Corregirla es lo que pediría el cuerpo, pero ya
      estaba aplicada, y editar una migración aplicada no cambia el ambiente que la corrió y sí deja
      a los demás creyendo otra historia. La `0.3.0` lo dice en una fila nueva. El precio fue tocar
      el bloque `1.12` de `verificar-base.sql`, que llevaba los dos valores escritos a mano
- [ ] **Dos frases del [§10](#10-decisiones-de-construcción-que-conviene-revisar) sobre la rama `qa` no pueden ser verdad a la vez.** Arriba: moverlas
      «sería inventar un flujo de ramas por ambiente que nadie decidió». Abajo, en lo de empujar
      siempre: «en `prisma_db`, promover a qa es un PR contra la rama `qa`». El [21 §6.5](docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) solo nombra
      `develop` y `main`, y el procedimiento del [16 §5.3](docs/16-base-de-datos-y-snapshots.md#53-promover-a-qa-paso-a-paso) promueve con `db push` desde `develop`, sin
      tocar ninguna de las tres. Promover no necesita la respuesta; el flujo de ambientes del
      [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9), sí
- [ ] **`prisma_db` es privado, y sus guiones dicen que es público.** `promover.ps1` y el
      [16 §5.3](docs/16-base-de-datos-y-snapshots.md#53-promover-a-qa-paso-a-paso) justifican no escribir ahí ninguna referencia ni contraseña «porque el repositorio es
      público», y quien manda es el hábito, no el motivo: la referencia sigue sin escribirse. Pero el
      privado es el que necesita el secreto `PRISMA_DB_TOKEN` de la [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7), y el que decide si `prisma_db`
      puede recibir integración continua sin gastar minutos de una cuenta. Público es **este**
      repositorio, no aquel
- [ ] **Las ramas `qa`, `uat` y `prod` de `prisma_db` no se tocaron.** Existen en el remoto, las tres
      en el mismo commit viejo, y **ningún documento las menciona**: [21 §6.5](docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) solo nombra `develop` y
      `main`. O son el estado de cada ambiente y llevan tiempo mintiendo, o son restos de cuando se
      creó el repositorio. Moverlas sería inventar un flujo de ramas por ambiente que nadie decidió
- [ ] **La promoción se hace a mano, aunque [19 §7.1](docs/19-ambientes-y-entrega.md#71-publicar) la dé por «Automático».** Esa tubería llega en el
      [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) ([ADR-026](docs/adr/ADR-026-railway-al-final.md)), y `prisma_db` no tiene integración continua: no existe `.github/` en
      el repositorio. El procedimiento de [16 §5.3](docs/16-base-de-datos-y-snapshots.md#53-promover-a-qa-paso-a-paso) dice lo que hay, no lo que habrá
- [ ] **Nadie sabía en qué estado estaba qa, y esa es la lección de la promoción.** Los documentos
      decían cuatro migraciones de atraso; eran cinco, y no las mismas: los dominios y la revocación
      del borrado ya estaban aplicados allá, sin que ningún commit ni ninguna etiqueta lo dijera.
      Salió bien porque `migration list` y el `-EnSeco` se miran antes de aplicar, no porque el
      tablero acertara. Mientras el estado de un ambiente se lleve escrito a mano en un documento va
      a volver a pasar; lo que lo arregla de verdad es la etiqueta por versión del [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md), y que
      alguien la ponga en cada promoción
- [ ] **Ahora el que va atrás es dev, y no hay guion que lo arregle.** Le falta la `0.3.0`, que se
      escribió en esta tarea y viajó a qa en la misma pasada. `promover.ps1` solo admite `qa` a
      propósito —ofrecer destinos que nadie puede comprobar sería peor—, así que poner dev al día
      hoy es volver a vincular el CLI y correr `db push` a mano, justo lo que el guion existe para
      no tener que hacer. O el guion admite `dev`, o la tubería del [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) se encarga de los dos
- [ ] **Se promovió desde una rama de trabajo, no desde `develop`.** El [16 §5.3](docs/16-base-de-datos-y-snapshots.md#53-promover-a-qa-paso-a-paso) no dice desde
      dónde se corre, y se corrió desde la rama de la propia [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12), antes de fusionarla: qa tiene la
      `0.3.0` aplicada mientras su migración todavía espera revisión. El contenido es el mismo que se
      va a fusionar, pero el orden correcto es al revés, y la etiqueta del [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) solo se puede
      poner después. Si el PR se rechazara, qa tendría una migración que el repositorio no tiene

**De la preparación de uat y prod (tarea [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4)):**

- [ ] **La contradicción de la factura se resolvió contra el [09](docs/09-plan-de-implantacion.md), que era el que estaba mal.** Decía «dos
      proyectos de Supabase de pago y **un** alojamiento de API»; el [19 §8.1](docs/19-ambientes-y-entrega.md#81-qué-se-paga-y-qué-no) dice **dos**. Ganó el 19
      porque no está solo: el [19 §2.4](docs/19-ambientes-y-entrega.md#24-el-artefacto-de-la-api-una-imagen-de-contenedor-con-una-jvm-adentro) explica el porqué —«la primera petición después de la siesta paga
      el arranque entero»— y la condición 2 del [ADR-026](docs/adr/ADR-026-railway-al-final.md), que el [ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md) dejó **intacta**, dice que uat y
      prod no se duermen. Tres fuentes contra una. De paso, la fila de uat del [09 §3.2](docs/09-plan-de-implantacion.md#32-alojar-la-api-de-java-en-los-cuatro-ambientes) aceptaba el
      arranque en frío sin distinguir cuál: ahora acepta el de después de desplegar y no el de la
      inactividad, que es el que cuesta dinero
- [ ] **La tarea de los cuatro proyectos de Supabase se partió en dos, y así es como acabó
      marcada.** El plan 25 decía marcarla y la sesión que lo ejecutó no lo hizo: pedía «los cuatro»
      y uat y prod no existen, así que marcarla habría sido escribir en el tablero algo que no es
      cierto, que es justo lo que costó trabajo descubrir en qa. Lo que resolvió el desacuerdo fue
      partirla —`plan/50`—: los dos gratuitos se quedan en la [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4), hecha, y los dos de pago son la
      [9.12](docs/08-plan-de-desarrollo.md#tarea-9-12), en el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9). La fila 3 del [§7](#7-decisiones-pendientes) sigue 🟡 y ahora bloquea a la 9.12: lo que está
      listo es el expediente, no la decisión
- [ ] **No se escribió ningún ADR nuevo, y esa también es una decisión.** El plan pedía uno solo si algo
      cambiaba respecto del [ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md) —adelantar uat o prod, pagar dev, montar el registro de imágenes— y
      no cambió nada: uat y prod siguen esperando al [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) y no se contrató nada. Poner precio a lo
      ya decidido no es decidir de nuevo. Lo que sí apareció es que el [ADR-033](docs/adr/ADR-033-service-role-solo-en-auth.md) **no estaba en el índice
      de ADR**, que por eso contaba 32

**De la vista previa de Operación (tarea [2.18](docs/08-plan-de-desarrollo.md#tarea-2-18)):**

- [ ] **A Operación se le ignora el pedido de vista previa, en vez de rechazárselo.** Ningún
      documento dice qué hacer con ese caso: el contrato declara la operación con un `40300` entre
      sus códigos posibles y dice que «solo la pide Gerencia», pero no declara esa respuesta y
      ninguna prueba la pide. Se decidió lo mínimo —quien no es Gerencia recibe su propio menú, sin
      franja y sin interruptor—, porque pedirla sería pedir el menú que ya tiene y rechazarla
      abriría un camino de error que nadie especificó. Si quien dirige prefiere el rechazo, es una
      línea en `MenuDeLaSesion` y una prueba
- [ ] **El [10 §2.1](docs/10-ux-y-mockups.md) nombra tres secciones que el contrato no tiene:** «Configuración», «Inicio» y
      «Mi desprendible». No estorbaron a esta tarea —el [10 §5.6](docs/10-ux-y-mockups.md#56-vista-previa-de-operación) solo habla de Inversiones, Reportes y
      Nómina, y esas tres sí están entre las ocho claves— pero o el documento sobra tres o el
      contrato le faltan tres, y eso lo decide quien dirige y no el carril que pinta
- [ ] **La mitad de la vista previa que no se pudo construir es la que no tiene pantalla.** El
      [10 §5.6](docs/10-ux-y-mockups.md) también pide que «Productos deje de mostrar costos y márgenes» y que «Nómina quede
      bloqueada»: las dos pantallas son de los sprints 5 y 8, así que hoy la sección simplemente no
      viene en el menú, que es lo que sí se puede comprobar. Al construirlas hay que volver aquí

**Del front (tareas [0.19](docs/08-plan-de-desarrollo.md#tarea-0-19), [1.19](docs/08-plan-de-desarrollo.md#tarea-1-19), [1.18](docs/08-plan-de-desarrollo.md#tarea-1-18), [2.10](docs/08-plan-de-desarrollo.md#tarea-2-10) y [9.1](docs/08-plan-de-desarrollo.md#tarea-9-1)):**

- [ ] «Acerca de» se abre tocando la insignia de versión. El mockup lo pone en el menú de la
      sesión, que llega con el [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2) y [2.14](docs/08-plan-de-desarrollo.md#tarea-2-14)); la insignia ya es el sitio donde se mira la versión
- [ ] Una celda más ancha que su columna desborda a la vista en vez de recortarse: el aviso de
      Flutter es la señal de que la columna está mal medida
- [ ] El panel de confirmación recibe el campo y el mensaje de error ya hechos, en vez de
      construirlos. Es lo que impide que el front se quede con una regla propia
- [ ] Un descriptor al que le falte algo —un tipo desconocido, una regla sin mensaje, una lista sin
      opciones ni origen— no se pinta a medias: no se pinta, y la pantalla lo dice
- [ ] Los avisos de un formulario salen al enviar, no mientras se escribe, y se van en cuanto la
      persona toca el campo; el error del servidor, igual
- [ ] Un campo opcional vacío viaja como `null` y no como cadena vacía
- [ ] El botón que envía lo pone la pantalla, no el renderizador, porque su texto es parte de la
      acción
- [ ] Encolar una acción devuelve «nada» cuando queda pendiente, y eso es lo que la pantalla muestra
      como *Pendiente de sincronizar*: nunca un «listo» que mentiría
- [ ] Solo se reintentan solas la falta de respuesta, los `5xx` y el `40902`; lo que la API rechaza
      con motivo espera a una persona
- [ ] Lo guardado que no se puede leer —de una versión anterior del formato— se deja quieto en vez de
      borrarse

**De la tarea [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1):**

- [ ] **El `sub` sale del cuerpo que devuelve GoTrue, no de verificar la firma del token.** En el
      inicio de sesión el token nace en una llamada servidor a servidor, y ningún endpoint recibe
      todavía un token de un cliente. Verificarlo contra el JWKS ES256 es del filtro de sesión
      ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)), que es quien lee `Authorization: Bearer`
- [ ] **`activo` lo comprueba la API, no una política de RLS.** Las políticas dejan a una persona
      desactivada leer su propia ficha, y el contrato exige que `40301` salga **solo** con la
      contraseña correcta ([BDD-28-3](docs/03-requisitos-y-bdd.md#bdd-28-3)). Esconderla con una política daría `40104` y contradiría al
      contrato
- [ ] **Quien autentica bien y no tiene ficha en `usuarios` responde `40104`**, igual que quien no
      existe. Cualquier otra respuesta le confirmaría a un desconocido que ese correo sí existe en
      Auth. Queda una línea en el registro del servidor, porque es una inconsistencia de datos
- [ ] **El acceso es el único endpoint sin firma, sin idempotencia y sin tope de intentos.** El
      catálogo no tiene un `429` y ningún documento pide bloqueo ni retardo tras varios fallos: se
      dejó fuera a propósito, y conviene decidir si hace falta antes del go-live
- [ ] 🔒 **El catálogo acordado le atribuye a la «Tarea [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1)» tres marcas que no le corresponden.**
      `40302` lo emite el filtro de sesión ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)) y `42210` el cambio de contraseña; y la marca de
      `20100` dice que el primer endpoint que crea algo es el alta de usuarios, cuando resultó ser
      el inicio de sesión. Los tres textos hay que corregirlos en un PR de contrato
- [ ] **La copia fijada publica el 201 sin la cabecera `Set-Cookie`** que el contrato acordado le
      pone: la cookie `prisma_renovacion` es de la [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2), y declararla sin emitirla sería mentir. La
      descripción de la operación sí se copió literal, para no reescribirla en cada tarea
- [ ] **`TipoDeCampo` estrena `clave` pero no `casilla`**, que el enum acordado tiene en medio.
      Ningún formulario usa `casilla` todavía, y el generador valida tipo contra tipo de Java al
      arrancar: declararlo sería código que ninguna prueba ejerce
- [ ] **La clave de firma se genera y se devuelve, y no se guarda en ningún sitio.** El esquema
      `Sesion` la declara obligatoria; dónde vive del lado del servidor y quién la comprueba son la
      [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12) y la [2.13](docs/08-plan-de-desarrollo.md#tarea-2-13)
- [ ] **Una `SUPABASE_URL` vacía no impide arrancar**: la API responde `50000` a todo intento de
      entrar, en vez de negarse a arrancar. Es a propósito, para no romper la compilación donde no
      hay Supabase, pero deja el fallo lejos del sitio donde se causó

**De la tarea [1.14](docs/08-plan-de-desarrollo.md#tarea-1-14):**

- [ ] **La cabecera se exige en toda petición, lea o escriba, y no solo en las escrituras.** La fila
      del plan dice «toda escritura», pero es anterior al [ADR-030](docs/adr/ADR-030-contrato-sin-get.md): desde que todo es `POST`, el
      [20 §5.1](docs/20-contrato-de-api.md#51-la-cabecera) dice «toda petición» y el contrato acordado la declara requerida en 24 de sus
      26 operaciones. Seguir la fila del plan dejaría al OpenAPI generado mintiendo sobre nueve
- [ ] **La exención es por ruta exacta, no por «si escribe».** El ingreso **escribe** y va sin clave,
      así que eximir por verbo o por prefijo de consultas le rompería el acceso al front
- [ ] **Una clave presente que no es un UUID v4 responde `40002`, igual que si faltara.** Ningún
      documento cubría el caso: es el mismo defecto del cliente y se arregla igual
- [ ] **La huella es SHA-256 de método, ruta con query, usuario y los bytes crudos del cuerpo**, sin
      normalizar el JSON. Normalizar obligaría a parsear dentro de un filtro, y la huella existe para
      detectar una clave reutilizada para otra cosa, no para juzgar equivalencia semántica
- [ ] **El `40902` sale de un tiempo límite de espera en la llave primaria, no de leer
      `estado = 'en_curso'`:** la fila de la primera petición está sin confirmar y ninguna otra sesión
      la ve nunca. Y como corolario, **no existe una fila «en curso» colgada**
- [ ] **Ese tiempo agotado llega como `55P03`, y Spring no lo clasifica:** viaja en un
      `UncategorizedSQLException`, así que se mira el SQLSTATE. Confiando solo en las excepciones de
      Spring, la segunda petición respondía `50000` en vez de `40902`
- [ ] **La respuesta guardada vuelve del `jsonb` reserializada:** mismo contenido y mismo `status`,
      pero otro orden de claves y otro espaciado, así que no es byte a byte. Serlo exigiría guardar el
      texto crudo en vez de un objeto que se pueda inspeccionar en la base
- [ ] **No se guarda un `5xx`: se revierte.** El front reintenta todo `5xx` con la misma clave, y
      guardarlo dejaría la operación muerta 72 horas devolviendo el mismo fallo. Un `4xx` sí se guarda
- [ ] **Una petición sin identidad exige la cabecera pero no registra fila.** `usuario_id` es
      `NOT NULL` y las tres políticas cuelgan de `auth.uid()`. **Hoy eso es todo el tráfico**: el
      filtro de sesión llega con la [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2), y hasta ese día el efecto visible es el `40002` y el
      parámetro en el contrato
- [ ] **El ingreso responde `50000` contra una base real, y no lo rompió esta tarea:**
      `UsuariosEnPostgres` pide la conexión sin transacción abierta, y en `main` tampoco la abría
      nadie. La abre el filtro de sesión de la [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)

**De la regla de empujar siempre ([21 §6.5](docs/21-trabajo-en-paralelo.md#65-ramas-e-integración)):**

- [ ] **La regla se acota a la rama de trabajo, y las de ambiente siguen sin dueño escrito.**
      `develop`, `main`, `qa`, `uat` y `prod` no se mueven por cuenta propia, pero ningún documento
      dice quién las mueve ni cuándo; en `prisma_db`, promover a qa es un PR contra la rama `qa`
- [ ] **Empujar una rama `feature/` en este repositorio no comprueba nada:** la acción corre solo en
      `main` y en los PR contra `main`, aunque el [22 §8](docs/22-documentacion.md#herramienta) y el [19 §6.1](docs/19-ambientes-y-entrega.md#61-en-cada-empuje-en-paralelo) hablen de «cada
      empuje». O se amplía el disparador a `feature/**` —y cada empuje gasta minutos de acción— o se
      precisa la frase en los dos sitios. La regla da respaldo remoto y un sitio desde donde abrir el
      PR, no verificación
- [ ] **Los documentos no se ponen de acuerdo en cuál es la rama base:** el [21 §6.5](docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) y el
      [08 §4](docs/08-plan-de-desarrollo.md#4-definición-de-terminado) dicen `develop`; el [ADR-026](docs/adr/ADR-026-railway-al-final.md) y el [ADR-028](docs/adr/ADR-028-un-commit-por-tarea.md), `main`. La regla de empujar esquiva la
      contradicción nombrando la rama de trabajo, pero la contradicción sigue ahí

**De los dos arreglos del camino real (no son tareas del plan):**

- [ ] **La transacción del ingreso la abre un adaptador del puerto**, `UsuariosDelRecienAutenticado`,
      y no el filtro: cuando el filtro corre todavía no hay identidad, porque la devuelve el
      proveedor al comprobar la contraseña. La regla de ArchUnit pasa de «solo un filtro» a enumerar
      **dos clases**, y ninguna otra puede abrirla
- [ ] **Un cuerpo sin `nombre` en `POST /api/v0/consultas/formularios` responde `40000`.** Ningún
      documento cubría el caso: el [20 §4.3](docs/20-contrato-de-api.md#43-cómo-se-pide-y-qué-forma-tiene) solo decía qué pasa con un nombre que no existe
      (`40400`). Se descartó `42200`, que habría exigido validación en ese record y cambiado el
      esquema publicado
- [ ] **La prueba que caza esto no corre en la integración continua.** La tubería de la API solo
      hace `./gradlew build`, y el trabajo aparte con la base que decidió [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) [§3](#3-sprint-1--base-rls-identidad-e-idempotencia) todavía no
      existe. Además ese trabajo levanta `supabase db start`, que **no** trae GoTrue: las pruebas del
      ingreso necesitan `supabase start`. Mientras tanto, el cableado del ingreso solo se comprueba
      en la máquina de quien lo corre

**De la gestión de usuarios ([2.7](docs/08-plan-de-desarrollo.md#tarea-2-7)):**

- [ ] ⚡ **Tres huecos de Base que la bitácora necesita y nadie ha planificado.** `usuarios` no tiene
      trigger de auditoría —la migración inicial lo dice en su línea 481: «necesita su propia
      variante, aún no especificada»—; la función `SECURITY DEFINER` que el [04](docs/04-modelo-de-datos.md) dice que escribe
      `usuario_creado` y `clave_restablecida` **no tiene nombre, ni firma, ni migración**; y el
      `CHECK auditoria_accion_valida` no admite `nombre_cambiado`, `cargo_cambiado` ni
      `tipo_cambiado`, que el contrato promete en `EntradaDeBitacora`. La [2.16](docs/08-plan-de-desarrollo.md#tarea-2-16) no se puede hacer
      sin resolver los tres, y ninguno es suyo: son del carril Base
- [ ] **Editar o restablecer a una persona desactivada lo rechaza la API, no la base.** El contrato
      dice `40900` y ninguna restricción lo impone: `usuarios_actualizacion` deja a Gerencia
      actualizar cualquier fila, activa o no. Es la excepción a «los permisos viven en PostgreSQL»
      y se anota como tal. Bajarlo a un trigger es una tarea de Base
- [ ] **El alta toca dos sistemas sin una transacción común.** Si GoTrue crea la identidad y la
      ficha falla, se compensa borrándola; si la compensación también falla, sale el error de la
      ficha y queda una identidad huérfana que no deja entrar a nadie pero ocupa ese nombre de
      usuario. No hay forma de cerrarlo del todo sin una cola de compensaciones
- [ ] **`Motivo` es una clase con un solo `@Formulario`, y el contrato declara cuatro.** Desactivar
      y reactivar una persona, desactivar un cargo y revertir un cambio comparten campo y esquema
      pero tienen etiquetas y mensajes distintos. Aquí se declara el de desactivar una persona;
      como `@Formulario` es por clase, las tareas [2.8](docs/08-plan-de-desarrollo.md#tarea-2-8), [2.15](docs/08-plan-de-desarrollo.md#tarea-2-15) y [2.16](docs/08-plan-de-desarrollo.md#tarea-2-16) van a necesitar una clase cada
      una, y entonces sus esquemas en el OpenAPI dejarán de llamarse todos `Motivo`
- [ ] 🔒 **`cargos-asignables` entra con esta tarea y no con la [2.8](docs/08-plan-de-desarrollo.md#tarea-2-8)**, que es la del catálogo de
      cargos. Es el `origen` declarado del campo `cargoId`: sin ella el formulario de alta no se
      puede pintar, y esperar a la 2.8 habría dejado la 2.7 sin desplegable
- [ ] **El tipo de campo `lista` pasa a admitir `UUID` además de `String`.** Hay dos clases de
      lista: la que elige entre valores de un ENUM y la que elige una fila. En JSON las dos son una
      cadena, y obligar a que el cargo llegara como texto solo conseguiría que alguien lo
      convirtiera a mano
- [ ] **Un tipo de usuario que no es ni Gerencia ni Operación sale como `42200`**, porque el
      catálogo no tiene código propio para eso y no debería: las dos opciones viajan en el
      descriptor y el front pinta esas
- [ ] ⚡ **El sello de idempotencia tapaba el rechazo de la base, y se arregló aquí.** Cuando una
      sentencia falla, PostgreSQL deja la transacción abortada y no acepta ni una más; el filtro de
      la [1.14](docs/08-plan-de-desarrollo.md#tarea-1-14) intentaba sellar la respuesta dentro de esa misma transacción, y su `25P02` salía
      del filtro **pisando** el sobre que el controlador ya había armado. Operación intentando
      quitarse el acceso leía «algo salió mal» con el guardián haciendo exactamente su trabajo.
      Ahora, si el sello no cabe, se revierte la clave y se responde lo que salió —el mecanismo que
      el filtro ya tenía para los 5xx—. **No se vio antes porque hasta la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) ninguna escritura
      llegaba a que la base la rechazara**, y ningún doble aborta una transacción de verdad
- [ ] **Dos rechazos de la base pasan a `40300`**: el de una política sobre un `INSERT` y el del
      trigger que congela la ficha propia. Los dos significan «no te alcanza» y salían como error
      del sistema. Que la API los traduzca no es que decida permisos: sigue sin mirar de qué tipo
      es nadie
- [x] **La traducción de restricción a código estaba escrita a mano en `UsuariosEnPostgres`**, y
      desde la [3.3](docs/08-plan-de-desarrollo.md#tarea-3-3) también en `MovimientosEnPostgres`. Buscaban literales con `contains` sobre el
      mensaje crudo, y `row-level security policy` estaba escrito dos veces. **Cerrado por la
      [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8)**: el texto se lee en un solo sitio, `RechazoDeLaBase`, que entrega el estado, la
      restricción y la tabla por separado. Ningún adaptador busca texto ya

**Del arreglo del alta de usuarios (`plan/23-el-alta-decia-algo-salio-mal.md`):**

- [ ] 🔒 **El alta estuvo caída en dev desde el día en que se publicó la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7), y nadie lo supo.**
      Faltaba `SUPABASE_SERVICE_ROLE_KEY` en el servicio de la API. Esa variable la lista el
      [19](docs/19-ambientes-y-entrega.md), la documenta el `.env.ejemplo` y `application.yml` avisa por escrito de qué deja de
      funcionar sin ella: **el documento estaba bien y aun así el ambiente salió sin cargarla**. Lo
      que no existe es nada que compruebe que un ambiente publicado tiene lo que dice necesitar, y
      eso no lo arregla este plan
- [ ] **`ProveedorNoDisponible` estrena el décimo código base, `50300`.** Antes no tenía manejador y
      salía como `50000`, «Algo salió mal. Intenta de nuevo en un momento», que era falso en las dos
      mitades. Falta configurar y proveedor caído comparten código a propósito: para quien está
      delante son la misma situación. Cuál fue queda en el registro
- [ ] **Quién es un usuario repetido lo decide ahora el `error_code` de GoTrue y no el estado.** El
      adaptador daba por repetido todo 409 y todo 422, y GoTrue usa el 422 también para la clave
      débil y el correo que no acepta: comprobado contra el GoTrue local, `weak_password` llegaba a
      Gerencia como «Ya hay alguien con ese usuario. Elige otro.» Si el cuerpo no trae `error_code`
      se decide por el estado, como antes
- [x] **Ya no caen al `50000` los cuatro rechazos de `usuarios`**: `usuarios_nombre_completo_minimo`,
      `usuarios_id_fkey`, `usuarios_pkey` y `motivo_con_contenido`. Los recogió la [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) con el código
      transversal de su clase —`42200` los tres primeros, `40900` el identificador repetido— y hay
      cuatro pruebas de integración que los provocan contra PostgreSQL y miran qué sale
- [x] **`@Size(min = 3)` sobre `nombreCompleto` no recorta y el `CHECK` de la base sí**, así que
      `"  a"` pasa la validación del formulario y lo rechaza PostgreSQL. **Sigue siendo alcanzable
      desde la pantalla**, y lo que cambió con la [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) es que sale como `42200` señalando
      `nombreCompleto` en vez de como error del sistema. Que el formulario y la base recorten igual
      es otra cosa, y no la arregla esa tarea

**De dejar la integración continua en verde:**

- [ ] **Seis pruebas salen de la compilación de siempre y dejan de comprobarse en cada empuje.**
      Cinco necesitan PostgreSQL —el ingreso lee la ficha de `public.usuarios` con la identidad
      puesta— y pasan a llevar `@Tag("integracion")`, así que corren con `./gradlew integracion`
      contra una base de verdad. La sexta, la del filtro y la sonda de salud, acepta `200` o `503`:
      lo suyo es que la petición llegue a la sonda, no que la base esté viva. El hueco lo cierra el
      trabajo aparte que el [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) manda levantar con Supabase, y que depende de la [1.20](docs/08-plan-de-desarrollo.md#tarea-1-20)

**Del arreglo de la pantalla de acceso:**

- [ ] **El envío del formulario sigue sin distinguir «no hubo respuesta» de «llegó algo sin forma de
      sobre»**: las dos se leen como «No se pudo conectar con el servidor». La carga del formulario ya
      las separa; el envío no, porque `Sesiones` devuelve `Sobre?` y cambiarlo arrastra a la cola de
      pendientes del [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) dentro de un arreglo pequeño. Es la misma imprecisión, en la otra
      mitad de la misma pantalla
- [ ] **«Reintentar» quedó escrito dos veces**: como componente para las dos pantallas de sesión, y a
      mano dentro de la capa de versión incompatible. Es el mismo botón; unificarlos toca una pantalla
      aprobada que ese arreglo no abría, y queda dicho en el propio componente para que no se descubra
      por sorpresa
- [ ] **El arreglo no subió la versión del front**, siguiendo lo que hizo el arreglo suelto anterior.
      Si un cambio de comportamiento visible debe llevar versión propia, la regla no está escrita

**De los datos de dev:**

- [ ] **El cargo «Gerente General (CEO)» existe solo en la semilla**, no en el catálogo de arranque
      del [04](docs/04-modelo-de-datos.md). Se decidió así para no ampliar el catálogo del negocio de paso: una migración lo
      metería también en uat y en prod. Si el cargo es de verdad del negocio, le toca su migración
- [ ] **Cada `supabase db reset` deja al rol `prisma_api` sin contraseña** y la API falla contra la
      base con el resto en pie, porque las dos consultas que se sirven de memoria siguen respondiendo
      `200`. La migración lo crea así a propósito —el repositorio es público—, pero `reset-local.ps1`
      tampoco la repone, así que cada quien lo descubre solo

**Del repositorio de movimientos ([3.3](docs/08-plan-de-desarrollo.md#tarea-3-3)):**

- [ ] **El autor y el instante de un movimiento los pone el caso de uso, no la base.** `creado_por`
      es el de la digitación y no `auth.uid()`: así `mov_insercion` compara dos cosas distintas y
      juzga de verdad —registrar a nombre de otra persona lo rechaza la base, y hay prueba—. Y
      `creado_en` es el instante con que `RegistrarMovimiento` decidió qué día era hoy, y no el
      `DEFAULT NOW()`: con dos relojes, el movimiento devuelto y la fila guardada podrían caer en días
      distintos cerca de la medianoche
- [ ] **La bitácora de lo que escribe la API no sabe desde dónde.** `fn_auditar` saca el
      dispositivo de `request.headers`, que llenaba PostgREST y la API no llena, y la IP de
      `inet_client_addr()`, que con la API en medio es la conexión de la API. Cada movimiento queda
      auditado con la persona correcta, **la IP de la API y ningún dispositivo**, y el [ADR-005](docs/adr/ADR-005-auditoria-por-triggers.md) promete
      los dos. La fila tampoco los tiene: `dispositivo` e `ip` de `movimientos` quedan vacíos, porque
      el dominio no los trae y ningún documento dice de dónde salen. El sitio natural es
      `ConIdentidad`, que pondría las cabeceras de la petición junto a los claims, con la [2.9](docs/08-plan-de-desarrollo.md#tarea-2-9), que
      es la tarea que trae dispositivo e IP. Toca Base y API, y no se inventa aquí
- [x] **Los rechazos de `movimientos` ya no caen todos al código transversal.** La [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4) les cambió
      el código a las cinco filas que ya estaban: `fecha_no_futura` al `42223`,
      `transferencia_con_destino` y la foránea de la cuenta de destino al `42226`, y las de cuenta
      y categoría al `42224` y al `42225`. **No se agregaron filas**, que es lo que [C-01](docs/12-pruebas-y-calidad.md#c-01) exige. Tres
      de los cuatro los ataja antes el dominio, y una prueba compara los dos caminos
- [ ] **El mismo id dos veces lo rechaza la llave primaria, y no se traga en silencio.** El id lo
      pone quien pide, al decidir la acción ([ADR-020](docs/adr/ADR-020-idempotencia.md)): si la clave de idempotencia ya se purgó y la
      misma acción vuelve, el libro no la duplica. Qué responde la API en ese caso **ya lo dice el
      contrato**: `40900`, el mismo que un pedido repetido
- [ ] **Un movimiento que llega anulado no se guarda como nuevo**: el adaptador lo rechaza antes de
      pedir conexión. Ningún documento lo pedía, pero el `INSERT` no escribe la anulación, y
      guardarlo así la habría perdido sin avisar
- [x] **`RegistrarMovimiento` ya está cableado**, con `ConsultarMovimiento` al lado: los dos beans
      los puso la [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4), y el reloj es `Clock.systemUTC()` inyectado para poder fijarlo

**Del contrato de movimientos ([3.13](docs/08-plan-de-desarrollo.md#tarea-3-13)):**

- [ ] **Registrar es `PUT /api/v0/movimientos/{id}` y no `POST` a la colección**, como en pedidos y
      clientes. El id lo genera quien registra junto con la clave de idempotencia ([ADR-020](docs/adr/ADR-020-idempotencia.md)), así que
      en el cuerpo sobraría: el generador de descriptores pinta **todos** los campos del record, y un
      id no se pinta. Con el id en la ruta, el cuerpo es exactamente el formulario, y el mismo dos
      veces responde `40900` en vez de duplicar el libro
- [ ] **El formulario «movimiento» ofrece tres tipos de los nueve**: ingreso, gasto y transferencia.
      Los otros seis tienen su pantalla y su tarea de contrato —[4.10](docs/08-plan-de-desarrollo.md#tarea-4-10), [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9) y [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11)—, y ofrecerlos
      hoy sería acordar pantallas que nadie ha diseñado. La lectura sí devuelve los nueve
- [ ] 🔒 **Seis códigos y no diez**, por lo mismo que el [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10) dio nueve y no dieciséis: una pregunta
      sobre un campo es un código, y el texto concreto viaja en `data.errores`. Por eso `42226` cubre
      las tres situaciones de la cuenta de destino —falta en una transferencia, es la misma de
      origen, o la trae un tipo que no la lleva—, y el id repetido y el movimiento ya anulado salen
      con el `40900` genérico. Quedan libres `42227` a `42229`
- [ ] **El adjunto pesa 5 MB como máximo y es JPEG, PNG, WebP o PDF.** Ningún documento lo decía, y
      sin un límite escrito el front de la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6) no sabe a cuánto comprimir. **Lo confirma quien
      dirige.** Sus dos rechazos van en `400` y no en `422` porque no hay campo de formulario al que
      señalarle el aviso
- [ ] **Devolver el adjunto no se declaró.** Ninguna pantalla del [10](docs/10-ux-y-mockups.md) ni del mockup lo pinta
      todavía, y acordarlo ahora sería decidir desde el contrato cómo se sirve Supabase Storage
- [ ] 🔒 **El libro sí pagina, y la consulta de pedidos no.** Es la decisión contraria a la del [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10),
      y por la misma razón que allí se dio: el libro es la única lista que crece sin tope —una fila
      por cada peso que entra o sale, todos los días—, así que `limite` sin `total` dejaría al front
      mostrando una lista incompleta sin saberlo. Es el par que ya usa la bitácora
- [ ] **`cuentaDestinoId` y `categoriaId` viajan sin `obligatorio`** aunque una transferencia exija la
      primera y un gasto pida la segunda: el descriptor no sabe decir «obligatorio si» ([20 §4.4](docs/20-contrato-de-api.md#44-las-reglas-que-caben-y-por-qué-no-caben-más)), y
      una regla condicional ahí sería código en el front
- [ ] **Los textos del mockup se adaptaron**, porque el formulario cubre tres tipos y no solo el
      gasto: «Escribe cuánto se gastó» pasó a «Escribe cuánto fue», y la fecha dejó de nombrar al
      gasto. La segunda frase de cada aviso quedó igual
- [ ] 🔒 **Entró una tarea nueva al plan, la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14), y el total pasa de 133 a 134.** La tabla
      `adjuntos` está en el diagrama y el catálogo del [04](docs/04-modelo-de-datos.md) sin `CREATE TABLE`, [16 §9](docs/16-base-de-datos-y-snapshots.md#9-límites-conocidos-heredados-del-doc-04) dice que queda
      pendiente de especificar, y **ninguna tarea la creaba**: la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6) y la [4.8](docs/08-plan-de-desarrollo.md#tarea-4-8) daban por hecho
      que existía
- [ ] **El [20 §8](docs/20-contrato-de-api.md#8-el-contrato-funcionando) ejemplificaba con `POST /api/v0/gastos`, una ruta que nunca existió**, y el
      descriptor del [§4.3](docs/20-contrato-de-api.md#43-cómo-se-pide-y-qué-forma-tiene) con un formulario «gasto» que tampoco. Los dos pasan a los de verdad: si
      no, el propio documento se contradecía al decir que el mensaje del error es el mismo que el del
      descriptor

**De la tarea [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10):**

- [ ] 🔒 **El mockup no tiene pantalla de clientes, y el contrato acaba de acordar tres operaciones
      de cliente.** En el prototipo que Gerencia aprobó, el campo «Cliente» del formulario de pedido
      es **texto libre**: no hay lista, ni pantalla donde darlos de alta, ni panel de anulados. Pero
      la [4.2](docs/08-plan-de-desarrollo.md#tarea-4-2) es «Gestión de clientes · API **y** Front» y cuelga de este contrato, así que no
      declarar nada la dejaba bloqueada. Se acordó el mínimo que esa tarea necesita —crear,
      consultar y anular, con los cuatro campos del [RF-18](docs/03-requisitos-y-bdd.md#rf-18)—, y **queda por decidir si se diseña la
      pantalla o si el cliente se sigue escribiendo a mano**. Si se decide lo segundo, sobran tres
      operaciones y un formulario
- [ ] **Nueve códigos y no dieciséis, porque los de campo se agrupan.** Los rechazos que las reglas
      justifican dan, uno por uno, muchos más `422` de los que caben con sentido en un módulo, y el
      [20 §2.4](docs/20-contrato-de-api.md#24-los-rangos-por-módulo) dice que cuando eso pasa «varios de ellos merecían un estado más preciso». Una
      pregunta sobre un campo es un código y el texto concreto viaja en `data.errores`; lo que lleva
      código propio es lo que choca con el **estado** del pedido, porque ahí no hay campo que
      corregir. Quedan libres `42236` a `42239` y `40933` a `40939`
- [ ] 🔒 **`pedidos` no tiene dónde guardar el motivo de la cancelación ni el destino del anticipo.**
      El contrato ya declara `POST /api/v0/pedidos/{id}/cancelacion` con los dos campos, y el dominio
      de la [4.1](docs/08-plan-de-desarrollo.md#tarea-4-1) lo había anotado: «el modelo todavía no tiene dónde guardarlo». La [4.9](docs/08-plan-de-desarrollo.md#tarea-4-9) necesita
      una migración que no está en ninguna tarea. A la tabla `adjuntos` le pasó lo mismo con el
      contrato de movimientos, y ahí ya se resolvió metiéndola al plan: es la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14)
- [ ] **El número visible del pedido lo pone la API, y ningún documento decía quién.** El mockup los
      pinta como `P-0287`, así que existen y son correlativos. Por eso `numero` no está en
      `NuevoPedido` y `pedidos_numero_key` se quedó sin código: el cliente no puede provocar ese
      choque. Con qué regla se genera la serie es de la [4.3](docs/08-plan-de-desarrollo.md#tarea-4-3)
- [ ] **El `precioUnitario` viaja en cada línea en vez de leerse del catálogo.** Es lo que hace que
      un pedido de septiembre siga valiendo lo que valía cuando el precio del producto cambie en
      noviembre, y es la razón de que `pedido_lineas.precio_unitario` sea una columna y no un `JOIN`.
      El front lo toma del catálogo al pintar; el contrato no adivina de dónde salió
- [ ] **La consulta de pedidos no pagina, y el listado de bitácora sí.** El [RF-20](docs/03-requisitos-y-bdd.md#rf-20) pide orden por
      fecha y filtros por estado y cliente, no páginas, y los filtros de fecha ya acotan lo que
      vuelve. Si el taller acumula años de pedidos habrá que paginarla, y entonces cambia el contrato
- [ ] **La entrega parcial entra como estado y no como operación.** Es prioridad C ([RF-25](docs/03-requisitos-y-bdd.md#rf-25)) y el
      [CU-07](docs/02-casos-de-uso.md#cu-07) A2 la describe como una variante de la entrega, no como otra cosa. `parcial` está en el
      ENUM y en el contrato; `en_proceso → parcial` es el único paso del dominio sin operación que lo
      dé, junto con `cotizado → en_proceso`, que es del cotizador
- [ ] **El anticipo mínimo y el adjunto de la factura se cedieron por nombre.** El anticipo mínimo
      ([RF-38](docs/03-requisitos-y-bdd.md#rf-38), [RF-39](docs/03-requisitos-y-bdd.md#rf-39), [CU-12](docs/02-casos-de-uso.md#cu-12)) el mockup lo pinta dentro del formulario de pedido, pero su fórmula es
      del costeo y su operación es del cotizador: va con la [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11). El adjunto ([RF-27](docs/03-requisitos-y-bdd.md#rf-27)) depende de
      la tabla `adjuntos`, que no existe, y su tarea es la [4.8](docs/08-plan-de-desarrollo.md#tarea-4-8)

**De la tarea [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8):**

- [ ] 🔒 **La tabla no la puede leer un adaptador, y el plan daba por hecho que sí.** Sus filas
      nombran códigos del catálogo, que viven en `interfaz`, y `ReglaDeDependenciasTest` prohíbe
      que `infraestructura` conozca esa capa ([07 §3](docs/07-arquitectura.md#3-regla-de-dependencias)). Así que los dos `traducir` no se fueron con
      ella: lo que se fue es la búsqueda de texto, que era la duplicación real. Cada adaptador
      sigue convirtiendo en excepción de dominio **lo que su puerto promete** —tres reglas de
      `usuarios` y el rechazo de política— y el manejador global traduce todo lo demás con la
      tabla. Que las dos digan lo mismo lo comprueba `TraduccionDeRestriccionesTest`, y sin esa
      prueba se separarían sin que nadie lo notara
- [ ] **Casi todas las filas comparten dos códigos, y no es pereza: es el formato.** Un rechazo de
      llave foránea ocurre en cualquier módulo, y los dos dígitos de caso están repartidos por
      módulo ([20 §2.4](docs/20-contrato-de-api.md#24-los-rangos-por-módulo)), así que un código propio afirmaría pertenecer a uno al que no pertenece.
      Los transversales son los diez base, y el caso `00` de `422` y `409` ya está tomado. Quien
      quiera un mensaje afinado para un módulo lo acuerda en el contrato de ese módulo
- [ ] **El [04 §11](docs/04-modelo-de-datos.md#11-el-contrato-de-errores) promete más de lo que la tabla entrega en dos puntos.** Dice que un `NOT NULL`
      se lee «Falta *campo*» y que el rechazo de un dominio se arma «con el campo de la petición y
      el texto del dominio»; las dos frases son mensajes propios, y la fila lleva un código, nunca
      un `String`. Hoy salen como `42200` señalando el campo cuando la base lo dice. Cumplirlo al
      pie exige códigos nuevos —o el cuerpo de la petición en el manejador— y las dos cosas son
      cambio de contrato
- [ ] **El controlador de PostgreSQL pasó a ser dependencia de compilación**, y antes solo lo era
      de ejecución. `PSQLException.getServerErrorMessage()` es lo único que entrega la restricción,
      la tabla y la columna por separado; ningún tipo de `java.sql` los expone, y la alternativa
      era volver a buscar texto
- [ ] **La tabla enumera las 93 restricciones del filtro y las 26 llaves primarias, una por una.**
      Una regla por clase habría bastado para responder, pero entonces agregar una restricción
      nueva no rompería nada y nadie decidiría su mensaje, que es justo lo que el [04 §11](docs/04-modelo-de-datos.md#11-el-contrato-de-errores) quiere
      impedir. El precio es que quien agregue una restricción tiene que agregar su fila
- [ ] **A las llaves foráneas y a los `CHECK` de tabla no se les señala campo.** El rechazo de una
      foránea trae la tabla y la restricción, no la columna, y deducirla del nombre sería adivinar;
      un `CHECK` de tabla es una regla entre columnas y no tiene una sola a la que apuntar. Salen
      como `42200` sin `data.errores`, hasta que el contrato de cada módulo diga a qué campo van

**De la tarea [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10):**

- [ ] **Guardar el formulario es una sola operación, y por dentro son dos escrituras.** El mockup
      tiene un solo botón, y el modelo tiene dos tablas; partirlo en «editar la ficha» y «registrar
      un costeo» habría mandado dos peticiones y, con ellas, dos transacciones ([20 §5.1](docs/20-contrato-de-api.md#51-la-cabecera)): media
      edición podría quedar escrita. `edicion` recibe el formulario entero y **agrega fila de costo
      solo si el costo o el precio cambiaron**, porque un costeo no se sobrescribe nunca
- [ ] **Editar dos veces el mismo día deja dos costeos con la misma vigencia, y vale el último.**
      `idx_costos_vigencia` no es único y ningún documento dice qué pasa con el empate, así que sin
      esa regla escrita «el costeo de hoy» sería ambiguo el segundo día de trabajo de cualquiera.
      La alternativa era rechazar el segundo guardado del día, que es una edición normal
- [ ] 🔒 **La vigencia no se elige: es el día en que se guarda.** El mockup no tiene campo de fecha,
      y ponerlo sería diseñar una pantalla que nadie diseñó. Retro-fechar un costeo —corregir el
      costo de marzo— **no tiene ruta**, y la [5.5](docs/08-plan-de-desarrollo.md#tarea-5-5) es la que dirá si hace falta
- [ ] **Desactivar un producto escribe en `anulado_*`, y no hay operación de anular.** Es la forma de
      `cargos` ([04 §4.2](docs/04-modelo-de-datos.md#42-cargos-usuarios-y-cuentas)), y `productos` no tiene columnas propias de desactivación. Anular un
      producto —el registro que no debió existir, [RN-13](docs/03-requisitos-y-bdd.md#rn-13)— existe en el dominio y en la tabla, y se queda
      **sin ruta** porque ninguna pantalla lo pinta: el panel del mockup solo desactiva y reactiva
- [ ] **La tarifa por hora la pone la API y no viaja en el formulario**, como no viaja en el mockup:
      sale del pro-labore ([05 §7.1](docs/05-reglas-financieras.md#71-costo-unitario)) y se congela en el costeo. Pero **quién produce no se pregunta**,
      y el documento dice «según quién haga el trabajo»: hoy se toma el pro-labore, que es el único
      que existirá hasta la [7.3](docs/08-plan-de-desarrollo.md#tarea-7-3). Cuando haya empleadas con salario ([8.1](docs/08-plan-de-desarrollo.md#tarea-8-1)), eso es una decisión
      de quien dirige y cambia el contrato
- [ ] **El formulario gana un campo que el mockup no tiene, `unidad`, y pierde el margen objetivo.**
      La columna existe y la semilla la usa —el bordado se cuenta «por servicio»—, así que sin campo
      no habría forma de escribirla; va opcional y con «unidad» por omisión. El margen objetivo, en
      cambio, **no se guarda**: es una pregunta, y va en `POST /api/v0/consultas/costeo`
- [ ] **La vista previa del formulario cuesta una petición por cambio.** Es el precio de que el
      front no calcule plata ([ADR-018](docs/adr/ADR-018-front-sin-decisiones.md)): el costo, los tres márgenes, la lectura y el precio sugerido
      los da la API. Cada una lleva su clave de idempotencia y su firma, así que el carril Front
      tendrá que espaciar las llamadas mientras se escribe
- [ ] **El costo unitario viaja en el costeo y no en los márgenes**, al revés que en el dominio. Un
      producto sin precio no tiene márgenes y **sí tiene costo**, y su lectura lo dice con el monto;
      repetirlo en los dos sitios habría sido mandar dos veces la misma cifra
- [ ] **Dos códigos, no diez.** Las reglas del formulario son `obligatorio` y `minimo` y responden
      `42200`; los choques de estado son el `40900` genérico, como en los cargos. Solo quedan fuera
      el tiempo con más de dos decimales (`42240`) y la falta de pro-labore (`40940`). Quedan libres
      `40941` a `40949` y `42241` a `42249`
- [ ] **El historial de costos se escribe y no se lee.** El [RF-35](docs/03-requisitos-y-bdd.md#rf-35) pide conservarlo, no mostrarlo, y
      ninguna pantalla del [10](docs/10-ux-y-mockups.md) ni del mockup lo pinta: darle consulta sería acordar una pantalla que
      nadie diseñó. Si Gerencia quiere verlo, es una operación nueva y sube la MINOR
- [ ] **El `minutos_maquina` del bordado se cede por nombre.** La columna existe y la tarifa de
      máquina no está en ningún documento, así que el costeo no la declara; la [5.4](docs/08-plan-de-desarrollo.md#tarea-5-4) **no depende de
      este contrato** y, cuando esa decisión exista, el costeo gana el campo
- [ ] **El descriptor gana `numero` y el `porcentaje` del `0.10.0` desaparece.** Los minutos no son
      ninguno de los seis tipos anteriores, y sin tipo el front no puede pintar el campo. De paso, el
      `anticipoPct` del formulario «pedido» se declaraba de un tipo que nunca existió en el contrato

**De las cuatro tareas de Base ([2.21](docs/08-plan-de-desarrollo.md#tarea-2-21), [2.22](docs/08-plan-de-desarrollo.md#tarea-2-22), [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) y [4.11](docs/08-plan-de-desarrollo.md#tarea-4-11)):**

- [ ] **Los eventos con nombre los escribe la función y no el trigger de fila**, y eso se aparta de
      la hoja de ruta del carril, que se los pedía a la variante del trigger. No puede, por dos
      razones: **el motivo de una reactivación no está en la fila** —reactivar deja las tres columnas
      `desactivado_*` en `NULL`, y un trigger solo ve `OLD` y `NEW`— y **un `UPDATE` que cambia el
      nombre y el cargo a la vez tiene que dejar dos entradas**, porque el contrato y el mockup
      pintan una por campo con su «de → a». El [04 §5.4](docs/04-modelo-de-datos.md#54-auditoría-por-triggers) ya repartía así el trabajo
- [ ] **Son cinco acciones nuevas del `CHECK` y no tres.** A las de `usuarios` —`nombre_cambiado`,
      `cargo_cambiado` y `tipo_cambiado`— se suman las dos del catálogo, `cargo_renombrado` y
      `cargo_reactivado`: al cruzar los doce eventos del contrato contra `auditoria_accion_valida`
      faltaban las cinco. Sin ellas, renombrar y reactivar un cargo llegan a la bitácora como
      `UPDATE`, que es justo lo que no distingue una cosa de la otra
- [ ] **`auditoria` gana una columna `motivo`**, en vez de guardarlo dentro de `datos_despues`. El
      contrato lo declara como campo propio de una entrada y el mockup lo captura aparte de los
      valores de antes y después; en el JSON habría que adivinar dónde está según la acción
- [ ] **`cargos.nombre` pasa a `CITEXT` y no a un índice sobre `lower(nombre)`.** Así conserva el
      nombre `cargos_nombre_key`, del que ya cuelga el `42214` en la tabla de traducción de la API, y
      no entra ninguna extensión nueva: `usuarios.usuario` ya la usa
- [ ] **`destino_del_anticipo` es un `TEXT` con `CHECK` y no un ENUM nuevo.** Es el precedente de
      `aportes_retiros.clase`; los ENUM de este modelo son los que viajan por varias tablas, y de un
      ENUM no se quita un valor. Que sea obligatorio depende del pedido y no del campo, así que eso
      lo sigue comprobando la API con el `42235`
- [ ] **Cancelar y anular no comparten columnas en `pedidos`.** Un pedido cancelado y después anulado
      perdería una de las dos historias. Son cuatro columnas nuevas y un `CHECK` propio
- [ ] ⚡ **Tres de las cuatro le dejan trabajo a la API el mismo día.** La [C-01](docs/12-pruebas-y-calidad.md#c-01) cruza `pg_constraint`
      con la tabla de traducción **en las dos direcciones**, así que la fila no se puede poner antes
      de que exista la migración ni después: va en el mismo PR en que la API recoja el esquema. Son
      dos filas por la [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) y dos por la [4.11](docs/08-plan-de-desarrollo.md#tarea-4-11); la [2.22](docs/08-plan-de-desarrollo.md#tarea-2-22) no pide ninguna

**De la tarea [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9):**

- [ ] **Capital estrena el `90`–`99`, que era la reserva.** El reparto de [ADR-019](docs/adr/ADR-019-contrato-de-respuesta.md) no le dio rango, y
      el [21 §4.3](docs/21-trabajo-en-paralelo.md#43-fase-2--rebanadas-verticales-sprints-3-a-8) le había puesto el de Exportación. Se descartó el `20`–`29`, porque a su `422` le quedaban
      tres casos para cinco y Movimientos todavía puede necesitarlos, y mover Exportación, que gasta
      la misma reserva y cambia de rango un módulo ya nombrado. **Ya no queda ningún rango libre.** En
      `prisma_api`, `CatalogoDeCodigos.Modulo` llama `RESERVADO` a ese rango: lo renombra a
      `CAPITAL_Y_PATRIMONIO` la tarea que emita el primero de estos códigos
- [ ] **Diez operaciones y ninguna anulación.** Una escritura y una lectura por cosa que el
      [Sprint 7](docs/08-plan-de-desarrollo.md#sprint-7) hace. Anular un activo, un aporte o un retiro no lo pide ningún RF de capital, no lo
      pinta ninguna pantalla y no lo construye ninguna tarea; se queda sin ruta, como anular un
      producto en la [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10). Mientras tanto se anula su movimiento en el libro, con el problema que
      queda escrito en el [§9](#9-a-vigilar)
- [ ] **Una inversión puede entrar sin cuenta, y entonces no hay movimiento.** Es como entran los
      equipos que el taller ya tenía el día del corte ([09 §4.1](docs/09-plan-de-implantacion.md#41-qué-se-migra-y-qué-no)), cuya plata ya no está en ninguna
      cuenta, y `activos.movimiento_id` admite nulo para eso. **El riesgo:** olvidar la cuenta en una
      compra nueva no le resta a la caja, y el descriptor no sabe decir «obligatoria después del
      corte»; lo dice la ayuda del campo
- [ ] **Un retiro sin pro-labore escrito se parte solo, y resta lo que ya se sacó ese mes.**
      Pro-labore hasta completar el del mes, vigente en la fecha del retiro, y el resto distribución:
      da los $1.500.000 y $500.000 del [BDD-25-1](docs/03-requisitos-y-bdd.md#bdd-25-1). **Descontar lo ya retirado en el mes es una
      decisión**: ningún documento lo escribe, y sin ella dos retiros de $1.000.000 en un mes serían
      $2.000.000 de pro-labore sobre uno de $1.500.000. La persona puede escribir otra partición, y
      solo se rechaza la que pasa del retiro (`42292`)
- [ ] **El id de un retiro no tiene fila propia.** Son una o dos filas de `aportes_retiros`, pares y
      sin columna que las agrupe. El contrato promete lo de siempre —el mismo id dos veces responde
      `40900`— y la [7.4](docs/08-plan-de-desarrollo.md#tarea-7-4) decide cómo, por ejemplo poniéndole ese id a la primera parte. Si algún día
      hay que anular un retiro entero, lo primero es esa columna
- [ ] **La justificación del pro-labore es obligatoria en el formulario y opcional en la base.** La
      tarea se llama «con justificación» ([7.3](docs/08-plan-de-desarrollo.md#tarea-7-3)), y la columna admite nulo, así que la regla la
      sostiene la API. Las horas no son obligatorias, como los minutos del producto, y un pro-labore
      en cero se puede escribir: `valor_mensual` es `dinero` y no `dinero_positivo`
- [ ] **El pro-labore y los sobres rigen desde el día en que se guardan, y su historial se escribe y
      no se lee.** Es lo que la [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10) decidió para el costeo: el mockup no tiene campo de fecha, y
      el [RF-51](docs/03-requisitos-y-bdd.md#rf-51) pide conservar el historial, no mostrarlo. Si Gerencia quiere verlo, es una operación
      nueva y sube la MINOR
- [ ] **El patrimonio y la división del retiro se los niega la API a Operación, no la base.** En
      activos, pro-labore y sobres la base ya le devuelve conjuntos vacíos, y el contrato dice eso.
      Pero el patrimonio sale del libro, que los dos tipos leen: es la decisión pendiente de los
      saldos por cuenta ([3.12](docs/08-plan-de-desarrollo.md#tarea-3-12)), y hasta que se tome el `40300` lo pone un `if`. La división del
      retiro, sin la fila del pro-labore, le daría a Operación una propuesta equivocada con cara de
      cierta, y responde `40300` como la vista previa del costeo
- [ ] **La tasa de retiro no tiene umbral de advertencia.** La lectura va en `critica` cuando las
      distribuciones de 12 meses superan las utilidades ([BDD-24-1](docs/03-requisitos-y-bdd.md#bdd-24-1)) e `informativa` en lo demás. El
      mockup pinta en ámbar una tasa del 78 %, y ningún documento dice desde cuánto una tasa es
      advertencia: ese número lo pone Gerencia, no el contrato
- [ ] **Lo que se cedió, por nombre.** El aviso de caja libre del retiro ([CU-16](docs/02-casos-de-uso.md#cu-16) A1, [BDD-16-2](docs/03-requisitos-y-bdd.md#bdd-16-2)) necesita
      la caja libre de la [6.1](docs/08-plan-de-desarrollo.md#tarea-6-1), que depende del retiro: va con la [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10). El «por qué» del retiro del
      mes —el margen con y sin pro-labore— es de la 6.10 y de la [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11). La meta de la reserva va con
      el panel de sobres ([7.8](docs/08-plan-de-desarrollo.md#tarea-7-8)). Y la vida útil y los estados del activo no están en ningún documento
- [ ] **Ninguno de los cinco formularios de capital tiene pantalla, y tres tareas no tienen mitad
      Front.** El mockup pinta «Inversiones y retiros» solo para consultar, y el [10 §2](docs/10-ux-y-mockups.md#2-mapa-de-navegación) manda el
      pro-labore y los sobres a una «Configuración» sin clave de navegación. Pasa lo que con los
      clientes en la [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10): el contrato acuerda lo que las tareas necesitan y **las pantallas las diseña
      el carril Front en el mockup antes de construir**, con la aprobación de quien dirige. Además, la
      [7.4](docs/08-plan-de-desarrollo.md#tarea-7-4), la [7.5](docs/08-plan-de-desarrollo.md#tarea-7-5) y la [7.6](docs/08-plan-de-desarrollo.md#tarea-7-6) son solo API, y la pantalla del [10 §4.5](docs/10-ux-y-mockups.md#45-inversiones-y-retiros) pinta el retiro y el
      patrimonio: o ganan mitad Front, o se dice cuál de las 7.x la lleva
- [ ] **Cinco códigos, todos `422`.** Lo que cabe en el descriptor responde `42200`, y el id repetido
      es el `40900` genérico. Quedan la fecha futura y la cuenta del catálogo, con código del módulo
      como en pedidos y movimientos; el pro-labore que no cabe en el retiro; `suma_cien`, que deja
      de salir sin campo y va sobre `pctRetiro`; y las horas con más de dos decimales. Quedan libres
      `42295` a `42299` y todos los demás estados del rango

**De la tarea [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11):**

- [ ] **Un archivo baja dentro del sobre, en base64, y no como bytes crudos.** Es la primera vez que
      el contrato entrega un archivo, y vale también para la descarga de la [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10). Devolver el PDF
      directamente obligaría a la misma ruta a tener **dos formas de respuesta** —el archivo cuando
      sale bien y el sobre cuando sale un `40300` o un `40400`—, y el front tendría que mirar el
      `Content-Type` antes de saber cómo leer lo que le llegó. Se paga un 33 % de tamaño y **el tope
      queda escrito: 5 MB**, el mismo del adjunto de subida. Si la exportación completa del
      [13](docs/13-respaldo-y-exportacion.md) llega a pesar más, esta decisión no le sirve y necesita la suya
- [ ] **El recargo de hora extra viaja en la liquidación porque no tiene dónde vivir.** El
      [06 §6.1](docs/06-nomina-y-capacidad-de-pago.md#61-fórmulas) lo llama «configurable por empleada» y `empleados` **no tiene columna** para él;
      `nomina_detalle` guarda el resultado, `valor_horas_extra`, no la tarifa. Se decidió lo mínimo:
      el formulario `liquidacion` lo pide con 25 % puesto, que es la cifra del ejemplo del documento.
      Si quien dirige lo quiere en la ficha, son una columna y una tarea de Base
- [ ] **El importador no guarda historial, y por eso no necesita tabla.** La matriz del
      [03](docs/03-requisitos-y-bdd.md) nombra una tabla `importaciones` que **ningún documento define** —lo mismo que pasaba con
      `adjuntos`—. En vez de inventarla, la importación se parte en dos llamadas sin estado entre
      ellas: la consulta lee y no escribe, y `PUT /api/v0/importaciones/{id}` vuelve a recibir el
      archivo y escribe. El mismo id confirmado dos veces responde `40900` por la idempotencia que ya
      existe ([ADR-020](docs/adr/ADR-020-idempotencia.md)), y los duplicados del [BDD-21-3](docs/03-requisitos-y-bdd.md#bdd-21-3) se detectan contra `movimientos`. Si se
      quiere un historial de importaciones, es una tarea nueva
- [ ] **El simulador sin pro-labore responde `40950`, y a Operación le responde lo mismo.** El
      [BDD-18-2](docs/03-requisitos-y-bdd.md#bdd-18-2) pide bloquearlo sin pro-labore y el [BDD-02-3](docs/03-requisitos-y-bdd.md#bdd-02-3) pide que a Operación la rechace la base.
      `prolabore_config` lleva RLS y le devuelve cero filas, así que **desde la API los dos casos son
      indistinguibles**: contestar `40300` a uno y `40950` al otro sería que la API vuelva a decidir un
      permiso, que es lo que el [ADR-006](docs/adr/ADR-006-rls-por-rol.md) le prohíbe. Es la misma lectura que hizo la [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9) con los
      conjuntos vacíos de `activos` y `sobres_config`
- [ ] **Tres reglas que el contrato promete y `empleados` y `adelantos` no imponen.** La fecha de
      retiro anterior a la de ingreso responde `42250` y **no hay `CHECK` que lo rechace**; y las dos
      tablas tienen las tres columnas de anulación **sin el `CHECK anulacion_con_motivo`** que
      `movimientos` sí lleva ([04 §4.3](docs/04-modelo-de-datos.md#43-movimientos--el-libro-único)), así que hoy se puede anular sin motivo y sin autor. Son del
      mismo tipo que las cuatro que recuperó el carril Base ([2.21](docs/08-plan-de-desarrollo.md#tarea-2-21), [2.22](docs/08-plan-de-desarrollo.md#tarea-2-22), [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) y [4.11](docs/08-plan-de-desarrollo.md#tarea-4-11)) y no están en
      ninguna tarea
- [ ] **Cuatro operaciones de empleada, y ningún RF pide tres de ellas.** El [RF-54](docs/03-requisitos-y-bdd.md#rf-54) solo pide
      registrarlas. La edición, el retiro y la anulación entran porque **las columnas ya existen**
      —`fecha_retiro` y las tres de anulación— y sin operación se quedarían muertas; lo mismo el
      cierre del período de nómina, que es lo único que escribiría `cerrado_en`. Anular un activo o un
      aporte se quedó sin ruta en la [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9) por el criterio contrario, y conviene que quien dirige elija
      uno de los dos para todo el contrato
- [ ] **Una cotización no se edita: se anula y se emite otra.** Es un papel que ya se le pasó al
      cliente, y cambiarle el precio por debajo dejaría el PDF que él tiene diciendo otra cosa. El
      catálogo de productos sí se edita, porque nadie se lo llevó impreso
- [ ] **El importador tiene pantalla, y es Configuración**, que es lo que la matriz del [03](docs/03-requisitos-y-bdd.md) le pone a
      [RF-64](docs/03-requisitos-y-bdd.md#rf-64)–[RF-70](docs/03-requisitos-y-bdd.md#rf-70) y el [10 §2.1](docs/10-ux-y-mockups.md#21-navegación-por-rol) le da a Gerencia. **El mockup no la dibuja** y la lista de secciones del
      contrato tampoco la tiene —son ocho y Configuración no está—, que es la discrepancia ya anotada
      más arriba. El Front la diseña antes de construir la [8.10](docs/08-plan-de-desarrollo.md#tarea-8-10)
- [ ] **Devolver un adjunto ya tiene forma y sigue sin operación.** El `openapi.json` decía «devolver
      el archivo todavía no está acordado»; ahora dice que la forma es `Documento` y que la operación
      es de la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6). No se metió aquí porque es del rango de movimientos y del carril de otra tarea
- [ ] ⚡ **Entró una tarea nueva al plan, la [8.12](docs/08-plan-de-desarrollo.md#tarea-8-12), y el total pasa de 140 a 141.** `cotizaciones` y
      `cotizacion_lineas` están en el catálogo y el diagrama del [04](docs/04-modelo-de-datos.md) sin `CREATE TABLE`, el
      [16 §9](docs/16-base-de-datos-y-snapshots.md#9-límites-conocidos-heredados-del-doc-04) decía que quedaban pendientes de especificar y **ninguna tarea las creaba**: la [8.8](docs/08-plan-de-desarrollo.md#tarea-8-8) las
      daba por hechas. Es lo mismo que le pasó a `adjuntos` con el contrato de movimientos, y se
      resolvió igual. La [8.8](docs/08-plan-de-desarrollo.md#tarea-8-8) pasa a depender de ella
- [ ] 🔒 **La [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11) no cabía en el medio día que el [08](docs/08-plan-de-desarrollo.md) le calcula, y no se recortó.** Son cuatro
      módulos y 25 operaciones, contra las 9 de pedidos y las 6 de productos, y como la [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9) sale de los
      documentos en vez de transcribir un dominio ya construido. La cifra del plan no se corrige
      —es la estimación con que se planificó—; queda dicha en `plan/47-el-contrato-de-nomina-y-cotizaciones.md`
- [ ] **El [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) dice cubrir hasta el [RF-69](docs/03-requisitos-y-bdd.md#rf-69) y este contrato llega al [RF-65](docs/03-requisitos-y-bdd.md#rf-65).** Los cuatro que
      faltan no son suyos: la exportación ([RF-66](docs/03-requisitos-y-bdd.md#rf-66)) es de la [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10), la bitácora ([RF-67](docs/03-requisitos-y-bdd.md#rf-67)) ya está en el
      contrato desde el `0.4.0`, «ver anulados» ([RF-68](docs/03-requisitos-y-bdd.md#rf-68)) viaja como `incluirAnulados` en cada consulta,
      y la PWA ([RF-69](docs/03-requisitos-y-bdd.md#rf-69)) no es contrato: es la [9.1](docs/08-plan-de-desarrollo.md#tarea-9-1), que ya está hecha

**De la tarea [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10):**

- [ ] **El Inicio es una sola consulta y no seis.** `POST /api/v0/consultas/tablero` devuelve las
      siete zonas del [10 §4.1](docs/10-ux-y-mockups.md#41-dashboard) juntas. Ninguna se explica sola —la línea que concilia las tres cifras
      necesita los anticipos, y el panel de sobres necesita lo que entró en el mes—, así que
      repartirlas dejaría al front esperándolas todas y juntándolas, que es decidir
      ([ADR-018](docs/adr/ADR-018-front-sin-decisiones.md)). Es el mismo criterio de `consultas/patrimonio`. **Las alertas viajan dentro**, sin
      ruta propia, porque no se pintan en ninguna otra pantalla; sacarlas es una MINOR
- [ ] **El promedio de ganancias y el punto de equilibrio faltan en vez de valer cero.** El primero
      divide entre meses cerrados —la precondición de [CU-14](docs/02-casos-de-uso.md#cu-14)— y el segundo entre el margen de
      contribución. Sin meses cerrados o con margen no positivo viajan **ausentes**, con una
      `Lectura` que lo explica, que es lo que ya hace `tasaDeRetiro`. Un `$0` en pantalla parece una
      cifra y no lo es
- [ ] **Cerrar un mes no manda cifras, solo el período.** Las once columnas de `cierres_mensuales`
      las calcula la API en la misma transacción. Si el front mandara lo que tiene en pantalla,
      estaría decidiendo el contenido de un registro que nadie puede corregir después ([RN-16](docs/03-requisitos-y-bdd.md#rn-16)), y un
      reporte impreso dejaría de poder creerse. Cerrar el mes en curso responde `40961`: el corte es
      en Bogotá ([RNF-08](docs/03-requisitos-y-bdd.md#rnf-08))
- [ ] **El aviso de caja libre del retiro lo impone la API, no la pantalla.** `DivisionDeRetiro` gana
      la caja libre y su lectura para que la pantalla avise con la cifra delante, y
      `PUT /api/v0/retiros/{id}` rechaza con `40990` el retiro que se pasa y no trae `confirmado`
      ([CU-16](docs/02-casos-de-uso.md#cu-16) A1, [BDD-16-2](docs/03-requisitos-y-bdd.md#bdd-16-2)). El código va en el rango de capital y no en el de reportes, porque **el
      rango dice de qué módulo es la operación que lo emite**, y quien lo emite es el retiro
- [ ] **El saldo por cuenta entró aquí aunque sea del rango de movimientos.** El `0.11.0` dice que
      las cuentas no traen saldo porque «los saldos tienen su propia consulta (tarea [3.12](docs/08-plan-de-desarrollo.md#tarea-3-12))», y esa
      consulta no existía. La 3.12 no depende de ninguna tarea de contrato, así que quien la tomara
      hoy tendría que inventarse la ruta, y [21 §6.3](docs/21-trabajo-en-paralelo.md#63-el-contrato) dice que lo que no está acordado no se implementa.
      **Esta era la última tarea que podía escribirla.** Conviene revisar si eso merecía tarea propia,
      como la tuvieron `adjuntos` ([3.14](docs/08-plan-de-desarrollo.md#tarea-3-14)) y las tablas del cotizador ([8.12](docs/08-plan-de-desarrollo.md#tarea-8-12))
- [ ] 🔒 **El respaldo del [RF-66](docs/03-requisitos-y-bdd.md#rf-66) no es de esta tarea, y no tiene ninguna.** Este mismo
      [§10](#10-decisiones-de-construcción-que-conviene-revisar) lo dio por hecho en la
      [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11), pero [CU-22](docs/02-casos-de-uso.md#cu-22) es «exportar la base completa o de un mes, con manifiesto»: es respaldo,
      del rango `70`–`79`, y no reportes. **No figura en el plan y ningún documento dice qué formato
      tiene**, así que no se inventó. La descarga que sí entró es la del [RF-96](docs/03-requisitos-y-bdd.md#rf-96): lo que el Inicio ya
      muestra, en CSV o PDF
- [ ] **El tablero, el reporte, la descarga y los saldos los niega hoy la API con `40300`.** Son de
      Gerencia ([01 §4](docs/01-vision-y-alcance.md#4-matriz-de-tipos-de-usuario-y-permisos)), pero las cifras salen del libro, que leen los dos tipos, así que la base no
      rechaza sola: es la **misma decisión pendiente** del patrimonio y de los saldos por cuenta, y
      mientras no se tome lo pone un `if`. Los cierres sí los niega la base, con `cierres_solo_gerencia`
- [ ] **Ninguna de las seis operaciones tiene formulario, y el Inicio de Operación no está acordado.**
      Las cinco consultas no piden nada que valide un descriptor, y el cierre solo lleva año y mes:
      no hacía falta ninguno. Y el [10 §2.1](docs/10-ux-y-mockups.md#21-navegación-por-rol) le da a Operación una entrada «Inicio» que no es el dashboard
      —no ve utilidad, ni caja, ni caja libre— y que ningún documento describe. La decide la
      navegación ([2.14](docs/08-plan-de-desarrollo.md#tarea-2-14)), no este contrato
- [ ] **El `Documento` gana `text/csv` y eso toca un esquema del `0.16.0`.** Es una ampliación: las
      rutas que ya existían —el desprendible, la cotización y la remisión— siguen devolviendo solo
      `application/pdf`, así que ningún cliente recibe un valor que no esperaba. Si alguna vez la
      descarga necesitara XLSX, es otra ampliación igual

**De la versión en cada PR ([ADR-034](docs/adr/ADR-034-la-version-sube-en-cada-pr.md)):**

- [ ] **Sin sesión, `esquema` responde `desconocido`.** La consulta de versión es anónima —el front la
      hace antes de que nadie entre—, y leer la base sin identidad habría sido la primera excepción al
      [ADR-012](docs/adr/ADR-012-identidad-a-postgres.md), además de atar la comprobación del MAJOR a que la base conteste. Con sesión se lee
      dentro de la transacción que ya abrió el filtro de idempotencia, que es el caso del panel.
      **El contrato no lo dice**: la descripción del campo sigue siendo «Versión del esquema de base
      de datos», y cambiarla es cambiar el contrato. Queda para el próximo que se acuerde, igual que
      volver el campo opcional, que era la otra salida limpia y no había versión del contrato que
      la API pudiera fijar con solo ese cambio
- [ ] **La versión que muestra el panel es la última de `schema_version` por `aplicada_en`, y por
      SemVer si empatan**, que es la misma consulta del bloque `1.12` de `verificar-base.sql`. La
      prueba de integración calcula lo esperado solo por SemVer, para que las dos no puedan
      torcerse juntas
- [ ] **`prisma.esquema` deja de ser la variable `PRISMA_ESQUEMA` y pasa a `0.3.0` fijo.** Es lo que
      el artefacto necesita, y eso viaja con el artefacto, no con el ambiente. Nada la lee todavía:
      la leerán la sonda del [ADR-025](docs/adr/ADR-025-cuatro-repositorios.md) y la tubería del [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md). Si en Railway hay una `PRISMA_ESQUEMA`, ya no
      hace nada
- [ ] **Un paso por PR, y ni uno más.** La puerta no distingue una corrección de una función nueva
      —eso lo decide quien escribe—, pero sí rechaza saltarse números. [19 §4.2](docs/19-ambientes-y-entrega.md#42-las-reglas) define PATCH, MINOR y
      MAJOR para la API; para el front y el esquema se usaron las mismas palabras: corrige, agrega o
      rompe
- [ ] **Lo que no se publica, por repositorio.** En el front: `test/`, `tool/`, `.github/`, el README,
      la licencia, `.gitignore`, `.gitattributes`, `.metadata`, `analysis_options.yaml` y
      `railway.json`. En la API: `src/test/`, `contrato/`, `.github/`, el README, la licencia, los dos
      de git, `.env.ejemplo` y `railway.json`. **`railway.json` no pide versión** —cambia cómo se
      despliega, no lo que se despliega— y **`.dockerignore` sí**, porque cambia lo que entra a la
      imagen. Lo que no esté en la lista pide versión, carpetas nuevas incluidas
- [ ] **El número de compilación del front sube de uno en uno con la versión, y solo con ella.** Ningún
      documento decía cómo se mueve; es el `versionCode` de Android y tiene que crecer, y atarlo a la
      versión lo vuelve el conteo de versiones publicadas
- [ ] **La puerta corre también en el empuje a `develop`, y no en `main`.** En el empuje es la segunda
      cerradura: lo que entre sin subir la versión deja la integración continua en rojo y Railway no
      despliega. A `main` llega `develop` entero, con varios pasos juntos
- [ ] **La versión del esquema se publica en la última migración del PR**, y el bloque `1.12` de
      `verificar-base.sql` cambia en ese mismo PR. La etiqueta `esquema-vX.Y.Z` del [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) se sigue
      poniendo a mano después de fusionar: automatizarla es que la integración continua escriba en
      el repositorio, y eso no se decidió
- [ ] **La puesta al día fue un MINOR en los dos proyectos**: el front de `0.2.0+2` a `0.3.0+3` y la
      API de `0.2.0` a `0.3.0`. No se reconstruyeron las versiones que habría habido si cada PR hubiera
      subido la suya, por la misma razón por la que [22 §3](docs/22-documentacion.md#3-versiones) no reconstruyó las de los documentos.
      Que los dos queden en `0.3.0` es coincidencia, no sincronización
- [ ] **Las cadenas del guion de `prisma_db` van sin tildes.** Windows PowerShell 5.1 lee un `.ps1`
      sin BOM como ANSI, y una raya dentro de una cadena se vuelve una comilla tipográfica que cierra
      la cadena. Los demás guiones no llevan BOM, y ponérselo a uno solo sería una excepción más

**De poner el tablero al día (`plan/24-el-tablero-alcanza-a-lo-hecho.md`):**

- [ ] **El plan 23 se escribió después de su trabajo, y es el único del proyecto.**
      `plan/23-el-alta-decia-algo-salio-mal.md` se cita en el [§1.3](#13--en-progreso), en este mismo [§10](#10-decisiones-de-construcción-que-conviene-revisar) y en
      [`contrato/README.md`](contrato/README.md), y no estaba en disco. Se reconstruyó el 2026-09-19 del commit
      `c004260` de `prisma_api` y del `209db9b` de esta especificación, que bastaban para escribirlo
      fiel, y lo declara en su propia cabecera. **Contradice al [22 §10](docs/22-documentacion.md#planes)** —«lo que no vale es
      implementar primero y escribir el plan después»—. La alternativa era borrar las tres
      referencias y dejar el único cambio del proyecto sin plan, con un hueco de numeración que
      `verificar` rechaza en cuanto se escriba el siguiente
- [ ] 🔒 **La [0.8](docs/08-plan-de-desarrollo.md#tarea-0-8) y la [0.9](docs/08-plan-de-desarrollo.md#tarea-0-9) se marcaron sin PR de tarea propio.** Las dos llevaban 🚧 desde
      el 2026-09-17 y su trabajo ya estaba fusionado; lo que faltaba era mirar si había surtido
      efecto, y lo había. Se marcan en este PR de tablero y no en el de su tarea, como pide el
      [21 §6.5](docs/21-trabajo-en-paralelo.md#65-ramas-e-integración), porque esos PR entraron hace dos días

**De la 3.16 (`plan/40-la-3-16-entra-al-plan.md`):**

- [ ] 🔒 **Entró una tarea nueva al plan, la [3.16](docs/08-plan-de-desarrollo.md#tarea-3-16), y el total pasa de 139 a 140.** El
      [H4](docs/08-plan-de-desarrollo.md#h4) se cronometra en un celular y el front no tiene diseño para uno: la barra
      lateral mide 224 px en cualquier pantalla. El mockup sí lo diseñó —por debajo de 760 px la barra
      pasa arriba y el menú se desplaza de lado—, así que era trabajo real que no estaba en ninguna
      parte, como le pasó a la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14) y a las cuatro tareas de Base
- [ ] 🔒 **Una tarea propia y no parte de la [3.5](docs/08-plan-de-desarrollo.md#tarea-3-5).** El registro rápido es de Movimientos; el
      diseño para celular toca el andamio de **todas** las pantallas —la barra, el topbar, las dos
      franjas y el botón flotante—, y meterlo dentro habría hecho dos cosas en un commit, que es lo
      que el [ADR-028](docs/adr/ADR-028-un-commit-por-tarea.md) prohíbe
- [ ] ⚡ **La [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6) pasa a depender de ella y la [3.5](docs/08-plan-de-desarrollo.md#tarea-3-5) no.** El cronómetro del
      [M-01](docs/12-pruebas-y-calidad.md#m-01) se corre con la 3.6 —el gasto con foto— en un celular de verdad, así que sin la
      3.16 el [H4](docs/08-plan-de-desarrollo.md#h4) no se puede medir. El registro rápido, en cambio, se construye y se prueba en
      escritorio, y hacerlo esperar lo habría frenado sin que el [H4](docs/08-plan-de-desarrollo.md#h4) ganara nada
- [ ] **En el [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) y no en el [9](docs/08-plan-de-desarrollo.md#sprint-9)**, donde están la PWA y el endurecimiento. El [H4](docs/08-plan-de-desarrollo.md#h4) es
      del [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3), y esperar al 9 para ver la aplicación en un celular sería medirlo meses después

**De la 3.5 (`plan/44-el-registro-rapido-de-movimientos.md`):**

- [ ] **La clave de una sección solo puede escribirse en un archivo, y es una excepción nombrada en
      la prueba de la frontera.** El contrato pide las dos cosas a la vez —el menú lo dicta la API
      ([RF-103](docs/03-requisitos-y-bdd.md#rf-103)) y «una clave que el front no conoce no se pinta»—, así que el front tiene que
      conocer las claves de las pantallas que sabe pintar. Con `registro_de_secciones.dart` exento
      por nombre, qué secciones existen y cómo se llaman lo sigue decidiendo el servidor, y la
      prueba sigue cazando a quien escriba una clave en cualquier otro sitio. Es el patrón con el
      que ya conviven `http` y `crypto`. **La primera sección la necesitaba: sacarla a una tarea
      aparte habría dejado la 3.5 esperando por algo que ella misma estrena**
- [ ] **El botón flotante pregunta por la posición, no por la clave.** El [10 §4.3](docs/10-ux-y-mockups.md#43-movimientos) dice que flota
      sobre todas las pantallas menos el Inicio, porque el Inicio no escribe; cuál es el Inicio ya lo
      decide la API desde la [2.14](docs/08-plan-de-desarrollo.md#tarea-2-14) —es la primera sección que manda, y la que se abre al entrar—.
      Preguntar «es la primera» en vez de «se llama dashboard» cumple el 10 sin que el andamio sepa
      cómo se llama ninguna sección
- [ ] **Se encola siempre, también con señal.** `encolar` guarda la intención y **después** intenta
      enviarla, así que el camino es el mismo con red y sin ella y no hay dos rutas de escritura que
      mantener. Un `null` no es un fallo: es «se guardó y se sigue intentando»
- [ ] **El botón dice «Guardar movimiento» y el mockup decía «Guardar gasto»**, por lo mismo que la
      [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13) adaptó los textos: el formulario cubre los tres tipos. **Y el aviso de «Pendiente de
      sincronizar» no tiene diseño en el mockup**: se pintó como píldora dentro del panel, que es el
      componente que el [17](docs/17-resiliencia-offline-y-cache.md) pide y el sistema de diseño ya tiene
- [ ] ⚡ **La pantalla todavía no se ha visto contra la API de verdad**, porque el formulario
      «movimiento» lo emite la [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4) y no está fusionada. Se probó contra un descriptor de fixture
      copiado del contrato y, en el navegador, el camino de «el servidor respondió y no mandó
      formulario». **Queda por hacer en cuanto la 3.4 llegue a `develop`**, y antes del cronómetro
      del [M-01](docs/12-pruebas-y-calidad.md#m-01)

**De la 3.16 (`plan/45-el-andamio-en-el-celular.md`):**

- [ ] **El corte es 760, y 760 ya es celular.** Es el `@media (max-width:760px)` del mockup, y
      `max-width` incluye su valor. Se pregunta en un solo sitio, `disposicion.dart`, para que el
      andamio y las pantallas no puedan partir en anchos distintos. **Un celular acostado mide más
      de 760 y recibe el andamio de escritorio**, igual que en el mockup
- [ ] **La insignia va al pie de la pantalla, no al final de lo que se desplaza.** El mockup la deja
      caer al final del contenido porque ahí se desplaza la página entera; en el front cada pantalla
      se desplaza por dentro, y el [10 §5.7](docs/10-ux-y-mockups.md#57-la-versión-y-el-ambiente-a-la-vista) pide conservar la esquina, no el mecanismo. En el pie **el
      teclado la tapa en vez de empujarla**, y el botón flotante se acomoda solo encima de ella
- [ ] **Las pestañas se tocan en 44 px de alto aunque se vean de 31**, como las del mockup: el
      [10 §3.3](docs/10-ux-y-mockups.md#33-accesibilidad) pide 44 × 44 como mínimo y manda sobre el mockup. Y **el menú de lado también se
      arrastra con el ratón**, porque sin barra de desplazamiento una ventana angosta en un computador
      no tenía otra forma de llegar a la última sección
- [ ] **Las franjas siguen arriba de todo en el celular.** En el mockup van dentro del `.topbar`; en
      el front van encima del andamio desde que existen, y moverlas solo en el celular haría que el
      mismo aviso viviera en dos sitios según el ancho
- [ ] **`TopbarSesion` no cambió:** entre 600 y 760 px el front muestra el cargo que el mockup
      esconde. Por debajo de 600 los dos lo esconden, y el front además pone iniciales, como pide el
      [10 §5.3](docs/10-ux-y-mockups.md#53-la-sesión-en-el-topbar)
- [ ] **La tarjeta de las secciones sin pantalla se desplaza y ya no dice «el menú de la
      izquierda»**: a 320 px con las dos franjas puestas no cabía, y en el celular el menú ya no está
      a la izquierda
- [ ] ⚡ **El andamio no se ha visto en un celular de verdad.** Se probó a 375, 320 y 1280 px en las
      pruebas, y en el navegador con la vista de celular a 375 contra una API simulada. **Queda por
      hacer en un teléfono**, antes del cronómetro del [M-01](docs/12-pruebas-y-calidad.md#m-01)

**De la 3.14 (`plan/46-la-tabla-de-adjuntos.md`):**

- [ ] ⚡ **Ningún documento decía con qué credencial habla la API con Storage.** El [07 §1](docs/07-arquitectura.md) dice que
      el archivo pasa por la API y nunca va directo al almacenamiento, y ahí se acaba. Se decidió
      que el bucket lo alcanza **`authenticated`**, con el token de la sesión que la API ya
      comprobó, y no `service_role`: el [ADR-033](docs/adr/ADR-033-service-role-solo-en-auth.md) acotó esa clave a dos operaciones de GoTrue y
      Storage no puede ser la tercera. Así el permiso sigue viviendo en PostgreSQL ([ADR-006](docs/adr/ADR-006-rls-por-rol.md)). **Lo
      confirma o lo cambia la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6)**, que es la que sube el primer archivo
- [ ] **El techo de 5 MB y los cuatro tipos están escritos dos veces**, en el bucket y en el `CHECK`
      de la tabla. No es descuido: el bucket impide que los bytes lleguen a guardarse y el `CHECK`
      impide que se guarde una ficha que miente sobre lo que se guardó. La API los vuelve a
      preguntar para poder contestar `40020` y `40021` con su mensaje, pero **no es la única que
      pregunta** ([ADR-015](docs/adr/ADR-015-validacion-tres-capas.md))
- [ ] ⚡ **La tabla de traducción se queda sin las nueve filas de `adjuntos` hasta la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6).** El
      [04 §11](docs/04-modelo-de-datos.md#11-el-contrato-de-errores) fija el orden —una fila sin restricción rompe igual que una restricción sin fila—, y
      la 3.14 es del carril Base: la tabla vive en `prisma_api`. **Mientras tanto, [C-01](docs/12-pruebas-y-calidad.md#c-01) sale roja
      contra cualquier base que ya tenga la `0.4.0`**, así que promover el esquema antes de la
      [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6) pone en rojo una prueba que hoy nadie corre en cada empuje
- [ ] **`adjuntos` va al final del [§4](docs/04-modelo-de-datos.md#4-esquema-sql) y no junto a `movimientos`, que es su sitio.** Los números
      de esas secciones se citan por todo el proyecto —`§4.9` son las claves de idempotencia en once
      sitios—, y correr las ocho siguientes un puesto dejaría cada cita apuntando en silencio a otra
      sección. Es lo mismo que se hizo con `sesiones` en la [2.20](docs/08-plan-de-desarrollo.md#tarea-2-20)
- [ ] **La semilla no siembra ningún adjunto.** `adjuntos` no lleva RLS, así que ninguna de las
      pruebas de permisos la lee, y una fila sembrada apuntaría a un objeto que no está en el
      bucket: una ficha que miente
- [ ] ⚡ **El bucket no se ha visto rechazar un archivo.** La pila local levanta `db`, `rest`, `auth`
      y `kong`, **no el contenedor de Storage**, así que el techo y los cuatro tipos se comprobaron
      leyendo `storage.buckets` y `pg_policy`. Que el servicio rechace de verdad un PDF de 6 MB
      queda para la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6)
- [ ] **El esquema pasó a `0.4.0` y no a `0.3.1`**, como la `0.2.0` y la `0.3.0`: una tabla nueva es
      MINOR mientras todo siga en `0.y.z`. Qué cuenta como cada cosa en el esquema **sigue sin estar
      escrito en ningún documento**

**De la tarea [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10):**

- [ ] **El orden en que se pintan las categorías no lo dice ningún documento.** El contrato pide «el
      árbol […] en el orden en que se pintan» y `categorias` no tiene columna `orden`, así que hubo
      que elegirlo: primero los ingresos y después los gastos, luego por familia —el nombre de la
      madre, o el propio si es principal— y dentro de cada una la madre antes que sus hijas,
      alfabéticas. Así el front pinta la lista como llega y no reordena nada. **Los ingresos
      primero se escribe con un `CASE`**: alfabéticamente «gasto» va antes que «ingreso», así que
      `ORDER BY naturaleza` daría lo contrario de lo que el contrato enuncia
- [ ] **Una cuenta nueva se pinta al final**, con `orden` = el mayor que haya más uno. El contrato
      no le da campo `orden` al formulario «cuenta» y ningún documento dice qué lugar le toca a una
      cuenta recién abierta. Reordenarlas es otra pantalla que nadie ha pedido
- [ ] **El panel de categorías no tiene mockup.** El [10 §4.3](docs/10-ux-y-mockups.md) diseñó el de «Cuentas de dinero» y no
      dijo nada del de categorías, que esta tarea también pide. Se hizo **el mismo panel con el otro
      formulario**: inventarle una pantalla propia habría sido decidir diseño, y dejarlo fuera
      habría dejado a Gerencia sin manera de crear una categoría, con lo que la lista del registro
      rápido no podría crecer
- [ ] **`prisma.contrato.version` se queda en `0.14.0` aunque el acordado vaya en `0.16.0`.** La API
      ya emite el campo que estrena el `0.16.0`, pero **no implementa el `0.15.0`** —nómina y
      cotizaciones—, así que subirla sería afirmar algo falso. Qué número declara un artefacto que
      implementa partes sueltas de dos versiones no está escrito en ningún documento
- [ ] **Un nombre de cuenta o de categoría no tiene largo máximo.** Se probó a ponerle uno y se
      quitó: el contrato no lo declara y la columna es `TEXT`, así que el `@Size` habría sido una
      regla inventada en el código. Si hace falta, se acuerda en el contrato primero

**Del arreglo de los mensajes de `adjuntos` (`plan/49-adjuntos-sin-mensaje.md`):**

- [ ] **El tamaño y el tipo de un adjunto salen por ahora como `42200`, no con su código.** El
      contrato tiene `40020` para el archivo que pasa de 5 MB y `40021` para el que no es foto ni
      PDF, y los dos están marcados como pendientes de emitir por la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6), que es la que sube el
      archivo. Se decidió **no adelantarlos**: emitirlos sin que ninguna ruta suba nada sería
      afirmar algo que no pasa, y cambiaría la copia fijada del contrato. Lo que sí cambia es que
      dejan de salir como `50000`. Es el mismo camino que siguieron los de `movimientos` entre la
      [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) y la [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4)
- [ ] **Las filas de una tabla nueva no tienen dueño mientras su tarea de API esté lejos.** El plan
      de la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14) dijo que las agregaría «`prisma_api` en el mismo PR en que recoja este esquema»,
      y ese PR es el de la [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6), que está tres tareas más allá. Entre una cosa y otra, [C-01](docs/12-pruebas-y-calidad.md#c-01) queda
      en rojo. **Conviene decidir si una tarea de Base que agrega tabla debe pedir sus filas en el
      mismo sprint**, como ya hacen la [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) y la [4.11](docs/08-plan-de-desarrollo.md#tarea-4-11) con las suyas

**De partir la 0.4 (`plan/50-la-0-4-se-cierra-en-dev-y-qa.md`):**

- [ ] **El rol `prisma_api` sigue prometiendo cuatro ambientes y solo existe en dos.** La tarea que
      lo crea ([0.5](docs/08-plan-de-desarrollo.md#tarea-0-5)) dice «en los cuatro», lleva marcada desde el primer día y el rol vive solo en
      dev y en qa: es el mismo desajuste que se le acaba de arreglar a la 0.4. No se partió también
      porque nadie lo pidió y porque parte de ese trabajo ya cae dentro de la [9.2](docs/08-plan-de-desarrollo.md#tarea-9-2), que levanta uat.
      **Conviene decidir si se parte igual que la 0.4 o si la 9.2 y la [9.3](docs/08-plan-de-desarrollo.md#tarea-9-3) se hacen cargo del rol**
- [ ] **El `README` de `prisma_db` dice que la 0.4 «sigue abierta», y desde hoy no.** Vive en otro
      repositorio ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)), con su propio PR y su propia versión, así que no se tocó desde aquí:
      se corrige en el primer PR que toque ese repositorio

**De la tarea [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7):**

- [ ] **[P-32](docs/12-pruebas-y-calidad.md#p-32) se hizo sin la bandera de configuración que pide el [12 §3.1](docs/12-pruebas-y-calidad.md#p-32).** El documento manda
      desactivar «la comprobación de la capa de aplicación» con una bandera que solo valga en dev y en
      qa. **En esta API no hay ninguna comprobación que desactivar**: ni una clase de `aplicacion` mira
      el tipo de usuario, por diseño ([ADR-012](docs/adr/ADR-012-identidad-a-postgres.md)), y todo `SinPermiso` nace de un `42501` que traduce
      `RechazoDeLaBase`. Una bandera que no apaga nada sería configuración muerta que encima parece que
      protege algo. En su lugar la prueba corre la misma lectura **sin capa de aplicación ninguna**, que
      es más fuerte que apagar un `if`. **Si algún día una clase de aplicación filtra por tipo, la
      bandera tiene que existir**
- [ ] **De las tres lecturas de [P-32](docs/12-pruebas-y-calidad.md#p-32) solo `usuarios` se pudo comparar.** `/consultas/nomina` y
      `/consultas/patrimonio` no existen —son del [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) y del [Sprint 7](docs/08-plan-de-desarrollo.md#sprint-7)—, así que las otras dos se leen sin
      capa de aplicación y se afirma que salen vacías. **Cuando existan sus endpoints hay que volver a
      esta prueba** y cerrarles la comparación
- [ ] **Las pruebas cuya tabla todavía no tiene endpoint van por `ConIdentidad`**, con los claims de la
      sesión real, en vez de saltarse. El [12 §3](docs/12-pruebas-y-calidad.md#3-pruebas-de-permisos) las quiere «llamando a la API», y catorce de las tablas que
      enumera no tienen ruta hasta los sprints 4 a 8. Esperar habría sido descubrir en el [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) que
      una política nunca estuvo. `ConIdentidad` es la única puerta de la API a la base, así que la
      política que juzga ahí es la misma que juzgará al endpoint
- [ ] **[P-02](docs/12-pruebas-y-calidad.md#p-02) y [P-06](docs/12-pruebas-y-calidad.md#p-06) dicen «Rechazado» para una lectura, y una lectura con RLS no se rechaza: llega
      vacía.** Es la distinción que el propio [12 §3](docs/12-pruebas-y-calidad.md#3-pruebas-de-permisos) explica dos párrafos más abajo. Las dos se escribieron
      como conjunto vacío, y además se comprueba que la tabla tiene filas de verdad. **Conviene
      corregir esas dos celdas del documento**
- [ ] **El trabajo nuevo de la tubería no se pudo probar desde aquí, y le falta un secreto.**
      `Finanzas-PRISMA-DB` es privado, así que el trabajo necesita `PRISMA_DB_TOKEN` en `prisma_api`, y
      ese no lo puede poner el código. Hasta que esté, el trabajo falla, y falla claro
- [ ] **`prisma_db` llevaba dos versiones del esquema sin etiquetar**, la `0.4.0` y la `0.5.0`, que el
      punto 1 del [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) da por hechas y de las que cuelga la tubería entera. Se escribieron y se
      empujaron sobre los commits de fusión de la [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14) y la [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10), como la `esquema-v0.3.0`.
      **Conviene decidir quién etiqueta y cuándo**: el ADR dice que una migración fusionada sin
      etiquetar no existe para nadie más, pero ninguna tarea del plan lo tiene como paso, y por eso se
      saltaron dos seguidas

**De la primera corrida de la tubería de integración (tarea [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7)):**

- [ ] 🔒 **Dos pruebas de la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) se apoyaban en un número que ningún archivo decía.** Crean un usuario con
      la contraseña `x` y esperan que GoTrue la rechace por débil. En esta máquina el contenedor
      trae `GOTRUE_PASSWORD_MIN_LENGTH=6` y pasaban; en la tubería el alta **se aceptó** y salieron
      rojas, porque `config.toml` no declaraba `minimum_password_length` y cada versión del CLI
      pone la suya. Quedó escrito en `prisma_db`, con el 6 que ya había. **Una política que nadie
      escribe es una política que cambia sola**, y llevaba desde la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) sin que se notara porque
      nadie corría esas pruebas fuera de esta máquina
- [x] **Un cambio de `config.toml` no llega a la tubería hasta que se publique una versión nueva del
      esquema.** El [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) manda descargar `prisma_db` **en la etiqueta**, y la etiqueta lleva el número
      de `schema_version`; pero `config.toml` no es esquema y subir ese número por un cambio de
      configuración sería afirmar algo falso. **Decidido: lo arrastra la próxima migración**, que es
      la [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) —la que esta misma corrida acabó de probar que hace falta—. Al publicarse el
      esquema siguiente, su etiqueta ya lleva el `config.toml` escrito, y el [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) se queda
      como está. De ahí sale el orden: la [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) publica y se etiqueta, y **el PR de la API que suba
      su `prisma.esquema` a esa versión** es el que pone verdes las dos pruebas de GoTrue y el que
      lleva las dos filas de traducción que la [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) pide. Hasta entonces esas dos siguen rojas
- [x] **Una prueba con `LocalDate.now()` depende de en qué huso corre.** [P-08](docs/12-pruebas-y-calidad.md#p-08) registraba un
      movimiento con la fecha del reloj de la máquina, y el ejecutor va en UTC: entre las 7 de la
      noche y la medianoche de Bogotá le mandaba mañana, y la API la rechazaba con `42223`, que es
      lo correcto. Arreglado con `ZonaDelNegocio`, y **buscadas las demás**: en `prisma_api` no
      queda ninguna —`src/main` no lee el reloj sin huso, y las dos lecturas que hay en las
      pruebas pasan `ZonaDelNegocio.BOGOTA`—, y en `prisma_front` el calendario toma el reloj del
      aparato solo para saber hasta dónde se puede desplazar, que no es la regla de qué fecha vale.
      **Donde sigue es en la base**: `fecha_no_futura` compara contra `CURRENT_DATE`, que va en el
      huso de la sesión, y la sesión va en `UTC` —a las ocho de la noche del 19 en Bogotá, la base
      local contesta `2026-09-20`—, así que acepta el mañana que la API rechaza con `42223`. Eso
      ya es la [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15), y esta es la comprobación de que hace falta ([RNF-08](docs/03-requisitos-y-bdd.md#rnf-08)).
      **Hecha**: desde el esquema `0.6.0` la restricción compara contra el día de Bogotá

**De la 3.15 (`plan/53-el-destino-y-la-fecha-de-bogota.md`):**

- [ ] **La zona del negocio va escrita en la restricción, no en la sesión.** `fecha_no_futura`
      compara contra `(NOW() AT TIME ZONE 'America/Bogota')::date`. La alternativa era ponerle la
      zona al rol o a la base y dejar `CURRENT_DATE`, y se descarta por lo que dice el
      [RNF-08](docs/03-requisitos-y-bdd.md#rnf-08) y ya aplica el dominio con `ZonaDelNegocio`: **la zona es del modelo y no del
      ambiente**. Una configuración se cambia sin tocar ninguna migración, no viaja en la etiqueta
      del esquema y no se ve al leer la tabla. Tampoco se envolvió en un `fn_hoy_bogota()`: sería
      un objeto más que mantener y auditar para ahorrar una línea que se lee igual que la regla
- [ ] ⚡ **La tabla de traducción se queda sin las dos filas del destino hasta el PR de la API que
      suba su `prisma.esquema` a `0.6.0`.** Es el orden que fijan el [04 §11](docs/04-modelo-de-datos.md#11-el-contrato-de-errores) y esta misma
      lista, y la 3.15 es del carril Base: la tabla vive en `prisma_api`. **Mientras tanto,
      [C-01](docs/12-pruebas-y-calidad.md#c-01) sale roja contra cualquier base que ya tenga la `0.6.0`**, igual que pasó con la
      [3.14](docs/08-plan-de-desarrollo.md#tarea-3-14). Ese mismo PR es el que pone verdes las dos pruebas de GoTrue que esperaban el
      `config.toml`, porque la etiqueta `esquema-v0.6.0` es la que por fin lo lleva
- [ ] **El esquema pasó a `0.6.0` y no a `0.5.1`.** Apretar una regla es MINOR mientras todo siga
      en `0.y.z`: lo que estas restricciones rechazan es lo que el dominio de la API ya rechazaba,
      así que ninguna API que hoy corra se queda sin escribir algo que escribía. Qué cuenta como
      cada cosa en el esquema **sigue sin estar escrito en ningún documento**
- [ ] **Una comprobación del propio guion pasaba por el motivo equivocado.** La fila de la
      [1.1](docs/08-plan-de-desarrollo.md#tarea-1-1) que prueba `dinero_positivo` registraba el movimiento con `CURRENT_DATE`, así que
      desde esta migración habría salido verde por `fecha_no_futura` y no por el dominio que dice
      estar probando. Pasó al día de Bogotá, como el resto
- [ ] **`v_saldos_cuenta` no se tocó.** La vista resta la salida y suma la entrada por separado, y
      con la transferencia a la misma cuenta imposible en el origen deja de tener con qué
      equivocarse. Reescribirla sería arreglar un síntoma que ya no puede ocurrir

**De la 1.15 (`plan/54-la-prueba-de-corte.md`):**

- [ ] **El corte de verdad se hace matando la conexión, y lo mata el dueño.** El [12 §10.1](docs/12-pruebas-y-calidad.md#101-i-02--el-corte-es-lo-que-hace-real-la-idempotencia) pide
      inyectar un fallo y no dice cómo. Una excepción de Java prueba el camino amable: la atiende
      el propio proceso, y lo que revierte es un `rollback` que alguien alcanzó a pedir. Con
      `pg_terminate_backend` no hay quien lo pida, que es lo que pasa cuando el contenedor muere.
      Lo dispara el dueño desde fuera porque dentro de la transacción la API es `authenticated`
      ([ADR-012](docs/adr/ADR-012-identidad-a-postgres.md)) y ese rol no puede señalar a un proceso de `prisma_api`
- [ ] 🔒 **Ocho pruebas de la [1.14](docs/08-plan-de-desarrollo.md#tarea-1-14) y una de la [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7) escribían el movimiento con
      `current_date`**, que es el día del huso con que se conecte el pool. Contra el esquema
      `0.6.0` —que juzga con el día de Bogotá— y con la JVM en UTC, como va la tubería, **las
      nueve salen rojas de siete a doce de la noche**. Arregladas con `ZonaDelNegocio`, que es de
      donde tiene que salir la fecha ([RNF-08](docs/03-requisitos-y-bdd.md#rnf-08)), y comprobadas corriendo la JVM en UTC a
      esa hora. **Es la tercera vez que aparece la misma trampa** —[P-08](docs/12-pruebas-y-calidad.md#p-08) en la [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7), una
      fila de `verificar-base.sql` en la [3.15](docs/08-plan-de-desarrollo.md#tarea-3-15) y estas nueve—, y las tres se vieron solo
      porque alguien corrió las pruebas en otro huso

**De la 1.21 (`plan/55-anon-no-toca-nada.md`):**

- [ ] **El `EXECUTE` de las cinco funciones entra en la migración, y el bloque del [04 §9.1](docs/04-modelo-de-datos.md#91-anon-no-toca-nada) no lo
      nombra.** El documento revoca tablas y secuencias, y deja fuera `fn_es_gerencia`,
      `fn_auditar`, `fn_congelar_ficha_propia`, `fn_proteger_ultima_gerencia` y
      `fn_verificar_gerencia_restante`, las cinco `SECURITY DEFINER` y dueñas de `postgres`. Hoy no
      filtran nada —`fn_es_gerencia()` con `anon` devuelve `false`, porque `auth.uid()` viene nulo,
      y las otras cuatro devuelven `trigger`, que PostgreSQL no deja llamar directamente—, pero el
      título de la tarea es «`anon` no toca nada». Mismo criterio que la [1.2](docs/08-plan-de-desarrollo.md#tarea-1-2), que revocó el
      borrado a tres roles y no solo al que el [04 §5.1](docs/04-modelo-de-datos.md#51-revocación-real-del-borrado) alcanzaba a nombrar
- [ ] **Y ahí apareció la trampa: `prisma_api` tenía ese `EXECUTE` por `PUBLIC` y no por una
      concesión suya.** Quitárselo a `anon` obliga a revocárselo a `PUBLIC`, y eso se lo quita
      también al rol con el que se conecta la API; la migración se lo vuelve a conceder en la
      sentencia siguiente. Aplicada sin ese `GRANT` —a propósito, para verla fallar—, la prueba de
      integración «sin identidad no se ve nada: la base falla cerrado» responde
      `permission denied for function fn_es_gerencia`: lo que se rompe son las consultas que la API
      hace **sin** asumir identidad, porque las que hacen `SET LOCAL ROLE authenticated` sí tienen
      concesión propia. **Le puede volver a pasar a cualquier revocación a `PUBLIC`**, y nada lo
      avisa: `prisma_api` no figura en los `GRANT` de las funciones del esquema inicial
- [ ] **`REVOKE USAGE ON SCHEMA public FROM anon` no le quita el `USAGE`, y la migración lo escribe
      igual.** El esquema se lo concede dos veces, a `anon` y a `PUBLIC`, y la segunda sobrevive:
      después de la migración `has_schema_privilege('anon','public','USAGE')` sigue diciendo `t`. No
      importa —entrar a un esquema donde no se tiene permiso sobre ninguna tabla, ninguna secuencia
      y ninguna función no alcanza para nada— y por eso ninguna fila de `verificar-base.sql` lo
      pregunta. Cerrarlo de verdad sería revocarle el `USAGE` a `PUBLIC`, que le pega a roles que
      esta tarea no tiene por qué tocar, `authenticator` entre ellos
- [ ] **`service_role` se queda con exactamente los permisos que tenía `anon`**: `SELECT`, `INSERT`,
      `UPDATE`, `REFERENCES` y `TRIGGER` sobre las 32 relaciones de `public`. El [ADR-033](docs/adr/ADR-033-service-role-solo-en-auth.md) dice que
      contra PostgreSQL no se usa nunca, así que le sobran todos. No entró en esta migración porque
      su clave es un secreto del despliegue y no una clave pública: no es el mismo riesgo ni la
      misma tarea, y toca el camino por el que Gerencia da de alta a alguien ([2.7](docs/08-plan-de-desarrollo.md#tarea-2-7)). Queda para que
      lo decida quien dirige

---

## Cómo se mantiene este archivo

- **Una tarea hecha es un commit, y el commit explica por qué** ([ADR-028](docs/adr/ADR-028-un-commit-por-tarea.md)). El asunto lleva el
  sprint y el número —`Sprint 3 / 3.11: marca de registro tardio`— y el cuerpo son tres líneas:
  `Hace:`, `Decide:` y `Verifica:`, la última con qué se rompió a propósito para ver fallar las
  pruebas. Dos tareas no van en un mismo commit aunque toquen la misma clase. Así `git log
  --oneline` es esta misma lista, en el orden en que se hizo.
- **Y el mensaje entero cabe en 256 caracteres** ([ADR-031](docs/adr/ADR-031-commit-de-256-caracteres.md)), trailers incluidos, para que
  `git log` se lea de corrido. El porqué largo va en el plan de `plan/`, que no tiene tope y se
  escribió antes; `verificar --base` lo comprueba en cada PR.
- Una tarea se marca `[x]` cuando su commit está en `develop` con la integración continua en verde
  ([21 §6.5](docs/21-trabajo-en-paralelo.md#65-ramas-e-integración)). La marca viaja en el PR de la especificación de esa misma tarea, que se
  acepta junto con el del código. Lo escrito pero no probado lleva ✏️, no `[x]`; lo que alguien
  tiene en las manos lleva 🚧.
- Después de marcar algo, se corre `node scripts/docs/documentar.mjs enlazar`: rehace las marcas ⚡ y
  🔒, lo que puede empezar hoy y cuánto falta. **Las dependencias no se escriben aquí**: viven en el
  plan.
- **Lo nuevo no entra aquí primero.** Una tarea que no está en el plan va al plan o, si es una idea
  para después, al roadmap ([08 §6](docs/08-plan-de-desarrollo.md#6-backlog-priorizado)).
- Es un documento compartido, como todo `docs/`: lo actualizan todos los carriles. Cada cambio sube
  su versión ([`22-documentacion.md`](docs/22-documentacion.md)).
