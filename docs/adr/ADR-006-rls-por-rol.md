# ADR-006 · Permisos con Row Level Security

**Estado:** Aceptado · **Fecha:** 2026-09-13

## Contexto

El sistema maneja dos roles con acceso muy distinto. El rol Operación —la empleada— no debe ver
la utilidad del negocio, los retiros, el patrimonio, los márgenes de los productos ni la nómina
de nadie más que la suya.

La forma habitual de implementar esto es ocultar menús y botones en la interfaz.

## Decisión

Los permisos se aplican con **Row Level Security dentro de PostgreSQL**. La interfaz también
oculta lo que no corresponde, pero eso es comodidad visual, no seguridad.

## Justificación

**Ocultar un botón no es seguridad.** Si el dato viaja al navegador, basta abrir las
herramientas de desarrollo para verlo. Y si la restricción vive en un `if` del código, basta
construir la petición a mano para saltárselo.

Con RLS, PostgreSQL **no devuelve esas filas** a una sesión con rol Operación, sin importar
cómo se construya la consulta ni desde dónde venga.

Esto importa especialmente porque no se trata de un atacante externo hipotético: se trata de la
confianza dentro de un negocio pequeño donde todos se conocen. Que el sistema garantice la
separación protege esa relación.

## Consecuencias

- **Positivas:** garantía real e independiente del código de interfaz; un error en una pantalla
  no puede exponer datos sensibles; las políticas son revisables en un solo lugar.
- **Negativas:** depurar un problema de permisos es menos evidente que leer un `if`, y hay que
  probar con sesiones reales de cada rol. Por eso las pruebas de permisos con sesión de rol
  Operación son obligatorias en cada tarea sensible.
