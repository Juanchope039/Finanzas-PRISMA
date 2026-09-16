# 19 · Ambientes, versionado y entrega

Cómo se configura, se prueba, se publica y —si hace falta— se devuelve cada versión de PRISMA.

> **Estado: diseñado, no construido.** Los cuatro ambientes, la integración continua y los
> canales de publicación todavía no existen. Este documento fija cómo deben quedar antes del
> go-live, para que la decisión se tome ahora y no la noche de la primera publicación.

---

## 1. Los cuatro ambientes

| Ambiente | Para qué sirve | Quién entra | Datos |
|---|---|---|---|
| **dev** | Desarrollo diario | Quien desarrolla | Ficticios. Se pueden borrar y volver a sembrar |
| **qa** | Pruebas automáticas y manuales | Desarrollo y pruebas | Ficticios, con semilla reproducible |
| **uat** | Aprobación de Gerencia antes de publicar | Gerencia y la empleada | Realistas, **anonimizados** |
| **prod** | El negocio de verdad | El equipo del taller | Reales |

La semilla reproducible de qa es la que ya existe (`supabase/seed.sql`, en `prisma_db`), descrita
en [`16-base-de-datos-y-snapshots.md`](16-base-de-datos-y-snapshots.md). No se inventa otra.

### 1.1 Las seis reglas

1. **Cada ambiente es un proyecto de Supabase distinto**, con su propia base, sus propias claves
   y su propio almacenamiento. Nunca comparten base.
2. **Las migraciones se promueven en orden**: dev → qa → uat → prod. Nunca se aplica en prod una
   migración que no haya pasado por los tres anteriores.
3. **Una migración ya aplicada no se edita jamás.** Si estaba mal, se escribe otra que corrige.
4. **El artefacto se promueve, no se reconstruye.** Lo que se aprobó en UAT es exactamente lo
   que llega a prod, con la misma versión.
5. **Nunca se copian datos de prod a otro ambiente sin anonimizar.** Los nombres completos, los
   documentos y los salarios de las empleadas son datos personales bajo la Ley 1581 de 2012, y
   [`11-riesgos-y-proteccion-de-datos.md`](11-riesgos-y-proteccion-de-datos.md) ya fija su
   tratamiento. UAT lleva datos anonimizados.
6. **La configuración no vive en el código.** En Flutter entra por `--dart-define` al compilar;
   en la API, por variables de entorno. Ningún secreto queda en el repositorio.

Las reglas 2, 3 y 4 son el resto de este documento: la promoción está en el §2 y la
configuración de la regla 6, en el §3.

---

## 2. La promoción

### 2.1 Las migraciones suben en orden, nunca saltan

```
dev ──▶ qa ──▶ uat ──▶ prod
```

Una migración nace en dev, se aplica en qa cuando pasan las pruebas, llega a uat cuando Gerencia
va a revisar, y solo entonces puede ir a prod. Saltarse un escalón deja prod con un esquema que
nadie probó.

**Y en cada ambiente, la migración llega antes que la API que la necesita.** Viven en repositorios
distintos ([ADR-025](adr/ADR-025-cuatro-repositorios.md)), así que nada obliga a publicarlas
juntas: la migración tiene que ser compatible con la API que ya está corriendo, la API nueva se
publica después, y lo que quedó viejo se quita en una versión posterior.

> **El esquema vive en migraciones, no en un volcado.** Un volcado es la foto de un momento; las
> migraciones son la receta reproducible, y son lo único que puede aplicarse cuatro veces en el
> mismo orden y dar cuatro bases idénticas.

### 2.2 Una migración aplicada no se edita nunca

Es el mismo principio que ya rige el dinero y la historia del sistema:

| Dónde ya se aplica | Cómo se corrige un error |
|---|---|
| Un movimiento mal registrado (`CU-04`) | Con un **contra-asiento**, no borrando la fila |
| La base de datos ([ADR-004](adr/ADR-004-base-solo-escritura.md)) | Escribiendo encima, nunca con `DELETE` |
| Una migración ya aplicada | Con **otra migración** que corrige |

La razón es la misma en los tres casos: lo que ya ocurrió, ocurrió. Editar el archivo de una
migración que prod ya aplicó no cambia prod —ahí sigue el error— y sí deja dev y qa creyendo una
historia distinta de la real. A partir de ahí, los cuatro ambientes dejan de ser comparables y
no hay forma de saber cuál dice la verdad.

