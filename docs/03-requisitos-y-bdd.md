# 03 · Requisitos, reglas de negocio y escenarios BDD

---

## 1. Requisitos funcionales

Prioridad **MoSCoW**: `M` imprescindible · `S` importante · `C` deseable.

### 1.1 Acceso y seguridad

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-01 | Permitir iniciar sesión con nombre de usuario y contraseña | M | CU-28 |
| RF-02 | Soportar dos tipos de usuario: Gerencia y Operación | M | CU-28 |
| RF-03 | Aplicar los permisos en la base de datos, no solo en la interfaz | M | — |
| RF-04 | Cerrar la sesión tras 30 días de inactividad | S | — |
| RF-05 | Registrar cada inicio de sesión con fecha, dispositivo e IP | S | CU-23 |
| RF-71 | Autenticar contra un nombre de usuario único, sin exigir correo electrónico | M | CU-28 |
| RF-72 | Validar el usuario: 3 a 20 caracteres, minúsculas, números, punto, guion y guion bajo | M | CU-29 |
| RF-73 | Exigir el nombre completo de cada persona con acceso | M | CU-29 |
| RF-74 | Asignar a cada usuario un **cargo** tomado del catálogo configurable | M | CU-29 · CU-33 |
| RF-75 | Asignar a cada usuario un **tipo**: Gerencia u Operación | M | CU-29 |
| RF-76 | Permitir a Gerencia crear y editar usuarios desde el sistema | M | CU-29 |
| RF-77 | Desactivar usuarios con motivo escrito en lugar de borrarlos | M | CU-30 |
| RF-78 | Permitir a Gerencia restablecer la contraseña de un usuario con una clave temporal | M | CU-31 |
| RF-79 | Obligar el cambio de contraseña en el primer ingreso y tras un restablecimiento | M | CU-31 · CU-32 |
| RF-80 | Permitir a cualquier usuario cambiar su propia contraseña | M | CU-32 |
| RF-81 | Administrar el catálogo de cargos: crear, renombrar, reordenar y desactivar | M | CU-33 |
| RF-82 | Impedir desactivar o degradar al último usuario activo de tipo Gerencia | M | CU-30 |
| RF-83 | Mostrar en todo momento quién tiene la sesión abierta: nombre, cargo y tipo | M | CU-28 |
| RF-84 | Mostrar activos y desactivados en una sola tabla, con el estado visible en cada fila | M | CU-30 · CU-34 |
| RF-85 | Cambiar el estado de un usuario desde la propia tabla, con confirmación explícita | M | CU-30 · CU-34 |
| RF-86 | Exigir motivo escrito tanto para desactivar como para reactivar | M | CU-30 · CU-34 |
| RF-87 | Mostrar la fecha y la hora de la desactivación en la tabla | M | CU-30 |
| RF-88 | Registrar en la bitácora todo cambio sobre usuarios y cargos, con quién, cuándo y por qué | M | CU-35 |
| RF-89 | Permitir revertir un cambio registrado, escribiendo una entrada nueva sin borrar la original | M | CU-35 |
| RF-90 | Obligar el cambio de contraseña cuando un usuario se reactiva | S | CU-34 |
| RF-91 | Rechazar toda reversión que dejaría el sistema sin un usuario activo de Gerencia | M | CU-35 |
| RF-92 | Permitir a Gerencia previsualizar la interfaz tal como la ve Operación | S | CU-36 |
| RF-93 | Señalar de forma permanente y visible que la vista previa está activa, con salida a un clic | M | CU-36 |
| RF-94 | Dejar constancia de que la vista previa no sustituye la prueba de permisos con sesión real | M | CU-36 |

> **La numeración salta de RF-05 a RF-71 a propósito.** Los identificadores son etiquetas
> estables, no un orden de lectura: RF-14 tiene que seguir siendo RF-14 en todos los
> documentos y en las pruebas. Los requisitos de acceso nuevos tomaron los números libres al
> final de la serie y se leen aquí, que es el tema al que pertenecen.

**El tipo dice qué puede ver. El cargo dice qué hace.** El tipo es autoridad y es lo que
evalúa Row Level Security; el cargo es descriptivo y nunca decide un permiso.

### 1.2 Cuentas y movimientos

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-06 | Crear cuentas de dinero: efectivo, Nequi, Daviplata, bancos | M | — |
| RF-07 | Mostrar el saldo de cada cuenta y el consolidado | M | CU-13 |
| RF-08 | Registrar ingresos con valor, categoría, cuenta y fecha del movimiento | M | CU-01 |
| RF-09 | Registrar gastos con los mismos campos y adjunto opcional | M | CU-02 |
| RF-10 | Almacenar **dos fechas**: la del movimiento y la de digitación | M | CU-01 |
| RF-11 | Permitir transferencias entre cuentas sin afectar la utilidad | M | — |
| RF-12 | Adjuntar fotos o PDF a cualquier movimiento | M | CU-02 |
| RF-13 | Marcar como *registro tardío* los movimientos digitados 7+ días después | S | CU-01 |
| RF-14 | Permitir anular un movimiento **solo con motivo escrito** | M | CU-03 |
| RF-15 | Permitir corregir por contra-asiento sin modificar el original | M | CU-04 |
| RF-16 | Rechazar fechas de movimiento futuras | S | CU-01 |
| RF-17 | Permitir categorías jerárquicas de ingreso y gasto | S | — |
| RF-97 | Precisa **RF-06**: las cuentas de dinero se crean desde Movimientos y solo con tipo Gerencia | M | — |

