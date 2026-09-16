# 21 · Trabajo en paralelo con dos equipos

Cómo se reparte PRISMA entre dos equipos que trabajan a la vez sin bloquearse ni pisarse.

> **Estado: los repositorios ya existen; los dos equipos, todavía no.** Los cuatro repositorios
> están en GitHub ([ADR-025](adr/ADR-025-cuatro-repositorios.md),
> [ADR-026](adr/ADR-026-railway-al-final.md)). Este documento fija cómo debe quedar el resto
> **antes** de que el segundo equipo escriba su primera línea: después ya hay código que
> reorganizar y decisiones tomadas por omisión.

---

## 1. Lo que hace esto posible, y lo que lo haría imposible

El paralelismo no sale de repartir tareas. Sale de que **ya existe una frontera explícita** entre
las partes. Tres decisiones tomadas antes lo permiten:

| Decisión | Por qué habilita el paralelismo |
|---|---|
| [`ADR-018`](adr/ADR-018-front-sin-decisiones.md) · el front no decide nada | El front no necesita conocer ninguna regla: solo el contrato. Puede construirse entero contra un servidor simulado |
| [`ADR-019`](adr/ADR-019-contrato-de-respuesta.md) · sobre y catálogo de códigos | La forma de toda respuesta está fijada antes de escribir la primera. Nadie negocia el formato dos veces |
| [`ADR-022`](adr/ADR-022-openapi-generado.md) · OpenAPI verificado en CI | El contrato no se desincroniza en silencio: la compilación falla |

Y una que lo haría imposible si se relajara:

> **Si el front empieza a decidir algo —un umbral, un mensaje, qué opción de menú existe— los dos
> equipos dejan de tener una frontera y pasan a tener una negociación permanente.** Cada
> funcionalidad exigiría ponerse de acuerdo sobre dónde vive cada regla. El principio 9 de
> [`10-ux-y-mockups.md`](10-ux-y-mockups.md) no es una preferencia de estilo: es lo que mantiene
> a los dos equipos independientes.

---

## 2. Los dos equipos

| | **Equipo API** | **Equipo Front** |
|---|---|---|
| **Posee** | `prisma_api` y `prisma_db`, donde viven las migraciones | `prisma_front` |
| **Escribe** | Java 25, Spring Boot, SQL | Dart, Flutter |
| **Responde por** | Que la regla se cumpla y el mensaje sea correcto | Que la pantalla sea la del mockup y pinte lo que le dictan |
| **No toca** | Widgets, rutas del front | SQL, reglas de negocio, textos de error |

La capa de datos **no tiene equipo propio**, y es deliberado: un equipo de datos se convierte en
cuello de botella porque toda funcionalidad necesita migración y todas las esperan por él. Las
migraciones las escribe el equipo API, que es el único que habla con la base.

### 2.1 Lo que se posee en conjunto

Tres cosas no son de nadie en particular y **cambian con revisión de los dos equipos**:

- El **contrato** (`openapi.json` y el catálogo de códigos).
- El **mockup**, que sigue siendo el contrato de diseño.
- Los **documentos** de `docs/`.

Un cambio en cualquiera de las tres afecta a los dos lados, así que un solo equipo no puede
decidirlo por su cuenta. Es la única coordinación obligatoria que queda, y por eso conviene que
sea la única.

---

## 3. Cuatro repositorios

| Repositorio | En disco | Qué vive ahí | Quién lo cambia |
|---|---|---|---|
| **`Finanzas-PRISMA`** | — | Documentación, ADR, mockup **y el contrato**: `openapi.json` y el catálogo de códigos | Los dos equipos, con revisión cruzada |
| **`prisma_api`** | `repositories/backend-api` | Java y Spring Boot | Equipo API |
| **`prisma_db`** | `repositories/backend-db` | `supabase/migrations/`, la semilla y los scripts de la base | Equipo API |
| **`prisma_front`** | `repositories/frontend-flutter` | Flutter | Equipo Front |

Los tres de código viven dentro de `Finanzas-PRISMA`, en `repositories/`, que la especificación
ignora a propósito: cada uno conserva su propia historia
([ADR-025](adr/ADR-025-cuatro-repositorios.md)).

Las migraciones tienen repositorio propio, y eso tiene un precio que hay que tener presente
**porque una migración y el código que depende de ella ya no entran en el mismo commit.** Si la
API se publica antes que su migración, se produce el fallo más caro de todos: una versión
desplegada que espera una columna que todavía no existe. Por eso el orden es una regla (§6.1).

El modelo de datos escrito ([`04-modelo-de-datos.md`](04-modelo-de-datos.md)) se queda en la
especificación. Es la diferencia entre **qué debe existir** y **cómo se llegó a eso**: lo primero
se decide y se revisa, lo segundo se ejecuta.

