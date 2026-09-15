# ADR-014 · SemVer independiente por proyecto y contrato de compatibilidad

**Estado:** Aceptado · **Fecha:** 2026-09-15

## Contexto

El sistema deja de ser una sola cosa desplegable. Ahora son tres que se publican por separado:
el front en Flutter, la API en Dart y el esquema de la base de datos. Cada una puede cambiar sin
que las otras cambien, y cada una se promueve por los cuatro ambientes a su propio ritmo.

Eso obliga a decidir dos asuntos distintos que suelen confundirse:

1. **Cuántas versiones hay** —una para todo el sistema o una por proyecto—.
2. **Qué impide que dos piezas con versiones distintas se hablen mal.**

Sin lo segundo, lo primero es una trampa: el front pide un campo que la API ya no devuelve, nadie
se entera al arrancar, y el fallo aparece tres pantallas después con un valor nulo.

## Alternativas consideradas

| Opción | A favor | En contra |
|---|---|---|
| **Tres versiones independientes + contrato de compatibilidad** | Cada número dice la verdad sobre su proyecto; el desajuste se detecta al arrancar | Hay que sostener el contrato y el endpoint que lo expone |
| Una sola versión para todo el sistema | Un número que recordar; fácil de explicar | Obliga a publicar las tres piezas juntas siempre, aunque solo cambie una |
| Versiones sincronizadas artificialmente | Parece ordenado en el papel | **Miente**: si el front sube a `0.5.0` porque la API subió, nadie sabe cuál de las dos cambió |
| Sin versionado formal | Cero ceremonia | Ante un fallo reportado no se puede saber qué estaba corriendo ni contra qué servidor |

## Decisión

**Cada proyecto lleva su propia versión SemVer, y la compatibilidad entre ellos se declara y se
comprueba al arrancar.**

### Tres cosas versionadas por separado

| Proyecto | Dónde vive la versión | Formato |
|---|---|---|
| `prisma_front` | `pubspec.yaml` | `MAJOR.MINOR.PATCH+BUILD` |
| `prisma_api` | `pubspec.yaml` | `MAJOR.MINOR.PATCH` |
| Esquema de base | Migraciones numeradas + tabla `schema_version` | `MAJOR.MINOR.PATCH` |

### Reglas

- **Antes del go-live todo es `0.y.z`.** La primera publicación en prod es `1.0.0`. Es lo que
  dice SemVer y evita fingir estabilidad que todavía no existe.
- **MAJOR** de la API: cambio que rompe el contrato con el front (un campo que desaparece, un
  tipo que cambia, un endpoint que se va).
- **MINOR**: funcionalidad nueva compatible hacia atrás.
- **PATCH**: corrección que no cambia el contrato.
- **Las versiones del front y de la API son independientes.** No se sincronizan artificialmente.

### El contrato de compatibilidad

Para que ser independientes no signifique romperse en silencio:

- La API expone `GET /version` con su versión, la del esquema y el ambiente.
- El front declara en tiempo de compilación **qué MAJOR de la API necesita**.
- Al arrancar, el front consulta `/version`. Si el MAJOR no coincide, muestra una pantalla clara
  —«Esta versión de la aplicación ya no sirve con el servidor. Actualiza.»— y no deja seguir.
- Cada versión de la API declara hasta cuándo sostiene el MAJOR anterior.

## Justificación

**Fingir que el front y la API van juntos oculta cuál de las dos cambió de verdad.** Si una sola
corrección de estilo en el formulario obliga a subir también el número de la API, el historial de
versiones deja de servir para lo único que sirve: mirar un número y saber qué se movió. Tres
proyectos que se despliegan por separado necesitan tres números que se muevan por separado.

**El contrato de compatibilidad es lo que impide que ser independientes signifique romperse en
silencio.** El front declara qué MAJOR de la API necesita, lo comprueba al arrancar contra
`GET /version`, y si no coincide se planta con un mensaje claro en vez de fallar en la pantalla 7
con un campo nulo. **Fallar ruidoso es mejor que fallar tarde:** un aviso al entrar lo entiende
cualquiera y se arregla actualizando; un valor nulo a mitad de un registro de venta parece un
error de la persona que lo está escribiendo.

Que el número `0.y.z` se sostenga hasta el go-live no es formalismo. `1.0.0` es una promesa de
estabilidad del contrato, y hacerla antes de que el contrato exista obliga a romperla enseguida.

## Consecuencias

- **Positivas:** cada número dice la verdad sobre su proyecto; se puede publicar una corrección
  de la API sin recompilar el front; un desajuste se descubre al arrancar y no en producción a
  mitad de una tarea; ante un fallo reportado, `GET /version` y el panel «Acerca de» dicen
  exactamente qué estaba corriendo y contra qué servidor.
- **Negativas:** hay tres números que mantener en vez de uno, y hay que sostener disciplina para
  que MAJOR signifique siempre lo mismo. La comprobación al arrancar agrega una petición antes de
  la primera pantalla, y si la API no responde el front no entra —lo cual es deliberado: entrar a
  medias sería peor—. Además, publicar un MAJOR de la API obliga a coordinar la publicación del
  front, que es justo el trabajo que el versionado independiente hace visible en vez de esconder.

## Referencias

- [ADR-004 · Base de datos de solo escritura](ADR-004-base-solo-escritura.md) — el mismo
  principio aplicado a las migraciones: una migración aplicada no se edita, se corrige con otra.
- [`19-ambientes-y-entrega.md`](../19-ambientes-y-entrega.md) — detalla los cuatro ambientes, la
  promoción de artefactos y el procedimiento de publicación y de reversión.
