# ADR-012 · La API propaga la identidad a PostgreSQL para que RLS siga juzgando

**Estado:** Aceptado · **Fecha:** 2026-09-15

## Contexto

[ADR-006](ADR-006-rls-por-rol.md) decidió que los permisos viven dentro de PostgreSQL con Row
Level Security. Todas las políticas escritas preguntan por `auth.uid()`: `usuarios_lectura`,
`fn_es_gerencia()`, `nom_lectura`, `mov_insercion`, el guardián de la última Gerencia, y las que
protegen nómina, adelantos y patrimonio.

Eso funciona hoy porque el navegador habla directo con la base llevando su propio token.

Con `prisma_api` en medio, la base ya no ve a la empleada: ve a la API. Y entonces:

| Si la API se conecta… | Qué pasa |
|---|---|
| Con la **clave de servicio** (`service_role`) | RLS **deja de aplicar**. Todas las políticas se vuelven decorado y la seguridad pasa a depender de que ningún `if` de Dart falle nunca |
| Como **anónimo**, sin propagar nada | `auth.uid()` es nulo, las políticas no encuentran usuario y **no se puede leer nada** |

Esta es la decisión que define si meter una API en medio conserva o destruye la seguridad del
sistema. No es opcional y no se puede dejar para después.

## Alternativas consideradas

| Opción | A favor | En contra |
|---|---|---|
| La API se conecta con `service_role` y decide ella los permisos | Funciona el primer día y sin tocar SQL; es lo que sale en cualquier tutorial | RLS deja de aplicar: la seguridad queda colgando de que ningún `if` de Dart falle nunca |
| Duplicar las reglas de permisos en Dart y confiar en ellas | Las reglas quedan a la vista de quien programa, en un solo lenguaje | Dos copias que se separan con el tiempo; nada impide llamar a la base por fuera de la API |
| **Propagar los claims del token a la sesión de PostgreSQL** | Las políticas ya escritas siguen funcionando sin tocar una línea de SQL; la base sigue siendo el juez | Hay que abrir transacción por petición y cuidar cuatro condiciones de configuración |

La primera opción es la tentadora. Es la que «funciona», la que desbloquea el desarrollo en una
tarde y la que nadie nota que está mal hasta que ya es tarde. Y es exactamente la que convierte
[ADR-006](ADR-006-rls-por-rol.md), [ADR-005](ADR-005-auditoria-por-triggers.md) y todo el trabajo
de permisos en una ilusión: las políticas siguen escritas, revisables y bonitas, pero no juzgan
nada.

## Decisión

**`prisma_api` abre una transacción por petición y, antes de tocar ninguna tabla, propaga los
claims del token del usuario a la sesión de PostgreSQL.**

```dart
Future<T> conIdentidad<T>(Claims claims, Future<T> Function(Session tx) cuerpo) {
  return _pool.runTx((tx) async {
    // 'true' = local a la transacción: se descarta al terminar y no contamina la conexión
    await tx.execute(
      Sql.named("SELECT set_config('request.jwt.claims', @claims, true)"),
      parameters: {'claims': jsonEncode(claims.toJson())},
    );
    await tx.execute('SET LOCAL ROLE authenticated');
    return cuerpo(tx);
  });
}
```

`auth.uid()` de Supabase lee `request.jwt.claims ->> 'sub'`. Al fijarlo así, **todas las
políticas ya escritas funcionan sin tocar una sola línea de SQL.** RLS sigue siendo el juez.

Sin estas cuatro condiciones, lo anterior es teatro:

1. **El usuario de base de datos de la API no puede tener `BYPASSRLS`.** Se crea un rol
   dedicado, `prisma_api`, sin ese atributo y sin `SUPERUSER`.
2. **El usuario de la API no puede ser dueño de las tablas.** El dueño se salta RLS por defecto.
3. **`ALTER TABLE … FORCE ROW LEVEL SECURITY` en todas las tablas**, para que ni el dueño se
   libre. Es cinturón y tirantes, y aquí se justifica.