> **RF-97 no repite a RF-06: lo precisa.** RF-06 dice qué capacidad existe —crear cuentas de
> dinero—; RF-97 dice dónde se ejerce y quién puede. Se leen en dos renglones porque los
> identificadores son etiquetas estables: RF-06 encabeza el rango `RF-06 … RF-17` de la matriz
> de trazabilidad (§5), y fundirlos o renumerarlos rompería esa cadena.

### 1.3 Clientes, pedidos y facturas

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-18 | Registrar clientes con nombre, contacto y notas | M | CU-05 |
| RF-19 | Registrar pedidos con líneas de producto, cantidades y precios | M | CU-05 |
| RF-20 | Listar pedidos **ordenados por fecha** con filtros por estado y cliente | M | CU-08 |
| RF-21 | Registrar el anticipo **como pasivo**, nunca como ingreso | M | CU-06 |
| RF-22 | Causar la venta completa en el momento de la entrega | M | CU-07 |
| RF-23 | Calcular y mostrar el saldo pendiente de cada pedido | M | CU-07 |
| RF-24 | Resaltar pedidos con anticipo cobrado y sin entregar hace 15+ días | S | CU-08 |
| RF-25 | Soportar entregas parciales | C | CU-07 |
| RF-26 | Permitir cancelar un pedido indicando el destino del anticipo | S | CU-07 |
| RF-27 | Adjuntar el PDF o la foto de la factura al pedido | M | CU-05 |

### 1.4 Productos, servicios y costeo

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-28 | Mantener un catálogo de productos y servicios | M | CU-09 |
| RF-29 | Registrar el costo unitario: insumo + consumibles + tiempo | M | CU-09 |
| RF-30 | Calcular margen porcentual y margen en pesos por unidad | M | CU-09 |
| RF-31 | Calcular el **margen por hora de trabajo** de cada producto | M | CU-09 |
| RF-32 | Costear servicios de bordado por tiempo de máquina | M | CU-10 |
| RF-33 | Sugerir precio de venta a partir de un margen objetivo | S | CU-09 |
| RF-34 | Ocultar costos y márgenes al rol Operación | M | CU-09 |
| RF-35 | Conservar el historial de cambios de costo y precio | S | CU-09 |

### 1.5 Cotizaciones y remisiones

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-36 | Generar cotizaciones en PDF con el logo del negocio | M | CU-11 |
| RF-37 | Generar remisiones de entrega en PDF | S | CU-11 |
| RF-38 | Calcular el **anticipo mínimo** que cubre el costo directo | M | CU-12 |
| RF-39 | Advertir cuando el anticipo configurado no cubre el costo directo | M | CU-12 |
| RF-40 | Convertir una cotización aceptada en pedido sin volver a digitar | S | CU-05 |

### 1.6 Finanzas, inversiones y patrimonio

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-41 | Calcular la **utilidad causada** del mes y del año | M | CU-13 |
| RF-42 | Calcular el **movimiento de caja** del mes | M | CU-13 |
| RF-43 | Calcular la **caja libre** descontando anticipos y gastos comprometidos | M | CU-13 |
| RF-44 | Mostrar el promedio de ganancias mensual y anual | M | CU-14 |
| RF-45 | Registrar inversiones en activos sin afectar la utilidad | M | CU-15 |
| RF-46 | Registrar aportes de capital | M | CU-15 |
| RF-47 | Registrar retiros separados en **pro-labore** y **distribución** | M | CU-16 · CU-25 |
| RF-48 | Calcular el patrimonio: aportes − retiros + utilidades acumuladas | M | CU-16 |
| RF-49 | Alertar cuando los retiros de 12 meses superan las utilidades | S | CU-24 |
| RF-50 | Permitir configurar los porcentajes de los 4 sobres | M | CU-17 |
| RF-51 | Conservar el historial de cambios de los porcentajes | S | CU-17 |
| RF-52 | Calcular el punto de equilibrio mensual | S | CU-13 |
| RF-53 | Generar el cierre mensual con snapshot inmutable | S | CU-13 |
| RF-95 | El Inicio no permite crear, editar ni anular ningún dato: solo consulta | M | CU-13 |

### 1.7 Personal y nómina

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-54 | Registrar empleadas con salario acordado y fecha de ingreso | M | CU-19 |
| RF-55 | Liquidar la nómina mensual: días, horas extra, descuentos | M | CU-19 |
| RF-56 | Descontar los adelantos en la liquidación, una sola vez | M | CU-26 |
| RF-57 | Generar el desprendible de pago en PDF | M | CU-19 |
| RF-58 | Registrar adelantos como cuenta por cobrar, no como gasto | M | CU-26 |
| RF-59 | Simular la capacidad de pago con pro-labore descontado | M | CU-18 |
| RF-60 | Traducir el costo de la empleada a unidades de producto por vender | M | CU-18 |
| RF-61 | Declarar **no viable** la contratación cuando el presupuesto no alcanza | M | CU-18 |
| RF-62 | Comparar horas pagadas contra horas facturadas | S | CU-27 |
| RF-63 | Limitar al rol Operación a ver únicamente su propio desprendible | M | CU-20 |

