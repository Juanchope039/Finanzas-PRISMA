# 12 · Pruebas y calidad

---

## 1. Estrategia

Ahora hay **dos bases de código** —`prisma_front` en Flutter y `prisma_api` en Dart— y **cuatro
ambientes** —dev, qa, uat y prod—. La estrategia cambia de forma, no de fondo: la arquitectura
hexagonal sigue permitiendo invertir el esfuerzo donde más importa, **los cálculos de plata y los
permisos**.

```
        ╱╲          Manuales en dispositivo real
       ╱  ╲         10 recorridos · antes de cada entrega
      ╱────╲
     ╱      ╲       Integración de prisma_api contra la base real
    ╱        ╲      Acceso, permisos, transacciones, contrato de errores
   ╱──────────╲
  ╱            ╲    Unidad en Dart · widget en Flutter
 ╱              ╲   Milisegundos, sin red y sin base de datos
╱────────────────╲
```

| Nivel | Dónde vive | Qué prueba | Herramienta | Meta |
|---|---|---|---|---|
| Unitario de dominio | `prisma_api` | Servicios de dominio: fórmulas financieras | `dart test` | **≥ 90% de cobertura** |
| Unitario de presentación | `prisma_front` | Formato de cifras y fechas, estado, validación de formularios | `flutter test` | Cada regla de formulario |
| Widget | `prisma_front` | Que cada pantalla pinte lo que debe y reaccione a lo que recibe | `flutter test` | Las 10 pantallas |
| Integración | `prisma_api` + base | Repositorios, transacciones, políticas RLS, contrato de errores | `dart test` contra la base del ambiente | Casos críticos |
| Manual | Las dos | Recorridos completos en celular real | Lista de verificación | Antes de cada entrega |

**Las pruebas de widget no levantan la API.** Hablan con un cliente HTTP falso. Si para probar una
pantalla hubiera que levantar `prisma_api` y su base, la pantalla quedó pegada al transporte: eso
es un defecto que se corrige, no una condición de la prueba. Lo que sí se prueba de verdad entre
el front y la API es el contrato de versiones, y eso está en la sección 9.

### 1.1 Dónde corre cada nivel

| Ambiente | Qué se ejecuta ahí | Con qué datos |
|---|---|---|
| **dev** | Unidad y widget en cada guardado; integración contra la base de dev | Ficticios, se pueden borrar |
| **qa** | Todo, en cada integración a la rama principal. **Es la que bloquea la promoción** | Ficticios, con semilla reproducible |
| **uat** | P-01 a P-32 —P-32 sin su paso 3, ver 3.1— y los recorridos manuales, antes de la aprobación de Gerencia | Realistas y anonimizados |
| **prod** | Pruebas de humo de solo lectura, después de publicar | Reales |

> **Ninguna prueba automática escribe en prod.** Las de integración siembran filas y las borran;
> en la base del negocio eso no es una prueba, es un daño. Contra prod solo corren lecturas después
> de publicar: que `GET /version` devuelva la versión que se acaba de promover y que el Inicio
> cargue. Nada más.

Que qa sea la que bloquea la promoción es a propósito: es el único ambiente donde la suite completa
corre contra una base con semilla reproducible. En dev los datos cambian a cada rato y una prueba
que falla ahí no siempre significa que el código esté mal.

### 1.2 Cuántas pruebas hay enumeradas

| Grupo | Identificadores | Cuántas |
|---|---|---:|
| Reglas de negocio (§2) | RN-02 a RN-19 | 18 |
| Permisos (§3) | P-01 a P-32 | 32 |
| Invariantes financieros (§4.2) | Las cinco igualdades | 5 |
| Casos límite (§5) | Sin identificador | 10 |
| Recorridos manuales (§6) | M-01 a M-10 | 10 |
| Acceso y administración de usuarios (§7) | A-01 a A-16 | 16 |
| Vista previa de Operación (§7.1) | A-17 a A-19 | 3 |
| Contrato entre las tres partes (§9) | C-01 y C-02 | 2 |
| **Total** | | **96** |

Son **86 automáticas y 10 manuales**. No son todas las que habrá: las unitarias del dominio serán
muchas más y se miden por cobertura, no por lista. Estas 96 están escritas aquí una por una porque
ninguna puede quedar al criterio de quien programe ese día.