### 2.3 El artefacto se promueve, no se reconstruye

Se compila **una vez**, en el paso a qa. Ese mismo archivo —el mismo `build/web` del front, la
misma imagen de contenedor de `prisma_api`— es el que se aprueba en uat y el que se publica en
prod. Lo único que cambia entre ambientes es la configuración del §3.

> **Recompilar para prod sería aprobar una cosa y publicar otra.** Entre dos compilaciones cambia
> la versión de una dependencia, la fecha, el compilador. Lo que Gerencia firmó en UAT dejaría de
> ser lo que corre en el taller, y la firma no valdría nada.

Consecuencia práctica: la configuración del front **no puede compilarse dentro del artefacto de
prod en el momento de publicar**, porque eso es recompilar. Cada ambiente compila su propio
artefacto en el paso a qa con sus `--dart-define`, y el que se promueve es el del ambiente
destino, construido desde el mismo commit ya aprobado.

### 2.4 El artefacto de la API: una imagen de contenedor con una JVM adentro

`prisma_api` es una aplicación Java 25 con Spring Boot, y eso decide cómo se construye, qué se
promueve y qué hace falta para alojarla:

| Asunto | Cómo queda | Por qué |
|---|---|---|
| **Construcción** | **Gradle** (`./gradlew bootJar`) produce un **JAR ejecutable** de Spring Boot: un solo archivo con la aplicación y sus dependencias | Un JAR y nada más que copiar. Lo que corre en prod no depende de qué haya instalado en la máquina, **ni siquiera del JDK**: Gradle descarga el 25 por su cuenta ([ADR-024](adr/ADR-024-java-25-y-gradle.md)) |
| **Artefacto** | Una **imagen de contenedor** en dos etapas: se compila con el JDK, se publica solo con el JRE 25 | La etiqueta de la imagen es la versión SemVer del §4. Esa imagen es la que se promueve tal cual por los cuatro ambientes |
| **Memoria** | **512 MB como mínimo** por instancia, y el contenedor arranca con `-XX:MaxRAMPercentage=75` | La JVM reserva su montón según lo que cree que tiene disponible |
| **Arranque** | Segundos, no milisegundos. La comprobación de salud espera a que termine | Un orquestador impaciente reinicia en bucle una aplicación que solo estaba arrancando |
| **Salud** | `/actuator/health`, con sondas separadas de vida y de disponibilidad | El tráfico no entra antes de que la base esté conectada y las migraciones verificadas |

> **La JVM no adivina cuánta memoria le dieron.** Si no se le dice, toma como referencia la de la
> máquina anfitriona, reserva de más y el contenedor la mata sin explicación. Ese fallo se ve como
> «la API se cae sola» y se pierde una tarde buscándolo en el código, donde no está.

Esto tiene dos consecuencias que hay que asumir, no esconder: un binario pequeño arrancaría más
rápido y pediría menos memoria, y **alojar una JVM en cuatro ambientes cuesta más**. El costo está
en el §8; el arranque en frío decide que uat y prod no pueden vivir en un plan que duerme el
servicio por inactividad, porque la primera petición después de la siesta paga el arranque entero.

---

## 3. La configuración de cada ambiente

### 3.1 El front: `--dart-define` al compilar

Flutter Web no lee variables de entorno en el navegador: los valores entran al compilar y quedan
dentro del artefacto.

| Clave | Qué es | Ejemplo en dev | Ejemplo en prod |
|---|---|---|---|
| `PRISMA_API_URL` | Dónde vive `prisma_api` | `https://api-dev.prismamy.co` | `https://api.prismamy.co` |
| `PRISMA_AMBIENTE` | Cuál de los cuatro es | `dev` | `prod` |
| `PRISMA_API_MAJOR` | Qué MAJOR de la API exige (§4.3) | `0` | `1` |
| `PRISMA_COMMIT` | Referencia del commit compilado | `a3f19c4` | `a3f19c4` |
| `PRISMA_FECHA_COMPILACION` | Cuándo se compiló, ISO 8601 | `2026-09-15T09:40:00-05:00` | `2026-09-15T09:40:00-05:00` |

> **En el front no entra ningún secreto, nunca.** Todo lo que se compila en un Flutter Web queda
> a la vista de cualquiera que abra las herramientas del navegador. Una URL no es un secreto; una
> clave de base de datos sí. Por eso el front ya no lleva ninguna: habla con `prisma_api` y nada
> más.

