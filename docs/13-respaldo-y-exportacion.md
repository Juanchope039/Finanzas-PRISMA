# 13 · Respaldo y exportación

> **Estado: diseñado, no construido.** La exportación se especifica aquí en detalle para que
> el modelo de datos y la arquitectura la soporten desde el primer día, pero su construcción
> queda programada para después del go-live. Ver [`14-roadmap-e-ideas.md`](14-roadmap-e-ideas.md).

---

## 1. Niveles de respaldo

| Nivel | Qué cubre | Frecuencia | Quién lo hace | Estado |
|---|---|---|---|---|
| 1 · Proveedor | Toda la base de datos | Diaria automática | Supabase | ✅ Desde el día 1 |
| 2 · Exportación | Base completa o un mes | A demanda o programada | Gerencia | ⬜ Fase posterior |
| 3 · Código | Todo el proyecto | Cada cambio | Control de versiones | ✅ Desde el día 1 |

El nivel 1 protege contra fallas técnicas. **El nivel 2 protege contra algo distinto:** la
dependencia de un proveedor. Un archivo propio, en un disco propio, es lo que garantiza que la
información del negocio siga siendo del negocio pase lo que pase.

---

## 2. Alcance seleccionable

| Opción | Contenido | Uso típico |
|---|---|---|
| **Total** | Todas las tablas, todo el histórico | Respaldo periódico completo |
| **Por mes** | Movimientos, pedidos y nómina de un mes | Archivo mensual, entrega al contador |
| **Por rango** | Entre dos fechas | Revisión de un período específico |
| **Una tabla** | Una sola entidad completa | Análisis puntual |

### 2.1 La descarga del Inicio es una exportación parcial

El Inicio tiene su propio botón **Descargar** (RF-96): baja en CSV o PDF lo que esa pantalla ya
está mostrando — las tres cifras del mes, los saldos de cuentas al corte, los últimos doce meses,
las alertas activas y los pedidos por entregar. Es la misma maquinaria de exportación que
describe este documento, con un alcance mucho más estrecho.

| Aspecto | Respaldo (nivel 2) | Descarga del Inicio |
|---|---|---|
| Caso de uso | CU-22 · Exportar respaldo | CU-37 · Descargar lo que muestra una pantalla |
| Qué baja | Tablas completas, fila por fila | Cifras ya calculadas de una pantalla |
| Para qué | Que la información siga siendo del negocio | Llevarse un dato a una reunión o a una hoja de cálculo |
| Alcance | Total, por mes, por rango o una tabla | Lo que el Inicio muestra en ese momento |
| Formato | ZIP con CSV, Excel, JSON | CSV o PDF |
| Manifiesto | Obligatorio, con `sha256` y totales de control | No lleva: no pretende ser verificable ni restaurable |
| ¿Sustituye al otro? | — | **No.** Con esto no se restaura nada |

**Por qué conviven en lugar de fusionarse.** Un respaldo tiene que ser completo y verificable,
aunque resulte incómodo de leer; un reporte tiene que ser legible, aunque esté incompleto.
Pedirle las dos cosas al mismo archivo produce uno que no sirve para ninguna. La regla que las
separa es corta: si el archivo puede reconstruir el estado del sistema, es respaldo y se rige
por todo lo que sigue; si solo responde una pregunta del momento, es descarga de pantalla.

Por eso el PDF aparece aquí y no en la tabla de formatos del punto 3. Un respaldo no se lee, se
restaura, y el PDF no restaura nada. Una descarga de pantalla sí se lee, y a veces se imprime.

Lo que ambas sí comparten: el acceso es exclusivo de Gerencia, como fija el punto 7 — la
descarga del Inicio incluye utilidad, caja y patrimonio —, y cada descarga queda registrada en
la bitácora, como fija el punto 5, **y como una fila de `exportaciones`**, la tabla del punto 8.
Sacar información del sistema siempre deja rastro, sin importar el tamaño del archivo. Esa
promesa obligó a ampliar los dos `CHECK` de esa tabla; el punto 8 explica por qué.

---

## 3. Formatos

| Formato | Contenido | Para qué |
|---|---|---|
| **ZIP con CSV** | Un archivo `.csv` por tabla | Abrir en cualquier programa; formato duradero |
| **Excel** | Un libro con una hoja por tabla | Lectura humana, entrega al contador |
| **JSON** | Estructura completa con relaciones | Restauración fiel del estado |

> **El CSV es el formato de referencia.** Es el único que seguirá siendo legible dentro de
> quince años sin depender de ningún programa en particular. El Excel es por comodidad y el
> JSON por fidelidad técnica; el CSV es por permanencia.

### 3.1 Los datos anulados también se exportan

La exportación incluye las filas anuladas, con sus columnas de anulación completas. Un respaldo
que omitiera lo anulado contradiría el principio de solo escritura: la historia completa
incluye los errores y sus correcciones.

---

## 4. Manifiesto de integridad

Todo archivo de exportación incluye un `manifiesto.json`:

```json
{
  "generado_en": "2026-09-30T18:42:11-05:00",
  "generado_por": "gerencia@prismamyestampados.co",
  "alcance": { "tipo": "mes", "anio": 2026, "mes": 9 },
  "version_esquema": "1.4.0",
  "version_aplicacion": "1.4.2",
  "zona_horaria": "America/Bogota",
  "archivos": [
    { "nombre": "movimientos.csv", "registros": 412,
      "sha256": "3f9a...c1" },
    { "nombre": "pedidos.csv", "registros": 42,
      "sha256": "8b21...7e" }
  ],
  "totales_control": {
    "suma_movimientos": 18420500,
    "utilidad_causada": 1258000,
    "caja_libre": 545000
  }
}
```