---

## 2. Lo que se prueba obligatoriamente

Cada una de estas reglas tiene al menos una prueba automática. **Si una falla, el cambio no
llega a producción.**

| Regla | Prueba |
|---|---|
| RN-02 · Dinero entero | `Dinero.de(1500.5)` lanza error |
| RN-03 · Transferencia neutra | Una transferencia no altera la utilidad |
| RN-04 · Inversión no es gasto | Comprar un activo no reduce la utilidad |
| RN-05 · Anticipo es pasivo | Un anticipo cobrado no aparece en la utilidad |
| RN-06 · Venta al entregar | La venta se causa en la fecha de entrega, completa |
| RN-07 · Retiro no es gasto | Un retiro de distribución no reduce la utilidad |
| RN-08 · Pro-labore es gasto | Definir pro-labore reduce la utilidad |
| RN-09 · Simulador con pro-labore | El simulador parte de la utilidad ajustada |
| RN-10 · Salario es gasto | El salario reduce la utilidad |
| RN-11 · Adelanto una sola vez | Adelanto + liquidación no duplican el gasto |
| RN-12 · Caja libre | Saldo − anticipos − gastos fijos comprometidos |
| RN-13 · No se borra | Anular no elimina la fila |
| RN-14 · Registro tardío | 8 días de diferencia marca el registro |
| RN-15 · Anticipo mínimo | 35% de margen sugiere anticipo del 70% |
| RN-16 · Mes cerrado | Un movimiento con fecha anterior no altera el cierre |
| RN-17 · Sin doble conteo | El margen de contribución del simulador excluye el tiempo |
| RN-18 · Un usuario no se borra | Desactivar no elimina la fila; la ficha conserva su historia |
| RN-19 · Siempre queda una Gerencia | Desactivar al último usuario activo de tipo Gerencia falla |

---

## 3. Pruebas de permisos

Las más importantes desde el punto de vista de confianza. Todas se ejecutan con una **sesión
real de tipo Operación**, no simulada, abierta **a través de `prisma_api`** con usuario y
contraseña. La API propaga esa identidad a la sesión de PostgreSQL, así que quien decide sigue
siendo RLS.

| # | Prueba | Resultado esperado |
|---|---|---|
| P-01 | Leer `aportes_retiros` | Conjunto vacío o error de la base de datos |
| P-02 | Leer `costos_producto` | Rechazado |
| P-03 | Leer `nomina_detalle` de otra persona | Conjunto vacío |
| P-04 | Leer el propio `nomina_detalle` | Permitido |
| P-05 | Anular un movimiento | Rechazado por la base de datos |
| P-06 | Leer `auditoria` | Rechazado |
| P-07 | Insertar en `sobres_config` | Rechazado |
| P-08 | Registrar un movimiento | Permitido |
| P-09 | Registrar un pedido y su anticipo | Permitido |
| P-10 | Leer la ficha de otra persona en `usuarios` | Conjunto vacío |
| P-11 | Leer la propia ficha en `usuarios` | Permitido |
| P-12 | Crear un usuario | Rechazado |
| P-13 | Cambiarse el `tipo` a `gerencia` | Rechazado |
| P-14 | Leer el catálogo `cargos` | Permitido |
| P-15 | Crear o desactivar un cargo | Rechazado |
| P-16 | Leer `clientes` | Permitido: sin cliente no hay pedido |
| P-17 | Crear un cliente | Permitido |
| P-18 | Corregir el teléfono de un cliente | Rechazado |
| P-19 | Anular un cliente | Rechazado |
| P-20 | Leer `activos` | Conjunto vacío |
| P-21 | Leer `prolabore_config` | Conjunto vacío |
| P-22 | Leer `sobres_config` | Conjunto vacío |
| P-23 | Leer `cierres_mensuales` | Conjunto vacío |
| P-24 | Leer la propia ficha en `empleados` | Permitido |
| P-25 | Leer la ficha de otra persona en `empleados` | Conjunto vacío |
| P-26 | Cambiarse el `salario_acordado` en `empleados` | Rechazado |
| P-27 | Leer el `nomina_periodos` del propio desprendible | Permitido |
| P-28 | Leer un `nomina_periodos` sin desprendible propio | Conjunto vacío |
| P-29 | Leer los propios `adelantos` y los de otra persona | Solo los propios; los ajenos, conjunto vacío |
| P-30 | Registrarse un adelanto | Rechazado |
| P-31 | Cargar el desprendible propio completo en una sola consulta | Permitido: llegan las cuatro tablas |
| P-32 | Leer nómina, usuarios y patrimonio **con la guarda de la capa de aplicación desactivada** | El mismo resultado que con la guarda puesta: vacío o 403. Ver 3.1 |

