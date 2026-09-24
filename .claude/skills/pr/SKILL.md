---
name: pr
description: Abre el PR de PRISMA cuando quien dirige lo pide, y solo entonces (ADR-037). Comprueba que la rama esté al día con su base y sin conflictos, recorre las puertas de cada repositorio, empuja y abre el PR contra develop o main. Se invoca a mano.
argument-hint: "[repositorio o id de la tarea]"
disable-model-invocation: true
model: sonnet
---

# Abrir el PR

Rutas relativas a la carpeta de trabajo, la que contiene `repositories/`. La regla está en el
`CLAUDE.md` de la especificación (§2): el PR se abre a pedido, y la rama llega sin conflictos.

## 1. La rama, al día y sin conflictos

Si la base se movió desde la última vez, **primero la skill `sin-conflictos`** en cada repositorio
que toca la tarea. La promesa, por repositorio:

```bash
git -C repositories/<repo> fetch --all
git -C repositories/<repo> merge-tree --write-tree origin/<base> HEAD >/dev/null && echo 'fusiona limpio'
```

## 2. Las puertas

Las de cada repositorio están en su `AGENTS.md`, en la sección «Las puertas del PR». Si alguna no
pasa, no se abre el PR: se dice cuál, con la salida.

## 3. Abrirlo

1. **Empuja la rama**: `git push -u origin feature/<id>`.
2. **La base del PR** es `develop` en los repositorios de código y `main` en la especificación.
3. **El título**: el asunto del commit, si es una tarea; si no, una frase.
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

## 4. Después

- **Si la base se mueve mientras el PR espera**, se vuelve a correr `sin-conflictos` y se empuja. Un
  PR que empezó fusionable deja de serlo sin que nadie lo toque.
- **Cuando lo acepten**, cada repositorio vuelve a su base: `git switch <base>` y
  `git pull --ff-only`.
