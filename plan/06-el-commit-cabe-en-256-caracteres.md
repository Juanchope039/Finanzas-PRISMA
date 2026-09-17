# 06 · El mensaje de commit cabe en 256 caracteres

**2026-09-17** · Pedido por el usuario. Toca `CLAUDE.md`, el [ADR-028](../docs/adr/ADR-028-un-commit-por-tarea.md), un ADR nuevo,
`docs/08-plan-de-desarrollo.md`, `docs/21-trabajo-en-paralelo.md` y la herramienta de documentación.

## Qué se va a hacer

Poner un **tope duro de 256 caracteres al mensaje de commit entero** —asunto, cuerpo y trailers— y
dejar que lo verifique la herramienta, no la memoria de quien escribe. Hoy el historial va entre
1.145 y 2.971 caracteres por commit, así que el tope no es un ajuste: cambia cómo se escribe el
cuerpo que pide el [ADR-028](../docs/adr/ADR-028-un-commit-por-tarea.md).

1. `docs/adr/ADR-031-commit-de-256-caracteres.md` — el ADR nuevo, con la decisión, lo que se
   descarta del 028 y el presupuesto de caracteres hecho cuenta.
2. `docs/adr/ADR-028-un-commit-por-tarea.md` — nota arriba que manda al 031, y MINOR. El cuerpo de
   un ADR aceptado no se edita ([22 §3](../docs/22-documentacion.md#3-versiones)): lo que cambia se escribe en otro.
3. `docs/adr/README.md` — la fila del 031 y el conteo.
4. `CLAUDE.md` §3 — el tope en el párrafo del commit, que es donde alguien lo va a leer.
5. `docs/08-plan-de-desarrollo.md` §4 — la casilla de la definición de terminado.
6. `docs/21-trabajo-en-paralelo.md` §6.5 — el paso 3 del ciclo de una tarea.
7. `docs/22-documentacion.md` §10 — que el tope es del commit y **no** del plan, que es justo el
   sitio donde ahora va el porqué largo.
8. `scripts/docs/config.mjs` y `scripts/docs/documentar.mjs` — `TOPE_DE_COMMIT` y
   `revisarMensajesDeCommit(base, errores)`, llamada desde `verificar --base`.
9. `scripts/docs/README.md` — la fila nueva de «Cuando la verificación falla».

## Qué se decidió, y por qué

**El tope cuenta el mensaje entero, trailers incluidos.** Es lo que devuelve
`git log -1 --pretty=%B`, y un tope que se puede medir con una orden de una línea es un tope que se
cumple. Se descartó contar solo asunto y cuerpo, que es más generoso y más justo —los trailers no
los elige quien escribe—, porque obliga a decidir qué línea es trailer y cuál no, y esa decisión
vuelve a depender de una persona.

**Se va la línea `Tarea: N.M del Sprint S`.** Cuesta 24 de los 256 y repite lo que ya dice el
asunto: `Sprint 2 / 2.1: …` lleva el sprint y el número. Con el asunto en 46, el trailer
`Co-Authored-By` en 53 y esa línea, el presupuesto para las tres respuestas quedaba en 130
caracteres, 43 por respuesta; sin ella queda en 155. Era la única línea del mensaje que no aportaba
nada que no estuviera ya escrito dos renglones más arriba.

**Los tres títulos se quedan, en una línea cada uno.** El [ADR-028](../docs/adr/ADR-028-un-commit-por-tarea.md) pide qué hace, qué se decidió y
por qué, y cómo se verificó; con 155 caracteres eso son tres líneas de unos 50. Se descartó quitar
uno de los tres —el candidato era «qué se decidió»— porque es precisamente el que no se puede
reconstruir del diff, que es el argumento entero del 028. Lo que se pierde no es el porqué: es el
porqué **largo**, y ese ya tiene sitio propio en `plan/`, que no tiene tope y se escribe antes.

**Los commits de fusión quedan exentos.** No los escribe una persona: el de la PR #8 mide 443
caracteres y lo redactó GitHub. La regla vale para lo que alguien teclea, así que la comprobación
salta todo commit con más de un padre.

**Lo verifica `verificar --base`, con la misma condición que las versiones.** Solo corre cuando hay
base contra la cual comparar, que es el caso de la integración continua y del PR; en local, sin
`--base`, no molesta. El [ADR-028](../docs/adr/ADR-028-un-commit-por-tarea.md) se despide diciendo que era «la primera regla del proyecto que
depende de quien escribe»; de este tope, al menos, ya no depende.

**Sube MAJOR lo que prescribe el cuerpo, y MINOR lo que solo lo referencia.** `CLAUDE.md` y
[08 §4](../docs/08-plan-de-desarrollo.md#4-definición-de-terminado) dicen con qué títulos se escribe el cuerpo, y esa frase cambia: quien siguiera la versión
anterior escribiría un commit que la integración continua rechaza, que es la definición de MAJOR de
[22 §3](../docs/22-documentacion.md#3-versiones). El [21 §6.5](../docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) y el [22 §10](../docs/22-documentacion.md#planes) solo ganan una referencia al tope, y suben MINOR. El
[ADR-028](../docs/adr/ADR-028-un-commit-por-tarea.md) sube MINOR por la nota, que es lo único que se le puede hacer al cuerpo de un ADR
aceptado.

## Cómo se va a verificar

- `node scripts/docs/documentar.mjs verificar --base <SHA>` en verde sobre esta misma rama, donde
  los dos commits nuevos ya obedecen el tope.
- **Roto a propósito**, y visto fallar con su mensaje: un commit de 257 caracteres, y el mismo
  commit a 256 pasando.
- Un commit de fusión de más de 256 caracteres en el rango y la verificación sigue en verde: la
  exención funciona.
- Sin `--base`, `verificar` no mira ningún mensaje y cuenta los mismos documentos que antes.
- `git log --pretty=%B` de los dos commits de esta rama, medidos con `wc -c`, por debajo de 256.