> **Criterio clave:** el rechazo debe venir de PostgreSQL, no de un `if` de Dart ni de una pantalla
> que no dibuja el botón. La prueba se hace llamando a la API con un token real, sin pasar por las
> pantallas. Y quien demuestra que el juez fue la base y no la API es P-32.

Esto vale doble para las pantallas de acceso y de Gestión de usuarios. Que la interfaz esconda
la entrada de Gestión de usuarios no prueba nada: prueba que el menú está escondido. La prueba
válida abre una sesión real de tipo Operación con su usuario y su contraseña, y le pide los datos
a la API, nunca a la pantalla. P-10 a P-15 ejercen las políticas `usuarios_lectura`, `usuarios_insercion`
y `usuarios_actualizacion` sobre `usuarios`, y `cargos_lectura` y `cargos_escritura` sobre
`cargos`. Es exactamente lo que decidió [`ADR-006`](adr/ADR-006-rls-por-rol.md):
**los permisos viven en la base, no en la pantalla.**

**P-16 a P-31 ejercen las ocho tablas sensibles del §7 de
[`04-modelo-de-datos.md`](04-modelo-de-datos.md):** `clientes`, `activos`, `prolabore_config`,
`empleados`, `nomina_periodos`, `adelantos`, `sobres_config` y `cierres_mensuales`. Hay que
leerlas con tres cosas en mente:

- **«Conjunto vacío» y «Rechazado» no son lo mismo, y confundirlos hace pasar una prueba que
  debería fallar.** Leer una tabla que RLS filtra devuelve **cero filas sin error**: la consulta
  es un éxito y el resultado está vacío. Escribir donde la política no deja devuelve un **error**
  de PostgreSQL. Una prueba que solo verifique «no explotó» da verde en P-20 aunque la política
  no exista, porque una tabla sin RLS tampoco explota: devuelve todo. Hay que afirmar sobre el
  **número de filas**, y para eso la base de pruebas debe tener datos sembrados en cada una de
  las ocho tablas. Una tabla vacía da conjunto vacío por razones equivocadas.
- **P-16 a P-19 son las de `clientes` y van en sentidos distintos a propósito.** Operación lee y
  crea —CU-05 dice «cliente existente o nuevo»—, pero no corrige ni anula. Si P-16 o P-17 salen
  rechazadas, el registro de pedidos quedó roto; si P-18 o P-19 salen permitidas, cualquiera
  puede anonimizar a un cliente de paso.
- **P-31 es la prueba de regresión de todo el conjunto.** Carga el desprendible propio como lo
  arma la aplicación —`nomina_detalle` con su `nomina_periodos`, su fila de `empleados` y sus
  `adelantos`, en una sola consulta— y verifica que llegue completo. Es la que atrapa el error
  silencioso de encender RLS en `empleados` con una política demasiado estrecha: `nom_lectura`
  mira `empleados` en una subconsulta, y si esa subconsulta deja de ver la fila propia el
  desprendible **se vacía sin dar ningún error**. P-24 sola no lo detecta: la ficha se lee bien
  y el desprendible igual sale en blanco.

### 3.1 P-32 · La prueba que distingue «protegido» de «parece protegido»

Es la prueba que hay que escribir primero y la única que no puede faltar: es la que verifica
[`ADR-012`](adr/ADR-012-identidad-a-postgres.md) y la que hace exigible el **RNF-22**. Con
`prisma_api` en medio, la base ya no ve a la empleada: ve a la API. Si la API se conectara con la
clave de servicio, RLS dejaría de aplicar,
todas las políticas de [`ADR-006`](adr/ADR-006-rls-por-rol.md) se volverían decorado **y ninguna
prueba existente se pondría roja**: P-01 a P-31 seguirían en verde porque el `if` de Dart las
estaría sosteniendo. Eso es lo que P-32 rompe.

