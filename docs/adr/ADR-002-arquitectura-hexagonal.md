# ADR-002 · Arquitectura hexagonal con regla de dependencias verificada

**Estado:** Aceptado · **Fecha:** 2026-09-13

> **Esta decisión no se deroga: [ADR-011](ADR-011-stack-flutter-dart.md) la refuerza.** Con
> `prisma_api` ya hay un backend donde aplicarla de verdad. Solo cambian dos nombres del cuerpo
> de abajo: la capa `ui` se llama `interface` dentro de la API, y la regla de dependencias se
> verifica con `analysis_options.yaml` de Dart en lugar de ESLint. Lo demás queda igual, y el
> detalle está en [`07-arquitectura.md`](../07-arquitectura.md) §3.

## Contexto

El activo más valioso del sistema no es la interfaz ni la base de datos: son **las reglas
financieras**. Reconstruirlas costaría semanas y un error en ellas produce decisiones
equivocadas sobre plata real.

Además, el sistema depende de proveedores externos que pueden cambiar de condiciones.

## Decisión

Arquitectura **hexagonal (puertos y adaptadores)** sobre Clean Architecture, con cuatro capas:
`domain`, `application`, `infrastructure`, `ui`. Las dependencias apuntan **siempre hacia
adentro**, y esa regla se verifica automáticamente en cada compilación mediante ESLint.

## Justificación

1. **Los cálculos se prueban sin base de datos, sin internet y en milisegundos.** Eso permite
   que cada fórmula tenga pruebas automáticas que corren en cada cambio.
2. **Cambiar de proveedor no toca las reglas.** Si Supabase deja de servir, se escribe un
   adaptador nuevo y el dominio queda intacto.
3. **La regla es una barrera, no una recomendación.** Si alguien importa Supabase dentro del
   dominio, la compilación falla.

## Consecuencias

- **Positivas:** el núcleo es independiente y verificable; los casos de uso son legibles uno a
  uno; las pruebas no necesitan infraestructura.
- **Negativas:** más archivos y más interfaces que en una estructura plana. Es un costo real de
  escritura que se paga con creces en confiabilidad de los cálculos y en libertad tecnológica.
