# 03 · Purga de las claves vencidas a las 72 horas (tarea 1.16)

**2026-09-17** · Carriles API y Base, `prisma_db`. Worktree `C:\proyects\prisma-trabajo\1.16`, rama
`feature/1.16`. Depende de la [1.13](../docs/08-plan-de-desarrollo.md#tarea-1-13), ya fusionada en `develop`.

## Qué se va a hacer

La tabla `peticiones_idempotentes` es **la única del modelo de la que sí se borran filas**, y hoy no
la limpia nadie. El [04 §4.9](../docs/04-modelo-de-datos.md#49-claves-de-idempotencia) ya trae el SQL literal y el [16 §10](../docs/16-base-de-datos-y-snapshots.md) el procedimiento; lo que falta es
aplicarlo y preguntárselo a la base.

1. **Una migración** en `prisma_db`: `CREATE EXTENSION IF NOT EXISTS pg_cron` y
   `cron.schedule('purgar_peticiones_idempotentes', '20 3 * * *', …)` con el `DELETE` del [04 §4.9](../docs/04-modelo-de-datos.md#49-claves-de-idempotencia),
   tal cual está escrito.
2. **El bloque `1.16` de `scripts/db/verificar-base.sql`**, que cubre [P-38](../docs/12-pruebas-y-calidad.md#p-38) y [P-39](../docs/12-pruebas-y-calidad.md#p-39): que el trabajo
   esté agendado con su horario y su sentencia; que ejecutarlo borre **solo** las filas vencidas y
   ninguna de otra tabla; y que la consulta de vigilancia de [16 §10.2](../docs/16-base-de-datos-y-snapshots.md) devuelva vacío cuando todo
   está sano y devuelva filas cuando algo dejó de correr.
3. **El [16](../docs/16-base-de-datos-y-snapshots.md)**, donde §10 deja de describir lo que haría y pasa a contar lo que hay, con la
   diferencia de huso escrita; el **README de `prisma_db`**; y el tablero.
4. **Dos entradas en [TODO §10](../TODO.md)**, que es la lista de decisiones que quien dirige revisa.

## Qué se decidió, y por qué

**El horario va literal: `'20 3 * * *'`, como lo escribió el [04 §4.9](../docs/04-modelo-de-datos.md#49-claves-de-idempotencia)** —lo confirmó el usuario—. Pero
hay que decirlo con todas las letras: **`cron.timezone` es `GMT`**, así que el trabajo corre a las
**22:20 en Bogotá**, no a las 3:20 de la madrugada que el documento tiene en mente cuando dice «sin
nadie conectado». `pg_cron` no admite huso por trabajo; cambiarlo sería poner `'20 8 * * *'` y
corregir el 04 y el 16. Se deja como está y **se anota en [TODO §10](../TODO.md)**: es una decisión de quien
dirige, no de quien implementa. Para una purga de higiene la hora no cambia nada; lo que no puede
pasar es que el documento diga una hora y la base corra a otra sin que nadie lo sepa.

**No se toca `prisma_api`, aunque el plan ponga el carril «API, Base».** Los documentos movieron la
purga dentro de la base y son explícitos: corre como el **rol de migraciones**, que es dueño de la
tabla y el único con `BYPASSRLS`, y **conceder `DELETE` al rol de la API sería el error**
([04 §4.9](../docs/04-modelo-de-datos.md#49-claves-de-idempotencia) y [16 §10.1](../docs/16-base-de-datos-y-snapshots.md)). Una prueba en `prisma_api` que solo lea `cron.job` probaría la base desde
el repositorio equivocado. Va también a [TODO §10](../TODO.md), por si el carril quiere decir otra cosa.

**La migración tiene que poder volver a correr.** `CREATE EXTENSION IF NOT EXISTS` y
`cron.schedule` por nombre —que en `pg_cron` 1.6 reemplaza el trabajo si ya existe— la hacen
re-ejecutable, que es lo que necesita un ambiente donde `pg_cron` ya esté habilitado desde el panel.

**El guion no puede caerse donde `pg_cron` no esté.** Igual que con la tabla de la 1.13, la
extensión se pregunta con `to_regclass` y sentencia dinámica: contra qa, que va tres migraciones
atrás, el informe tiene que decir qué falta, no romperse.

**`nonces_vistos` no entra.** Es el [04 §4.10](../docs/04-modelo-de-datos.md), del canal firmado, y su tabla todavía no existe: su
purga llega con el [Sprint 2](../docs/08-plan-de-desarrollo.md#sprint-2). La consulta de vigilancia de [16 §10.2](../docs/16-base-de-datos-y-snapshots.md) nombra las dos tablas, así que
la comprobación tiene que tolerar que una falte.

## Cómo se va a verificar

- `supabase db reset` en local: las nueve migraciones y la semilla, sin error.
- `verificar-base.sql` en local, **con el bloque `1.16` en `OK`** y sin romper ninguna de las 78 que
  ya pasan.
- **[P-38](../docs/12-pruebas-y-calidad.md#p-38) de verdad:** sembrar dos claves —una vencida y una vigente—, ejecutar la sentencia de la
  purga y comprobar que se fue solo la vencida y que ninguna otra tabla perdió filas. Todo dentro de
  la transacción que termina en `ROLLBACK`.
- **Verificado en negativo:** cambiarle el horario al trabajo agendado, desactivarlo, y meter una
  fila vencida vieja para que la consulta de vigilancia de [16 §10.2](../docs/16-base-de-datos-y-snapshots.md) devuelva filas. Cada rotura
  tiene que dar su propia falla y ninguna otra.
- **La migración, dos veces:** aplicarla sobre una base que ya la tiene y comprobar que no falla y
  que queda un solo trabajo agendado.
- `documentar.mjs enlazar` y `verificar --base main` en verde.

## Lo que este plan no hace

- **No siembra ni promueve nada a dev ni a qa.** El `db push` va después de fusionar, y la promoción
  a qa es la [1.12](../docs/08-plan-de-desarrollo.md#tarea-1-12).
- **No vigila la tarea automáticamente.** [16 §10.2](../docs/16-base-de-datos-y-snapshots.md) deja la consulta escrita y la 1.16 la deja
  probada, pero quién la corre y con qué frecuencia no está decidido en ningún documento. No se
  inventa aquí.