### 1.8 Administración del sistema

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-64 | Importar movimientos históricos desde CSV con mapeo de columnas | M | CU-21 |
| RF-65 | Reportar los errores de importación fila por fila | M | CU-21 |
| RF-66 | Exportar la base completa o de un mes, con descarga manual | S | CU-22 |
| RF-67 | Mostrar la bitácora de auditoría filtrable | M | CU-23 |
| RF-68 | Ofrecer un modo *ver anulados* exclusivo de Gerencia | S | CU-03 |
| RF-69 | Ser instalable como aplicación en el celular | S | — |
| RF-70 | Encolar registros hechos sin conexión y sincronizarlos al reconectar | C | CU-01 |
| RF-96 | Permitir descargar en CSV o PDF la información que muestra el Inicio | S | CU-37 |
| RF-98 | Mostrar la versión de la aplicación y el ambiente en el **pie de la barra lateral, abajo a la izquierda**, de forma permanente y visible | M | — |
| RF-99 | Señalar de forma inequívoca, con una franja fija, que el ambiente no es producción | M | — |
| RF-100 | Ofrecer un panel «Acerca de» con las versiones del front, la API y el esquema, el ambiente, la fecha de compilación y la referencia del commit | M | — |
| RF-101 | Comprobar al arrancar que la MAJOR de la API es compatible y detener el ingreso con un mensaje claro si no lo es | M | — |

> **Estos cuatro requisitos no cuelgan de ningún caso de uso, y así debe ser.** No describen una
> tarea del taller: describen lo que la aplicación tiene que decir de sí misma. Sirven para dos
> cosas concretas: que nadie registre la venta del día en QA creyendo que es el sistema real, y
> que un reporte de fallo empiece sabiendo qué versión estaba corriendo contra qué servidor.
> Se verifican en `BDD-98-*`, `BDD-100-1` y `BDD-101-1`.

### 1.9 Contrato con la API

| ID | Requisito | Prio | CU |
|---|---|:---:|---|
| RF-102 | Entregar, junto a cada formulario, el descriptor de sus campos —tipo, obligatoriedad, límites, teclado y mensajes— para que el front lo pinte sin contener reglas | M | — |
| RF-103 | Devolver la navegación que la sesión puede ver, para que el front no decida qué ocultar | M | — |

> **Estos dos requisitos existen para que «el front no decide» no cueste un viaje por datos
> móviles en cada error.** Las reglas viajan como datos, no como código: el front sabe que hay
> una regla llamada `minimo` con su mensaje, pero no sabe por qué. La API la vuelve a comprobar
> cuando llega la petición, siempre. Y devolver el menú **no reemplaza a RLS**: que la API no
> mande una opción es comodidad; que la base no devuelva la fila es seguridad.

---

## 2. Requisitos no funcionales