### 3.2 La API: variables de entorno

| Variable | Para qué | Nota |
|---|---|---|
| `PRISMA_AMBIENTE` | Lo que responde `GET /version` y lo que pinta la franja | `dev`, `qa`, `uat` o `prod` |
| `DATABASE_URL` | Conexión a PostgreSQL | Con el rol `prisma_api`, **sin `BYPASSRLS`** y sin ser dueño de las tablas |
| `SUPABASE_URL` | Proyecto de Supabase del ambiente | Uno distinto por ambiente |
| `SUPABASE_ANON_KEY` | Iniciar sesión contra Supabase Auth | Solo la usa la API, no el front |
| `SUPABASE_JWT_SECRET` | Verificar el token que llega en cada petición | Secreto |
| `SUPABASE_SERVICE_ROLE_KEY` | Migraciones y tareas administrativas | **Jamás en el camino de una petición de usuario.** Secreto aparte, con acceso aparte |
| `DOMINIO_CORREO_SINTETICO` | Armar el correo interno del login ([ADR-009](adr/ADR-009-login-por-usuario.md)) | Fijo de por vida. El front nunca lo ve |
| `ORIGENES_PERMITIDOS` | CORS: el dominio del front de ese ambiente, y solo ese | prod no acepta al front de qa |
| `SERVER_PORT` | Dónde escucha | Spring Boot la lee tal cual, sin código de por medio |
| `SPRING_PROFILES_ACTIVE` | Qué perfil de configuración carga | Uno por ambiente. El perfil no trae secretos: trae qué se activa y qué no |
| `JAVA_TOOL_OPTIONS` | Ajustes de la JVM, empezando por `-XX:MaxRAMPercentage=75` | Ver §2.4. Sin esto la JVM reserva según la máquina anfitriona |

### 3.3 Dónde viven los secretos

| Secreto | Dónde vive | Dónde NO |
|---|---|---|
| Claves de la API por ambiente | Gestor de secretos del proveedor de despliegue | En el repositorio |
| Claves que necesita la integración continua | Secretos del repositorio, uno por ambiente | En el archivo del pipeline |
| `SUPABASE_SERVICE_ROLE_KEY` | Secreto separado, solo para el trabajo de migraciones | En el despliegue de la API que atiende usuarios |

En el repositorio solo hay un `.env.ejemplo` con las claves y los valores vacíos. Sirve para
saber qué hace falta, no para arrancar nada.

---

## 4. Versionado

### 4.1 Tres cosas versionadas por separado

| Proyecto | Dónde vive la versión | Formato |
|---|---|---|
| `prisma_front` | `pubspec.yaml` | `MAJOR.MINOR.PATCH+BUILD` |
| `prisma_api` | `build.gradle.kts` | `MAJOR.MINOR.PATCH`, y la misma cadena etiqueta la imagen de contenedor |
| Esquema de base (`prisma_db`) | Migraciones numeradas + tabla `schema_version` | `MAJOR.MINOR.PATCH` |

### 4.2 Las reglas

- **Antes del go-live todo es `0.y.z`.** La primera publicación en prod es `1.0.0`. Es lo que
  dice SemVer y evita fingir una estabilidad que todavía no existe.
- **MAJOR** de la API: cambio que rompe el contrato con el front —un campo que desaparece, un
  tipo que cambia, un endpoint que se va—.
- **MINOR**: funcionalidad nueva compatible hacia atrás.
- **PATCH**: corrección que no cambia el contrato.
- **Las versiones del front y de la API son independientes.** No se sincronizan artificialmente:
  fingir que van juntas oculta cuál de las dos cambió de verdad.

### 4.3 El contrato de compatibilidad

Para que ser independientes no signifique romperse en silencio:

| Pieza | Qué hace |
|---|---|
| `GET /version` | La API publica su versión, la del esquema y el ambiente |
| `PRISMA_API_MAJOR` | El front declara al compilar qué MAJOR de la API necesita |
| Comprobación al arrancar | El front consulta `/version`; si el MAJOR no coincide, muestra «Esta versión de la aplicación ya no sirve con el servidor. Actualiza.» y no deja seguir |
| Ventana de soporte | Cada versión de la API declara hasta cuándo sostiene el MAJOR anterior |

> **Fallar ruidoso es mejor que fallar en la pantalla 7 con un campo nulo.** Una pantalla que
> dice qué pasa y qué hacer cuesta una vez; un formulario que se cae a medio pedido cuesta cada
> día, y nadie sabe por qué.

