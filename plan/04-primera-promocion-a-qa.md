# 04 · Primera promoción de migraciones dev → qa (tarea 1.12)

**2026-09-17** · Carril Base, `prisma_db`. Worktree `C:\proyects\prisma-trabajo\1.12`, rama
`feature/1.12`. Depende de la [0.10](../docs/08-plan-de-desarrollo.md#tarea-0-10) y de la
[1.11](../docs/08-plan-de-desarrollo.md#tarea-1-11), las dos fusionadas en `develop`. Destraba la
[2.11](../docs/08-plan-de-desarrollo.md#tarea-2-11).

## Qué se va a hacer

dev tiene nueve migraciones y **qa se quedó en las cinco primeras**. Le faltan las de las tareas
[1.1](../docs/08-plan-de-desarrollo.md#tarea-1-1) —los dominios y las restricciones con nombre—,
[1.2](../docs/08-plan-de-desarrollo.md#tarea-1-2) —la revocación del borrado—,
[1.13](../docs/08-plan-de-desarrollo.md#tarea-1-13) —las claves de idempotencia— y
[1.16](../docs/08-plan-de-desarrollo.md#tarea-1-16) —la purga—. Son **cuatro, no tres**: el README de `prisma_db`,
[CLAUDE.md §6](../CLAUDE.md) y [TODO §1.6](../TODO.md) se escribieron antes de que entrara la purga y nadie subió el conteo.

Y hay algo más grande que el atraso: **`schema_version` sigue diciendo `0.1.0` con cuatro migraciones
encima, y la única etiqueta es `esquema-v0.1.0`**, puesta sobre el commit de la [0.4](../docs/08-plan-de-desarrollo.md#tarea-0-4). Para el
[ADR-029](../docs/adr/ADR-029-esquema-por-etiqueta.md), lo fusionado sin etiquetar «no existe para nadie más»: la integración continua de
`prisma_api` no lo puede pedir. Promover sin publicar la versión dejaría qa al día y el número
mintiendo.

1. **El guion `scripts/db/promover.ps1`**, hermano de `sembrar.ps1`: aplica al ambiente remoto lo que
   le falte, con las mismas **dos llaves** —el ambiente, que solo admite `qa`, y la referencia del
   proyecto vinculado escrita entera— y un `-EnSeco` que se apoya en `supabase db push --dry-run`
   para enumerar lo pendiente sin aplicar nada.
2. **Una migración que publica la versión**: `INSERT INTO schema_version` con `0.2.0` y su
   descripción, `ON CONFLICT DO NOTHING` para que `supabase db reset` la pueda repetir.
3. **Un bloque `1.12` en `scripts/db/verificar-base.sql`**: hoy ningún bloque mira `schema_version`
   más allá de que exista. El nuevo exige que la última versión publicada sea la que el repositorio
   dice, que es lo único que convierte «promoví» en algo que la base puede confirmar.
4. **La etiqueta `esquema-v0.2.0`** sobre el commit ya fusionado en `develop`.
5. **El procedimiento escrito** en el [16 §5](../docs/16-base-de-datos-y-snapshots.md), en una sección propia junto a la de la semilla, que es su
   gemela; el estado real de cada ambiente en el README de `prisma_db`, en [CLAUDE.md §6](../CLAUDE.md) y en el
   tablero; y **tres entradas en [TODO §10](../TODO.md)**.
6. **La promoción de verdad**: correrlo contra qa, sembrar y volver a preguntarle a la base.

## Qué se decidió, y por qué

**El procedimiento es un guion, no un párrafo.** El [16 §5](../docs/16-base-de-datos-y-snapshots.md) dice que «el procedimiento completo» está
en el [19 §2](../docs/19-ambientes-y-entrega.md#2-la-promoción), y el 19 §2 son las reglas —el orden, que no se edita lo aplicado, que el artefacto
se promueve— pero **ninguna lista de pasos**: hoy no existe nada que impida un `db push` contra el
proyecto equivocado. Escribirlo solo como prosa repetiría el error que la [1.11](../docs/08-plan-de-desarrollo.md#tarea-1-11) ya evitó: un aviso
escrito no detiene a nadie a la una de la mañana, y la salvaguarda tiene que estar donde se ejecuta.
`promover.ps1` copia de `sembrar.ps1` sus dos llaves, su forma de encontrar el CLI y su `-EnSeco`,
porque promover y sembrar son el mismo gesto sobre el mismo ambiente.

**`-Ambiente` solo admite `qa`.** uat y prod no existen —son de pago y los decide Gerencia, que es lo
que deja abierta la [0.4](../docs/08-plan-de-desarrollo.md#tarea-0-4)—, así que un `ValidateSet` con los cuatro estaría ofreciendo destinos que
nadie puede comprobar. Escribir `prod` hoy no compila. Cuando existan, los añade la tarea que los cree.

**Y la confirmación del CLI no se silencia.** `supabase db push` enseña la lista y pregunta antes de
aplicar; no se le pasa `--yes`. Son tres puertas para una base remota, y ninguna sobra.

**La versión del esquema sube a `0.2.0`, MINOR.** [19 §4.2](../docs/19-ambientes-y-entrega.md#42-las-reglas) define MAJOR, MINOR y PATCH **para la
API**, y ningún documento dice qué cuenta como cada cosa en el esquema —[TODO §10](../TODO.md) ya deja esa
decisión escrita a nombre de esta tarea—. Se decide lo mínimo: mientras todo siga en `0.y.z` y
ninguna API en producción escriba, una tabla nueva y unas restricciones más estrictas son MINOR. Se
anota en [TODO §10](../TODO.md) y no se inventa una regla de versionado dentro de un guion de promoción.

**La etiqueta nueva se crea; la vieja no se mueve.** `esquema-v0.1.0` es la foto de lo que qa tiene
hoy, y moverla borraría el único registro de por dónde pasó cada ambiente. Se etiqueta **después de
fusionar**, sobre un commit que ya esté en `develop`: etiquetar la rama dejaría la etiqueta colgando
de un commit que el PR puede rehacer.

**Las ramas `qa`, `uat` y `prod` de `prisma_db` no se tocan.** Existen en el remoto, las tres en el
mismo commit viejo, y **ningún documento las menciona**: el [21 §6.5](../docs/21-trabajo-en-paralelo.md#65-ramas-e-integración) solo nombra `develop` y `main`. O
son el estado de cada ambiente y llevan meses mintiendo, o son restos de la creación del repositorio.
Moverlas por mi cuenta sería inventar un flujo de ramas por ambiente que nadie decidió. Va a
[TODO §10](../TODO.md).

**A qa se le siembra después de promover, no antes.** `verificar-base.sql` necesita una persona de
Gerencia y otra de Operación de verdad para preguntar por los permisos ([16 §5.1](../docs/16-base-de-datos-y-snapshots.md#51-comprobar-que-quedó-como-dice-el-modelo)); sin semilla
fallarían los bloques de RLS por falta de gente, no por falta de esquema. La semilla es
re-ejecutable: sobre qa completa lo que falte sin borrar nada.

**La promoción la ejecuta quien tiene las llaves, y hoy a mano.** El [19 §7.1](../docs/19-ambientes-y-entrega.md#71-publicar) da el paso a qa por
«Automático», pero esa tubería no existe todavía —llega en el [Sprint 9](../docs/08-plan-de-desarrollo.md#sprint-9), por [ADR-026](../docs/adr/ADR-026-railway-al-final.md)—, y
`prisma_db` ni siquiera tiene integración continua. El procedimiento tiene que decir eso en vez de
suponerla. Y este repositorio es público: aquí no entra ninguna referencia de proyecto ni ninguna
contraseña, ni como ejemplo. Las migraciones no corren con el rol `prisma_api` ([19 §3.3](../docs/19-ambientes-y-entrega.md#33-dónde-viven-los-secretos)); las corre
el CLI con el vínculo del proyecto, y el guion lo pide en el momento y no guarda nada.

**Si qa niega `pg_cron`, no se edita la migración.** La de la [1.16](../docs/08-plan-de-desarrollo.md#tarea-1-16) hace
`CREATE EXTENSION IF NOT EXISTS pg_cron`, y ningún documento dice si el proyecto de qa la admite: el
[16 §10.1](../docs/16-base-de-datos-y-snapshots.md#101-qué-hace-falta-en-cada-ambiente) solo dice que se habilita una vez por ambiente. Si falla, se habilita desde el panel y se
reintenta. Cambiar el archivo de una migración ya aplicada en dev está prohibido ([19 §2.2](../docs/19-ambientes-y-entrega.md#22-una-migración-aplicada-no-se-edita-nunca)), y aquí
además dejaría dev y qa contando historias distintas.

## Cómo se va a verificar

- **Antes:** `verificar-base.sql` contra qa. Sus bloques `1.1`, `1.2`, `1.13` y `1.16` son justo los
  de las cuatro migraciones que faltan, así que el informe señala el atraso línea por línea. Esa
  salida se cita en el commit: es la prueba de que el atraso existía y de cuál era. No deja rastro:
  lo poco que escribe va dentro de una transacción que termina en `ROLLBACK`.
- **En seco:** `promover.ps1 -Ambiente qa -EnSeco` enumera las cuatro pendientes y no aplica ninguna.
  Comprobado volviendo a correr `verificar-base.sql`: falla igual que antes.
- **Aplicado:** el guion de verdad, después `sembrar.ps1 -Ambiente qa`, y `verificar-base.sql` otra
  vez: las mismas comprobaciones en `OK` que hoy da dev —83 con el bloque de la 1.16—, incluidas las
  de idempotencia ([P-33](../docs/12-pruebas-y-calidad.md#p-33), [P-34](../docs/12-pruebas-y-calidad.md#p-34) y [P-37](../docs/12-pruebas-y-calidad.md#p-37)) y las de la purga ([P-38](../docs/12-pruebas-y-calidad.md#p-38) y [P-39](../docs/12-pruebas-y-calidad.md#p-39)), que son las que hoy no
  puede pasar, más el bloque `1.12` nuevo.
- **Dos veces:** correr el guion sobre qa ya promovida: no aplica nada y no falla.
- **Roto a propósito:** `-Ambiente prod` no compila; una referencia equivocada se niega y **no aplica
  nada**; con el repositorio desvinculado, el guion se niega en vez de adivinar destino; y el bloque
  `1.12` de `verificar-base.sql` se ve fallar contra una base cuya última versión no es la esperada.
- **La versión:** `schema_version` devuelve dos filas en dev y en qa, `0.1.0` y `0.2.0`, y la etiqueta
  `esquema-v0.2.0` existe sobre el commit fusionado. Comprobarla en cada base es parte declarada del
  paso ([09 §3.1](../docs/09-plan-de-implantacion.md)).
- `documentar.mjs enlazar` y `verificar --base main` en verde.

## Lo que este plan no hace

- **No toca uat ni prod**, que no existen ([0.4](../docs/08-plan-de-desarrollo.md#tarea-0-4)), ni mueve las ramas de ambiente de `prisma_db`.
- **No monta integración continua en `prisma_db`**, que hoy no tiene ninguna, ni automatiza la
  promoción: el [19 §6.2](../docs/19-ambientes-y-entrega.md#62-en-cada-promoción) describe lo que correrá en cada promoción cuando haya tubería, y buena parte
  de eso —la prueba de permisos por la API ([1.7](../docs/08-plan-de-desarrollo.md#tarea-1-7)) y la traducción de errores ([1.8](../docs/08-plan-de-desarrollo.md#tarea-1-8))— todavía no
  existe. Lo exigible hoy es lo que `verificar-base.sql` puede preguntar.
- **No monta la tubería del [ADR-029](../docs/adr/ADR-029-esquema-por-etiqueta.md) en `prisma_api`** —descargar `prisma_db` por etiqueta y levantar
  Supabase—, ni crea el secreto `PRISMA_DB_TOKEN`, que es de quien dirige.
- **No hace que la API lea `schema_version`** en vez de la variable `PRISMA_ESQUEMA`: es otra tarea
  del [Sprint 1](../docs/08-plan-de-desarrollo.md#sprint-1) y toca `prisma_api`.
- **No ejecuta la [2.11](../docs/08-plan-de-desarrollo.md#tarea-2-11)**, la prueba de permisos corriendo también en qa: la destraba dejando qa
  con esquema y semilla, y nada más.
