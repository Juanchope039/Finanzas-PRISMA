---
name: commit
description: Hace el commit de PRISMA con el formato del proyecto y empuja la rama. El asunto lleva sprint y número, el cuerpo tres líneas Hace/Decide/Verifica. Se invoca a mano.
argument-hint: "[repositorio]"
model: sonnet
---

# Hacer el commit

Las reglas del commit están en el `CLAUDE.md` de la especificación (§2): una tarea es un commit, y
el commit explica por qué. Aquí va el procedimiento.

## 1. Antes

- `git status` y `git diff` en el repositorio: todo lo que va en el commit es de una sola tarea.
- **La prueba en negativo**: rompe a propósito lo que protege cada prueba nueva, mírala fallar y deja
  todo como estaba.
- Las pruebas del repositorio pasan. Anota cuántas son y qué rompiste: eso va en `Verifica:`.

## 2. El mensaje

```
Sprint 3 / 3.11: marca de registro tardio

Hace: lo que hace, en el lenguaje del negocio y no en el del diff.
Decide: lo que se decidio que ningun documento decia, y por que.
Verifica: 746 en verde; sin el filtro, 3 rojas.
```

- **El asunto**, si es una tarea, es `Sprint N / N.M: frase corta`. Si no, va sin número y con lo
  que toca delante: `README: …`, `Arreglo: …`, `Herramienta: …`, `Skills: …`, `ADR-NNN: …` o
  `Trae develop: …`.
- **El porqué largo no va aquí**: va en el plan, que se escribió antes.

## 3. El commit y el empuje

```bash
git add <rutas explícitas>
git status                          # un add con una ruta que no existe aborta el add entero
git commit -F mensaje.txt
git push -u origin <rama>          # la feature/…, desde el primer commit; nunca develop, main, qa, uat ni prod
```

- **Si en el índice hay cambios que no son tuyos** (un `.env`, cosas a medias de otra persona), no
  los toques: `git commit -F mensaje.txt -- <rutas>` solo se lleva esas rutas.
