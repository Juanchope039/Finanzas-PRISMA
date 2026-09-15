# PRISMA — Sistema de Gestión Administrativa y Financiera
### Prisma M&Y Estampados · Cali, Valle del Cauca, Colombia

> **PRISMA** = **P**lataforma de **R**egistro, **I**nversión, **S**eguimiento, **M**árgenes y **A**dministración.
> Un solo lugar para saber cuánto entra, cuánto sale, cuánto queda y cuánto se puede pagar.

---

## 1. El problema en una frase

Hoy la plata del negocio y la plata personal se mezclan, las facturas viven en fotos del celular
y en un cuaderno, y no hay forma confiable de responder tres preguntas críticas:

1. **¿Cuánto gané realmente este mes?** (no cuánto vendí)
2. **¿Cuánto de eso es mío y cuánto tiene que quedarse en el negocio?**
3. **¿Puedo pagarle a una empleada sin quebrar?**

PRISMA existe para responder esas tres preguntas con números, no con intuición.

---

## 2. Índice de la documentación

> 🧭 **¿No eres técnico y no sabes por dónde empezar?** Abre el
> **[índice navegable](docs/INDICE.md)**: organiza toda la documentación por preguntas
> ("¿cuánto gané este mes?", "¿mi información está segura?") y por perfil (gerencia,
> contador, operación), y marca qué documentos son técnicos para que puedas saltarlos.

| # | Documento | Para qué sirve |
|---|-----------|----------------|
| 00 | [Resumen ejecutivo](docs/00-resumen-ejecutivo.md) | La versión de 5 minutos. **Empieza aquí.** |
| 01 | [Visión y alcance](docs/01-vision-y-alcance.md) | Objetivos, usuarios, roles y permisos, qué SÍ y qué NO hace |
| 02 | [Casos de uso](docs/02-casos-de-uso.md) | Los 37 casos de uso con flujos y rol autorizado |
| 03 | [Requisitos y BDD](docs/03-requisitos-y-bdd.md) | Requisitos + escenarios Gherkin + matriz de trazabilidad |
| 04 | [Modelo de datos](docs/04-modelo-de-datos.md) | Entidades, diagrama ER, SQL, base de solo escritura |
| 05 | [Reglas financieras](docs/05-reglas-financieras.md) | **Las fórmulas exactas. El corazón del sistema.** |
| 06 | [Nómina y capacidad de pago](docs/06-nomina-y-capacidad-de-pago.md) | Cuánto se puede pagar y cómo se liquida |
| 07 | [Arquitectura](docs/07-arquitectura.md) | Hexagonal, SOLID, stack, seguridad |
| 08 | [Plan de desarrollo](docs/08-plan-de-desarrollo.md) | 10 sprints en 23 semanas, backlog, cronograma |
| 09 | [Plan de implantación](docs/09-plan-de-implantacion.md) | Migración, capacitación, go-live, soporte |
| 10 | [UX y mockups](docs/10-ux-y-mockups.md) | Pantallas, navegación, sistema de diseño |
| 11 | [Riesgos y protección de datos](docs/11-riesgos-y-proteccion-de-datos.md) | Matriz de riesgos, respaldos, Ley 1581 |
| 12 | [Pruebas y calidad](docs/12-pruebas-y-calidad.md) | Estrategia de pruebas y datos de prueba |
| 13 | [Respaldo y exportación](docs/13-respaldo-y-exportacion.md) | Diseño de la exportación de la base |
| 14 | [Roadmap e ideas](docs/14-roadmap-e-ideas.md) | 30 ideas para después del MVP |
| 15 | [Glosario](docs/15-glosario.md) | Vocabulario compartido negocio ↔ técnico |
| 16 | [Base de datos: snapshots y datos de prueba](docs/16-base-de-datos-y-snapshots.md) | Recrear la BD en cualquier ambiente, seed y generador de datos |
| 17 | [Resiliencia, offline y caché](docs/17-resiliencia-offline-y-cache.md) | Trabajar sin conexión, sincronizar al reconectar y purgar la caché |
| 18 | [Distribución y pipelines](docs/18-distribucion-y-pipelines.md) | Descargas web/Android/iPhone/Windows y automatización (idea) |
| 19 | [Ambientes, versionado y entrega](docs/19-ambientes-y-entrega.md) | Los 4 ambientes, promoción de migraciones, SemVer y publicación |
| — | [ADRs](docs/adr/) | Las 16 decisiones de arquitectura registradas |

---

## 3. Mockup interactivo

Antes de escribir una sola línea de código de producción hay un **prototipo navegable**
en [`mockup/prisma-mockup.html`](mockup/prisma-mockup.html).