4. **La clave `service_role` de Supabase no se usa nunca en el camino de una petición de usuario.**
   Queda reservada para migraciones y tareas administrativas, y vive en un secreto distinto.

> **Dos tablas no admiten `FORCE` y el modelo lo deja escrito.** `usuarios` y `auditoria` se
> quedan sin él por razones técnicas documentadas en
> [`04-modelo-de-datos.md`](../04-modelo-de-datos.md) §7.1 —la recursión de `fn_es_gerencia()` y
> la función `SECURITY DEFINER` que escribe la bitácora—. En esas dos, lo que sostiene la
> seguridad es la condición 2: el rol de la API no es dueño de nada. Son trece de quince tablas
> con `FORCE`, no quince, y esa diferencia es una decisión, no un olvido.

## Justificación

**La API no es una autoridad, es un mensajero.** Lo único que hace con la identidad es llevarla
intacta hasta donde se decide. Quien decide sigue siendo PostgreSQL, que es la capa que nadie
puede saltarse.

**Cero SQL nuevo.** Las políticas de [ADR-006](ADR-006-rls-por-rol.md) no se reescriben, no se
adaptan y no se relajan. Una migración de arquitectura que obliga a reescribir la seguridad es
una migración que va a perder seguridad por el camino.

**Es local a la transacción.** El tercer parámetro `true` de `set_config` hace que los claims se
descarten al cerrar la transacción. Sin eso, una conexión reutilizada del pool podría atender la
siguiente petición con la identidad de la anterior, que es la peor falla imaginable en un sistema
con dos roles y datos de nómina.

**Las cuatro condiciones no son detalles de instalación.** Cualquiera de las cuatro, incumplida,
devuelve el sistema al escenario de `service_role` sin que nada falle a la vista. Por eso van en
la decisión y no en una guía aparte.

## Consecuencias

- **Positivas:** [ADR-006](ADR-006-rls-por-rol.md) sobrevive intacto al cambio de arquitectura;
  las políticas siguen siendo la única fuente de permisos y se revisan en un solo lugar; el
  `if` de Dart pasa a ser comodidad —falla rápido y en español— y no autorización.
- **Negativas:** toda petición de usuario pasa por una transacción con dos sentencias de
  preparación, y no se puede atender ninguna consulta fuera de `conIdentidad()`. Depurar un
  permiso exige mirar la política, no el código. Y `service_role` queda como un arma cargada que
  hay que mantener guardada y separada.
- **Obligación que nace de esta decisión:** prueba de integración obligatoria, en cada ambiente,
  contra la base real. Autenticarse como una usuaria de tipo Operación a través de la API y
  comprobar que `GET /nomina`, `GET /usuarios` y `GET /patrimonio` devuelven vacío o 403 **por
  decisión de la base**, no por un `if` de Dart. Para demostrarlo: se desactiva temporalmente la
  comprobación de la capa de aplicación en el ambiente de pruebas y el resultado debe seguir
  siendo el mismo. Si al quitar el `if` los datos aparecen, RLS no está actuando y la prueba falla.

> **Sin esa prueba, esta decisión no es verificable: solo está declarada.** Las cuatro
> condiciones se incumplen en silencio —nadie ve un error cuando un rol trae `BYPASSRLS`—, así
> que la única forma de saber que RLS está juzgando de verdad es quitar el `if` y comprobar que
> la base sigue diciendo que no.

## Referencias

- [ADR-006 · Permisos con Row Level Security](ADR-006-rls-por-rol.md)
- [ADR-005 · Auditoría por triggers, no por la aplicación](ADR-005-auditoria-por-triggers.md)
- [ADR-002 · Arquitectura hexagonal](ADR-002-arquitectura-hexagonal.md)
- [`04-modelo-de-datos.md`](../04-modelo-de-datos.md)