### 3.1 El punto débil de tener repositorios separados, y cómo se tapa

> **Con un solo repositorio, un cambio de contrato entra en un commit con sus dos lados. Con
> tres, son tres cambios coordinados, y el día que se desincronizan alguien pierde media tarde
> buscando por qué el front pide un campo que la API ya no manda.**

Se tapa convirtiendo el contrato en un **artefacto con versión propia**, no en un archivo que
cada quien copia:

1. El contrato vive en `Finanzas-PRISMA` y se versiona con **SemVer**, igual que los otros tres
   proyectos de [`ADR-014`](adr/ADR-014-semver.md).
2. Un cambio de contrato es **un solo PR**, en ese repositorio, revisado por los dos equipos.
   Al fusionarse se etiqueta una versión.
3. **Cada lado actualiza su dependencia cuando puede.** El front genera de esa versión su cliente
   y su servidor simulado; la API genera de ella sus modelos.
4. La prueba `C-04` de [`12-pruebas-y-calidad.md`](12-pruebas-y-calidad.md) compara el OpenAPI que
   la API genera contra la versión etiquetada del contrato. **Si difieren, la compilación falla.**

Así los tres PR coordinados se vuelven uno solo más dos actualizaciones de dependencia, que
ocurren cuando a cada equipo le conviene y no el mismo día.

### 3.2 Contrato acordado y contrato generado no se contradicen

[`ADR-022`](adr/ADR-022-openapi-generado.md) dice que el OpenAPI se genera del código y nunca se
escribe a mano. Este documento dice que el contrato se acuerda antes de escribir el código. Las
dos cosas son ciertas y cumplen papeles distintos:

| | Para qué sirve | Cuándo |
|---|---|---|
| **Contrato acordado** | Que el front pueda empezar sin esperar a la API | Antes de implementar |
| **OpenAPI generado** | Que lo implementado siga siendo lo acordado | En cada compilación |

El primero es el plano; el segundo, la verificación de que lo construido corresponde al plano.
Si alguna vez discrepan, **gana el generado y falla la compilación**: significa que alguien
implementó algo distinto a lo acordado sin decirlo.

---

## 4. Cómo se reparte el trabajo: cimientos, luego rebanadas

### 4.1 Por qué no se reparte por capas todo el tiempo

Repartir por capa de principio a fin —uno siempre en el front, otro siempre en la API— es lo
más fácil de organizar y lo peor de entregar: **ninguna funcionalidad está lista hasta que los
dos terminan su mitad**, así que nada se entrega hasta que acaba el más lento, y el trabajo
terminado de uno se queda esperando en una rama.

Repartir por rebanada vertical desde el primer día tampoco sirve aquí: los cimientos —sesión,
propagación de identidad, sobre de respuesta, idempotencia, canal firmado— **son transversales
y los necesitan las dos rebanadas**. Construirlos dos veces, o a empujones entre funcionalidades,
es exactamente donde se rompen los sistemas.

Por eso: **cimientos en conjunto, y a partir de ahí rebanadas completas.**

### 4.2 Fase 1 · Cimientos (Sprints 0 a 2)

Corresponde a los tres primeros sprints de [`08-plan-de-desarrollo.md`](08-plan-de-desarrollo.md).
Aquí el reparto **sí es por capa**, porque lo que se construye es la capa misma.

| Sprint | Equipo API | Equipo Front |
|---|---|---|
| **0** | Proyecto Java, tubería, cuatro ambientes, sobre de respuesta, catálogo de códigos | Proyecto Flutter, tubería, sistema de diseño en widgets, insignia de versión |
| **1** | Base de datos, RLS, identidad propagada, idempotencia | Renderizador del descriptor de formulario, cliente HTTP, cola de pendientes |
| **2** | Acceso, usuarios, cargos, canal firmado | Pantallas de acceso, cambio de clave y Gestión de usuarios |

> **El equipo Front no se queda esperando, y eso hay que planificarlo o pasará.** Durante los
> Sprints 0 y 1 la API todavía no tiene endpoints de negocio, así que el trabajo del front es
> **traducir el mockup a componentes de Flutter**: la paleta, la tipografía, las tablas, los
> paneles de confirmación en línea, el formato colombiano de dinero y fecha. Ese trabajo no
> depende de ningún endpoint, es imprescindible, y si no se hace ahora se hace después
> bloqueando funcionalidades.

Al final del Sprint 2 existe lo que permite trabajar por separado: contrato estable, sesión real,
sobre de respuesta y un servidor simulado del que el front puede tirar sin la API.

### 4.3 Fase 2 · Rebanadas verticales (Sprints 3 a 8)