| ID | Categoría | Requisito | Cómo se verifica |
|---|---|---|---|
| RNF-01 | Rendimiento | La pantalla inicial carga en menos de 2 s con 4G | Medición en dispositivo real |
| RNF-02 | Usabilidad | Registrar un movimiento toma menos de 30 segundos | Cronómetro con usuario real |
| RNF-03 | Usabilidad | Toda función principal se alcanza en 3 toques o menos | Recorrido del mapa de navegación |
| RNF-04 | Compatibilidad | Funciona en Chrome y Safari móvil, Chrome y Edge de escritorio | Pruebas manuales por navegador |
| RNF-05 | Accesibilidad | Contraste mínimo AA y objetivos táctiles de 44×44 px | Auditoría de accesibilidad |
| RNF-06 | Integridad | Ningún registro puede eliminarse físicamente | `DELETE` revocado en PostgreSQL |
| RNF-07 | Integridad | Toda cifra monetaria se almacena como entero de pesos | Revisión del esquema |
| RNF-08 | Integridad | Todas las fechas se manejan en America/Bogota | Pruebas de cambio de día |
| RNF-09 | Seguridad | Los permisos se aplican con Row Level Security | Pruebas con sesión de rol Operación |
| RNF-10 | Seguridad | Todo el tráfico por HTTPS | Configuración del despliegue |
| RNF-11 | Seguridad | Las contraseñas nunca se almacenan en el sistema propio | Delegado al proveedor de autenticación |
| RNF-12 | Trazabilidad | Toda escritura genera auditoría por trigger | Pruebas de inserción directa |
| RNF-13 | Disponibilidad | Respaldo diario automático del proveedor | Panel del proveedor |
| RNF-14 | Costo | Costo mensual de operación al mínimo sostenible: dev y qa en plan gratuito; prod y uat en el plan pago más barato que cumpla RNF-20 | Revisión de la factura de cada ambiente en cada cierre de mes |
| RNF-15 | Mantenibilidad | El dominio no depende de la interfaz ni de la base de datos | Revisión de importaciones |
| RNF-16 | Mantenibilidad | Cobertura de pruebas del dominio ≥ 90% | Reporte de `JaCoCo` en la API y de `flutter test --coverage` en el front |
| RNF-17 | Localización | Interfaz en español, formato de moneda colombiano | Revisión visual |
| RNF-18 | Seguridad | Las contraseñas nunca se almacenan ni se registran en texto plano, ni siquiera en la bitácora de intentos fallidos | Revisión de la tabla `auditoria` y de los registros del proveedor |
| RNF-19 | Usabilidad | El ingreso se completa en menos de 10 segundos con una sola mano en un celular | Prueba cronometrada con una usuaria real |
| RNF-20 | Disponibilidad | La base de datos está siempre en línea: ningún ambiente de negocio se pausa por inactividad | Consulta contra prod y uat tras una semana sin uso; responde sin necesidad de reactivar el proyecto |
| RNF-21 | Seguridad | Todo acceso a datos pasa por la API; el front no se conecta a la base ni a Auth | Revisión de dependencias y de importaciones del front: no existe cliente de Supabase |
| RNF-22 | Seguridad | Los permisos los sigue aplicando PostgreSQL con Row Level Security aunque haya una API en medio | Prueba de integración con sesión real de Operación y la comprobación de la capa de aplicación desactivada |
| RNF-23 | Mantenibilidad | Cada proyecto —front, API y esquema— se versiona por separado con SemVer | Revisión del `pubspec.yaml` del front, del archivo de construcción de la API y de la tabla `schema_version` en cada publicación |
| RNF-24 | Seguridad | Ningún secreto vive en el repositorio | Escaneo de secretos en cada integración; la configuración entra por variables de entorno y `--dart-define` |
| RNF-25 | Mantenibilidad | Toda restricción de la base tiene nombre explícito y mensaje traducido al español | Prueba que recorre `pg_constraint` y exige entrada en la tabla de traducción de la API |
| RNF-26 | Mantenibilidad | Toda respuesta de la API, con éxito o con error, usa el sobre `{status, mensaje, data}` con un código de cinco dígitos | Prueba de contrato que recorre todos los endpoints y rechaza cualquier respuesta con otra forma |
| RNF-27 | Integridad | Toda petición que escribe es idempotente mediante una clave de idempotencia obligatoria | Prueba que envía la misma petición dos veces y exige un solo efecto |
| RNF-28 | Mantenibilidad | El front no contiene ninguna regla de negocio, permiso ni catálogo de mensajes | Búsqueda automática de umbrales, porcentajes y textos de error de negocio en el código del front; la integración falla si aparece alguno |
| RNF-29 | Seguridad | Cada petición va firmada con nonce y marca de tiempo, contra repetición y manipulación | Prueba que reenvía una petición capturada y exige rechazo |
| RNF-30 | Mantenibilidad | La API publica su OpenAPI generado del código; la integración continua falla si el documento versionado está desactualizado | Paso de integración que regenera el documento y compara contra el del repositorio |
| RNF-31 | Integridad | Ninguna información aceptada se pierde ante un fallo de red, de proceso o de dispositivo | Pruebas de corte: red caída a mitad de envío, proceso terminado y aplicación cerrada, con la cola local intacta al volver |

> **RNF-14 decía «$0» y se cambió a propósito. Cambiarlo en silencio habría sido peor que no
> cambiarlo.** Dos cosas volvieron imposible el costo cero. La primera es RNF-20: «siempre en
> línea» significa que prod y uat no pueden quedarse en el plan gratuito, porque ese plan pausa
> el proyecto tras una semana de inactividad, y un taller que factura los lunes encontraría el
> sistema dormido. La segunda es que la API va en Java: alojar una JVM cuesta más y arranca más
> lento que un binario, y son cuatro ambientes. Así que el requisito ahora pide lo que sí se
> puede cumplir: dev y qa siguen en el plan gratuito, porque ahí una pausa no le molesta a nadie;
> prod y uat pagan lo mínimo. Con esto RNF-14 y RNF-20 dejan de contradecirse.

---

## 3. Reglas de negocio

Las reglas que el código debe cumplir sin excepción. Cada una tiene prueba automática.

| ID | Regla | Detalle en |
|---|---|---|
| RN-01 | Todo registro almacena fecha del movimiento y fecha de digitación; los reportes usan la primera | 05 §4 |
| RN-02 | El dinero se almacena y opera como entero de pesos colombianos | 04 §3 |
| RN-03 | Una transferencia entre cuentas no genera ingreso ni gasto | 05 §2 |
| RN-04 | Una inversión en un activo no reduce la utilidad; cambia caja por activo | 05 §6 |
| RN-05 | Un anticipo es un pasivo hasta la entrega; no es ingreso | 05 §3 |
| RN-06 | La venta se causa en la fecha de entrega, por el valor total del pedido | 05 §3 |
| RN-07 | El retiro de utilidades no reduce la utilidad del período | 05 §6 |
| RN-08 | El pro-labore sí reduce la utilidad: es gasto de personal | 05 §6 |
| RN-09 | El simulador de capacidad de pago usa la utilidad con pro-labore descontado | 06 §3 |
| RN-10 | El salario de la empleada es gasto y reduce la utilidad | 06 §2 |
| RN-11 | Un adelanto es cuenta por cobrar; el gasto se reconoce en la liquidación | 06 §5 |
| RN-12 | Caja libre = saldo total − anticipos por devengar − gastos fijos comprometidos | 05 §3 |
| RN-13 | Ningún registro se elimina; solo se anula con motivo, autor, fecha y dispositivo | 04 §5 |
| RN-14 | Un movimiento digitado 7+ días después de ocurrido se marca como registro tardío | 05 §4 |
| RN-15 | El anticipo mínimo de un pedido es la proporción de su costo directo | 05 §5 |
| RN-16 | Los meses cerrados no cambian retroactivamente | 05 §8 |
| RN-17 | El costeo define precios; la nómina define el resultado del mes. No se suman | 05 §7 |
| RN-18 | Un usuario nunca se elimina: se desactiva con motivo y conserva toda su historia | 04 §5 |
| RN-19 | Siempre debe existir al menos un usuario activo de tipo Gerencia | 04 §7 |

