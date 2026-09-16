# Decisiones de arquitectura (ADR)

Registro de las decisiones técnicas importantes: qué se decidió, por qué, qué alternativas se
consideraron y qué consecuencias tiene.

| ADR | Decisión | Estado |
|---|---|---|
| [001](ADR-001-stack.md) | React + Vite + TypeScript + Supabase | Reemplazado por [011](ADR-011-stack-flutter-dart.md) |
| [002](ADR-002-arquitectura-hexagonal.md) | Arquitectura hexagonal con regla de dependencias verificada | Aceptado |
| [003](ADR-003-dinero-entero.md) | Dinero como entero de pesos | Aceptado |
| [004](ADR-004-base-solo-escritura.md) | Base de datos de solo escritura | Aceptado |
| [005](ADR-005-auditoria-por-triggers.md) | Auditoría por triggers, no por la aplicación | Aceptado |
| [006](ADR-006-rls-por-rol.md) | Permisos con Row Level Security | Aceptado |
| [007](ADR-007-pwa.md) | PWA en lugar de aplicación nativa | Reemplazado por [016](ADR-016-flutter-web-pwa.md) |
| [008](ADR-008-exportacion.md) | Exportación con descarga manual | Aceptado |
| [009](ADR-009-login-por-usuario.md) | Acceso con nombre de usuario, no con correo | Aceptado |
| [010](ADR-010-almacenamiento-contrasenas.md) | Contraseñas: hashing delegado con salt por usuario | Aceptado |
| [011](ADR-011-stack-flutter-dart.md) | Stack: Flutter y Dart con API propia | Reemplazado por [017](ADR-017-api-en-java.md) |
| [012](ADR-012-identidad-a-postgres.md) | La API propaga la identidad a PostgreSQL para que RLS siga juzgando | Aceptado |
| [013](ADR-013-cuatro-ambientes.md) | Cuatro ambientes y promoción de migraciones | Aceptado |
| [014](ADR-014-semver.md) | SemVer independiente por proyecto y contrato de compatibilidad | Aceptado |
| [015](ADR-015-validacion-tres-capas.md) | Validación en tres capas, con la base como juez | Reemplazado por [018](ADR-018-front-sin-decisiones.md) |
| [016](ADR-016-flutter-web-pwa.md) | Flutter Web instalable como PWA | Aceptado |
| [017](ADR-017-api-en-java.md) | Stack: Flutter en el front, Java con Spring Boot en la API | Reemplazado por [024](ADR-024-java-25-y-gradle.md) |
| [018](ADR-018-front-sin-decisiones.md) | Tres partes, y el front no toma decisiones | Aceptado |
| [019](ADR-019-contrato-de-respuesta.md) | Contrato de respuesta y catálogo de códigos de cinco dígitos | Aceptado |
| [020](ADR-020-idempotencia.md) | Idempotencia obligatoria en toda escritura | Aceptado |
| [021](ADR-021-canal-firmado.md) | Canal firmado contra repetición y manipulación | Aceptado |
| [022](ADR-022-openapi-generado.md) | OpenAPI generado del código y verificado en integración continua | Aceptado |
| [023](ADR-023-tres-repositorios.md) | Tres repositorios y el contrato como artefacto versionado | Reemplazado por [025](ADR-025-cuatro-repositorios.md) |
| [024](ADR-024-java-25-y-gradle.md) | Java 25, Gradle y Spring Boot 4 en la API | Aceptado |
| [025](ADR-025-cuatro-repositorios.md) | Cuatro repositorios: la base de datos sale de la API | Aceptado |

Son **25 decisiones** registradas: 19 aceptadas y 6 reemplazadas.

> **Sobre la numeración.** El cambio de stack se planeó como ADR-010 y ADR-011, pero el 010 ya
> estaba ocupado por la decisión de contraseñas. Un número asignado no se reutiliza, así que el
> stack quedó en 011 y la PWA en 016.

## Por qué existen estos documentos

Dentro de un año, alguien —quizá la misma persona— va a preguntarse por qué el dinero se guarda
como entero, o por qué no se puede borrar nada. Sin estos registros, la respuesta se pierde y la
decisión se revierte sin conocer su razón.

Un ADR no se modifica: si una decisión cambia, se escribe uno nuevo que reemplaza al anterior y
se marca el viejo como **Reemplazado**.