| Paso | Qué se hace |
|---|---|
| 1 | Abrir sesión **a través de la API** como una usuaria de tipo Operación, con su usuario y su contraseña del ambiente de pruebas |
| 2 | Pedir `GET /nomina`, `GET /usuarios` y `GET /patrimonio`. Deben devolver conjunto vacío o 403 |
| 3 | **Desactivar la comprobación de la capa de aplicación** con la bandera de configuración que solo se acepta en dev y en qa, y repetir las tres peticiones |
| 4 | Comparar. El resultado debe ser **exactamente el mismo** |

> **Si al quitar el `if` los datos aparecen, RLS no está actuando y la prueba falla.** Ese es el
> punto entero: sin el paso 3 no se prueba la base, se prueba el `if`. Y un `if` lo borra
> cualquiera en una limpieza de código un martes por la tarde.

Lo que P-32 atrapa, y que ninguna otra prueba ve:

| Fallo real | ¿Lo atrapa P-32? |
|---|---|
| La API se conecta con la clave `service_role` en el camino de una petición de usuaria | **Sí.** Con esa clave RLS no aplica y los datos aparecen |
| El rol de base de datos de la API tiene `BYPASSRLS` | **Sí.** Mismo síntoma |
| El rol de la API es dueño de las tablas y falta `FORCE ROW LEVEL SECURITY` | **Sí.** El dueño se salta RLS por defecto |
| La API olvida propagar los claims a la sesión de PostgreSQL | No hace falta: sin identidad no se lee nada y P-04, P-11 y P-24 ya fallan por venir vacías |

Esa última fila es lo que hace que el conjunto funcione. P-32 vigila el lado permisivo —que la API
no sea más poderosa de la cuenta— y las pruebas de «Permitido» vigilan el restrictivo —que la
identidad sí esté llegando—. Ninguna de las dos sirve sola.

**Dónde corre.** Completa, en dev y en qa. En uat se ejecutan solo los pasos 1 y 2: la bandera no
existe allá, y un ambiente donde se puede apagar la guarda de la aplicación no sirve para aprobar
nada. En prod no corre.

---

## 4. Juego de datos de prueba oficial

El ejemplo de septiembre de [`05-reglas-financieras.md`](05-reglas-financieras.md) §12 es el
juego de datos autoritativo. Se convierte en una prueba ejecutable.

### 4.1 Valores esperados

| Concepto | Valor esperado |
|---|---:|
| Ingresos causados | $7.850.000 |
| Costo directo | $3.612.000 |
| Margen bruto | $4.238.000 |
| Margen bruto % | 54,0% |
| Gastos operativos (incluye pro-labore) | $2.980.000 |
| **Utilidad causada** | **$1.258.000** |
| Margen neto % | 16,0% |
| Saldo inicial | $3.900.000 |
| **Flujo de caja del mes** | **−$1.255.000** |
| Saldo final | $2.645.000 |
| Anticipos por devengar | $2.100.000 |
| **Caja libre** | **$545.000** |
| Punto de equilibrio | $4.769.231 |
| Horas pagadas | 160 |
| Horas facturadas | 104 |
| Tiempo ocioso | 56 h · $526.400 |

### 4.2 Invariantes que deben cumplirse siempre

```
Saldo final = Saldo inicial + Flujo de caja del mes
Caja libre  = Saldo total − Anticipos por devengar − Gastos fijos comprometidos
Σ Asignado a los 4 sobres = Entradas de caja del mes
Σ Diferencias de los 4 sobres = Flujo de caja del mes
Utilidad causada = Margen bruto − Gastos operativos
```

Estas cinco igualdades se prueban como **invariantes**: se generan cientos de escenarios
aleatorios y se verifica que se cumplan en todos. Si alguna falla con algún conjunto de datos,
hay un error en las fórmulas.

### 4.3 Datos del simulador