---

## 4. Escenarios BDD

Formato Gherkin tabulado. Cada escenario se convierte en una prueba automática.

### 4.1 Registro y fechas

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-01-1 | Doble fecha | Un gasto ocurrido el sábado | Lo registro el lunes | Se guarda fecha de movimiento sábado y digitación lunes; el reporte lo cuenta el sábado |
| BDD-01-2 | Registro tardío | Un movimiento con 9 días de diferencia | Lo guardo | Queda marcado como registro tardío |
| BDD-01-3 | Fecha futura | Un movimiento con fecha de mañana | Intento guardarlo | Se rechaza con mensaje claro |
| BDD-01-4 | Valor inválido | Un movimiento de $0 | Intento guardarlo | Se rechaza |
| BDD-11-1 | Transferencia neutra | $200.000 de Nequi a efectivo | Consulto la utilidad del mes | La utilidad no cambia; los saldos de ambas cuentas sí |

### 4.2 Anulación y trazabilidad

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-03-1 | Motivo obligatorio | Un movimiento activo de $50.000 | Intento anularlo sin motivo | Se rechaza y se pide el motivo |
| BDD-03-2 | Anular no borra | Un movimiento anulado | Consulto la auditoría | El registro original sigue con sus datos intactos |
| BDD-03-3 | Anulado no suma | Un movimiento anulado de $50.000 | Consulto la utilidad del mes | El monto no está incluido |
| BDD-03-4 | Operación no anula | Sesión con rol Operación | Intento anular un movimiento | La base de datos rechaza la operación, no solo la pantalla |
| BDD-04-1 | Contra-asiento | Un movimiento de un mes cerrado | Lo corrijo | Se crea un movimiento nuevo que lo reversa; el original no cambia |
| BDD-23-1 | Auditoría completa | Cualquier cambio en un registro | Consulto la bitácora | Veo usuario, rol, fecha, dispositivo, IP, datos antes y después |

### 4.3 Pedidos y anticipos

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-06-1 | Anticipo no es ingreso | Anticipo de $1.500.000 cobrado, sin entregar | Consulto la utilidad del mes | La utilidad no lo incluye; aparece como anticipo por devengar |
| BDD-06-2 | Anticipo sube la caja | Anticipo de $1.500.000 a Nequi | Consulto el saldo de Nequi | El saldo subió $1.500.000 |
| BDD-07-1 | La venta se causa al entregar | Anticipo cobrado en marzo | Entrego el pedido en abril | La venta completa se causa en abril y el pasivo se libera |
| BDD-07-2 | Entrega sin cobrar el saldo | Pedido entregado con saldo pendiente | Consulto el mes | La venta se causa completa y queda cuenta por cobrar |
| BDD-08-1 | Pedido estancado | Anticipo cobrado hace 18 días sin entregar | Consulto el listado de pedidos | El pedido aparece resaltado como pendiente crítico |
| BDD-12-1 | Anticipo insuficiente | Pedido con 35% de margen | Cotizo con anticipo del 50% | Se advierte que no cubre el costo directo y se sugiere 70% |
| BDD-12-2 | Anticipo suficiente | Pedido con 70% de margen | Cotizo con anticipo del 50% | No hay advertencia |

### 4.4 Las tres cifras

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-13-1 | Caja libre descuenta anticipos | $4.000.000 en cuentas y $1.500.000 en anticipos sin entregar | Consulto el dashboard | La caja libre resta los anticipos y los gastos fijos comprometidos |
| BDD-13-2 | Las tres cifras conviven | Un mes con pedidos entregados y pendientes | Consulto el dashboard | Veo utilidad causada, caja y caja libre, las tres explicadas |
| BDD-13-3 | Caja libre negativa | Anticipos superiores al saldo disponible | Consulto el dashboard | Se muestra alerta roja aunque el mes sea rentable |
| BDD-13-4 | El Inicio no escribe | Sesión de Gerencia, el tipo con más permisos | Recorro el Inicio entero | No hay ningún botón ni formulario que cree, edite o anule datos: solo cifras, alertas, listados, enlaces de navegación y la descarga de lo que la pantalla ya muestra |
| BDD-14-1 | Promedio de ganancias | 8 meses cerrados | Consulto el reporte anual | Veo el promedio mensual y la proyección anual |

