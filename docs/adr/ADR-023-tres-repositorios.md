# ADR-023 · Tres repositorios y el contrato como artefacto versionado

**Estado:** Aceptado · **Fecha:** 2026-09-16

## Contexto

El desarrollo pasa a hacerse con **dos equipos en simultáneo**: uno en `prisma_api` y otro en
`prisma_front`, con la capa de datos compartida. El detalle de cómo se reparte el trabajo está en
[`21-trabajo-en-paralelo.md`](../21-trabajo-en-paralelo.md); aquí se decide **dónde vive el
código**.

Hasta hoy todo está en un solo repositorio: documentación, ADR y mockup. Con dos equipos hay que
elegir entre seguir así y agregarles las dos bases de código, o separarlas.

La elección no es de gusto. Cada opción falla de una forma distinta y hay que saber cuál se
prefiere, porque **ninguna de las dos es gratis**.

## Alternativas consideradas

| Opción | A favor | En contra |
|---|---|---|
| **Tres repositorios: especificación, API y front** | Fronteras duras: cada equipo es dueño de lo suyo y los permisos de escritura lo reflejan. El historial de cada parte se lee sin ruido del otro. Nadie compila lo que no cambió | **Un cambio de contrato deja de ser atómico**: son varios cambios coordinados, y el día que se desincronizan el front pide un campo que la API ya no manda |
| Un solo repositorio con todo dentro | Un cambio de contrato entra en un commit con sus dos lados; imposible desincronizarse; una sola tubería que entender | Los dos equipos comparten historial y permisos. Un cambio del front deja huella en el repositorio de la API y al revés, y con el tiempo cuesta saber quién manda en qué |
| Dos repositorios: uno por base de código, con la documentación repartida | Menos repositorios que administrar | **La documentación queda huérfana o duplicada.** El mockup y el modelo de datos no pertenecen ni al front ni a la API: pertenecen al producto |

## Decisión

**Tres repositorios**, y el contrato convertido en **artefacto con versión propia** para tapar la
debilidad de tenerlos separados.

| Repositorio | Qué vive ahí | Quién escribe |
|---|---|---|
| `Finanzas-PRISMA` | Documentación, ADR, mockup, y el **contrato**: `openapi.json` y el catálogo de códigos | Los dos equipos, con revisión cruzada |
| `prisma_api` | Java 21, Spring Boot y `supabase/migrations/` | Equipo API |
| `prisma_front` | Flutter | Equipo Front |

Dos consecuencias del reparto que merecen decirse:

**Las migraciones van con la API, no con la especificación.** Una migración y el código que
depende de ella tienen que poder entrar en el mismo commit. Separarlas produce el fallo más caro
de todos: una versión desplegada esperando una columna que todavía no existe. El modelo de datos
*escrito* se queda en la especificación, porque decidir qué debe existir y ejecutar el cambio son
dos cosas distintas.

**El contrato va con la especificación, no con la API.** Si viviera en `prisma_api`, el equipo
Front dependería del calendario del otro equipo para poder acordar algo, y el acuerdo dejaría de
ser entre iguales. Vive donde viven las decisiones del producto.

### Cómo se tapa el punto débil

1. El contrato se versiona con **SemVer**, igual que los otros tres proyectos de
   [ADR-014](ADR-014-semver.md).
2. Un cambio de contrato es **un solo PR** en `Finanzas-PRISMA`, revisado por los dos equipos.
   Al fusionarse se etiqueta una versión.
3. **Cada lado actualiza su dependencia cuando le conviene**, no el mismo día. El front genera de
   esa versión su cliente y su servidor simulado; la API genera sus modelos.
4. La prueba `C-01` compara el OpenAPI que la API genera contra la versión etiquetada. Si
   difieren, **la compilación falla**.

Los tres cambios coordinados se vuelven uno solo, más dos actualizaciones de dependencia que
ocurren cuando cada equipo puede.

## Justificación

**El paralelismo vive de fronteras, y una frontera sin dueño no es una frontera.** Con dos
equipos, lo que hay que proteger no es la comodidad de un commit: es que cada equipo pueda
avanzar sin pedir permiso. Tres repositorios con permisos propios lo hacen explícito; un
repositorio compartido lo deja a la disciplina, y la disciplina se gasta.

**El fallo del repositorio único es silencioso; el de los tres es ruidoso.** En un repositorio
compartido, la erosión de las fronteras no produce ningún error: simplemente un día nadie sabe
quién decide qué. Con tres, la desincronización del contrato **rompe la compilación**, que es
justo donde uno quiere que aparezcan los problemas.

**El contrato como artefacto no es burocracia, es lo que permite empezar antes.** El equipo Front
no puede construir un formulario sin el descriptor que la API le dicta
([ADR-018](ADR-018-front-sin-decisiones.md)). Con el contrato etiquetado y un servidor simulado
generado de él, puede construir la aplicación entera antes de que exista el primer endpoint.

**Esto no contradice a [ADR-022](ADR-022-openapi-generado.md).** El contrato acordado es el plano
y sirve para empezar; el OpenAPI generado es la verificación de que lo construido corresponde al
plano. Si discrepan, gana el generado y falla la compilación: significa que alguien implementó
algo distinto a lo acordado sin decirlo.

## Consecuencias

- **Positivas:** cada equipo es dueño de su repositorio, su tubería y sus permisos; el historial
  de cada parte se lee sin ruido; el front puede construirse entero contra un servidor simulado
  antes de que la API exista; una desincronización de contrato rompe la compilación en vez de
  aparecer en producción; y la documentación tiene una casa propia, que es lo que corresponde a
  algo que no pertenece a ninguna de las dos bases de código.

- **Negativas:** hay **tres tuberías que mantener** en vez de una, y tres juegos de secretos. Un
  cambio de contrato tarda más en llegar a los dos lados, y ese retraso es real aunque esté
  controlado: entre que se etiqueta y que el front actualiza su dependencia, los dos trabajan
  contra versiones distintas a propósito. Alguien tiene que llevar la cuenta de qué versión del
  contrato usa cada lado, y ese alguien es la prueba `C-01`, no una persona. Y quien llegue nuevo
  al proyecto tiene que clonar tres cosas y entender por qué, en vez de una.

- **A vigilar:** si en algún momento los dos equipos se funden en uno, esta decisión deja de
  pagar lo que cuesta y conviene revisarla. Tres repositorios para un solo equipo son tres veces
  el trabajo de administración sin ninguna frontera que proteger.

## Referencias

- [`21-trabajo-en-paralelo.md`](../21-trabajo-en-paralelo.md) — el reparto entre los dos equipos
- [ADR-014](ADR-014-semver.md) — SemVer independiente por proyecto
- [ADR-018](ADR-018-front-sin-decisiones.md) — el front no decide, por eso puede construirse aparte
- [ADR-022](ADR-022-openapi-generado.md) — OpenAPI generado del código y verificado en CI