Ábrelo con doble clic. Abre en la **pantalla de ingreso**: cada persona entra con su propio
usuario y contraseña, y lo que ve después depende de con quién entró. Ya no hay selector de
rol; la diferencia entre Gerencia y Operación se ve entrando con un usuario o con otro.

Trae usuarios de ejemplo con **entrada de un clic**, para no teclear nada:

| Usuario | Contraseña | Quién es | Tipo |
|---|---|---|---|
| `yuliana` | `prisma2026` | Yuliana Martínez Ríos · Gerente | Gerencia |
| `marcela` | `prisma2026` | Marcela Ospina Vélez · Empleada de producción | Operación |
| `daniela` | `prisma2026` | Daniela Cortés Ramírez · Domiciliaria | Operación |
| `camila` | `temporal01` | Camila Restrepo Arango · Asistente administrativa | Operación |
| `lorena` | `prisma2026` | Lorena Sáenz Mejía · Empleada de producción | Operación |

`camila` entra con clave temporal: el prototipo la obliga a cambiarla antes de mostrar nada.
`lorena` está desactivada y sirve para ver el rechazo aunque la contraseña sea correcta.

Son 10 pantallas con datos ficticios realistas, contando la de acceso.

> **Regla de oro del proyecto:** nada se construye hasta que el mockup de esa pantalla
> esté aprobado.

---

## 4. Las tres piezas que se van a construir

El mockup es un archivo HTML suelto y se abre con doble clic. El sistema de verdad no: son
**tres piezas con vidas separadas**, y hay que saber cuál es cuál antes de tocar nada.

| Pieza | Qué es |
|---|---|
| `prisma_front` | Flutter Web, instalable como PWA. Es lo único que ve la gente del taller |
| `prisma_api` | API propia en Dart. Hace de API y de BFF a la vez, y es la única que habla con la base |
| Base de datos | PostgreSQL en Supabase, siempre en línea. Ahí viven las reglas y los permisos |

> **El front nunca habla con Supabase directamente.** Ni con la base, ni con Auth, ni con
> Storage: todo pasa por `prisma_api`. Meter el cliente de Supabase dentro del código Flutter
> es saltarse la arquitectura y se rechaza en revisión de código.

Cada proyecto lleva su propia versión SemVer, y las tres piezas existen cuatro veces: en
desarrollo, QA, aprobación y producción, cada ambiente con su propia base. El front muestra
siempre en pantalla qué versión es y contra qué ambiente está hablando. El detalle está en
[`docs/19-ambientes-y-entrega.md`](docs/19-ambientes-y-entrega.md).

---

## 5. Las 7 decisiones de diseño que definen el producto

| # | Decisión | Por qué |
|---|----------|---------|
| 1 | **Separación estricta negocio ↔ persona** | Un retiro NO es un gasto. Mezclarlos es la causa #1 de que un emprendimiento no sepa si gana plata. |
| 2 | **Triple vista: causación, caja y caja libre** | "Tengo plata en Nequi" ≠ "gané plata" ≠ "puedo gastarla". |
| 3 | **El anticipo es un pasivo, no un ingreso** | Mientras no entregues, esa plata no es tuya. |
| 4 | **El trabajo de la gerencia se cobra como pro-labore** | Si no se cuenta, el negocio parece rentable porque tiene mano de obra gratis. |
| 5 | **La base de datos nunca borra** | Solo anula con motivo, autor, fecha y dispositivo. La historia completa siempre queda. |
| 6 | **Los permisos viven en PostgreSQL, no en la pantalla** | Ocultar un botón no es seguridad. Lo que evalúa la base es el **tipo** de usuario de la sesión abierta: Gerencia u Operación. |
| 7 | **Todo en pesos enteros (sin decimales)** | El COP no usa centavos. Evita errores de redondeo acumulados. |

---

## 6. Estado del proyecto

| Fase | Estado |
|------|--------|
| Documentación y plan | ✅ Completo |
| Mockup navegable | ✅ Completo |
| Validación con la gerencia | ⬜ Pendiente |
| Desarrollo MVP | ⬜ No iniciado |
| Implantación | ⬜ No iniciado |

---

## 7. Cómo usar esta documentación

- **Si diriges el negocio:** lee `00-resumen-ejecutivo.md`, abre el mockup, y luego `05-reglas-financieras.md`.
- **Si vas a programar:** lee `01`, `02`, `03`, `04`, `07` y `19` en ese orden.
- **Si eres el contador:** lee `05`, `06` y `11`.

---

## 8. Advertencia

**Este software no reemplaza a un contador público.** Es una herramienta de gestión y control
interno, no un sistema contable certificado ni un facturador electrónico DIAN.

Los aspectos tributarios y de facturación electrónica están **explícitamente fuera del alcance**
de esta versión y se documentan en [`docs/14-roadmap-e-ideas.md`](docs/14-roadmap-e-ideas.md).