Cada equipo toma funcionalidades **completas**: su SQL, su endpoint, su pantalla. Las dos cadenas
se eligieron para que compartan lo mínimo:

| | **Equipo A · la cadena del dinero** | **Equipo B · la cadena del pedido** |
|---|---|---|
| Primero | Movimientos y cuentas | Productos y costeo |
| Después | Reportes y KPIs | Pedidos y anticipos |
| Al final | Capital, retiros y patrimonio | Cotizador |
| Tablas propias | `movimientos`, `cuentas`, `categorias`, `activos`, `aportes_retiros` | `productos`, `costos_producto`, `pedidos`, `pedido_lineas`, `clientes`, `cotizaciones` |
| Rango de códigos | `20`–`29`, `60`–`69`, `70`–`79` | `30`–`39`, `40`–`49`, `80`–`89` |

**Nómina** queda fuera de las dos cadenas a propósito: es la funcionalidad más independiente del
sistema y sirve de amortiguador. La toma el equipo que termine primero su cadena.

> **Los rangos de código ya estaban repartidos por módulo desde
> [`ADR-019`](adr/ADR-019-contrato-de-respuesta.md), y eso resulta ser justo lo que hace falta
> ahora.** Cada equipo escribe en su propio rango del catálogo, así que dos equipos agregando
> códigos a la vez no se pisan ni una sola línea. No estaba pensado para esto; conviene notarlo
> antes de que alguien proponga reorganizar el catálogo.

### 4.4 La dependencia que sí existe entre las dos cadenas

**Reportes consume las dos.** Un reporte mensual necesita los movimientos del equipo A y las
ventas causadas del equipo B, así que es lo único que no se puede construir a ciegas.

Se resuelve por orden, no por coordinación: **Reportes va después de que las dos cadenas tengan
su primera versión en qa.** Por eso está en segundo lugar de la cadena A y no en el primero.

---

## 5. Cuánto se gana de verdad

| | Un equipo | Dos equipos |
|---|---|---|
| Cimientos | 9 semanas | **7 semanas** |
| Rebanadas | 12 semanas | **7 semanas** |
| Estabilización y promoción | 3 semanas | **3 semanas** |
| **Total** | **26 semanas** | **≈ 17 semanas** |

> **No es la mitad, y quien prometa la mitad se va a equivocar.** Tres razones concretas:
> los cimientos casi no se parten —hay que construirlos igual, solo se solapan algunas tareas—;
> la estabilización no se parte en absoluto, porque es integrar y probar lo de todos; y el
> paralelismo cobra su parte en revisiones cruzadas, acuerdos de contrato y reuniones que con un
> solo equipo no existían.

Nueve semanas de ahorro sobre veintiséis es un resultado bueno. Diecisiete es el número con el
que hay que planificar.

---

## 6. Reglas de convivencia

Seis reglas, y cada una evita un choque concreto que si no ocurrirá.

### 6.1 Migraciones

- **Se nombran por marca de tiempo**, como ya hace `supabase/migrations/`. Dos equipos no pueden
  chocar de número.
- **Nunca se edita una aplicada.** Si estaba mal, se escribe otra que corrige. Es el mismo
  principio del contra-asiento de `CU-04` y de [`ADR-004`](adr/ADR-004-base-solo-escritura.md).
- **Dos equipos no alteran la misma tabla en el mismo sprint.** El reparto de tablas del §4.3
  está hecho para que no haga falta; cuando haga falta, se habla antes de escribir.
- **Se publican antes que la API que las necesita, y compatibles con la API que ya corre.** Viven
  en `prisma_db`, así que una columna nueva y el código que la usa son dos commits: primero se
  agrega, y lo viejo se quita en una versión posterior, cuando ya ninguna API desplegada lo use
  ([ADR-025](adr/ADR-025-cuatro-repositorios.md)).
- Las revisa el equipo API, aunque las proponga el otro.

### 6.2 El mockup

Es **un solo archivo HTML de más de 4.700 líneas**, y eso lo vuelve el punto de conflicto más
probable de todo el proyecto: dos personas editándolo a la vez producen un conflicto que git no
sabe resolver solo.

- **Una pantalla, una persona, a la vez.** Se avisa antes de abrirlo.
- Los cambios se fusionan el mismo día. Una rama de mockup abierta una semana es un conflicto
  garantizado.
- **Cuando una pantalla ya está construida en Flutter, el mockup deja de ser el sitio donde se
  cambia.** La regla de oro sigue intacta —nada se construye sin mockup aprobado— pero se aplica
  **antes** de construir, no después. Después manda la implementación, y el mockup queda como
  registro de lo que se aprobó.

### 6.3 El contrato