---

## 5. La versión y el ambiente, visibles en el front

### 5.1 La insignia permanente

Siempre visible, discreta, **al pie de la barra lateral, abajo a la izquierda**, debajo de la
navegación. Ahí no compite con nada y es donde la gente la busca por costumbre; la barra superior
es para la identidad y las acciones de la sesión, y la versión no es ninguna de las dos cosas:

```
v0.4.2 · QA
```

| Ambiente | Cómo se ve |
|---|---|
| dev, qa, uat | Versión **y** nombre del ambiente, en color de advertencia (`--warn`) |
| prod | Solo la versión, en color neutro |

Rotular «PROD» en el sistema real es ruido: si no dice nada, es el de verdad. El nombre del
ambiente va completo y en español: `Desarrollo`, `QA`, `Aprobación`.

### 5.2 La franja de ambiente

En dev, qa y uat, además de la insignia, una **franja fija** arriba, con el mismo patrón que la
franja de «Ver como Operación» que ya existe en el mockup:

> **Ambiente de QA · los datos no son reales**

En prod no hay franja.

Esto no es adorno: es lo que evita que alguien registre la venta del día en UAT y la dé por
guardada. El patrón visual ya está construido y aprobado para exactamente este propósito
([`10-ux-y-mockups.md`](10-ux-y-mockups.md)).

### 5.3 El panel «Acerca de»

Dentro del menú de la sesión, una opción que abre un panel con:

| Dato | Ejemplo |
|---|---|
| Versión del front | `0.4.2+118` |
| Versión de la API | `0.3.9` |
| Versión del esquema | `0.3.0` |
| Ambiente | `QA` |
| Fecha de compilación | `15 sep 2026, 9:40 a. m.` |
| Referencia del commit | `a3f19c4` |

Sirve para lo que sirve de verdad: cuando alguien reporta un fallo, lo primero que hay que saber
es qué versión estaba usando y contra qué servidor.

---

## 6. Integración continua

### 6.1 En cada empuje

| Etapa | Qué hace | Bloquea si… |
|---|---|---|
| Formato | `dart format --set-exit-if-changed` en el front; `Spotless` en la API | El código no está formateado |
| Análisis estático | `dart analyze --fatal-infos` en el front; compilación con `-Xlint:all -Werror` y `Checkstyle` en la API | Hay un aviso sin resolver |
| Regla de dependencias | El dominio no importa nada de infraestructura ni de HTTP. En la API lo verifica `ArchUnit` | Alguien la cruzó |
| Pruebas unitarias | Las fórmulas financieras, sin base ni red ([`12-pruebas-y-calidad.md`](12-pruebas-y-calidad.md)) | Falla una |
| **OpenAPI** | Regenera el documento desde los controladores y lo compara con el `openapi.json` versionado ([ADR-022](adr/ADR-022-openapi-generado.md)) | El regenerado difiere del versionado |
| Compilación | `flutter build web` y la imagen de contenedor de `prisma_api` | No compila |

> **La documentación desactualizada deja de ser un descuido y pasa a ser una compilación roja.** El
> OpenAPI se genera del código, así que la única forma de que difiera del versionado es que alguien
> cambiara el contrato sin volver a generarlo. Actualizarlo cuesta un comando; descubrir en prod
> que Swagger describe una API que ya no existe cuesta mucho más. Es la prueba C-04 de
> [`12-pruebas-y-calidad.md`](12-pruebas-y-calidad.md) y lo que hace exigible el **RNF-30**.

### 6.2 En cada promoción

Lo anterior más lo que solo se puede probar contra una base real del ambiente destino:

| Etapa | Qué hace | Por qué no basta con lo unitario |
|---|---|---|
| Migraciones | Aplica las pendientes sobre la base del ambiente | Una migración solo se sabe buena cuando corre |
| Pruebas de integración | Repositorios y transacciones contra la base real | El `if` de Java no prueba la restricción de PostgreSQL |
| **Prueba de permisos** | Sesión **real** de tipo Operación a través de la API: `GET /nomina`, `GET /usuarios` y `GET /patrimonio` devuelven vacío o 403 | Es lo único que demuestra que RLS sigue juzgando con la API en medio |
| Traducción de errores | Recorre `pg_constraint` y exige que cada restricción nombrada tenga mensaje en español | Una regla nueva en la base sin mensaje sale al usuario como un error del motor |