| Concepto | Valor esperado |
|---|---:|
| Utilidad promedio de 6 meses | $1.180.000 |
| Reserva del 20% | $236.000 |
| Presupuesto para personal | $944.000 |
| Veredicto con salario de $1.500.000 | No viable, faltan $556.000 |
| Camisetas adicionales necesarias | 38 |
| Mugs adicionales necesarios | 49 |

---

## 5. Casos límite que deben probarse

| Caso | Comportamiento esperado |
|---|---|
| Mes sin movimientos | Cifras en cero, sin errores |
| Pedido entregado el mismo día del anticipo | Venta causada y anticipo liberado en la misma fecha |
| Anticipo del 100% | Todo el valor como pasivo hasta entregar |
| Pedido cancelado tras el anticipo | Anticipo convertido en ingreso o devolución, con motivo |
| Movimiento el 31 de diciembre a las 23:59 | Se contabiliza en diciembre, no en enero |
| Dos adelantos en el mismo mes | Ambos descontados una sola vez cada uno |
| Retiro mayor que la caja libre | Advertencia y confirmación explícita |
| Producto con margen negativo | Se muestra en rojo, no se oculta |
| Costo de producto cambiado a mitad de mes | Los pedidos anteriores conservan el costo vigente entonces |
| Importación con 0 filas válidas | Mensaje claro, nada se carga |

---

## 6. Recorridos manuales

Antes de cada entrega, en **celular real**, no en el simulador del navegador.

| # | Recorrido | Criterio |
|---|---|---|
| M-01 | Registrar un gasto con foto | Menos de 30 segundos |
| M-02 | Registrar un pedido y cobrar el anticipo | El anticipo no aparece como ingreso |
| M-03 | Entregar el pedido y cobrar el saldo | La venta se causa completa |
| M-04 | Consultar el dashboard | Las tres cifras se entienden sin explicación |
| M-05 | Anular un movimiento | Exige motivo, el original permanece |
| M-06 | Generar una cotización | El PDF se abre y se puede compartir |
| M-07 | Ejecutar el simulador | El veredicto es claro y accionable |
| M-08 | Entrar con una usuaria de tipo Operación | No se ve nada restringido |
| M-09 | Registrar sin conexión | Se encola y sincroniza con la fecha correcta |
| M-10 | Instalar la aplicación en el celular | Se abre desde el escritorio del teléfono |

---

## 7. Pruebas de acceso y administración de usuarios

Cubren CU-28 a CU-35. Se ejecutan contra la base de datos, igual que las de la sección 3: lo
que importa no es qué muestra la pantalla, sino qué deja hacer el sistema.