### 4.5 Inversiones, retiros y patrimonio

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-15-1 | Inversión no es gasto | Compra de una prensa por $2.500.000 | Consulto la utilidad del mes | La utilidad no baja; la caja sí; el activo aparece en el patrimonio |
| BDD-16-1 | Retiro no es gasto | Ventas $8.000.000, gastos $5.000.000, retiro $2.000.000 | Consulto la utilidad del mes | La utilidad es $3.000.000, no $1.000.000; caja y patrimonio bajan $2.000.000 |
| BDD-16-2 | Retiro con caja libre insuficiente | Caja libre de $200.000 | Intento retirar $500.000 | Se advierte que se usaría plata de anticipos y se exige confirmación |
| BDD-24-1 | Alerta de descapitalización | Retiros de $20.000.000 y utilidades de $18.000.000 en 12 meses | Consulto el dashboard | Se alerta que se retira más de lo que el negocio genera |
| BDD-25-1 | Pro-labore separado | Retiro de $2.000.000 con pro-labore de $1.500.000 | Consulto la utilidad del mes | $1.500.000 como gasto de personal y $500.000 como distribución |
| BDD-25-2 | Pro-labore baja la utilidad | Utilidad de $3.000.000 sin pro-labore | Defino pro-labore de $1.500.000 | La utilidad pasa a $1.500.000 |

### 4.6 Personal y nómina

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-19-1 | El salario sí es gasto | Ventas $8.000.000, otros gastos $5.000.000, salario $1.300.000 | Consulto la utilidad | La utilidad es $1.700.000: el salario sí la reduce |
| BDD-26-1 | Adelanto no es gasto | Adelanto de $300.000 a la empleada | Consulto la utilidad del mes | La utilidad no baja; aparece como cuenta por cobrar |
| BDD-26-2 | Adelanto se descuenta una vez | Adelanto de $300.000 registrado | Liquido la nómina | El neto descuenta $300.000 y el gasto no se duplica |
| BDD-18-1 | El simulador usa la utilidad real | Utilidad $3.000.000 sin pro-labore y $1.500.000 con pro-labore | Ejecuto el simulador | El cálculo parte de $1.500.000 |
| BDD-18-2 | Simulador bloqueado sin pro-labore | No hay pro-labore definido | Abro el simulador | Se bloquea y se pide definirlo primero |
| BDD-18-3 | No viable | Presupuesto disponible de $400.000 | Ejecuto el simulador | Se declara no viable y se muestran alternativas |
| BDD-18-4 | Ventas necesarias en unidades | Costo de la empleada de $1.800.000 | Ejecuto el simulador | Se indica cuántos mugs o camisetas adicionales hay que vender |
| BDD-27-1 | Tiempo ocioso visible | 160 horas pagadas y 104 cargadas a pedidos | Consulto productividad | Se muestran 56 horas no facturadas y su costo |

### 4.7 Permisos por rol

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-02-1 | Operación no ve utilidad | Sesión con rol Operación | Consulto el dashboard | No aparece la utilidad ni la caja libre |
| BDD-02-2 | Operación no ve márgenes | Sesión con rol Operación | Abro el catálogo de productos | Veo precios pero no costos ni márgenes |
| BDD-02-3 | Simulador restringido | Sesión con rol Operación | Intento abrir el simulador por acceso directo | La base de datos rechaza la consulta |
| BDD-02-4 | Desprendible propio | Sesión con rol Operación | Consulto nómina | Veo únicamente mi propio desprendible |
| BDD-02-5 | Exportación restringida | Sesión con rol Operación | Intento exportar la base | Se rechaza en la base de datos |
| BDD-02-6 | La base manda aunque haya una API en medio | Sesión real de Operación contra la API, con la comprobación de permisos de la capa de aplicación desactivada a propósito | Pido `GET /nomina`, `GET /usuarios` y `GET /patrimonio` | Las tres responden vacío o 403 porque lo decidió Row Level Security, no un `if` de la API; si al quitar la comprobación aparecen datos, la prueba falla |

### 4.8 Importación

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-21-1 | Mapeo de columnas | Un CSV con columnas en otro orden | Lo importo | Puedo mapear cada columna antes de confirmar |
| BDD-21-2 | Errores por fila | Un CSV con 3 filas inválidas de 200 | Lo importo | Se cargan 197 y se reportan las 3 con el motivo |
| BDD-21-3 | Importación duplicada | El mismo archivo importado dos veces | Lo importo de nuevo | Se detectan duplicados y se pide confirmación |

