# Herramienta de documentación

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [1.4.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/scripts/docs/README.md "Historial de cambios") | [✅ Vigente](../../docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-17 | [Proceso](../../docs/INDICE.md#etiqueta-proceso) |

Pone y verifica los encabezados, las anclas, los enlaces y los bloques generados de toda la
documentación de PRISMA. Las reglas que hace cumplir están en [`docs/22-documentacion.md`](../../docs/22-documentacion.md), y la
decisión en [ADR-027](../../docs/adr/ADR-027-documentacion-versionada.md).

## Uso

```bash
node scripts/docs/documentar.mjs enlazar             # escribe anclas, enlaces y bloques generados
node scripts/docs/documentar.mjs enlazar --en-seco   # muestra lo que cambiaría, sin escribir
node scripts/docs/documentar.mjs verificar           # falla si algo está roto o sin enlazar
node scripts/docs/documentar.mjs verificar --base <commit>   # y exige subir la versión de lo que cambió
                                                             # y que ningún commit pase de 256 caracteres
```

Necesita Node 20 o más y no tiene dependencias. Se corre desde la raíz de `Finanzas-PRISMA`. Si los
repositorios de código están en `repositories/`, también revisa sus README. De `plan/` no revisa el
contenido —los planes no se versionan— pero sí el nombre y la numeración ([22 §10](../../docs/22-documentacion.md#planes)).

## Archivos

| Archivo | Qué hace |
|---|---|
| `config.mjs` | Repositorios, estados, etiquetas, familias de identificadores y parámetros del calendario. Si cambia algo aquí, cambia [`docs/22-documentacion.md`](../../docs/22-documentacion.md) en el mismo commit |
| `markdown.mjs` | Anclas con el mismo algoritmo de GitHub, separación de código y enlaces, encabezados y bloques generados |
| `plan.mjs` | El plan como grafo de dependencias: oleadas, camino crítico, calendario con 1, 2 y 3 carriles, y el tablero por sprint |
| `documentar.mjs` | La orden: junta todo, escribe o verifica |

## Cuando la verificación falla

| Mensaje | Qué hacer |
|---|---|
| «faltan anclas, enlaces o bloques generados» | Correr `enlazar` y hacer commit de lo que cambie |
| «no lleva a ningún sitio» | La referencia apunta a una sección, un ADR o un identificador que no existe: corregir el texto |
| «apunta a un ancla que no existe» | Un encabezado cambió de nombre o de número: corregir el enlace o el encabezado |
| «cambió el contenido y la versión sigue en…» | Subir la versión según [`docs/22-documentacion.md`](../../docs/22-documentacion.md) [§3](../../docs/22-documentacion.md#3-versiones) y poner la fecha de hoy |
| «el plan se bloquea» o «hay un ciclo de dependencias» | Revisar la columna «Depende de» de las tablas del plan |
| «no enumera N tareas del plan» | El plan tiene una tarea que el tablero no lista: agregarla a su sprint en [`TODO.md`](../../TODO.md) |
| «enumera tareas que el plan no tiene» | Al revés: una tarea del tablero no existe en el plan. Lo nuevo entra primero al plan ([08 §6](../../docs/08-plan-de-desarrollo.md#6-backlog-priorizado)) |
| «un plan se llama NN-titulo-en-minusculas.md» | Un archivo de `plan/` no sigue el formato: renombrarlo ([22 §10](../../docs/22-documentacion.md#planes)) |
| «el mensaje mide N caracteres y el tope son 256» | Un commit se pasó del tope ([ADR-031](../../docs/adr/ADR-031-commit-de-256-caracteres.md)): rehacerlo con `git rebase -i` y llevar lo que sobra al plan de `plan/`. La rama ya está empujada ([21 §6.5](../../docs/21-trabajo-en-paralelo.md#65-ramas-e-integración)), así que el empuje siguiente va con `--force-with-lease` |
| «falta el plan NN» o «dos planes no comparten número» | La numeración de `plan/` saltó o se repitió: renumerar el que llegó después |