| # | Prueba | Resultado esperado |
|---|---|---|
| A-01 | Ingreso correcto de una usuaria de Gerencia | Sesión abierta; se cargan nombre completo, cargo y tipo; queda `inicio_sesion` en la auditoría |
| A-02 | Ingreso correcto de una usuaria de Operación | Sesión abierta con tipo Operación; las pantallas de Gerencia no aparecen en el nav **ni responden si se piden directo** |
| A-03 | Contraseña incorrecta | «Usuario o contraseña incorrectos»; queda `inicio_sesion_fallido` en la auditoría **sin la contraseña tecleada** |
| A-04 | Usuario que no existe | El mismo mensaje de A-03, palabra por palabra. Si el mensaje difiere, revela qué usuarios existen |
| A-05 | Usuario desactivado con la contraseña correcta | No entra. «Este usuario está desactivado. Habla con Gerencia.» |
| A-06 | Primer ingreso con `debe_cambiar_clave = TRUE` | No llega al tablero: pantalla de cambio obligatorio. Al guardar, `debe_cambiar_clave` queda en falso |
| A-07 | Crear un usuario con un nombre de usuario ya existente | Rechazado por el `UNIQUE` de `usuarios.usuario`, no solo por el aviso de la pantalla. `Marcela` y `marcela` son el mismo usuario |
| A-08 | Desactivar al último usuario activo de tipo Gerencia | Rechazado por el trigger `tg_proteger_ultima_gerencia`: «No se puede desactivar ni degradar al último usuario de Gerencia» |
| A-09 | Desactivar un cargo que tiene personas activas asignadas | Rechazado con aviso claro; el cargo sigue activo y nadie se queda sin cargo |
| A-10 | Desactivar un usuario dejando el motivo vacío | Rechazado por el `CHECK desactivacion_con_motivo`: el usuario sigue activo. Sin motivo no se desactiva, y el rechazo viene de la base, no solo del aviso de la pantalla |
| A-11 | Desactivar un usuario con motivo escrito | `activo` en falso y `desactivado_en`, `desactivado_por` y `desactivado_motivo` escritos. La fila de la tabla queda atenuada y muestra **la fecha y la hora** de la desactivación con `fmtFechaHora`: `14 sep 2026, 3:42 p. m.` |
| A-12 | Reactivar un usuario dejando el motivo vacío | Rechazado. Reactivar exige motivo igual que desactivar: devolverle el acceso a alguien también es un cambio que hay que justificar |
| A-13 | Reactivar un usuario con motivo escrito | `activo` en verdadero, las tres columnas de desactivación limpias y `debe_cambiar_clave` en verdadero. En el siguiente ingreso el sistema **obliga** a cambiar la clave antes de llegar al tablero |
| A-14 | Cualquier cambio sobre `usuarios` o `cargos` | Queda una entrada en `auditoria` con quién lo hizo, cuándo, sobre quién y por qué. La bitácora de la pantalla es una vista sobre esas filas, no una tabla aparte |
| A-15 | Revertir un cambio desde la bitácora | Quedan **dos** entradas: la original marcada como `Revertida` y la `Reversión` que la deshace, enlazadas entre sí. La original conserva su texto: nunca se borra ni se edita. Se verifica contando las filas de `auditoria` antes y después |
| A-16 | Revertir un `Tipo cambiado` que dejaría cero usuarios activos de tipo Gerencia | Rechazado con aviso claro. Ni el usuario ni la bitácora cambian; el trigger `tg_proteger_ultima_gerencia` es el último filtro |

> **A-04 es la prueba que más se olvida.** Un mensaje distinto para «usuario no existe» convierte
> la pantalla de acceso en una lista de quién trabaja aquí. Se compara el texto exacto, no que
> «salga un error».

### 7.1 La vista previa de Operación

CU-36 es la excepción de esta sección: se prueba **en la pantalla**, porque lo único que hace es
cambiar lo que el navegador pinta. Estas tres pruebas verifican que pinte lo correcto y que
Gerencia pueda salir; ninguna verifica un permiso.

| # | Prueba | Resultado esperado |
|---|---|---|
| A-17 | Activar «Ver como Operación» desde una sesión de Gerencia | El menú lateral pierde Inversiones, Reportes y Nómina; los costos y márgenes de Productos no se pintan; **Gestión de usuarios desaparece del menú de la sesión**, porque también es exclusiva de Gerencia |
| A-18 | El interruptor con la vista previa ya activa | **Sigue visible en el menú de la sesión.** Depende de `sesion.tipo`, no de `rol`: si dependiera de `rol` se ocultaría a sí mismo y Gerencia quedaría atrapada sin forma de volver |
| A-19 | La franja de advertencia con la vista previa activa | Fija arriba del contenido, no se puede cerrar, dice `Estás viendo el sistema como lo ve Operación` y su botón `Volver a mi vista` devuelve todo con un clic |

> **La vista previa NO sustituye la prueba de permisos, y confundirla con una es el error grave
> de esta función.** Ninguna de las pruebas A-17 a A-19 demuestra que una persona de Operación no
> pueda llegar a los datos ocultos: solo demuestran que la pantalla no los dibuja. Eso lo prueban
> P-01 a P-32 de la sección 3, con una **sesión real de tipo Operación llamando a la API**, y muy
> especialmente P-32. Es exactamente lo que decidió [`ADR-006`](adr/ADR-006-rls-por-rol.md): **ocultar un
> menú no es seguridad.** Una pantalla revisada con la vista previa sigue teniendo sus permisos
> sin probar mientras no se ejecuten esas pruebas.

---

## 8. Calidad del código

