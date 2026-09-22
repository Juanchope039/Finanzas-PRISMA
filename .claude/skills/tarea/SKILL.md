---
name: tarea
description: Prepara una tarea del plan de desarrollo de PRISMA. Lee su fila del 08, comprueba que se pueda empezar, deja cada repositorio del carril en su base al día y con el árbol limpio, abre ahí la rama y deja escrito el plan. Se invoca a mano con el id de la tarea.
argument-hint: "[id de la tarea, p. ej. 3.4]"
model: opus
---

# Empezar la tarea $ARGUMENTS

Las rutas son relativas a la carpeta de trabajo, la que contiene `repositories/`.

## 1. Qué es y si se puede empezar

1. **Busca la tarea en `repositories/documentation/docs/08-plan-de-desarrollo.md`.** Su fila dice
   qué es, el carril, de qué depende y cuántos días lleva. El carril es API, Base, Front, Contrato o
   Decisión; si tiene varios, el primero es el que la lleva.
2. **Busca su línea en `repositories/documentation/TODO.md`:**
   - `[x]`: ya está hecha, así que para.
   - ⚡: se puede empezar hoy.
   - 🔒: le falta algo de lo que depende. Di qué es y para.
   - 🚧 o ✏️: alguien la tiene, o está escrita sin verificar. Pregunta antes de seguir.
3. **Mira si quedó un PR sin aceptar en los repositorios que vas a tocar** (21 §6.5). No se empieza
   otra tarea hasta que lo acepten, salvo que esta sea ⚡ y no toque lo mismo. Si no puedes saberlo,
   pregunta.
4. **Lee lo que la tarea nombra:**
   - el requisito, en el 03;
   - la regla, en el 05;
   - la tabla, en el 04;
   - la pantalla, en el 10 y en el mockup;
   - el contrato, en el 20 y en `contrato/openapi.json`;
   - la prueba, en el 12.

   Si un documento no cubre un caso, **no inventes la regla**: se decide lo mínimo y se anota en el
   §10 de `TODO.md`.

## 2. Las ramas: lo primero es la base al día, en una copia limpia

**Este es el primer paso que toca disco, y va antes que leer una sola línea de código** ([ADR-037](https://github.com/Juanchope039/Finanzas-PRISMA/blob/main/docs/adr/ADR-037-el-pr-se-abre-a-pedido.md)).
Una rama abierta sobre lo que había ayer nace desfasada, y el desfase se paga al final.

En cada repositorio que toca el carril, **y en este orden**:

```bash
git -C repositories/<repo> status --short                  # vacío, o no se sigue
git -C repositories/<repo> switch <base>                   # develop en los de código, main en la especificación
git -C repositories/<repo> pull --ff-only origin <base>    # siempre, aunque parezca que no se movió
git -C repositories/<repo> switch -c feature/$ARGUMENTS
git -C repositories/<repo> log --oneline -1                # di desde qué commit sale la rama
```

- **Si el árbol no está limpio, para.** No lo arrastres a la rama nueva ni lo guardes por tu cuenta:
  enseña qué hay —`git status --short` y `git diff --stat`— y pregunta. Casi siempre es trabajo de
  otra cosa, y llevárselo lo mete en un PR al que no pertenece.
- **Si `pull --ff-only` no puede avanzar**, la base local divergió de la remota: no lo fuerces, dilo.
- **Si otra sesión usa la misma copia, trabaja en worktrees con el mismo acomodo**:
  `<carpeta>/repositories/<repo>`. Así la herramienta de documentación sigue viendo a los hermanos.

## 3. El plan

Antes de tocar código, sigue la skill `plan`.

## 4. Al terminar

- **Un commit por tarea**: la skill `commit`.
- **En el PR de la especificación va la tarea marcada `[x]` en `TODO.md`**, con `enlazar` corrido.
  El `CLAUDE.md` y los `AGENTS.md` no se tocan por una tarea.
- **Se trae la base otra vez y se deja la rama sin conflictos**: la skill `sin-conflictos`. Entre que
  empezaste y terminaste pudieron entrar otros PR.
- **Se empuja y se avisa que está lista**, con la base contra la que se abriría el PR.
  **El PR no se abre aquí**: lo pide quien dirige ([ADR-037](https://github.com/Juanchope039/Finanzas-PRISMA/blob/main/docs/adr/ADR-037-el-pr-se-abre-a-pedido.md)), y entonces es la skill `pr`.