### 4.1 Para qué sirve cada parte

| Campo | Por qué está |
|---|---|
| `sha256` por archivo | Detecta si un archivo se corrompió o fue alterado |
| `registros` por archivo | Detecta una exportación truncada |
| `version_esquema` | Permite saber si el respaldo corresponde a una estructura anterior |
| `totales_control` | Permite verificar el respaldo **sin abrirlo**: si los totales no coinciden con los del sistema, algo falló |
| `zona_horaria` | Evita que las fechas se reinterpreten mal al abrir el archivo en otro lugar |

Los `totales_control` son la verificación más práctica: comparar tres números basta para saber
si un respaldo es confiable.

---

## 5. Generación y descarga

| Aspecto | Comportamiento |
|---|---|
| **Generación** | Automática según programación, o manual a demanda |
| **Descarga** | **Siempre manual.** El archivo queda disponible en el sistema y se baja con una acción explícita |
| **Envío** | Ninguno. No se envía por correo ni a servicios externos |
| **Acceso** | Exclusivo del rol Gerencia |
| **Retención** | Los últimos 12 archivos generados quedan disponibles; los anteriores se descartan |
| **Auditoría** | Cada generación y cada descarga queda registrada en la bitácora |

Este punto describe el **respaldo** (CU-22). La descarga de pantalla (2.1, CU-37) se genera y se
baja en el mismo acto, no se guarda para después y no entra en la retención de 12 archivos; de
este punto solo hereda la última fila, la auditoría.

> **Por qué la descarga es manual y no hay envío automático.** Un respaldo contiene todo: datos
> de clientes, salarios, márgenes, utilidades. Enviarlo automáticamente a un correo lo pone en
> un servidor de terceros sin intervención humana. Que exista una acción explícita significa que
> alguien decidió, en un momento concreto, sacar esa información del sistema — y eso queda
> registrado.

---

## 6. Programación automática

| Opción | Cuándo genera |
|---|---|
| Desactivada | Solo generación manual |
| Mensual | El día 1 de cada mes, del mes anterior completo |
| Al cerrar el mes | Automáticamente después de cada cierre mensual |

La opción recomendada es **al cerrar el mes**: el respaldo queda asociado a un estado
consistente y verificado, no a un momento arbitrario.

---

## 7. Alcance por rol

| Acción | Gerencia | Operación |
|---|:---:|:---:|
| Generar exportación | ✅ | ❌ |
| Descargar archivo | ✅ | ❌ |
| Descargar lo que muestra el Inicio (2.1) | ✅ | ❌ |
| Ver historial de exportaciones | ✅ | ❌ |
| Configurar la programación | ✅ | ❌ |

Restricción aplicada por Row Level Security, igual que el resto de datos sensibles.

---

## 8. Tabla de registro

```sql
CREATE TABLE exportaciones (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alcance_tipo   TEXT NOT NULL CHECK (alcance_tipo IN ('total','mes','rango','tabla','pantalla')),
  alcance_desde  DATE,
  alcance_hasta  DATE,
  formato        TEXT NOT NULL CHECK (formato IN ('csv_zip','excel','json','csv','pdf')),
  archivo_path   TEXT NOT NULL,
  tamano_bytes   BIGINT NOT NULL,
  registros      INTEGER NOT NULL,
  sha256         TEXT NOT NULL,
  manifiesto     JSONB,
  generado_por   UUID NOT NULL REFERENCES usuarios(id),
  generado_en    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  descargado_en  TIMESTAMPTZ,
  descargado_por UUID REFERENCES usuarios(id),
  CHECK (alcance_tipo = 'pantalla' OR manifiesto IS NOT NULL)
);
```

`descargado_en` y `descargado_por` quedan nulos hasta que alguien baja efectivamente el
archivo. Así se distingue entre respaldos generados y respaldos que realmente salieron del
sistema.

**Por qué se ampliaron los dos `CHECK`.** El punto 2.1 promete que la descarga de pantalla
también queda registrada, y con los valores anteriores no cabía ninguna fila: faltaba el alcance
y faltaba el formato.

| Valor nuevo | Columna | Por qué hacía falta |
|---|---|---|
| `'pantalla'` | `alcance_tipo` | Lo que baja no es todo, ni un mes, ni un rango, ni una tabla: es lo que una pantalla muestra en ese momento |
| `'csv'` | `formato` | `csv_zip` es un `.csv` por tabla dentro de un ZIP; una pantalla baja un solo archivo suelto |
| `'pdf'` | `formato` | Un respaldo no se lee, pero una descarga de pantalla sí, y a veces se imprime (2.1) |

`manifiesto` deja de ser obligatorio por lo mismo: la descarga de pantalla no lo lleva. El
`CHECK` final lo exige para todo lo demás, que es donde el manifiesto sí es la garantía de que el
archivo es verificable. `registros` sigue siendo obligatorio y cuenta las filas escritas: un PDF
de cifras del Inicio lleva `0`, y eso ya distingue un reporte de un respaldo vacío por error.

---

## 9. Fuera de alcance de esta versión

| Tema | Cuándo |
|---|---|
| Procedimiento de restauración documentado | Fase posterior |
| Simulacro de restauración | Fase posterior |
| Envío automático a almacenamiento externo | No previsto |
| Cifrado del archivo de exportación | Fase posterior |

> **Nota honesta:** un respaldo que nunca se ha restaurado es una suposición, no una garantía.
> El procedimiento de restauración y su prueba quedan explícitamente diferidos, y eso es una
> limitación real de esta versión, no un olvido. Mientras tanto, el respaldo diario automático
> del proveedor es la protección efectiva contra pérdida de datos.
