# 01 · Cada plan de trabajo es un archivo numerado

**2026-09-17** · Pedido por el usuario. Toca `CLAUDE.md`, `docs/22-documentacion.md` y la
herramienta de documentación.

## Qué se va a hacer

Crear la carpeta `plan/` en la raíz de la especificación y la regla que la sostiene: **cada vez que
se escribe un plan de trabajo, antes de tocar código, queda en `plan/NN-titulo.md`**, numerado en el
orden en que se fue decidiendo.

1. `scripts/docs/config.mjs` — `plan` entra a `CARPETAS_EXCLUIDAS`, y se declaran `CARPETA_DE_PLANES`
   y `NOMBRE_DE_PLAN`, el patrón del nombre.
2. `scripts/docs/documentar.mjs` — `revisarPlanes(errores)`, llamada desde `verificar`: falla si un
   archivo de `plan/` no se llama `NN-titulo-en-minusculas.md`, si dos comparten número o si la
   numeración salta.
3. `CLAUDE.md` §3 — la regla, de primeras, porque el plan va antes que la rama y que el commit.
4. `docs/22-documentacion.md` — §10 nueva con la regla entera y el porqué, y §1 y §8 al día.
5. `scripts/docs/README.md` — las dos filas nuevas de «Cuando la verificación falla».
6. Este archivo, que es el primer plan y la prueba de que la regla se usa.

## Qué se decidió, y por qué

**Un plan no es documentación versionada.** Va en `CARPETAS_EXCLUIDAS`, junto a `.claude/` y
`.agents/`: sin encabezado de [ADR-027](../docs/adr/ADR-027-documentacion-versionada.md), sin versión y fuera de [`docs/INDICE.md`](../docs/INDICE.md). Un documento
se corrige cuando se queda viejo; un plan **no**, porque su valor es decir qué se creía en ese
momento. Si el plan resultó equivocado se escribe el siguiente, como una migración de la base. Se
descartó la alternativa —darle encabezado y meterlo al índice— porque obligaría a subirle la versión
a algo que no se vuelve a tocar, y porque el índice crecería un renglón por cada plan.

**Pero el nombre sí se verifica.** Estar fuera de la documentación no es estar fuera de la regla: de
la numeración sale el orden en que se decidieron las cosas, y si se pudiera saltar un número, dos
planes escritos a la vez se pisarían sin que nadie se enterara. Por eso `verificar` lo comprueba, que
es lo que este proyecto ya hace con el plan y el tablero.

**La comprobación lee el disco, no `git ls-files`.** Así ve el plan recién escrito y todavía sin
`git add`, que es justo el momento en que uno se equivoca de número. El costo es que un archivo
suelto y sin versionar dentro de `plan/` también rompe la verificación local; se acepta, porque
`plan/` no es sitio para borradores.

**Sin ADR.** La decisión cabe entera en [22 §10](../docs/22-documentacion.md#planes) y no cambia ninguna otra: no hay una alternativa
de arquitectura que quede descartada ni nada que revisar más adelante.

## Cómo se va a verificar

- `node scripts/docs/documentar.mjs verificar` en verde con `plan/01-…​.md` en su sitio.
- **Roto a propósito**, y visto fallar con su mensaje, cada uno de los tres casos: un nombre que no
  sigue el formato (`Mal_Nombre.md`), dos archivos con el número `01`, y un `02-…​.md` sin que exista
  el `01`.
- Y el caso de borde: sin carpeta `plan/`, la verificación sigue en verde.
- `verificar` cuenta los mismos 64 documentos que antes: nada de `plan/` se coló en la documentación.