| Control | Herramienta | Cuándo |
|---|---|---|
| Tipado estricto | `dart analyze` con `strict-casts` y `strict-raw-types` | Cada compilación |
| Regla de frontera de arquitectura | Lint de importaciones: `domain/` no importa `infrastructure/` ni `interface/` | Cada compilación |
| Formato consistente | `dart format` | Al guardar |
| Cobertura del dominio | `dart test --coverage` | Cada cambio |
| Sin `dynamic` en el dominio | `dart analyze` con `avoid_dynamic_calls` | Cada compilación |

Los cinco controles corren en **las dos bases de código**, con el mismo `analysis_options.yaml`
de partida; `prisma_front` le suma encima las reglas propias de Flutter. Un solo lenguaje en todo
el proyecto sirve para poco si cada mitad se revisa con otra vara.

**Regla de oro del proyecto:** si un cálculo financiero no tiene prueba, no está terminado.

---

## 9. Pruebas del contrato entre las tres partes

Validar la misma regla tres veces —en la base, en `prisma_api` y en el formulario— solo es
sostenible si algo vigila que las tres versiones no se separen con el tiempo. Y versionar el front
y la API por separado solo es sostenible si algo detecta cuándo dejaron de entenderse. Estas dos
pruebas son ese vigilante.

| # | Prueba | Resultado esperado |
|---|---|---|
| C-01 | Recorrer `pg_constraint` y cruzar cada restricción nombrada con la tabla de traducción de `prisma_api` | Todas tienen entrada. Si falta una, la prueba falla y dice cuál |
| C-02 | Arrancar el front declarando una MAJOR de API distinta a la que responde `GET /version` | El front se planta en la primera pantalla y no deja seguir |

### 9.1 C-01 · Ninguna restricción sin mensaje

La base no sabe hablar: rechaza con `23514 check_violation` sobre `movimientos_valor_positivo`, y
eso no se le muestra a la dueña del taller. La API traduce **nombre de restricción → código HTTP +
mensaje en español + campo del formulario**. C-01 recorre `pg_constraint` del ambiente y comprueba
que cada restricción nombrada tenga su entrada en esa tabla. Es la prueba que sostiene
[`ADR-015`](adr/ADR-015-validacion-tres-capas.md) y la que verifica el **RNF-25**.

Tres detalles deciden si la prueba sirve de algo:

- **Lee la base, no una lista escrita a mano.** Una lista se actualiza cuando alguien se acuerda;
  `pg_constraint` es lo que la base tiene hoy, le guste a quien le guste.
- **Falla nombrando la restricción huérfana.** «Faltan traducciones» no sirve: la prueba tiene que
  decir cuál, o el arreglo se vuelve una búsqueda a ciegas.
- **También falla al revés.** Una entrada en la tabla de traducción que ya no corresponde a ninguna
  restricción es un mensaje muerto, y peor: esconde que la regla desapareció de la base.

En ejecución, la contraparte es la regla de `prisma_api`: un error de la base que no esté en la
tabla se devuelve como 500 y se registra como defecto. C-01 existe para que eso nunca ocurra
por primera vez en prod.

### 9.2 C-02 · Un front viejo se planta, no se arrastra

El front y la API se versionan por separado ([`ADR-014`](adr/ADR-014-semver.md)), así que puede
haber un navegador con la aplicación de hace tres semanas pidiéndole cosas a una API que ya cambió
el contrato. Es **BDD-101-1** convertido en prueba automática, y cubre los tres casos:

| Caso | Qué debe pasar |
|---|---|
| El front pide una MAJOR **menor** que la de la API | Pantalla `Esta versión de la aplicación ya no sirve con el servidor. Actualiza.` y ninguna pantalla más |
| El front pide una MAJOR **mayor** que la de la API | Lo mismo. Un front adelantado contra un servidor viejo se rompe igual |
| Las dos MAJOR coinciden | Entra normal. Sin esta tercera no se sabe si la prueba está fallando por la razón correcta |

> **Fallar ruidoso al arrancar es mejor que fallar en la pantalla 7 con un campo nulo.** Un front
> que sigue andando contra una API incompatible no da un error: da cifras raras. Y una cifra rara
> en un sistema de plata se cree, se anota y se usa para decidir.

---

### 🧭 Navegación

**⬅️ Anterior:** [11 · Riesgos y protección de datos](11-riesgos-y-proteccion-de-datos.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [13 · Respaldo y exportación](13-respaldo-y-exportacion.md)
