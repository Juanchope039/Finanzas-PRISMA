# 08 · El filtro de idempotencia

**2026-09-17** · Tarea [1.14](../docs/08-plan-de-desarrollo.md#tarea-1-14) del [Sprint 1](../docs/08-plan-de-desarrollo.md#sprint-1), carril API. Toca `prisma_api`, el contrato acordado y
el tablero. Tiene 46 tareas detrás: **cada endpoint que se escriba antes que este filtro habrá que
volver a tocarlo después.**

## Qué se va a hacer

Un filtro en `interfaz` que exige `Idempotency-Key` en toda petición bajo `/api/v0/`, y que **abre
la única transacción de la petición** para que la fila de la clave y el efecto de la operación caigan
adentro de la misma ([20 §5.5](../docs/20-contrato-de-api.md#55-la-regla-que-hace-que-esto-sea-real-y-no-decorativo)).

1. `interfaz/filtro/RutaDeLaPeticion.java` — la frontera del contrato en un solo sitio: qué está
   exento y qué es lectura. La usan el filtro **y** el generador del OpenAPI.
2. `interfaz/filtro/ClaveDeIdempotencia.java` y `HuellaDeLaPeticion.java` — los dos objetos de valor.
3. `interfaz/filtro/PeticionRetenida.java` y `RespuestaRetenida.java` — leer el cuerpo dos veces, y
   retener la respuesta hasta después del commit.
4. `interfaz/filtro/EscritorDeSobre.java` — el sobre desde un filtro, que no pasa por `/error`.
5. `interfaz/filtro/IdentidadDeLaPeticion.java` — dónde vivirá el `Claims` de la petición. Hoy nadie
   lo llena; el filtro de sesión de la [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2) sí.
6. `interfaz/filtro/FiltroDeIdempotencia.java` y `ConfiguracionDeIdempotencia.java`, con
   `OrdenDeFiltros.java`, que pone en código el orden que hoy solo está en prosa.
7. `infraestructura/postgres/PeticionesIdempotentesEnPostgres.java`, con `RegistroDeIdempotencia` y
   `OperacionEnCurso`.
8. `interfaz/sobre/CatalogoDeCodigos.java` — fuera las tres `@PendienteDeEmitir`, y el «cuándo» de
   `40002` deja de decir «una petición que escribe».
9. `interfaz/rest/ConfiguracionDelContrato.java` — el parámetro `Idempotency-Key` en el OpenAPI
   generado, del mismo predicado que aplica el filtro.
10. Los dos `openapi.json`, el [20](../docs/20-contrato-de-api.md), el [ADR-020](../docs/adr/ADR-020-idempotencia.md) y [`TODO.md`](../TODO.md).

## Qué se decidió, y por qué

**La cabecera se exige en toda petición, lea o escriba, y no solo en las escrituras.** La fila
[1.14](../docs/08-plan-de-desarrollo.md#tarea-1-14) del plan dice «toda escritura», pero es anterior al [ADR-030](../docs/adr/ADR-030-contrato-sin-get.md): desde que todo es `POST`, el
[20 §5.1](../docs/20-contrato-de-api.md#51-la-cabecera) dice «toda petición… lea o escriba», y el contrato acordado declara el parámetro
**required en 24 de sus 26 operaciones**. El contrato manda. Se descartó seguir la fila del plan,
que dejaría el OpenAPI generado mintiendo sobre nueve operaciones.

**La exención es por ruta exacta, no por «si escribe».** Las dos exentas son `POST /api/v0/sesiones`
y `POST /api/v0/sesiones/renovacion`. El ingreso **escribe** y va sin clave, así que eximir por verbo
o por prefijo de consultas rompería el acceso del front, que además tiene una prueba que exige que
esa petición **no** lleve la cabecera.

**El filtro es quien abre la transacción, y ejecuta el resto de la cadena adentro.** Es la única
forma de cumplir el [20 §5.5](../docs/20-contrato-de-api.md#55-la-regla-que-hace-que-esto-sea-real-y-no-decorativo) sin violar `ConIdentidad`, que rechaza anidar transacciones y rechaza
unirse a una ajena. Se descartó una segunda llamada a `conIdentidad` para guardar la clave
—`IllegalStateException` garantizada— y un `TransactionTemplate` propio, que ArchUnit prohíbe. Se
agrega una regla de ArchUnit para que **solo un filtro** pueda llamar a `conIdentidad`: es lo único
que sostiene la atomicidad, y conviene que lo diga la compilación y no un comentario.

**La respuesta se retiene en memoria y se vuelca al cliente después del commit.** Tiene que estar
guardada antes de confirmar, y no puede haber salido antes de saber si el commit funcionó. Se
descartó `ContentCachingResponseWrapper` de Spring: además de copiar el cuerpo ya lo escribe al
cliente, así que no deja abortar.

**El `40902` sale de un tiempo límite de bloqueo, no de leer `estado = 'en_curso'`.** Como la fila y
el efecto van en la misma transacción, la fila de la primera petición está **sin confirmar** y
ninguna otra sesión puede verla nunca: leer el estado no devolvería nada. Lo que ocurre de verdad es
que el segundo `INSERT` espera en la llave primaria, y un `SET LOCAL lock_timeout` convierte esa
espera en respuesta. Un corolario que conviene decir: **no existe una fila `en_curso` colgada**,
porque si el proceso muere la transacción se revierte y la fila desaparece sola.

**Una clave presente que no es un UUID v4 responde `40002`, igual que si faltara.** Ningún documento
cubre el caso. Es lo mínimo: el mensaje encaja, el front no reintenta ese código, y no obliga a
agregar uno nuevo, que sería cambio de contrato.

**La huella es SHA-256 en hexadecimal minúscula** de método, ruta con query, usuario y los bytes
crudos del cuerpo, sin normalizar el JSON. Ningún documento fija el algoritmo; se elige el que el
proyecto ya usa para el canal firmado ([20 §6](../docs/20-contrato-de-api.md#6-el-canal-firmado)), para tener uno y no dos. No se normaliza porque
normalizar exige parsear JSON dentro de un filtro, y la huella existe para detectar que alguien
reutilizó una clave para otra cosa, no para juzgar equivalencia semántica.

**No se guarda una respuesta `5xx`: se revierte.** El front reintenta todo `5xx` con la misma clave;
guardarlo dejaría la operación muerta 72 horas devolviendo el mismo fallo. Un `4xx` sí se guarda: es
una respuesta legítima y el contrato exige devolverla palabra por palabra.

**Una petición sin identidad exige la cabecera pero no registra fila.** `usuario_id` es `NOT NULL` y
las tres políticas cuelgan de `auth.uid()`: sin sesión no hay a nombre de quién escribir. Las rutas
anónimas del contrato son lecturas sin efecto, así que no deduplicarlas no duplica nada. **Hoy eso
es todo el tráfico**, porque el filtro de sesión llega con la [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2): el efecto visible de esta tarea
es el `40002` y el parámetro en el contrato, y el resto entra en servicio solo ese día.

**El ingreso sigue roto contra una base real, y se deja así a propósito.** `POST /api/v0/sesiones`
devuelve `50000` porque es exenta y anónima —el filtro no le abre transacción— y `UsuariosEnPostgres`
pide `jdbc()` al aire. Se comprobó levantando la API contra el Supabase local. **Quien dirige decidió
dejarlo para la [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2)**, que es la tarea que trae la identidad en la petición; queda anotado en
[`TODO.md`](../TODO.md) [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar) para que nadie crea que lo rompió esta tarea.

## Cómo se va a verificar

- `./gradlew build` en verde, con la regla de ArchUnit nueva incluida.
- **Sin base**, contra un servidor de verdad: sin cabecera y con una mal formada, `40002` con su
  sobre; con una válida, pasa; **`POST /api/v0/sesiones` sin cabecera sigue entrando**, que es lo que
  le rompería el acceso al front; `/docs/openapi` y `/actuator/health` no la exigen.
- El OpenAPI generado declara el parámetro en toda operación salvo las dos exentas, y la copia
  fijada vuelve a cuadrar con él ([C-04](../docs/12-pruebas-y-calidad.md#c-04)).
- **Con base**, etiquetadas `integracion` y con la identidad inyectada por un filtro de prueba: las
  cuatro situaciones del [20 §5.2](../docs/20-contrato-de-api.md#52-las-cuatro-situaciones) —clave nueva, repetida con la misma huella, repetida con otra
  huella y en curso—, más la fila vencida que se reutiliza y el `5xx` que no se guarda. La de
  [I-01](../docs/12-pruebas-y-calidad.md#i-01) comprueba que **el movimiento se registró una sola vez** y que el segundo cuerpo es byte a
  byte el primero.
- **Roto a propósito**, y visto fallar: quitar la exención del ingreso; sacar el sellado de dentro
  de la transacción; quitar el `lock_timeout`; sacar el usuario de la huella; aceptar cualquier UUID.
