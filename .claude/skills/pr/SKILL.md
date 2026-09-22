---
name: pr
description: Abre el PR de PRISMA cuando quien dirige lo pide, y solo entonces (ADR-037). Comprueba que la rama esté al día con su base y sin conflictos, recorre la lista de terminado del 08 §4, empuja, abre el PR contra develop o main y recuerda que hay que esperar a que lo acepten. Se invoca a mano.
argument-hint: "[repositorio o id de la tarea]"
disable-model-invocation: true
model: sonnet
---

# Abrir el PR

Rutas relativas a la carpeta de trabajo, la que contiene `repositories/`.

> **Esta skill se corre cuando quien dirige pide el PR, nunca por cuenta propia** ([ADR-037](https://github.com/Juanchope039/Finanzas-PRISMA/blob/main/docs/adr/ADR-037-el-pr-se-abre-a-pedido.md)).
> Terminar una tarea no incluye abrir su PR: incluye dejar la rama lista, empujarla y avisar. Si
> llegaste aquí porque acabas de terminar algo y nadie te lo pidió, lo que toca es la skill
> `sin-conflictos` y después avisar.

## 0. La rama tiene que estar al día y sin conflictos

**Primero la skill `sin-conflictos`**, en cada repositorio que toca la tarea. Si la base se movió
desde la última vez que se corrió —y basta un PR de otro carril—, se corre otra vez. Un PR que llega
con conflictos le deja a quien revisa una pelea que no es suya.

La promesa, por repositorio:

```bash
git -C repositories/<repo> fetch --all
git -C repositories/<repo> merge-tree --write-tree origin/<base> HEAD >/dev/null && echo 'fusiona limpio'
```

## 1. La lista de terminado, por repositorio

| Repositorio | Lo que tiene que pasar |
|---|---|
| `documentation` | `node scripts/docs/documentar.mjs verificar --base origin/main` en verde |
| `api` | `./gradlew build`; `./gradlew integracion`, aparte, si la tarea toca la base; y `./gradlew laVersionSubio --args=origin/develop` |
| `front-end` | `dart format --set-exit-if-changed .`, `dart analyze --fatal-infos`, `flutter test` y `dart run tool/la_version_subio.dart origin/develop` |
| `database` | `./scripts/db/la-version-subio.sh origin/develop`, y `verificar-base.sql` en `OK` contra la base local reseteada |

Y lo que pide 08 §4:

- la versión subió un paso, si la tarea cambió lo que se publica;
- el README está al día y su versión subió;
- la tarea va marcada `[x]` en `TODO.md` en el PR de la especificación.

Si algo no pasa, no se abre el PR. Se dice qué falló, con la salida.

## 2. Abrirlo

1. **Empuja la rama**: `git push -u origin feature/<id>`.
2. **La base del PR** es `develop` en los repositorios de código y `main` en la especificación.
3. **El título**:
   - si es una tarea, el asunto del commit;
   - si no, una frase.
4. **El cuerpo**:
   - las tres partes, `Hace`, `Decide` y `Verifica`, un poco más largas que en el commit;
   - los PR hermanos de la misma tarea en los otros repositorios;
   - la línea de atribución que pida la sesión.
5. **Si está `gh`**:

   ```bash
   gh pr create --base <base> --head feature/<id> --title "…" --body-file cuerpo.md
   ```

   **Si no está**, se le deja a quien dirige el enlace
   `https://github.com/<dueño>/<repositorio>/compare/<base>...feature/<id>?expand=1` y el cuerpo en
   un archivo. Un token no se imprime nunca, ni se escribe en un archivo.

## 3. Después

- **Se espera a que lo acepten.** No se empieza otra tarea hasta entonces, salvo una ⚡ que no toque
  lo mismo (21 §6.5).
- **Si la base se mueve mientras el PR espera**, se vuelve a correr `sin-conflictos` y se empuja. Un
  PR que empezó fusionable deja de serlo sin que nadie lo toque.
- **Cuando lo acepten**, cada repositorio vuelve a su base: `git switch <base>` y
  `git pull --ff-only`.
