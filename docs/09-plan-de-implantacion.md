# 09 · Plan de implantación

Cómo se pasa de tener el software construido a que el negocio realmente lo use.

> **La mayoría de estos proyectos no fracasan por el código. Fracasan porque el registro diario
> no se convierte en hábito.** Este documento existe para evitar eso.

---

## 1. Checklist de aprobación del mockup

**Nada se programa hasta que esto esté firmado.** Corregir una pantalla en el mockup cuesta
minutos; corregirla después de construida cuesta días.

Abrir [`../mockup/prisma-mockup.html`](../mockup/prisma-mockup.html) y revisar pantalla por
pantalla:

| # | Pantalla | Qué verificar | ✓ |
|---|---|---|:---:|
| 0 | Acceso | ¿Entrar con usuario y contraseña es simple? ¿El mensaje de error se entiende? | ⬜ |
| 1 | Dashboard | ¿Las tres cifras se entienden sin explicación? ¿Las alertas son claras? | ⬜ |
| 2 | Pedidos | ¿El orden por fecha y los estados reflejan cómo trabajas? | ⬜ |
| 3 | Movimientos | ¿El registro rápido tiene todos los campos que necesitas y ninguno de más? | ⬜ |
| 4 | Productos | ¿Están todos tus productos? ¿Falta alguna categoría de bordado? | ⬜ |
| 5 | Inversiones y retiros | ¿La división pro-labore / distribución es clara? | ⬜ |
| 6 | Reportes | ¿Responden lo que necesitas saber cada mes? | ⬜ |
| 7 | Nómina | ¿El simulador te daría confianza para decidir? | ⬜ |
| 8 | Cotizador | ¿La cotización se ve presentable para enviar por WhatsApp? | ⬜ |
| 9 | Gestión de usuarios | ¿Están todas las personas del equipo? ¿Los cargos son los del taller? | ⬜ |
| — | Tipos de usuario | Entrar con un usuario de Operación: ¿es correcto lo que se oculta? | ⬜ |
| — | Celular | Abrirlo en el celular: ¿se ve bien y se puede usar con una mano? | ⬜ |

**Firma de aprobación:** ______________________  **Fecha:** ____________

---

## 2. Fase previa opcional: formalización

El negocio aún no está formalizado. **Esto no bloquea el software** —PRISMA funciona igual—
pero sí bloquea la contratación formal de una empleada.

| Paso | Qué implica | Cuándo |
|---|---|---|
| 1 | Inscripción en el RUT ante la DIAN | Antes de contratar |
| 2 | Registro mercantil en la Cámara de Comercio de Cali | Antes de contratar |
| 3 | Cuenta bancaria a nombre del negocio | Cuanto antes: facilita separar la plata |
| 4 | Decidir figura jurídica con un contador | Antes de contratar |

> **Recomendación independiente del software:** abrir la cuenta bancaria separada es lo más
> valioso que se puede hacer antes del go-live, porque hace física la separación que PRISMA hace
> contable. Cuesta poco y ordena mucho.

El paso 4 tiene consecuencias económicas importantes sobre el costo de una empleada, pero ese
análisis está fuera del alcance de esta versión y queda en
[`14-roadmap-e-ideas.md`](14-roadmap-e-ideas.md).

---

## 3. Migración de datos históricos

Hay dos fuentes: **Excel/Sheets** y **cuaderno físico con fotos**.

### 3.1 Qué se migra y qué no

| Dato | ¿Se migra? | Por qué |
|---|:---:|---|
| Saldos actuales de cada cuenta | ✅ Obligatorio | Sin esto nada cuadra |
| Activos del negocio (equipos) | ✅ Obligatorio | Base del patrimonio |
| Aportes de capital históricos | ✅ Obligatorio | Base del patrimonio |
| Pedidos con anticipo cobrado y sin entregar | ✅ Obligatorio | Son pasivos vivos |
| Cuentas por cobrar vivas | ✅ Obligatorio | Plata que se espera |
| Movimientos de los últimos 6 meses | ✅ Muy recomendado | El simulador los necesita |
| Movimientos de más de 6 meses | ⚠️ Opcional | Solo si están en Excel y son confiables |
| Clientes | ✅ Recomendado | Ahorra digitación futura |
| Costos de productos | ✅ Obligatorio | Sin esto no hay márgenes |

