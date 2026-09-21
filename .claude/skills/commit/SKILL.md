---
name: commit
description: Hace el commit de PRISMA con el formato del proyecto y empuja la rama. El asunto lleva sprint y número, el cuerpo tres líneas Hace/Decide/Verifica, sin tildes y con 256 caracteres o menos. Se invoca a mano.
argument-hint: "[repositorio]"
disable-model-invocation: true
---

# Hacer el commit

## 1. Antes

- `git status` y `git diff` en el repositorio. Todo lo que va en el commit tiene que ser de esta
  tarea: dos tareas no van en el mismo commit.
- Las pruebas del repositorio pasan. Anota cuántas son y qué rompiste a propósito para verlas
  fallar: eso va en `Verifica:`.

## 2. El mensaje

```
Sprint 3 / 3.11: marca de registro tardio

Hace: una frase de lo que hace, de unos 50 caracteres.
Decide: lo que se decidio, y si cabe, por que.
Verifica: 746 en verde; sin el filtro, 3 rojas.

<trailer de coautoría que pida la sesión>
```

- **El asunto:**
  - si es una tarea, `Sprint N / N.M: frase corta`;
  - si no es una tarea, va sin número: `README: …`, `Arreglo: …`, `Herramienta: …` o
    `Trae develop: …`.
- **El cuerpo son tres líneas**: `Hace:`, `Decide:` y `Verifica:`. El porqué largo no va aquí: va en
  el plan.
- **Todo en español sin tildes**, y sin `§`, ni eñes, ni emojis: cada uno de esos caracteres cuenta
  como dos bytes.
- **El tope es de 256, contando asunto, cuerpo y trailers.** Mídelo **antes** de commitear:

  ```bash
  printf '%s' "$(cat mensaje.txt)" | wc -c        # tiene que dar 256 o menos
  ```

  Si da más, se acorta y se vuelve a medir. Solo cuando cabe, se hace el commit.

## 3. El commit y el empuje

```bash
git add <rutas explícitas>          # nunca -A ni .
git status                          # un add con una ruta que no existe aborta el add entero
git commit -F mensaje.txt
git push -u origin feature/<id>     # siempre, desde el primer commit, sin preguntar
```

- **Si en el índice hay cambios que no son tuyos** (un `.env`, cosas a medias de otra persona), no
  los toques: haz el commit con `git commit -F mensaje.txt -- <rutas>`, que solo se lleva esas
  rutas.
- **Nunca empujes a `develop`, `main`, `qa`, `uat` ni `prod`.**
- **Si un commit ya empujado se pasó de 256**, se rehace: `git commit --amend -F mensaje.txt` si es
  el último, o `git rebase -i` si no. Después se empuja con `git push --force-with-lease`, y solo en
  tu rama `feature/`.
