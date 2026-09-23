# 02 · Casos de uso

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [1.3.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/docs/02-casos-de-uso.md "Historial de cambios") | [✅ Vigente](22-documentacion.md#estados) | 2026-09-13 | 2026-09-23 | [Requisitos](INDICE.md#etiqueta-requisitos) · [Negocio](INDICE.md#etiqueta-negocio) |

Los 37 casos de uso del MVP. Cada uno indica el **rol autorizado**, y esa autorización se
implementa en la base de datos, no en la pantalla.

**Actores:**

| Actor | Descripción |
|---|---|
| **GER** | Gerencia — propiedad del negocio, acceso total |
| **OPE** | Operación — empleada, acceso restringido al registro |
| **SIS** | Sistema — procesos automáticos, sin intervención humana |

---

## 1. Tabla maestra

| ID | Caso de uso | Rol | Precondición | Postcondición |
|---|---|:---:|---|---|
| [CU-01](#cu-01) | Registrar ingreso | GER · OPE | Sesión activa, cuenta creada | Movimiento con doble fecha, saldo actualizado, auditoría escrita |
| <a id="cu-02"></a>CU-02 | Registrar gasto con recibo | GER · OPE | Sesión activa | Movimiento y adjunto almacenados |
| [CU-03](#cu-03) | Anular movimiento errado | GER | Movimiento no anulado | Marcado anulado con motivo; **nunca borrado** |
| <a id="cu-04"></a>CU-04 | Corregir por contra-asiento | GER | Movimiento existente | Movimiento nuevo que reversa el original; ambos visibles |
| <a id="cu-05"></a>CU-05 | Registrar pedido de venta | GER · OPE | Cliente existente o nuevo | Pedido en estado `en_proceso` |
| [CU-06](#cu-06) | Cobrar anticipo | GER · OPE | Pedido creado | Anticipo registrado **como pasivo**, no como ingreso |
| [CU-07](#cu-07) | Entregar y cobrar saldo | GER · OPE | Pedido `en_proceso` | Venta causada, anticipo liberado, estado `entregado` |
| <a id="cu-08"></a>CU-08 | Consultar pedidos por fecha | GER · OPE | — | Listado filtrable con pendientes resaltados |
| <a id="cu-09"></a>CU-09 | Costear un producto | GER | Producto existente | Costo, margen y margen por hora recalculados |
| <a id="cu-10"></a>CU-10 | Costear servicio de bordado | GER | — | Costo por tiempo de máquina y puntadas registrado |
| <a id="cu-11"></a>CU-11 | Generar cotización PDF | GER · OPE | Productos costeados | PDF con logo listo para WhatsApp |
| [CU-12](#cu-12) | Validar anticipo mínimo | SIS | Cotización con costo directo | Advertencia si el anticipo no cubre el material |
| <a id="cu-13"></a>CU-13 | Ver utilidad, caja y caja libre | GER | Movimientos del mes | Las tres cifras conciliadas |
| <a id="cu-14"></a>CU-14 | Ver promedio de ganancias | GER | ≥1 mes cerrado | Promedio mensual y proyección anual |
| <a id="cu-15"></a>CU-15 | Registrar inversión en activo | GER | — | Activo registrado; **no reduce la utilidad** |
| [CU-16](#cu-16) | Registrar retiro | GER | Caja libre suficiente | Retiro registrado; **no afecta utilidad**, sí caja y patrimonio |
| <a id="cu-17"></a>CU-17 | Configurar los 4 sobres | GER | — | Porcentajes guardados con historial de cambios |
| [CU-18](#cu-18) | Simular capacidad de pago | GER | ≥6 meses de historia | Salario máximo sostenible y ventas necesarias |
| <a id="cu-19"></a>CU-19 | Liquidar nómina del mes | GER | Empleada activa | Liquidación y desprendible PDF; adelantos descontados |
| <a id="cu-20"></a>CU-20 | Ver el propio desprendible | GER · OPE | Nómina liquidada | Ve **solo** su desprendible |
| <a id="cu-21"></a>CU-21 | Importar histórico de Excel | GER | Archivo CSV | Movimientos cargados con reporte de errores por fila |
| <a id="cu-22"></a>CU-22 | Exportar respaldo | GER | — | Archivo con manifiesto; **descarga manual** |
| <a id="cu-23"></a>CU-23 | Consultar auditoría | GER | — | Quién, cuándo, desde dónde y qué cambió |
| <a id="cu-24"></a>CU-24 | Alertar descapitalización | SIS | 12 meses de historia | Aviso si los retiros superan las utilidades |
| <a id="cu-25"></a>CU-25 | Definir el pro-labore | GER | — | Sueldo propio como **gasto**; el resto como distribución |
| [CU-26](#cu-26) | Registrar adelanto a empleada | GER | Empleada activa | Cuenta por cobrar; **no es gasto** hasta descontarse |
| [CU-27](#cu-27) | Ver horas pagadas vs. facturadas | GER | Pedidos con tiempo cargado | Tiempo ocioso del mes y su costo |
| [CU-28](#cu-28) | Iniciar sesión con usuario y contraseña | GER · OPE | Usuario activo | Sesión abierta con nombre, cargo y tipo cargados |
| [CU-29](#cu-29) | Crear un usuario | GER | Cargo existente en el catálogo | Usuario activo con clave temporal y cambio obligatorio |
| [CU-30](#cu-30) | Desactivar un usuario | GER | Usuario activo que no sea la última Gerencia | Marcado inactivo con motivo; **nunca borrado** |
| [CU-31](#cu-31) | Restablecer la contraseña de un usuario | GER | Usuario existente | Clave temporal entregada en persona; cambio obligatorio al entrar |
| <a id="cu-32"></a>CU-32 | Cambiar la propia contraseña | GER · OPE | Sesión activa | Contraseña actualizada; `debe_cambiar_clave` en falso |
| <a id="cu-33"></a>CU-33 | Administrar el catálogo de cargos | GER | — | Cargo creado, renombrado o desactivado con motivo |
| [CU-34](#cu-34) | Reactivar un usuario desactivado | GER | Usuario desactivado | Acceso devuelto con motivo escrito y cambio de clave obligatorio |
| [CU-35](#cu-35) | Revertir un cambio desde la bitácora | GER | Entrada reversible y aún no revertida | Entrada nueva que deshace el cambio; la original queda marcada, **nunca borrada** |
| [CU-36](#cu-36) | Previsualizar el sistema como lo ve Operación | GER | Sesión de tipo Gerencia | Interfaz pintada como para Operación, con aviso permanente y salida a un clic |
| [CU-37](#cu-37) | Descargar lo que muestra una pantalla | GER | Pantalla con datos a la vista | Archivo CSV o PDF **sin manifiesto**; la descarga queda registrada |

---

## 2. Casos de uso detallados

Se desarrollan los casos con reglas de negocio no evidentes. Los demás siguen el patrón estándar
de alta, consulta y modificación descrito en la tabla maestra.

---

### <a id="cu-01"></a>CU-01 · Registrar ingreso

| | |
|---|---|
| **Actor** | Gerencia · Operación |
| **Objetivo** | Dejar registrado un ingreso en menos de 30 segundos |
| **Precondición** | Sesión activa y al menos una cuenta creada |
| **Frecuencia** | Varias veces al día |

**Flujo principal**

1. El actor abre el botón de registro rápido.
2. El sistema propone la fecha de hoy como **fecha del movimiento**, editable.
3. El actor ingresa el valor en pesos enteros.
4. Selecciona categoría y cuenta de destino.
5. Opcionalmente adjunta una foto y escribe una nota.
6. Confirma.
7. El sistema guarda el movimiento con `fecha_movimiento` (la indicada) y `creado_en`
   (automática, no editable), actualiza el saldo de la cuenta y escribe el registro de auditoría
   mediante trigger.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | El movimiento ocurrió hace más de 7 días | Se guarda igual y se marca como **registro tardío** |
| A2 | La fecha indicada es futura | Se rechaza: no se registran movimientos que no han ocurrido |
| A3 | Sin conexión | Se encola localmente y se sincroniza al reconectar, conservando la fecha original |
| A4 | El valor es cero o negativo | Se rechaza con mensaje claro |

**Postcondición** — Movimiento persistido, saldo actualizado, auditoría escrita.

**Reglas de negocio** — [RN-01](03-requisitos-y-bdd.md#rn-01) (doble fecha), [RN-02](03-requisitos-y-bdd.md#rn-02) (pesos enteros), [RN-14](03-requisitos-y-bdd.md#rn-14) (registro tardío).

---

### <a id="cu-03"></a>CU-03 · Anular movimiento errado

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Dejar sin efecto un registro equivocado sin perder la historia |

**Flujo principal**

1. Gerencia localiza el movimiento y elige *Anular*.
2. El sistema **exige un motivo escrito**. Sin motivo no continúa.
3. Gerencia escribe el motivo y confirma.
4. El sistema marca `anulado_en`, `anulado_por`, `anulado_motivo`, `anulado_dispositivo` e
   `anulado_ip`. **El registro no se borra.**
5. Si el movimiento va con otro registro —el anticipo de un pedido, un activo, un aporte, un
   retiro o un adelanto—, **ese registro se anula con él**, con el mismo motivo y en la misma
   transacción ([04 §5.2](04-modelo-de-datos.md#52-anulación-lógica-con-trazabilidad)). La tabla de abajo dice cuándo se puede.
6. Se recalculan los saldos excluyendo el movimiento anulado.
7. El trigger de auditoría guarda el estado anterior y el posterior en formato JSON.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | Quien intenta anular es de tipo Operación | La base de datos rechaza la operación, no solo la pantalla |
| A2 | El movimiento ya está anulado | Se informa y no se hace nada |
| A3 | El movimiento pertenece a un mes cerrado | Se exige contra-asiento ([CU-04](#cu-04)) en lugar de anulación |
| A4 | Es el anticipo de un pedido ya entregado o cancelado | No se anula nada: ese anticipo ya se volvió venta, o ya se decidió si se devolvía. Se corrige con contra-asiento |
| A5 | Es el ingreso con que se causó la venta de un pedido entregado | No se anula nada: el pedido quedaría entregado sin venta. Se corrige con contra-asiento |
| A6 | Es un adelanto que ya se descontó en una nómina liquidada | No se anula nada: la nómina ya lo cobró ([RN-11](03-requisitos-y-bdd.md#rn-11)). Se corrige con contra-asiento |
| A7 | Es el pago de una nómina | No se anula nada: la liquidación no tiene cómo anularse. Se corrige con contra-asiento |
| A8 | Es una de las dos mitades de un retiro partido en pro-labore y distribución | Se anulan las dos mitades y sus dos registros de retiro |

**Qué pasa con el registro que va con el movimiento**

| El movimiento va con… | Al anularlo |
|---|---|
| Nada: un ingreso, un gasto o una transferencia del libro | Se anula solo |
| El anticipo de un pedido en proceso | Se anula con él |
| El anticipo de un pedido entregado o cancelado | No se anula (A4) |
| La venta que causó la entrega de un pedido | No se anula (A5) |
| Un activo o un aporte | Se anula con él |
| Una mitad de un retiro partido | Se anulan las dos mitades y sus dos registros (A8) |
| Un adelanto sin descontar | Se anula con él |
| Un adelanto ya descontado | No se anula (A6) |
| El pago de una nómina | No se anula (A7) |

- **El retiro se anula entero** porque fue una sola decisión: anular una mitad cambiaría cuánto fue
  pro-labore y cuánto distribución, y eso lo decide la regla del mes ([CU-16](#cu-16)), no una anulación.
- **Lo que no se anula no se deshace en cascada.** Una anulación de movimiento no deshace una
  entrega ni una liquidación, que tienen su propia pantalla y su propio flujo.
- **El libro lo dice antes de intentar.** Cada fila trae si se deja anular y, si no, por qué, con
  las mismas palabras con que respondería la anulación ([10 §4.3](10-ux-y-mockups.md#43-movimientos)).

Estas reglas las propuso el contrato de la tarea [3.17](08-plan-de-desarrollo.md#tarea-3-17) y las aprobó quien dirige. Las impone
`fn_anular_movimiento` ([04 §10](04-modelo-de-datos.md#10-funciones-de-negocio-atómicas)).

**Postcondición** — Movimiento invisible en reportes, visible en el modo *ver anulados*,
íntegro en la base de datos. Su registro hermano, si lo tiene, queda anulado con él.

---

### <a id="cu-06"></a>CU-06 · Cobrar anticipo

| | |
|---|---|
| **Actor** | Gerencia · Operación |
| **Objetivo** | Registrar el 50% que se cobra al confirmar el pedido |

**Flujo principal**

1. Sobre un pedido en estado `en_proceso`, el actor registra el anticipo recibido.
2. Indica valor, cuenta de destino y fecha del movimiento.
3. El sistema:
   - **Aumenta la caja** de la cuenta indicada.
   - **Registra un pasivo** `anticipos_por_devengar` por el mismo valor.
   - **No registra ingreso** ni utilidad.
4. El pedido queda con anticipo cobrado y su saldo pendiente calculado.

**Regla de negocio central ([RN-05](03-requisitos-y-bdd.md#rn-05))**

> Un anticipo **no es un ingreso**. Es una deuda con el cliente hasta que se entrega el pedido.
> Solo al entregar ([CU-07](#cu-07)) se causa la venta y el pasivo se libera.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | El anticipo supera el valor del pedido | Se rechaza |
| A2 | El anticipo no cubre el costo directo | Se muestra la advertencia de [CU-12](#cu-12) |
| A3 | El cliente paga todo por adelantado | Se registra el 100% como pasivo hasta la entrega |

---

### <a id="cu-07"></a>CU-07 · Entregar pedido y cobrar saldo

| | |
|---|---|
| **Actor** | Gerencia · Operación |
| **Objetivo** | Causar la venta en el momento correcto |

**Flujo principal**

1. El actor marca el pedido como entregado e indica la fecha de entrega.
2. Registra el cobro del saldo.
3. El sistema, **en una sola transacción**:
   - Causa el ingreso por el **valor total del pedido** con fecha de entrega.
   - Causa el costo directo asociado.
   - Libera el pasivo de anticipos por devengar.
   - Aumenta la caja por el saldo cobrado.
   - Cambia el estado a `entregado`.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | Se entrega sin cobrar el saldo | Se causa la venta igual y queda cuenta por cobrar |
| A2 | Entrega parcial | Se causa proporcionalmente y el pedido queda `parcial` |
| A3 | El pedido se cancela después del anticipo | El anticipo se convierte en ingreso o en devolución, según se indique, con motivo obligatorio |

**Postcondición** — La utilidad del mes de entrega refleja el pedido completo.

---

### <a id="cu-12"></a>CU-12 · Validar anticipo mínimo *(automático)*

| | |
|---|---|
| **Actor** | Sistema |
| **Disparador** | Generación de una cotización o registro de un pedido |

**Flujo principal**

1. El sistema calcula el costo directo del pedido a partir del costeo de los productos.
2. Calcula el anticipo mínimo como la proporción entre costo directo y valor total.
3. Compara contra el anticipo configurado para el pedido (50% por defecto).
4. Si el anticipo configurado es menor, muestra la advertencia con el faltante en pesos y el
   porcentaje sugerido, redondeado hacia arriba a un múltiplo de 5.

**Ejemplo**

> Pedido de $520.000 en rompecabezas. Costo directo $338.000 (65%).
> Anticipo del 50% = $260.000. **Faltan $78.000.**
> Mensaje: *"Con el 50% pones $78.000 de tu bolsillo hasta la entrega. Anticipo sugerido: 70%."*

---

### <a id="cu-16"></a>CU-16 · Registrar retiro

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Sacar plata del negocio sin distorsionar la utilidad |

**Flujo principal**

1. Gerencia indica valor, cuenta de origen y fecha.
2. El sistema pregunta cómo se clasifica:
   - **Pro-labore** — pago por el trabajo propio en el taller → **es gasto**.
   - **Distribución de utilidades** — retiro por ser propietario → **no es gasto**.
3. Si hay un pro-labore mensual configurado ([CU-25](#cu-25)), el sistema **propone la división
   automáticamente**.
4. Registra ambos componentes con su naturaleza correspondiente.
5. Reduce la caja por el total y el patrimonio por el componente de distribución.

**Regla de negocio central ([RN-07](03-requisitos-y-bdd.md#rn-07))**

> El retiro de utilidades **no reduce la utilidad del período**. Un gasto es lo que el negocio
> consume para operar; el retiro es reparto de una ganancia ya generada. Registrarlo como gasto
> hace que el negocio se vea peor cuanto más se retire, lo cual es absurdo.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | La caja libre no alcanza | Se advierte que se estaría usando plata de anticipos; requiere confirmación explícita |
| A2 | Los retiros del año superan las utilidades | Se dispara la alerta de [CU-24](#cu-24) |

---

### <a id="cu-18"></a>CU-18 · Simular capacidad de pago

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Responder con números si se puede contratar y por cuánto |

**Flujo principal**

1. Gerencia abre el simulador.
2. El sistema toma la **utilidad operativa promedio de los últimos 6 meses**, calculada
   **con el pro-labore ya descontado como gasto**.
3. Resta el porcentaje de reserva de seguridad configurado.
4. Presenta el presupuesto mensual disponible para personal.
5. Calcula, en sentido inverso, las **ventas adicionales necesarias** y las traduce a unidades
   de cada producto.
6. Permite mover los controles de reserva, salario tentativo y horas para ver el efecto en vivo.

**Regla de negocio central ([RN-09](03-requisitos-y-bdd.md#rn-09))**

> El simulador usa **obligatoriamente** la utilidad con pro-labore descontado. Usar la utilidad
> inflada por no contar el trabajo propio es el error que lleva a contratar y quebrar.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | Menos de 6 meses de historia | Se usa el promedio disponible y se advierte que la proyección es menos confiable |
| A2 | El presupuesto disponible es negativo o muy bajo | El sistema lo declara **no viable** y sugiere alternativas: medio tiempo, por obra, o crecer primero |
| A3 | No hay pro-labore definido | Se bloquea el simulador y se pide definirlo ([CU-25](#cu-25)) |

---

### <a id="cu-26"></a>CU-26 · Registrar adelanto a la empleada

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Entregar plata a cuenta del salario sin contarla dos veces |

**Flujo principal**

1. Gerencia registra el adelanto con valor, fecha y cuenta de origen.
2. El sistema:
   - **Reduce la caja.**
   - **Crea una cuenta por cobrar** a nombre de la empleada.
   - **No registra gasto.**
3. Al liquidar la nómina ([CU-19](#cu-19)), el adelanto se descuenta del neto a pagar y la cuenta por
   cobrar se cancela.

**Regla de negocio ([RN-11](03-requisitos-y-bdd.md#rn-11))**

> Registrar el adelanto como gasto y después pagar el salario completo cuenta el mismo dinero
> dos veces. El gasto se reconoce una sola vez, en la liquidación.

---

### <a id="cu-27"></a>CU-27 · Horas pagadas vs. horas facturadas

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Saber cuánto tiempo pagado no se está convirtiendo en ventas |

**Flujo principal**

1. El sistema suma las horas pagadas del mes: nómina + pro-labore.
2. Suma las horas cargadas a pedidos entregados en el mes, según el costeo.
3. Presenta la diferencia y su costo.

**Ejemplo**

> 160 horas pagadas · 104 horas cargadas a pedidos → **56 horas no facturadas**.
> A $9.400 la hora, son **$526.400 de capacidad sin vender** en el mes.

**Interpretación documentada** — Una diferencia alta indica falta de demanda, exceso de
capacidad o trabajo que no se está cobrando: ajustes, repeticiones, diseños regalados.

---

### <a id="cu-28"></a>CU-28 · Iniciar sesión con usuario y contraseña

| | |
|---|---|
| **Actor** | Gerencia · Operación |
| **Objetivo** | Entrar al sistema en menos de 10 segundos, sin necesitar correo electrónico |
| **Precondición** | Usuario creado y activo |
| **Frecuencia** | Varias veces al día |

**Flujo principal**

1. La persona abre la aplicación y ve la pantalla de acceso. El foco arranca en el campo
   **Usuario**.
2. Escribe su nombre de usuario y su contraseña.
3. Confirma con **Entrar** o con la tecla Enter desde cualquiera de los dos campos.
4. El sistema normaliza el usuario a minúsculas y arma el correo sintético
   `usuario@usuarios.prisma.com`. Ese correo es un detalle interno: **nunca se muestra, nunca
   se pide, nunca se imprime.**
5. El proveedor de autenticación valida la contraseña contra su hash. El código propio nunca
   ve la contraseña.
6. El sistema carga la sesión con `nombre_completo`, cargo y `tipo`, actualiza `ultimo_acceso`
   y escribe el evento `inicio_sesion` en auditoría.
7. La barra superior muestra quién tiene la sesión abierta y el menú se arma según el **tipo**,
   nunca según el cargo.

**Regla de negocio central**

> El usuario que no existe y la contraseña equivocada dan **el mismo mensaje**: «Usuario o
> contraseña incorrectos». Si uno de los dos dijera «ese usuario no existe», cualquiera podría
> averiguar quién trabaja en el taller probando nombres. El usuario desactivado sí recibe un
> mensaje propio, «Este usuario está desactivado. Habla con Gerencia.», porque quien ya trabajó
> aquí no descubre nada nuevo y es lo único que evita que siga intentando creyendo que olvidó
> la clave.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | El usuario no existe | **«Usuario o contraseña incorrectos»** |
| A2 | La contraseña es incorrecta | El **mismo** mensaje de A1 |
| A3 | El usuario está desactivado | **«Este usuario está desactivado. Habla con Gerencia.»**, aunque la contraseña sea correcta |
| A4 | `debe_cambiar_clave` está en verdadero | En lugar del tablero aparece la pantalla de crear contraseña ([CU-32](#cu-32)). No hay forma de saltarla salvo cerrar sesión |
| A5 | El actor cierra la sesión | Se borra la sesión, se escribe `cierre_sesion` en auditoría y se vuelve a la pantalla de acceso |
| A6 | Intentos fallidos repetidos | El proveedor los limita. Cada intento se registra con usuario intentado, fecha, dispositivo e IP; **nunca la contraseña tecleada**, ni completa ni parcial |
| A7 | La persona olvidó su contraseña | No hay recuperación por correo porque no hay correo real: Gerencia la restablece en persona ([CU-31](#cu-31)) |

**Postcondición** — Sesión abierta con nombre, cargo y tipo cargados, `ultimo_acceso`
actualizado y `inicio_sesion` escrito en auditoría.

---

### <a id="cu-29"></a>CU-29 · Crear un usuario

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Dar acceso a una persona nueva sin pedirle un correo electrónico que quizá no tiene |
| **Precondición** | Al menos un cargo activo en el catálogo |

**Flujo principal**

1. Gerencia abre la pantalla de Gestión de usuarios y elige **+ Nuevo usuario**.
2. Escribe el **nombre completo** de la persona.
3. Define el **nombre de usuario**: de 3 a 20 caracteres, minúsculas, números, punto, guion y
   guion bajo. Es `CITEXT`, así que `Maria` y `maria` son la misma persona.
4. Selecciona el **cargo** del catálogo — solo se ofrecen los activos — y el **tipo**:
   Gerencia u Operación.
5. Escribe una **contraseña temporal** de al menos 8 caracteres.
6. Confirma. El sistema crea la identidad con el correo sintético, guarda la ficha con
   `debe_cambiar_clave = TRUE` y escribe `usuario_creado` en auditoría.
7. Gerencia entrega la clave temporal **en persona**. No hay correo por donde mandarla.

**Regla de negocio central**

> **El tipo dice qué puede ver. El cargo dice qué hace.** El tipo es autoridad y es lo que
> evalúa Row Level Security; el cargo es descriptivo y **nunca decide un permiso**. Dos
> personas con el mismo cargo pueden tener tipos distintos.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | El nombre de usuario ya existe | Se rechaza con mensaje claro. No se sugiere una variante automática |
| A2 | El nombre de usuario no cumple el formato | Se rechaza y se muestra la regla completa |
| A3 | La clave temporal tiene menos de 8 caracteres | Se rechaza |
| A4 | El nombre completo está vacío o tiene menos de 3 caracteres | Se rechaza |
| A5 | Quien intenta crear es de tipo Operación | La base de datos rechaza la operación, no solo la pantalla |
| A6 | La persona no está en nómina, por ejemplo un contratista externo | Se crea igual: `usuarios` y `empleados` son tablas distintas con ciclos de vida propios |

**Postcondición** — Usuario activo con clave temporal y cambio de contraseña obligatorio en el
primer ingreso.

---

### <a id="cu-30"></a>CU-30 · Desactivar un usuario

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Quitarle el acceso a alguien sin perder la historia de quién hizo qué |

**Flujo principal**

1. Gerencia localiza a la persona en el listado y elige *Desactivar*.
2. El sistema **exige un motivo escrito**. Sin motivo no continúa.
3. Gerencia escribe el motivo y confirma.
4. El sistema marca `activo` en falso y guarda `desactivado_en`, `desactivado_por` y
   `desactivado_motivo`. **La ficha no se borra.**
5. El siguiente intento de ingreso de esa persona se rechaza ([CU-28](#cu-28), A3).
6. Se escribe `usuario_desactivado` en auditoría.
7. La fila baja al grupo de desactivadas, al final de la misma tabla y detrás del separador
   `Desactivadas · nada se borra, queda el motivo`, con la fecha y la hora a la vista. Sus
   movimientos históricos siguen mostrando su nombre.

**Regla de negocio central ([RN-19](03-requisitos-y-bdd.md#rn-19))**

> Siempre debe quedar **al menos un usuario activo de tipo Gerencia**. El sistema rechaza
> desactivar o degradar al último: sin Gerencia activa nadie podría crear usuarios ni
> restablecer claves, y el negocio quedaría por fuera de su propio sistema. El guardián vive
> en un trigger de la base de datos, no en la pantalla.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | Es el último usuario activo de tipo Gerencia | Se rechaza: «No se puede desactivar ni degradar al último usuario de Gerencia» |
| A2 | Se intenta cambiarle el tipo de Gerencia a Operación siendo el último | Mismo rechazo: degradar equivale a desactivar |
| A3 | El usuario ya está inactivo | Se informa y no se hace nada |
| A4 | La persona está en nómina | El registro de `empleados` no se toca: se quita el acceso, no el vínculo laboral |

**Postcondición** — Usuario sin acceso, marcado inactivo con motivo, íntegro en la base de datos.

---

### <a id="cu-31"></a>CU-31 · Restablecer la contraseña de un usuario

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Devolverle el acceso a quien olvidó su contraseña, sin un correo de recuperación que no existe |
| **Precondición** | Usuario existente |

**Flujo principal**

1. La persona le dice a Gerencia que no puede entrar. Es una conversación, no un formulario: aquí
   no hay «¿olvidaste tu contraseña?» porque no hay a dónde mandarlo ([ADR-009](adr/ADR-009-login-por-usuario.md)).
2. Gerencia la localiza en el listado y elige *Restablecer clave*.
3. El sistema pide una **contraseña temporal** de al menos 8 caracteres, y la muestra en claro **a
   propósito**: Gerencia tiene que poder dictarla.
4. Al confirmar, el sistema cambia la contraseña en el proveedor de identidad, deja
   `debe_cambiar_clave = TRUE` y escribe `clave_restablecida` en auditoría.
5. **Las sesiones que esa persona tuviera abiertas dejan de servir.** Si el restablecimiento fue
   porque alguien no debería seguir entrando, una sesión viva sería el fallo entero.
6. Gerencia le entrega la clave temporal **en persona**, y en el siguiente ingreso el sistema la
   obliga a cambiarla ([RF-79](03-requisitos-y-bdd.md#rf-79), [CU-32](#cu-32)).

**Regla de negocio central**

> **La contraseña anterior no se recupera: se reemplaza.** El sistema guarda su hash y nada más, y
> eso es también lo que hace que restablecer una clave sea **el único cambio que la bitácora no
> puede revertir** ([CU-35](#cu-35)): no se puede devolver lo que nunca se guardó. Para volver atrás se
> restablece otra vez, y eso deja una entrada nueva.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | La clave temporal tiene menos de 8 caracteres | Se rechaza |
| A2 | Quien lo intenta es de tipo Operación | Se rechaza. Cada quien cambia la suya por [CU-32](#cu-32), que es otra cosa |
| A3 | El usuario está desactivado | No se ofrece: una clave nueva no le devolvería el acceso. Lo que corresponde es reactivarlo ([CU-34](#cu-34)) |
| A4 | El proveedor de identidad no responde | No se cambia nada y se dice que no se pudo. Una clave a medias dejaría a la persona sin la vieja y sin la nueva |

**Postcondición** — Usuario con una contraseña temporal conocida por Gerencia, obligado a cambiarla
al entrar, y sin ninguna sesión anterior en pie.

---

### <a id="cu-34"></a>CU-34 · Reactivar un usuario desactivado

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Devolverle el acceso a quien vuelve, sin borrar por qué se le había quitado |
| **Precondición** | Usuario desactivado |

**Flujo principal**

1. Gerencia localiza a la persona en el grupo de desactivadas, al final de la misma tabla, y
   pulsa su estado.
2. El sistema abre el panel de confirmación `¿Reactivar a …?` y muestra **desde cuándo** está
   desactivada y **con qué motivo** se desactivó. Quien decide devolver un acceso tiene que ver
   primero por qué se quitó.
3. El sistema **exige un motivo escrito de la reactivación**. Sin motivo no continúa.
4. Gerencia escribe el motivo y confirma con **Sí, reactivar**.
5. El sistema marca `activo` en verdadero, limpia `desactivado_en`, `desactivado_por` y
   `desactivado_motivo`, y pone **`debe_cambiar_clave` en verdadero**.
6. Se escribe `usuario_reactivado` en auditoría. La entrada aparece en la **Bitácora de cambios**
   como `Reactivado`, con quién, cuándo y el motivo.
7. La fila vuelve al grupo de activas. En el siguiente ingreso, la persona no ve el tablero sino
   la pantalla de crear contraseña ([CU-28](#cu-28), A4): quien vuelve después de meses no debe entrar con
   la clave vieja.

**Regla de negocio central**

> **Limpiar las tres columnas de desactivación no borra la historia.**
> `usuarios.desactivado_en / _por / _motivo` dicen el **estado actual**, no lo que pasó. Lo que
> pasó vive en `auditoria`, y por eso la bitácora sigue mostrando la desactivación con su fecha
> y su motivo aunque la persona ya esté activa otra vez.
>
> **El motivo es obligatorio en los dos sentidos.** Desactivar lo pide y reactivar también.
> Devolver un acceso pesa tanto como quitarlo, y dentro de seis meses la pregunta *"¿por qué
> esta persona volvió a entrar?"* tiene que tener respuesta escrita.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | El motivo está vacío al confirmar | Error visible y no se reactiva |
| A2 | El usuario ya está activo | Se informa y no se hace nada |
| A3 | La persona no recuerda su contraseña anterior | No importa: la reactivación obliga a cambiarla de todos modos |
| A4 | La persona sigue en nómina | El registro de `empleados` no se toca: se devuelve el acceso, no el vínculo laboral |
| A5 | Quien intenta reactivar es de tipo Operación | La base de datos rechaza la operación, no solo la pantalla |

**Postcondición** — Usuario activo con cambio de contraseña obligatorio, las tres columnas de
desactivación limpias y la entrada `Reactivado` escrita en la bitácora. Es la contraparte exacta
de [CU-30](#cu-30), y por eso revertir una desactivación desde la bitácora ([CU-35](#cu-35)) equivale a reactivar.

---

### <a id="cu-35"></a>CU-35 · Revertir un cambio desde la bitácora

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Deshacer un cambio equivocado sobre un usuario o un cargo sin borrar el rastro del error |
| **Precondición** | Una entrada de la bitácora reversible y todavía no revertida |

**Flujo principal**

1. Gerencia abre la **Bitácora de cambios**, dentro de la pantalla de Gestión de usuarios, y
   localiza la entrada.
2. Elige *Revertir*. El sistema abre un panel de confirmación que dice exactamente qué va a
   pasar: «El cargo volverá de Domiciliaria a Empleada de producción».
3. El sistema **exige un motivo escrito**. Sin motivo no continúa.
4. Gerencia escribe el motivo y confirma con **Sí, revertir**.
5. El sistema aplica el valor anterior.
6. Marca la entrada original como **Revertida**, con un enlace a la entrada nueva, y apaga su
   botón de revertir.
7. Agrega una entrada nueva de tipo **Reversión** que dice qué se deshizo y por qué.
8. **La entrada original no se borra ni se modifica.**

**Regla de negocio central**

> **Revertir es escribir un cambio nuevo que deshace el anterior, nunca borrar el registro del
> error.** Es el mismo mecanismo del contra-asiento de [CU-04](#cu-04): el movimiento errado no se edita,
> se reversa, y los dos quedan visibles. Si alguien desactivó a la persona equivocada, la
> bitácora tiene que mostrar las dos cosas: que se desactivó y que se corrigió. Borrar la
> primera entrada convertiría la bitácora en un relato editable, y una bitácora editable no
> sirve para nada.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | La entrada es `Clave restablecida` | No es reversible. El sistema solo guarda el hash, nunca la contraseña anterior: no se puede deshacer lo que no se guardó. Para volver atrás hay que restablecerla otra vez ([CU-31](#cu-31)) |
| A2 | Revertir un `Tipo cambiado` dejaría cero usuarios activos de Gerencia | Se rechaza con aviso claro. Es el guardián de [RN-19](03-requisitos-y-bdd.md#rn-19), que vive en un trigger de la base de datos |
| A3 | Se intenta revertir el `Usuario creado` de quien tiene la sesión abierta | Se rechaza: Gerencia se dejaría a sí misma por fuera del sistema |
| A4 | El usuario afectado ya no existe | Se rechaza. No debería ocurrir, porque nada se borra |
| A5 | La entrada ya está revertida | El botón está apagado; se informa y no se hace nada |
| A6 | El motivo está vacío al confirmar | Error visible y no se revierte |
| A7 | Se revierte una entrada de tipo `Reversión` | Es legal: vuelve a dejar el valor anterior y también queda anotado |
| A8 | Quien intenta revertir es de tipo Operación | La base de datos rechaza la operación, no solo la pantalla |

**Postcondición** — Valor anterior restablecido, entrada original marcada como revertida y
entrada de `Reversión` escrita. La reversión es una **escritura compensatoria**, hermana del
contra-asiento de [CU-04](#cu-04).

**Nota sobre el modelo** — La bitácora no es una tabla nueva: es una vista sobre `auditoria`
—escrita por triggers, [`ADR-005`](adr/ADR-005-auditoria-por-triggers.md)— filtrada por las
tablas `usuarios` y `cargos`. Ninguna de sus filas se edita ni se elimina, que es lo que fija
[`ADR-004`](adr/ADR-004-base-solo-escritura.md).

---

### <a id="cu-36"></a>CU-36 · Previsualizar el sistema como lo ve Operación

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Ver la pantalla que verá la empleada para decidir si tiene sentido |
| **Precondición** | Sesión de tipo Gerencia |

**Flujo principal**

1. Gerencia abre el menú de la sesión y activa el interruptor **Ver como Operación**.
2. La interfaz se pinta como para una sesión de Operación: el menú lateral pierde Inversiones,
   Reportes y Nómina, los costos y márgenes de Productos desaparecen, Nómina queda bloqueada y
   **Gestión de usuarios desaparece del propio menú de la sesión**.
3. Una franja fija arriba del contenido avisa `Estás viendo el sistema como lo ve Operación` y
   ofrece **Volver a mi vista**. No se puede cerrar.
4. Gerencia apaga el interruptor, o pulsa *Volver a mi vista*, y todo vuelve.

**Regla de negocio central**

> **Esto no es una prueba de permisos.** La vista previa sirve para que Gerencia decida si la
> pantalla de la empleada tiene sentido, si le falta algo o si le sobra. **No sirve para
> comprobar que la empleada no puede llegar a los datos ocultos.** Ocultar un menú no es
> seguridad: los permisos los aplica PostgreSQL con Row Level Security
> ([`ADR-006`](adr/ADR-006-rls-por-rol.md)), y la única prueba válida es entrar con una sesión
> real de Operación contra la base de datos, como está en
> [`12-pruebas-y-calidad.md`](12-pruebas-y-calidad.md). Este par de frases va escrito en la
> pantalla mientras la vista previa esté activa, no solo aquí.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | El actor es de tipo Operación | El interruptor no existe. No se atenúa ni se deshabilita: no está |
| A2 | Gerencia cierra la sesión con la vista previa activa | La vista previa se apaga. Nadie hereda el modo de otra sesión |
| A3 | Gerencia quiere volver a Gestión de usuarios sin salir del modo | La entrada no está en el menú mientras la vista previa esté activa. El modo solo cambia lo que el navegador pinta; la sesión real sigue siendo de Gerencia |

**Postcondición** — La interfaz se comporta como para Operación mientras el modo esté activo,
con el aviso siempre visible. El tipo real de la sesión **nunca cambia**: sigue siendo Gerencia
y es lo que evalúa la base de datos.

---

### <a id="cu-37"></a>CU-37 · Descargar lo que muestra una pantalla

| | |
|---|---|
| **Actor** | Gerencia (exclusivo) |
| **Objetivo** | Llevarse a una reunión o a una hoja de cálculo lo que la pantalla ya está mostrando |
| **Precondición** | Pantalla con datos a la vista |
| **Frecuencia** | Ocasional |

**Flujo principal**

1. Gerencia pulsa **Descargar** en el encabezado de la pantalla. Hoy existe en el Inicio ([RF-96](03-requisitos-y-bdd.md#rf-96)).
2. El sistema abre un panel con lo que esa pantalla puede bajar y el formato de cada cosa:
   CSV, PDF o ambos.
3. Gerencia marca qué incluir y confirma.
4. El sistema arma el archivo **con las cifras ya calculadas que se están viendo**, sin volver a
   consultar nada ni recalcular con otro corte.
5. El archivo se baja en el mismo acto y la descarga queda registrada en `exportaciones` con
   `alcance_tipo = 'pantalla'` y sin manifiesto.

**Regla de negocio central**

> **Esto no es un respaldo y no lo reemplaza.** Un respaldo tiene que ser completo y verificable
> —manifiesto, `sha256`, totales de control ([CU-22](#cu-22))—; una descarga de pantalla tiene que ser
> legible, aunque esté incompleta. La regla que las separa es corta: si el archivo puede
> reconstruir el estado del sistema, es respaldo; si solo responde una pregunta del momento, es
> descarga de pantalla. Está desarrollada en
> [`13-respaldo-y-exportacion.md`](13-respaldo-y-exportacion.md), punto 2.1.

**Flujos alternativos**

| # | Situación | Comportamiento |
|---|---|---|
| A1 | Quien intenta descargar es de tipo Operación | No hay botón, y la base de datos rechaza la operación igual: lo que baja el Inicio incluye utilidad, caja y patrimonio |
| A2 | No se marca nada en el panel | No se genera archivo; se pide elegir al menos una cosa |
| A3 | La pantalla está filtrada | Baja lo filtrado, y el archivo dice en su encabezado qué filtro estaba puesto |
| A4 | Se pide con esto restaurar el sistema | No sirve: sin manifiesto no hay nada que verificar. Para eso está [CU-22](#cu-22) |

**Postcondición** — Archivo CSV o PDF en poder de Gerencia, sin manifiesto, y una fila nueva en
`exportaciones` que deja constancia de qué salió del sistema y cuándo.

---

## 3. Trazabilidad

La matriz que conecta cada caso de uso con su requisito, su escenario BDD, su pantalla del
mockup y sus tablas está en [`03-requisitos-y-bdd.md`](03-requisitos-y-bdd.md), sección 5.

[CU-28](#cu-28) a [CU-33](#cu-33) entran en esa matriz con los requisitos **[RF-71](03-requisitos-y-bdd.md#rf-71) a [RF-83](03-requisitos-y-bdd.md#rf-83)**, los escenarios
**[BDD-28-\*](03-requisitos-y-bdd.md#bdd-28-1), [BDD-29-\*](03-requisitos-y-bdd.md#bdd-29-1), [BDD-30-1](03-requisitos-y-bdd.md#bdd-30-1), [BDD-32-1](03-requisitos-y-bdd.md#bdd-32-1) y [BDD-33-1](03-requisitos-y-bdd.md#bdd-33-1)**, las pantallas **0 · Acceso** y
**9 · Gestión de usuarios**, y las tablas `usuarios`, `cargos` y `auditoria`.

[CU-34](#cu-34) a [CU-36](#cu-36) entran con los requisitos **[RF-84](03-requisitos-y-bdd.md#rf-84) a [RF-94](03-requisitos-y-bdd.md#rf-94)**, los escenarios
**[BDD-34-\*](03-requisitos-y-bdd.md#bdd-34-1), [BDD-35-\*](03-requisitos-y-bdd.md#bdd-35-1) y [BDD-36-1](03-requisitos-y-bdd.md#bdd-36-1)**, la pantalla **9 · Gestión de usuarios** y las mismas tres
tablas. Ninguno agrega tablas nuevas: la bitácora es una vista sobre `auditoria`, y la vista
previa de [CU-36](#cu-36) no toca la base de datos.

[CU-37](#cu-37) entra con el requisito **[RF-96](03-requisitos-y-bdd.md#rf-96)**, el escenario **[BDD-13-4](03-requisitos-y-bdd.md#bdd-13-4)**, la pantalla **1 · Dashboard**
y la tabla `exportaciones`. **[RF-96](03-requisitos-y-bdd.md#rf-96) cuelga de [CU-37](#cu-37), no de [CU-22](#cu-22):** el respaldo de [CU-22](#cu-22) lleva
manifiesto y la descarga de pantalla no, así que no pueden ser el mismo caso de uso sin que uno
de los dos quede mal descrito. Tampoco agrega tablas: reutiliza `exportaciones` con
`alcance_tipo = 'pantalla'` ([`13-respaldo-y-exportacion.md`](13-respaldo-y-exportacion.md),
puntos 2.1 y 8).

<!-- generado:referenciado-desde · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
**🔗 Referenciado desde:** [03](03-requisitos-y-bdd.md "03 · Requisitos, reglas de negocio y escenarios BDD") · [04](04-modelo-de-datos.md "04 · Modelo de datos") · [05](05-reglas-financieras.md "05 · Reglas financieras y KPIs") · [07](07-arquitectura.md "07 · Arquitectura técnica") · [08](08-plan-de-desarrollo.md "08 · Plan de desarrollo") · [09](09-plan-de-implantacion.md "09 · Plan de implantación") · [12](12-pruebas-y-calidad.md "12 · Pruebas y calidad") · [13](13-respaldo-y-exportacion.md "13 · Respaldo y exportación") · [15](15-glosario.md "15 · Glosario") · [20](20-contrato-de-api.md "20 · Contrato de la API") · [21](21-trabajo-en-paralelo.md "21 · Trabajo en paralelo por carriles") · [22](22-documentacion.md "22 · Documentación: versiones, estados y referencias") · [Contrato](../contrato/README.md "Contrato de la API · v0.19.0") · [ADR-013](adr/ADR-013-cuatro-ambientes.md "ADR-013 · Cuatro ambientes y promoción de migraciones") · [ADR-022](adr/ADR-022-openapi-generado.md "ADR-022 · OpenAPI generado del código y verificado en integración continua") · [ADR-027](adr/ADR-027-documentacion-versionada.md "ADR-027 · La documentación se versiona, se fecha y se enlaza, y la integración continua lo verifica") · [ADR-033](adr/ADR-033-service-role-solo-en-auth.md "ADR-033 · La clave de servicio entra, pero solo para crear identidades")
<!-- /generado:referenciado-desde -->

---

### 🧭 Navegación

**⬅️ Anterior:** [01 · Visión y alcance](01-vision-y-alcance.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [03 · Requisitos y BDD](03-requisitos-y-bdd.md)
