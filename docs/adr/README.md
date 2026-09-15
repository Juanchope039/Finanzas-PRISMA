# Decisiones de arquitectura (ADR)

Registro de las decisiones técnicas importantes: qué se decidió, por qué, qué alternativas se
consideraron y qué consecuencias tiene.

| ADR | Decisión | Estado |
|---|---|---|
| [001](ADR-001-stack.md) | React + Vite + TypeScript + Supabase | Aceptado |
| [002](ADR-002-arquitectura-hexagonal.md) | Arquitectura hexagonal con regla de dependencias verificada | Aceptado |
| [003](ADR-003-dinero-entero.md) | Dinero como entero de pesos | Aceptado |
| [004](ADR-004-base-solo-escritura.md) | Base de datos de solo escritura | Aceptado |
| [005](ADR-005-auditoria-por-triggers.md) | Auditoría por triggers, no por la aplicación | Aceptado |
| [006](ADR-006-rls-por-rol.md) | Permisos con Row Level Security | Aceptado |
| [007](ADR-007-pwa.md) | PWA en lugar de aplicación nativa | Aceptado |
| [008](ADR-008-exportacion.md) | Exportación con descarga manual | Aceptado |
| [009](ADR-009-login-por-usuario.md) | Acceso con nombre de usuario, no con correo | Aceptado |

## Por qué existen estos documentos

Dentro de un año, alguien —quizá la misma persona— va a preguntarse por qué el dinero se guarda
como entero, o por qué no se puede borrar nada. Sin estos registros, la respuesta se pierde y la
decisión se revierte sin conocer su razón.

Un ADR no se modifica: si una decisión cambia, se escribe uno nuevo que reemplaza al anterior y
se marca el viejo como **Reemplazado**.
