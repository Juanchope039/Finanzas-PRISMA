# AGENTS.md

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [1.0.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/AGENTS.md "Historial de cambios") | [✅ Vigente](docs/22-documentacion.md#estados) | 2026-09-21 | 2026-09-21 | [Proceso](docs/INDICE.md#etiqueta-proceso) |

Guía para los agentes de código que trabajan en la especificación de PRISMA. **Las reglas están en
[`CLAUDE.md`](CLAUDE.md)**, tanto las del proceso como las de la arquitectura y las de este
repositorio: léelas antes de tocar nada. Aquí se explica cómo se hace cada cosa. Todo va en español.

---

## 1. Qué hay aquí

| Carpeta o archivo | Qué es |
|---|---|
| `docs/` | Los documentos numerados. [`docs/INDICE.md`](docs/INDICE.md) los ordena por perfil y por pregunta |
| `docs/adr/` | Las decisiones de arquitectura, con su índice en `docs/adr/README.md` |
| `contrato/` | `openapi.json`, el contrato acordado entre el front y la API, con el catálogo de códigos adentro |
| `mockup/` | El prototipo navegable. Nada se construye sin su pantalla aprobada |
| [`TODO.md`](TODO.md) | El tablero: en qué va cada tarea y qué decisiones tiene que revisar quien dirige |
| `scripts/docs/` | La herramienta que pone y verifica encabezados, enlaces y bloques generados |

Los repositorios de código están al lado, en `../backend-api`, `../backend-db` y
`../frontend-flutter`. Cuando están en disco, la herramienta también revisa sus `.md`.

---

## 2. La herramienta

```bash
node scripts/docs/documentar.mjs enlazar                        # pone anclas, enlaces y bloques generados
node scripts/docs/documentar.mjs enlazar --en-seco              # muestra lo que cambiaría, sin escribir
node scripts/docs/documentar.mjs verificar                      # falla si algo quedó roto o sin enlazar
node scripts/docs/documentar.mjs verificar --base origin/main   # además: versiones subidas y commits de 256
```

- Se corre desde cualquier carpeta, **cada vez** que cambia un `.md`: primero `enlazar` y después
  `verificar`.
- `verificar --base` es lo que corre la integración continua en cada PR. Antes de abrir el tuyo,
  córrelo con la rama al día con `main`.
- Qué hacer con cada mensaje de error está en `scripts/docs/README.md`.

---

## 3. Cómo se cambia un documento

1. Se edita el texto. Toda referencia es un enlace, y la herramienta los pone sola:
   - identificadores como `RF-01`, `C-05` o `ADR-025`;
   - tareas y sprints, como `tarea 3.4` o `Sprint 3`;
   - documentos y secciones, como [`05-reglas-financieras.md`](docs/05-reglas-financieras.md) o `07 §3`.

   Lo que va entre comillas invertidas no se enlaza. La excepción es el nombre de un documento
   numerado, que sí se enlaza.
2. Se sube la versión del encabezado según [22 §3](docs/22-documentacion.md#3-versiones):
   - MAJOR si quien actuaba según la versión anterior ahora actuaría mal;
   - MINOR si se agrega algo compatible;
   - PATCH si no cambia nada de lo que alguien haría.
3. «Actualizado» lleva la fecha de hoy, en hora de Bogotá. «Creado» no cambia nunca.
4. Se corre `enlazar`, después `verificar`, y se hace el commit.

Los estados, las etiquetas y la forma exacta del encabezado están en [`22-documentacion.md`](docs/22-documentacion.md). Un
documento nuevo arranca en 0.1.0 como 📝 Borrador, o en 1.0.0 si nace ✅ Vigente.

---

## 4. Cómo se escribe un ADR

- **Número:** el siguiente al mayor de `docs/adr/`. Un número que ya se asignó no se vuelve a usar.
- **Nombre:** `ADR-NNN-titulo-corto.md`, con el título `# ADR-NNN · La decisión en una frase`.
- **Secciones:**
  - Contexto;
  - Alternativas consideradas, en una tabla con lo que va a favor y en contra;
  - Decisión;
  - Justificación;
  - Consecuencias: positivas, negativas y a vigilar;
  - Referencias.
- **Estado:** 📝 Propuesto en 0.y.z y ✅ Aceptado desde 1.0.0. Cuando otro lo reemplaza, queda
  ⛔ Reemplazado, con el número del que lo reemplaza.
- **Índices:** va a mano en dos, la tabla de `docs/adr/README.md` y la de [`docs/INDICE.md`](docs/INDICE.md) [§4](docs/INDICE.md#4-las-decisiones-de-arquitectura-adrs).
  En este último se describe en palabras de alguien que no es técnico.

---

## 5. Cómo se cambia el contrato

- **Primero el PR aquí.** Un cambio de contrato es un PR en este repositorio, revisado por los dos
  lados, **antes** de implementarlo.
- **El formato es el que genera la API.** `contrato/openapi.json` lleva:
  - las claves ordenadas a cualquier profundidad;
  - `tags` y `required` también ordenados;
  - `"clave" : valor`, con dos espacios de sangría;
  - los arreglos de valores simples en una sola línea;
  - saltos de línea LF.

  Un cambio a mano tiene que dejar exactamente esos bytes. La prueba es reescribir el archivo sin
  cambios y obtener el mismo archivo.
- **Sube `info.version`**, y es MAJOR si el cambio rompe algo. Con ella sube también la versión del
  encabezado de `contrato/README.md`.
- **Un código nuevo** va en el rango de su módulo, según [`20-contrato-de-api.md`](docs/20-contrato-de-api.md), con su mensaje en
  español y dentro de `x-prisma-codigos`.
- **Cuando la API lo implementa**, copia el archivo a su `contrato/` y sube `prisma.contrato.version`.
  La prueba [C-04](docs/12-pruebas-y-calidad.md#c-04) compara las dos cosas.

---

## 6. El tablero

- **Una tarea nueva entra primero a [`08-plan-de-desarrollo.md`](docs/08-plan-de-desarrollo.md)**, con su carril y lo que la bloquea.
  Después el tablero la lista en su sprint.
- **Al terminar una tarea** se marca `[x]` en [`TODO.md`](TODO.md) y se corre `enlazar`. Eso rehace las marcas ⚡
  y 🔒, lo que puede empezar hoy y cuánto falta. Todo va en el PR de la tarea.
- **🚧 (en progreso) y ✏️ (escrita sin verificar) las pone una persona**, al principio de la línea.

---

## 7. Si dos PR chocan

Casi siempre chocan en [`TODO.md`](TODO.md) y [`docs/INDICE.md`](docs/INDICE.md), dentro de bloques generados:

1. Se trae `main` a la rama con `git merge --no-commit origin/main`.
2. En esos dos archivos se toma el lado de `main` y se vuelve a poner encima lo de la rama. La versión
   de [`TODO.md`](TODO.md) queda por encima de la de `main`.
3. Se hace `git add` de lo resuelto, **y después** se corre `enlazar`. Si un archivo sigue en
   conflicto sin agregar, la herramienta lo cuenta tres veces y duplica filas en el índice.
4. Se hace `git add` otra vez, el commit, `verificar --base origin/main` y se empuja.