> **Los 6 meses de historia no son opcionales si se quiere usar el simulador de capacidad de
> pago.** Sin ellos, la respuesta a "¿puedo contratar?" se basa en muy pocos datos y no es
> confiable.

### 3.2 Cómo se migra

**Del Excel — importación asistida (CU-21)**

| Paso | Acción | Responsable |
|---|---|---|
| 1 | Exportar cada hoja a CSV | Gerencia |
| 2 | Cargar el archivo y mapear las columnas | Gerencia + apoyo técnico |
| 3 | Revisar la vista previa de las primeras 20 filas | Gerencia |
| 4 | Confirmar la importación | Gerencia |
| 5 | Revisar el reporte de errores por fila | Gerencia + apoyo técnico |
| 6 | Corregir y reimportar solo las filas fallidas | Gerencia |

**Del cuaderno — jornada de digitación asistida**

Una sesión de trabajo de medio día, acompañada:

| Bloque | Duración | Contenido |
|---|---|---|
| 1 | 30 min | Saldos iniciales de todas las cuentas y activos del negocio |
| 2 | 60 min | Pedidos abiertos: los que tienen anticipo cobrado y no se han entregado |
| 3 | 90 min | Movimientos de los últimos 3 meses del cuaderno |
| 4 | 45 min | Costeo de los productos, uno por uno |
| 5 | 30 min | Verificación: ¿el saldo que calcula el sistema coincide con el real? |

**La verificación del bloque 5 es el momento de la verdad.** Si el saldo calculado no coincide
con el dinero que realmente hay, falta información. Se ajusta con un movimiento de
*"ajuste de saldo inicial"* documentado, no forzando números.

### 3.3 Regla de corte

Se define una **fecha de corte**, idealmente el primer día de un mes:

- Todo lo anterior entra como saldos iniciales y datos históricos.
- Todo lo posterior se registra únicamente en PRISMA.
- **El Excel y el cuaderno se archivan, no se siguen usando en paralelo.**

> Usar los dos sistemas al mismo tiempo es la forma más segura de terminar sin usar ninguno.

### 3.4 Alistamiento de usuarios

Va numerado de último pero **se hace de primero**: la migración necesita una sesión abierta, y
cada dato que entra queda firmado con el usuario que lo registró. Si se migra sin usuarios, la
auditoría arranca en blanco y no hay forma de reconstruirla después.

| Paso | Acción | Responsable |
|---|---|---|
| 1 | Crear el usuario de Gerencia. Es el primer usuario del sistema y el único que no se crea desde la pantalla de Gestión de usuarios, porque todavía no hay sesión | Apoyo técnico |
| 2 | Entrar con ese usuario y cambiar la clave temporal | Gerencia |
| 3 | Revisar el catálogo de cargos: quitar los que no aplican y agregar los que falten | Gerencia |
| 4 | Crear un usuario por cada persona del equipo con su nombre completo, su cargo y su tipo | Gerencia |
| 5 | Verificar que cada persona puede entrar con su propio usuario | Gerencia |

**El tipo dice qué puede ver. El cargo dice qué hace.** Solo Gerencia lleva tipo `gerencia`;
todo el resto del equipo va como `operacion`, sin importar el cargo que tenga.

---

## 4. Capacitación

Tres sesiones cortas, separadas en el tiempo. Nadie aprende un sistema completo de una sentada.

### Sesión 1 · El día a día (90 min) — antes del go-live

| Tema | Qué se practica |
|---|---|
| Entrar con el propio usuario | La clave temporal se entrega **en persona**, en el taller, una por una |
| Cambiar la clave en el primer ingreso | El sistema obliga; cada quien escoge la suya y nadie más la ve |
| Registrar un ingreso y un gasto | Con el celular, con recibos reales |
| Adjuntar la foto del recibo | Cinco veces, hasta que sea automático |
| Registrar un pedido con su anticipo | Un pedido real del día |
| Marcar un pedido como entregado | Un pedido real |
| Anular un movimiento mal registrado | Con motivo escrito |

