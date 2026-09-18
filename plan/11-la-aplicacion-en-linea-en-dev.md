# 10 · La aplicación en línea, en dev

**2026-09-17** · Tareas [0.8](../docs/08-plan-de-desarrollo.md#tarea-0-8) y [0.9](../docs/08-plan-de-desarrollo.md#tarea-0-9) del [Sprint 0](../docs/08-plan-de-desarrollo.md#sprint-0), carriles API y Front, traídas del
[Sprint 9](../docs/08-plan-de-desarrollo.md#sprint-9) a donde estaban. Toca los tres repositorios de código, doce documentos y la consola de
Railway. Quien dirige pidió ver la aplicación funcionando en línea, y el [ADR-026](../docs/adr/ADR-026-railway-al-final.md) previó
exactamente este día: **«ese es el momento de adelantar la 0.9, no de improvisar un despliegue a
mano»**. Esto es adelantarla.

## Qué se va a hacer

1. **[ADR-032](../docs/adr/ADR-032-railway-en-dev-ahora.md)**, que reemplaza al [ADR-026](../docs/adr/ADR-026-railway-al-final.md): Railway aloja **dev** desde ahora; qa, uat y prod siguen
   esperando al [Sprint 9](../docs/08-plan-de-desarrollo.md#sprint-9). El 026 pasa a ⛔ Reemplazado sin que se le toque el cuerpo, como los
   otros seis del [`docs/adr/README.md`](../docs/adr/README.md).

2. **`prisma_api`, rama `feature/0.8`** — cuatro cambios y un archivo nuevo:
   - `application.yml` — `port: ${PORT:${SERVER_PORT:8081}}`. Hoy la aplicación **ignora la variable
     `PORT` que Railway inyecta**: con `PORT=8200` puesta, Tomcat se quedó escuchando en 8081 y el
     8200 no contestó nada. El servicio quedaría inalcanzable con el proceso vivo.
   - `application.yml` — el grupo de disponibilidad incluye `db`. Hoy `/actuator/health/readiness`
     responde `UP` con la base inalcanzable, que es lo contrario de lo que promete el
     [19 §2.4](../docs/19-ambientes-y-entrega.md#24-el-artefacto-de-la-api-una-imagen-de-contenedor-con-una-jvm-adentro).
   - `application.yml` — `server.forward-headers-strategy: framework`, para que detrás del proxy de
     Railway la aplicación sepa que la petición llegó por `https`.
   - `application.yml` — el perfil `dev` deja de escribir `org.springframework.jdbc.core` en DEBUG.
     En una máquina es ruido; en un servicio expuesto es el correo sintético de cada persona del
     taller escrito en los registros de un tercero, y el [19](../docs/19-ambientes-y-entrega.md) cita la Ley 1581.
   - `railway.json` — la sonda, su tiempo de espera y la política de reinicio, versionados.

3. **`prisma_front`, rama `feature/0.9`** — la receta de publicación que el [ADR-026](../docs/adr/ADR-026-railway-al-final.md) dice que no
   existe, y no existe:
   - `Dockerfile` en dos etapas: compila con Flutter fijado por versión y publica sobre `nginx`.
   - `nginx/default.conf.template` con `listen ${PORT};`, `try_files` a `index.html`, `gzip_types`
     explícitos y `NGINX_ENVSUBST_FILTER=PORT` para que `envsubst` no se coma otras variables.
   - `.dockerignore`, que importa: hay 159 archivos versionados, con `android/`, `ios/` y `assets/`.
   - `--no-web-resources-cdn` en la compilación web, **y también en
     [`.github/workflows/ci.yml`](../repositories/frontend-flutter/.github/workflows/ci.yml)**. Sin ese indicador el motor CanvasKit se descarga de
     `gstatic.com` en cada arranque aunque viaje dentro del contenedor: una dependencia de un
     tercero en tiempo de ejecución, y la promesa de abrir sin conexión rota.
   - `PRISMA_COMMIT` desde un `ARG` alimentado por `RAILWAY_GIT_COMMIT_SHA`, nunca como variable
     escrita a mano: puesta a mano queda congelada y «Acerca de» miente en cada despliegue futuro.

4. **La versión SemVer de los dos proyectos sube**, que es requisito de
   [terminado](../docs/08-plan-de-desarrollo.md#4-definición-de-terminado) y no un trámite: la de la API es la etiqueta de su imagen ([ADR-014](../docs/adr/ADR-014-semver.md)) y lo que
   responde `/version`, con lo que el front compara el MAJOR.

5. **Railway, en la consola** —lo único que no se puede escribir—: dos servicios en un proyecto,
   los dos dominios generados **antes** de la primera construcción, y las variables cargadas. Se
   revisa primero el servicio de front que hoy falla en cada push, anotado en [`TODO.md`](../TODO.md) §9.

6. **Los documentos**: [08](../docs/08-plan-de-desarrollo.md) y [`TODO.md`](../TODO.md) (las tareas dejan de estar diferidas y el [H1](../docs/08-plan-de-desarrollo.md#h1) se vuelve a unir),
   [19](../docs/19-ambientes-y-entrega.md), [09](../docs/09-plan-de-implantacion.md), [21](../docs/21-trabajo-en-paralelo.md), [`CLAUDE.md`](../CLAUDE.md), [`README.md`](../README.md), [`docs/INDICE.md`](../docs/INDICE.md) y [`docs/adr/README.md`](../docs/adr/README.md).

## Qué se decidió, y por qué

**Se adelanta por la puerta que el 026 dejó abierta, no contra él.** El 026 decidió no pagar
alojamiento durante meses sin usuarios, y esa razón sigue siendo buena para qa, uat y prod: los tres
siguen en el [Sprint 9](../docs/08-plan-de-desarrollo.md#sprint-9). Lo que cambia es que ya hay algo que enseñar y alguien a quien enseñárselo,
que es la condición exacta que el propio ADR puso para adelantar. Se descartó el despliegue a mano
sin papeleo: es lo único que el 026 nombra para prohibirlo.

**La 0.8 se acota a dev, y eso queda escrito.** Tal como está redactada pide «arranque verificado en
los cuatro ambientes» y depende de [H4](../docs/08-plan-de-desarrollo.md#h4) a [H9](../docs/08-plan-de-desarrollo.md#h9), que es lo que la ancla al final del plan. Cumplirla
entera hoy es imposible porque uat y prod no existen. Se cumple en dev y el resto se queda en el
[Sprint 9](../docs/08-plan-de-desarrollo.md#sprint-9). Se descartó partirla en dos tareas: el plan y el tablero tienen que enumerar las mismas
132, y partir una las vuelve 133.

**Dos dominios, y no uno con `nginx` haciendo de proxy.** Lo decidió quien dirige. Tiene un costo
conocido y conviene que esté escrito antes de pagarlo: `PRISMA_API_URL` se hornea dentro del
JavaScript al compilar, así que mover el dominio obliga a reconstruir el front entero; y la cookie
`prisma_renovacion` que trae la [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2) va a exigir `SameSite=None` y `allowCredentials=true`, que hoy
está en `false` con su justificación escrita. `*.up.railway.app` está en la Public Suffix List, así
que ni siendo subdominios hermanos comparten cookie. Va al [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar) del tablero.

**El puerto se arregla en el código, no con dos variables en la consola.** Fijar `SERVER_PORT` y
`PORT` al mismo valor funciona, pero deja el arranque dependiendo de que nadie toque una casilla.
`${PORT:${SERVER_PORT:8081}}` respeta a Railway, no rompe el arranque local ni el `.env` de nadie, y
es una línea.

**La sonda mira la base, aun sabiendo lo que cuesta.** Con `db` adentro, un despliegue intentado con
el proyecto de Supabase pausado no pasa a verde nunca, y el plan gratuito se pausa tras una semana
sin actividad. Se acepta: una sonda que dice `UP` con la base caída hace que Railway enrute tráfico a
una API que no puede consultar nada, y eso es peor que un despliegue que no arranca. Qué hacer el
lunes siguiente —despertar el proyecto en la consola de Supabase y reintentar— va en el [19](../docs/19-ambientes-y-entrega.md).

**Se construye desde el repositorio, y eso incumple la condición 1 del [ADR-026](../docs/adr/ADR-026-railway-al-final.md).** El
[19 §2.3](../docs/19-ambientes-y-entrega.md#23-el-artefacto-se-promueve-no-se-reconstruye) exige compilar una vez y promover esa imagen por su etiqueta. Hoy es imposible: el trabajo
`imagen` de la integración continua hace un `docker build` suelto, sin registro ni `push`, y solo en
`main`. Cumplirlo de verdad pide publicar en un registro y que Railway despliegue esa etiqueta, que
es trabajo de la promoción del [Sprint 9](../docs/08-plan-de-desarrollo.md#sprint-9). Para dev se acepta construir desde el repositorio, se
anota en el [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar) y el [ADR-032](../docs/adr/ADR-032-railway-en-dev-ahora.md) lo dice en vez de dejar al [19 §2.3](../docs/19-ambientes-y-entrega.md#23-el-artefacto-se-promueve-no-se-reconstruye) mintiendo.

**La base no cambia: el pooler ya está probado.** El `.env` de la máquina de desarrollo ya apunta al
**pooler de sesión** de dev en la nube, así que la cadena que Railway necesita se usa todos los días,
`SET LOCAL ROLE authenticated` incluido. Además no hay alternativa: el host directo de Supabase solo
tiene registro AAAA, y la salida de Railway es IPv4. Lo único que se añade al valor es
`?sslmode=require` —hoy viaja en `prefer`, que cifra sin verificar quién está del otro lado— y
`POOL_MAXIMO` baja de 10, porque el tope de conexiones del plan gratuito lo comparten Railway, la
máquina de quien desarrolla y las pruebas.

**La URL se trata como semiprivada, por decisión de quien dirige.** La semilla de dev crea los
usuarios del mockup con contraseña conocida insertando directo en `auth.users`. Queda escrito aquí:
**mientras esas contraseñas sigan siendo las de la semilla, el enlace no se comparte fuera de quien
tenga que verlo**. Cambiarlas en dev es lo que cierra ese riesgo, y no está hecho.

**Lo que se va a ver es la puerta, no la aplicación.** Con 45 de 132 tareas hay tres controladores
vivos. Se verá el front, la franja de ambiente, la insignia, «Acerca de» preguntando la versión, y
el acceso funcionando de verdad contra Supabase Auth. Detrás, `lib/main.dart` dice «Las pantallas
llegan en el Sprint 2». Y **camila no se usa para la demostración**: entra con clave temporal y el
front le pide `PUT /api/v0/sesiones/actual/clave`, que no existe hasta la [2.13](../docs/08-plan-de-desarrollo.md#tarea-2-13), así que quedaría
atrapada en una pantalla de error sin poder salir. Son cuatro usuarios, no cinco.

**Lo que esto compra es lo que el 026 dio por perdido:** el camino completo navegador → Railway →
API → pooler → RLS, probado meses antes de que hubiera que confiar en él. La memoria de la JVM, la
variable que falta, la sonda y el CORS entre dominios reales son justo lo que el 026 anotó como
«lo que solo falla desplegado».

## Cómo se va a verificar

- **La prueba del front no es que se vea la insignia**: es que **la pantalla de acceso muestre sus
  campos**. Sin campos es indistinguible un fallo de CORS, una API caída, un `PRISMA_API_URL` en
  `http://` o un descriptor roto: cuatro causas, un síntoma, ningún rastro.
- `POST /api/v0/consultas/version` con `Idempotency-Key` contra el dominio de la API, esperando el
  sobre con `status` 20000 y el ambiente correcto. Un despliegue verde no prueba que la base
  responda.
- **Iniciar sesión de verdad** con un usuario de Gerencia y otro de Operación, que es lo que prueba
  que `SET LOCAL ROLE` cruzó el pooler.
- `grep gstatic build/web/flutter_bootstrap.js` vacío tras compilar, que es lo único que demuestra
  que el motor viaja adentro.
- El `Dockerfile` del front probado con `docker build` y `docker run` **en local antes de empujar**.
- La API: `./gradlew build` en verde con sus 447 pruebas, y `dart analyze --fatal-infos` y
  `flutter test` en el front.
- `enlazar` y `verificar --base main` en verde, con las versiones subidas y ningún bloque generado
  tocado a mano.
- Los commits bajo los 256 caracteres del [ADR-031](../docs/adr/ADR-031-commit-de-256-caracteres.md), medidos antes de crearlos, y uno por tarea
  ([ADR-028](../docs/adr/ADR-028-un-commit-por-tarea.md)).
