# 10 · Dos arreglos del camino real

**2026-09-17** · No son tareas del plan: son dos defectos que solo aparecen **ejecutando la API**, y
que ninguna prueba veía porque las pruebas recorren un camino que no es el de producción. Los dos
responden `50000` donde el contrato promete otra cosa. Se encontraron el mismo día, con la pila local
arriba, probando a mano lo que la [2.1](../docs/08-plan-de-desarrollo.md#tarea-2-1) y la [1.14](../docs/08-plan-de-desarrollo.md#tarea-1-14) dejaron construido. Tocan `prisma_api` y la
documentación de arquitectura, de pruebas y del contrato.

```
POST /api/v0/sesiones                {"usuario":"yuliana","clave":"prisma2026"}  → 500, 50000
POST /api/v0/consultas/formularios   {}                                          → 500, 50000
```

## Qué se va a hacer

### A · El ingreso abre su propia transacción

Hoy `IniciarSesion` lee la ficha con el `RepositorioDeUsuarios` que Spring resuelve a
`UsuariosEnPostgres`, que le pide la conexión a `ConIdentidad.jdbc()`. **Nadie abrió esa
transacción:** quien la abre es el filtro de idempotencia ([20 §5.5](../docs/20-contrato-de-api.md#55-la-regla-que-hace-que-esto-sea-real-y-no-decorativo)) y el ingreso está **exento** de
la cabecera ([20 §5.1](../docs/20-contrato-de-api.md#51-la-cabecera)), así que el filtro lo deja pasar sin abrir nada. La consulta sale sin
identidad, `ConsultaSinIdentidad` la detiene —hace lo que [T-01](../docs/12-pruebas-y-calidad.md#t-01) pide— y el manejador global la
traduce a `50000`. **Nadie entra al sistema.**

1. `infraestructura/postgres/UsuariosDelRecienAutenticado.java` — un adaptador que envuelve al
   repositorio y abre la transacción con los claims de quien acaba de autenticar.
2. `infraestructura/CasosDeUso.java` — arma `IniciarSesion` con esa envoltura.
3. `aplicacion/IniciarSesion.java` — el javadoc dice quién abre esa transacción, que hoy no dice.
4. `arquitectura/ReglaDeDependenciasTest.java` — la regla de quién abre la transacción pasa de «un
   filtro» a una lista de dos nombres, y una regla nueva impide que el adaptador del ingreso lo use
   nadie más que el cableado.
5. `integracion/InicioDeSesionPorHttpIntegracionTest.java` — **la prueba que habría cazado esto**:
   `POST /api/v0/sesiones` por HTTP, con el cableado de Spring entero y contra el Supabase local.
6. `integracion/InicioDeSesionIntegracionTest.java` — deja de armar la envoltura con una lambda y usa
   la clase de producción. Esa lambda es justo lo que escondió el defecto.

### B · Un formulario sin nombre no es un error del servidor

`POST /api/v0/consultas/formularios` con un cuerpo sin `nombre` revienta con `NullPointerException`
en `CatalogoDeFormularios.descriptor`: `Map.copyOf` no admite `get(null)`. El contrato declara
`nombre` **required**, así que la respuesta es `40000`, no un `50000`.

7. `interfaz/formulario/CatalogoDeFormularios.java` — `descriptor(null)` devuelve vacío en vez de
   reventar.
8. `interfaz/rest/FormulariosController.java` — sin nombre, `40000`; con un nombre que no existe,
   el `40400` de siempre.
9. `interfaz/rest/DescriptorDeFormularioEnElSobreTest.java` — los tres casos por HTTP.

### C · La documentación

10. [`docs/07-arquitectura.md`](../docs/07-arquitectura.md) [§7.2](../docs/07-arquitectura.md#72-la-solución-obligatoria) — quién abre la transacción cuando la ruta está exenta.
11. [`docs/12-pruebas-y-calidad.md`](../docs/12-pruebas-y-calidad.md) [§10](../docs/12-pruebas-y-calidad.md#10-idempotencia-canal-firmado-y-durabilidad) — **T-02**, y el conteo del [§1.2](../docs/12-pruebas-y-calidad.md#12-cuántas-pruebas-hay-enumeradas).
12. [`docs/20-contrato-de-api.md`](../docs/20-contrato-de-api.md) [§4.3](../docs/20-contrato-de-api.md#43-cómo-se-pide-y-qué-forma-tiene) y [§5.1](../docs/20-contrato-de-api.md#51-la-cabecera) — el cuerpo sin `nombre`, y que eximir de la clave no
    exime de la transacción.
13. [`TODO.md`](../TODO.md) [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar) y el `README.md` de `prisma_api`.

## Qué se decidió, y por qué

**La transacción la abre un adaptador del puerto, no el repositorio ni el caso de uso.** El ingreso
conoce la identidad **solo después** de que GoTrue comprueba la contraseña, así que ningún filtro
puede abrirla antes: cuando el filtro corre todavía no hay `sub`, y abrirla con uno inventado sería
justo lo que [ADR-012](../docs/adr/ADR-012-identidad-a-postgres.md) prohíbe. El sitio donde ya se sabe quién es y todavía no se tocó ninguna tabla
es el puerto que el caso de uso usa, así que la envoltura va ahí. `IniciarSesion` no cambia una
línea: sigue pidiendo la ficha, y quien la atiende ya viene con la transacción puesta, que es lo que
su javadoc decía desde el primer día.

**Se descarta que `UsuariosEnPostgres` abra la transacción cuando no haya ninguna.** Es el arreglo
«obvio» y es el que la regla de ArchUnit de la [1.14](../docs/08-plan-de-desarrollo.md#tarea-1-14) existe para impedir: el día que ese mismo
repositorio se use desde una ruta con sesión, abriría una **segunda** transacción y sacaría el efecto
de la operación de la transacción de la clave de idempotencia ([20 §5.5](../docs/20-contrato-de-api.md#55-la-regla-que-hace-que-esto-sea-real-y-no-decorativo)). Lo mismo con un
`conIdentidad` anidado desde el caso de uso: `ConIdentidad` lo rechaza, y con razón.

**La regla de ArchUnit se amplía a dos nombres, y no se esquiva.** Darle a `ConIdentidad` un segundo
método de apertura con otro nombre habría dejado pasar la envoltura sin tocar la regla —la condición
mira el nombre `conIdentidad`—, y eso es peor que el defecto: una frontera que deja de vigilar sin
que nadie se entere. La regla pasa a enumerar **las dos clases que pueden abrir la transacción**, el
filtro y la envoltura del ingreso, y dice en su `because` por qué son dos y no una.

**La envoltura no es un `@Bean`.** `porId(id)` abre la transacción **como** `id`, así que inyectarla
en cualquier sitio sería repartir un «hazte pasar por quien quieras»: solo es correcta cuando ese
`id` lo acaba de devolver el proveedor de identidad. Se arma a mano en `CasosDeUso`, se documenta por
qué, y una regla nueva de ArchUnit impide que dependa de ella nadie más. Así, además, el puerto sigue
teniendo un solo bean —`UsuariosEnPostgres`— y las rutas con sesión de la [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2) en adelante seguirán
recibiendo el de siempre, que lee dentro de la transacción que abrió el filtro.

**La prueba nueva levanta Spring y habla por HTTP, y esa es toda la corrección.** El defecto no
estaba en ninguna clase: estaba **entre** dos, en el cableado, y por eso lo tapaba una prueba que
armaba los adaptadores a mano. `InicioDeSesionIntegracionTest` le pasaba a `IniciarSesion` una lambda
que sí envolvía la consulta —o sea, probaba el arreglo antes de que existiera—, y
`InicioDeSesionEnElSobreTest` sustituye los dos puertos por dobles. Ninguna de las dos podía ver
esto, y ninguna sobra: lo que faltaba era una que no sustituyera nada.

**T-02 se enumera en el [12](../docs/12-pruebas-y-calidad.md), junto a [T-01](../docs/12-pruebas-y-calidad.md#t-01).** Son las dos caras: T-01 exige que una consulta fuera de
transacción **falle**, y falló —hizo su trabajo—; T-02 exige que el cableado de producción de cada
ruta **abra** la suya. Sin la segunda, cumplir la primera se ve igual que estar roto.

**Un cuerpo sin `nombre` responde `40000` y no `42200` ni `40400`.** No es `42200` porque el
descriptor no admite reglas de validación en ese record —lo dice su javadoc, y agregarle un
`@NotBlank` cambiaría el esquema publicado y rompería [C-04](../docs/12-pruebas-y-calidad.md#c-04), que es cambiar el contrato sin
acordarlo—. Y no es `40400` porque «no se encontró lo que buscas» sería mentir: no se buscó ningún
formulario, la petición no nombró ninguno. El `nombre` viaja como `required` en
`contrato/openapi.json`, así que un cuerpo sin él es una petición que no cumple el contrato: `40000`,
«La petición no se entiende». Un nombre en blanco se trata igual que ausente, por la misma razón.

**El catálogo se arregla además por dentro.** Aunque el controlador ya no le pase `null`,
`descriptor(null)` deja de reventar: un `Map.copyOf` que no admite `get(null)` es una mina para
cualquier llamada futura, y el coste de desactivarla es una línea.

**Lo que este arreglo no da: la prueba nueva no corre en la integración continua.** La tubería de la
API solo corre `./gradlew build`, y el trabajo aparte con la base que decidió [ADR-029](../docs/adr/ADR-029-esquema-por-etiqueta.md) §3 todavía no
existe. Además ese trabajo levanta `supabase db start`, que da PostgreSQL pero **no** GoTrue, y sin
GoTrue esta prueba —y la de la 2.1— no tienen contra qué autenticar. No se resuelve aquí: se anota en
el [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar) del tablero, que es donde van las decisiones que quien dirige tiene que revisar.

**Dos defectos, dos commits, un PR por repositorio.** No son tareas del plan, así que van sin número
([21 §6.5](../docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) los llama «un arreglo suelto»), pero cada uno explica lo suyo: son fallos
independientes y quien lea el historial dentro de un año necesita poder revertir uno sin el otro.

## Cómo se va a verificar

- **La reproducción, en la misma pila donde se encontró:** los dos `curl` de arriba, contra la API
  relevantada con la base y GoTrue locales. Tienen que responder `20100` con la ficha y `40000`.
- `./gradlew build` en verde —formato, ArchUnit, [C-03](../docs/12-pruebas-y-calidad.md#c-03) y [C-04](../docs/12-pruebas-y-calidad.md#c-04) incluidas— con las pruebas nuevas del
  descriptor, y `./gradlew integracion` con la pila local arriba.
- **Verificado en negativo, que es lo que hace que estas pruebas valgan:**
  - deshacer el cableado de `CasosDeUso` —volver a inyectar el repositorio pelado— y ver a
    `InicioDeSesionPorHttpIntegracionTest` fallar con `50000`;
  - devolverle al controlador el `descriptor(consulta.nombre())` de hoy y ver el `50000` del cuerpo
    vacío;
  - y quitar el nombre de la envoltura de la lista de ArchUnit, para comprobar que la regla la ve.
- `enlazar` y `verificar --base main` en verde, con la versión subida en cada `.md` tocado.
- Los dos mensajes de commit por debajo de los 256 caracteres del [ADR-031](../docs/adr/ADR-031-commit-de-256-caracteres.md), medidos antes de crearlos.
