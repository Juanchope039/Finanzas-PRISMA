# Contrato de la API · v0.3.0

| Versión | Estado | Creado | Actualizado | Contrato | Etiquetas |
|---|---|---|---|---|---|
| [1.1.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/contrato/README.md "Historial de cambios") | [✅ Vigente](../docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-16 | [0.3.0](openapi.json) | [Contrato](../docs/INDICE.md#etiqueta-contrato) · [API](../docs/INDICE.md#etiqueta-api) · [Front](../docs/INDICE.md#etiqueta-front) |

Este es **el contrato entre `prisma_front` y `prisma_api`**: lo que viaja por el cable, dicho en
un solo archivo. Vive aquí, y no en ninguno de los repositorios de código, porque no le pertenece
a ninguno de los dos lados ([ADR-023](../docs/adr/ADR-023-tres-repositorios.md), que en eso
sigue vigente a través de [ADR-025](../docs/adr/ADR-025-cuatro-repositorios.md)).

| Archivo | Qué es |
|---|---|
| [`openapi.json`](openapi.json) | El documento OpenAPI 3.1 con las rutas, los esquemas y, dentro de `x-prisma-codigos`, **el catálogo completo de códigos** |

---

## Qué trae

| Parte | Dónde | Para qué le sirve a cada equipo |
|---|---|---|
| Rutas y esquemas | `paths`, `components` | El front genera de aquí su cliente y su servidor simulado; la API comprueba que implementa esto |
| El sobre | Cada respuesta es `Sobre…` con `status` y `mensaje` obligatorios | Ninguno de los dos negocia la forma de una respuesta dos veces |
| El catálogo de códigos | `x-prisma-codigos` | El front sabe qué significa cada `status`, **sin guardar ningún texto propio**: el mensaje lo manda la API en cada respuesta |
| Los códigos pendientes | `pendienteDeEmitir`, dentro de cada código que aún no se emite | El front conoce desde ya los códigos del canal firmado y de la idempotencia, y sabe en qué sprint empezará a recibirlos |
| El descriptor de formulario | `GET /formularios/{nombre}` y los esquemas `DescriptorDeFormulario`, `DescriptorDeCampo`, `OpcionDeCampo` y `MensajesDeCampo` | El front construye el renderizador de formularios sin esperar a que exista el primero ([`20-contrato-de-api.md`](../docs/20-contrato-de-api.md) [§4.3](../docs/20-contrato-de-api.md#43-cómo-se-pide-y-qué-forma-tiene)). Una lista trae sus `opciones` o el `origen` de donde salen, y el front no decide ninguna de las dos cosas |
| Cuentas y categorías | `GET` y `POST` de `/cuentas` y `/categorias`, los formularios `cuenta` y `categoria` ([abajo](#los-formularios-acordados)) y los códigos `42220` a `42222` | La API implementa la tarea [1.10](../docs/08-plan-de-desarrollo.md#tarea-1-10) contra esto, y el front pinta sus pantallas sin esperarla |

> **El catálogo va dentro del OpenAPI a propósito.** El contrato son dos cosas —rutas y códigos—,
> y si vivieran en dos archivos podrían versionarse por separado y separarse. Así es un solo
> artefacto, y una sola prueba lo verifica entero.

---

## Los formularios acordados

El descriptor de un formulario no está en `openapi.json`: lo sirve `GET /formularios/{nombre}` y
lo genera la API de sus propias validaciones. Lo que se acuerda aquí es **qué campos tiene, cómo se
llaman, qué reglas llevan y con qué palabras avisa**, para que los dos lados construyan contra lo
mismo. Si la API genera otra cosa, la 1.10 no está terminada.

### `cuenta` · crear una cuenta de dinero

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `nombre` | Nombre de la cuenta | `texto` | obligatorio | obligatorio: «Escribe el nombre de la cuenta.» | `ayuda`: «Por ejemplo: Davivienda, Bancolombia ahorros, Bold.» |
| `tipo` | Tipo | `lista` | obligatorio | obligatorio: «Elige el tipo de cuenta.» | `opciones`: `banco` «Cuenta bancaria» · `billetera` «Billetera digital» · `efectivo` «Efectivo» |
| `saldoInicial` | Saldo actual | `dinero` | obligatorio · `minimo` 0 | obligatorio: «Escribe cuánto tiene hoy la cuenta. Si está vacía, escribe 0.» · minimo: «El saldo no puede ser negativo.» | `ayuda`: «Entra como saldo inicial, no como ingreso: no afecta la utilidad del mes.» |

### `categoria` · crear una categoría

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `nombre` | Nombre de la categoría | `texto` | obligatorio | obligatorio: «Escribe el nombre de la categoría.» | — |
| `naturaleza` | Naturaleza | `lista` | obligatorio | obligatorio: «Elige si es de ingreso o de gasto.» | `opciones`: `ingreso` «Ingreso» · `gasto` «Gasto» |
| `esFijo` | Gasto fijo mensual | `casilla` | — | — | `ayuda`: «Arriendo, servicios, internet: lo que se paga todos los meses y descuenta la caja libre.» |
| `padreId` | Dentro de | `lista` | — | — | `origen`: `/categorias` · `ayuda`: «Déjalo vacío para una categoría principal.» |

Las tres reglas que miran más de un campo o la base —la madre existe, es de la misma naturaleza y
solo un gasto es fijo— **no caben en el descriptor** ([`20-contrato-de-api.md`](../docs/20-contrato-de-api.md) [§4.4](../docs/20-contrato-de-api.md#44-las-reglas-que-caben-y-por-qué-no-caben-más)). Las comprueba la
API y responden `42220`, `42221` y `42222`, con el aviso en `data.errores` sobre el campo que
corresponde.

---

## Cómo se cambia

1. **Un solo PR, aquí**, con el `openapi.json` nuevo. Lo revisan los dos lados.
2. Al fusionarse, sube la versión del contrato con SemVer
   ([ADR-014](../docs/adr/ADR-014-semver.md)). Si rompe algo —un campo que desaparece, un tipo
   que cambia—, sube la MAJOR.
3. **Cada lado actualiza su copia cuando le conviene**, no el mismo día.
4. Mientras el cambio no esté fusionado, **no se implementa en ninguno de los dos lados**. Es lo
   que evita que cada equipo construya contra una idea distinta de lo mismo.

### Cómo se entera la API de que se desvió

`prisma_api` guarda una **copia fijada** de este archivo en `contrato/openapi.json` y la prueba
**[C-04](../docs/12-pruebas-y-calidad.md#c-04)** la compara, en cada compilación, con el documento que la API genera de sus propios
controladores. Si difieren, la compilación falla y dice en qué línea
([`12-pruebas-y-calidad.md`](../docs/12-pruebas-y-calidad.md) [§9.4](../docs/12-pruebas-y-calidad.md#94-c-04--el-openapi-versionado-es-el-que-sale-del-código)).

---

## Estado

| | |
|---|---|
| **Versión** | `0.3.0` |
| **Rutas** | `GET /version`, `GET /formularios/{nombre}` y las primeras de negocio: `GET` y `POST` de `/cuentas` y `/categorias` |
| **Códigos** | 18: los 9 genéricos, los 6 de sesión y transporte y 3 de movimientos y cuentas, de los cuales 10 están marcados como pendientes |
| **Copia fijada en `prisma_api`** | Sigue en `0.2.0`. Sube a `0.3.0` con la tarea [1.10](../docs/08-plan-de-desarrollo.md#tarea-1-10), que implementa las rutas nuevas: antes, la prueba [C-04](../docs/12-pruebas-y-calidad.md#c-04) fallaría con razón |
| **Origen** | Las dos versiones se generaron del esqueleto de la API durante el [Sprint 0](../docs/08-plan-de-desarrollo.md#sprint-0) y se revisaron antes de fijarlas. De aquí en adelante el orden es el inverso: primero se acuerda aquí, después se implementa |

---

## Historial

| Versión | Qué cambió | Por qué |
|---|---|---|
| `0.3.0` | Cuentas y categorías: `GET` y `POST` de `/cuentas` y `/categorias`, sus esquemas, los formularios `cuenta` y `categoria`, y los códigos `42220` a `42222`. En el descriptor, `opciones` y `origen` para las listas y el tipo `casilla` | [RF-06](../docs/03-requisitos-y-bdd.md#rf-06), [RF-17](../docs/03-requisitos-y-bdd.md#rf-17) y [RF-97](../docs/03-requisitos-y-bdd.md#rf-97), tarea [1.17](../docs/08-plan-de-desarrollo.md#tarea-1-17). **Adición compatible**: un cliente de `0.2.0` no encuentra nada suyo cambiado, así que sube la MINOR |
| `0.2.0` | `GET /formularios/{nombre}` y los tres esquemas del descriptor | [RF-102](../docs/03-requisitos-y-bdd.md#rf-102), tarea [0.17](../docs/08-plan-de-desarrollo.md#tarea-0-17). Es una **adición compatible**: nada de `0.1.0` cambió, así que sube la MINOR |
| `0.1.0` | Primera versión: `GET /version`, el sobre y el catálogo de 15 códigos | Cierre de la 0.18 |

> **Cómo nació `0.2.0`, dicho con honestidad:** igual que `0.1.0`, se generó desde la implementación
> del [Sprint 0](../docs/08-plan-de-desarrollo.md#sprint-0) y se revisó antes de fijarla. No pasó por el PR revisado por los dos lados que pide
> este mismo documento, porque todavía no hay dos carriles trabajando. El primer cambio de contrato
> con los carriles en marcha tiene que ir por ese camino.

> **`0.3.0` es la primera que se acordó antes de implementarse**, como pide este documento: no hay
> todavía una línea de `prisma_api` que la sirva. Con un solo carril, «revisado por los dos lados»
> quiere decir revisado por quien dirige el proyecto, que tiene las decisiones de construcción en
> [`TODO.md`](../TODO.md) [§10](../TODO.md#10-decisiones-de-construcción-que-conviene-revisar).

> **Queda una decisión abierta**, y bloquea el primer cambio de contrato, no este archivo: si cada
> lado consume el contrato **por etiqueta de git** o **como paquete publicado**
> ([`21-trabajo-en-paralelo.md`](../docs/21-trabajo-en-paralelo.md) [§8](../docs/21-trabajo-en-paralelo.md#8-qué-hay-que-decidir-antes-de-abrir-un-segundo-carril), punto 3). Hasta decidirlo, la
> copia fijada de cada lado se actualiza copiando el archivo de una versión fusionada.

---

<!-- generado:referenciado-desde · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
**🔗 Referenciado desde:** ningún otro documento lo cita todavía.
<!-- /generado:referenciado-desde -->
