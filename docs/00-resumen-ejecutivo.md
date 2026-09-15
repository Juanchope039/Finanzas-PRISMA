# 00 · Resumen ejecutivo

> Documento de 5 minutos. Si solo vas a leer uno, que sea este.

---

## 1. Qué pasa hoy

Prisma M&Y Estampados produce estampados personalizados y bordados en Cali: mugs, llaveros,
camisetas, rompecabezas y más. El negocio funciona y vende. El problema no es comercial, es de
**visibilidad**: la información administrativa está repartida entre un archivo de Excel, un
cuaderno físico y fotos de facturas en el celular.

Eso produce cinco síntomas concretos:

| Síntoma | Consecuencia real |
|---|---|
| No se sabe cuánto se ganó el mes pasado | Se toman decisiones de precio a ojo |
| La plata del negocio y la personal están mezcladas | Es imposible saber si el negocio se sostiene solo |
| Los anticipos se confunden con ganancias | Se gasta plata comprometida con un cliente |
| El trabajo propio no se cuenta como costo | El negocio parece más rentable de lo que es |
| No hay base para decidir sobre contratar | La decisión más cara del negocio se toma sin números |

---

## 2. Qué es PRISMA

Una aplicación web instalable en el celular y usable desde el computador, que centraliza la
administración y las finanzas del negocio.

Por dentro son tres piezas: un front en Flutter, una API propia en Dart y una base de datos
PostgreSQL siempre en línea. El front nunca toca la base directamente; todo pasa por la API, y
los permisos los sigue decidiendo la base. Y ese conjunto existe cuatro veces, en cuatro
ambientes separados —desarrollo, QA, aprobación y producción—, para que nadie pruebe sobre los
datos reales del negocio.

### Lo que va a permitir hacer

1. **Organizar facturas y pedidos por fecha**, con el estado del anticipo y del saldo, y la foto
   o el PDF adjunto.
2. **Registrar ingresos y gastos** en segundos desde el celular, con la fecha real del
   movimiento y la foto del recibo.
3. **Controlar inversiones, aportes y retiros** separados de los gastos operativos.
4. **Saber cuánto se genera al mes y al año** y cuál es el promedio de ganancias.
5. **Calcular cuánto se puede destinar al pago de una empleada** y liquidar su nómina con
   desprendible en PDF.
6. **Conocer el margen real de cada producto** — mug, llavero, camiseta, rompecabezas, bordado —
   y cuál deja más plata por hora de trabajo.
7. **Generar cotizaciones y remisiones en PDF** con logo, listas para enviar por WhatsApp.

---

## 3. Las tres cifras que van a cambiar la forma de decidir

### 3.1 Utilidad causada — ¿el negocio es rentable?

Lo que realmente produjo el trabajo del mes, se haya cobrado o no.

### 3.2 Caja — ¿cuánta plata hay?

Lo que efectivamente entró y salió de las cuentas.

### 3.3 Caja libre — ¿cuánto puedo usar hoy?

```
CAJA LIBRE = Saldo en todas las cuentas
           − Anticipos de pedidos aún no entregados
           − Gastos fijos comprometidos del mes
```

**Esta última es la cifra más importante del sistema** y la que hoy no existe en ninguna parte.
Un anticipo del 50% que está en Nequi no es ganancia: es una deuda con el cliente hasta que se
entregue el pedido. Gastarlo antes de entregar es gastar plata que todavía no se ganó.

---

## 4. Los tres hallazgos del análisis

Del diseño salieron tres cosas que no eran el requisito original pero que valen más que varias
funcionalidades juntas.

### Hallazgo 1 — El anticipo del 50% no siempre cubre el material

| Producto | Margen | El material cuesta | ¿El 50% lo cubre? |
|---|---|---|---|
| Llaveros | 70% | 30% del precio | ✅ Sobra |
| Mugs | 53% | 47% del precio | ✅ Justo |
| Camisetas DTF | 39% | 61% del precio | ❌ Faltan 11 puntos |
| Rompecabezas | 35% | 65% del precio | ❌ Faltan 15 puntos |

En los pedidos de margen bajo, **el negocio le está prestando plata al cliente** para comprar
su propio material. PRISMA calculará el anticipo mínimo de cada cotización y avisará cuando el
50% no alcance.

### Hallazgo 2 — El trabajo propio no se cuenta, y eso infla la utilidad

Quien dirige el negocio también estampa y borda. Ese trabajo es un costo real, pero al cobrarse
en forma de retiro queda invisible.