La prueba de permisos es la que sostiene [ADR-006](adr/ADR-006-rls-por-rol.md) y
[ADR-012](adr/ADR-012-identidad-a-postgres.md), y se hace con un giro que no es opcional:
**se desactiva temporalmente la comprobación de la capa de
aplicación y el resultado debe ser el mismo.** Si al quitar el `if` los datos aparecen, RLS no
está actuando y la prueba falla, aunque en el ambiente de verdad nadie note nada. Las pruebas
`P-01` a `P-32` de [`12-pruebas-y-calidad.md`](12-pruebas-y-calidad.md) son el catálogo concreto.

> **Una prueba de permisos que pasa por el `if` de Java no prueba permisos: prueba el `if`.**
> El único juez válido es PostgreSQL, y la única forma de comprobarlo es quitándole al juez de
> encima todo lo que pueda estar respondiendo en su lugar.

---

## 7. Publicar y volver atrás

### 7.1 Publicar

| # | Paso | Quién |
|---|---|---|
| 1 | Las pruebas del §6.1 pasan en verde en la rama | Automático |
| 2 | Se compila el artefacto y se promueve a qa; corren las pruebas del §6.2 | Automático |
| 3 | Se promueve a uat con las migraciones y se avisa a Gerencia | Desarrollo |
| 4 | Gerencia revisa en uat lo que pidió y lo aprueba | Gerencia |
| 5 | Se aplican las migraciones en prod | Desarrollo |
| 6 | Se promueve **el mismo artefacto** a prod y se anota versión, commit, fecha y quién aprobó | Desarrollo |
| 7 | Se comprueba `GET /version` en prod y se abre una pantalla real | Desarrollo |

El paso 5 va antes del 6 a propósito: el esquema nuevo tiene que estar listo cuando llegue el
código que lo usa.

### 7.2 Volver atrás

Es lo que casi nadie escribe y lo que siempre hace falta. **Se decide en minutos, no se
improvisa.**

| Situación | Qué se hace |
|---|---|
| La API no arranca, o falla todo | **Reversión inmediata** al artefacto anterior |
| Una pantalla se rompe y hay forma de trabajar sin ella | Se avisa y se corrige hacia adelante |
| Los datos se están guardando mal | **Reversión inmediata**, y después se revisa qué quedó escrito |
| El front no cuadra con el MAJOR de la API | Se revierte el que se publicó último |

El procedimiento:

| # | Paso | Detalle |
|---|---|---|
| 1 | Publicar de nuevo la versión anterior | Está guardada: el artefacto se promovió, no se reconstruyó (§2.3), así que existe tal cual |
| 2 | Revertir front y API por separado | Sus versiones son independientes (§4.2). Se devuelve solo el que rompió |
| 3 | Comprobar el MAJOR | Tras revertir, el front y la API tienen que seguir cumpliendo el contrato del §4.3 |
| 4 | **No tocar la base** | Ver abajo |
| 5 | Anotar qué se revirtió, cuándo y por qué | Y qué versión quedó corriendo |

### 7.3 Las migraciones no se deshacen

Este es el punto que hace distinta una reversión de base de datos de una reversión de código:

> **El código vuelve atrás; el esquema no.** Una migración ya aplicada no se deshace: si el daño
> está en el esquema, se escribe **otra migración** que corrige y se promueve por los cuatro
> ambientes como cualquier otra. Deshacerla borrando lo que creó destruiría los datos que se
> escribieron mientras tanto.

De ahí sale una regla que hay que respetar al escribir cada migración, no al revertir:

**Toda migración debe dejar la base funcionando también con la versión anterior de la API.** En
la práctica: primero se agrega, después se usa, y solo mucho después —cuando ninguna versión viva
lo necesite— se retira. Una columna nueva nace aceptando nulos; una columna que sobra se deja de
escribir en una versión y se elimina en otra posterior.

Si una migración no cumple esa regla, la reversión del paso 1 deja a la versión anterior hablando
con un esquema que ya no entiende. Y entonces no hay reversión posible: solo queda corregir hacia
adelante, a las carreras y en producción, que es exactamente la situación que este documento
existe para evitar.

Para el caso extremo —datos mal escritos que hay que recuperar— el respaldo del proveedor y el
`PITR` siguen siendo la red de seguridad, descrita en
[`16-base-de-datos-y-snapshots.md`](16-base-de-datos-y-snapshots.md) y en
[`13-respaldo-y-exportacion.md`](13-respaldo-y-exportacion.md).

