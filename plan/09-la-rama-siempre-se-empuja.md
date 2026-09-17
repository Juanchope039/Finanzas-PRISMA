# 09 · La rama siempre se empuja

**2026-09-17** · No es una tarea del plan: es una regla de trabajo que quien dirige fijó en medio de
la [1.14](../docs/08-plan-de-desarrollo.md#tarea-1-14), después de que dos veces seguidas los commits se quedaran en la máquina esperando
permiso para subir. Toca la documentación de proceso y el tablero.

## Qué se va a hacer

1. [`docs/21-trabajo-en-paralelo.md`](../docs/21-trabajo-en-paralelo.md) [§6.5](../docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) — la regla, como viñeta al pie, junto a las otras tres que
   valen siempre («ramas cortas», un worktree por carril, integrar a diario). Y el paso 5 de la tabla
   del ciclo deja de decir «empujar y abrir el PR»: el empuje ya ocurrió, ahí solo se abre el PR.
2. [`CLAUDE.md`](../CLAUDE.md) [§3](../CLAUDE.md) — el resumen, que es lo que gobierna a quien trabaja con agentes.
3. [`docs/22-documentacion.md`](../docs/22-documentacion.md) [§9](../docs/22-documentacion.md#9-cómo-se-cambia-un-documento) — el paso 4 cierra hoy en «Commit y PR» y nunca nombra el
   empuje. Es justo el caso que la regla quiere cubrir: el commit de documentación, que no es tarea.
4. [`scripts/docs/README.md`](../scripts/docs/README.md) — rehacer un commit que se pasó de 256 caracteres ahora ocurre casi
   siempre sobre una rama ya empujada, y eso pide `--force-with-lease`.
5. [`TODO.md`](../TODO.md) [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar) — lo que la regla **no** resuelve, para que quien dirige lo revise.

## Qué se decidió, y por qué

**La fuente es el [21 §6.5](../docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) y no un ADR nuevo.** Un barrido de los 65 documentos encontró 103 sitios
que hablan de ramas, PR o empuje, y **todos cuelgan del 21 §6.5**: el [08 §4](../docs/08-plan-de-desarrollo.md#4-definición-de-terminado), el [22 §9](../docs/22-documentacion.md#9-cómo-se-cambia-un-documento), el
[`CLAUDE.md`](../CLAUDE.md) y los planes lo citan o lo resumen. No hay ADR del flujo de ramas, así que inventarle uno a
esta regla la pondría por encima de la que la contiene.

**La viñeta va fuera de la tabla del ciclo, no dentro.** La tabla describe el ciclo de **una tarea**,
y esta regla vale también para lo que no es tarea. Metida como paso 5 seguiría diciendo que el
empuje es el penúltimo acto; al pie, junto a «ramas cortas», queda donde viven las reglas que
aplican siempre.

**Se dice «empujar la rama», nunca «hacer push» a secas.** En este proyecto `push` ya significa otra
cosa: `supabase db push` promueve migraciones a una base remota ([16 §5](../docs/16-base-de-datos-y-snapshots.md#5-el-flujo-de-trabajo-diario)). Una regla que dijera «se hace
push siempre» se leería como promover la base, que es exactamente lo contrario de lo que se quiere.

**La regla nombra la rama de trabajo, no la base.** Los documentos no se ponen de acuerdo en si la
base es `develop` o `main` —el [21 §6.5](../docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) y el [08 §4](../docs/08-plan-de-desarrollo.md#4-definición-de-terminado) dicen `develop`; el [ADR-026](../docs/adr/ADR-026-railway-al-final.md) y el [ADR-028](../docs/adr/ADR-028-un-commit-por-tarea.md),
`main`—, y heredar esa contradicción volvería la regla inaplicable el día que alguien la lea desde el
repositorio equivocado. Se acota a la rama `feature/<id>`: `develop`, `main` y las ramas de ambiente
no se mueven por cuenta propia. Que esa contradicción exista se anota, no se resuelve aquí.

**Empujar no adelanta ninguna puerta.** La regla dice explícitamente que el paso 4 —versión,
`enlazar` y `verificar`— se sigue cumpliendo antes de **abrir el PR**, no antes de empujar. Sin esa
frase, «empujar siempre» se lee como permiso para subir documentación sin verificar.

**La verificación no se cambia, se anota.** La acción de este repositorio solo corre en `main` y en
los PR contra `main`, así que empujar una rama `feature/` no comprueba nada, aunque el [22 §8](../docs/22-documentacion.md#8-la-verificación-automática), el
[19 §6.1](../docs/19-ambientes-y-entrega.md#61-lo-que-corre-en-cada-push) y el [18 §3](../docs/18-observabilidad-y-soporte.md#3-la-tubería) hablen de «cada push». Ampliar el disparador es una decisión con costo —minutos de
acción por cada empuje— y no es la que se pidió: va al [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar) del tablero. Lo que la regla da es
respaldo remoto y un sitio desde donde abrir el PR, no comprobación.

## Cómo se va a verificar

- `enlazar` y `verificar --base main` en verde, con las cuatro versiones subidas.
- Que no quede ningún sitio diciendo que el empuje va al final: rastrear `empuj` y `push` por todo
  el repositorio y leer cada resultado.
- El commit, bajo los 256 caracteres del [ADR-031](../docs/adr/ADR-031-commit-de-256-caracteres.md), medido antes de crearlo.
- Y la prueba de la propia regla: la rama queda empujada al terminar, sin que haya que pedirlo.