| | Utilidad del mes | Margen |
|---|---|---|
| Sin contar el trabajo propio | $3.000.000 | 37,5% |
| Contándolo como pro-labore de $1.500.000 | **$1.500.000** | **18,75%** |

La cifra de la izquierda es la que haría contratar a alguien por $2.000.000 al mes. La de la
derecha muestra que no alcanza. **Este error es la causa típica de que un negocio contrate y
quiebre al cuarto mes.**

### Hallazgo 3 — Retirar más de lo que se genera no se nota hasta que es tarde

```
Patrimonio = Aportes − Retiros + Utilidades acumuladas
```

Se puede tener doce meses rentables seguidos y estar vaciando el negocio. PRISMA vigila esa
relación y alerta cuando los retiros de los últimos doce meses superan las utilidades del mismo
período.

---

## 5. Cómo se va a construir

| | |
|---|---|
| **Tecnología** | Flutter Web (front) + Dart (API propia) + Supabase (PostgreSQL) |
| **Dónde funciona** | Navegador del PC y app instalable en el celular |
| **Ambientes** | Cuatro: desarrollo, QA, aprobación y producción, cada uno con su propia base |
| **Versión** | Cada proyecto la lleva por separado, y el front la muestra en pantalla junto al ambiente |
| **Duración** | 23 semanas: 10 sprints de 2 semanas más 3 de estabilización y puesta en marcha |
| **Costo mensual de operación** | Ya no es $0: producción y aprobación necesitan plan de pago para no pausarse; desarrollo y QA siguen en el gratuito |
| **Seguridad** | Permisos dentro de la base de datos; borrado imposible por diseño |
| **Tipos de usuario** | Gerencia (todo) y Operación (registro, sin ver utilidad ni nómina) |

Cada persona entra con **su propio usuario y contraseña**, no con un selector compartido. Al
abrir la sesión el sistema sabe su nombre completo, su cargo y su tipo: el tipo dice qué puede
ver, el cargo dice qué hace en el negocio.

---

## 6. Cronograma resumido

| Sprint | Semanas | Entrega |
|---|---|---|
| 0 | 1–2 | Los dos proyectos, los cuatro ambientes y la tubería que despliega sola |
| 1 | 3–4 | Base de datos, permisos en la base e identidad propagada hasta PostgreSQL |
| 2 | 5–6 | Acceso, usuarios y cargos |
| 3 | 7–8 | Ingresos, gastos, cuentas, saldos |
| 4 | 9–10 | Pedidos, anticipos, entregas |
| 5 | 11–12 | Productos, costeo y márgenes |
| 6 | 13–14 | Reportes y las tres cifras |
| 7 | 15–16 | Inversiones, retiros, pro-labore, patrimonio |
| 8 | 17–18 | Nómina, simulador, cotizador y cierre |
| 9 | 19–20 | Promoción hasta producción, PWA y endurecimiento |
| — | 21–23 | Estabilización, aprobación en UAT, migración, capacitación y go-live |

> **Son 23 semanas y no 16 porque el backend volvió al proyecto.** Construir, probar y
> desplegar la API en cuatro ambientes es trabajo nuevo, no las mismas horas repartidas en más
> casillas. El detalle, sprint por sprint, está en
> [`08-plan-de-desarrollo.md`](08-plan-de-desarrollo.md).

---

## 7. Qué NO hace esta versión

- **No emite facturas electrónicas ante la DIAN.** Registra y organiza; no transmite.
- **No calcula parafiscales ni aportes a seguridad social.** La nómina es simple.
- **No reemplaza a un contador.** Es control interno de gestión.

Todo lo anterior está documentado y priorizado en [`14-roadmap-e-ideas.md`](14-roadmap-e-ideas.md)
para fases posteriores.

---

## 8. La decisión que se pide ahora

Abrir [`../mockup/prisma-mockup.html`](../mockup/prisma-mockup.html), entrar con el usuario de
ejemplo `yuliana` (Gerencia), recorrer las 10 pantallas y marcar el checklist de aprobación del
documento [`09-plan-de-implantacion.md`](09-plan-de-implantacion.md).

**Nada se programa hasta que ese checklist esté firmado.** Corregir una pantalla en el mockup
cuesta minutos; corregirla después de construida cuesta días.

---

### 🧭 Navegación

**⬅️ Anterior:** [🏠 Inicio (README)](../README.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [01 · Visión y alcance](01-vision-y-alcance.md)