**Se termina con un ejercicio cronometrado:** registrar tres movimientos en menos de 90
segundos en total.

> **La contraseña no se comparte ni se presta.** Si dos personas entran con el mismo usuario, la
> auditoría deja de servir: el sistema va a decir quién hizo cada cosa y ese dato va a ser falso.
> Quien necesita entrar, necesita su propio usuario. Se pide a Gerencia y se crea en un minuto.

### Sesión 2 · Entender los números (60 min) — semana 2

| Tema | Qué se explica |
|---|---|
| Las tres cifras | Por qué utilidad, caja y caja libre no coinciden |
| El anticipo como deuda | Con un pedido real de la propia base de datos |
| Por qué el retiro no es gasto | Con los números del propio mes |
| El pro-labore | Definirlo juntos: *"¿cuánto le pagaría a alguien que haga lo que yo hago?"* |
| Las alertas | Qué significa cada una y qué hacer con ella |

### Sesión 3 · Decidir con datos (60 min) — mes 2

| Tema | Qué se explica |
|---|---|
| Margen por hora | Qué producto conviene priorizar cuando hay más pedidos que tiempo |
| Validador de anticipo | Por qué a veces hay que pedir más del 50% |
| Punto de equilibrio | Cuántos pedidos al mes se necesitan para no perder |
| El simulador | Cómo leerlo y por qué el pro-labore es obligatorio |
| Cierre mensual | Cómo cerrar un mes y por qué no cambia después |

### Material de apoyo

- Guía rápida de una página, impresa y pegada en el taller.
- Video de 3 minutos: cómo registrar un movimiento con el celular.
- Documento [`15-glosario.md`](15-glosario.md) para consultar términos.

---

## 5. Go-live

### 5.1 Antes (día −1)

| # | Verificación | ✓ |
|---|---|:---:|
| 1 | Saldos del sistema coinciden con el dinero real en cada cuenta | ⬜ |
| 2 | Todos los productos tienen costo unitario definido | ⬜ |
| 3 | El pro-labore está definido | ⬜ |
| 4 | Los porcentajes de los 4 sobres están configurados | ⬜ |
| 5 | Los pedidos abiertos con anticipo están registrados | ⬜ |
| 6 | La aplicación está instalada en el celular | ⬜ |
| 7 | Se hizo una exportación de respaldo inicial | ⬜ |
| 8 | La sesión de tipo Operación se probó y oculta lo que debe ocultar | ⬜ |
| 9 | La confirmación de correo está **desactivada** en el proveedor de autenticación | ⬜ |
| 10 | Existe al menos un usuario de Gerencia activo y con la clave temporal ya cambiada | ⬜ |
| 11 | Cada persona del equipo entró al menos una vez con su propio usuario | ⬜ |

### 5.2 El día del go-live

- Se registra todo el día **solo en PRISMA**.
- Al cerrar, se compara el efectivo en caja con el saldo del sistema.
- Si no coincide, se identifica qué faltó registrar. No se ajusta a ciegas.

### 5.3 Primera semana

| Día | Acompañamiento |
|---|---|
| 1 | Revisión al final del día, en persona o por llamada |
| 2 y 3 | Revisión al final del día, por mensaje |
| 4 y 5 | Revisión solo si hay dudas |
| 7 | Primera revisión semanal completa |

---

## 6. Soporte de 90 días

| Período | Qué incluye | Frecuencia |
|---|---|---|
| Días 1–7 | Acompañamiento diario, corrección inmediata de errores | Diaria |
| Días 8–30 | Revisión semanal: ¿se está registrando? ¿los números cuadran? | Semanal |
| Días 31–60 | Revisión quincenal + primer cierre mensual acompañado | Quincenal |
| Días 61–90 | Revisión mensual + segundo cierre + ajustes finales | Mensual |

### 6.1 Los tres momentos críticos

