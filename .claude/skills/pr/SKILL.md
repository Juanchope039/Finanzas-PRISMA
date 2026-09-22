---
name: pr
description: Deja listo y abre el PR de PRISMA. Recorre la lista de terminado del 08 §4 en cada repositorio que tocó la tarea, empuja, abre el PR contra develop o main y recuerda que hay que esperar a que lo acepten. Se invoca a mano.
argument-hint: "[repositorio o id de la tarea]"
disable-model-invocation: true
model: sonnet
---

# Abrir el PR

Rutas relativas a la carpeta de trabajo, la que contiene `repositories/`.

## 1. La lista de terminado, por repositorio

| Repositorio | Lo que tiene que pasar |
|---|---|
| `documentation` | La rama al día con `main` (`git merge origin/main` si se movió) y `node scripts/docs/documentar.mjs verificar --base origin/main` en verde |
| `backend-api` | `./gradlew build`; `./gradlew integracion`, aparte, si la tarea toca la base; y `./gradlew laVersionSubio --args=origin/develop` |
| `frontend-flutter` | `dart format --set-exit-if-changed .`, `dart analyze --fatal-infos`, `flutter test` y `dart run tool/la_version_subio.dart origin/develop` |
| `backend-db` | `./scripts/db/la-version-subio.ps1 -Base origin/develop`, y `verificar-base.sql` en `OK` contra la base local reseteada |

Y lo que pide 08 §4:

- la versión subió un paso, si la tarea cambió lo que se publica;
- el README está al día y su versión subió;
- la tarea va marcada `[x]` en `TODO.md` en el PR de la especificación;
- cada commit tiene 256 caracteres o menos.

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
- **Si dos PR de la especificación chocan en `TODO.md` o `docs/INDICE.md`**, se resuelve con la
  receta de su `AGENTS.md`: se trae `main`, `git add` y después `enlazar`.
- **Cuando lo acepten**, cada repositorio vuelve a su base: `git switch <base>` y
  `git pull --ff-only`.
