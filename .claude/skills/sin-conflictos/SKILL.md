---
name: sin-conflictos
description: Deja una rama de PRISMA al día con su base —develop en los repositorios de código, main en la especificación— y sin un solo conflicto, antes de avisar que está lista para el PR. Trae la base, resuelve cada clase de choque con su receta y comprueba que la fusión de vuelta daría limpia. Se invoca a mano.
argument-hint: "[repositorio, o id de la tarea para hacerlo en todos los que toca]"
disable-model-invocation: true
model: opus
---

# Dejar la rama sin conflictos contra su base

Las rutas son relativas a la carpeta de trabajo, la que contiene `repositories/`.

**Esto se corre antes de avisar que la rama está lista** ([ADR-037](https://github.com/Juanchope039/Finanzas-PRISMA/blob/main/docs/adr/ADR-037-el-pr-se-abre-a-pedido.md)), y otra vez si la base
se movió entre el aviso y el PR. El PR no lo abres tú: cuando lo pidan, es la skill `pr`.

## 1. Mirar antes de tocar

En cada repositorio que toca la tarea:

```bash
git -C repositories/<repo> status --short          # tiene que estar limpio
git -C repositories/<repo> fetch --all
git -C repositories/<repo> log --oneline HEAD..origin/<base>
```

- **La base es `develop`** en `api`, `database` y `front-end`, y **`main`** en `documentation`.
- Si no hay nada en `HEAD..origin/<base>`, la base no se movió: salta al paso 4 y comprueba igual.
- Si el árbol tiene cambios sin commitear, **no los arrastres a la fusión**: enséñalos y pregunta.
  Puede ser trabajo de otra cosa que no va en esta rama.

Antes de fusionar, mira **qué va a chocar**, que es más barato que descubrirlo a mitad de camino:

```bash
git -C repositories/<repo> merge-tree --write-tree --name-only origin/<base> HEAD
```

Con salida 0 y una sola línea —el árbol—, no hay conflicto de texto. Con salida distinta de 0, las
líneas siguientes son los archivos que chocan.

## 2. Traer la base

```bash
git -C repositories/<repo> merge origin/<base> --no-commit
```

Se fusiona, **no se rebasa**: la rama ya está empujada desde su primer commit ([21 §6.5](https://github.com/Juanchope039/Finanzas-PRISMA/blob/main/docs/21-trabajo-en-paralelo.md#65-ramas-e-integración)), y
reescribirla obligaría a forzar el empuje.

## 3. Resolver, y cada clase de conflicto tiene su receta

**La regla general: ninguna de las dos partes se tira.** Las dos ramas hicieron algo que alguien
quería. Si de verdad una sobra, se dice por qué en el commit de fusión.

| Qué chocó | Qué se hace |
|---|---|
| **Un bloque `<!-- generado:… -->`** | No se resuelve a mano. Se toma cualquiera de los dos lados, se resuelve el archivo y se corre `node scripts/docs/documentar.mjs enlazar`, que lo reescribe con los números buenos |
| **La versión del proyecto** (`build.gradle.kts`, `pubspec.yaml`, `schema_version`) | **Nunca se queda la de la rama.** Se lee la de la base ya fusionada y se sube **un paso desde ahí**. Si la otra rama se llevó el número que tenías, el tuyo es el siguiente |
| **La versión de un `.md`** | Igual: la de la base más un paso, y la fecha de hoy |
| **`contrato/openapi.json`** (la copia fijada) | No se edita a mano nunca. Se resuelve el resto, se corre `./gradlew build` y se copia `build/contrato/openapi.json` encima. [C-04](https://github.com/Juanchope039/Finanzas-PRISMA/blob/main/docs/12-pruebas-y-calidad.md#c-04) es quien dice si quedó bien |
| **Un contador de pruebas o de rutas** en un README | Se vuelve a contar con la base adentro. Un número heredado de antes de la fusión es falso |
| **Un modelo compartido** que las dos ramas ampliaron | Se queda con **los campos de las dos**, y el javadoc de las dos. Es el caso más común y el que más fácil se resuelve mal |
| **Una firma de constructor o de puerto** | Se juntan los dos cambios y se compila. Que compile no alcanza: mira si el método nuevo de la otra rama tiene que usarse también en tu camino |
| **`TODO.md` o `docs/INDICE.md`** | La receta del `AGENTS.md` de la especificación: se trae `main`, `git add`, y después `enlazar` |

**Un archivo resuelto se marca resuelto:** `git add <ruta>`. Mientras un archivo siga en conflicto,
`git ls-files` lo lista una vez por etapa y las herramientas que leen esa lista —`documentar.mjs`,
entre otras— lo cuentan tres veces y escriben filas repetidas.

## 4. Comprobar que de verdad no queda nada

**Las marcas primero**, que es lo barato:

```bash
git -C repositories/<repo> diff --check
git -C repositories/<repo> grep -n -E '^(<{7}|={7}|>{7})' -- . || echo 'sin marcas'
git -C repositories/<repo> status --short | grep -E '^(UU|AA|DD|AU|UA|DU|UD)' || echo 'sin conflictos'
```

**Y después las puertas del [08 §4](https://github.com/Juanchope039/Finanzas-PRISMA/blob/main/docs/08-plan-de-desarrollo.md#4-definición-de-terminado), que es lo que de verdad se está comprobando.** Hay conflictos que
git no ve: dos versiones al mismo número fusionan limpio y dejan [C-05](https://github.com/Juanchope039/Finanzas-PRISMA/blob/main/docs/12-pruebas-y-calidad.md#c-05) en rojo.

| Repositorio | Lo que se vuelve a correr, ya con la base adentro |
|---|---|
| `api` | `./gradlew spotlessApply build`; `./gradlew integracion` si la tarea toca la base; `./gradlew laVersionSubio --args=origin/develop` |
| `database` | `./scripts/db/reset-local.sh` y `verificar-base.sql` en `OK`; `./scripts/db/la-version-subio.sh origin/develop` |
| `documentation` | `node scripts/docs/documentar.mjs enlazar` y después `verificar --base origin/main` |
| `front-end` | `dart format --set-exit-if-changed .`, `dart analyze --fatal-infos`, `flutter test` y `dart run tool/la_version_subio.dart origin/develop` |

Si algo no se puede correr en esta máquina —sin Docker no hay `integracion` ni base local—, **se dice
cuál y por qué**, y no se da por pasado.

## 5. Cerrar la fusión

El commit de fusión lleva el formato del proyecto, con el asunto `Trae <base>: …`:

```
Trae develop: la foto del recibo y el arreglo de la version

Hace: el libro junta los soportes de la pagina en una consulta
Decide: 0.12.0, porque la 3.6 ya se llevo la 0.11.0
Verifica: 871 y 173, C-04 y C-05 en verde
```

Después:

```bash
git -C repositories/<repo> push
git -C repositories/<repo> merge-tree --write-tree origin/<base> HEAD >/dev/null && echo 'fusiona limpio'
```

**Esa última línea es la promesa de esta skill.** Si no la imprime, la rama todavía no está lista.

## 6. Qué se avisa

Cuando los repositorios de la tarea pasan los pasos 4 y 5:

- que la rama está lista y **contra qué base** se abriría el PR, uno por repositorio;
- qué trajo la base y qué se resolvió, en una línea por conflicto que no fuera mecánico;
- qué puerta no se pudo correr aquí, si alguna;
- el enlace de comparación, para que quien dirige abra el PR cuando quiera:
  `https://github.com/<dueño>/<repositorio>/compare/<base>...feature/<id>?expand=1`.

**Y ahí se para.** El PR lo abre quien dirige, o esta sesión cuando lo pida, con la skill `pr`.
