# Tareas de PRISMA

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [5.2.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/TODO.md "Historial de cambios") | [🔄 Vivo](docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-18 | [Plan](docs/INDICE.md#etiqueta-plan) · [Paralelo](docs/INDICE.md#etiqueta-paralelo) |

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

Las tres preguntas de siempre. Las secciones 2 a 6 enumeran **las 133 tareas del plan**, una por una
y con su marca; aquí está el resumen. Que no falte ninguna no depende de la memoria de nadie: la
herramienta compara el tablero con el plan y la verificación falla si alguna no está.

### 1.1 Sprint por sprint

<!-- generado:plan-tablero · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
| Sprint | Tareas | ✅ Hechas | 🚧 En progreso | ⬜ Pendientes | Días que faltan |
|---|---:|---:|---:|---:|---:|
| [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0) · Dos proyectos, cuatro ambientes, tubería y contrato de respuesta | 19 | 16 | 2 | 1 | 3,5 |
| [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) · Base de datos, RLS, identidad propagada e idempotencia | 20 | 16 | 0 | 4 | 5,5 |
| [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) · Acceso, usuarios, cargos y canal firmado | 20 | 13 | 0 | 7 | 7,5 |
| [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) · Movimientos | 13 | 4 | 0 | 9 | 10,5 |
| [Sprint 4](docs/08-plan-de-desarrollo.md#sprint-4) · Pedidos y anticipos | 10 | 1 | 0 | 9 | 11 |
| [Sprint 5](docs/08-plan-de-desarrollo.md#sprint-5) · Productos y costeo | 10 | 3 | 0 | 7 | 7 |
| [Sprint 6](docs/08-plan-de-desarrollo.md#sprint-6) · Reportes y KPIs | 10 | 0 | 0 | 10 | 15 |
| [Sprint 7](docs/08-plan-de-desarrollo.md#sprint-7) · Capital, retiros y patrimonio | 9 | 0 | 0 | 9 | 12,5 |
| [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) · Nómina, cotizador y cierre | 11 | 0 | 0 | 11 | 16 |
| [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) · Promoción, PWA y endurecimiento | 11 | 1 | 0 | 10 | 9,5 |
| **Total** | **133** | **54** | **2** | **77** | **98** |
<!-- /generado:plan-tablero -->

### 1.2 ✅ Hecho

Lo que tiene su commit en `develop` con la integración continua en verde, que es lo que la
[definición de terminado](docs/08-plan-de-desarrollo.md#4-definición-de-terminado) exige mientras no exista el ambiente qa ([ADR-026](docs/adr/ADR-026-railway-al-final.md)).

| Carril | Qué hay | Tareas |
|---|---|---|
| **API · cimientos** | Esqueleto hexagonal con su regla de dependencias verificada, el sobre `{status, mensaje, data}` en toda respuesta, el catálogo de códigos de cinco dígitos, la consulta de versión, el descriptor de formulario, el contrato v0.5.0 fijado y los hilos virtuales de Java 25 | [0.1](docs/08-plan-de-desarrollo.md#tarea-0-1) · [0.2](docs/08-plan-de-desarrollo.md#tarea-0-2) · [0.6](docs/08-plan-de-desarrollo.md#tarea-0-6) · [0.7](docs/08-plan-de-desarrollo.md#tarea-0-7) · [0.11](docs/08-plan-de-desarrollo.md#tarea-0-11) · [0.14](docs/08-plan-de-desarrollo.md#tarea-0-14) … [0.18](docs/08-plan-de-desarrollo.md#tarea-0-18) |
| **API · dominio** | `Dinero`; `Movimiento` con los nueve tipos y su efecto sobre las tres cifras; `Pedido` con sus cinco estados; `Producto`, `Costeo` partido en materia y tiempo, la tarifa por hora, los tres márgenes y el cuadro que lee cada producto contra el resto del taller; y `RegistrarMovimiento`, el primer caso de uso, con la marca de registro tardío | [1.9](docs/08-plan-de-desarrollo.md#tarea-1-9) · [3.1](docs/08-plan-de-desarrollo.md#tarea-3-1) · [3.2](docs/08-plan-de-desarrollo.md#tarea-3-2) · [3.11](docs/08-plan-de-desarrollo.md#tarea-3-11) · [4.1](docs/08-plan-de-desarrollo.md#tarea-4-1) · [5.1](docs/08-plan-de-desarrollo.md#tarea-5-1) · [5.3](docs/08-plan-de-desarrollo.md#tarea-5-3) · [5.6](docs/08-plan-de-desarrollo.md#tarea-5-6) |
| **API · la base** | `ConIdentidad`, **la única puerta a PostgreSQL**: abre la transacción, le dice a la base quién pregunta y se vuelve `authenticated`, y fuera de ella ninguna consulta sale —ni por un `DataSource` o un `@Transactional` de otra clase, que ArchUnit impide—. Probada contra la base local conectada como `prisma_api`: Gerencia ve el pro-labore, Operación no, y la conexión vuelve al pool sin la identidad de nadie. **Y el libro ya llega a la base**: `MovimientosEnPostgres` guarda lo que `RegistrarMovimiento` decide, con el autor y el instante que puso el caso de uso; registrar a nombre de otra persona lo rechaza `mov_insercion` y no un `if`, y la bitácora la escribe el trigger con la persona de la sesión | [1.6](docs/08-plan-de-desarrollo.md#tarea-1-6) · [3.3](docs/08-plan-de-desarrollo.md#tarea-3-3) |
| **API · el acceso** | Las cuatro operaciones de `/sesiones` contra Supabase Auth, el **canal firmado** comprobando cada petición y la navegación que dicta qué ve cada sesión. La sesión dura 30 días en la cookie `prisma_renovacion` —`HttpOnly`, así que el front no la ve—, cada renovación estrena token y clave de firma, y un token vencido responde `40100` para que el cliente renueve en vez de mandar a la pantalla de acceso | [2.1](docs/08-plan-de-desarrollo.md#tarea-2-1) · [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2) · [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12) · [2.13](docs/08-plan-de-desarrollo.md#tarea-2-13) · [2.14](docs/08-plan-de-desarrollo.md#tarea-2-14) |
| **API y Front · las personas** | **Quién entra al sistema, administrado desde el sistema**: crear con clave temporal, editar el nombre, el cargo y el tipo, desactivar con motivo escrito y restablecer la contraseña —que además corta las sesiones abiertas—. **Ni un permiso vive en la API**: crear lo autoriza `usuarios_insercion`, y al último usuario activo de Gerencia lo rechaza un trigger que estaba puesto desde el esquema inicial. La identidad se crea contra GoTrue con la clave de servicio, acotada a eso por el [ADR-033](docs/adr/ADR-033-service-role-solo-en-auth.md) y vigilada por una prueba que rompe la compilación si aparece en otro archivo | [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) |
| **Front** | El proyecto Flutter con su integración continua, la insignia de versión y ambiente, el bloqueo por MAJOR incompatible y `Dinero` en Dart | [0.3](docs/08-plan-de-desarrollo.md#tarea-0-3) · [0.12](docs/08-plan-de-desarrollo.md#tarea-0-12) · [0.13](docs/08-plan-de-desarrollo.md#tarea-0-13) · [1.9](docs/08-plan-de-desarrollo.md#tarea-1-9) |
| **Front · sistema de diseño** | La tabla, el panel de confirmación en línea, la píldora de estado y los formatos colombianos de fecha y porcentaje; el cliente HTTP con clave de idempotencia; y el panel «Acerca de» | [0.19](docs/08-plan-de-desarrollo.md#tarea-0-19) · [1.19](docs/08-plan-de-desarrollo.md#tarea-1-19) · [2.10](docs/08-plan-de-desarrollo.md#tarea-2-10) |
| **Front · formularios** | El renderizador del descriptor: pinta los campos que manda la API con su teclado, sus límites, sus opciones y sus avisos, y no trae ninguna regla propia | [1.18](docs/08-plan-de-desarrollo.md#tarea-1-18) |
| **Front · la sesión** | **La puerta**: sin sesión se ve «Entra con tu usuario», y quien entra con una clave temporal va a «Crea tu contraseña» en vez de al tablero —que ni siquiera se construye hasta que la cambie—. Los dos formularios los manda la API, y los rechazos también: el «Usuario o contraseña incorrectos» que se lee en pantalla no está escrito en ninguna parte del front. **Recargar la página ya no saca a nadie**: lo primero que hace la aplicación al abrirse es renovar con la cookie, y si un token vence a media jornada el cliente lo repone y reintenta sin que se note. Arriba, la identidad con su menú de la sesión; a la izquierda, el menú que dicta la API | [2.6](docs/08-plan-de-desarrollo.md#tarea-2-6) · [2.2](docs/08-plan-de-desarrollo.md#tarea-2-2) · [2.12](docs/08-plan-de-desarrollo.md#tarea-2-12) · [2.14](docs/08-plan-de-desarrollo.md#tarea-2-14) |
| **Front · sin conexión** | La PWA con su manifiesto en español y la cola local en IndexedDB: cada intención se guarda con su clave **antes** de intentar enviarse, y se reintenta con la espera de [17 §5.2](docs/17-resiliencia-offline-y-cache.md#52-cuánto-se-espera-entre-reintentos) hasta que la API la acepte o la rechace con motivo | [9.1](docs/08-plan-de-desarrollo.md#tarea-9-1) |
| **Contrato** | El contrato v0.4.0 en [`contrato/openapi.json`](contrato/openapi.json): el sobre, el descriptor con sus listas, cuentas y categorías, y **el [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) entero acordado antes de implementarlo** —`/sesiones`, `/usuarios`, `/cargos`, `/bitacora`, `/navegacion` y las tres cabeceras del canal firmado— | [0.15](docs/08-plan-de-desarrollo.md#tarea-0-15) · [0.18](docs/08-plan-de-desarrollo.md#tarea-0-18) · [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17) · [2.19](docs/08-plan-de-desarrollo.md#tarea-2-19) |
| **Base** | **El esquema ya no está solo escrito: está probado contra una base.** 24 tablas con la semilla del mockup, los nueve dominios de [04 §4.1](docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes) en sus 61 columnas, toda restricción con nombre explícito, `DELETE` y `TRUNCATE` revocados a todo el que no sea el dueño, los catorce triggers de auditoría escribiendo y las 34 políticas juzgando a una sesión de verdad —Operación no alcanza los retiros ni el pro-labore; Gerencia sí—, también sobre el catálogo de cargos, que lee todo el mundo y escribe solo Gerencia, y sobre las claves de idempotencia, que cada persona alcanza solo si son suyas, Gerencia incluida. `schema_version` y el rol `prisma_api`, con el que **RLS ya juzga a la API**. La semilla es fija, re-ejecutable y con filas en toda tabla que preguntan las pruebas de permisos, y `sembrar.ps1` la lleva a dev y a qa sin dejarla acercarse a uat ni a prod. Y esto ya no es solo dev: **qa quedó al día con la promoción de la [1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)**, con sus 109 comprobaciones en `OK` y `schema_version` en `0.3.0` | [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) · [0.5](docs/08-plan-de-desarrollo.md#tarea-0-5) · [0.10](docs/08-plan-de-desarrollo.md#tarea-0-10) · [1.1](docs/08-plan-de-desarrollo.md#tarea-1-1) … [1.5](docs/08-plan-de-desarrollo.md#tarea-1-5) · [1.11](docs/08-plan-de-desarrollo.md#tarea-1-11) · [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13) · [2.3](docs/08-plan-de-desarrollo.md#tarea-2-3) · [2.4](docs/08-plan-de-desarrollo.md#tarea-2-4) |
| **Decisión** | Cuatro repositorios ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)), Java 25 y Gradle ([ADR-024](docs/adr/ADR-024-java-25-y-gradle.md)), Railway al final ([ADR-026](docs/adr/ADR-026-railway-al-final.md)), documentación versionada ([ADR-027](docs/adr/ADR-027-documentacion-versionada.md)), el esquema por etiqueta ([ADR-029](docs/adr/ADR-029-esquema-por-etiqueta.md)) y el mockup confirmado ([H0](docs/08-plan-de-desarrollo.md#h0)) | [1.20](docs/08-plan-de-desarrollo.md#tarea-1-20) |

**565 pruebas en verde en la API** —y 68 más contra la base local— y 229 en el front. El dominio se prueba con las cifras de los
documentos [05](docs/05-reglas-financieras.md) y [06](docs/06-nomina-y-capacidad-de-pago.md): si una prueba falla, o se rompió el código o el documento dice
otra cosa.

### 1.3 🚧 En progreso

Nada en las manos ahora mismo.

**🚧 El alta de usuarios está caída en dev, y el arreglo espera revisión.** Crear a alguien responde
«algo salió mal» con cualquier nombre de usuario: falta `SUPABASE_SERVICE_ROLE_KEY` en el despliegue
de la API, y el fallo no sabía decirlo porque `ProveedorNoDisponible` no tenía código propio. Deja
sin servir la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) recién terminada. Carril **API**, rama `feature/gestion-de-usuarios-arreglo`
en los dos repositorios, anotado el 2026-09-18. El plan es `plan/23-el-alta-decia-algo-salio-mal.md`.
Es un arreglo suelto: no lleva número de tarea y no entra en las cuentas de abajo. **Falta cargar la
variable en Railway**, que es lo único que el código no puede hacer solo.

**Lo siguiente, en cuanto alguien lo tome:** cerrar la base del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) destrabó lo que la estaba
esperando. En el carril API, con la identidad llegando ya a PostgreSQL ([1.6](docs/08-plan-de-desarrollo.md#tarea-1-6)), se abren la prueba
de permisos con sesión real ([1.7](docs/08-plan-de-desarrollo.md#tarea-1-7)) y la traducción de restricción a código del catálogo ([1.8](docs/08-plan-de-desarrollo.md#tarea-1-8)) —que ya
tiene de dónde salir: cada restricción se llama como la llama el [04](docs/04-modelo-de-datos.md)—. El filtro de idempotencia
([1.14](docs/08-plan-de-desarrollo.md#tarea-1-14)) ya salió de esa lista: necesitaba la transacción de la [1.6](docs/08-plan-de-desarrollo.md#tarea-1-6) y la tabla de la [1.13](docs/08-plan-de-desarrollo.md#tarea-1-13), y con las dos
quedó hecho; detrás de él se abre la prueba de corte ([1.15](docs/08-plan-de-desarrollo.md#tarea-1-15)). En el carril Base, con
`cargos` ([2.3](docs/08-plan-de-desarrollo.md#tarea-2-3)), la tabla de idempotencia ([1.13](docs/08-plan-de-desarrollo.md#tarea-1-13)), su purga ([1.16](docs/08-plan-de-desarrollo.md#tarea-1-16)) y la semilla reproducible
([1.11](docs/08-plan-de-desarrollo.md#tarea-1-11)) cerradas, siguen la primera promoción a qa ([1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)) y la tabla `usuarios` ([2.4](docs/08-plan-de-desarrollo.md#tarea-2-4)). El
carril Contrato, con los de los sprints 3 a 8. **El acceso está cerrado de punta a punta**: con la
sesión de 30 días ([2.2](docs/08-plan-de-desarrollo.md#tarea-2-2)) se entra, se recarga la página y se sigue dentro, se sale por el menú de
la sesión y quien entra con clave temporal la cambia y llega al tablero. Y con la [2.7](docs/08-plan-de-desarrollo.md#tarea-2-7) **Gerencia ya
puede dar de alta a alguien**, que era lo último que solo sabía hacer `seed.sql`. Lo que queda del
[Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) es el catálogo de cargos ([2.8](docs/08-plan-de-desarrollo.md#tarea-2-8)), el registro de cada ingreso ([2.9](docs/08-plan-de-desarrollo.md#tarea-2-9)) y lo que cuelga de
la pantalla de usuarios: su tabla completa ([2.15](docs/08-plan-de-desarrollo.md#tarea-2-15)), la bitácora ([2.16](docs/08-plan-de-desarrollo.md#tarea-2-16)) y la clave
obligatoria al reactivar ([2.17](docs/08-plan-de-desarrollo.md#tarea-2-17)). **Con la [2.18](docs/08-plan-de-desarrollo.md#tarea-2-18) el carril Front cerró su parte del sprint:**
Gerencia ya mira la pantalla como la ve la empleada, y sale de ahí con un clic. **Y el [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) arrancó por lo que más
destrababa: el libro ya llega a PostgreSQL** ([3.3](docs/08-plan-de-desarrollo.md#tarea-3-3)). A los endpoints de movimientos ([3.4](docs/08-plan-de-desarrollo.md#tarea-3-4)) ya solo les
falta su contrato ([3.13](docs/08-plan-de-desarrollo.md#tarea-3-13)), medio día que además abre el registro rápido del front ([3.5](docs/08-plan-de-desarrollo.md#tarea-3-5)). La
lista al día la calcula la herramienta, y está justo abajo.

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
| **API** | [0.8](docs/08-plan-de-desarrollo.md#tarea-0-8) · [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7) · [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) · [1.15](docs/08-plan-de-desarrollo.md#tarea-1-15) · [2.8](docs/08-plan-de-desarrollo.md#tarea-2-8) · [2.9](docs/08-plan-de-desarrollo.md#tarea-2-9) · [2.15](docs/08-plan-de-desarrollo.md#tarea-2-15) · [2.17](docs/08-plan-de-desarrollo.md#tarea-2-17) · [3.12](docs/08-plan-de-desarrollo.md#tarea-3-12) · [4.4](docs/08-plan-de-desarrollo.md#tarea-4-4) · [5.4](docs/08-plan-de-desarrollo.md#tarea-5-4) · [5.7](docs/08-plan-de-desarrollo.md#tarea-5-7) |
| **Base** | [2.5](docs/08-plan-de-desarrollo.md#tarea-2-5) |
| **Contrato** | [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13) · [4.10](docs/08-plan-de-desarrollo.md#tarea-4-10) · [5.10](docs/08-plan-de-desarrollo.md#tarea-5-10) · [6.10](docs/08-plan-de-desarrollo.md#tarea-6-10) · [7.9](docs/08-plan-de-desarrollo.md#tarea-7-9) · [8.11](docs/08-plan-de-desarrollo.md#tarea-8-11) |
| **Decisión** | [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) |
<!-- /generado:plan-listas-ya -->

### 1.5 Cuánto falta

<!-- generado:plan-restante · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
Quedan **79 tareas y 98 días de trabajo** de 133 tareas del plan.

| Carriles activos | Desarrollo que falta | Con la estabilización |
|:---:|---:|---:|
| 1 | 14,7 semanas | **17,7 semanas** |
| 2 | 8,3 semanas | **11,3 semanas** |
| 3 | 6,7 semanas | **9,7 semanas** |
<!-- /generado:plan-restante -->

### 1.6 Para destrabar, en orden de lo que más libera

El orden sale de las dependencias del [plan](docs/08-plan-de-desarrollo.md): cuántas tareas pendientes cuelgan de cada una, directa
o indirectamente. No es el orden en que se descubrieron.

- [ ] ⚡ **El contrato de movimientos** ([3.13](docs/08-plan-de-desarrollo.md#tarea-3-13)) — **32 tareas detrás** por medio día de trabajo,
      y sin nada pendiente que lo detenga. **Con el repositorio hecho, es lo único que les falta a los
      endpoints** ([3.4](docs/08-plan-de-desarrollo.md#tarea-3-4)). Un contrato se acuerda **antes** de implementarlo
      ([21 §3.2](docs/21-trabajo-en-paralelo.md#32-contrato-acordado-y-contrato-generado-no-se-contradicen)): escribirlo tarde deja al carril Front esperando al API, que es justo lo que
      el paralelismo quiere evitar.
- [x] **Poner qa al día** ([1.12](docs/08-plan-de-desarrollo.md#tarea-1-12)) — hecho: **dev y qa vuelven a ser el mismo esquema**, y con eso se
      destraba la prueba de permisos contra qa ([2.11](docs/08-plan-de-desarrollo.md#tarea-2-11)). El retrato de antes desmintió al tablero en
      lo que más importaba: qa **sí** rechazaba ya el saldo negativo, el sobre del 120 % y el motivo
      en blanco, porque los dominios ([1.1](docs/08-plan-de-desarrollo.md#tarea-1-1)) y la revocación del borrado ([1.2](docs/08-plan-de-desarrollo.md#tarea-1-2)) llevaban tiempo
      aplicados allá. Lo que de verdad le faltaba eran cinco migraciones: las claves de idempotencia
      ([1.13](docs/08-plan-de-desarrollo.md#tarea-1-13)), su purga ([1.16](docs/08-plan-de-desarrollo.md#tarea-1-16)), las dos tablas del canal firmado ([2.20](docs/08-plan-de-desarrollo.md#tarea-2-20)) y las dos filas de versión.
      De 45 comprobaciones en falla a **109 en `OK`**. Queda al revés: dev sin la `0.3.0`.
- [ ] ⚡ **uat y prod** · Decisión — son los dos proyectos de Supabase que faltan para cerrar [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4), y
      los dos son **de pago** ([19 §8.1](docs/19-ambientes-y-entrega.md#81-qué-se-paga-y-qué-no)). **Ya no falta averiguar nada:** el expediente está en el
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
- [ ] ⚡ [**0.4**](docs/08-plan-de-desarrollo.md#tarea-0-4) Los cuatro proyectos de Supabase · Decisión — **dev y qa** configurados, con el
      esquema, la semilla y el rol `prisma_api`; faltan uat y prod, que son de pago y los decide
      Gerencia
- [x] [**0.5**](docs/08-plan-de-desarrollo.md#tarea-0-5) Rol `prisma_api` sin `BYPASSRLS`, sin `SUPERUSER` y sin ser dueño de las tablas ·
      Base — creado en dev y en qa; en dev ya se comprobó que RLS lo juzga
- [x] [**0.6**](docs/08-plan-de-desarrollo.md#tarea-0-6) Secretos fuera del repositorio: variables de entorno en la API y `--dart-define` en el
      front · API, Front
- [x] [**0.7**](docs/08-plan-de-desarrollo.md#tarea-0-7) Integración continua por proyecto: formato, análisis, pruebas y compilación · API, Front
- [ ] 🚧⚡ [**0.8**](docs/08-plan-de-desarrollo.md#tarea-0-8) Imagen de la API arrancando **en dev**, en Railway ([ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md)). El `Dockerfile` ya existía;
      lo que faltaba era que la aplicación leyera el `PORT` que le inyectan —hoy lo ignora y queda
      inalcanzable con el proceso vivo— y que la sonda de disponibilidad mirara la base en vez de
      responder `UP` con ella caída. Los otros tres ambientes, en el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9) · API
- [ ] 🚧🔒 [**0.9**](docs/08-plan-de-desarrollo.md#tarea-0-9) Entrega a dev al fusionar ([ADR-032](docs/adr/ADR-032-railway-en-dev-ahora.md)), con la receta de construcción del front
      —`Dockerfile`, `nginx` y `.dockerignore`— que hasta ahora no existía · API, Front
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
- [ ] ⚡ [**1.15**](docs/08-plan-de-desarrollo.md#tarea-1-15) Prueba de corte entre el efecto y la clave · API
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
- [ ] ⚡ [**2.8**](docs/08-plan-de-desarrollo.md#tarea-2-8) Catálogo de cargos · API, Front
- [ ] ⚡ [**2.9**](docs/08-plan-de-desarrollo.md#tarea-2-9) Registro de cada inicio de sesión con fecha, dispositivo e IP · API, Base
- [x] [**2.10**](docs/08-plan-de-desarrollo.md#tarea-2-10) Panel «Acerca de» ([RF-100](docs/03-requisitos-y-bdd.md#rf-100)) · Front, API — los seis datos de [19 §5.3](docs/19-ambientes-y-entrega.md#53-el-panel-acerca-de), y lo que
      no se pudo consultar lo dice en vez de inventarlo
- [ ] 🔒 [**2.11**](docs/08-plan-de-desarrollo.md#tarea-2-11) La prueba de permisos del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1), también contra la base de qa · API
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
- [ ] ⚡ [**2.15**](docs/08-plan-de-desarrollo.md#tarea-2-15) Tabla única de usuarios activos y desactivados ([RF-84](docs/03-requisitos-y-bdd.md#rf-84) a [RF-87](docs/03-requisitos-y-bdd.md#rf-87)) · API, Front
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
- [ ] 🔒 [**3.4**](docs/08-plan-de-desarrollo.md#tarea-3-4) Endpoints de movimientos con sus códigos del catálogo · API
- [ ] 🔒 [**3.5**](docs/08-plan-de-desarrollo.md#tarea-3-5) Formulario de registro rápido para celular, pintado del descriptor · Front
- [ ] 🔒 [**3.6**](docs/08-plan-de-desarrollo.md#tarea-3-6) Foto del recibo comprimida, subida a través de la API · Front, API
- [ ] 🔒 [**3.7**](docs/08-plan-de-desarrollo.md#tarea-3-7) Transferencias entre cuentas · API
- [ ] 🔒 [**3.8**](docs/08-plan-de-desarrollo.md#tarea-3-8) Listado con filtros · API, Front
- [ ] 🔒 [**3.9**](docs/08-plan-de-desarrollo.md#tarea-3-9) Anulación con motivo obligatorio · API, Front
- [ ] 🔒 [**3.10**](docs/08-plan-de-desarrollo.md#tarea-3-10) Corrección por contra-asiento · API
- [x] [**3.11**](docs/08-plan-de-desarrollo.md#tarea-3-11) Marca de registro tardío · API — más de 7 días entre lo que ocurrió y lo que se
      digitó, contados en días de Bogotá
- [ ] ⚡ [**3.12**](docs/08-plan-de-desarrollo.md#tarea-3-12) Saldos por cuenta · API
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
- [ ] ⚡ [**4.4**](docs/08-plan-de-desarrollo.md#tarea-4-4) `CobrarAnticipo`: crea pasivo, no ingreso · API
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
| 3 | Los cuatro proyectos de Supabase y el pago de uat y prod | Quien dirige crea; Gerencia paga | Tarea [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) | 🟡 dev y qa configurados, con el esquema y la semilla aplicados. **El expediente está listo y la cifra es ≈ 55 USD al mes** ([§7.1](#71-el-expediente-de-uat-y-prod)); falta la firma de Gerencia, que es el paso 2 del [09 §3.1](docs/09-plan-de-implantacion.md#31-alistamiento-técnico-de-los-ambientes) |
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
| 14 | Una sola licencia para los cuatro repositorios | Quien dirige | Nada técnico | ✅ **AGPL-3.0 en los cuatro**: PRISMA se sirve por la red y no se distribuye, y la sección 13 es lo único que obliga a publicar lo que alguien modifique de un servicio |
| 15 | Encabezado de licencia en cada archivo fuente | Quien dirige | Nada técnico | ⬜ Hoy no lo lleva ninguno. La AGPL lo recomienda, pero son cientos de archivos en tres lenguajes y el `LICENSE` del repositorio ya dice cuál rige |

**Lo que el modelo de datos todavía no define** ([`04-modelo-de-datos.md`](docs/04-modelo-de-datos.md)):

- [ ] La variante del trigger de auditoría para `usuarios`, que detecta `desactivado_en` · [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2)
- [ ] 🔒 El `CREATE TABLE` de `adjuntos` · [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3), tarea [3.6](docs/08-plan-de-desarrollo.md#tarea-3-6)
- [ ] 🔒 El `CREATE TABLE` de `cotizaciones` y `cotizacion_lineas` · [Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8), tarea [8.8](docs/08-plan-de-desarrollo.md#tarea-8-8)

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

`0.4` → [9.2](docs/08-plan-de-desarrollo.md#tarea-9-2) uat en pie → [9.3](docs/08-plan-de-desarrollo.md#tarea-9-3) promover sin recompilar y [9.5](docs/08-plan-de-desarrollo.md#tarea-9-5) permisos en los cuatro ambientes →
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
- [ ] ⚡ **La [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) no se marcó, y el plan 25 decía marcarla.** Pide «los cuatro proyectos de Supabase», y
      uat y prod **no existen**: marcarla sería escribir en el tablero algo que no es cierto, que es
      justo lo que acabó de costar trabajo descubrir en qa. Por lo mismo la fila 3 del [§7](#7-decisiones-pendientes) sigue en 🟡 y
      no pasó a ✅: lo que está listo es el expediente, no la decisión. Pasan las dos el día que
      Gerencia firme y los proyectos existan
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
- [ ] ⚡ **`cargos-asignables` entra con esta tarea y no con la [2.8](docs/08-plan-de-desarrollo.md#tarea-2-8)**, que es la del catálogo de
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
- [ ] **La traducción de restricción a código está escrita a mano en `UsuariosEnPostgres`**, y
      desde la [3.3](docs/08-plan-de-desarrollo.md#tarea-3-3) también en `MovimientosEnPostgres`, que por ahora solo traduce el rechazo de
      permisos. Mira el nombre de la restricción y el texto del `RAISE EXCEPTION`, que es lo que el [04](docs/04-modelo-de-datos.md)
      permite al exigir nombres explícitos. La tabla general es la [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8), y cuando exista estos
      métodos se van con ella: con dos adaptadores buscando el mismo texto, cada uno que llegue antes
      que ella lo copia otra vez

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
- [ ] **Siguen cayendo al `50000` cuatro rechazos de `usuarios`** que `UsuariosEnPostgres.traducir`
      no conoce: `usuarios_nombre_completo_minimo`, `usuarios_id_fkey`, `usuarios_pkey` y
      `motivo_con_contenido`. Se dejaron fuera a propósito —se disparan con valores concretos y no
      con cualquiera, así que no eran lo que tenía el alta caída— y los recoge la [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8)
- [ ] **`@Size(min = 3)` sobre `nombreCompleto` no recorta y el `CHECK` de la base sí**, así que
      `"  a"` pasa la validación del formulario y lo rechaza PostgreSQL. Alcanzable desde la
      pantalla, y hoy sale como error del sistema

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
- [ ] **Solo se traduce el rechazo de permisos, que sale como `40300`.** La llave primaria, las
      foráneas y los `CHECK` de `movimientos` salen sin traducir hasta que el contrato de la [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13) les
      dé código y la [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4) los emita. Tres de ellos los ataja antes el dominio; los otros —una cuenta
      o una categoría que no existe, un id repetido— hoy saldrían como `50000`, y todavía no hay
      endpoint que los alcance
- [ ] **El mismo id dos veces lo rechaza la llave primaria, y no se traga en silencio.** El id lo
      pone quien pide, al decidir la acción ([ADR-020](docs/adr/ADR-020-idempotencia.md)): si la clave de idempotencia ya se purgó y la
      misma acción vuelve, el libro no la duplica. Qué responde la API en ese caso es del contrato
- [ ] **Un movimiento que llega anulado no se guarda como nuevo**: el adaptador lo rechaza antes de
      pedir conexión. Ningún documento lo pedía, pero el `INSERT` no escribe la anulación, y
      guardarlo así la habría perdido sin avisar
- [ ] **`RegistrarMovimiento` todavía no está cableado.** El bean y su `Clock` los pone su primer
      consumidor, que es la [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4); el adaptador sí es un bean desde ya

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
