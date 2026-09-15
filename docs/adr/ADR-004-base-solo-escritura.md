# ADR-004 · Base de datos de solo escritura

**Estado:** Aceptado · **Fecha:** 2026-09-13

## Contexto

Requisito explícito del negocio: **bajo ningún criterio se debe eliminar información.** Hay dos
razones de fondo. Primera, un registro borrado por error es irrecuperable y en un sistema
financiero eso puede significar no poder explicar una diferencia. Segunda, el historial de
errores y correcciones es en sí mismo información valiosa: permite entender qué salió mal.

## Decisión

**No existe el borrado.** Se implementa en tres niveles:

1. **Revocación en el motor.** `REVOKE DELETE, TRUNCATE` sobre el rol de la aplicación.
   PostgreSQL rechaza el borrado aunque alguien lo intente desde fuera del sistema.
2. **Anulación lógica con trazabilidad.** Cada tabla lleva `anulado_en`, `anulado_por`,
   `anulado_motivo`, `anulado_dispositivo` y `anulado_ip`. Una restricción `CHECK` hace imposible
   anular sin motivo escrito.
3. **Corrección por contra-asiento.** Un movimiento errado no se edita: se crea uno nuevo que lo
   reversa, con `corrige_a_id` apuntando al original.

## Justificación

La diferencia entre revocar el permiso y confiar en que el código no borre es la diferencia
entre una garantía y una intención. El código cambia, se olvida, se escribe mal. El permiso
revocado no.

Exigir motivo escrito tiene un efecto adicional al de trazabilidad: obliga a pensar antes de
anular.

## Consecuencias

- **Positivas:** imposible perder información; historial completo auditable; las correcciones
  cuentan la verdad de lo que pasó.
- **Negativas:** la base crece de forma monótona y todas las consultas deben filtrar por
  `anulado_en IS NULL`. Se resuelve con vistas limpias por defecto e índices parciales. Para el
  volumen de este negocio, el crecimiento es irrelevante.
- **Tensión conocida:** entra en conflicto con el derecho de supresión de datos personales. Se
  resuelve con anonimización en lugar de borrado. Ver
  [`../11-riesgos-y-proteccion-de-datos.md`](../11-riesgos-y-proteccion-de-datos.md) §3.4.
