# 02 · Semilla reproducible para dev y qa (tarea 1.11)

**2026-09-17** · Carril Base, `prisma_db`. Worktree `C:\proyects\prisma-trabajo\1.11`, rama
`feature/1.11`. Depende de la [1.1](../docs/08-plan-de-desarrollo.md#tarea-1-1), ya hecha; destraba la
[1.12](../docs/08-plan-de-desarrollo.md#tarea-1-12) y la [9.2](../docs/08-plan-de-desarrollo.md#tarea-9-2).

## Qué se va a hacer

`supabase/seed.sql` ya está reescrito en el worktree, sin commitear, y `scripts/db/verificar-base.sql`
ya trae el bloque `1.11` con sus ocho preguntas. **Lo que falta es lo que convierte la ✏️ en ✅:**

1. **Correrla.** `supabase db reset` contra la base local, que aplica las ocho migraciones y carga la
   semilla nueva. Hoy no se ha ejecutado ni una vez.
2. **Preguntarle a la base.** `scripts/db/verificar-base.sql` en local: las 78 comprobaciones en `OK`,
   incluidas las ocho del bloque `1.11`. Hoy, contra dev y con la semilla vieja, tres dan `>>> FALLA`.
3. **Probar que es re-ejecutable de verdad:** correr la semilla dos veces seguidas sobre la misma base
   y comprobar que la segunda no duplica ni rompe nada.
4. **`scripts/db/sembrar.ps1`.** Sin él, «reproducible **para dev y qa**» es falso: la semilla solo se
   carga con `db reset`, que es local. El guion la aplica a un proyecto remoto vinculado y **se niega
   a correr contra uat y prod**.
5. **Arreglar la contradicción de la documentación.** [16 §5](../docs/16-base-de-datos-y-snapshots.md) dice hoy «El seed **NO** se aplica a
   remoto», y [19 §1](../docs/19-ambientes-y-entrega.md) dice que qa lleva semilla reproducible y que «no se inventa otra». Las dos
   no pueden ser ciertas: hay que escribir la distinción real.
6. **El README de `prisma_db`**, el tablero con la [1.11](../docs/08-plan-de-desarrollo.md#tarea-1-11) en `[x]`, `enlazar` y `verificar`.
7. **Dos commits y dos PR**, uno en `prisma_db` contra `develop` y otro aquí contra `main`.

## Qué se decidió, y por qué

**La semilla se aplica a local, dev y qa; nunca a uat ni a prod.** Es lo que resuelve la
contradicción, y el corte no es «local contra remoto» sino **qué datos son de verdad**: crea usuarios
con contraseña conocida y cifras inventadas, que es justo lo que uat y prod no pueden tener
([19 §1](../docs/19-ambientes-y-entrega.md)). Que dev y qa sean remotos no los hace reales. La frase del [16](../docs/16-base-de-datos-y-snapshots.md) se escribió cuando el
único remoto que había en la cabeza era producción.

**La salvaguarda va dentro del guion, no en el instructivo.** Un aviso en un documento no detiene un
`db push` a la una de la mañana: `sembrar.ps1` lee a qué proyecto está vinculado y **se niega** si no
es dev ni qa. Y no lleva ninguna credencial escrita: este repositorio es público.

**La semilla no borra nada.** Corre con `session_replication_role = replica` y, sobre una base ya
sembrada por una versión anterior —dev lo está—, completa lo que falta y pone el correo al día
reconociendo por contenido lo que la versión vieja insertó con id al azar. Es coherente con la base
de solo escritura ([ADR-004](../docs/adr/ADR-004-base-solo-escritura.md)): ni aquí se borra.

**Las fechas que alguien lee están escritas, no son `NOW()`.** Con `NOW()` el `creado_en` de cada
movimiento haría ver como registro tardío ([RN-14](../docs/03-requisitos-y-bdd.md#rn-14)) todo lo que tenga más de una semana, y la semilla
dejaría de ser la misma cada vez. Se acepta `NOW()` solo en `auth.users` y `auth.identities`, que son
de GoTrue y nadie lee.

**Una tabla vacía miente.** El bloque `1.11` de `verificar-base.sql` comprueba primero que ninguna
tabla que leen P-01 a P-31 esté vacía y que nómina y adelantos sean de **dos** personas, y solo
después pregunta quién ve qué ([12 §3](../docs/12-pruebas-y-calidad.md)): sin algo ajeno que esconder, «no ve lo ajeno» pasa por la
razón equivocada.

## Cómo se va a verificar

- **`supabase db reset` en local, en verde**, y la semilla corrida **dos veces**: el segundo pase no
  cambia el conteo de ninguna tabla.
- **`scripts/db/verificar-base.sql` en local: 78 comprobaciones, 78 `OK`.**
- **Roto a propósito**, y visto fallar: borrar todos los adelantos de una de las dos personas
  —«desprendibles y adelantos de dos personas» pasa a `no`— y vaciar una tabla que lee P-01 a P-31
  —«ninguna tabla … esta vacia» la nombra—. La rotura va por tubería delante del guion, dentro de la
  misma transacción, que termina en `ROLLBACK`.
- **Contra dev**, después de fusionar: las mismas 78 en `OK`. Hoy son 75 y 3 fallas, y las 3 son de
  este bloque.
- `documentar.mjs verificar` en verde, con el [16](../docs/16-base-de-datos-y-snapshots.md) y el [19](../docs/19-ambientes-y-entrega.md) al día y el tablero rehecho.

## Lo que este plan no hace

- **No promueve a qa.** Eso es la [1.12](../docs/08-plan-de-desarrollo.md#tarea-1-12), que además tiene que escribir el procedimiento; qa sigue
  tres migraciones atrás hasta entonces.
- **No toca uat ni prod**, que ni siquiera existen como proyectos ([0.4](../docs/08-plan-de-desarrollo.md#tarea-0-4), y la decide Gerencia).
