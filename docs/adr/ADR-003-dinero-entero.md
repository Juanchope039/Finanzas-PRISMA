# ADR-003 · Dinero como entero de pesos

**Estado:** Aceptado · **Fecha:** 2026-09-13

## Contexto

Los números de punto flotante no representan decimales de forma exacta: `0.1 + 0.2` no da `0.3`.
En un sistema financiero, ese error se acumula de forma invisible hasta que un reporte no cuadra
por unos pesos y nadie sabe por qué.

El peso colombiano, en la práctica del negocio, no usa centavos.

## Decisión

Todo valor monetario se almacena y se opera como **entero de pesos**:

- En la base de datos: `BIGINT`. Nunca `NUMERIC`, nunca `FLOAT`.
- En el código: un objeto de valor `Dinero` que rechaza cualquier valor no entero.
- Los porcentajes se aplican con redondeo explícito a peso entero.

## Justificación

El problema deja de existir en lugar de gestionarse. Y el objeto de valor hace imposible pasar
un número suelto por descuido: el sistema de tipos lo impide.

## Consecuencias

- **Positivas:** cero errores de redondeo acumulado; los reportes siempre cuadran.
- **Negativas:** hay que ser explícito al calcular porcentajes. Es deseable: obliga a decidir
  conscientemente cómo se redondea, en lugar de que lo decida el azar del punto flotante.
