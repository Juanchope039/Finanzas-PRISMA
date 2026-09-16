# Índice navegable de la documentación

> Guía para moverte por toda la documentación de PRISMA **sin perderte y sin saber de programación**.
> Cada documento dice para qué sirve, en lenguaje sencillo, y está marcado si es técnico.

**Cómo leer este índice**

- 📗 **Para todos** — lo entiende cualquier persona del negocio.
- 📘 **Mixto** — empieza sencillo pero tiene partes técnicas; se puede leer por encima.
- 🔧 **Técnico** — pensado para quien va a programar. Si no es tu caso, puedes saltarlo.

---

## 1. ¿Por dónde empiezo? (según quién eres)

| Si eres… | Lee en este orden |
|----------|-------------------|
| 🧑‍💼 **Dueña o gerente del negocio** | [Resumen ejecutivo](00-resumen-ejecutivo.md) → abre el [mockup](../mockup/prisma-mockup.html) → [Reglas financieras](05-reglas-financieras.md) |
| 👷 **Trabajas en el negocio (Operación)** | [Resumen ejecutivo](00-resumen-ejecutivo.md) → abre el [mockup](../mockup/prisma-mockup.html) |
| 🧾 **Eres el contador** | [Reglas financieras](05-reglas-financieras.md) → [Nómina y capacidad de pago](06-nomina-y-capacidad-de-pago.md) → [Riesgos y protección de datos](11-riesgos-y-proteccion-de-datos.md) |
| 💻 **Vas a programar** | [Visión y alcance](01-vision-y-alcance.md) → [Casos de uso](02-casos-de-uso.md) → [Requisitos y BDD](03-requisitos-y-bdd.md) → [Modelo de datos](04-modelo-de-datos.md) → [Arquitectura](07-arquitectura.md) → [Contrato de API](20-contrato-de-api.md) |
| 📚 **Solo quieres entender una palabra** | [Glosario](15-glosario.md) |

---

## 2. Encuentra lo que buscas (por pregunta)

| Si te preguntas… | Ve a… |
|------------------|-------|
| ¿Qué es PRISMA y qué problema resuelve? | 📗 [Resumen ejecutivo](00-resumen-ejecutivo.md) |
| ¿Cómo se ve el sistema por dentro? | 📗 [Mockup interactivo](../mockup/prisma-mockup.html) |
| ¿Cuánto gané de verdad este mes? | 📗 [Reglas financieras](05-reglas-financieras.md) |
| ¿Cuánto le puedo pagar a una empleada sin quebrar? | 📗 [Nómina y capacidad de pago](06-nomina-y-capacidad-de-pago.md) |
| ¿Quién puede hacer qué dentro del sistema? | 📘 [Visión y alcance](01-vision-y-alcance.md) |
| ¿Qué cosas se pueden hacer, paso a paso? | 📘 [Casos de uso](02-casos-de-uso.md) |
| ¿Está mi información segura y protegida? | 📘 [Riesgos y protección de datos](11-riesgos-y-proteccion-de-datos.md) |
| ¿Qué pasa si se daña el computador? (respaldos) | 📘 [Respaldo y exportación](13-respaldo-y-exportacion.md) |
| ¿Cuándo va a estar listo y cómo lo empezamos a usar? | 📘 [Plan de desarrollo](08-plan-de-desarrollo.md) · [Plan de implantación](09-plan-de-implantacion.md) |
| ¿Qué viene después de la primera versión? | 📗 [Roadmap e ideas](14-roadmap-e-ideas.md) |
| No entiendo una palabra del proyecto | 📗 [Glosario](15-glosario.md) |

---

## 3. Todos los documentos, explicados

| # | Documento | ¿De qué trata, en cristiano? | Tipo |
|---|-----------|------------------------------|------|
| 00 | [Resumen ejecutivo](00-resumen-ejecutivo.md) | La versión de 5 minutos de todo el proyecto. **Empieza aquí.** | 📗 |
| 01 | [Visión y alcance](01-vision-y-alcance.md) | Para qué existe, quién lo usa, qué SÍ hace y qué NO hace. | 📘 |
| 02 | [Casos de uso](02-casos-de-uso.md) | Todo lo que se puede hacer, contado como pasos. | 📘 |
| 03 | [Requisitos y BDD](03-requisitos-y-bdd.md) | La lista formal de requisitos y cómo se comprueba cada uno. | 🔧 |
| 04 | [Modelo de datos](04-modelo-de-datos.md) | Cómo se guarda la información por dentro. | 🔧 |
| 05 | [Reglas financieras](05-reglas-financieras.md) | Las fórmulas exactas del dinero. **El corazón del sistema.** | 📗 |
| 06 | [Nómina y capacidad de pago](06-nomina-y-capacidad-de-pago.md) | Cuánto se puede pagar y cómo se liquida un sueldo. | 📗 |
| 07 | [Arquitectura](07-arquitectura.md) | Cómo está construido el sistema por dentro. | 🔧 |
| 08 | [Plan de desarrollo](08-plan-de-desarrollo.md) | En cuánto tiempo se hace y en qué orden. | 📘 |
| 09 | [Plan de implantación](09-plan-de-implantacion.md) | Cómo se pone en marcha y se capacita a la gente. | 📘 |
| 10 | [UX y mockups](10-ux-y-mockups.md) | Cómo se ven y se navegan las pantallas. | 📘 |
| 11 | [Riesgos y protección de datos](11-riesgos-y-proteccion-de-datos.md) | Qué puede salir mal y cómo se protegen los datos (Ley 1581). | 📘 |
| 12 | [Pruebas y calidad](12-pruebas-y-calidad.md) | Cómo se comprueba que todo funciona bien. | 🔧 |
| 13 | [Respaldo y exportación](13-respaldo-y-exportacion.md) | Cómo se sacan copias de seguridad de la información. | 🔧 |
| 14 | [Roadmap e ideas](14-roadmap-e-ideas.md) | Ideas para más adelante, después de la primera versión. | 📗 |
| 15 | [Glosario](15-glosario.md) | El diccionario del proyecto: cada palabra explicada. | 📗 |
| 16 | [Base de datos: snapshots y datos de prueba](16-base-de-datos-y-snapshots.md) | Cómo se recrea la base en cualquier computador y cómo se cargan datos de ejemplo. | 🔧 |
| 17 | [Resiliencia, offline y caché](17-resiliencia-offline-y-cache.md) | Cómo el sistema seguirá funcionando cuando se cae el internet y cómo se limpia lo guardado. | 📘 |
| 18 | [Distribución y pipelines](18-distribucion-y-pipelines.md) | La idea de ofrecer el sistema en web, celular y computador, y de automatizar las pruebas. | 📘 |
| 19 | [Ambientes, versionado y entrega](19-ambientes-y-entrega.md) | Los cuatro ambientes, cómo sube un cambio hasta el taller y cómo se devuelve si sale mal. | 🔧 |
| 20 | [Contrato de API](20-contrato-de-api.md) | Cómo le habla el front a la API: qué responde siempre, cómo se evita cobrar dos veces lo mismo y cómo se protege el camino. | 🔧 |
| — | [Decisiones de arquitectura (ADRs)](adr/) | Por qué se tomó cada decisión técnica importante. | 🔧 |

