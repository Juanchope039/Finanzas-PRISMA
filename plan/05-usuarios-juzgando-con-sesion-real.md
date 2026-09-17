# 05 · La tabla `usuarios`, juzgando con sesión real (tarea 2.4)

**2026-09-17** · Carril Base, `prisma_db`. Worktree `C:\proyects\prisma-trabajo\2.4`, rama
`feature/2.4`, sacada de `feature/1.12` porque esa todavía no está fusionada y las dos tocan
`verificar-base.sql`. Depende de la [2.3](../docs/08-plan-de-desarrollo.md#tarea-2-3), fusionada. **Es lo que más libera del plan: 53
tareas penden de ella**, empezando por la sesión ([2.1](../docs/08-plan-de-desarrollo.md#tarea-2-1)).

## Qué se va a hacer

La tarea se llama «tabla `usuarios` **ampliada**», y la tabla **ya está ampliada**: se le preguntó a
la base local y tiene las trece columnas del [04 §4.2](../docs/04-modelo-de-datos.md#42-cargos-usuarios-y-cuentas) —`usuario`, `nombre_completo`, `cargo_id` y
`tipo` incluidas—, sus nueve restricciones con el nombre que les pone el documento, el índice parcial
`idx_usuarios_tipo` y sus cuatro políticas. Entró con la migración inicial y la [1.1](../docs/08-plan-de-desarrollo.md#tarea-1-1) le dejó los
nombres.

Así que esta tarea es la misma que fue la [2.3](../docs/08-plan-de-desarrollo.md#tarea-2-3) con `cargos`: **sin migración nueva**, lo que la cierra
es verla cumplir con sesión de verdad. Un bloque `2.4` en `scripts/db/verificar-base.sql`:

1. **La forma:** las trece columnas con su tipo, las nueve restricciones y ninguna más, y que
   `idx_usuarios_tipo` sea **parcial** —`WHERE activo`—, que es lo que el documento pide y lo que un
   índice completo no cumpliría.
2. **Las reglas de la propia tabla**, cada una vista rechazar: un `usuario` que no casa con el
   formato del [04 §4.2](../docs/04-modelo-de-datos.md#42-cargos-usuarios-y-cuentas), uno repetido **cambiando mayúsculas** —`CITEXT` es media regla de
   negocio: `Gerencia` y `gerencia` son la misma persona—, un `nombre_completo` de dos letras, un
   `cargo_id` que no existe, y una desactivación sin motivo, sin fecha o sin autor.
3. **La semilla**, que es la que sostiene todo lo demás: los cinco usuarios del mockup, con su tipo y
   su cargo, y una sola Gerencia activa.

Lo que **no** repite: las políticas ya se ven juzgar en el bloque `1.4` —Operación solo se ve a sí
misma, no se asciende, sí apaga su `debe_cambiar_clave`; Gerencia ve a todo el mundo; nadie degrada a
la última Gerencia— y que la tabla lleve RLS sin `FORCE`, a propósito, está en el `1.5`. Repetirlo
sería contar dos veces la misma prueba.

## Qué se decidió, y por qué

**No se escribe migración.** La tabla cumple el [04](../docs/04-modelo-de-datos.md) hoy; una migración que «ampliara» lo que ya
está ampliado sería una migración vacía aplicada para siempre en cuatro ambientes ([19 §2.2](../docs/19-ambientes-y-entrega.md#22-una-migración-aplicada-no-se-edita-nunca)). Si al
preguntarle a la base apareciera algo que falta, **entonces** se escribe una, y el plan lo dice aquí
para que quede claro qué hizo cambiar de idea.

**Las reglas se prueban rechazando, no aceptando.** Un `INSERT` válido no demuestra que la
restricción exista. Cada comprobación compara el **SQLSTATE** del rechazo —`23514` para un `CHECK`,
`23505` para el único, `23503` para la llave foránea—, y no el mensaje, que cambia con el idioma y
con la versión del motor. Es lo que ya hacen los bloques anteriores con `pg_temp.intento`.

**El único se prueba con mayúsculas cambiadas.** Es la diferencia entre `TEXT UNIQUE` y `CITEXT
UNIQUE`, y es la que impide dos personas llamadas `gerencia` y `Gerencia`. Probarlo con el mismo
texto exacto pasaría igual con el tipo equivocado, y entonces la prueba no probaría nada.

**El índice se comprueba parcial.** `idx_usuarios_tipo` lleva `WHERE activo` en el documento: sirve
para buscar quién manda **hoy**. Un índice sobre toda la tabla respondería lo mismo y sería otra
cosa, así que se compara la definición y no solo el nombre.

## Cómo se va a verificar

- `supabase db reset` en local y `verificar-base.sql` entero: las 85 comprobaciones que hoy pasan
  siguen pasando, más las del bloque `2.4`.
- **Roto a propósito, cada rotura vista fallar por sí sola:** renombrar una restricción; quitarle el
  `WHERE activo` al índice; intentar el usuario repetido con la misma caja para comprobar que la
  prueba del `CITEXT` distingue de verdad; y borrar de la semilla un usuario para ver caer la
  comprobación de los cinco.
- El bloque corre **dentro de la transacción que termina en `ROLLBACK`**, como el resto: no deja
  rastro ni en local ni en el ambiente contra el que se corra.
- `documentar.mjs enlazar` y `verificar --base main` en verde.

## Lo que este plan no hace

- **No toca `auth.users`** ni crea usuarios de verdad: eso es la sesión ([2.1](../docs/08-plan-de-desarrollo.md#tarea-2-1)) y los endpoints de
  usuarios ([2.5](../docs/08-plan-de-desarrollo.md#tarea-2-5)), y los de prueba los pone la semilla de la [1.11](../docs/08-plan-de-desarrollo.md#tarea-1-11).
- **No repite lo que ya prueban los bloques `1.4` y `1.5`**, que es donde viven las políticas de esta
  tabla y su ausencia deliberada de `FORCE`.
- **No promueve nada a qa**: eso sigue siendo la [1.12](../docs/08-plan-de-desarrollo.md#tarea-1-12), que está a la espera de correrse.
