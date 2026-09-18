# Contrato de la API · v0.9.0

| Versión | Estado | Creado | Actualizado | Contrato | Etiquetas |
|---|---|---|---|---|---|
| [2.3.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/contrato/README.md "Historial de cambios") | [✅ Vigente](../docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-18 | [0.9.0](openapi.json) | [Contrato](../docs/INDICE.md#etiqueta-contrato) · [API](../docs/INDICE.md#etiqueta-api) · [Front](../docs/INDICE.md#etiqueta-front) |

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
| El descriptor de formulario | `POST /api/v0/consultas/formularios` y los esquemas `DescriptorDeFormulario`, `DescriptorDeCampo`, `OpcionDeCampo` y `MensajesDeCampo` | El front construye el renderizador de formularios sin esperar a que exista el primero ([`20-contrato-de-api.md`](../docs/20-contrato-de-api.md) [§4.3](../docs/20-contrato-de-api.md#43-cómo-se-pide-y-qué-forma-tiene)). Una lista trae sus `opciones` o el `origen` de donde salen, y el front no decide ninguna de las dos cosas. Una `clave` se pinta oculta |
| Cuentas y categorías | `POST /api/v0/consultas/cuentas` y `/consultas/categorias` para leer, `POST /api/v0/cuentas` y `/api/v0/categorias` para crear, los formularios `cuenta` y `categoria` ([abajo](#los-formularios-acordados)) y los códigos `42220` a `42222` | La API implementa la tarea [1.10](../docs/08-plan-de-desarrollo.md#tarea-1-10) contra esto, y el front pinta sus pantallas sin esperarla |
| Acceso y navegación | `/api/v0/sesiones` para entrar, renovar, salir y cambiar la propia contraseña, y `POST /api/v0/consultas/navegacion` con la vista previa de Operación. Los formularios `acceso` y `cambio-de-clave`, y los códigos `40104`, `40301`, `40302` y `42210` | La API construye el acceso ([2.1](../docs/08-plan-de-desarrollo.md#tarea-2-1), [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2), [2.12](../docs/08-plan-de-desarrollo.md#tarea-2-12), [2.14](../docs/08-plan-de-desarrollo.md#tarea-2-14)) y el front, su pantalla ([2.6](../docs/08-plan-de-desarrollo.md#tarea-2-6)), a la vez |
| Usuarios, cargos y bitácora | `/api/v0/usuarios`, `/api/v0/cargos` y las consultas de usuarios, cargos y bitácora, siete formularios más y los códigos `40910` a `40913` y `42211` a `42214` | La pantalla de Gestión de usuarios entera ([2.7](../docs/08-plan-de-desarrollo.md#tarea-2-7), [2.8](../docs/08-plan-de-desarrollo.md#tarea-2-8), [2.15](../docs/08-plan-de-desarrollo.md#tarea-2-15) a [2.18](../docs/08-plan-de-desarrollo.md#tarea-2-18)) |
| El canal firmado | Las cabeceras `X-Prisma-Nonce`, `X-Prisma-Timestamp` y `X-Prisma-Firma` en cada operación con sesión, también en las de cuentas y categorías. Cómo se arma la firma, al byte, está en [`20-contrato-de-api.md`](../docs/20-contrato-de-api.md) [§6.2](../docs/20-contrato-de-api.md#62-cómo-se-arma-la-firma) | El filtro de la API ([2.13](../docs/08-plan-de-desarrollo.md#tarea-2-13)) y el interceptor del front firman y comprueban exactamente lo mismo |

> **El catálogo va dentro del OpenAPI a propósito.** El contrato son dos cosas —rutas y códigos—,
> y si vivieran en dos archivos podrían versionarse por separado y separarse. Así es un solo
> artefacto, y una sola prueba lo verifica entero.

---

## Los formularios acordados

El descriptor de un formulario no está en `openapi.json`: lo sirve
`POST /api/v0/consultas/formularios` con `{"nombre": "…"}`, y lo genera la API de sus propias
validaciones. Lo que se acuerda aquí es **qué campos tiene, cómo se
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
| `padreId` | Dentro de | `lista` | — | — | `origen`: `/api/v0/consultas/categorias` · `ayuda`: «Déjalo vacío para una categoría principal.» |

Las tres reglas que miran más de un campo o la base —la madre existe, es de la misma naturaleza y
solo un gasto es fijo— **no caben en el descriptor** ([`20-contrato-de-api.md`](../docs/20-contrato-de-api.md) [§4.4](../docs/20-contrato-de-api.md#44-las-reglas-que-caben-y-por-qué-no-caben-más)). Las comprueba la
API y responden `42220`, `42221` y `42222`, con el aviso en `data.errores` sobre el campo que
corresponde.

### `acceso` · iniciar sesión

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `usuario` | Usuario | `texto` | obligatorio | obligatorio: «Escribe tu usuario.» | — |
| `clave` | Contraseña | `clave` | obligatorio | obligatorio: «Escribe tu contraseña.» | — |

Es el único formulario que se pide sin sesión. **La contraseña no trae `minimo` a propósito**: lo
que se escriba va al proveedor, y la única respuesta posible a una contraseña equivocada es `40104`,
«Usuario o contraseña incorrectos», la misma de un usuario que no existe.

### `cambio-de-clave` · crear o cambiar la propia contraseña

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `claveNueva` | Contraseña nueva | `clave` | obligatorio · `minimo` 8 | obligatorio: «Escribe tu contraseña nueva.» · minimo: «La contraseña debe tener mínimo 8 caracteres.» | `ayuda`: «Mínimo 8 caracteres. No pedimos símbolos ni mayúsculas: una clave larga que recuerdes es mejor que una corta que termina anotada en un papel.» |
| `repeticion` | Repite la contraseña | `clave` | obligatorio | obligatorio: «Repite la contraseña.» | — |

Que las dos coincidan mira dos campos, así que no cabe en el descriptor: lo comprueba la API y
responde `42210` sobre `repeticion`. Es el mismo formulario para «Crea tu contraseña» y para
«Cambiar mi contraseña», y ninguno pide la contraseña actual, como en el mockup.

### `usuario` · crear un usuario

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `nombreCompleto` | Nombre completo | `texto` | obligatorio · `minimo` 3 | obligatorio: «Escribe el nombre completo de la persona.» · minimo: «El nombre completo tiene que tener al menos 3 caracteres.» | — |
| `usuario` | Usuario | `texto` | obligatorio · `minimo` 3 · `maximo` 20 | obligatorio: «Escribe el usuario con el que va a entrar.» · minimo: «El usuario tiene que tener al menos 3 caracteres.» · maximo: «El usuario puede tener máximo 20 caracteres.» | `ayuda`: «El usuario va en minúsculas, de 3 a 20 caracteres, y admite números, punto, guion y guion bajo.» |
| `claveTemporal` | Contraseña temporal | `texto` | obligatorio · `minimo` 8 | obligatorio: «Escribe la contraseña temporal.» · minimo: «La contraseña temporal debe tener mínimo 8 caracteres.» | `ayuda`: «Se muestra en claro a propósito: Gerencia tiene que poder dictarla. Quien entre con ella la cambia de una vez.» |
| `cargoId` | Cargo | `lista` | obligatorio | obligatorio: «Elige un cargo del catálogo. Si el que necesitas no está, créalo abajo.» | `origen`: `/api/v0/consultas/cargos-asignables` |
| `tipo` | Tipo | `lista` | obligatorio | obligatorio: «Elige el tipo: Gerencia u Operación.» | `opciones`: `gerencia` «Gerencia» · `operacion` «Operación» · `ayuda`: «El tipo dice qué puede ver. El cargo dice qué hace.» |

`claveTemporal` es `texto` y no `clave`: Gerencia la dicta en voz alta y tiene que verla. Tres
reglas no caben en el descriptor y responden con su código, con el aviso en `data.errores`: el
formato del usuario ya en minúsculas (`42212`), el usuario que ya existe (`42211`) y el cargo que no
está activo (`42213`).

### `edicion-de-usuario` · editar un usuario

Los campos `nombreCompleto`, `cargoId` y `tipo` de `usuario`, con las mismas reglas y los mismos
mensajes. **El usuario no está**: es la identidad con la que la persona entra y de la que sale su
correo sintético, y no se edita. La contraseña tampoco: para eso está `clave-temporal`.

### `clave-temporal` · restablecer la contraseña de otra persona

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `claveTemporal` | Contraseña temporal | `texto` | obligatorio · `minimo` 8 | obligatorio: «Escribe la contraseña temporal.» · minimo: «La contraseña temporal debe tener mínimo 8 caracteres.» | `ayuda`: «Se la entregas en persona: no hay correo de recuperación. Al entrar tendrá que cambiarla.» |

### `cargo` · crear o renombrar un cargo

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `nombre` | Cargo | `texto` | obligatorio | obligatorio: «El cargo necesita un nombre.» | — |
| `descripcion` | Descripción | `texto` | — | — | — |

Un nombre que ya tiene otro cargo, sin distinguir mayúsculas, responde `42214` sobre `nombre`.

### Los cuatro formularios de motivo

Tienen un solo campo, `motivo`, de tipo `texto`, obligatorio y con `minimo` 5, que es lo que
exige el dominio `motivo` de la base ([`04-modelo-de-datos.md`](../docs/04-modelo-de-datos.md) [§4.1](../docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes)). Lo que cambia es la etiqueta y
lo que dice cuando falta, que es el texto del mockup para cada caso:

| Formulario | `etiqueta` | `mensajes` |
|---|---|---|
| `desactivacion-de-usuario` | Motivo | obligatorio: «Escribe el motivo. Sin motivo escrito no se desactiva a nadie.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `reactivacion-de-usuario` | Motivo de la reactivación | obligatorio: «Escribe el motivo de la reactivación. Queda en la bitácora.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `desactivacion-de-cargo` | Motivo | obligatorio: «Escribe el motivo. Sin motivo escrito no sale ningún cargo del catálogo.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `reversion` | Motivo de la reversión | obligatorio: «Escribe el motivo de la reversión. Queda al lado del cambio que deshace.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |

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
| **Versión** | `0.8.0` |
| **Rutas** | Todas bajo `/api/v0`, y **ninguna usa GET** ([ADR-030](../docs/adr/ADR-030-contrato-sin-get.md)): las nueve lecturas cuelgan de `/api/v0/consultas/…` y las diecisiete escrituras, de su recurso. 26 operaciones en 26 rutas |
| **Códigos** | 30: los 9 genéricos, 9 de sesión y transporte, 9 de usuarios y cargos y 3 de movimientos y cuentas, de los cuales 7 siguen marcados como pendientes |
| **Copia fijada en `prisma_api`** | Va en `0.7.0` y sirve **siete** de las 26 operaciones: la versión, el descriptor, la navegación y las cuatro de `/sesiones`. **No declara que las implemente todas**: declara contra qué versión del contrato está escrita, y `0.2.0` dejó de existir el día en que sus dos rutas cambiaron de verbo y de ruta. Saltarse el número habría sido peor: dos contratos distintos con el mismo `0.2.0` |
| **Origen** | Las dos versiones se generaron del esqueleto de la API durante el [Sprint 0](../docs/08-plan-de-desarrollo.md#sprint-0) y se revisaron antes de fijarlas. De aquí en adelante el orden es el inverso: primero se acuerda aquí, después se implementa |

---

## Historial

| Versión | Qué cambió | Por qué |
|---|---|---|
| `0.8.0` | Cuatro códigos de usuarios —`40910`, `42211`, `42212` y `42213`— dejan de estar marcados como pendientes de emitir | Tarea [2.7](../docs/08-plan-de-desarrollo.md#tarea-2-7): la gestión de usuarios ya los emite, y los cuatro los decide la base —el `UNIQUE` del usuario, su `CHECK` de formato, la llave foránea del cargo y el trigger de la última Gerencia—. **Sube la MINOR sin cambiar ninguna operación**, como el `0.6.0`: las seis rutas de `/usuarios` estaban acordadas desde el `0.4.0` y aquí solo empiezan a existir |
| `0.7.0` | La cookie `prisma_renovacion` pasa a `SameSite=None` y `Path=/api/v0/sesiones`, se declara **opcional** en la renovación, y `40302` y `42210` dejan de estar pendientes de emitir | Tarea [2.2](../docs/08-plan-de-desarrollo.md#tarea-2-2). El front y la API viven en dominios distintos desde [ADR-032](../docs/adr/ADR-032-railway-en-dev-ahora.md), y con `Strict` el navegador no manda la cookie nunca; el `Path` se escribió antes de que [ADR-030](../docs/adr/ADR-030-contrato-sin-get.md) pusiera el prefijo, así que no alcanzaba ninguna ruta real. La cookie es opcional porque **sin ella la respuesta es `40100` y no un `400`**: quien abre la aplicación por primera vez no armó mal la petición, es que todavía no ha entrado. **Sube la MINOR sin cambiar ninguna operación**: la prueba [C-04](../docs/12-pruebas-y-calidad.md#c-04) trata la descripción de una cabecera como cambio de contrato igual |
| `0.6.0` | Los tres códigos del canal firmado —`40101`, `40102` y `40103`— dejan de estar marcados como pendientes de emitir | Tarea [2.13](../docs/08-plan-de-desarrollo.md#tarea-2-13): el filtro de firma ya los emite. **Sube la MINOR sin cambiar ninguna operación**, porque `pendienteDeEmitir` es lo que le dice al front qué códigos puede esperar ya |
| `0.5.0` | **Ninguna operación usa GET.** Las nueve lecturas pasan a `POST /api/v0/consultas/…` con su cuerpo, las diecisiete escrituras ganan el prefijo `/api/v0`, y `Idempotency-Key` pasa a ser obligatoria también al leer. Tres esquemas nuevos: `ConsultaDeBitacora`, `ConsultaDeFormulario` y `ConsultaDeNavegacion` | [ADR-030](../docs/adr/ADR-030-contrato-sin-get.md). **Sube la MINOR aunque rompe todo lo anterior**, por el mismo motivo que `0.4.0`: antes del go-live todo es `0.y.z` ([ADR-014](../docs/adr/ADR-014-semver.md)) y esta vez los dos lados cambian en el mismo día, no cada uno a su ritmo. Es el primer cambio de contrato que invalida algo ya construido: `prisma_api` servía dos rutas y `prisma_front` las consumía |
| `0.4.0` | Acceso, navegación, usuarios, cargos y bitácora: 20 operaciones nuevas, los formularios `acceso`, `cambio-de-clave`, `usuario`, `edicion-de-usuario`, `clave-temporal`, `cargo` y los cuatro de motivo, y 12 códigos. El canal firmado entra en cada operación con sesión, también en las de cuentas y categorías, y el descriptor gana el tipo `clave` | [RF-01](../docs/03-requisitos-y-bdd.md#rf-01) a [RF-05](../docs/03-requisitos-y-bdd.md#rf-05), [RF-71](../docs/03-requisitos-y-bdd.md#rf-71) a [RF-94](../docs/03-requisitos-y-bdd.md#rf-94), [RF-103](../docs/03-requisitos-y-bdd.md#rf-103) y [RNF-29](../docs/03-requisitos-y-bdd.md#rnf-29), tarea [2.19](../docs/08-plan-de-desarrollo.md#tarea-2-19). **Sube la MINOR aunque no es del todo compatible**: las cabeceras de firma pasan a ser obligatorias en cuatro operaciones de `0.3.0` y la lista de tipos del descriptor crece. Antes del go-live todo es `0.y.z` ([ADR-014](../docs/adr/ADR-014-semver.md)), y ningún lado había construido todavía esas cuatro operaciones |
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
