# Tareas de PRISMA

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [1.21.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/TODO.md "Historial de cambios") | [🔄 Vivo](docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-17 | [Plan](docs/INDICE.md#etiqueta-plan) · [Paralelo](docs/INDICE.md#etiqueta-paralelo) |

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

Las tres preguntas de siempre. Las secciones 2 a 6 enumeran **las 132 tareas del plan**, una por una
y con su marca; aquí está el resumen. Que no falte ninguna no depende de la memoria de nadie: la
herramienta compara el tablero con el plan y la verificación falla si alguna no está.

### 1.1 Sprint por sprint

<!-- generado:plan-tablero · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
| Sprint | Tareas | ✅ Hechas | 🚧 En progreso | ⬜ Pendientes | Días que faltan |
|---|---:|---:|---:|---:|---:|
| [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0) · Dos proyectos, cuatro ambientes, tubería y contrato de respuesta | 17 | 16 | 0 | 1 | 1 |
| [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) · Base de datos, RLS, identidad propagada e idempotencia | 20 | 14 | 0 | 6 | 8 |
| [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) · Acceso, usuarios, cargos y canal firmado | 19 | 4 | 0 | 15 | 18 |
| [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) · Movimientos | 13 | 3 | 0 | 10 | 11,5 |
| [Sprint 4](docs/08-plan-de-desarrollo.md#sprint-4) · Pedidos y anticipos | 10 | 1 | 0 | 9 | 11 |
| [Sprint 5](docs/08-plan-de-desarrollo.md#sprint-5) · Productos y costeo | 10 | 3 | 0 | 7 | 7 |
| [Sprint 6](docs/08-plan-de-desarrollo.md#sprint-6) · Reportes y KPIs | 10 | 0 | 0 | 10 | 15 |
| [Sprint 7](docs/08-plan-de-desarrollo.md#sprint-7) · Capital, retiros y patrimonio | 9 | 0 | 0 | 9 | 12,5 |
| [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) · Nómina, cotizador y cierre | 11 | 0 | 0 | 11 | 16 |
| [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) · Promoción, PWA y endurecimiento | 13 | 1 | 0 | 12 | 12 |
| **Total** | **132** | **42** | **0** | **90** | **112** |
<!-- /generado:plan-tablero -->

### 1.2 ✅ Hecho

Lo que tiene su commit en `develop` con la integración continua en verde, que es lo que la
[definición de terminado](docs/08-plan-de-desarrollo.md#4-definición-de-terminado) exige mientras no exista el ambiente qa ([ADR-026](docs/adr/ADR-026-railway-al-final.md)).

| Carril | Qué hay | Tareas |
|---|---|---|
| **API · cimientos** | Esqueleto hexagonal con su regla de dependencias verificada, el sobre `{status, mensaje, data}` en toda respuesta, el catálogo de códigos de cinco dígitos, la consulta de versión, el descriptor de formulario, el contrato v0.5.0 fijado y los hilos virtuales de Java 25 | [0.1](docs/08-plan-de-desarrollo.md#tarea-0-1) · [0.2](docs/08-plan-de-desarrollo.md#tarea-0-2) · [0.6](docs/08-plan-de-desarrollo.md#tarea-0-6) · [0.7](docs/08-plan-de-desarrollo.md#tarea-0-7) · [0.11](docs/08-plan-de-desarrollo.md#tarea-0-11) · [0.14](docs/08-plan-de-desarrollo.md#tarea-0-14) … [0.18](docs/08-plan-de-desarrollo.md#tarea-0-18) |
| **API · dominio** | `Dinero`; `Movimiento` con los nueve tipos y su efecto sobre las tres cifras; `Pedido` con sus cinco estados; `Producto`, `Costeo` partido en materia y tiempo, la tarifa por hora, los tres márgenes y el cuadro que lee cada producto contra el resto del taller; y `RegistrarMovimiento`, el primer caso de uso, con la marca de registro tardío | [1.9](docs/08-plan-de-desarrollo.md#tarea-1-9) · [3.1](docs/08-plan-de-desarrollo.md#tarea-3-1) · [3.2](docs/08-plan-de-desarrollo.md#tarea-3-2) · [3.11](docs/08-plan-de-desarrollo.md#tarea-3-11) · [4.1](docs/08-plan-de-desarrollo.md#tarea-4-1) · [5.1](docs/08-plan-de-desarrollo.md#tarea-5-1) · [5.3](docs/08-plan-de-desarrollo.md#tarea-5-3) · [5.6](docs/08-plan-de-desarrollo.md#tarea-5-6) |
| **API · la base** | `ConIdentidad`, **la única puerta a PostgreSQL**: abre la transacción, le dice a la base quién pregunta y se vuelve `authenticated`, y fuera de ella ninguna consulta sale —ni por un `DataSource` o un `@Transactional` de otra clase, que ArchUnit impide—. Probada contra la base local conectada como `prisma_api`: Gerencia ve el pro-labore, Operación no, y la conexión vuelve al pool sin la identidad de nadie | [1.6](docs/08-plan-de-desarrollo.md#tarea-1-6) |
| **Front** | El proyecto Flutter con su integración continua, la insignia de versión y ambiente, el bloqueo por MAJOR incompatible y `Dinero` en Dart | [0.3](docs/08-plan-de-desarrollo.md#tarea-0-3) · [0.12](docs/08-plan-de-desarrollo.md#tarea-0-12) · [0.13](docs/08-plan-de-desarrollo.md#tarea-0-13) · [1.9](docs/08-plan-de-desarrollo.md#tarea-1-9) |
| **Front · sistema de diseño** | La tabla, el panel de confirmación en línea, la píldora de estado y los formatos colombianos de fecha y porcentaje; el cliente HTTP con clave de idempotencia; y el panel «Acerca de» | [0.19](docs/08-plan-de-desarrollo.md#tarea-0-19) · [1.19](docs/08-plan-de-desarrollo.md#tarea-1-19) · [2.10](docs/08-plan-de-desarrollo.md#tarea-2-10) |
| **Front · formularios** | El renderizador del descriptor: pinta los campos que manda la API con su teclado, sus límites, sus opciones y sus avisos, y no trae ninguna regla propia | [1.18](docs/08-plan-de-desarrollo.md#tarea-1-18) |
| **Front · la sesión** | **La puerta**: sin sesión se ve «Entra con tu usuario», y quien entra con una clave temporal va a «Crea tu contraseña» en vez de al tablero —que ni siquiera se construye hasta que la cambie—. Los dos formularios los manda la API, y los rechazos también: el «Usuario o contraseña incorrectos» que se lee en pantalla no está escrito en ninguna parte del front | [2.6](docs/08-plan-de-desarrollo.md#tarea-2-6) |
| **Front · sin conexión** | La PWA con su manifiesto en español y la cola local en IndexedDB: cada intención se guarda con su clave **antes** de intentar enviarse, y se reintenta con la espera de [17 §5.2](docs/17-resiliencia-offline-y-cache.md#52-cuánto-se-espera-entre-reintentos) hasta que la API la acepte o la rechace con motivo | [9.1](docs/08-plan-de-desarrollo.md#tarea-9-1) |
| **Contrato** | El contrato v0.4.0 en [`contrato/openapi.json`](contrato/openapi.json): el sobre, el descriptor con sus listas, cuentas y categorías, y **el [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) entero acordado antes de implementarlo** —`/sesiones`, `/usuarios`, `/cargos`, `/bitacora`, `/navegacion` y las tres cabeceras del canal firmado— | [0.15](docs/08-plan-de-desarrollo.md#tarea-0-15) · [0.18](docs/08-plan-de-desarrollo.md#tarea-0-18) · [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17) · [2.19](docs/08-plan-de-desarrollo.md#tarea-2-19) |
| **Base** | **El esquema ya no está solo escrito: está probado contra una base.** 24 tablas con la semilla del mockup, los nueve dominios de [04 §4.1](docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes) en sus 61 columnas, toda restricción con nombre explícito, `DELETE` y `TRUNCATE` revocados a todo el que no sea el dueño, los catorce triggers de auditoría escribiendo y las 34 políticas juzgando a una sesión de verdad —Operación no alcanza los retiros ni el pro-labore; Gerencia sí—, también sobre el catálogo de cargos, que lee todo el mundo y escribe solo Gerencia, y sobre las claves de idempotencia, que cada persona alcanza solo si son suyas, Gerencia incluida. `schema_version` en `0.1.0` y el rol `prisma_api`, con el que **RLS ya juzga a la API**. La semilla es fija, re-ejecutable y con filas en toda tabla que preguntan las pruebas de permisos, y `sembrar.ps1` la lleva a dev y a qa sin dejarla acercarse a uat ni a prod. Todo esto **en dev**: qa se quedó tres migraciones atrás, hasta la promoción de la [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12) | [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) · [0.5](docs/08-plan-de-desarrollo.md#tarea-0-5) · [0.10](docs/08-plan-de-desarrollo.md#tarea-0-10) · [1.1](docs/08-plan-de-desarrollo.md#tarea-1-1) … [1.5](docs/08-plan-de-desarrollo.md#tarea-1-5) · [1.11](docs/08-plan-de-desarrollo.md#tarea-1-11) · [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13) · [2.3](docs/08-plan-de-desarrollo.md#tarea-2-3) |
| **Decisión** | Cuatro repositorios ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)), Java 25 y Gradle ([ADR-024](docs/adr/ADR-024-java-25-y-gradle.md)), Railway al final ([ADR-026](docs/adr/ADR-026-railway-al-final.md)), documentación versionada ([ADR-027](docs/adr/ADR-027-documentacion-versionada.md)), el esquema por etiqueta ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md)) y el mockup confirmado ([H0](docs/08-plan-de-desarrollo.md#h0)) | [1.20](docs/08-plan-de-desarrollo.md#tarea-1-20) |

**379 pruebas en verde en la API** —y 7 más contra la base local— y 165 en el front. El dominio se prueba con las cifras de los
documentos [05](docs/05-reglas-financieras.md) y [06](docs/06-nomina-y-capacidad-de-pago.md): si una prueba falla, o se rompió el código o el documento dice
otra cosa.

### 1.3 🚧 En progreso

Nada en las manos ahora mismo.

**Lo siguiente, en cuanto alguien lo tome:** cerrar la base del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) destrabó lo que la estaba
esperando. En el carril API, con la identidad llegando ya a PostgreSQL ([1.6](docs/08-plan-de-desarrollo.md#tarea-1-6)), se abren la prueba
de permisos con sesión real ([1.7](docs/08-plan-de-desarrollo.md#tarea-1-7)), la traducción de restricción a código del catálogo ([1.8](docs/08-plan-de-desarrollo.md#tarea-1-8)) —que ya
tiene de dónde salir: cada restricción se llama como la llama el [04](docs/04-modelo-de-datos.md)— y el filtro de idempotencia
([1.14](docs/08-plan-de-desarrollo.md#tarea-1-14)), que necesitaba las dos: la transacción de la [1.6](docs/08-plan-de-desarrollo.md#tarea-1-6) y la tabla de la [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13). En el carril Base, con
`cargos` ([2.3](docs/08-plan-de-desarrollo.md#tarea-2-3)), la tabla de idempotencia ([1.13](docs/08-plan-de-desarrollo.md#tarea-1-13)), su purga ([1.16](docs/08-plan-de-desarrollo.md#tarea-1-16)) y la semilla reproducible
([1.11](docs/08-plan-de-desarrollo.md#tarea-1-11)) cerradas, siguen la primera promoción a qa ([1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)) y la tabla `usuarios` ([2.4](docs/08-plan-de-desarrollo.md#tarea-2-4)). El
carril Contrato, con los de los sprints 3 a 8. **El carril Front se queda sin nada que tomar**: con
la pantalla de acceso ([2.6](docs/08-plan-de-desarrollo.md#tarea-2-6)) hecha, lo que sigue —usuarios, cargos, la navegación dictada y el
canal firmado— espera a que la API tenga sesión, y eso sigue con la [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1). La lista al día la calcula
la herramienta, y está justo abajo.

> **El [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0) está cerrado salvo lo que cuesta dinero.** La base existe, tiene dueño distinto del
> de la API y **RLS ya juzga**: conectada como `prisma_api`, la misma consulta devuelve cero filas de
> `usuarios` y las cuatro `cuentas`, porque lo decide la base y no un `if`. Lo que queda de [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) son
> uat y prod, que son de pago y los decide Gerencia; y [0.8](docs/08-plan-de-desarrollo.md#tarea-0-8) y [0.9](docs/08-plan-de-desarrollo.md#tarea-0-9), que el [ADR-026](docs/adr/ADR-026-railway-al-final.md) mandó
> al [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9). El carril Base ya siguió: el [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) tiene cerrada su mitad de base ([1.1](docs/08-plan-de-desarrollo.md#tarea-1-1) a
> [1.5](docs/08-plan-de-desarrollo.md#tarea-1-5)).

### 1.4 ⬜ Pendiente: lo que puede empezar hoy, en paralelo

Calculado de las dependencias del plan con lo marcado como hecho. Cada fila es un carril: **todo lo
de una misma fila se puede trabajar a la vez que lo de las demás.**

<!-- generado:plan-listas-ya · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
| Carril | Pueden empezar hoy, porque todo lo que necesitan ya está hecho |
|---|---|
| **API** | [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7) · [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) · [1.14](docs/08-plan-de-desarrollo.md#tarea-1-14) · [3.3](docs/08-plan-de-desarrollo.md#tarea-3-3) · [5.4](docs/08-plan-de-desarrollo.md#tarea-5-4) · [5.7](docs/08-plan-de-desarrollo.md#tarea-5-7) |
| **Base** | [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12) · [2.4](docs/08-plan-de-desarrollo.md#tarea-2-4) |
| **Contrato** | [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13) · [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10) · [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10) · [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10) · [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9) · [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11) |
| **Decisión** | [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) |
<!-- /generado:plan-listas-ya -->

### 1.5 Cuánto falta

<!-- generado:plan-restante · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
Quedan **90 tareas y 112 días de trabajo** de 132 tareas del plan.

| Carriles activos | Desarrollo que falta | Con la estabilización |
|:---:|---:|---:|
| 1 | 16,9 semanas | **19,9 semanas** |
| 2 | 10,6 semanas | **13,6 semanas** |
| 3 | 9,4 semanas | **12,4 semanas** |
<!-- /generado:plan-restante -->

### 1.6 Para destrabar, en orden de lo que más libera

- [ ] ⚡ **Poner qa al día** ([1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)) — **dev y qa dejaron de ser iguales**: las tres migraciones
      de las tareas [1.1](docs/08-plan-de-desarrollo.md#tarea-1-1), [1.2](docs/08-plan-de-desarrollo.md#tarea-1-2) y [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13) solo están en dev. Correr `scripts/db/verificar-base.sql`
      contra qa lo dice línea por línea: ahí la base todavía acepta un saldo negativo, un sobre del
      120 % y una anulación cuyo motivo es un espacio en blanco, y no tiene dónde guardar una clave
      de idempotencia. Promoverlas **es** la [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12), que para eso existe: escribir el
      procedimiento y usarlo por primera vez. La semilla que va con ellas ya está lista ([1.11](docs/08-plan-de-desarrollo.md#tarea-1-11)).
- [x] **La identidad hasta PostgreSQL** ([1.6](docs/08-plan-de-desarrollo.md#tarea-1-6)) — hecha: RLS ya juzga a la persona y no a
      `prisma_api`. Destrabó la prueba de permisos ([1.7](docs/08-plan-de-desarrollo.md#tarea-1-7)) y, con la tabla de la [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13), la idempotencia
      ([1.14](docs/08-plan-de-desarrollo.md#tarea-1-14)); el acceso del [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) espera ahora a la tabla `usuarios` ([2.4](docs/08-plan-de-desarrollo.md#tarea-2-4)).
- [ ] ⚡ **uat y prod** · Decisión — son los dos proyectos de Supabase que faltan para cerrar [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4), y
      los dos son **de pago** ([19 §8.1](docs/19-ambientes-y-entrega.md#81-qué-se-paga-y-qué-no)). Los decide Gerencia, y hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) no hay nada que
      promover a ellos.
- [ ] **Una sola licencia** · Decisión — este repositorio y el front están con AGPL-3.0; la API y la
      base, con GPL-3.0.

---

## 2. Sprint 0 · proyectos, ambientes y contrato

- [x] [**0.1**](docs/08-plan-de-desarrollo.md#tarea-0-1) Proyecto `prisma_api`: Java 25, Spring Boot 4 y Gradle, con el esqueleto hexagonal · API
- [x] [**0.2**](docs/08-plan-de-desarrollo.md#tarea-0-2) Regla de frontera con ArchUnit en la integración continua · API
- [x] [**0.3**](docs/08-plan-de-desarrollo.md#tarea-0-3) Proyecto `prisma_front` en Flutter, web por defecto · Front
- [ ] ⚡ [**0.4**](docs/08-plan-de-desarrollo.md#tarea-0-4) Los cuatro proyectos de Supabase · Decisión — **dev y qa** configurados, con el
      esquema, la semilla y el rol `prisma_api`; faltan uat y prod, que son de pago y los decide
      Gerencia
- [x] [**0.5**](docs/08-plan-de-desarrollo.md#tarea-0-5) Rol `prisma_api` sin `BYPASSRLS`, sin `SUPERUSER` y sin ser dueño de las tablas ·
      Base — creado en dev y en qa; en dev ya se comprobó que RLS lo juzga
- [x] [**0.6**](docs/08-plan-de-desarrollo.md#tarea-0-6) Secretos fuera del repositorio: variables de entorno en la API y `--dart-define` en el
      front · API, Front
- [x] [**0.7**](docs/08-plan-de-desarrollo.md#tarea-0-7) Integración continua por proyecto: formato, análisis, pruebas y compilación · API, Front
- [ ] ⏭️ [**0.8**](docs/08-plan-de-desarrollo.md#tarea-0-8) Imagen de la API arrancando en los ambientes, en Railway ([ADR-026](docs/adr/ADR-026-railway-al-final.md)). El `Dockerfile` ya
      existe y la integración continua lo construye en cada push a `main` · API
- [ ] ⏭️ [**0.9**](docs/08-plan-de-desarrollo.md#tarea-0-9) Entrega a dev al fusionar ([ADR-026](docs/adr/ADR-026-railway-al-final.md)) · API, Front
- [x] [**0.10**](docs/08-plan-de-desarrollo.md#tarea-0-10) SemVer y migraciones con `schema_version` · Base — la tabla guarda una fila por
      versión publicada y hoy dice `0.1.0`, con la etiqueta `esquema-v0.1.0` de [ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md) puesta.
      Que la API la lea en vez de `PRISMA_ESQUEMA` es del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1)
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
llega con el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9).

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
- [ ] ⚡ [**1.7**](docs/08-plan-de-desarrollo.md#tarea-1-7) Prueba de permisos con sesión real, con y sin la comprobación de la API · API
- [ ] ⚡ [**1.8**](docs/08-plan-de-desarrollo.md#tarea-1-8) Traducción restricción → código del catálogo · API
- [x] [**1.9**](docs/08-plan-de-desarrollo.md#tarea-1-9) `Dinero` en Java y en Dart · API, Front — en la API, sumas que fallan al desbordar,
      porcentaje `HALF_UP` y formato colombiano; en el front, un tipo sin operadores y su formato en
      `ui/formato/moneda.dart`. Pruebas con las cifras de los documentos [05](docs/05-reglas-financieras.md) y [06](docs/06-nomina-y-capacidad-de-pago.md), verificadas en negativo
- [ ] 🔒 [**1.10**](docs/08-plan-de-desarrollo.md#tarea-1-10) Cuentas y categorías: endpoints y pantalla ([RF-97](docs/03-requisitos-y-bdd.md#rf-97)) · API, Front
- [x] [**1.11**](docs/08-plan-de-desarrollo.md#tarea-1-11) Semilla reproducible para dev y qa · Base — ids y fechas escritos,
      re-ejecutable sin borrar nada, y con filas en toda tabla que leen [P-01](docs/12-pruebas-y-calidad.md#p-01) a [P-31](docs/12-pruebas-y-calidad.md#p-31), porque una tabla
      vacía hace pasar «no ve lo ajeno» por la razón equivocada. `scripts/db/sembrar.ps1` la lleva a
      dev y a qa, y se niega con uat y prod. 78 comprobaciones en `OK` contra la base local, y la
      semilla corrida entera contra dev dentro de una transacción revertida
- [ ] ⚡ [**1.12**](docs/08-plan-de-desarrollo.md#tarea-1-12) Primera promoción de migraciones dev → qa · Base
- [x] [**1.13**](docs/08-plan-de-desarrollo.md#tarea-1-13) Tabla `peticiones_idempotentes` · Base — transcrita del [04 §4.9](docs/04-modelo-de-datos.md#49-claves-de-idempotencia) en
      una migración nueva, con su índice por vencimiento, las tres políticas `idem_*` y `FORCE`. Cada
      persona lee, escribe y sella solo sus claves, **y Gerencia no es excepción**; nadie que atienda
      peticiones borra una. `verificar-base.sql` lo pregunta con sesión de verdad ([P-33](docs/12-pruebas-y-calidad.md#p-33), [P-34](docs/12-pruebas-y-calidad.md#p-34) y
      [P-37](docs/12-pruebas-y-calidad.md#p-37)) y lo vio fallar abriendo cada política. Sin trigger de auditoría ni purga, que es la [1.16](docs/08-plan-de-desarrollo.md#tarea-1-16)
- [ ] ⚡ [**1.14**](docs/08-plan-de-desarrollo.md#tarea-1-14) Filtro de idempotencia · API
- [ ] 🔒 [**1.15**](docs/08-plan-de-desarrollo.md#tarea-1-15) Prueba de corte entre el efecto y la clave · API
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

---

## 4. Sprint 2 · acceso, usuarios, cargos y canal firmado

- [ ] 🔒 [**2.1**](docs/08-plan-de-desarrollo.md#tarea-2-1) Autenticación contra Supabase Auth desde la API, con el correo sintético en el servidor · API
- [ ] 🔒 [**2.2**](docs/08-plan-de-desarrollo.md#tarea-2-2) Sesión de 30 días y enrutamiento según la navegación que dicta la API · API, Front
- [x] [**2.3**](docs/08-plan-de-desarrollo.md#tarea-2-3) Tabla `cargos` con semilla y RLS · Base — **sin migración nueva**: la tabla,
      sus seis cargos de arranque y sus dos políticas ya eran las del [04 §4.2](docs/04-modelo-de-datos.md#42-cargos-usuarios-y-cuentas) y el [§7](docs/04-modelo-de-datos.md#7-seguridad-por-tipo-de-usuario-rls). Lo
      que la cierra es verla juzgar con sesión real ([P-14](docs/12-pruebas-y-calidad.md#p-14) y [P-15](docs/12-pruebas-y-calidad.md#p-15)): Operación lee el catálogo, no
      crea un cargo y su intento de desactivar uno no alcanza ninguna fila; Gerencia crea y desactiva,
      y ni ella desactiva sin motivo. Once comprobaciones en `verificar-base.sql`, en verde en local
      y en dev
- [ ] ✏️⚡ [**2.4**](docs/08-plan-de-desarrollo.md#tarea-2-4) Tabla `usuarios` con `usuario`, `nombre_completo`, `cargo_id` y `tipo` · Base — escrita
      en la migración inicial
- [ ] ✏️🔒 [**2.5**](docs/08-plan-de-desarrollo.md#tarea-2-5) Trigger `tg_proteger_ultima_gerencia` · Base — escrito en la migración inicial
- [x] [**2.6**](docs/08-plan-de-desarrollo.md#tarea-2-6) Pantalla de acceso y cambio obligatorio de contraseña · Front — las dos capas del
      mockup, con sus campos pedidos a `POST /api/v0/consultas/formularios`, «acceso» y «cambio-de-clave».
      «Crea tu contraseña» no se puede saltar porque el tablero **no está en el árbol** hasta que la
      cambie ([BDD-32-1](docs/03-requisitos-y-bdd.md#bdd-32-1)), y ningún mensaje de la API vive en el front: una prueba de frontera
      falla si aparece. Trae el sexto tipo de campo del descriptor, `clave`, que el contrato v0.4.0
      agregó y el renderizador de la [1.18](docs/08-plan-de-desarrollo.md#tarea-1-18) todavía no conocía
- [ ] 🔒 [**2.7**](docs/08-plan-de-desarrollo.md#tarea-2-7) Gestión de usuarios: crear, editar, desactivar con motivo y restablecer clave · API, Front
- [ ] 🔒 [**2.8**](docs/08-plan-de-desarrollo.md#tarea-2-8) Catálogo de cargos · API, Front
- [ ] 🔒 [**2.9**](docs/08-plan-de-desarrollo.md#tarea-2-9) Registro de cada inicio de sesión con fecha, dispositivo e IP · API, Base
- [x] [**2.10**](docs/08-plan-de-desarrollo.md#tarea-2-10) Panel «Acerca de» ([RF-100](docs/03-requisitos-y-bdd.md#rf-100)) · Front, API — los seis datos de [19 §5.3](docs/19-ambientes-y-entrega.md#53-el-panel-acerca-de), y lo que
      no se pudo consultar lo dice en vez de inventarlo
- [ ] 🔒 [**2.11**](docs/08-plan-de-desarrollo.md#tarea-2-11) La prueba de permisos del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1), también contra la base de qa · API
- [ ] 🔒 [**2.12**](docs/08-plan-de-desarrollo.md#tarea-2-12) Clave de firma de sesión, solo en memoria en el front · API, Front
- [ ] 🔒 [**2.13**](docs/08-plan-de-desarrollo.md#tarea-2-13) Filtro de firma: HMAC, nonce y marca de tiempo (`40101` a `40103`) · API
- [ ] 🔒 [**2.14**](docs/08-plan-de-desarrollo.md#tarea-2-14) Navegación dictada por la API ([RF-103](docs/03-requisitos-y-bdd.md#rf-103)) · API, Front
- [ ] 🔒 [**2.15**](docs/08-plan-de-desarrollo.md#tarea-2-15) Tabla única de usuarios activos y desactivados ([RF-84](docs/03-requisitos-y-bdd.md#rf-84) a [RF-87](docs/03-requisitos-y-bdd.md#rf-87)) · API, Front
- [ ] 🔒 [**2.16**](docs/08-plan-de-desarrollo.md#tarea-2-16) Bitácora de cambios y reversión sin borrar ([RF-88](docs/03-requisitos-y-bdd.md#rf-88), [RF-89](docs/03-requisitos-y-bdd.md#rf-89), [RF-91](docs/03-requisitos-y-bdd.md#rf-91)) · Base, API, Front
- [ ] 🔒 [**2.17**](docs/08-plan-de-desarrollo.md#tarea-2-17) Cambio de clave obligatorio al reactivar ([RF-90](docs/03-requisitos-y-bdd.md#rf-90)) · API, Front
- [ ] 🔒 [**2.18**](docs/08-plan-de-desarrollo.md#tarea-2-18) Vista previa de Operación para Gerencia ([RF-92](docs/03-requisitos-y-bdd.md#rf-92) a [RF-94](docs/03-requisitos-y-bdd.md#rf-94)) · Front, API
- [x] [**2.19**](docs/08-plan-de-desarrollo.md#tarea-2-19) Contrato de acceso, usuarios, cargos y canal firmado · Contrato — v0.4.0: `/sesiones`,
      `/navegacion`, `/usuarios`, `/cargos` y `/bitacora`, siete formularios más y los códigos `40100`
      a `40104`, `40301`, `40302`, `40910` a `40913` y `42210` a `42214`. El canal firmado va con sus
      tres cabeceras `X-Prisma-`; cómo se arma la firma, al byte, vive en [20 §6.2](docs/20-contrato-de-api.md#62-cómo-se-arma-la-firma) y no se copia aquí

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
- [ ] ⚡ [**3.3**](docs/08-plan-de-desarrollo.md#tarea-3-3) Repositorio de movimientos contra PostgreSQL · API
- [ ] 🔒 [**3.4**](docs/08-plan-de-desarrollo.md#tarea-3-4) Endpoints de movimientos con sus códigos del catálogo · API
- [ ] 🔒 [**3.5**](docs/08-plan-de-desarrollo.md#tarea-3-5) Formulario de registro rápido para celular, pintado del descriptor · Front
- [ ] 🔒 [**3.6**](docs/08-plan-de-desarrollo.md#tarea-3-6) Foto del recibo comprimida, subida a través de la API · Front, API
- [ ] 🔒 [**3.7**](docs/08-plan-de-desarrollo.md#tarea-3-7) Transferencias entre cuentas · API
- [ ] 🔒 [**3.8**](docs/08-plan-de-desarrollo.md#tarea-3-8) Listado con filtros · API, Front
- [ ] 🔒 [**3.9**](docs/08-plan-de-desarrollo.md#tarea-3-9) Anulación con motivo obligatorio · API, Front
- [ ] 🔒 [**3.10**](docs/08-plan-de-desarrollo.md#tarea-3-10) Corrección por contra-asiento · API
- [x] [**3.11**](docs/08-plan-de-desarrollo.md#tarea-3-11) Marca de registro tardío · API — más de 7 días entre lo que ocurrió y lo que se
      digitó, contados en días de Bogotá
- [ ] 🔒 [**3.12**](docs/08-plan-de-desarrollo.md#tarea-3-12) Saldos por cuenta · API
- [ ] ⚡ [**3.13**](docs/08-plan-de-desarrollo.md#tarea-3-13) Contrato de movimientos · Contrato

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
- [ ] ⚡ [**6.10**](docs/08-plan-de-desarrollo.md#tarea-6-10) Contrato de reportes, indicadores, alertas y cierre mensual · Contrato

**[Sprint 7](docs/08-plan-de-desarrollo.md#sprint-7) · Capital, retiros y patrimonio**

- [ ] 🔒 [**7.1**](docs/08-plan-de-desarrollo.md#tarea-7-1) Inversiones en activos · API, Front
- [ ] 🔒 [**7.2**](docs/08-plan-de-desarrollo.md#tarea-7-2) Aportes de capital · API, Front
- [ ] 🔒 [**7.3**](docs/08-plan-de-desarrollo.md#tarea-7-3) Pro-labore con justificación · API, Front
- [ ] 🔒 [**7.4**](docs/08-plan-de-desarrollo.md#tarea-7-4) Retiro con división automática en pro-labore y distribución · API
- [ ] 🔒 [**7.5**](docs/08-plan-de-desarrollo.md#tarea-7-5) Cálculo de patrimonio · API
- [ ] 🔒 [**7.6**](docs/08-plan-de-desarrollo.md#tarea-7-6) Alerta de descapitalización a 12 meses · API
- [ ] 🔒 [**7.7**](docs/08-plan-de-desarrollo.md#tarea-7-7) Los cuatro sobres con historial · API, Front
- [ ] 🔒 [**7.8**](docs/08-plan-de-desarrollo.md#tarea-7-8) Panel de sobres: asignado contra usado · Front
- [ ] ⚡ [**7.9**](docs/08-plan-de-desarrollo.md#tarea-7-9) Contrato de inversiones, aportes, retiros, pro-labore y sobres · Contrato

### Cadena B · el pedido

**[Sprint 5](docs/08-plan-de-desarrollo.md#sprint-5) · Productos y costeo**

- [x] [**5.1**](docs/08-plan-de-desarrollo.md#tarea-5-1) Dominio `Producto` y servicio `calcularMargenes` · API — los tres márgenes de
      [05 §7.2](docs/05-reglas-financieras.md#72-los-tres-márgenes) reproducidos producto por producto, con el margen por hora vacío —no en cero—
      cuando el ítem no consume tiempo
- [ ] 🔒 [**5.2**](docs/08-plan-de-desarrollo.md#tarea-5-2) Catálogo de productos y servicios · API, Front
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
- [ ] 🔒 [**5.8**](docs/08-plan-de-desarrollo.md#tarea-5-8) Costos y márgenes ocultos al tipo Operación: la API no los envía · API
- [ ] 🔒 [**5.9**](docs/08-plan-de-desarrollo.md#tarea-5-9) Cuadro comparativo ordenable por margen por hora · Front
- [ ] ⚡ [**5.10**](docs/08-plan-de-desarrollo.md#tarea-5-10) Contrato de productos, servicios y costeo · Contrato

**[Sprint 4](docs/08-plan-de-desarrollo.md#sprint-4) · Pedidos y anticipos**

- [x] [**4.1**](docs/08-plan-de-desarrollo.md#tarea-4-1) Dominio `Pedido`, estados y transiciones · API — los cinco estados y los siete pasos
      que existen entre ellos; entregado y cancelado son finales, y anular no es cancelar
- [ ] 🔒 [**4.2**](docs/08-plan-de-desarrollo.md#tarea-4-2) Gestión de clientes · API, Front
- [ ] 🔒 [**4.3**](docs/08-plan-de-desarrollo.md#tarea-4-3) Pedido con líneas de producto · API, Front
- [ ] 🔒 [**4.4**](docs/08-plan-de-desarrollo.md#tarea-4-4) `CobrarAnticipo`: crea pasivo, no ingreso · API
- [ ] 🔒 [**4.5**](docs/08-plan-de-desarrollo.md#tarea-4-5) Función en la base que entrega el pedido y causa la venta en una transacción · Base
- [ ] 🔒 [**4.6**](docs/08-plan-de-desarrollo.md#tarea-4-6) Listado ordenado por fecha con filtros · API, Front
- [ ] 🔒 [**4.7**](docs/08-plan-de-desarrollo.md#tarea-4-7) Resaltado de pedidos estancados · API, Front
- [ ] 🔒 [**4.8**](docs/08-plan-de-desarrollo.md#tarea-4-8) Factura adjunta al pedido · API, Front
- [ ] 🔒 [**4.9**](docs/08-plan-de-desarrollo.md#tarea-4-9) Cancelación con destino del anticipo · API
- [ ] ⚡ [**4.10**](docs/08-plan-de-desarrollo.md#tarea-4-10) Contrato de clientes, pedidos y anticipos · Contrato

**[Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) · Cotizador**

- [ ] 🔒 [**8.8**](docs/08-plan-de-desarrollo.md#tarea-8-8) Cotizaciones y remisiones en PDF con logo · API, Front
- [ ] 🔒 [**8.9**](docs/08-plan-de-desarrollo.md#tarea-8-9) Validador de anticipo mínimo · API
- [ ] ⚡ [**8.11**](docs/08-plan-de-desarrollo.md#tarea-8-11) Contrato de nómina, simulador, cotizaciones e importación · Contrato

### Amortiguador · Nómina

La toma el carril que termine primero su cadena: es la funcionalidad más independiente del sistema.

- [ ] 🔒 [**8.1**](docs/08-plan-de-desarrollo.md#tarea-8-1) Registro de empleadas · API, Front
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
- [ ] 🔒 [**9.4**](docs/08-plan-de-desarrollo.md#tarea-9-4) Reversión ensayada en qa, con el tiempo medido · API, Front
- [ ] 🔒 [**9.5**](docs/08-plan-de-desarrollo.md#tarea-9-5) Prueba de permisos con sesión real en los cuatro ambientes · API
- [ ] 🔒 [**9.6**](docs/08-plan-de-desarrollo.md#tarea-9-6) Pruebas de extremo a extremo de los flujos críticos en qa · API, Front
- [ ] 🔒 [**9.7**](docs/08-plan-de-desarrollo.md#tarea-9-7) Rendimiento en celular real con 4G · Front
- [ ] 🔒 [**9.8**](docs/08-plan-de-desarrollo.md#tarea-9-8) Repaso de secretos: nada en los repositorios y `service_role` solo en migraciones · API
- [ ] 🔒 [**9.9**](docs/08-plan-de-desarrollo.md#tarea-9-9) El front rechaza de verdad un MAJOR de API distinto · Front
- [ ] 🔒 [**9.10**](docs/08-plan-de-desarrollo.md#tarea-9-10) Etiquetar `1.0.0` del front y de la API · API, Front
- [ ] 🔒 [**9.11**](docs/08-plan-de-desarrollo.md#tarea-9-11) Swagger detrás de autenticación en prod · API

---

## 7. Decisiones pendientes

| # | Decisión | Quién | Bloquea | Estado |
|---|---|---|---|---|
| 1 | Dónde se aloja la API | Quien dirige | Tarea [0.8](docs/08-plan-de-desarrollo.md#tarea-0-8) | ✅ Railway, al final ([ADR-026](docs/adr/ADR-026-railway-al-final.md)) |
| 2 | Dónde se publica el front web | Quien dirige | Tarea [0.9](docs/08-plan-de-desarrollo.md#tarea-0-9) | ✅ Railway, al final ([ADR-026](docs/adr/ADR-026-railway-al-final.md)) |
| 3 | Los cuatro proyectos de Supabase y el pago de uat y prod | Quien dirige crea; Gerencia paga | Tarea [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) | 🟡 dev y qa configurados, con el esquema y la semilla aplicados; faltan uat y prod, los de pago |
| 4 | PostgreSQL para desarrollar sin Docker | Quien dirige | Tareas [0.5](docs/08-plan-de-desarrollo.md#tarea-0-5) y [0.10](docs/08-plan-de-desarrollo.md#tarea-0-10) | ✅ El proyecto dev de Supabase, mientras Docker no arranque |
| 5 | Remotos de los repositorios | Quien dirige | Integración continua | ✅ Los cuatro en GitHub |
| 6 | Cómo consiguen la API y su CI el esquema de `prisma_db` | Carril API | Tareas [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7), [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) y [1.15](docs/08-plan-de-desarrollo.md#tarea-1-15) | ✅ Por etiqueta, con el Supabase CLI en la tubería ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md)) |
| 7 | Quién trabaja cada carril, y quién sabe Flutter y Java para revisar el contrato | Quien dirige | Trabajar con más de un carril | ⬜ |
| 8 | Contrato por etiqueta de git o como paquete publicado | Los dos lados | El primer cambio de contrato | ⬜ El documento [21](docs/21-trabajo-en-paralelo.md) se inclina por la etiqueta |
| 9 | Quién desempata un cambio de contrato | Quien dirige | El primer desacuerdo | ⬜ |
| 10 | Supuestos [S1](docs/01-vision-y-alcance.md#s1) a [S5](docs/01-vision-y-alcance.md#s5) de [01 §6](docs/01-vision-y-alcance.md#6-supuestos) | Gerencia | [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) | ⬜ Por confirmar; el mockup ya está confirmado |
| 11 | El dominio, del que dependen el correo sintético, la URL de la API y CORS | Gerencia | — | ✅ `prisma.com`: la API en `api.prisma.com` y `api-dev.prisma.com`, el correo sintético en `@usuarios.prisma.com`. Se cambió sin migrar nada porque todavía no existe ningún usuario real; desde el primero, «fijo de por vida» quiere decir exactamente eso ([ADR-009](docs/adr/ADR-009-login-por-usuario.md)) |
| 12 | Plazos de conservación y registro de bases de datos personales (Ley 1581) | Un abogado | Go-live | ⬜ |
| 13 | Qué objetivos nativos se publican | Gerencia | Nada hoy: no hay disparador | ⬜ |
| 14 | Una sola licencia para los cuatro repositorios | Quien dirige | Nada técnico | ⬜ AGPL-3.0 en este y en el front; GPL-3.0 en la API y la base |

**Lo que el modelo de datos todavía no define** ([`04-modelo-de-datos.md`](docs/04-modelo-de-datos.md)):

- [ ] La variante del trigger de auditoría para `usuarios`, que detecta `desactivado_en` · [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2)
- [ ] 🔒 El `CREATE TABLE` de `adjuntos` · [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3), tarea [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6)
- [ ] 🔒 El `CREATE TABLE` de `cotizaciones` y `cotizacion_lineas` · [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8), tarea [8.8](docs/08-plan-de-desarrollo.md#tarea-8-8)

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

- **A `movimientos` le faltan dos restricciones con nombre.** La base exige cuenta de destino en una
  transferencia (`transferencia_con_destino`), pero no prohíbe que la traiga un gasto, ni que una
  transferencia vaya de una cuenta a sí misma: las dos cosas entrarían sin que nada avisara y
  dejarían un registro que no significa nada. El dominio de la API ya las rechaza (tarea [3.1](docs/08-plan-de-desarrollo.md#tarea-3-1)), y la
  base tendría que hacerlo también. Ya no se pueden sumar a la migración inicial —está aplicada, y
  una migración aplicada no se edita ([ADR-004](docs/adr/ADR-004-base-solo-escritura.md))—: van en una migración nueva y con nombre explícito,
  como pide [04 §4.1](docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes). Antes hay que escribirlas en el [04](docs/04-modelo-de-datos.md), que es donde se decide qué debe existir.
- **`cuentas` no tiene RLS, y [RF-97](docs/03-requisitos-y-bdd.md#rf-97) dice que solo Gerencia crea cuentas.** [04 §7](docs/04-modelo-de-datos.md#7-seguridad-por-tipo-de-usuario-rls) la deja a
  propósito sin política, porque los dos tipos trabajan con ella todo el día. Pero entonces el
  «solo Gerencia» del contrato de la [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17) no lo puede imponer la base, y quedaría en un `if` de
  la API, que es justo lo que [ADR-006](docs/adr/ADR-006-rls-por-rol.md) evita. La [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10) tiene que decidirlo: una política de
  `INSERT` sobre `cuentas` —y otra sobre `categorias`— o dejar dicho por qué aquí sí basta la API.
- **Las reglas del dominio todavía no tienen código del catálogo.** `Movimiento`, `Pedido` y
  `Costeo` rechazan lo que no se puede registrar con excepciones de Java, y hoy eso saldría como
  `50000`, «algo salió mal». La traducción a códigos de cinco dígitos con su mensaje en español
  llega con los endpoints y con los contratos que los acuerdan (tareas [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8), [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4) y [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13)): hasta
  entonces, ninguno de esos mensajes es el que verá el taller.
- **El cuadro de márgenes ya decide cosas que el contrato de la [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10) tiene que llevar.** La [5.6](docs/08-plan-de-desarrollo.md#tarea-5-6)
  dejó en el dominio la lectura de cada producto, su nivel de alerta, el texto con los montos, la
  mediana contra la que se leyó y los dos órdenes del cuadro. Si el contrato no los trae, el front de
  la [5.9](docs/08-plan-de-desarrollo.md#tarea-5-9) tendría que volver a ordenar y a decidir qué pinta en rojo, que es lo que [ADR-018](docs/adr/ADR-018-front-sin-decisiones.md) prohíbe.
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
  crea quien dirige. Y `prisma_db` todavía no tiene ninguna etiqueta `esquema-v…`, aunque su
  esquema ya esté aplicado: etiquetarlo es parte de la promoción que tiene que escribir la [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12).
- **Sin qa hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9)** ([ADR-026](docs/adr/ADR-026-railway-al-final.md)): mientras tanto, «terminado» es fusionado a `develop` con la
  integración continua en verde.
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
- **El servicio de Railway conectado a `prisma_front`** intenta construir en cada push y falla,
  porque todavía no hay receta de construcción para Flutter. Conviene desconectarlo hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9).
- **`dart.yml` del front** es la plantilla de GitHub y falla con Flutter. Se dejó a propósito; la
  integración continua de verdad es `ci.yml`.

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

**Del contrato sin GET ([ADR-030](docs/adr/ADR-030-contrato-sin-get.md)):**

- [ ] La copia fijada de `prisma_api` declara el contrato `0.5.0` aunque solo sirva dos de sus 26 operaciones. Declara contra qué versión está escrita, no cuánto implementa; dejarla en `0.2.0` habría dado dos contratos distintos con el mismo número
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
- [ ] **La Data API del proyecto expone `public`**, así que las seis tablas sin RLS se pueden leer
      con la clave anónima. Nadie debe hablar con la base salvo `prisma_api`: lo coherente sería
      apagar la Data API o revocarle el acceso a `anon`, y eso lo decide quien dirige
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
- [ ] **Los docs [07](docs/07-arquitectura.md) y [12](docs/12-pruebas-y-calidad.md) y el [ADR-015](docs/adr/ADR-015-validacion-tres-capas.md) nombran una restricción `movimientos_valor_positivo`
      que no existe.** El [04](docs/04-modelo-de-datos.md), que es el que manda sobre el esquema, hace de esa regla un dominio: quien
      rechaza un valor cero es `dinero_positivo_mayor_que_cero`. La tabla de traducción de la [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8)
      tiene que salir del [04](docs/04-modelo-de-datos.md) y no de los ejemplos de los otros tres
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
- [ ] 🔒 `POST /api/v0/consultas/cuentas` no devuelve saldos, ni a Gerencia: los saldos son la [3.12](docs/08-plan-de-desarrollo.md#tarea-3-12)
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

---

## Cómo se mantiene este archivo

- **Una tarea hecha es un commit, y el commit explica por qué** ([ADR-028](docs/adr/ADR-028-un-commit-por-tarea.md)). El asunto lleva el
  sprint y el número —`Sprint 3 / 3.11: marca de registro tardio`— y el cuerpo dice qué hace, qué se
  decidió y por qué, y cómo se verificó, incluido qué se rompió a propósito para ver fallar las
  pruebas. Dos tareas no van en un mismo commit aunque toquen la misma clase. Así `git log
  --oneline` es esta misma lista, en el orden en que se hizo.
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
