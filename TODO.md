# Tareas de PRISMA

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [1.1.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/TODO.md "Historial de cambios") | [🔄 Vivo](docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-16 | [Plan](docs/INDICE.md#etiqueta-plan) · [Paralelo](docs/INDICE.md#etiqueta-paralelo) |

Lo hecho y lo pendiente, con los números de tarea del
[plan de desarrollo](docs/08-plan-de-desarrollo.md). El plan dice **qué** hay que hacer, **en qué
carril** y **de qué depende**; este archivo dice **en qué va**. Si discrepan sobre qué hay que
hacer, manda el plan.

| Marca | Significa | Quién la pone |
|---|---|---|
| `[x]` | **Hecha** y verificada: pruebas en verde y commit en `main` | Quien la termina |
| 🚧 | **En progreso:** alguien la tiene en las manos ahora | Quien la toma |
| ⚡ | **Puede empezar hoy:** todo lo que necesita ya está hecho | La herramienta, del plan |
| 🔒 | Espera a otra tarea que todavía no está hecha | La herramienta, del plan |
| ✏️ | Escrita pero sin verificar: SQL que todavía no corrió contra ninguna base | Quien la escribe |
| ⏭️ | Movida a otro sprint | La herramienta, del plan |

Cada tarea dice su **carril**: **API** (`prisma_api`), **Base** (`prisma_db`), **Front**
(`prisma_front`), **Contrato** (`contrato/`, los dos lados) o **Decisión** (sin código).

---

## 1. Hecho, en progreso y pendiente

Las tres preguntas de siempre. El detalle tarea por tarea está en las secciones 2 a 6, con la misma
marca al lado de cada una; aquí está el resumen.

### 1.1 ✅ Hecho

Lo que tiene su commit en `main` con la integración continua en verde, que es lo que la
[definición de terminado](docs/08-plan-de-desarrollo.md#4-definición-de-terminado) exige mientras no exista el ambiente qa ([ADR-026](docs/adr/ADR-026-railway-al-final.md)).

| Carril | Qué hay | Tareas |
|---|---|---|
| **API · cimientos** | Esqueleto hexagonal con su regla de dependencias verificada, el sobre `{status, mensaje, data}` en toda respuesta, el catálogo de códigos de cinco dígitos, `GET /version`, el descriptor de formulario, el contrato v0.2.0 fijado y los hilos virtuales de Java 25 | [0.1](docs/08-plan-de-desarrollo.md#tarea-0-1) · [0.2](docs/08-plan-de-desarrollo.md#tarea-0-2) · [0.6](docs/08-plan-de-desarrollo.md#tarea-0-6) · [0.7](docs/08-plan-de-desarrollo.md#tarea-0-7) · [0.11](docs/08-plan-de-desarrollo.md#tarea-0-11) · [0.14](docs/08-plan-de-desarrollo.md#tarea-0-14) … [0.18](docs/08-plan-de-desarrollo.md#tarea-0-18) |
| **API · dominio** | `Dinero`; `Movimiento` con los nueve tipos y su efecto sobre las tres cifras; `Pedido` con sus cinco estados; `Producto`, `Costeo` y los tres márgenes; y `RegistrarMovimiento`, el primer caso de uso, con la marca de registro tardío | [1.9](docs/08-plan-de-desarrollo.md#tarea-1-9) · [3.1](docs/08-plan-de-desarrollo.md#tarea-3-1) · [3.2](docs/08-plan-de-desarrollo.md#tarea-3-2) · [3.11](docs/08-plan-de-desarrollo.md#tarea-3-11) · [4.1](docs/08-plan-de-desarrollo.md#tarea-4-1) · [5.1](docs/08-plan-de-desarrollo.md#tarea-5-1) |
| **Front** | El proyecto Flutter con su integración continua, la insignia de versión y ambiente, el bloqueo por MAJOR incompatible y `Dinero` en Dart | [0.3](docs/08-plan-de-desarrollo.md#tarea-0-3) · [0.12](docs/08-plan-de-desarrollo.md#tarea-0-12) · [0.13](docs/08-plan-de-desarrollo.md#tarea-0-13) · [1.9](docs/08-plan-de-desarrollo.md#tarea-1-9) |
| **Base** | **Nada aplicado todavía.** Las 22 tablas, la auditoría y las políticas RLS están escritas en la migración inicial y esperan al proyecto dev de Supabase | — |
| **Decisión** | Cuatro repositorios ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)), Java 25 y Gradle ([ADR-024](docs/adr/ADR-024-java-25-y-gradle.md)), Railway al final ([ADR-026](docs/adr/ADR-026-railway-al-final.md)), documentación versionada ([ADR-027](docs/adr/ADR-027-documentacion-versionada.md)) y el mockup confirmado ([H0](docs/08-plan-de-desarrollo.md#h0)) | — |

**330 pruebas en verde en la API** y 28 en el front. El dominio se prueba con las cifras de los
documentos [05](docs/05-reglas-financieras.md) y [06](docs/06-nomina-y-capacidad-de-pago.md): si una prueba falla, o se rompió el código o el documento dice
otra cosa.

### 1.2 🚧 En progreso

| Tarea | Carril | Qué hay y qué falta |
|---|---|---|
| [**5.3**](docs/08-plan-de-desarrollo.md#tarea-5-3) · Costeo unitario | API | La fórmula de [05 §7.1](docs/05-reglas-financieras.md#71-costo-unitario) y su prueba llegaron con la tarea [5.1](docs/08-plan-de-desarrollo.md#tarea-5-1). Falta atarla a cada producto con su historial de costos ([5.5](docs/08-plan-de-desarrollo.md#tarea-5-5)) y el tiempo de máquina del bordado ([5.4](docs/08-plan-de-desarrollo.md#tarea-5-4)) |

**Lo siguiente, en cuanto alguien lo tome:** el carril Front puede arrancar los tres que tiene
listos —el sistema de diseño ([0.19](docs/08-plan-de-desarrollo.md#tarea-0-19)), el cliente HTTP con clave de idempotencia ([1.19](docs/08-plan-de-desarrollo.md#tarea-1-19)) y el
panel «Acerca de» ([2.10](docs/08-plan-de-desarrollo.md#tarea-2-10))—, y el carril Contrato, el de cuentas y categorías ([1.17](docs/08-plan-de-desarrollo.md#tarea-1-17)), que
destraba la [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10) en los dos lados. En el carril API, fuera de la [5.3](docs/08-plan-de-desarrollo.md#tarea-5-3), lo que sigue espera a la base.
La lista al día la calcula la herramienta, y está justo abajo.

> **El carril API no llega más lejos en el [Sprint 3](docs/08-plan-de-desarrollo.md#sprint-3) sin base de datos.** El repositorio de
> movimientos ([3.3](docs/08-plan-de-desarrollo.md#tarea-3-3)) necesita la transacción con identidad ([1.6](docs/08-plan-de-desarrollo.md#tarea-1-6)), y esa espera al proyecto dev
> de Supabase ([0.4](docs/08-plan-de-desarrollo.md#tarea-0-4)). Por eso lo hecho hoy es todo dominio y casos de uso: es exactamente la
> parte que se puede construir y probar sin ella.

### 1.3 ⬜ Pendiente: lo que puede empezar hoy, en paralelo

Calculado de las dependencias del plan con lo marcado como hecho. Cada fila es un carril: **todo lo
de una misma fila se puede trabajar a la vez que lo de las demás.**

<!-- generado:plan-listas-ya · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
| Carril | Pueden empezar hoy, porque todo lo que necesitan ya está hecho |
|---|---|
| **API** | [5.3](docs/08-plan-de-desarrollo.md#tarea-5-3) |
| **Front** | [0.19](docs/08-plan-de-desarrollo.md#tarea-0-19) · [1.19](docs/08-plan-de-desarrollo.md#tarea-1-19) · [2.10](docs/08-plan-de-desarrollo.md#tarea-2-10) |
| **Contrato** | [1.17](docs/08-plan-de-desarrollo.md#tarea-1-17) |
| **Decisión** | [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) · [1.20](docs/08-plan-de-desarrollo.md#tarea-1-20) |
<!-- /generado:plan-listas-ya -->

### 1.4 Cuánto falta

<!-- generado:plan-restante · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
Quedan **113 tareas y 138,5 días de trabajo** de 132 tareas del plan.

| Carriles activos | Desarrollo que falta | Con la estabilización |
|:---:|---:|---:|
| 1 | 20,8 semanas | **23,8 semanas** |
| 2 | 12,7 semanas | **15,7 semanas** |
| 3 | 10,8 semanas | **13,8 semanas** |
<!-- /generado:plan-restante -->

### 1.5 Para destrabar, en orden de lo que más libera

- [ ] ⚡ [**0.4**](docs/08-plan-de-desarrollo.md#tarea-0-4) · **Configurar el proyecto dev de Supabase.** Es la primera tarea de la cadena más
      larga del plan: todo el carril Base espera por ella. Guardar la contraseña de la base; iniciar
      sesión con `npx supabase login` y enlazar `prisma_db` con `npx supabase link` (el CLI se
      descarga la primera vez); y llenar `backend-api/.env` a partir de `.env.ejemplo`, que nunca se
      sube.
- [ ] ⚡ [**1.20**](docs/08-plan-de-desarrollo.md#tarea-1-20) · **Decidir cómo consiguen la API y su CI el esquema de `prisma_db`**: una etiqueta,
      un submódulo o una imagen de PostgreSQL con el esquema. Destraba las tareas [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7), [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) y [1.15](docs/08-plan-de-desarrollo.md#tarea-1-15).
      Dato útil: los ejecutores de GitHub Actions sí tienen Docker, aunque la máquina de desarrollo
      no.
- [ ] ⚡ [**1.17**](docs/08-plan-de-desarrollo.md#tarea-1-17) · **Contrato de cuentas y categorías.** Destraba la tarea [1.10](docs/08-plan-de-desarrollo.md#tarea-1-10) en los dos lados, y
      el contrato del [Sprint 2](docs/08-plan-de-desarrollo.md#sprint-2) depende de él.
- [ ] **Una sola licencia** · Decisión — este repositorio y el front están con AGPL-3.0; la API y la
      base, con GPL-3.0.

---

## 2. Sprint 0 · proyectos, ambientes y contrato

- [x] [**0.1**](docs/08-plan-de-desarrollo.md#tarea-0-1) Proyecto `prisma_api`: Java 25, Spring Boot 4 y Gradle, con el esqueleto hexagonal · API
- [x] [**0.2**](docs/08-plan-de-desarrollo.md#tarea-0-2) Regla de frontera con ArchUnit en la integración continua · API
- [x] [**0.3**](docs/08-plan-de-desarrollo.md#tarea-0-3) Proyecto `prisma_front` en Flutter, web por defecto · Front
- [ ] ⚡ [**0.4**](docs/08-plan-de-desarrollo.md#tarea-0-4) Los cuatro proyectos de Supabase · Decisión — dev ya existe y falta configurarlo; qa,
      uat y prod se crean antes de promover, y uat y prod son de pago
- [ ] 🔒 [**0.5**](docs/08-plan-de-desarrollo.md#tarea-0-5) Rol `prisma_api` sin `BYPASSRLS`, sin `SUPERUSER` y sin ser dueño de las tablas · Base
- [x] [**0.6**](docs/08-plan-de-desarrollo.md#tarea-0-6) Secretos fuera del repositorio: variables de entorno en la API y `--dart-define` en el
      front · API, Front
- [x] [**0.7**](docs/08-plan-de-desarrollo.md#tarea-0-7) Integración continua por proyecto: formato, análisis, pruebas y compilación · API, Front
- [ ] ⏭️ [**0.8**](docs/08-plan-de-desarrollo.md#tarea-0-8) Imagen de la API arrancando en los ambientes, en Railway ([ADR-026](docs/adr/ADR-026-railway-al-final.md)). El `Dockerfile` ya
      existe y la integración continua lo construye en cada push a `main` · API
- [ ] ⏭️ [**0.9**](docs/08-plan-de-desarrollo.md#tarea-0-9) Entrega a dev al fusionar ([ADR-026](docs/adr/ADR-026-railway-al-final.md)) · API, Front
- [ ] 🔒 [**0.10**](docs/08-plan-de-desarrollo.md#tarea-0-10) SemVer y migraciones con `schema_version` · Base — el SemVer ya está en
      `build.gradle.kts` y en `pubspec.yaml`; falta la tabla `schema_version`
- [x] [**0.11**](docs/08-plan-de-desarrollo.md#tarea-0-11) `GET /version`: versión de la API, del esquema y ambiente · API
- [x] [**0.12**](docs/08-plan-de-desarrollo.md#tarea-0-12) Insignia `v0.1.0 · Desarrollo` en el pie de la barra lateral y franja de ambiente · Front
- [x] [**0.13**](docs/08-plan-de-desarrollo.md#tarea-0-13) El front comprueba el MAJOR de la API y bloquea con la pantalla del mockup · Front
- [x] [**0.14**](docs/08-plan-de-desarrollo.md#tarea-0-14) Sobre `{status, mensaje, data}` en toda respuesta, también en los errores · API
- [x] [**0.15**](docs/08-plan-de-desarrollo.md#tarea-0-15) Catálogo único de códigos de cinco dígitos · API, Contrato
- [x] [**0.16**](docs/08-plan-de-desarrollo.md#tarea-0-16) Prueba [C-03](docs/12-pruebas-y-calidad.md#c-03): el catálogo contra el código fuente, en los dos sentidos · API
- [x] [**0.17**](docs/08-plan-de-desarrollo.md#tarea-0-17) Descriptor de formulario generado del propio validador ([RF-102](docs/03-requisitos-y-bdd.md#rf-102)) · API
- [x] [**0.18**](docs/08-plan-de-desarrollo.md#tarea-0-18) Swagger en `/docs` y prueba [C-04](docs/12-pruebas-y-calidad.md#c-04) contra la copia fijada del contrato · API, Contrato
- [ ] ⚡ [**0.19**](docs/08-plan-de-desarrollo.md#tarea-0-19) Sistema de diseño del mockup en widgets: tablas, paneles de confirmación en línea, y
      fechas y porcentajes con el formato colombiano · Front

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

- [ ] ✏️🔒 [**1.1**](docs/08-plan-de-desarrollo.md#tarea-1-1) Esquema completo con restricciones con nombre explícito · Base — las 22 tablas están
      escritas; falta aplicarlas y revisar que toda restricción tenga nombre
- [ ] ✏️🔒 [**1.2**](docs/08-plan-de-desarrollo.md#tarea-1-2) Revocar `DELETE` y `TRUNCATE` · Base
- [ ] ✏️🔒 [**1.3**](docs/08-plan-de-desarrollo.md#tarea-1-3) Triggers de auditoría sobre las tablas de negocio · Base
- [ ] ✏️🔒 [**1.4**](docs/08-plan-de-desarrollo.md#tarea-1-4) `fn_es_gerencia` y políticas RLS · Base
- [ ] 🔒 [**1.5**](docs/08-plan-de-desarrollo.md#tarea-1-5) `FORCE ROW LEVEL SECURITY` en todas las tablas · Base — no está en la migración
- [ ] 🔒 [**1.6**](docs/08-plan-de-desarrollo.md#tarea-1-6) Transacción por petición con `request.jwt.claims` y `SET LOCAL ROLE authenticated` · API
- [ ] 🔒 [**1.7**](docs/08-plan-de-desarrollo.md#tarea-1-7) Prueba de permisos con sesión real, con y sin la comprobación de la API · API
- [ ] 🔒 [**1.8**](docs/08-plan-de-desarrollo.md#tarea-1-8) Traducción restricción → código del catálogo · API
- [x] [**1.9**](docs/08-plan-de-desarrollo.md#tarea-1-9) `Dinero` en Java y en Dart · API, Front — en la API, sumas que fallan al desbordar,
      porcentaje `HALF_UP` y formato colombiano; en el front, un tipo sin operadores y su formato en
      `ui/formato/moneda.dart`. Pruebas con las cifras de los documentos [05](docs/05-reglas-financieras.md) y [06](docs/06-nomina-y-capacidad-de-pago.md), verificadas en negativo
- [ ] 🔒 [**1.10**](docs/08-plan-de-desarrollo.md#tarea-1-10) Cuentas y categorías: endpoints y pantalla ([RF-97](docs/03-requisitos-y-bdd.md#rf-97)) · API, Front
- [ ] ✏️🔒 [**1.11**](docs/08-plan-de-desarrollo.md#tarea-1-11) Semilla reproducible para dev y qa · Base — `seed.sql` ya existe
- [ ] 🔒 [**1.12**](docs/08-plan-de-desarrollo.md#tarea-1-12) Primera promoción de migraciones dev → qa · Base
- [ ] 🔒 [**1.13**](docs/08-plan-de-desarrollo.md#tarea-1-13) Tabla `peticiones_idempotentes` · Base — no está en la migración
- [ ] 🔒 [**1.14**](docs/08-plan-de-desarrollo.md#tarea-1-14) Filtro de idempotencia · API
- [ ] 🔒 [**1.15**](docs/08-plan-de-desarrollo.md#tarea-1-15) Prueba de corte entre el efecto y la clave · API
- [ ] 🔒 [**1.16**](docs/08-plan-de-desarrollo.md#tarea-1-16) Purga de claves vencidas a las 72 horas · API, Base
- [ ] ⚡ [**1.17**](docs/08-plan-de-desarrollo.md#tarea-1-17) Contrato de cuentas y categorías · Contrato
- [ ] 🔒 [**1.18**](docs/08-plan-de-desarrollo.md#tarea-1-18) Renderizador del descriptor de formulario en el front ([RF-102](docs/03-requisitos-y-bdd.md#rf-102)) · Front
- [ ] ⚡ [**1.19**](docs/08-plan-de-desarrollo.md#tarea-1-19) Cliente HTTP con `Idempotency-Key`, generada una vez por acción ([ADR-020](docs/adr/ADR-020-idempotencia.md)) · Front
- [ ] ⚡ [**1.20**](docs/08-plan-de-desarrollo.md#tarea-1-20) Decidir cómo consiguen la API y su CI el esquema de `prisma_db` · Decisión

---

## 4. Sprint 2 · acceso, usuarios, cargos y canal firmado

- [ ] 🔒 [**2.1**](docs/08-plan-de-desarrollo.md#tarea-2-1) Autenticación contra Supabase Auth desde la API, con el correo sintético en el servidor · API
- [ ] 🔒 [**2.2**](docs/08-plan-de-desarrollo.md#tarea-2-2) Sesión de 30 días y enrutamiento según la navegación que dicta la API · API, Front
- [ ] ✏️🔒 [**2.3**](docs/08-plan-de-desarrollo.md#tarea-2-3) Tabla `cargos` con semilla y RLS · Base — escrita en la migración inicial
- [ ] ✏️🔒 [**2.4**](docs/08-plan-de-desarrollo.md#tarea-2-4) Tabla `usuarios` con `usuario`, `nombre_completo`, `cargo_id` y `tipo` · Base — escrita
      en la migración inicial
- [ ] ✏️🔒 [**2.5**](docs/08-plan-de-desarrollo.md#tarea-2-5) Trigger `tg_proteger_ultima_gerencia` · Base — escrito en la migración inicial
- [ ] 🔒 [**2.6**](docs/08-plan-de-desarrollo.md#tarea-2-6) Pantalla de acceso y cambio obligatorio de contraseña · Front
- [ ] 🔒 [**2.7**](docs/08-plan-de-desarrollo.md#tarea-2-7) Gestión de usuarios: crear, editar, desactivar con motivo y restablecer clave · API, Front
- [ ] 🔒 [**2.8**](docs/08-plan-de-desarrollo.md#tarea-2-8) Catálogo de cargos · API, Front
- [ ] 🔒 [**2.9**](docs/08-plan-de-desarrollo.md#tarea-2-9) Registro de cada inicio de sesión con fecha, dispositivo e IP · API, Base
- [ ] ⚡ [**2.10**](docs/08-plan-de-desarrollo.md#tarea-2-10) Panel «Acerca de» ([RF-100](docs/03-requisitos-y-bdd.md#rf-100)) · Front, API
- [ ] 🔒 [**2.11**](docs/08-plan-de-desarrollo.md#tarea-2-11) La prueba de permisos del [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1), también contra la base de qa · API
- [ ] 🔒 [**2.12**](docs/08-plan-de-desarrollo.md#tarea-2-12) Clave de firma de sesión, solo en memoria en el front · API, Front
- [ ] 🔒 [**2.13**](docs/08-plan-de-desarrollo.md#tarea-2-13) Filtro de firma: HMAC, nonce y marca de tiempo (`40101` a `40103`) · API
- [ ] 🔒 [**2.14**](docs/08-plan-de-desarrollo.md#tarea-2-14) Navegación dictada por la API ([RF-103](docs/03-requisitos-y-bdd.md#rf-103)) · API, Front
- [ ] 🔒 [**2.15**](docs/08-plan-de-desarrollo.md#tarea-2-15) Tabla única de usuarios activos y desactivados ([RF-84](docs/03-requisitos-y-bdd.md#rf-84) a [RF-87](docs/03-requisitos-y-bdd.md#rf-87)) · API, Front
- [ ] 🔒 [**2.16**](docs/08-plan-de-desarrollo.md#tarea-2-16) Bitácora de cambios y reversión sin borrar ([RF-88](docs/03-requisitos-y-bdd.md#rf-88), [RF-89](docs/03-requisitos-y-bdd.md#rf-89), [RF-91](docs/03-requisitos-y-bdd.md#rf-91)) · Base, API, Front
- [ ] 🔒 [**2.17**](docs/08-plan-de-desarrollo.md#tarea-2-17) Cambio de clave obligatorio al reactivar ([RF-90](docs/03-requisitos-y-bdd.md#rf-90)) · API, Front
- [ ] 🔒 [**2.18**](docs/08-plan-de-desarrollo.md#tarea-2-18) Vista previa de Operación para Gerencia ([RF-92](docs/03-requisitos-y-bdd.md#rf-92) a [RF-94](docs/03-requisitos-y-bdd.md#rf-94)) · Front, API
- [ ] 🔒 [**2.19**](docs/08-plan-de-desarrollo.md#tarea-2-19) Contrato de acceso, usuarios, cargos y canal firmado · Contrato

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
- [ ] 🔒 [**3.3**](docs/08-plan-de-desarrollo.md#tarea-3-3) Repositorio de movimientos contra PostgreSQL · API
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
- [ ] 🔒 [**3.13**](docs/08-plan-de-desarrollo.md#tarea-3-13) Contrato de movimientos · Contrato

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
- [ ] 🔒 [**6.10**](docs/08-plan-de-desarrollo.md#tarea-6-10) Contrato de reportes, indicadores, alertas y cierre mensual · Contrato

**[Sprint 7](docs/08-plan-de-desarrollo.md#sprint-7) · Capital, retiros y patrimonio**

- [ ] 🔒 [**7.1**](docs/08-plan-de-desarrollo.md#tarea-7-1) Inversiones en activos · API, Front
- [ ] 🔒 [**7.2**](docs/08-plan-de-desarrollo.md#tarea-7-2) Aportes de capital · API, Front
- [ ] 🔒 [**7.3**](docs/08-plan-de-desarrollo.md#tarea-7-3) Pro-labore con justificación · API, Front
- [ ] 🔒 [**7.4**](docs/08-plan-de-desarrollo.md#tarea-7-4) Retiro con división automática en pro-labore y distribución · API
- [ ] 🔒 [**7.5**](docs/08-plan-de-desarrollo.md#tarea-7-5) Cálculo de patrimonio · API
- [ ] 🔒 [**7.6**](docs/08-plan-de-desarrollo.md#tarea-7-6) Alerta de descapitalización a 12 meses · API
- [ ] 🔒 [**7.7**](docs/08-plan-de-desarrollo.md#tarea-7-7) Los cuatro sobres con historial · API, Front
- [ ] 🔒 [**7.8**](docs/08-plan-de-desarrollo.md#tarea-7-8) Panel de sobres: asignado contra usado · Front
- [ ] 🔒 [**7.9**](docs/08-plan-de-desarrollo.md#tarea-7-9) Contrato de inversiones, aportes, retiros, pro-labore y sobres · Contrato

### Cadena B · el pedido

**[Sprint 5](docs/08-plan-de-desarrollo.md#sprint-5) · Productos y costeo**

- [x] [**5.1**](docs/08-plan-de-desarrollo.md#tarea-5-1) Dominio `Producto` y servicio `calcularMargenes` · API — los tres márgenes de
      [05 §7.2](docs/05-reglas-financieras.md#72-los-tres-márgenes) reproducidos producto por producto, con el margen por hora vacío —no en cero—
      cuando el ítem no consume tiempo
- [ ] 🔒 [**5.2**](docs/08-plan-de-desarrollo.md#tarea-5-2) Catálogo de productos y servicios · API, Front
- [ ] 🚧⚡ [**5.3**](docs/08-plan-de-desarrollo.md#tarea-5-3) Costeo unitario: insumo, consumibles y minutos de trabajo · API — la fórmula de
      [05 §7.1](docs/05-reglas-financieras.md#71-costo-unitario) y su prueba llegaron con la tarea [5.1](docs/08-plan-de-desarrollo.md#tarea-5-1); falta atarla a cada producto con su
      historial de costos ([5.5](docs/08-plan-de-desarrollo.md#tarea-5-5)) y el tiempo de máquina del bordado ([5.4](docs/08-plan-de-desarrollo.md#tarea-5-4))
- [ ] 🔒 [**5.4**](docs/08-plan-de-desarrollo.md#tarea-5-4) Costeo de bordado por tiempo de máquina · API
- [ ] 🔒 [**5.5**](docs/08-plan-de-desarrollo.md#tarea-5-5) Historial de costos con fecha de vigencia · Base, API
- [ ] 🔒 [**5.6**](docs/08-plan-de-desarrollo.md#tarea-5-6) Margen por hora · API
- [ ] 🔒 [**5.7**](docs/08-plan-de-desarrollo.md#tarea-5-7) Sugerencia de precio por margen objetivo · API
- [ ] 🔒 [**5.8**](docs/08-plan-de-desarrollo.md#tarea-5-8) Costos y márgenes ocultos al tipo Operación: la API no los envía · API
- [ ] 🔒 [**5.9**](docs/08-plan-de-desarrollo.md#tarea-5-9) Cuadro comparativo ordenable por margen por hora · Front
- [ ] 🔒 [**5.10**](docs/08-plan-de-desarrollo.md#tarea-5-10) Contrato de productos, servicios y costeo · Contrato

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
- [ ] 🔒 [**4.10**](docs/08-plan-de-desarrollo.md#tarea-4-10) Contrato de clientes, pedidos y anticipos · Contrato

**[Sprint 8](docs/08-plan-de-desarrollo.md#sprint-8) · Cotizador**

- [ ] 🔒 [**8.8**](docs/08-plan-de-desarrollo.md#tarea-8-8) Cotizaciones y remisiones en PDF con logo · API, Front
- [ ] 🔒 [**8.9**](docs/08-plan-de-desarrollo.md#tarea-8-9) Validador de anticipo mínimo · API
- [ ] 🔒 [**8.11**](docs/08-plan-de-desarrollo.md#tarea-8-11) Contrato de nómina, simulador, cotizaciones e importación · Contrato

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

- [ ] 🔒 [**9.1**](docs/08-plan-de-desarrollo.md#tarea-9-1) PWA instalable y cola persistente con la clave guardada antes de enviar · Front
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
| 3 | Los cuatro proyectos de Supabase y el pago de uat y prod | Quien dirige crea; Gerencia paga | Tarea [0.4](docs/08-plan-de-desarrollo.md#tarea-0-4) | 🟡 dev creado; faltan qa, uat y prod |
| 4 | PostgreSQL para desarrollar sin Docker | Quien dirige | Tareas [0.5](docs/08-plan-de-desarrollo.md#tarea-0-5) y [0.10](docs/08-plan-de-desarrollo.md#tarea-0-10) | ✅ El proyecto dev de Supabase, mientras Docker no arranque |
| 5 | Remotos de los repositorios | Quien dirige | Integración continua | ✅ Los cuatro en GitHub |
| 6 | Cómo consiguen la API y su CI el esquema de `prisma_db` | Carril API | Tareas [1.7](docs/08-plan-de-desarrollo.md#tarea-1-7), [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8) y [1.15](docs/08-plan-de-desarrollo.md#tarea-1-15) | ⬜ Es la tarea [1.20](docs/08-plan-de-desarrollo.md#tarea-1-20) |
| 7 | Quién trabaja cada carril, y quién sabe Flutter y Java para revisar el contrato | Quien dirige | Trabajar con más de un carril | ⬜ |
| 8 | Contrato por etiqueta de git o como paquete publicado | Los dos lados | El primer cambio de contrato | ⬜ El documento [21](docs/21-trabajo-en-paralelo.md) se inclina por la etiqueta |
| 9 | Quién desempata un cambio de contrato | Quien dirige | El primer desacuerdo | ⬜ |
| 10 | Supuestos [S1](docs/01-vision-y-alcance.md#s1) a [S5](docs/01-vision-y-alcance.md#s5) de [01 §6](docs/01-vision-y-alcance.md#6-supuestos) | Gerencia | [Sprint 1](docs/08-plan-de-desarrollo.md#sprint-1) | ⬜ Por confirmar; el mockup ya está confirmado |
| 11 | El dominio `prismamy.co`, del que dependen el correo sintético, `api.prismamy.co` y CORS | Gerencia | El primer usuario real, porque el correo sintético es fijo de por vida ([ADR-009](docs/adr/ADR-009-login-por-usuario.md)) | ⬜ |
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
  dejarían un registro que no significa nada. El dominio de la API ya las rechaza (tarea [3.1](docs/08-plan-de-desarrollo.md#tarea-3-1)), y
  conviene que la migración inicial las sume **antes** de aplicarse a ninguna base, con su nombre
  explícito como pide [04 §4.1](docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes).
- **Las reglas del dominio todavía no tienen código del catálogo.** `Movimiento`, `Pedido` y
  `Costeo` rechazan lo que no se puede registrar con excepciones de Java, y hoy eso saldría como
  `50000`, «algo salió mal». La traducción a códigos de cinco dígitos con su mensaje en español
  llega con los endpoints y con los contratos que los acuerdan (tareas [1.8](docs/08-plan-de-desarrollo.md#tarea-1-8), [3.4](docs/08-plan-de-desarrollo.md#tarea-3-4) y [3.13](docs/08-plan-de-desarrollo.md#tarea-3-13)): hasta
  entonces, ninguno de esos mensajes es el que verá el taller.
- **Dinero con decimales en la frontera.** Cuando llegue el primer endpoint que recibe plata (tarea
  1.10), comprobar con una prueba que un JSON con `1500.5` en un campo de dinero se rechaza y no se
  trunca a `1500` en silencio. [ADR-003](docs/adr/ADR-003-dinero-entero.md) exige rechazarlo, y la conversión de Jackson hay que verla,
  no suponerla.
- **La base de desarrollo es compartida.** Mientras dev sea el proyecto de Supabase en la nube, todos
  los carriles desarrollan contra la misma base, que es lo que [21 §6.4](docs/21-trabajo-en-paralelo.md#64-ambientes) pide evitar. Con un carril no
  estorba; con varios, cada uno necesita su PostgreSQL local.
- **Sin qa hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9)** ([ADR-026](docs/adr/ADR-026-railway-al-final.md)): mientras tanto, «terminado» es fusionado a `main` con la
  integración continua en verde.
- **El servicio de Railway conectado a `prisma_front`** intenta construir en cada push y falla,
  porque todavía no hay receta de construcción para Flutter. Conviene desconectarlo hasta el [Sprint 9](docs/08-plan-de-desarrollo.md#sprint-9).
- **`dart.yml` del front** es la plantilla de GitHub y falla con Flutter. Se dejó a propósito; la
  integración continua de verdad es `ci.yml`.

---

## 10. Decisiones del Sprint 0 que conviene revisar

Las tomó quien construyó el [Sprint 0](docs/08-plan-de-desarrollo.md#sprint-0), no quien dirige el proyecto:

- [ ] Los errores 405, 406 y 415 responden 400 con el código `40000`
- [ ] `@PendienteDeEmitir` marca en el catálogo los códigos que todavía nadie emite
- [ ] El catálogo de códigos va dentro del OpenAPI, en `x-prisma-codigos`
- [ ] La pantalla de versión incompatible tiene tres filas de versiones y no las dos del mockup
- [ ] Se siguió el texto del mockup y no el literal del escenario [BDD-101-1](docs/03-requisitos-y-bdd.md#bdd-101-1)

---

## Cómo se mantiene este archivo

- Una tarea se marca `[x]` cuando su commit está en `main` con la integración continua en verde. Lo
  escrito pero no probado lleva ✏️, no `[x]`.
- Después de marcar algo, se corre `node scripts/docs/documentar.mjs enlazar`: rehace las marcas ⚡ y
  🔒, lo que puede empezar hoy y cuánto falta. **Las dependencias no se escriben aquí**: viven en el
  plan.
- **Lo nuevo no entra aquí primero.** Una tarea que no está en el plan va al plan o, si es una idea
  para después, al roadmap ([08 §6](docs/08-plan-de-desarrollo.md#6-backlog-priorizado)).
- Es un documento compartido, como todo `docs/`: lo actualizan todos los carriles. Cada cambio sube
  su versión ([`22-documentacion.md`](docs/22-documentacion.md)).