### 4.9 Acceso, usuarios y cargos

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-28-1 | Ingreso correcto de una usuaria de Operación | La usuaria `marcela`, activa y de tipo Operación | Entro con mi usuario y mi contraseña | La sesión abre y veo mi nombre completo, mi cargo y mi tipo |
| BDD-28-2 | Contraseña incorrecta: mensaje genérico que no revela si el usuario existe | Un usuario que sí existe | Entro con la contraseña equivocada | Se muestra «Usuario o contraseña incorrectos», el mismo mensaje que si el usuario no existiera |
| BDD-28-3 | Usuario desactivado: no puede entrar aunque la contraseña sea correcta | La usuaria `lorena`, desactivada con motivo | Entro con su contraseña correcta | Se rechaza con «Este usuario está desactivado. Habla con Gerencia.» |
| BDD-29-1 | Gerencia crea una usuaria con cargo Domiciliaria y tipo Operación | Sesión de Gerencia y el cargo Domiciliaria activo en el catálogo | Creo la usuaria con una clave temporal | Queda activa, con cambio de clave obligatorio y con los permisos de Operación |
| BDD-29-2 | Nombre de usuario repetido: el sistema lo rechaza | El usuario `marcela` ya existe | Intento crear otro usuario `Marcela` | Se rechaza: el nombre de usuario no distingue mayúsculas y ya está tomado |
| BDD-30-1 | No se puede desactivar al último usuario de Gerencia | Un solo usuario activo de tipo Gerencia | Intento desactivarlo o pasarlo a Operación | La base de datos rechaza la operación, no solo la pantalla |
| BDD-32-1 | Primer ingreso: el sistema obliga a cambiar la clave temporal | La usuaria `camila` con cambio de clave pendiente | Entro con la clave temporal | En lugar del tablero aparece «Crea tu contraseña» y no hay forma de saltarla |
| BDD-33-1 | Un cargo desactivado deja de ofrecerse pero los usuarios que lo tenían lo conservan | El cargo Aprendiz SENA desactivado con motivo | Creo un usuario nuevo | El cargo ya no aparece en la lista; quienes lo tenían lo conservan en su ficha |
| BDD-34-1 | Reactivar a una usuaria desactivada | La usuaria `lorena`, desactivada desde el 30 de junio de 2026 con su motivo | La reactivo escribiendo el motivo de la reactivación | Queda activa, con cambio de clave obligatorio, y las columnas de desactivación quedan limpias |
| BDD-34-2 | Reactivar sin motivo: se rechaza | La usuaria `lorena`, desactivada | Confirmo la reactivación con el motivo vacío | Se rechaza con un error visible y la usuaria sigue desactivada |

### 4.10 Bitácora, reversión y vista previa

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-35-1 | Revertir un cambio de cargo | Una entrada `Cargo cambiado` de Empleada de producción a Domiciliaria | La revierto con motivo escrito | El cargo vuelve a Empleada de producción y el cambio queda anotado con su autor y su motivo |
| BDD-35-2 | Reversión que dejaría el sistema sin Gerencia | Una entrada `Tipo cambiado` de Operación a Gerencia sobre el único usuario activo de Gerencia | Intento revertirla | Se rechaza con aviso claro; el tipo no cambia y no se escribe ninguna entrada nueva |
| BDD-35-3 | Revertir no borra: quedan las dos entradas | Una entrada `Desactivado` sobre `lorena` | La revierto con motivo | La bitácora queda con **dos** entradas: la original intacta y marcada como `Revertida`, y una nueva de tipo `Reversión` que dice qué se deshizo y por qué |
| BDD-36-1 | Vista previa de Operación | Sesión de Gerencia con la vista previa activa | Recorro el menú y el tablero | Desaparecen Inversiones, Reportes, Nómina y Gestión de usuarios, y una franja fija avisa que la vista previa está activa, ofrece salir con un clic y advierte que no reemplaza la prueba con una sesión real |

### 4.11 Versión, ambiente y compatibilidad

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-98-1 | La insignia de versión y ambiente se ve | Una sesión abierta en el ambiente de QA | Miro el pie de la barra lateral, abajo a la izquierda | Veo `v0.4.2 · QA` en color de advertencia, y arriba sigue la franja fija que dice «Ambiente de QA · los datos no son reales» |
| BDD-98-2 | En producción no hay franja ni rótulo | Una sesión abierta en producción | Miro el pie de la barra lateral | Veo solo la versión, en color neutro, y no hay ninguna franja de ambiente: si no dice nada, es el de verdad |
| BDD-100-1 | «Acerca de» responde la primera pregunta de todo reporte de fallo | Una sesión abierta en QA | Abro «Acerca de» desde el menú de la sesión | Veo la versión del front, la de la API, la del esquema, el ambiente, la fecha de compilación y la referencia del commit |
| BDD-101-1 | El front rechaza una API con MAJOR incompatible | Un front compilado contra la MAJOR 1 de la API y un servidor que responde `2.0.0` en `GET /version` | Abro la aplicación | La sesión no abre: aparece «Esta versión de la aplicación ya no sirve con el servidor. Actualiza.» y no hay forma de seguir |

> **El número del medio de `BDD-98-*`, `BDD-100-1` y `BDD-101-1` es el del requisito, no el de un
> caso de uso.** Es la única excepción del documento y no admite ambigüedad: los casos de uso
> llegan a CU-37, así que ningún identificador puede chocar. Se hace así porque estos escenarios
> verifican requisitos que a propósito no cuelgan de ningún caso de uso (ver §1.8).

### 4.12 Idempotencia, canal firmado y mensajes dictados por la API

