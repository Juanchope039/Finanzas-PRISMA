# 07 · La sesión contra Supabase Auth

**2026-09-17** · Tarea [2.1](../docs/08-plan-de-desarrollo.md#tarea-2-1) del [Sprint 2](../docs/08-plan-de-desarrollo.md#sprint-2), carril API. Toca `prisma_api` y el tablero. Es la tarea de
la que penden 51, y la que destraba el carril Front, parado desde la pantalla de acceso.

## Qué se va a hacer

**Una sola ruta: `POST /api/v0/sesiones`.** Se entra con usuario y contraseña; la API pasa el
usuario a minúsculas, arma el correo sintético `<usuario>@usuarios.prisma.com` ([ADR-009](../docs/adr/ADR-009-login-por-usuario.md)), llama a
GoTrue, y con el `sub` que vuelve abre la **primera transacción con identidad de la historia del
proyecto** —la puerta que la [1.6](../docs/08-plan-de-desarrollo.md#tarea-1-6) dejó construida y que hasta hoy no llamaba nadie— para leer la
ficha propia de `usuarios` con RLS juzgando.

1. `dominio/modelo/NombreDeUsuario.java` — el objeto de valor que normaliza y arma el correo. Es
   la regla de [ADR-009](../docs/adr/ADR-009-login-por-usuario.md) y va en el dominio, no en un `toLowerCase()` suelto en un adaptador.
2. `dominio/modelo/Identidad.java` y `SesionAbierta.java` — quién entró y qué se le devuelve.
3. `dominio/puerto/ProveedorDeIdentidad.java` y `RepositorioDeUsuarios.java` — los dos puertos.
4. `aplicacion/IniciarSesion.java` y `SolicitudDeAcceso.java` — el caso de uso, sin HTTP.
5. `infraestructura/supabase/GoTrue.java` — `POST {supabase.url}/auth/v1/token?grant_type=password`
   con la anon-key, con `RestClient`, que ya viene en el starter: sin dependencia nueva.
6. `infraestructura/postgres/UsuariosEnPostgres.java` — el primer adaptador de PostgreSQL, dentro
   de `conIdentidad`.
7. `interfaz/formulario/TipoDeCampo.java` — el valor `CLAVE`, y `NuevaSesion`, el primer
   `@Formulario("acceso")` de `src/main`.
8. `interfaz/sobre/CatalogoDeCodigos.java` — `40104` y `40301`, y a `20100` se le quita la marca.
9. `interfaz/rest/SesionesController.java` — la ruta, con el sobre.
10. `contrato/openapi.json` de `prisma_api` y su README — la copia fijada al día.
11. [`TODO.md`](../TODO.md): la 2.1 marcada, y [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar) con lo que Gerencia tiene que revisar.

## Qué se decidió, y por qué

**La 2.1 entrega una ruta, no las cuatro del tag «Acceso».** Las otras tres —cerrar sesión, cambiar
la propia contraseña y renovar— declaran `Idempotency-Key`, `X-Prisma-Firma`, `X-Prisma-Nonce` y
`X-Prisma-Timestamp` como obligatorias, y **hoy no las comprueba nadie**: eso son la [2.13](../docs/08-plan-de-desarrollo.md#tarea-2-13) y el filtro
de idempotencia de la [1.14](../docs/08-plan-de-desarrollo.md#tarea-1-14). Publicarlas ahora sería publicar endpoints de escritura que dicen
estar protegidos y no lo están. Se descartó declararlas sin comprobarlas por eso mismo.

**El `sub` sale del cuerpo que devuelve GoTrue, no de verificar la firma del token.** En la 2.1
ningún endpoint recibe un token de un cliente: el token nace en una llamada servidor a servidor
sobre un canal ya confiable. Verificar la firma es lo que necesita quien lee `Authorization: Bearer`,
y eso llega con la [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2). Se descartó traer una librería de JWT y verificar contra el JWKS: el
token va firmado con ES256 asimétrica, así que `SUPABASE_JWT_SECRET` no sirve y haría falta una URL
de JWKS que `application.yml` ni siquiera declara.

**La ficha se lee dentro de `conIdentidad`, con `SET LOCAL ROLE authenticated`.** La política
`usuarios_lectura` permite `id = auth.uid()`, así que la única lectura de esta tarea la sigue
juzgando PostgreSQL y no un `if` de la API ([ADR-006](../docs/adr/ADR-006-rls-por-rol.md), [ADR-012](../docs/adr/ADR-012-identidad-a-postgres.md)). Se descartó leerla con el rol dueño o
con `service_role`, que la condición 4 del [ADR-012](../docs/adr/ADR-012-identidad-a-postgres.md) prohíbe en el camino de una petición de
usuario.

**`activo` lo lee la API y responde `40301`, y eso no contradice lo anterior.** Las políticas dejan
a una persona desactivada leer su propia ficha, y el contrato exige que `40301` salga **solo con la
contraseña correcta**. Es leer un dato que la base entregó, no decidir un permiso en la API. Se
descartó esconder la ficha del desactivado con una política: respondería `40104` y contradiría el
contrato y el [BDD-28-3](../docs/03-requisitos-y-bdd.md#bdd-28-3).

**Quien autentica bien y no tiene ficha responde `40104`, igual que quien no existe.** Desde afuera
ese usuario no existe en el sistema, y cualquier otra respuesta le confirmaría a un desconocido que
ese correo sí existe en Auth. Queda una línea en el registro del servidor, porque es una
inconsistencia que alguien tiene que mirar. Se descartó `50000`, que distingue el caso y con eso lo
revela.

**La clave de firma se genera con `SecureRandom` —32 bytes en base64— y no se guarda en ninguna
parte.** El esquema `Sesion` la declara obligatoria, así que no devolverla rompe el contrato; dónde
vive del lado del servidor y quién la comprueba son la [2.12](../docs/08-plan-de-desarrollo.md#tarea-2-12) y la [2.13](../docs/08-plan-de-desarrollo.md#tarea-2-13). Se descartó inventar ya la
tabla donde vive, que es justamente el contenido de la 2.12.

**Los dos campos de `NuevaSesion` llevan `@NotNull`, no `@NotBlank`.** springdoc traduce `@NotBlank`
a `minLength: 1`, y el `NuevaSesion` acordado no lleva mínimo a propósito. Un usuario o una clave en
blanco llegan al proveedor y responden `40104`, el mismo texto que un usuario que no existe. El
descriptor sigue diciendo «obligatorio» con su mensaje en español, que es lo que el front pinta.

**Al catálogo entran solo `40104` y `40301`.** La prueba [C-03](../docs/12-pruebas-y-calidad.md#c-03) exige en los dos sentidos que un
código marcado no se emita y que uno emitido no lleve marca. `40302` y `42210` los emiten la puerta
de sesión ([2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2)) y el cambio de contraseña, así que entran con ellas, aunque el catálogo acordado
se los atribuya hoy a la «Tarea 2.1». Y a `20100` se le quita la marca: `POST /api/v0/sesiones`
responde 201, y resulta ser el primer endpoint del proyecto que crea algo, antes que el alta de
usuarios. Las tres correcciones al catálogo acordado van a [`TODO.md`](../TODO.md) [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar).

**`TipoDeCampo` estrena `CLAVE` y no `CASILLA`.** El enum acordado va dinero, texto, fecha, lista,
casilla, clave; el formulario «acceso» necesita `clave` y ninguno necesita `casilla` todavía.
Declarar un tipo que ningún formulario ejerce sería código sin prueba, y el generador valida
tipo contra tipo de Java al arrancar. La copia fijada queda con cinco valores y el hueco de
`casilla` se llena cuando llegue un formulario que la use.

**La configuración sigue con `@Value` y un valor vacío no impide arrancar.** `./gradlew build`
levanta el contexto de Spring en la integración continua y en máquinas sin `.env`; exigir la URL al
arrancar dejaría la compilación en rojo donde no hay Supabase. El adaptador falla al llamar, con
mensaje claro, y sale `50000`. Se descartó estrenar `@ConfigurationProperties` con `@Validated`.

**Fuera de esta tarea, y de quién es cada cosa:** la cookie `prisma_renovacion`, los 30 días, la
renovación y el filtro que lee `Authorization` son la [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2) —por eso el 201 va sin `Set-Cookie`—;
escribir `inicio_sesion` en la auditoría y sellar `ultimo_acceso`, la [2.9](../docs/08-plan-de-desarrollo.md#tarea-2-9); la navegación, la
[2.14](../docs/08-plan-de-desarrollo.md#tarea-2-14); el alta de usuarios y la clave temporal, la [2.7](../docs/08-plan-de-desarrollo.md#tarea-2-7).

## Cómo se va a verificar

- `./gradlew build` en verde: formato, ArchUnit, contrato y todas las pruebas.
- **Sin base**, con dobles de los dos puertos: que al proveedor se le pide el correo sintético y
  nunca lo que la persona tecleó; que con la clave mala **el repositorio no se llama ni una vez**
  —sin token no hay identidad, y sin identidad no se abre transacción—; que el desactivado se
  rechaza con la contraseña correcta; que la clave de firma son 32 bytes y cambia en cada sesión.
- **[A-04](../docs/12-pruebas-y-calidad.md#a-04), la que más se olvida:** el usuario que no existe y la contraseña equivocada devuelven el
  **mismo cuerpo byte a byte**. Si difieren, la API entrega la lista de quién trabaja en el taller.
- El descriptor de «acceso» tal como lo va a pedir el front: dos campos, en orden, texto y clave.
- **Roto a propósito**, y visto fallar: pasarle al proveedor el usuario sin normalizar; mover la
  lectura de la ficha antes de autenticar; borrar la comprobación de `activo`; pedirle 16 bytes a
  `SecureRandom`; darle mensaje propio al usuario inexistente; quitar el `@Valid` del controlador.
- Con base, etiquetadas `integracion` y fuera de la compilación normal: las cinco de la semilla
  contra el Supabase local —yuliana entra como gerencia, `Marcela` con mayúscula entra igual,
  lorena desactivada da `40301`, camila entra con `debeCambiarClave`—, y que la conexión es
  `prisma_api`, sin `BYPASSRLS`, leyendo dentro de la transacción con identidad.