| Momento | Riesgo | Qué se hace |
|---|---|---|
| **Día 10** | El entusiasmo inicial baja y se empieza a dejar de registrar | Revisar el índice de puntualidad; si cae del 80%, sesión de refuerzo |
| **Primer cierre mensual** | Los números no cuadran y se pierde la confianza | Cierre acompañado, revisando cada diferencia hasta explicarla |
| **Día 60** | Aparece la tentación de volver al cuaderno "para lo rápido" | Revisar qué se sintió lento y corregirlo |

### 6.2 Manejo de usuarios en la operación diaria

Dos cosas van a pasar seguro: alguien va a olvidar su contraseña y alguien se va a retirar.
Conviene tener resuelto de antemano cómo se atienden.

**Restablecer una contraseña — solo Gerencia, en persona**

| Paso | Acción |
|---|---|
| 1 | La persona le avisa a Gerencia. **No hay "olvidé mi contraseña" por correo**, porque detrás del usuario no hay un correo real |
| 2 | Gerencia abre la pantalla de Gestión de usuarios y pulsa **Restablecer clave** |
| 3 | Gerencia entrega la clave temporal en persona. Nunca por WhatsApp, nunca por un tercero |
| 4 | La persona entra y el sistema la obliga a cambiarla de inmediato |

**Desactivar a quien se retira**

| Paso | Acción |
|---|---|
| 1 | Gerencia abre la pantalla de Gestión de usuarios y pulsa **Desactivar** el mismo día del retiro |
| 2 | Escribe el motivo. Es obligatorio: *"Retiro voluntario, 30 de junio de 2026"* sirve; *"ya no"* no sirve |
| 3 | El usuario queda inactivo. **No se borra:** todo lo que registró sigue en su sitio y con su nombre |

> **El sistema no deja desactivar ni degradar al último usuario activo de Gerencia.** Si Gerencia
> cambia de manos, primero se crea el usuario nuevo y después se desactiva el viejo. En ese orden.

---

## 7. Indicadores de adopción

Se miden durante los 90 días. Son los que dicen si la implantación funcionó.

| Indicador | Meta | Cómo se mide |
|---|---|---|
| Días con al menos un registro | ≥ 90% | Movimientos por día |
| Índice de puntualidad | ≥ 80% | Registros dentro de 48 h |
| Pedidos registrados vs. reales | 100% | Comparación con el cuaderno de la primera semana |
| Productos con costo definido | 100% | Catálogo |
| Cierres mensuales completados | 3 de 3 | Cierres |
| Uso del Excel o del cuaderno | 0 | Pregunta directa en cada revisión |
| Tiempo dedicado a administración | ≤ 1 h/semana | Estimación en la revisión |

---

## 8. Criterio de éxito de la implantación

A los 90 días, la implantación se considera exitosa si:

1. El registro diario es un hábito y no requiere recordatorios.
2. Los dos cierres mensuales se hicieron sin ayuda técnica.
3. Las tres preguntas originales se responden en menos de un minuto cada una, con el sistema
   abierto.
4. El Excel y el cuaderno están archivados y no se usan.
5. Hay al menos una decisión del negocio —un precio, un pedido, una compra— que se tomó mirando
   un número de PRISMA.

**El punto 5 es el más importante.** Un sistema que se alimenta pero no se consulta es trabajo
sin retorno.

---

## 9. Plan de contingencia

| Situación | Respuesta |
|---|---|
| El registro se abandona en la semana 2 | Sesión de diagnóstico: identificar qué se siente lento y simplificarlo |
| Los saldos no cuadran y no se sabe por qué | Revisar la bitácora de auditoría movimiento por movimiento |
| Se descubre un error en una fórmula | Corregir, agregar prueba automática, recalcular períodos afectados |
| El sistema no está disponible | Registrar en papel con fecha real y digitar después; la doble fecha lo respeta |
| Se pierde el acceso a la cuenta | Gerencia restablece la clave en persona (§6.2). No hay recuperación por correo |
| Se necesita volver a los datos anteriores | Exportación de respaldo (CU-22) |