---

## 8. El costo, dicho sin adornos

[ADR-001](adr/ADR-001-stack.md) declaró **presupuesto de operación cero**. Ese objetivo ya no se
sostiene, y por eso el **RNF-14 se reescribió**: lo que se exige es **costo mensual de operación al
mínimo sostenible**, no cero. Hay que saberlo antes del go-live, no el día del go-live.

Dos cosas lo rompen, cada una por su lado:

| Qué rompe el costo cero | Por qué |
|---|---|
| **RNF-20 · siempre en línea** | El plan gratuito de Supabase pausa el proyecto tras una semana de inactividad. Un taller que factura los lunes encontraría el sistema dormido |
| **La API en Java** ([ADR-017](adr/ADR-017-api-en-java.md)) | Una JVM pide memoria y tarda segundos en arrancar (§2.4). **Alojar una JVM en cuatro ambientes cuesta más que alojar un binario pequeño**, y eso fue parte del precio de elegir Java |

### 8.1 Qué se paga y qué no

| Ambiente | Base de datos | Alojamiento de la API | Por qué |
|---|---|---|---|
| dev | Gratuito | Gratuito, o en la máquina de quien desarrolla | Que se pause por inactividad no molesta a nadie |
| qa | Gratuito | Gratuito, y puede dormirse | La integración continua lo despierta cuando le toca correr |
| uat | **De pago** | **De pago, sin dormirse** | Gerencia aprueba ahí; encontrarlo dormido invalida la revisión |
| prod | **De pago** | **De pago, sin dormirse** | «Siempre en línea» es el requisito |

Son, como mínimo, **dos proyectos de Supabase de pago y dos instancias de la API encendidas**, con
512 MB de memoria cada una como piso (§2.4). No es un impedimento: es una factura, y es pequeña.
Pero es mayor de la que habría con un binario de unas decenas de megabytes, y decirlo es parte de
haber elegido Java a conciencia y no por descuido.

El alojamiento de la API y del front es **Railway**, y se contrata al final del desarrollo
([ADR-026](adr/ADR-026-railway-al-final.md)). Hasta entonces, dev es la máquina de quien desarrolla
contra el proyecto dev de Supabase, que es lo que la fila de dev ya permitía.

> **Costo al mínimo no es costo cero, y confundirlos se paga en disponibilidad.** Lo que se ahorra
> apagando uat o dejando dormir a prod se cobra el día que Gerencia no puede aprobar, o que la
> empleada abre la aplicación y se queda esperando el arranque. El mínimo es el más barato **de los
> que cumplen RNF-20**, no el más barato de todos.

Queda escrito aquí, en [ADR-013](adr/ADR-013-cuatro-ambientes.md) y en
[`09-plan-de-implantacion.md`](09-plan-de-implantacion.md) para que nadie lo descubra tarde.

---

## 9. Lo que este documento no cubre

**Este documento no repite la arquitectura.** Cómo está construido el sistema por dentro —las
capas, la regla de dependencias, el dominio, cómo `prisma_api` propaga la identidad hasta
PostgreSQL— está en [`07-arquitectura.md`](07-arquitectura.md), y ahí es donde se cambia. Aquí
solo está **con qué configuración corre cada ambiente y cómo se mueve una versión entre ellos**.

| Si buscas… | Ve a… |
|---|---|
| Cómo está construido por dentro | [`07-arquitectura.md`](07-arquitectura.md) |
| Qué se prueba y con qué criterio | [`12-pruebas-y-calidad.md`](12-pruebas-y-calidad.md) |
| Cómo se recrea la base y qué datos de prueba hay | [`16-base-de-datos-y-snapshots.md`](16-base-de-datos-y-snapshots.md) |
| Qué pasa cuando no hay señal | [`17-resiliencia-offline-y-cache.md`](17-resiliencia-offline-y-cache.md) |
| Qué objetivos de compilación se publican y cuándo | [`18-distribucion-y-pipelines.md`](18-distribucion-y-pipelines.md) |
| Qué forma tiene cada respuesta de la API y qué cabeceras lleva | [`20-contrato-de-api.md`](20-contrato-de-api.md) |

---

### 🧭 Navegación

**⬅️ Anterior:** [18 · Distribución y pipelines](18-distribucion-y-pipelines.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [20 · Contrato de la API](20-contrato-de-api.md)