| ID | Escenario | Dado | Cuando | Entonces |
|---|---|---|---|---|
| BDD-RNF-27-1 | Reintentar no duplica el movimiento | Un gasto de $80.000 enviado con la clave de idempotencia `a3f1…` y ya guardado, cuya confirmación nunca llegó al celular | El front reenvía la misma petición con la misma clave | La API devuelve la respuesta guardada sin volver a ejecutar nada; queda **un solo** gasto de $80.000 y la cuenta se movió una sola vez |
| BDD-RNF-29-1 | Petición reenviada: se rechaza por nonce repetido | Una petición legítima capturada con su firma, su marca de tiempo y su nonce | Alguien la reenvía tal cual dentro de la ventana de cinco minutos | Se rechaza con `40103` y no se ejecuta nada; el intento queda en la bitácora |
| BDD-RNF-28-1 | El mensaje lo dicta la API, no el front | Un gasto con valor $0, y un front cuyo código no contiene ningún texto de error de negocio | Intento guardarlo | La pantalla muestra «El gasto tiene que ser mayor que cero.», que llegó dentro de `data.errores`; buscar ese texto en el código del front no lo encuentra |

> **Estos tres identificadores llevan `RNF` en el medio, y es a propósito.** Verifican requisitos
> no funcionales, no casos de uso. Sin el prefijo, `BDD-27-1` ya existe —el de tiempo ocioso de
> CU-27— y `BDD-28-1` también. La excepción de `BDD-98-*` funciona porque los casos de uso llegan
> a CU-37 y esos números están libres; con RNF-26 a RNF-31 no lo estarían.

---

## 5. Matriz de trazabilidad

Cada requisito debe conectar con un caso de uso, un escenario, una pantalla y una tabla.
Sin huérfanos en ninguna dirección.

| Requisito | Caso de uso | Escenarios BDD | Pantalla del mockup | Tablas principales |
|---|---|---|---|---|
| RF-01 … RF-05 | CU-28 | BDD-02-* | Todas (sesión) | `usuarios`, `auditoria` |
| RF-06 … RF-17 | CU-01 · CU-02 · CU-03 · CU-04 | BDD-01-*, BDD-03-*, BDD-04-1, BDD-11-1 | 3 · Movimientos | `movimientos`, `cuentas`, `categorias`, `adjuntos` |
| RF-18 … RF-27 | CU-05 · CU-06 · CU-07 · CU-08 | BDD-06-*, BDD-07-*, BDD-08-1 | 2 · Pedidos | `pedidos`, `pedido_lineas`, `clientes`, `anticipos` |
| RF-28 … RF-35 | CU-09 · CU-10 | BDD-02-2 | 4 · Productos | `productos`, `costos_producto` |
| RF-36 … RF-40 | CU-11 · CU-12 | BDD-12-* | 8 · Cotizador | `cotizaciones`, `cotizacion_lineas` |
| RF-41 … RF-53 | CU-13 · CU-14 · CU-15 · CU-16 · CU-17 · CU-24 · CU-25 | BDD-13-*, BDD-15-1, BDD-16-*, BDD-24-1, BDD-25-* | 1 · Dashboard · 5 · Inversiones · 6 · Reportes | `movimientos`, `activos`, `aportes_retiros`, `sobres`, `cierres_mensuales` |
| RF-54 … RF-63 | CU-18 · CU-19 · CU-20 · CU-26 · CU-27 | BDD-18-*, BDD-19-1, BDD-26-*, BDD-27-1 | 7 · Nómina | `empleados`, `nomina_periodos`, `nomina_detalle`, `adelantos` |
| RF-64 … RF-70 | CU-21 · CU-22 · CU-23 | BDD-21-*, BDD-23-1, BDD-02-5 | Configuración | `importaciones`, `exportaciones`, `auditoria` |
| RF-71 … RF-83 | CU-28 · CU-29 · CU-30 · CU-31 · CU-32 · CU-33 | BDD-28-*, BDD-29-*, BDD-30-1, BDD-32-1, BDD-33-1 | 0 · Acceso · 9 · Gestión de usuarios | `usuarios`, `cargos`, `auditoria` |
| RF-84 … RF-94 | CU-30 · CU-34 · CU-35 · CU-36 | BDD-34-*, BDD-35-*, BDD-36-1 | 9 · Gestión de usuarios | `usuarios`, `cargos`, `auditoria` |
| RF-95 … RF-97 | CU-13 · CU-37 | BDD-13-4 | 1 · Dashboard · 3 · Movimientos | `cuentas`, `movimientos`, `exportaciones` |
| RF-98 … RF-101 | — | BDD-98-*, BDD-100-1, BDD-101-1 | Todas (pie de la barra lateral y franja) · «Acerca de» | `schema_version` |
| RF-102 · RF-103 | — | BDD-RNF-28-1 | Todas (formularios y navegación) | — · los dicta la API |
| RNF-26 … RNF-31 | — | BDD-RNF-27-1, BDD-RNF-28-1, BDD-RNF-29-1 | Todas (sobre de respuesta y cola local) | `peticiones_idempotentes` |

> **La última fila es de requisitos no funcionales, y es la única.** Se incluye porque los tres
> escenarios de §4.12 no cuelgan de ningún RF y quedarían huérfanos en la matriz, que es justo lo
> que esta sección promete que no pasa.

**Cobertura:** 103 requisitos funcionales · 31 no funcionales · 19 reglas de negocio ·
37 casos de uso · 67 escenarios BDD · 10 pantallas.

---

### 🧭 Navegación

**⬅️ Anterior:** [02 · Casos de uso](02-casos-de-uso.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [04 · Modelo de datos](04-modelo-de-datos.md)
