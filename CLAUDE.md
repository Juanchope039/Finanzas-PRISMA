# CLAUDE.md

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [10.0.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/CLAUDE.md "Historial de cambios") | [✅ Vigente](docs/22-documentacion.md#estados) | 2026-09-16 | 2026-09-22 | [Proceso](docs/INDICE.md#etiqueta-proceso) |

Las reglas de PRISMA, para cualquier sesión en cualquiera de los cuatro repositorios.

**Este archivo no se toca al cerrar una tarea, un commit o un plan.** Cambia solo cuando cambia una
regla, y entonces con su ADR. El estado del proyecto vive en [`TODO.md`](TODO.md) [§1](TODO.md#1-hecho-en-progreso-y-pendiente). La guía de este
repositorio —cómo se hace cada cosa— está en `AGENTS.md`, que se importa al final.

**El idioma del proyecto es el español**: el código, los nombres de clase, los comentarios, los
mensajes de commit y las pruebas. `Movimiento`, `aporteAUtilidad`, `esRegistroTardio`.

---

## 1. Los cuatro repositorios

Son hermanos dentro de una carpeta de trabajo que no es un repositorio ([ADR-035](docs/adr/ADR-035-repositorios-hermanos.md)). Cada uno tiene su
propia historia, sus reglas en su `CLAUDE.md` y su guía en su `AGENTS.md`.

| Carpeta | Proyecto | En GitHub | Rama base | Qué es |
|---|---|---|---|---|
| `documentation` | La especificación | `Finanzas-PRISMA`, **público** | `main` | Documentación, ADR, mockup, contrato y la herramienta que los verifica |
| `backend-api` | `prisma_api` | `Finanzas-PRISMA-API` | `develop` | Java y Spring Boot. Es lo único que habla con la base |
| `backend-db` | `prisma_db` | `Finanzas-PRISMA-DB` | `develop` | Migraciones de PostgreSQL, semilla y scripts. No es un servicio |
| `frontend-flutter` | `prisma_front` | `Finanzas-PRISMA-Front` | `develop` | Flutter, web por defecto. No decide nada |

**La especificación es pública.** No lleva datos internos: ni cuentas, ni claves, ni URL privadas,
ni referencias de proyectos, ni nombres de clientes.

---

## 2. Reglas del proceso

**Antes de escribir código se escribe el plan.**
- Cada plan de trabajo es un archivo en `plan/` de la carpeta de trabajo, fuera de los repositorios.
- Se llama `NN-titulo.md`: dos dígitos, un guion y el título en minúsculas, sin puntos.
- El número es el siguiente al mayor que haya: arranca en 01, no salta y no se repite.
- Dice qué se va a hacer, qué se decidió y por qué —con lo que se descartó— y cómo se va a
  verificar. Son los tres títulos del commit, en futuro.
- No se versiona y no se corrige: si resultó equivocado, se escribe el siguiente.
- **Ningún documento lo cita**, ni por ruta ni por número ([22 §10](docs/22-documentacion.md#10-los-planes-de-trabajo)).

**Lo primero de una tarea es salir de la base al día, en una copia limpia** ([ADR-037](docs/adr/ADR-037-el-pr-se-abre-a-pedido.md)).
- Antes de abrir la rama, y en cada repositorio que la tarea toca: `git status` sin nada pendiente,
  `git switch <base>` y `git pull --ff-only`. La base es `develop` en los repositorios de código y
  `main` en la especificación, que no tiene `develop`.
- **Un árbol sucio no se arrastra a la rama nueva:** se enseña lo que hay y se pregunta qué hacer
  con ello. Lo de otra cosa no entra aquí por descuido.
- Recién entonces se abre `feature/<id>`, con el id que la tarea tiene en el 08.

**Una tarea es una rama `feature/<id>` en cada repositorio que toca, y un PR** ([21 §6.5](docs/21-trabajo-en-paralelo.md#65-ramas-e-integración)).
- El PR va contra `develop` en los repositorios de código y contra `main` en la especificación.
- Se trabaja y **se deja la documentación al día antes de pedir el PR**.
- **La rama se empuja siempre**, desde su primer commit y sin que haya que pedirlo, aunque el
  commit no sea de una tarea.
- `develop`, `main`, `qa`, `uat` y `prod` no se mueven por cuenta propia.
- **Se espera a que acepten el PR: no se empieza otra tarea hasta entonces.** La excepción es una
  tarea marcada ⚡ que no toque lo que está en revisión.

**El PR se abre a pedido, y la rama llega sin conflictos** ([ADR-037](docs/adr/ADR-037-el-pr-se-abre-a-pedido.md)).
- **Nunca se abre un PR por cuenta propia.** Se termina, se empuja y se avisa que la rama está
  lista y contra qué base se abriría. Empujar respalda; abrir el PR pide el turno de una persona, y
  cuándo pedirlo lo decide quien dirige.
- **Antes de avisar, la rama se trae su base y queda sin un solo conflicto**, y se comprueba que la
  fusión de vuelta daría limpia. Si la base se movió otra vez, se repite.
- **No basta con que no queden marcas `<<<<<<<`.** Dos ramas que suben la versión al mismo número, o
  que agregan una ruta a la copia fijada del contrato, fusionan limpio y dejan [C-04](docs/12-pruebas-y-calidad.md#c-04) y [C-05](docs/12-pruebas-y-calidad.md#c-05) en
  rojo: lo que se comprueba es que las puertas del [08 §4](docs/08-plan-de-desarrollo.md#4-definición-de-terminado) vuelven a pasar con la base adentro.
- La receta es la skill `sin-conflictos`, y abrirlo cuando lo pidan, la skill `pr`.

**Una tarea es un commit, y el commit explica por qué** ([ADR-028](docs/adr/ADR-028-un-commit-por-tarea.md)).
- El asunto lleva el sprint y el número: `Sprint 3 / 3.11: marca de registro tardio`.
- El cuerpo son tres líneas: `Hace:`, `Decide:` y `Verifica:`. La última lleva el conteo de pruebas
  y **qué se rompió a propósito para verlas fallar**.
- Dos tareas no van en el mismo commit.
- Lo que no es una tarea —documentación, herramientas, arreglos sueltos— va en su propio commit, sin
  número.
- Los mensajes van **en español sin tildes**.

**La versión del proyecto sube un paso en cada PR que cambia lo que se publica** ([ADR-034](docs/adr/ADR-034-la-version-sube-en-cada-pr.md)).
- Es el PATCH, el MINOR o el MAJOR siguiente de la versión de `develop`. En el front, el `+BUILD`
  sube uno.
- Si el PR agrega migraciones, la última publica en `schema_version` la versión siguiente del
  esquema.
- No piden versión las pruebas, los README, los flujos ni las guías de agentes: `CLAUDE.md`,
  `AGENTS.md` y `.claude/`.
- Lo exige la prueba [C-05](docs/12-pruebas-y-calidad.md#c-05).

**Todo `.md` de los cuatro repositorios lleva encabezado con versión, estado y fechas** ([ADR-027](docs/adr/ADR-027-documentacion-versionada.md),
[`22-documentacion.md`](docs/22-documentacion.md)).
- Al cambiar un documento se sube su versión, que es MAJOR si alguien actuaría mal con la anterior.
- Se pone la fecha de hoy.
- Se corre `enlazar` y después `verificar`.
- **Los bloques `<!-- generado:… -->` no se editan a mano**, y tampoco las marcas ⚡ 🔒 ⏭️ de
  [`TODO.md`](TODO.md). 🚧 y ✏️ sí las pone una persona.

**El plan de desarrollo manda sobre el tablero.**
- [`08-plan-de-desarrollo.md`](docs/08-plan-de-desarrollo.md) dice qué hay que hacer, en qué carril y de qué depende. [`TODO.md`](TODO.md) dice
  en qué va.
- Los dos enumeran las mismas tareas, y la verificación falla si no coinciden.
- **Una tarea nueva entra primero al 08**, nunca al tablero.

**`git add` va con rutas explícitas**, nunca con `-A`. Antes de commitear se mira `git status`.

**No se inventan reglas de negocio.** Si un documento no cubre un caso, se decide lo mínimo, se
escribe el porqué en el commit y se anota en [`TODO.md`](TODO.md) [§10](TODO.md#10-decisiones-de-construcción-que-conviene-revisar), la lista que revisa quien dirige.

**Este `CLAUDE.md` y los `AGENTS.md` no llevan estado, ni conteos, ni versiones** ([ADR-035](docs/adr/ADR-035-repositorios-hermanos.md)).
- Una regla cambia con su ADR.
- Si cambia la forma de un repositorio, cambia su `AGENTS.md`.
- Cerrar una tarea no toca ninguno de los dos.

---

## 3. Reglas de la arquitectura

```
prisma_front  ──HTTP──▶  prisma_api  ──SQL──▶  prisma_db
  pinta                   decide todo           impone lo que no se puede romper
```

- **El documento manda sobre el código.** Si el código contradice un documento, el que está mal es
  el código.
- **El front no decide nada**: ni una regla, ni un permiso, ni un mensaje, ni una cifra, ni qué
  opciones tiene el menú. Tampoco habla con Supabase ([ADR-018](docs/adr/ADR-018-front-sin-decisiones.md)).
- **La API es lo único que habla con la base**, y en ella vive toda la lógica. Es hexagonal y **las
  flechas apuntan siempre hacia adentro** ([ADR-002](docs/adr/ADR-002-arquitectura-hexagonal.md)): el dominio no conoce a nadie.
- **Los permisos viven en PostgreSQL, no en la pantalla** ([ADR-006](docs/adr/ADR-006-rls-por-rol.md)). RLS evalúa el tipo de usuario de
  la sesión, Gerencia u Operación. Las pruebas tienen que ver que el rechazo viene de la base.
- **El dinero es un entero de pesos, nunca decimales** ([ADR-003](docs/adr/ADR-003-dinero-entero.md)).
- **Toda respuesta lleva el sobre `{status, mensaje, data}`**, también los errores, con un código de
  cinco dígitos: `HTTP(3) + caso(2)`. El catálogo de códigos es la fuente única de los mensajes
  ([ADR-019](docs/adr/ADR-019-contrato-de-respuesta.md)).
- **Todo viaja por `POST` bajo `/api/v0`** ([ADR-030](docs/adr/ADR-030-contrato-sin-get.md)).
- **Toda petición lleva `Idempotency-Key`** ([ADR-020](docs/adr/ADR-020-idempotencia.md)), salvo el ingreso y la renovación de sesión.
  La clave la genera el front cuando la persona decide la acción, y la reutiliza en cada reintento.
- **El contrato se acuerda antes de implementarse.** El acordado es `contrato/openapi.json`, y la API
  guarda una copia fijada que la prueba [C-04](docs/12-pruebas-y-calidad.md#c-04) compara con lo que genera ([ADR-022](docs/adr/ADR-022-openapi-generado.md)).
- **La base es de solo escritura** ([ADR-004](docs/adr/ADR-004-base-solo-escritura.md)):
  - nada se borra; se anula con motivo, autor, fecha y dispositivo;
  - la auditoría la escriben triggers ([ADR-005](docs/adr/ADR-005-auditoria-por-triggers.md));
  - toda restricción lleva un nombre explícito, porque de ese nombre cuelga su mensaje en español.
- **Una columna nueva son dos PR, en orden** ([ADR-025](docs/adr/ADR-025-cuatro-repositorios.md)):
  1. la migración, compatible con la API que ya corre;
  2. la API que la usa.

---

## 4. Reglas de esta especificación

- **Un ADR aceptado no se edita.** Si la decisión cambia, se escribe otro que lo reemplaza. Al viejo
  solo se le agrega una nota, que sube la versión MINOR ([22 §3](docs/22-documentacion.md#3-versiones)).
- **`contrato/openapi.json` va en LF, byte a byte**, porque la API guarda una copia exacta.
- **Ningún documento cita un plan de trabajo.**

---

## 5. Dónde está la respuesta

| Pregunta | Documento |
|---|---|
| ¿Qué fórmula es? ¿Sube la utilidad, la caja o el patrimonio? | [`05-reglas-financieras.md`](docs/05-reglas-financieras.md) —**el más importante**— |
| ¿Qué columna, qué restricción, qué política RLS? | [`04-modelo-de-datos.md`](docs/04-modelo-de-datos.md) |
| ¿Qué tarea es esta y de qué depende? | [`08-plan-de-desarrollo.md`](docs/08-plan-de-desarrollo.md) y [`TODO.md`](TODO.md) |
| ¿Qué tiene que pasar para decir que está terminado? | [08 §4](docs/08-plan-de-desarrollo.md#4-definición-de-terminado) |
| ¿Qué requisito o qué escenario BDD cubre? | [`03-requisitos-y-bdd.md`](docs/03-requisitos-y-bdd.md) |
| ¿Cómo se comporta la pantalla? | [`10-ux-y-mockups.md`](docs/10-ux-y-mockups.md) y el mockup de `mockup/` |
| ¿Cómo responde la API, con qué código? | [`20-contrato-de-api.md`](docs/20-contrato-de-api.md) |
| ¿Qué prueba hay que escribir? | [`12-pruebas-y-calidad.md`](docs/12-pruebas-y-calidad.md) |
| ¿Cómo se versiona y se promueve? | [`19-ambientes-y-entrega.md`](docs/19-ambientes-y-entrega.md) |
| ¿Por qué se decidió así? | [`docs/adr/`](docs/adr/README.md) |

El índice navegable de todos los documentos está en [`docs/INDICE.md`](docs/INDICE.md).

@AGENTS.md
