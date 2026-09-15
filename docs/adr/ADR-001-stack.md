# ADR-001 · Stack tecnológico

**Estado:** Reemplazado por ADR-011 · **Fecha:** 2026-09-13

> **Lo reemplaza [ADR-011](ADR-011-stack-flutter-dart.md):** el front pasa a Flutter Web y se
> agrega `prisma_api` en Dart, porque el navegador no debe hablar directo con la base ni cargar
> sus credenciales. El cuerpo de abajo se conserva tal como se escribió.

## Contexto

Se necesita un sistema administrativo y financiero para un emprendimiento de una persona, con
uso principal desde el celular en el taller. Los criterios pedidos fueron explícitos: **ligero,
fácil de usar, poco tiempo de desarrollo y seguro.** El presupuesto de operación es cero.

## Alternativas consideradas

| Opción | A favor | En contra |
|---|---|---|
| **React + Vite + Supabase** | Ecosistema enorme, TypeScript, sin backend propio, RLS | Curva de React |
| Svelte + Supabase | ~40% menos código, app más liviana | Menos gente sabe mantenerlo |
| Python + Streamlit | El más rápido de construir | Experiencia pobre en celular, interfaz rígida |
| Google Sheets + AppSheet | Sin programar, 2-3 semanas | Límites de cálculo, lentitud, dependencia de Google |

## Decisión

**React + Vite + TypeScript + Tailwind + Supabase, desplegado en Vercel.**

## Justificación

**Ligero.** Vite produce una app que carga en menos de 2 segundos con datos móviles, sin
servidor propio ni base de datos que administrar.

**Rápido de construir.** Lo más lento y riesgoso de cualquier sistema es el backend: usuarios,
contraseñas, permisos, archivos, respaldos. Supabase lo entrega hecho. Reduce el proyecto de
unas 20 semanas a 14.

**Seguro.** Los permisos viven dentro de PostgreSQL (RLS), no en código de aplicación. Ver
[ADR-006](ADR-006-rls-por-rol.md).

**Mantenible.** React es el ecosistema con más soporte del mundo. Para un sistema del que
dependerá un negocio durante años, la disponibilidad de quien pueda retomarlo pesa más que
ahorrar unas semanas de desarrollo. Ese fue el factor que descartó Svelte pese a ser más liviano.

## Consecuencias

- **Positivas:** costo mensual $0; sin infraestructura que mantener; tipado fuerte en los
  cálculos de plata; instalable en el celular.
- **Negativas:** dependencia de dos proveedores externos. Mitigada por la arquitectura
  hexagonal ([ADR-002](ADR-002-arquitectura-hexagonal.md)): cambiar de proveedor toca
  adaptadores, no reglas de negocio.