- Cambiarlo es siempre un PR en `Finanzas-PRISMA`, revisado por los dos equipos.
- Un cambio que rompe el contrato sube la versión **mayor** y obliga a la comprobación de
  compatibilidad de `RF-101`. No se hacen a la ligera.
- Mientras el cambio no esté etiquetado, **no se implementa en ninguno de los dos lados**. Es lo
  que evita que los dos construyan contra ideas distintas de lo mismo.

### 6.4 Ambientes

- **Cada persona levanta su propio PostgreSQL** con Docker (`reset-local.ps1` de `prisma_db`).
  Nadie desarrolla contra una base compartida: una prueba que falla por lo que otro guardó hace
  diez minutos se termina ignorando, y con ella se ignoran las de verdad.
- **dev, qa, uat y prod siguen siendo los cuatro de siempre.** No hay ambiente por equipo.
- **qa es la puerta**, y la comparten. La suite completa tiene que estar verde con el trabajo de
  los dos antes de promover a uat.

### 6.5 Ramas e integración

- **Ramas cortas.** Una rama que vive más de dos o tres días deja de ser una rama y empieza a ser
  otra versión del producto.
- Se integra a la principal al menos una vez al día por equipo. El paralelismo se paga integrando
  seguido, no integrando al final.

### 6.6 El ritual mínimo

Con dos equipos hace falta coordinación, y conviene que sea **la mínima y siempre la misma**:

| Cuándo | Qué | Cuánto |
|---|---|---|
| Diario | Cada equipo por su cuenta | 10 minutos |
| Lunes | **Acuerdo de contrato**: qué cambia esta semana en `openapi.json` | 30 minutos, los dos equipos |
| Viernes | **Integración en qa** y revisión de lo que quedó verde | 30 minutos, los dos equipos |
| Fin de sprint | Aprobación de Gerencia en uat | Según el plan |

Una hora a la semana de coordinación obligatoria. Si hace falta más, es señal de que la frontera
entre los equipos no está donde debería.

---

## 7. Riesgos propios de trabajar en paralelo

| # | Riesgo | Cómo se ataja |
|---|---|---|
| 1 | El contrato se acuerda tarde y el equipo Front queda bloqueado | Es el camino crítico del Sprint 0. Si algo se retrasa, no puede ser esto |
| 2 | Dos personas editan el mockup a la vez | Regla §6.2: una pantalla, una persona, fusionar el mismo día |
| 3 | La arquitectura termina copiando la forma de los equipos | Las rebanadas del §4.3 son de negocio, no de tecnología. Revisar en cada sprint que ninguna frontera nueva coincida con la frontera entre equipos sin razón |
| 4 | Cada equipo escribe su versión de lo mismo: formatear dinero, manejar errores | Todo lo compartido del front vive en los widgets del Sprint 0; todo lo compartido de la API, en `dominio` |
| 5 | Ramas largas que chocan al final | §6.5: integrar a diario |
| 6 | El equipo Front termina su cadena y espera a la API | Nómina es el amortiguador (§4.3), y el trabajo de accesibilidad y de pruebas de widget nunca se acaba |
| 7 | Se relaja el principio 9 «para ir más rápido» y el front empieza a decidir | Es el que sostiene la frontera. Revisarlo explícitamente en cada revisión de código del front |

> **El riesgo 7 es el que hay que vigilar de verdad**, porque llega disfrazado de sensatez: «esta
> validación es trivial, la hago aquí y nos ahorramos un viaje». Cada vez que ocurre, la frontera
> entre los dos equipos se corre un poco, y el día que hay que cambiar esa regla nadie sabe en
> cuántos sitios vive.

---

## 8. Qué hay que decidir antes de empezar

Nada de esto lo resuelve este documento y todo bloquea el primer día:

1. **Quién está en cada equipo**, y si alguien sabe Flutter y Java a la vez —esa persona es la
   que debe revisar los cambios de contrato—.
2. **Dónde se alojan los cuatro repositorios** y quién tiene permiso de escritura en cada uno.
   Lo primero ya está decidido: en GitHub ([ADR-026](adr/ADR-026-railway-al-final.md)). Los
   permisos se reparten cuando existan los equipos.
3. **Si el contrato se publica como paquete** (artefacto en un repositorio Maven —que es el
   formato, lo publique Gradle o quien sea— y paquete de Dart) o se consume
   por etiqueta de git. Lo segundo es más simple y alcanza para dos equipos.
4. **Quién aprueba un cambio de contrato** cuando los dos equipos no se ponen de acuerdo.

---

### 🧭 Navegación

**⬅️ Anterior:** [20 · Contrato de la API](20-contrato-de-api.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [ADR · Decisiones de arquitectura](adr/)