---

## 4. Las decisiones de arquitectura (ADRs)

Son notas cortas que explican **por qué** se decidió algo. Son técnicas, pero cada una responde
a una pregunta concreta. Ver el [índice de ADRs](adr/README.md).

| # | Decisión | Responde a… |
|---|----------|-------------|
| [001](adr/ADR-001-stack.md) | Con qué herramientas se construía antes · **Reemplazado por 011** | ¿Qué tecnología usamos? |
| [002](adr/ADR-002-arquitectura-hexagonal.md) | Cómo se organiza el código | ¿Cómo lo hacemos mantenible? |
| [003](adr/ADR-003-dinero-entero.md) | Dinero en pesos enteros, sin centavos | ¿Cómo evitamos errores de redondeo? |
| [004](adr/ADR-004-base-solo-escritura.md) | La base de datos nunca borra | ¿Cómo garantizamos que no se pierda historia? |
| [005](adr/ADR-005-auditoria-por-triggers.md) | Todo movimiento queda registrado | ¿Cómo sabemos quién hizo qué? |
| [006](adr/ADR-006-rls-por-rol.md) | Los permisos viven en la base de datos | ¿Cómo aseguramos quién ve qué? |
| [007](adr/ADR-007-pwa.md) | Funciona como app sin tienda de apps · **Reemplazado por 016** | ¿Cómo se instala y se usa? |
| [008](adr/ADR-008-exportacion.md) | Cómo se exporta la información | ¿Cómo sacamos los datos cuando haga falta? |
| [009](adr/ADR-009-login-por-usuario.md) | Cada persona entra con su propio usuario | ¿Cómo distinguimos quién es quién? |
| [010](adr/ADR-010-almacenamiento-contrasenas.md) | Contraseñas guardadas con "sal" por usuario | ¿Cómo evitamos que dos claves iguales se vean iguales? |
| [011](adr/ADR-011-stack-flutter-dart.md) | Con qué herramientas se construye: Flutter y Dart, con API propia · **Reemplazado por 017** | ¿Qué tecnología usamos? |
| [012](adr/ADR-012-identidad-a-postgres.md) | La API le dice a la base quién está pidiendo | ¿Los permisos siguen decidiéndose en la base? |
| [013](adr/ADR-013-cuatro-ambientes.md) | Cuatro copias del sistema: desarrollo, pruebas, aprobación y el de verdad | ¿Dónde se prueba antes de tocar lo real? |
| [014](adr/ADR-014-semver.md) | Cada parte lleva su propio número de versión | ¿Cómo sabemos qué versión está corriendo? |
| [015](adr/ADR-015-validacion-tres-capas.md) | Se valida tres veces y la base es la que manda · **Reemplazado por 018** | ¿Por qué se repite la misma regla? |
| [016](adr/ADR-016-flutter-web-pwa.md) | Funciona como app sin tienda de apps, con Flutter Web | ¿Cómo se instala y se usa? |
| [017](adr/ADR-017-api-en-java.md) | El front sigue en Flutter y la API pasa a Java con Spring Boot | ¿En qué está hecha cada parte? |
| [018](adr/ADR-018-front-sin-decisiones.md) | Tres partes, y la pantalla no decide nada por su cuenta | ¿Quién manda cuando hay una regla? |
| [019](adr/ADR-019-contrato-de-respuesta.md) | La API responde siempre con la misma forma y un código de cinco dígitos | ¿Cómo sé qué me contestó el sistema? |
| [020](adr/ADR-020-idempotencia.md) | Tocar Guardar dos veces no cobra dos veces | ¿Y si se me va la señal a mitad? |
| [021](adr/ADR-021-canal-firmado.md) | Cada petición va sellada contra reenvíos y cambios en el camino | ¿Alguien puede copiar una petición y repetirla? |
| [022](adr/ADR-022-openapi-generado.md) | La documentación de la API sale del código, no de la memoria de nadie | ¿Cómo sé que el manual dice la verdad? |

Del 017 al 022 están las decisiones del modelo de tres partes: el cambio de Dart a Java en la
API, que el front no decide nada, el contrato de respuesta, la idempotencia, el canal firmado y
la documentación generada del código.

---

← Volver al [README principal](../README.md)
