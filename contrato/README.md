# Contrato de la API · v0.11.0

| Versión | Estado | Creado | Actualizado | Contrato | Etiquetas |
|---|---|---|---|---|---|
| [3.1.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/contrato/README.md "Historial de cambios") | [✅ Vigente](../docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-19 | [0.11.0](openapi.json) | [Contrato](../docs/INDICE.md#etiqueta-contrato) · [API](../docs/INDICE.md#etiqueta-api) · [Front](../docs/INDICE.md#etiqueta-front) |

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
| Pedidos y clientes | `/api/v0/clientes`, `/api/v0/pedidos` con sus cuatro transiciones, las consultas de clientes y pedidos, los formularios `cliente`, `pedido`, `anticipo`, `entrega` y `cancelacion` ([abajo](#los-formularios-acordados)) y los códigos `40930` a `40932` y `42230` a `42235` | La [4.2](../docs/08-plan-de-desarrollo.md#tarea-4-2) construye la gestión de clientes y la [4.3](../docs/08-plan-de-desarrollo.md#tarea-4-3) a la [4.9](../docs/08-plan-de-desarrollo.md#tarea-4-9), los pedidos; el carril Front pinta sus pantallas sin esperar a ninguna |
| Movimientos | `PUT /api/v0/movimientos/{id}` para registrar, `/{id}/anulacion` y `/{id}/adjuntos` para anular y adjuntar, `POST /api/v0/consultas/movimientos` para el libro con filtros, el formulario `movimiento` ([abajo](#los-formularios-acordados)) y los códigos `40020`, `40021` y `42223` a `42226` | El [Sprint 3](../docs/08-plan-de-desarrollo.md#sprint-3) entero acordado antes de implementarlo: los endpoints ([3.4](../docs/08-plan-de-desarrollo.md#tarea-3-4)), el registro rápido ([3.5](../docs/08-plan-de-desarrollo.md#tarea-3-5)), el adjunto ([3.6](../docs/08-plan-de-desarrollo.md#tarea-3-6)), las transferencias ([3.7](../docs/08-plan-de-desarrollo.md#tarea-3-7)), el listado ([3.8](../docs/08-plan-de-desarrollo.md#tarea-3-8)) y la anulación ([3.9](../docs/08-plan-de-desarrollo.md#tarea-3-9)) |
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

### `cliente` · crear un cliente

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `nombre` | Cliente | `texto` | obligatorio | obligatorio: «Escribe el nombre del cliente.» | `ayuda`: «La persona, el colegio o la empresa, como se le dice en el taller.» |
| `telefono` | Teléfono | `texto` | — | — | `ayuda`: «Es por donde se le escribe.» |
| `correo` | Correo | `texto` | — | — | — |
| `notas` | Notas | `texto` | — | — | — |

**Solo el nombre es obligatorio, y eso es deliberado.** En el taller un cliente entra por teléfono
y el correo llega después, si llega; exigirlo obligaría a inventárselo para poder guardar el pedido.

### `pedido` · registrar un pedido

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `clienteId` | Cliente | `lista` | obligatorio | obligatorio: «Elige el cliente. Si no está, créalo primero.» | `origen`: `/api/v0/consultas/clientes` |
| `fechaPedido` | Fecha del pedido | `fecha` | — | — | `ayuda`: «Sin ella, hoy.» |
| `fechaEntregaPrevista` | Fecha de entrega | `fecha` | — | — | — |
| `anticipoPct` | Anticipo al confirmar | `porcentaje` | `minimo` 0 · `maximo` 100 | minimo y maximo: «El anticipo va entre 0 y 100 %.» | `ayuda`: «La política del negocio es 50 %.» |
| `notas` | Notas | `texto` | — | — | — |

**Las líneas del pedido no están en el descriptor, y no por olvido.** El descriptor sabe expresar
`obligatorio`, `minimo` y `maximo` sobre seis tipos de campo ([`20-contrato-de-api.md`](../docs/20-contrato-de-api.md) [§4.3](../docs/20-contrato-de-api.md#43-cómo-se-pide-y-qué-forma-tiene) y [§4.4](../docs/20-contrato-de-api.md#44-las-reglas-que-caben-y-por-qué-no-caben-más)), y
una lista de renglones repetibles no es ninguno de ellos. El esquema `NuevoPedido` sí las declara,
con `minItems` 1, y la API las juzga: un pedido sin líneas, con una cantidad que no es positiva o
con un producto que no existe responde `42231` sobre `lineas`. Un cliente que no existe o está
anulado responde `42232` sobre `clienteId`.

> **El mockup pinta el anticipo con un deslizador y el descriptor no sabe decir eso.** Captura
> `anticipo_pct` con un `range` de paso 5, y aquí el campo se declara como el porcentaje que es, con
> su mínimo y su máximo. **Cómo se pinta es del carril Front:** la API dicta reglas, no controles.

> **El valor total no se manda, se calcula.** Sale de las líneas, y por eso no es un campo del
> formulario: mandarlo sería dejar que el front calcule plata ([ADR-018](../docs/adr/ADR-018-front-sin-decisiones.md)). Lo mismo el número
> visible del pedido, que lo pone la API.

### `anticipo` · cobrar un anticipo

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `valor` | Anticipo a cobrar | `dinero` | obligatorio · `minimo` 1 | obligatorio: «Escribe cuánto se recibió.» · minimo: «El anticipo tiene que ser mayor que cero.» | `ayuda`: «Entra como pasivo, no como ingreso: no sube la utilidad hasta que se entregue.» |
| `cuentaId` | Cuenta | `lista` | obligatorio | obligatorio: «Elige en qué cuenta entró la plata.» | `origen`: `/api/v0/consultas/cuentas` |
| `fecha` | Fecha | `fecha` | — | — | `ayuda`: «Cuándo se recibió de verdad. Sin ella, hoy.» |

Que el anticipo quepa en el pedido mira el pedido entero y no cabe en el descriptor: lo comprueba
la API y responde `42230` sobre `valor`.

### `entrega` · entregar y cobrar el saldo

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `fecha` | Fecha de entrega | `fecha` | — | — | `ayuda`: «Es la fecha que causa la venta. Sin ella, hoy.» |
| `cuentaId` | Cuenta | `lista` | — | — | `origen`: `/api/v0/consultas/cuentas` · `ayuda`: «Déjala vacía si el saldo queda por cobrar.» |

**Dos campos y ni uno más**, porque son exactamente los que recibe `fn_entregar_pedido`
([`04-modelo-de-datos.md`](../docs/04-modelo-de-datos.md) [§10](../docs/04-modelo-de-datos.md#10-funciones-de-negocio-atómicas)). Declarar otro sería invitar a la API a rehacer los pasos de la
función, que es lo que la regla 1 de ese mismo párrafo prohíbe.

### `cancelacion` · cancelar un pedido

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `destinoDelAnticipo` | Qué pasa con el anticipo | `lista` | — | — | `opciones`: `devolucion` «Se le devuelve al cliente» · `ingreso` «Se convierte en ingreso» |
| `cuentaId` | Cuenta | `lista` | — | — | `origen`: `/api/v0/consultas/cuentas` · `ayuda`: «De dónde sale la plata de la devolución.» |
| `motivo` | Motivo | `texto` | obligatorio · `minimo` 5 | obligatorio: «Escribe por qué se cancela.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» | — |

**`destinoDelAnticipo` no es obligatorio en el descriptor y sí lo es a veces**, y esa es la razón de
que no lo declare: obligatorio depende de si el pedido tiene anticipos por devengar, y eso mira el
pedido y no el campo. La API lo comprueba y responde `42235` sobre `destinoDelAnticipo`.

### `movimiento` · registrar un ingreso, un gasto o una transferencia

| `campo` | `etiqueta` | `tipo` | Reglas | `mensajes` | Lo demás |
|---|---|---|---|---|---|
| `tipo` | Tipo | `lista` | obligatorio | obligatorio: «Elige si entró plata, salió plata o solo cambió de cuenta.» | `opciones`: `ingreso` «Ingreso» · `gasto` «Gasto» · `transferencia` «Transferencia entre cuentas» |
| `valor` | Valor | `dinero` | obligatorio · `minimo` 1 | obligatorio: «Escribe cuánto fue. Un movimiento de $0 no dice nada.» · minimo: «El valor tiene que ser mayor que cero.» | `teclado`: `numerico` |
| `fechaMovimiento` | Fecha del movimiento | `fecha` | obligatorio | obligatorio: «Falta la fecha en que ocurrió. Es la que manda en los reportes.» | `ayuda`: «Cuándo ocurrió de verdad, no cuándo lo estás registrando. Hoy viene puesta.» |
| `cuentaId` | Cuenta | `lista` | obligatorio | obligatorio: «Elige la cuenta donde entró o de donde salió la plata.» | `origen`: `/api/v0/consultas/cuentas` |
| `cuentaDestinoId` | Cuenta de destino | `lista` | — | — | `origen`: `/api/v0/consultas/cuentas` · `ayuda`: «Solo en una transferencia: a qué cuenta llega la plata.» |
| `categoriaId` | Categoría | `lista` | — | — | `origen`: `/api/v0/consultas/categorias` · `ayuda`: «Una transferencia no lleva categoría: la plata solo cambia de bolsillo.» |
| `descripcion` | Descripción | `texto` | — | — | `ayuda`: «En qué se fue la plata. Es lo que se lee después en el libro.» |

**El `<select>` de cuenta muestra solo nombres, sin saldos** ([`10-ux-y-mockups.md`](../docs/10-ux-y-mockups.md) [§4.3](../docs/10-ux-y-mockups.md#43-movimientos)), para que
Operación pueda elegir una cuenta sin ver la caja; por eso `origen` apunta a
`/api/v0/consultas/cuentas`, que no devuelve saldo.

Cuatro reglas no caben en el descriptor y responden con su código, con el aviso en `data.errores`
sobre el campo que corresponde: la fecha posterior a hoy (`42223`), la cuenta (`42224`) y la
categoría (`42225`) que no están en el catálogo o quedaron anuladas, y **las tres situaciones de la
cuenta de destino** (`42226`) —una transferencia sin ella, una con la misma de origen, y cualquier
otro tipo que la traiga—. Son la misma pregunta sobre el mismo campo, así que comparten código y lo
que cambia es el texto de `data.errores`.

**`cuentaDestinoId` y `categoriaId` viajan sin `obligatorio`** aunque una transferencia exija la
primera y un gasto pida la segunda: el descriptor solo sabe decir `obligatorio`, `minimo` y `maximo`,
nunca «obligatorio si» ([§4.4](../docs/20-contrato-de-api.md#44-las-reglas-que-caben-y-por-qué-no-caben-más)). Una regla condicional en el descriptor sería código en el front.

### Los siete formularios de motivo

Tienen un solo campo, `motivo`, de tipo `texto`, obligatorio y con `minimo` 5, que es lo que
exige el dominio `motivo` de la base ([`04-modelo-de-datos.md`](../docs/04-modelo-de-datos.md) [§4.1](../docs/04-modelo-de-datos.md#41-tipos-y-convenciones-comunes)). Lo que cambia es la etiqueta y
lo que dice cuando falta, que es el texto del mockup para cada caso:

| Formulario | `etiqueta` | `mensajes` |
|---|---|---|
| `desactivacion-de-usuario` | Motivo | obligatorio: «Escribe el motivo. Sin motivo escrito no se desactiva a nadie.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `reactivacion-de-usuario` | Motivo de la reactivación | obligatorio: «Escribe el motivo de la reactivación. Queda en la bitácora.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `desactivacion-de-cargo` | Motivo | obligatorio: «Escribe el motivo. Sin motivo escrito no sale ningún cargo del catálogo.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `reversion` | Motivo de la reversión | obligatorio: «Escribe el motivo de la reversión. Queda al lado del cambio que deshace.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `anulacion-de-pedido` | Motivo de la anulación | obligatorio: «Escribe el motivo. Nada se borra: el pedido queda con su motivo a la vista.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `anulacion-de-cliente` | Motivo de la anulación | obligatorio: «Escribe el motivo. Sus pedidos siguen enteros.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |
| `anulacion-de-movimiento` | Motivo de la anulación | obligatorio: «Escribe el motivo. Sin motivo escrito no se anula ningún movimiento.» · minimo: «El motivo tiene que explicar algo: escribe al menos 5 caracteres.» |

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
| **Versión** | `0.11.0` |
| **Rutas** | Todas bajo `/api/v0`, y **ninguna usa GET** ([ADR-030](../docs/adr/ADR-030-contrato-sin-get.md)): las doce lecturas cuelgan de `/api/v0/consultas/…` y las veintisiete escrituras, de su recurso. 39 operaciones en 39 rutas |
| **Códigos** | 46: los 10 genéricos y 9 por módulo en los cuatro que ya tienen contrato —sesión y transporte, usuarios y cargos, movimientos y cuentas, y pedidos y clientes—, de los cuales 22 siguen marcados como pendientes de emitir |
| **Copia fijada en `prisma_api`** | Va en `0.9.0` y sirve **trece** de las 39 operaciones: la versión, el descriptor, la navegación, las cuatro de `/sesiones`, las cinco de `/usuarios` y los cargos asignables. **No declara que las implemente todas**: declara contra qué versión del contrato está escrita, y `0.2.0` dejó de existir el día en que sus dos rutas cambiaron de verbo y de ruta. Saltarse el número habría sido peor: dos contratos distintos con el mismo `0.2.0` |
| **Origen** | Las dos versiones se generaron del esqueleto de la API durante el [Sprint 0](../docs/08-plan-de-desarrollo.md#sprint-0) y se revisaron antes de fijarlas. De aquí en adelante el orden es el inverso: primero se acuerda aquí, después se implementa |

---

## Historial

| Versión | Qué cambió | Por qué |
|---|---|---|
| `0.11.0` | Movimientos: `PUT /api/v0/movimientos/{id}`, su anulación, su adjunto y `POST /api/v0/consultas/movimientos`; ocho esquemas, el formulario `movimiento`, el séptimo de motivo y seis códigos —`40020`, `40021` y `42223` a `42226`— | Tarea [3.13](../docs/08-plan-de-desarrollo.md#tarea-3-13), con [RF-08](../docs/03-requisitos-y-bdd.md#rf-08) a [RF-16](../docs/03-requisitos-y-bdd.md#rf-16) detrás. **Adición compatible**: nada de `0.10.0` cambia de forma, y solo se amplía la descripción del esquema `Motivo`, que ya servía a seis formularios y ahora a siete. El registro reutiliza lo que el `0.10.0` acababa de fijar: `PUT` al id que genera quien pide ([ADR-020](../docs/adr/ADR-020-idempotencia.md)), el mismo dos veces responde `40900`, la anulación cuelga del recurso con el esquema `Motivo`, y `Anulacion` se comparte en vez de repetirse |
| `0.10.0` | Clientes, pedidos y anticipos: 9 operaciones nuevas, 14 esquemas, los formularios `cliente`, `pedido`, `anticipo`, `entrega` y `cancelacion`, los dos de motivo, y 9 códigos en el rango `30`–`39`, que esta versión estrena. Todos van marcados como pendientes de emitir | [RF-18](../docs/03-requisitos-y-bdd.md#rf-18) a [RF-26](../docs/03-requisitos-y-bdd.md#rf-26), [RN-05](../docs/03-requisitos-y-bdd.md#rn-05), [RN-06](../docs/03-requisitos-y-bdd.md#rn-06) y [RN-13](../docs/03-requisitos-y-bdd.md#rn-13), tarea [4.10](../docs/08-plan-de-desarrollo.md#tarea-4-10). **Adición compatible**: un cliente de `0.9.0` no encuentra nada suyo cambiado, así que sube la MINOR. Es el mismo caso que `0.3.0` |
| `0.9.0` | El décimo código base, `50300`, para cuando un servicio del que la API depende no contesta o le falta una variable | Arreglo del alta de usuarios (`plan/23-el-alta-decia-algo-salio-mal.md`). Antes ese fallo salía como `50000`, «Algo salió mal. Intenta de nuevo en un momento», que era falso en las dos mitades: no había pasado nada imprevisto y reintentar no arreglaba nada. **Sube la MINOR sin cambiar ninguna operación**, como el `0.6.0` y el `0.8.0`. La fila se escribió tarde, con la [4.10](../docs/08-plan-de-desarrollo.md#tarea-4-10): el encabezado y el `openapi.json` ya iban en `0.9.0` y este historial no lo decía |
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
