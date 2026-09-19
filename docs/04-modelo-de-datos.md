# 04 · Modelo de datos

| Versión | Estado | Creado | Actualizado | Etiquetas |
|---|---|---|---|---|
| [5.1.0](https://github.com/Juanchope039/Finanzas-PRISMA/commits/main/docs/04-modelo-de-datos.md "Historial de cambios") | [✅ Vigente](22-documentacion.md#estados) | 2026-09-13 | 2026-09-19 | [Base de datos](INDICE.md#etiqueta-base-de-datos) · [Arquitectura](INDICE.md#etiqueta-arquitectura) |

Base de datos PostgreSQL sobre Supabase. **Solo escritura: nada se elimina jamás.**

---

## 1. Principios del modelo

| # | Principio | Implicación |
|---|---|---|
| 1 | **Nada se borra** | No existe `DELETE`. El permiso está revocado en el motor |
| 2 | **Toda fila es auditable** | Triggers escriben quién, cuándo, desde dónde y qué cambió |
| 3 | **Dinero en enteros** | `BIGINT` de pesos colombianos. Nunca `NUMERIC` ni `FLOAT` |
| 4 | **Doble fecha** | `fecha_movimiento` (real) y `creado_en` (digitación) |
| 5 | **Zona horaria fija** | Todo `TIMESTAMPTZ` se opera en `America/Bogota` |
| 6 | **Permisos en la base** | Row Level Security por tipo de usuario en cada tabla |
| 7 | **El anticipo es pasivo** | Tabla propia, no una columna de ingreso |

---

## 2. Diagrama entidad–relación

```mermaid
erDiagram
    CARGOS ||--o{ USUARIOS : clasifica
    USUARIOS ||--o{ MOVIMIENTOS : registra
    USUARIOS ||--o{ AUDITORIA : genera
    AUDITORIA ||--o| AUDITORIA : reversa
    USUARIOS ||--o| EMPLEADOS : corresponde_a
    CUENTAS ||--o{ MOVIMIENTOS : afecta
    CATEGORIAS ||--o{ MOVIMIENTOS : clasifica
    CATEGORIAS ||--o{ CATEGORIAS : contiene
    MOVIMIENTOS ||--o{ ADJUNTOS : tiene
    MOVIMIENTOS ||--o| MOVIMIENTOS : corrige

    CLIENTES ||--o{ PEDIDOS : solicita
    PEDIDOS ||--|{ PEDIDO_LINEAS : contiene
    PEDIDOS ||--o{ ANTICIPOS : recibe
    PEDIDOS ||--o{ ADJUNTOS : documenta
    PRODUCTOS ||--o{ PEDIDO_LINEAS : aparece_en
    PRODUCTOS ||--o{ COSTOS_PRODUCTO : historial

    COTIZACIONES ||--|{ COTIZACION_LINEAS : contiene
    CLIENTES ||--o{ COTIZACIONES : recibe

    ACTIVOS ||--o{ MOVIMIENTOS : origina
    APORTES_RETIROS ||--o{ MOVIMIENTOS : origina

    EMPLEADOS ||--o{ NOMINA_DETALLE : liquida
    EMPLEADOS ||--o{ ADELANTOS : recibe
    NOMINA_PERIODOS ||--|{ NOMINA_DETALLE : agrupa

    SOBRES_CONFIG ||--o{ SOBRES_HISTORIAL : versiona
    CIERRES_MENSUALES ||--o{ CIERRE_SNAPSHOT : congela
```

---

## 3. Catálogo de entidades

| # | Tabla | Propósito | Sensible |
|---|---|---|:---:|
| 1 | `usuarios` | Personas con acceso, su tipo y su cargo | ✅ |
| 2 | `cuentas` | Efectivo, Nequi, Daviplata, bancos | |
| 3 | `categorias` | Árbol de categorías de ingreso y gasto | |
| 4 | `movimientos` | Libro único de todo lo que entra y sale | ✅ |
| 5 | `adjuntos` | Fotos y PDF asociados a movimientos o pedidos | |
| 6 | `clientes` | Datos de contacto e historial | ✅ |
| 7 | `pedidos` | Encabezado del pedido o factura | |
| 8 | `pedido_lineas` | Detalle de productos, cantidades y precios | |
| 9 | `anticipos` | Pasivo por pedidos no entregados | |
| 10 | `productos` | Catálogo de productos y servicios | |
| 11 | `costos_producto` | Historial de costos y precios | ✅ |
| 12 | `cotizaciones` | Cotizaciones emitidas | |
| 13 | `cotizacion_lineas` | Detalle de la cotización | |
| 14 | `activos` | Inversiones en equipos y herramientas | ✅ |
| 15 | `aportes_retiros` | Capital que entra y sale de la propiedad | ✅ |
| 16 | `prolabore_config` | Sueldo mensual definido para la gerencia | ✅ |
| 17 | `empleados` | Personal contratado | ✅ |
| 18 | `nomina_periodos` | Períodos liquidados | ✅ |
| 19 | `nomina_detalle` | Liquidación por empleada y período | ✅ |
| 20 | `adelantos` | Adelantos como cuenta por cobrar | ✅ |
| 21 | `sobres_config` | Porcentajes de los 4 sobres | ✅ |
| 22 | `cierres_mensuales` | Snapshot inmutable de cada mes cerrado | ✅ |
| 23 | `auditoria` | Bitácora de todos los cambios | ✅ |
| 24 | `cargos` | Catálogo de cargos del negocio, administrado por Gerencia | |
| 25 | `peticiones_idempotentes` | Claves de idempotencia y la respuesta que devolvió cada una | ✅ |
| 26 | `nonces_vistos` | Nonce ya usados por el canal firmado, dentro de su ventana | ✅ |
| 27 | `sesiones` | La clave de firma de cada sesión abierta, del lado del servidor | ✅ |

*Sensible = el acceso a la tabla está restringido por Row Level Security ([§7](#7-seguridad-por-tipo-de-usuario-rls)). En la mayoría eso
significa «solo Gerencia», pero no en todas: en `usuarios`, `empleados`, `nomina_periodos`,
`nomina_detalle`, `adelantos`, `peticiones_idempotentes`, `nonces_vistos` y `sesiones` cada persona alcanza **su propia fila y
nada más** —y en las dos últimas, tampoco Gerencia—; `clientes` lo lee y lo crea cualquiera, porque sin cliente no hay pedido ([CU-05](02-casos-de-uso.md#cu-05)); y
`movimientos` lo lee todo el mundo, porque los dos tipos registran el día a día. La regla de cada
tabla está en el [§7](#7-seguridad-por-tipo-de-usuario-rls).*

`cargos` va al final de la lista para no renumerar las 23 entidades anteriores. En el esquema
SQL sí aparece antes de `usuarios`, porque `usuarios` la referencia.

Las entidades **25**, **26** y **27** —`peticiones_idempotentes`, `nonces_vistos` y `sesiones`— son
las tres únicas que no son del negocio: no guardan plata, ni personas, ni pedidos. La primera guarda el rastro de qué
peticiones ya se atendieron, para no cobrar dos veces lo mismo ([§4.9](#49-claves-de-idempotencia)); la segunda, qué nonce ya se
usaron, para que nadie reenvíe una petición capturada ([§4.10](#410-los-nonce-vistos)); la tercera, con qué clave firma cada
sesión, que es contra lo que se comprueban esos envíos ([§4.11](#411-las-sesiones-abiertas)). Están en el catálogo porque son
tablas más del esquema y hay que poder contarlas, y no están en el diagrama del [§2](#2-diagrama-entidadrelación) por la misma
razón por la que sí pueden borrarse: no son entidades del taller, son mecanismos de transporte.

---

## 4. Esquema SQL

### 4.1 Tipos y convenciones comunes

```sql
CREATE EXTENSION IF NOT EXISTS citext;   -- requerido por usuarios.usuario

CREATE TYPE tipo_usuario    AS ENUM ('gerencia', 'operacion');
CREATE TYPE tipo_movimiento AS ENUM ('ingreso','gasto','transferencia','inversion',
                                     'aporte','retiro_prolabore','retiro_distribucion',
                                     'anticipo_recibido','adelanto_empleada');
CREATE TYPE estado_pedido   AS ENUM ('cotizado','en_proceso','parcial','entregado','cancelado');
CREATE TYPE tipo_item       AS ENUM ('producto','servicio');

-- Dominios: la regla vive una sola vez y todas las columnas del mismo concepto la heredan.
-- Cada restricción de dominio lleva nombre propio, igual que las de tabla (ver más abajo).

CREATE DOMAIN dinero AS BIGINT
  CONSTRAINT dinero_no_negativo CHECK (VALUE >= 0);

CREATE DOMAIN dinero_positivo AS BIGINT
  CONSTRAINT dinero_positivo_mayor_que_cero CHECK (VALUE > 0);

CREATE DOMAIN dinero_con_signo AS BIGINT;   -- resultados que sí pueden dar negativo

CREATE DOMAIN horas AS NUMERIC(6,2)
  CONSTRAINT horas_no_negativas CHECK (VALUE >= 0);

CREATE DOMAIN minutos AS NUMERIC(6,2)
  CONSTRAINT minutos_no_negativos CHECK (VALUE >= 0);

CREATE DOMAIN porcentaje AS SMALLINT
  CONSTRAINT porcentaje_entre_cero_y_cien CHECK (VALUE BETWEEN 0 AND 100);

CREATE DOMAIN anio AS SMALLINT
  CONSTRAINT anio_en_rango CHECK (VALUE BETWEEN 2020 AND 2100);

CREATE DOMAIN mes_del_anio AS SMALLINT
  CONSTRAINT mes_del_anio_en_rango CHECK (VALUE BETWEEN 1 AND 12);

CREATE DOMAIN motivo AS TEXT
  CONSTRAINT motivo_con_contenido CHECK (length(trim(VALUE)) >= 5);

-- Columnas de anulación presentes en TODAS las tablas de negocio
--   anulado_en           TIMESTAMPTZ
--   anulado_por          UUID REFERENCES usuarios(id)
--   anulado_motivo       motivo
--   anulado_dispositivo  TEXT
--   anulado_ip           INET
```

El ENUM antes se llamaba `rol_usuario`. Se renombró a `tipo_usuario` para que el vocabulario
del código coincida con el del negocio y deje de competir con la palabra «rol», que ahora se
confundiría con el **cargo**. Los dos valores siguen siendo exactamente los mismos.

> **El tipo dice qué puede ver. El cargo dice qué hace.** El tipo (`usuarios.tipo`) es lo que
> evalúa Row Level Security: es autoridad. El cargo (`usuarios.cargo_id`) es descriptivo y
> **nunca decide un permiso**.

`CITEXT` es el tipo de `usuarios.usuario` y viene de una extensión, no del núcleo de
PostgreSQL: sin `CREATE EXTENSION IF NOT EXISTS citext;` la tabla no se crea.

> **Convención de dinero.** Toda columna monetaria es `BIGINT` y guarda **pesos enteros**.
> `1.500.000` se almacena como `1500000`. Nunca decimales: el peso colombiano no usa centavos
> en la práctica y los errores de redondeo de punto flotante se acumulan de forma invisible.

**Por qué dominios y no un `CHECK` en cada columna.** El modelo tiene **32 columnas de dinero** y
solo **9** traían un `CHECK` escrito a mano. Las otras 23 quedaban a merced de que nadie
insertara un negativo. Ese es el problema de copiar la regla columna por columna: no es que
cueste escribirla, es que no hay forma de saber en cuáles falta. Con el dominio la regla vive en
un solo `CREATE DOMAIN` y la columna solo declara qué es; agregar una columna monetaria nueva ya
no requiere acordarse de nada.

Los dominios son además tipos de PostgreSQL, no comentarios: `ADR-003` deja de ser una convención
que hay que recordar y pasa a ser algo que el motor sabe.

| Dominio | Tipo base | Regla | Columnas | Dónde |
|---|---|---|:---:|---|
| `dinero` | `BIGINT` | `>= 0` | 22 | `cuentas.saldo_inicial`, `pedidos.costo_directo`, `pedido_lineas` (2), `productos.precio_actual`, `costos_producto` (4), `prolabore_config.valor_mensual`, `nomina_detalle` (6), `cierres_mensuales` (6) |
| `dinero_positivo` | `BIGINT` | `> 0` | 7 | `movimientos.valor`, `pedidos.valor_total`, `anticipos.valor`, `activos.valor_compra`, `aportes_retiros.valor`, `empleados.salario_acordado`, `adelantos.valor` |
| `dinero_con_signo` | `BIGINT` | ninguna | 3 | `cierres_mensuales.utilidad_causada`, `.flujo_caja`, `.caja_libre_cierre` |
| `horas` | `NUMERIC(6,2)` | `>= 0` | 5 | `pedidos.horas_trabajo`, `pedido_lineas.horas_unitarias`, `prolabore_config.horas_mensuales`, `empleados.horas_mensuales`, `nomina_detalle.horas_extra` |
| `minutos` | `NUMERIC(6,2)` | `>= 0` | 2 | `costos_producto.minutos_trabajo` y `.minutos_maquina` |
| `porcentaje` | `SMALLINT` | `0..100` | 5 | `pedidos.anticipo_pct`, los cuatro `pct_` de `sobres_config` |
| `anio` | `SMALLINT` | `2020..2100` | 2 | `nomina_periodos.anio`, `cierres_mensuales.anio` |
| `mes_del_anio` | `SMALLINT` | `1..12` | 2 | `nomina_periodos.mes`, `cierres_mensuales.mes` |
| `motivo` | `TEXT` | `length(trim(…)) >= 5` | 15 | los doce `anulado_motivo`, `usuarios.desactivado_motivo`, `pedidos.cancelado_motivo` ([4.11](08-plan-de-desarrollo.md#tarea-4-11)) y `auditoria.motivo` ([2.21](08-plan-de-desarrollo.md#tarea-2-21)) |

Son **nueve dominios**. Tres piden explicación, porque no son solo una mudanza de reglas ya
escritas:

- `dinero_con_signo` no lleva regla **a propósito**. Una utilidad causada negativa es un mes
  malo, no un error, y meterla en `dinero` habría hecho imposible cerrar ese mes. Existe igual
  porque declara «esto es plata en pesos enteros», que es lo que la API necesita saber para
  formatearla.
- `porcentaje` obliga a que cada sobre esté entre 0 y 100. Hasta ahora `sobres_config` solo
  exigía que los cuatro sumaran 100 (`suma_cien`), así que un `-20` compensado con un `120`
  pasaba sin chistar.
- `motivo` exige que la explicación diga algo. `NOT NULL` acepta un espacio en blanco, y una
  anulación con motivo `" "` cumple la restricción y no explica nada, que es justo lo que el
  modelo quiere impedir.

`anio` con tope 2100 no pretende adivinar el futuro: ataja el dedo que teclea `202` o `20255` al
cerrar un mes, que es lo único que un `SMALLINT` pelado no sabía rechazar.

**Toda restricción lleva nombre explícito.** No es estética: a la restricción que no trae nombre
se lo pone PostgreSQL, y las de tabla las numera por posición —`pedidos_check`, `pedidos_check1`—
así que basta agregar otra restricción para que las siguientes cambien de nombre. Sobre nombres
que se mueven no se puede construir la tabla de traducción a mensajes en español del [§11](#11-el-contrato-de-errores): el
mensaje quedaría colgado del nombre equivocado sin que nada lo avise.

| Clase | Patrón | Ejemplo |
|---|---|---|
| Llave primaria | `<tabla>_pkey` | `usuarios_pkey` |
| Llave foránea | `<tabla>_<columna>_fkey` | `cargos_creado_por_fkey` |
| Unicidad | `<tabla>_<columnas>_key` | `nomina_periodos_anio_mes_key` |
| `CHECK` de tabla | frase que dice la regla | `transferencia_con_destino` |
| `CHECK` de dominio | `<dominio>_<regla>` | `dinero_no_negativo` |

Los patrones de llave primaria y foránea son **los mismos que PostgreSQL genera solo**, así que
escribirlos no renombra nada de lo que ya existe; se escriben para que el nombre sea una decisión
y no una casualidad. Las que de verdad cambiaban —y por eso eran el riesgo— son los `CHECK` y los
`UNIQUE`, y esas quedaron todas nombradas en los `CREATE TABLE` de abajo.

### 4.2 Cargos, usuarios y cuentas

```sql
CREATE TABLE cargos (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre         CITEXT NOT NULL CONSTRAINT cargos_nombre_key UNIQUE,   -- tarea 2.22
  descripcion    TEXT,
  orden          SMALLINT NOT NULL DEFAULT 0,
  activo         BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  creado_por     UUID,   -- llave foránea a usuarios: se agrega más abajo
  anulado_en     TIMESTAMPTZ,
  anulado_por    UUID,   -- ídem
  anulado_motivo motivo,
  CONSTRAINT anulacion_con_motivo
    CHECK (anulado_en IS NULL OR (anulado_por IS NOT NULL AND anulado_motivo IS NOT NULL)),
  CONSTRAINT desactivacion_con_motivo
    CHECK (activo OR anulado_en IS NOT NULL)
);
```

Un cargo **nunca se borra**: se desactiva con motivo, igual que el resto del modelo. Así los
usuarios históricos que lo tuvieron conservan sentido.

`cargos` tiene dos maneras de decir «inactivo»: `activo` y `anulado_en`. La restricción
`desactivacion_con_motivo` las amarra. Sin ella se podía apagar un cargo dejando `anulado_en`
vacío, y el `CHECK` de motivo —que solo se activa cuando hay `anulado_en`— no se enteraba: un
cargo desactivado sin explicación, justo lo que el modelo no permite en ninguna otra tabla.

**`nombre` es `CITEXT` y no `TEXT`**, por lo mismo que `usuarios.usuario`: el contrato responde
`42214` cuando un cargo se crea o se renombra con el nombre de otro **sin distinguir mayúsculas**
([20 §3](20-contrato-de-api.md#3-el-catálogo)), y con `TEXT` «Domiciliaria» y «domiciliaria» son dos cargos distintos. Se
resuelve con el tipo y no con un índice sobre `lower(nombre)` para **conservar el nombre
`cargos_nombre_key`**, del que ya cuelga ese código en la tabla de traducción de la API ([§11](#11-el-contrato-de-errores)).

**Y un cargo que todavía tienen personas activas no se desactiva.** Es el `40911` del contrato, y
lo impone `tg_proteger_cargo_con_personas`, un trigger `BEFORE UPDATE` sobre `cargos` que dispara
cuando `activo` pasa de `TRUE` a `FALSE` y existe alguna fila activa de `usuarios` con ese
`cargo_id`. Va en la base y no en la API por lo mismo que los otros tres guardianes de [§7](#7-seguridad-por-tipo-de-usuario-rls): un
`UPDATE` directo se la saltaría. Como no es una restricción con nombre sino un `RAISE EXCEPTION`,
la API lo reconoce por su texto, igual que `tg_proteger_ultima_gerencia` ([§11](#11-el-contrato-de-errores)).

`cargos` y `usuarios` se referencian mutuamente. Por eso `cargos` se crea **sin** las dos llaves
foráneas hacia `usuarios` y se agregan con `ALTER TABLE` en cuanto `usuarios` existe. Dejarlas
escritas dentro del `CREATE TABLE` hace fallar el script completo: en ese punto `usuarios`
todavía no está creada.

El catálogo arranca con seis cargos y Gerencia lo administra desde el sistema:

```sql
INSERT INTO cargos (nombre, descripcion, orden) VALUES
  ('Gerente',                  'Dirige el negocio y toma las decisiones financieras', 1),
  ('Empleada de producción',   'Estampado, corte, sublimación y terminado',           2),
  ('Domiciliaria',             'Entregas a cliente y mensajería',                     3),
  ('Asistente administrativa', 'Atención, cotizaciones y registro de movimientos',    4),
  ('Aprendiz SENA',            'Etapa productiva con apoyo en producción',            5),
  ('Contratista externo',      'Servicios puntuales facturados, sin nómina',          6);
```

```sql
CREATE TABLE usuarios (
  id                 UUID PRIMARY KEY REFERENCES auth.users(id),
  usuario            CITEXT NOT NULL
                       CONSTRAINT usuarios_usuario_key UNIQUE
                       CONSTRAINT usuarios_usuario_formato
                         CHECK (usuario ~ '^[a-z0-9][a-z0-9._-]{2,19}$'),
  nombre_completo    TEXT NOT NULL
                       CONSTRAINT usuarios_nombre_completo_minimo
                         CHECK (length(trim(nombre_completo)) >= 3),
  cargo_id           UUID REFERENCES cargos(id),
  tipo               tipo_usuario NOT NULL DEFAULT 'operacion',
  activo             BOOLEAN NOT NULL DEFAULT TRUE,
  debe_cambiar_clave BOOLEAN NOT NULL DEFAULT TRUE,
  ultimo_acceso      TIMESTAMPTZ,
  creado_en          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  creado_por         UUID REFERENCES usuarios(id),
  desactivado_en     TIMESTAMPTZ,
  desactivado_por    UUID REFERENCES usuarios(id),
  desactivado_motivo motivo,
  CONSTRAINT desactivacion_con_motivo
    CHECK (activo OR (desactivado_en         IS NOT NULL
                      AND desactivado_por    IS NOT NULL
                      AND desactivado_motivo IS NOT NULL))
);

CREATE INDEX idx_usuarios_tipo ON usuarios (tipo) WHERE activo;

-- Ya existe `usuarios`: se cierran las dos llaves foráneas que quedaron pendientes en `cargos`.
ALTER TABLE cargos
  ADD CONSTRAINT cargos_creado_por_fkey  FOREIGN KEY (creado_por)  REFERENCES usuarios(id),
  ADD CONSTRAINT cargos_anulado_por_fkey FOREIGN KEY (anulado_por) REFERENCES usuarios(id);
```

La restricción exige también `desactivado_en`, no solo el motivo y el autor. Sin esa condición
se podía marcar a alguien inactivo sin dejar la hora, y una desactivación sin fecha no se puede
cruzar con la bitácora.

> **`desactivado_en / _por / _motivo` son el estado actual, no la historia.** Responden «¿por qué
> está inactiva **hoy**?». Al reactivar a alguien, las tres columnas se limpian y
> `debe_cambiar_clave` vuelve a `TRUE`. A primera vista parece que se pierde información, y no se
> pierde nada: la desactivación, con su fecha, su autor y su motivo, quedó escrita en `auditoria`,
> y de ahí no la borra nadie ([§5.4](#54-auditoría-por-triggers)). La ficha dice **cómo está** la persona; la bitácora dice
> **qué le ha pasado**. Quien mezcle las dos preguntas termina duplicando la historia en `usuarios`.

> **`CITEXT` y el `CHECK` no hacen lo mismo, y conviene saberlo.** `CITEXT` vuelve insensible a
> mayúsculas la comparación y el `UNIQUE`: `Maria` y `maria` no pueden coexistir, y buscar
> `Maria` al iniciar sesión encuentra la fila guardada como `maria`. El operador `~` del `CHECK`
> sí distingue mayúsculas —`citext` no lo redefine, se compara como texto plano—, así que
> `^[a-z0-9]…` obliga a **guardar** el usuario en minúsculas. Es lo que queremos, pero implica
> que la aplicación normaliza antes de insertar: si manda `Maria`, la fila se rechaza en vez de
> corregirse sola.

El orden de creación importa en dos sitios más del esquema, por cómo están escritas las tablas:
`movimientos.pedido_id → pedidos` ([§4.3](#43-movimientos--el-libro-único), pero `pedidos` se crea en [§4.4](#44-pedidos-líneas-y-anticipos)) y
`pedido_lineas.producto_id → productos` ([§4.4](#44-pedidos-líneas-y-anticipos), pero `productos` se crea en [§4.5](#45-productos-costeo-y-cotizaciones)). En el script
real esas dos llaves también se agregan con `ALTER TABLE` al final.

Qué cambió frente a la versión anterior y por qué:

| Antes | Ahora | Por qué |
|---|---|---|
| `nombre TEXT NOT NULL` | `nombre_completo TEXT NOT NULL` | El nombre completo es un dato distinto del usuario de acceso; el nombre a secas se confundía con el identificador |
| — | `usuario CITEXT UNIQUE` | Es con lo que se inicia sesión. `CITEXT` para que `Maria` y `maria` sean la misma persona |
| `rol rol_usuario` | `tipo tipo_usuario` | El vocabulario del código ahora coincide con el del negocio |
| — | `cargo_id UUID REFERENCES cargos(id)` | El cargo dentro de la operación |
| — | `debe_cambiar_clave` | Fuerza el cambio en el primer ingreso y tras un restablecimiento |
| — | `ultimo_acceso` | Permite a Gerencia ver quién dejó de entrar |
| — | `desactivado_en / _por / _motivo` | Un usuario no se borra: se desactiva con motivo |

**`usuarios` y `empleados` son tablas distintas, y eso es deliberado.**

| Tabla | Quién es | Puede no tener |
|---|---|---|
| `usuarios` | Quien **entra al sistema** | Estar en nómina (un contratista externo) |
| `empleados` | Quien **está en nómina** | Tener acceso (alguien que no usa el sistema) |

`empleados.usuario_id` las conecta cuando la misma persona es ambas cosas. El cargo vive en
`usuarios` porque describe a la persona dentro de la operación, no su liquidación; `empleados`
conserva lo suyo: salario, fecha de ingreso y horas mensuales.

> **Redundancia aceptada.** Si una empleada tiene acceso, su nombre aparece dos veces:
> `usuarios.nombre_completo` y `empleados.nombre`. Se acepta porque las dos tablas tienen
> ciclos de vida independientes. La fuente de verdad para la nómina es `empleados.nombre`;
> para la sesión, `usuarios.nombre_completo`.

```sql
CREATE TABLE cuentas (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        TEXT NOT NULL,
  tipo          TEXT NOT NULL CONSTRAINT cuentas_tipo_valido
                  CHECK (tipo IN ('efectivo','billetera','banco')),
  saldo_inicial dinero NOT NULL DEFAULT 0,
  orden         SMALLINT NOT NULL DEFAULT 0,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  anulado_en    TIMESTAMPTZ,
  anulado_por   UUID REFERENCES usuarios(id),
  anulado_motivo motivo,
  CONSTRAINT anulacion_con_motivo
    CHECK (anulado_en IS NULL OR (anulado_por IS NOT NULL AND anulado_motivo IS NOT NULL))
);

CREATE TABLE categorias (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  padre_id      UUID REFERENCES categorias(id),
  nombre        TEXT NOT NULL,
  naturaleza    TEXT NOT NULL CONSTRAINT categorias_naturaleza_valida
                  CHECK (naturaleza IN ('ingreso','gasto')),
  es_fijo       BOOLEAN NOT NULL DEFAULT FALSE,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  anulado_en    TIMESTAMPTZ,
  anulado_por   UUID REFERENCES usuarios(id),
  anulado_motivo motivo
);
```

`es_fijo` marca las categorías de gasto fijo mensual (arriendo, servicios, internet), que se
usan para calcular la **caja libre**.

### 4.3 Movimientos — el libro único

```sql
CREATE TABLE movimientos (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo              tipo_movimiento NOT NULL,
  valor             dinero_positivo NOT NULL,
  fecha_movimiento  DATE NOT NULL,
  cuenta_id         UUID NOT NULL REFERENCES cuentas(id),
  cuenta_destino_id UUID REFERENCES cuentas(id),
  categoria_id      UUID REFERENCES categorias(id),
  pedido_id         UUID REFERENCES pedidos(id),
  descripcion       TEXT,
  corrige_a_id      UUID REFERENCES movimientos(id),

  creado_por        UUID NOT NULL REFERENCES usuarios(id),
  creado_en         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  dispositivo       TEXT,
  ip                INET,

  anulado_en        TIMESTAMPTZ,
  anulado_por       UUID REFERENCES usuarios(id),
  anulado_motivo    motivo,
  anulado_dispositivo TEXT,
  anulado_ip        INET,

  -- tarea 3.15: el día de Bogotá, no el del huso con que se conecte la sesión
  CONSTRAINT fecha_no_futura
    CHECK (fecha_movimiento <= (NOW() AT TIME ZONE 'America/Bogota')::date),
  CONSTRAINT transferencia_con_destino
    CHECK (tipo <> 'transferencia' OR cuenta_destino_id IS NOT NULL),
  CONSTRAINT destino_solo_en_transferencia                                   -- tarea 3.15
    CHECK (tipo = 'transferencia' OR cuenta_destino_id IS NULL),
  CONSTRAINT destino_distinto_del_origen                                     -- tarea 3.15
    CHECK (cuenta_destino_id IS NULL OR cuenta_destino_id <> cuenta_id),
  CONSTRAINT anulacion_con_motivo
    CHECK (anulado_en IS NULL OR (anulado_por IS NOT NULL AND anulado_motivo IS NOT NULL))
);

CREATE INDEX idx_mov_fecha     ON movimientos (fecha_movimiento DESC)
  WHERE anulado_en IS NULL;
CREATE INDEX idx_mov_cuenta    ON movimientos (cuenta_id, fecha_movimiento DESC)
  WHERE anulado_en IS NULL;
CREATE INDEX idx_mov_tipo      ON movimientos (tipo, fecha_movimiento DESC)
  WHERE anulado_en IS NULL;
CREATE INDEX idx_mov_pedido    ON movimientos (pedido_id) WHERE pedido_id IS NOT NULL;
```

**El campo `tipo` es la clave de todo el modelo financiero.** Determina si el movimiento afecta
la utilidad, la caja, el patrimonio o ninguno:

| `tipo` | ¿Afecta utilidad? | ¿Afecta caja? | ¿Afecta patrimonio? |
|---|:---:|:---:|:---:|
| `ingreso` | ✅ sube | ✅ sube | ✅ sube |
| `gasto` | ✅ baja | ✅ baja | ✅ baja |
| `transferencia` | ❌ | ↔ neutra | ❌ |
| `inversion` | ❌ | ✅ baja | ❌ cambia forma |
| `aporte` | ❌ | ✅ sube | ✅ sube |
| `retiro_prolabore` | ✅ **baja** | ✅ baja | ✅ baja |
| `retiro_distribucion` | ❌ | ✅ baja | ✅ baja |
| `anticipo_recibido` | ❌ | ✅ sube | ❌ crea pasivo |
| `adelanto_empleada` | ❌ | ✅ baja | ❌ crea por cobrar |

> Esta tabla es la traducción exacta de las reglas [RN-03](03-requisitos-y-bdd.md#rn-03) a [RN-11](03-requisitos-y-bdd.md#rn-11). Cualquier duda sobre cómo
> registrar algo se responde aquí.

**Las tres reglas de la cuenta de destino son tres restricciones, y las tres responden `42226`.**
`transferencia_con_destino` exige el destino cuando el tipo lo pide; `destino_solo_en_transferencia`
lo prohíbe cuando no; y `destino_distinto_del_origen` impide la transferencia de una cuenta a sí
misma, que además **bajaba el saldo** en `v_saldos_cuenta` ([§6](#6-vistas-de-cálculo-financiero)), porque la vista resta la salida y
suma la entrada por separado. Las tres son la misma pregunta sobre el mismo campo, así que comparten
código y lo que cambia es el texto de `data.errores`. El dominio de la API ya las rechazaba las tres;
hasta la tarea [3.15](08-plan-de-desarrollo.md#tarea-3-15) las dos últimas dependían de que se preguntara por la API, que es lo que
[ADR-015](adr/ADR-015-validacion-tres-capas.md) no acepta como única defensa.

**`fecha_no_futura` compara contra el día de Bogotá y no contra `CURRENT_DATE`.** `CURRENT_DATE` es
el día del huso con que esté conectada la sesión, así que una conexión en UTC acepta desde las 19:00
un movimiento fechado mañana. La zona del negocio es del modelo y no de la configuración ([RNF-08](03-requisitos-y-bdd.md#rnf-08)),
y es la misma que el dominio usa para decidir a qué día —y con eso a qué mes— pertenece un registro.
Responde `42223`.

### 4.4 Pedidos, líneas y anticipos

```sql
CREATE TABLE clientes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre      TEXT NOT NULL,
  telefono    TEXT,
  correo      TEXT,
  notas       TEXT,
  creado_en   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  anulado_en  TIMESTAMPTZ,
  anulado_por UUID REFERENCES usuarios(id),
  anulado_motivo motivo
);

CREATE TABLE pedidos (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero             TEXT NOT NULL CONSTRAINT pedidos_numero_key UNIQUE,
  cliente_id         UUID NOT NULL REFERENCES clientes(id),
  fecha_pedido       DATE NOT NULL,
  fecha_entrega_prev DATE,
  fecha_entrega_real DATE,
  estado             estado_pedido NOT NULL DEFAULT 'en_proceso',
  valor_total        dinero_positivo NOT NULL,
  costo_directo      dinero NOT NULL DEFAULT 0,
  anticipo_pct       porcentaje NOT NULL DEFAULT 50,
  horas_trabajo      horas NOT NULL DEFAULT 0,
  notas              TEXT,
  creado_por         UUID NOT NULL REFERENCES usuarios(id),
  creado_en          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  anulado_en         TIMESTAMPTZ,
  anulado_por        UUID REFERENCES usuarios(id),
  anulado_motivo     motivo,
  -- tarea 4.11: la cancelación, que no es la anulación
  cancelado_en       TIMESTAMPTZ,
  cancelado_por      UUID REFERENCES usuarios(id),
  cancelado_motivo   motivo,
  destino_del_anticipo TEXT CONSTRAINT destino_del_anticipo_valido
                         CHECK (destino_del_anticipo IN ('devolucion','ingreso')),
  CONSTRAINT entregado_con_fecha
    CHECK (estado <> 'entregado' OR fecha_entrega_real IS NOT NULL),
  CONSTRAINT cancelacion_con_motivo                                          -- tarea 4.11
    CHECK (estado <> 'cancelado' OR (cancelado_en      IS NOT NULL
                                 AND cancelado_por     IS NOT NULL
                                 AND cancelado_motivo  IS NOT NULL))
);

CREATE INDEX idx_pedidos_fecha  ON pedidos (fecha_pedido DESC) WHERE anulado_en IS NULL;
CREATE INDEX idx_pedidos_estado ON pedidos (estado, fecha_pedido DESC) WHERE anulado_en IS NULL;

CREATE TABLE pedido_lineas (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id      UUID NOT NULL REFERENCES pedidos(id),
  producto_id    UUID NOT NULL REFERENCES productos(id),
  cantidad       INTEGER NOT NULL CONSTRAINT pedido_lineas_cantidad_positiva
                   CHECK (cantidad > 0),
  precio_unitario dinero NOT NULL,
  costo_unitario dinero NOT NULL DEFAULT 0,
  horas_unitarias horas NOT NULL DEFAULT 0
);

CREATE TABLE anticipos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id     UUID NOT NULL REFERENCES pedidos(id),
  movimiento_id UUID NOT NULL REFERENCES movimientos(id),
  valor         dinero_positivo NOT NULL,
  fecha         DATE NOT NULL,
  devengado_en  DATE,
  anulado_en    TIMESTAMPTZ,
  anulado_por   UUID REFERENCES usuarios(id),
  anulado_motivo motivo
);

CREATE INDEX idx_anticipos_pendientes ON anticipos (pedido_id)
  WHERE devengado_en IS NULL AND anulado_en IS NULL;
```

`devengado_en IS NULL` identifica los **anticipos por devengar**: la plata que está en la cuenta
pero todavía no es del negocio. Es el insumo directo del cálculo de caja libre.

**Cancelar no es anular, y por eso son columnas distintas.** Anular es sacar de las cuentas un
registro que no debió existir ([RN-13](03-requisitos-y-bdd.md#rn-13)); cancelar es un paso del pedido, el que dice que el trabajo
no se va a hacer, y arrastra una pregunta que solo existe ahí: **qué pasó con el anticipo ya
cobrado** ([RF-26](03-requisitos-y-bdd.md#rf-26), [CU-07](02-casos-de-uso.md#cu-07) A3). Si compartieran las columnas `anulado_*`, un pedido cancelado y luego
anulado perdería una de las dos historias. `cancelacion_con_motivo` amarra el estado con las tres
columnas, como `desactivacion_con_motivo` hace en `usuarios`: no hay cancelación muda.

`destino_del_anticipo` es un `TEXT` con `CHECK` y no un ENUM, como `aportes_retiros.clase`: los ENUM
de este modelo son los que viajan por varias tablas —`tipo_movimiento`, `estado_pedido`,
`tipo_item`, `tipo_usuario`—, y de un ENUM no se quita un valor. Queda en `NULL` cuando el pedido no
tenía anticipos por devengar, que es cuando el contrato dice que el campo «sobra»; que sea
obligatorio o no **depende del pedido y no del campo**, así que eso lo comprueba la API y responde
`42235`, no la base.

### 4.5 Productos, costeo y cotizaciones

```sql
CREATE TABLE productos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        TEXT NOT NULL,
  tipo          tipo_item NOT NULL DEFAULT 'producto',
  unidad        TEXT NOT NULL DEFAULT 'unidad',
  precio_actual dinero NOT NULL DEFAULT 0,
  activo        BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  anulado_en    TIMESTAMPTZ,
  anulado_por   UUID REFERENCES usuarios(id),
  anulado_motivo motivo
);

CREATE TABLE costos_producto (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id        UUID NOT NULL REFERENCES productos(id),
  vigente_desde      DATE NOT NULL,
  costo_insumo       dinero NOT NULL DEFAULT 0,
  costo_consumibles  dinero NOT NULL DEFAULT 0,
  minutos_trabajo    minutos NOT NULL DEFAULT 0,
  minutos_maquina    minutos NOT NULL DEFAULT 0,
  tarifa_hora        dinero NOT NULL DEFAULT 0,
  precio_venta       dinero NOT NULL DEFAULT 0,
  creado_por         UUID NOT NULL REFERENCES usuarios(id),
  creado_en          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_costos_vigencia ON costos_producto (producto_id, vigente_desde DESC);
```

El costo unitario nunca se sobrescribe: cada cambio crea una fila nueva con su fecha de
vigencia. Así un pedido antiguo conserva el costo que tenía cuando se produjo.

`minutos_maquina` es lo que permite costear el **bordado** por tiempo de máquina en lugar de
por unidad de producto.

### 4.6 Inversiones, capital y pro-labore

```sql
CREATE TABLE activos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre          TEXT NOT NULL,
  fecha_compra    DATE NOT NULL,
  valor_compra    dinero_positivo NOT NULL,
  vida_util_meses SMALLINT,
  movimiento_id   UUID REFERENCES movimientos(id),
  estado          TEXT NOT NULL DEFAULT 'en_uso',
  anulado_en      TIMESTAMPTZ,
  anulado_por     UUID REFERENCES usuarios(id),
  anulado_motivo  motivo
);

CREATE TABLE aportes_retiros (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clase          TEXT NOT NULL CONSTRAINT aportes_retiros_clase_valida
                   CHECK (clase IN ('aporte','prolabore','distribucion')),
  valor          dinero_positivo NOT NULL,
  fecha          DATE NOT NULL,
  movimiento_id  UUID NOT NULL REFERENCES movimientos(id),
  nota           TEXT,
  anulado_en     TIMESTAMPTZ,
  anulado_por    UUID REFERENCES usuarios(id),
  anulado_motivo motivo
);

CREATE TABLE prolabore_config (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vigente_desde  DATE NOT NULL,
  valor_mensual  dinero NOT NULL,
  horas_mensuales horas NOT NULL DEFAULT 0,
  justificacion  TEXT,
  creado_por     UUID NOT NULL REFERENCES usuarios(id),
  creado_en      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

`clase` separa los tres conceptos que hoy se confunden en uno solo: **aporte** de capital,
**pro-labore** (gasto) y **distribución** de utilidades (no gasto).

### 4.7 Personal y nómina

```sql
CREATE TABLE empleados (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id       UUID CONSTRAINT empleados_usuario_id_key UNIQUE
                     REFERENCES usuarios(id),
  nombre           TEXT NOT NULL,
  documento        TEXT,
  fecha_ingreso    DATE NOT NULL,
  fecha_retiro     DATE,
  salario_acordado dinero_positivo NOT NULL,
  horas_mensuales  horas NOT NULL DEFAULT 192,
  anulado_en       TIMESTAMPTZ,
  anulado_por      UUID REFERENCES usuarios(id),
  anulado_motivo   motivo
);

CREATE TABLE nomina_periodos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anio        anio NOT NULL,
  mes         mes_del_anio NOT NULL,
  cerrado_en  TIMESTAMPTZ,
  cerrado_por UUID REFERENCES usuarios(id),
  CONSTRAINT nomina_periodos_anio_mes_key UNIQUE (anio, mes)
);

CREATE TABLE nomina_detalle (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periodo_id        UUID NOT NULL REFERENCES nomina_periodos(id),
  empleado_id       UUID NOT NULL REFERENCES empleados(id),
  dias_trabajados   SMALLINT NOT NULL DEFAULT 30,
  salario_base      dinero NOT NULL,
  horas_extra       horas NOT NULL DEFAULT 0,
  valor_horas_extra dinero NOT NULL DEFAULT 0,
  otros_devengados  dinero NOT NULL DEFAULT 0,
  adelantos_desc    dinero NOT NULL DEFAULT 0,
  otros_descuentos  dinero NOT NULL DEFAULT 0,
  neto_pagado       dinero NOT NULL,
  movimiento_id     UUID REFERENCES movimientos(id),
  creado_por        UUID NOT NULL REFERENCES usuarios(id),
  creado_en         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT nomina_detalle_periodo_empleado_key UNIQUE (periodo_id, empleado_id)
);

CREATE TABLE adelantos (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empleado_id    UUID NOT NULL REFERENCES empleados(id),
  movimiento_id  UUID NOT NULL REFERENCES movimientos(id),
  valor          dinero_positivo NOT NULL,
  fecha          DATE NOT NULL,
  descontado_en  UUID REFERENCES nomina_detalle(id),
  anulado_en     TIMESTAMPTZ,
  anulado_por    UUID REFERENCES usuarios(id),
  anulado_motivo motivo
);

CREATE INDEX idx_adelantos_pendientes ON adelantos (empleado_id)
  WHERE descontado_en IS NULL AND anulado_en IS NULL;
```

`empleados.usuario_id` es `UNIQUE`. El diagrama del [§2](#2-diagrama-entidadrelación) dibuja `USUARIOS ||--o| EMPLEADOS`, o sea
«cero o una»; sin el `UNIQUE` el SQL permitía dos empleados colgados del mismo usuario y el
desprendible de nómina se le mostraba a la persona equivocada.

`descontado_en IS NULL` identifica los adelantos aún no descontados: la cuenta por cobrar viva.
El índice parcial garantiza que **un adelanto se descuente una sola vez** ([RN-11](03-requisitos-y-bdd.md#rn-11)).

### 4.8 Sobres y cierres

```sql
CREATE TABLE sobres_config (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vigente_desde     DATE NOT NULL,
  pct_costo_directo porcentaje NOT NULL,
  pct_gastos_fijos  porcentaje NOT NULL,
  pct_reserva       porcentaje NOT NULL,
  pct_retiro        porcentaje NOT NULL,
  creado_por        UUID NOT NULL REFERENCES usuarios(id),
  creado_en         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT suma_cien CHECK (
    pct_costo_directo + pct_gastos_fijos + pct_reserva + pct_retiro = 100)
);

CREATE TABLE cierres_mensuales (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anio               anio NOT NULL,
  mes                mes_del_anio NOT NULL,
  ingresos_causados  dinero NOT NULL,
  costos_directos    dinero NOT NULL,
  gastos_operativos  dinero NOT NULL,
  prolabore          dinero NOT NULL,
  nomina             dinero NOT NULL,
  utilidad_causada   dinero_con_signo NOT NULL,
  flujo_caja         dinero_con_signo NOT NULL,
  caja_libre_cierre  dinero_con_signo NOT NULL,
  anticipos_abiertos dinero NOT NULL,
  cerrado_por        UUID NOT NULL REFERENCES usuarios(id),
  cerrado_en         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cierres_mensuales_anio_mes_key UNIQUE (anio, mes)
);
```

La restricción `suma_cien` impide guardar una configuración de sobres que no reparta
exactamente el 100%. Los porcentajes son **parametrizables** y cada cambio crea una fila nueva
con su fecha de vigencia: el historial queda completo. El dominio `porcentaje` ([§4.1](#41-tipos-y-convenciones-comunes)) cubre el
otro lado de la misma regla: `suma_cien` vigila el total, el dominio vigila cada sobre por
separado, y hacen falta los dos.

Las tres columnas de `cierres_mensuales` que llevan `dinero_con_signo` —utilidad causada, flujo
de caja y caja libre— son las únicas del modelo que pueden dar negativo. Un mes en pérdida es un
resultado, no un error de digitación, y la base no tiene por qué impedir guardarlo.

`cierres_mensuales` es el **snapshot inmutable** que garantiza [RN-16](03-requisitos-y-bdd.md#rn-16): un movimiento registrado
tarde con fecha de un mes ya cerrado no altera el reporte histórico de ese mes.

### 4.9 Claves de idempotencia

Toda petición que escribe llega con una clave de idempotencia ([RNF-27](03-requisitos-y-bdd.md#rnf-27)). La base la guarda junto
con la huella de esa petición y con la respuesta que se devolvió, para que un reintento devuelva
lo mismo en vez de volver a registrar el gasto.

```sql
CREATE TABLE peticiones_idempotentes (
  clave      UUID PRIMARY KEY,
  huella     TEXT NOT NULL,
  usuario_id UUID NOT NULL REFERENCES usuarios(id),
  estado     TEXT NOT NULL CONSTRAINT peticiones_idempotentes_estado_valido
               CHECK (estado IN ('en_curso','terminada')),
  status     INTEGER,
  respuesta  JSONB,
  creado_en  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expira_en  TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_idem_expira ON peticiones_idempotentes (expira_en);
```

`huella` es el hash del método, la ruta, el cuerpo y el usuario. Sirve para distinguir el
reintento legítimo —misma clave, misma huella: se devuelve `respuesta` sin ejecutar nada— del
cliente que reutilizó una clave para otra cosa, que es un error suyo y se rechaza.

> **La fila de la clave y el efecto de la operación se escriben en la MISMA transacción.** Si se
> guardaran por separado, un corte entre las dos escrituras dejaría el sistema justo en el estado
> que la idempotencia prometía evitar: el gasto registrado sin rastro de su clave, o la clave
> anotada sin el gasto.

`clave` es la llave primaria y eso hace el trabajo pesado de la concurrencia: dos peticiones
simultáneas con la misma clave no compiten, porque la segunda se queda esperando en el índice
único hasta que la primera confirme o se caiga. `status` y `respuesta` quedan nulos mientras
`estado = 'en_curso'`, que es exactamente lo que significa ese estado: todavía no hay nada que
repetir.

La tabla **no lleva columnas de anulación ni trigger de auditoría** ([§5.4](#54-auditoría-por-triggers)), y no es un olvido:
auditar quién reintentó una petición no le dice nada a nadie, y el cambio que esa petición
provocó ya quedó auditado en su propia tabla.

**Retención: 72 horas.** Alcanzan para cubrir un fin de semana sin señal, que es el peor caso
real del taller. Pasadas, la fila se borra.

> **Aquí sí se borra, y es la única excepción de todo el modelo.** No contradice a
> [`ADR-004`](adr/ADR-004-base-solo-escritura.md): «nada se borra» protege la **información del
> negocio**, y una clave de idempotencia no lo es. Es un mecanismo de transporte con fecha de
> caducidad. El gasto, el pedido o la nómina que esa clave hizo posibles se quedan donde
> siempre, intactos y auditados; lo que se va es el comprobante de que el mensaje llegó.

Hay que decirlo con todas las letras porque el [§5.1](#51-revocación-real-del-borrado) revoca `DELETE` en el motor, y quien lea esa
revocación junto a esta purga va a pensar que una de las dos está mal. No lo está: la purga no
pasa por ahí.

```sql
-- pg_cron se habilita una sola vez por ambiente, desde el panel de Supabase o con esta línea
-- ejecutada por el rol de migraciones. Es lo que agenda la purga dentro de la propia base.
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- La purga corre como el rol de migraciones, no como la aplicación. Es dueño de la tabla y es
-- el único rol del proyecto con BYPASSRLS (§7.1 y §9), así que atraviesa el FORCE ROW LEVEL
-- SECURITY de la tabla y no necesita una política de DELETE escrita para él.
SELECT cron.schedule(
  'purgar_peticiones_idempotentes',
  '20 3 * * *',
  $cron$ DELETE FROM peticiones_idempotentes WHERE expira_en < NOW() $cron$
);
```

**Qué permisos hacen falta, y cuáles no.** Ninguno nuevo. `authenticated` y `prisma_api` siguen
sin `DELETE` sobre ninguna tabla del esquema, esta incluida: el `REVOKE` global del [§5.1](#51-revocación-real-del-borrado) y el
del [§9](#9-el-rol-con-el-que-se-conecta-la-api) se quedan exactamente como están, y el `ALTER DEFAULT PRIVILEGES` de los dos sigue
cubriendo la tabla nueva sin tocar nada. Conceder `DELETE` sobre esta tabla al rol de la API
sería el error: le abriría el borrado a quien atiende peticiones de usuario para resolver una
tarea de mantenimiento que ocurre de madrugada y sin nadie conectado.

Si la purga se cae y nadie se entera, no se pierde información ni se rompe la idempotencia: la
tabla crece y ya. Cada fila trae su `expira_en`, y la API ignora las vencidas sin importar si
siguen ahí. Es una tarea de higiene, no de corrección.

### 4.10 Los nonce vistos

El canal firmado de [`ADR-021`](adr/ADR-021-canal-firmado.md) rechaza una petición cuyo nonce ya
se procesó dentro de la ventana de cinco minutos. Para eso hay que recordar los nonce, y ese
registro **vive aquí, no en la memoria de la API**.

> **En memoria funcionaría hoy y dejaría de funcionar el día que crezca, sin avisar.** Con una
> sola instancia de la API alcanza; con dos, el reenvío que caiga en la instancia que no vio el
> nonce **pasa**. Es el mismo modo de fallo que hace peligroso conectar la API con la clave de
> servicio: no se rompe nada, simplemente deja de proteger.

```sql
CREATE TABLE nonces_vistos (
  nonce      UUID PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES usuarios(id),
  visto_en   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expira_en  TIMESTAMPTZ NOT NULL CONSTRAINT nonces_vistos_vence_despues
               CHECK (expira_en > visto_en)
);

CREATE INDEX idx_nonces_expira ON nonces_vistos (expira_en);
```

`nonce` es la llave primaria y ahí está toda la defensa: el segundo intento con el mismo nonce
choca contra el índice único y se rechaza con `40103`, sin necesidad de consultar primero. Dos
peticiones simultáneas con el mismo nonce no compiten: una entra y la otra falla, que es
exactamente lo que se quiere.

Como la de idempotencia, **no lleva columnas de anulación ni trigger de auditoría** ([§5.4](#54-auditoría-por-triggers)):
auditar qué nonce se vio no le dice nada a nadie.

**Retención: la ventana de la firma, cinco minutos**, con margen. Fuera de ella la marca de
tiempo ya rechaza la petición por su cuenta, así que recordar el nonce deja de servir para nada.
La purga corre con la misma tarea programada y el mismo rol que la de idempotencia:

```sql
SELECT cron.schedule(
  'purgar_nonces_vistos',
  '*/10 * * * *',
  $cron$ DELETE FROM nonces_vistos WHERE expira_en < NOW() $cron$
);
```

> **Esta es la segunda y última tabla de la que sí se borran filas**, por la misma razón que la
> primera: no es información del negocio, es un mecanismo de transporte con fecha de caducidad.
> [`ADR-004`](adr/ADR-004-base-solo-escritura.md) protege lo que el taller necesita recordar, y
> el comprobante de que un mensaje llegó una sola vez no es eso.

Aquí la purga sí es de corrección y no solo de higiene, y conviene notar la diferencia: se ejecuta
cada diez minutos, no una vez al día, porque una tabla que recibe una fila por petición y solo
necesita recordarlas cinco minutos crece rápido si nadie la limpia.

### 4.11 Las sesiones abiertas

La tercera y última tabla que no es del negocio, y la que faltaba para que el canal firmado
existiera de los dos lados. Al iniciar sesión, la API genera una **clave de firma** y se la entrega
al cliente, que la guarda solo en memoria ([20 §6.1](20-contrato-de-api.md#61-las-tres-cabeceras)). Si el servidor no la guardara en ninguna parte
—que es como estuvo entre la [2.1](08-plan-de-desarrollo.md#tarea-2-1) y la [2.20](08-plan-de-desarrollo.md#tarea-2-20)— no tendría **contra qué** comparar el HMAC de cada
petición, y las tres cabeceras viajarían sin que nadie pudiera comprobarlas.

```sql
CREATE TABLE sesiones (
  token_hash     TEXT PRIMARY KEY CONSTRAINT sesiones_token_hash_es_sha256
                   CHECK (token_hash ~ '^[0-9a-f]{64}$'),
  usuario_id     UUID NOT NULL REFERENCES usuarios(id),
  clave_de_firma TEXT NOT NULL,
  creado_en      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expira_en      TIMESTAMPTZ NOT NULL CONSTRAINT sesiones_vence_despues
                   CHECK (expira_en > creado_en)
);

CREATE INDEX idx_sesiones_expira ON sesiones (expira_en);
```

**La llave primaria es el resumen del token, no el token.** Guardar el token entero convertiría esta
tabla en una lista de llaves de la casa: quien consiguiera una copia entraría como cualquiera, sin
necesidad de contraseña. Con su `sha256` alcanza para encontrar la fila —el filtro llega con el
token en la mano y lo resume—, y la restricción `sesiones_token_hash_es_sha256` impide que alguien
meta ahí el token por descuido. Es la misma razón por la que nadie guarda contraseñas en claro.

> **Ni Gerencia lee una clave de firma ajena.** Es la única cosa del modelo con la que se puede
> **suplantar** a otra persona —no ver sus datos: hacerse pasar por ella—, así que esta tabla y
> `nonces_vistos` son las dos sensibles sin excepción de Gerencia ([§7](#7-seguridad-por-tipo-de-usuario-rls)). Una clave que otro puede
> leer no es un secreto compartido con nadie: es un secreto y ya.

**Retención: la vida del token, treinta días** ([ADR-009](adr/ADR-009-login-por-usuario.md)), y se purga como las otras dos. La purga
no es de corrección sino de higiene —una sesión vencida no deja entrar, porque `expira_en` ya la
descarta al buscarla—, pero **una clave de firma que ya no sirve y sigue guardada es superficie de
ataque a cambio de nada**, así que se va con las demás:

```sql
SELECT cron.schedule(
  'purgar_sesiones_vencidas',
  '40 3 * * *',
  $cron$ DELETE FROM sesiones WHERE expira_en < NOW() $cron$
);
```

> **Esta tabla no sustituye a la sesión de Supabase Auth ni la duplica.** Quién entró, con qué
> contraseña y hasta cuándo vale su token lo sigue decidiendo el proveedor ([ADR-010](adr/ADR-010-almacenamiento-contrasenas.md)). Aquí solo vive
> lo que el proveedor no guarda y el canal firmado necesita: la clave con la que esa sesión firma.

---

## 5. Diseño de solo escritura

### 5.1 Revocación real del borrado

```sql
-- El rol de PostgreSQL de la aplicación NUNCA puede borrar. No es una convención
-- de código: es una restricción del motor de base de datos.
REVOKE DELETE ON ALL TABLES IN SCHEMA public FROM authenticated;
REVOKE TRUNCATE ON ALL TABLES IN SCHEMA public FROM authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  REVOKE DELETE, TRUNCATE ON TABLES FROM authenticated;
```

Aunque alguien escriba un `DELETE` por error, o intente ejecutarlo desde fuera de la
aplicación, PostgreSQL lo rechaza.

> **Una sola excepción en todo el modelo, y no está en este bloque.** Las claves de idempotencia
> vencidas de `peticiones_idempotentes` sí se borran, a las 72 horas ([§4.9](#49-claves-de-idempotencia)), y las de
> `nonces_vistos` a los cinco minutos ([§4.10](#410-los-nonce-vistos)). Este `REVOKE` no se toca para lograrlo: las purgas
> las ejecuta el rol de migraciones, que es dueño de las tablas y no atiende peticiones de
> usuario. La aplicación sigue sin poder borrar nada, ahí incluido.

### 5.2 Anulación lógica con trazabilidad

| Campo | Contenido | Obligatorio |
|---|---|:---:|
| `anulado_en` | Fecha y hora exacta en America/Bogota | ✅ |
| `anulado_por` | Usuario que anuló | ✅ |
| `anulado_motivo` | Texto explicativo | ✅ |
| `anulado_dispositivo` | Navegador y equipo | ✅ |
| `anulado_ip` | Dirección de origen | ✅ |

La restricción `anulacion_con_motivo` de cada tabla hace imposible anular sin explicar por qué, y
el dominio `motivo` ([§4.1](#41-tipos-y-convenciones-comunes)) hace imposible que esa explicación sea un espacio en blanco. Una
exige que el texto esté; el otro, que diga algo.

### 5.3 Corrección por contra-asiento

Un movimiento errado **no se edita**. Se crea uno nuevo que lo reversa:

```sql
INSERT INTO movimientos (tipo, valor, fecha_movimiento, cuenta_id,
                         categoria_id, descripcion, corrige_a_id, creado_por)
VALUES ('ingreso', 50000, CURRENT_DATE, :cuenta, :categoria,
        'Reversa de movimiento con valor equivocado', :movimiento_original, :usuario);
```

El original queda intacto para siempre. El historial cuenta la verdad de lo que pasó,
**incluidos los errores**, que es justamente lo que permite entender qué salió mal.

### 5.4 Auditoría por triggers

La bitácora **no la escribe la aplicación**. La escribe PostgreSQL, para que sea imposible
saltársela desde el código.

```sql
CREATE TABLE auditoria (
  id            BIGSERIAL PRIMARY KEY,
  tabla         TEXT NOT NULL,
  registro_id   UUID,
  accion        TEXT NOT NULL CONSTRAINT auditoria_accion_valida CHECK (accion IN (
                  'INSERT','UPDATE','ANULAR',
                  'inicio_sesion','cierre_sesion','inicio_sesion_fallido',
                  'usuario_creado','usuario_desactivado',
                  'clave_restablecida','clave_cambiada',
                  'cargo_creado','cargo_desactivado',
                  'usuario_reactivado','cambio_revertido',    -- ver §5.7
                  -- tarea 2.21: los cinco que la pantalla distingue y un UPDATE no
                  'nombre_cambiado','cargo_cambiado','tipo_cambiado',
                  'cargo_renombrado','cargo_reactivado')),
  usuario_id    UUID,
  tipo          tipo_usuario,
  fecha_hora    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  motivo        motivo,   -- tarea 2.21: por qué, cuando el cambio lo pedía
  dispositivo   TEXT,
  ip            INET,
  datos_antes   JSONB,
  datos_despues JSONB,
  revierte_a    BIGINT REFERENCES auditoria(id),   -- qué entrada deshace esta, §5.7
  CONSTRAINT reversion_con_origen
    CHECK ((accion = 'cambio_revertido') = (revierte_a IS NOT NULL))
);

CREATE INDEX idx_auditoria_registro ON auditoria (tabla, registro_id, fecha_hora DESC);
CREATE INDEX idx_auditoria_fecha    ON auditoria (fecha_hora DESC);
CREATE INDEX idx_auditoria_usuario  ON auditoria (usuario_id, fecha_hora DESC);

-- Único, no simplemente índice: una entrada se reversa una sola vez.
CREATE UNIQUE INDEX idx_auditoria_reversion ON auditoria (revierte_a)
  WHERE revierte_a IS NOT NULL;

CREATE OR REPLACE FUNCTION fn_auditar() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
DECLARE
  v_accion TEXT;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_accion := 'INSERT';
  ELSIF TG_OP = 'UPDATE'
        AND OLD.anulado_en IS NULL
        AND NEW.anulado_en IS NOT NULL THEN
    v_accion := 'ANULAR';
  ELSE
    v_accion := 'UPDATE';
  END IF;

  INSERT INTO auditoria (tabla, registro_id, accion, usuario_id, tipo,
                         dispositivo, ip, datos_antes, datos_despues)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    v_accion,
    auth.uid(),
    (SELECT tipo FROM usuarios WHERE id = auth.uid()),
    current_setting('request.headers', true)::json ->> 'user-agent',
    inet_client_addr(),
    CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE to_jsonb(OLD) END,
    to_jsonb(NEW)
  );

  RETURN NEW;
END;
$fn$;

CREATE TRIGGER tr_auditar_movimientos
  AFTER INSERT OR UPDATE ON movimientos
  FOR EACH ROW EXECUTE FUNCTION fn_auditar();
```

El mismo trigger se registra sobre `pedidos`, `anticipos`, `productos`, `costos_producto`,
`activos`, `aportes_retiros`, `prolabore_config`, `empleados`, `nomina_detalle`, `adelantos`,
`sobres_config`, `cierres_mensuales` y `cargos`.

> **`usuarios` necesita su propia variante del trigger.** `fn_auditar()` detecta la anulación
> mirando `anulado_en`, y `usuarios` desactiva con `desactivado_en`. Auditar `usuarios` con la
> función genérica falla.

Esa variante es `fn_auditar_usuarios()`, con el trigger `tr_auditar_usuarios` (tarea
[2.21](08-plan-de-desarrollo.md#tarea-2-21)). Hace lo mismo que la genérica y solo cambia en qué columna mira para decidir que un
`UPDATE` fue una baja: `desactivado_en` en vez de `anulado_en`. **Escribe la historia de la fila
—`INSERT`, `UPDATE` y `ANULAR`— y nada más**; los eventos con nombre son de la función de abajo, por
las dos razones que se explican ahí.

> **`fn_auditar()` lee `OLD.anulado_en` sin preguntar si la columna existe**, y cinco de las tablas
> que audita no la tienen: `costos_producto`, `prolabore_config`, `nomina_detalle`, `sobres_config`
> y `cierres_mensuales`. Un `UPDATE` sobre cualquiera de ellas falla con `42703`, que además es un
> error que la API no sabe traducir. Nada lo caza hoy: `verificar-base.sql` solo actualiza `cargos`,
> y la semilla corre con los triggers apagados. Está anotado en [`TODO.md`](../TODO.md) [§9](../TODO.md#9-a-vigilar) con lo que hay que correr
> para confirmarlo; el arreglo lleva migración propia y su comprobación por tabla auditada.

Además de los cambios de fila, la bitácora registra los eventos de acceso y de administración
de personas:

| `accion` | Cuándo se registra |
|---|---|
| `inicio_sesion` | Alguien entra con usuario y contraseña correctos |
| `cierre_sesion` | Alguien cierra su sesión |
| `inicio_sesion_fallido` | Usuario inexistente, contraseña errada o usuario desactivado |
| `usuario_creado` | Gerencia crea una persona con acceso |
| `usuario_desactivado` | Gerencia desactiva a una persona, con motivo |
| `usuario_reactivado` | Gerencia reactiva a una persona desactivada, con motivo |
| `clave_restablecida` | Gerencia entrega una clave temporal a otra persona |
| `clave_cambiada` | La propia persona cambia su contraseña |
| `cargo_creado` | Gerencia agrega un cargo al catálogo |
| `cargo_desactivado` | Gerencia desactiva un cargo, con motivo |
| `nombre_cambiado` | Gerencia le cambia el nombre completo a una persona |
| `cargo_cambiado` | Gerencia le cambia el cargo a una persona |
| `tipo_cambiado` | Gerencia le cambia el tipo a una persona: Gerencia u Operación |
| `cargo_renombrado` | Gerencia renombra un cargo del catálogo |
| `cargo_reactivado` | Gerencia devuelve un cargo al catálogo |

`registro_id` admite `NULL` por culpa de `inicio_sesion_fallido`: si el usuario tecleado no
existe, no hay ninguna fila a la que apuntar.

**Los cinco últimos entran con la tarea [2.21](08-plan-de-desarrollo.md#tarea-2-21)**, y no son un adorno: son los que el contrato
promete en `EntradaDeBitacora.evento` y el mockup pinta en la columna «Qué pasó». Sin ellos, cambiar
el nombre y renombrar un cargo llegan a la bitácora como `UPDATE`, que es exactamente lo que no
distingue una cosa de la otra.

Estos quince eventos **no los escribe un trigger de fila**. Un trigger de fila solo sabe decir
`INSERT`, `UPDATE` o `ANULAR`: no distingue si ese `UPDATE` fue una desactivación, una
reactivación o un restablecimiento de clave, y en un intento fallido no hay fila que mirar. Los
escribe una función `SECURITY DEFINER` que llama la aplicación, dentro de la misma transacción del
cambio. Tiene que ser así: en un intento fallido todavía no hay sesión abierta, y `auditoria`
tiene RLS sin política de `INSERT` ([§7](#7-seguridad-por-tipo-de-usuario-rls)), de modo que un `INSERT` directo se rechaza.

Esa función es `fn_registrar_evento`, y esta es su firma (tarea [2.21](08-plan-de-desarrollo.md#tarea-2-21)):

```sql
CREATE OR REPLACE FUNCTION fn_registrar_evento(
  p_accion        TEXT,
  p_tabla         TEXT,
  p_registro_id   UUID    DEFAULT NULL,   -- nulo solo en inicio_sesion_fallido
  p_motivo        motivo  DEFAULT NULL,   -- cuando el cambio lo pedía
  p_dispositivo   TEXT    DEFAULT NULL,
  p_ip            INET    DEFAULT NULL,
  p_datos_antes   JSONB   DEFAULT NULL,
  p_datos_despues JSONB   DEFAULT NULL,
  p_revierte_a    BIGINT  DEFAULT NULL    -- solo en cambio_revertido, §5.7
) RETURNS BIGINT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;
```

Devuelve el `id` de la entrada escrita, que es lo que necesita una reversión para apuntar a la que
deshace. El autor y su tipo no son parámetros: los pone la función con `auth.uid()`, que sigue
valiendo dentro de un `SECURITY DEFINER` porque sale de la sesión y no del dueño.

> **El dispositivo y la IP viajan como parámetros, y en `fn_auditar()` no.** El trigger los saca de
> `current_setting('request.headers')` y de `inet_client_addr()`, que sirven cuando quien escribe es
> PostgREST; con `prisma_api` de por medio, el primero está vacío y el segundo es la dirección **de
> la API**, no la de quien hizo el cambio. Quien conoce el dispositivo real es quien recibió la
> petición, así que los manda.

**Una entrada por campo cambiado.** Un `UPDATE` que cambia a la vez el nombre y el cargo de una
persona deja **dos** entradas, `nombre_cambiado` y `cargo_cambiado`, cada una con su «de → a». Es lo
que pintan el contrato y el mockup —una fila por cambio, con una sola etiqueta— y es la segunda
razón por la que estos eventos no pueden salir del trigger de fila: un trigger `FOR EACH ROW` deja
una sola entrada por `UPDATE`, y ahí ya no hay forma de decir cuál de los dos cambios revierte quien
pulse «Revertir».

`usuario_desactivado` y `usuario_reactivado` recorren el mismo camino y llenan las mismas
columnas. El porqué está en [§5.7](#57-reactivar-y-revertir-escrituras-compensatorias).

El valor restante de `accion`, `cambio_revertido`, también lo escribe esa función y se explica en
[§5.7](#57-reactivar-y-revertir-escrituras-compensatorias), junto con la reversión.

> **Un intento fallido jamás guarda la contraseña tecleada**, ni completa ni parcial. Guarda el
> usuario intentado, la fecha, el dispositivo y la IP, y nada más. Es [RNF-18](03-requisitos-y-bdd.md#rnf-18) y no admite
> excepciones: una bitácora con contraseñas adentro es peor que no tener bitácora.

### 5.5 Vistas limpias por defecto

```sql
CREATE VIEW v_movimientos AS
  SELECT * FROM movimientos WHERE anulado_en IS NULL;

CREATE VIEW v_pedidos AS
  SELECT * FROM pedidos WHERE anulado_en IS NULL;
```

La aplicación consulta **siempre** las vistas. El modo *ver anulados* consulta la tabla base,
está restringido al tipo Gerencia y se presenta visualmente diferenciado para que nunca se
confunda con la vista normal.

### 5.6 La bitácora de la pantalla es una vista, no una tabla nueva

La pantalla **Gestión de usuarios** muestra una bitácora de cambios: quién cambió qué, cuándo y
por qué. **No hay tabla nueva.** Todo eso ya está en `auditoria`, escrita por triggers y por la
función del [§5.4](#54-auditoría-por-triggers). Una segunda tabla con lo mismo crearía dos verdades, y dos verdades terminan
contradiciéndose.

La bitácora es una **vista sobre `auditoria` filtrada por las tablas `usuarios` y `cargos`**:

```sql
CREATE VIEW v_bitacora_usuarios WITH (security_invoker = true) AS
SELECT a.id,
       a.fecha_hora,
       a.tabla,
       a.accion,
       a.registro_id,
       a.motivo,
       a.usuario_id              AS autor_id,
       autor.nombre_completo     AS autor,
       afectado.nombre_completo  AS sobre_quien,
       a.datos_antes,
       a.datos_despues,
       a.revierte_a,
       (rev.id IS NOT NULL)      AS revertida,
       rev.id                    AS revertida_por,
       rev.fecha_hora            AS revertida_en
FROM auditoria a
LEFT JOIN usuarios  autor    ON autor.id    = a.usuario_id
LEFT JOIN usuarios  afectado ON afectado.id = a.registro_id AND a.tabla = 'usuarios'
LEFT JOIN auditoria rev      ON rev.revierte_a = a.id
WHERE a.tabla IN ('usuarios', 'cargos')
ORDER BY a.fecha_hora DESC;
```

> **`WITH (security_invoker = true)` no es adorno.** Una vista normal se ejecuta con los permisos
> de su dueño, y el dueño de `auditoria` no pasa por RLS: la vista le entregaría la bitácora
> completa a cualquier sesión autenticada, Operación incluida, saltándose `aud_lectura` ([§7](#7-seguridad-por-tipo-de-usuario-rls)). Con
> `security_invoker` la vista se evalúa con los permisos de quien pregunta y la política vuelve a
> mandar. Requiere PostgreSQL 15 o superior, que es lo que corre Supabase.

El `LEFT JOIN` contra `auditoria rev` es lo que marca una entrada como **Revertida**: está
revertida si existe otra entrada que la apunte con `revierte_a`. La marca **se deduce, no se
escribe**: la fila original no se toca ni para eso. El índice único del [§5.4](#54-auditoría-por-triggers) garantiza que ese
`LEFT JOIN` no pueda duplicar la entrada, porque una entrada se reversa una sola vez.

Los eventos de acceso (`inicio_sesion`, `cierre_sesion`, `inicio_sesion_fallido`) se escriben con
`tabla = 'usuarios'`, así que también caen dentro de la vista. La pantalla filtra por `accion` y
enseña solo los cambios de administración; para revisar ingresos y fallos se consulta la misma
vista sin ese filtro.

`datos_antes` y `datos_despues` de `usuarios` no traen contraseñas: la tabla no tiene ninguna
columna de clave, el hash vive en `auth.users` ([§4.2](#42-cargos-usuarios-y-cuentas)). La bitácora se puede mostrar completa sin
exponer un secreto, que es lo que exige [RNF-18](03-requisitos-y-bdd.md#rnf-18).

La vista no necesita `ENABLE ROW LEVEL SECURITY` —una vista no tiene RLS propia— y `auditoria`
sigue con la suya encendida desde el [§7](#7-seguridad-por-tipo-de-usuario-rls). El [§3](#3-catálogo-de-entidades) tampoco cambia: `v_bitacora_usuarios` no es una
entidad nueva, es una forma de leer `auditoria`, la entidad 23.

### 5.7 Reactivar y revertir: escrituras compensatorias

Una persona desactivada se puede reactivar, y un cambio registrado se puede revertir. Ninguna de
las dos cosas borra ni edita nada. Son **escrituras compensatorias**: hermanas del contra-asiento
del [§5.3](#53-corrección-por-contra-asiento) —el de [CU-04](02-casos-de-uso.md#cu-04) y [RF-15](03-requisitos-y-bdd.md#rf-15)—, aplicado a las personas en vez de a la plata.

> **Revertir es escribir un cambio nuevo que deshace el anterior, nunca borrar el registro del
> error.** Si se desactivó a la persona equivocada, la bitácora tiene que mostrar las dos cosas:
> que se desactivó y que se corrigió. Borrar la primera entrada convertiría la bitácora en un
> relato editable, y una bitácora editable no sirve para nada.

| Acción en la pantalla | Qué escribe en `usuarios` | Qué escribe en `auditoria` |
|---|---|---|
| Desactivar | `activo = FALSE` y las tres columnas de estado con fecha, autor y motivo | Fila `usuario_desactivado` |
| Reactivar | `activo = TRUE`, las tres columnas en `NULL` y `debe_cambiar_clave = TRUE` | Fila `usuario_reactivado` |
| Revertir una entrada | El `UPDATE` que deshace ese cambio | Fila `cambio_revertido` con `revierte_a` apuntando a la entrada original |

La reactivación se registra **igual que la desactivación**, con quién, cuándo, sobre quién y
motivo. Si solo se anotara una de las dos, la historia quedaría coja justo en el caso que más se
consulta: el de la persona que se fue y volvió.

> **El motivo de una reactivación solo puede vivir en `auditoria`**, y por eso esa tabla tiene su
> propia columna `motivo` desde la tarea [2.21](08-plan-de-desarrollo.md#tarea-2-21). El de una desactivación queda en
> `usuarios.desactivado_motivo` y la bitácora lo encuentra dentro de `datos_despues`; pero reactivar
> deja esas tres columnas en `NULL`, así que el porqué de la vuelta no tiene fila donde quedarse.
> Escribirlo dentro del JSON habría obligado a la API a buscarlo en un sitio distinto según la
> acción, y el contrato lo declara como un campo de la entrada.

```sql
-- Desactivar. El estado guarda quién, cuándo y por qué. La restricción
-- desactivacion_con_motivo (§4.2) exige las tres columnas: no hay desactivación muda.
UPDATE usuarios
   SET activo             = FALSE,
       desactivado_en     = NOW(),
       desactivado_por    = auth.uid(),
       desactivado_motivo = :motivo
 WHERE id = :usuario;

-- Reactivar. El estado vuelve a limpio; la historia queda intacta en auditoria.
UPDATE usuarios
   SET activo             = TRUE,
       desactivado_en     = NULL,
       desactivado_por    = NULL,
       desactivado_motivo = NULL,
       debe_cambiar_clave = TRUE
 WHERE id = :usuario;
```

`debe_cambiar_clave = TRUE` no es un detalle: quien vuelve después de meses no debe entrar con la
clave vieja, porque nadie sabe quién la conoció mientras tanto. La clave temporal se entrega en
persona, como en [CU-31](02-casos-de-uso.md#cu-31).

```sql
-- Revertir. Lo escribe fn_registrar_evento, la función SECURITY DEFINER del §5.4: `auditoria`
-- no tiene política de INSERT, de modo que un INSERT directo de la aplicación se rechaza.
SELECT fn_registrar_evento(
         p_accion        => 'cambio_revertido',
         p_tabla         => 'usuarios',
         p_registro_id   => :usuario_afectado,
         p_dispositivo   => :dispositivo,
         p_ip            => :ip,
         p_datos_antes   => :antes,
         p_datos_despues => :despues,
         p_revierte_a    => :entrada_original);
```

La restricción `reversion_con_origen` amarra las dos mitades: una fila `cambio_revertido` sin
`revierte_a` no entra, y ninguna otra acción puede traer `revierte_a`. Sin ella cabía una
reversión huérfana, que es una entrada que dice «se deshizo algo» sin decir qué.

**Que la entrada original no se pueda editar ni borrar no depende de la aplicación.** `auditoria`
tiene una sola política y es de `SELECT` ([§7](#7-seguridad-por-tipo-de-usuario-rls)), así que un `UPDATE` sobre la bitácora se rechaza; y
`DELETE` está revocado en el motor ([§5.1](#51-revocación-real-del-borrado)). La promesa de «nada se borra» la sostiene PostgreSQL.

Revertir una reversión es legal: la fila nueva apunta con `revierte_a` a la fila
`cambio_revertido` anterior y la cadena queda completa. El índice único impide revertir dos veces
la misma entrada, que es el camino corto a dos historias distintas del mismo hecho.

`clave_restablecida` es el único evento **no reversible**, y la razón es del modelo, no de la
pantalla: el sistema nunca guardó la contraseña anterior, solo su hash. No se puede deshacer lo
que no se guardó.

**Una reversión no puede dejar el sistema sin Gerencia, y no hace falta un guardián nuevo.** Toda
reversión sobre una persona aterriza como un `UPDATE` sobre `usuarios`, así que la atajan los dos
que ya existen ([§7](#7-seguridad-por-tipo-de-usuario-rls)): `tg_proteger_ultima_gerencia` fila por fila y `tg_verificar_gerencia_restante`
al final de la sentencia. Revertir un `Tipo cambiado` que degradaría a la última Gerencia, o
revertir un `Usuario creado` desactivando a la última Gerencia, fallan con la misma excepción que
el botón de desactivar. Escribir la regla por segunda vez solo serviría para que las dos copias se
desincronizaran ([RF-91](03-requisitos-y-bdd.md#rf-91)).

El `UPDATE` sobre `usuarios` y el `INSERT` en `auditoria` van en **la misma transacción**. Si el
guardián dispara, se caen los dos: nunca queda anotada en la bitácora una reversión que no ocurrió.

---

## 6. Vistas de cálculo financiero

```sql
-- Saldo actual por cuenta
CREATE VIEW v_saldos_cuenta AS
SELECT c.id, c.nombre,
       c.saldo_inicial
       + COALESCE(SUM(CASE
           WHEN m.cuenta_id = c.id AND m.tipo IN
                ('ingreso','aporte','anticipo_recibido') THEN m.valor
           WHEN m.cuenta_id = c.id AND m.tipo IN
                ('gasto','inversion','retiro_prolabore',
                 'retiro_distribucion','adelanto_empleada','transferencia') THEN -m.valor
           WHEN m.cuenta_destino_id = c.id AND m.tipo = 'transferencia' THEN m.valor
           ELSE 0 END), 0) AS saldo
FROM cuentas c
LEFT JOIN v_movimientos m
       ON m.cuenta_id = c.id OR m.cuenta_destino_id = c.id
WHERE c.anulado_en IS NULL
GROUP BY c.id, c.nombre, c.saldo_inicial;

-- Anticipos por devengar: plata en la cuenta que aún no es del negocio
CREATE VIEW v_anticipos_por_devengar AS
SELECT COALESCE(SUM(a.valor), 0) AS total
FROM anticipos a
JOIN v_pedidos p ON p.id = a.pedido_id
WHERE a.devengado_en IS NULL
  AND a.anulado_en IS NULL
  AND p.estado IN ('en_proceso','parcial');
```

> Estas vistas existen para consulta y verificación. **El cálculo autoritativo vive en el
> dominio de `prisma_api`, en Java**, probado unitariamente (ver
> [`07-arquitectura.md`](07-arquitectura.md) [§4](07-arquitectura.md#4-el-dominio-en-detalle)). Tener dos implementaciones permite
> contrastarlas: si difieren, hay un error en alguna.

---

## 7. Seguridad por tipo de usuario (RLS)

```sql
ALTER TABLE usuarios         ENABLE ROW LEVEL SECURITY;
ALTER TABLE cargos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimientos      ENABLE ROW LEVEL SECURITY;
ALTER TABLE aportes_retiros  ENABLE ROW LEVEL SECURITY;
ALTER TABLE nomina_detalle   ENABLE ROW LEVEL SECURITY;
ALTER TABLE costos_producto  ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria        ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION fn_es_gerencia() RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
  SELECT EXISTS (
    SELECT 1 FROM usuarios
     WHERE id = auth.uid() AND tipo = 'gerencia' AND activo
  );
$fn$;

-- Cada quien ve su propia ficha; Gerencia ve todas.
CREATE POLICY usuarios_lectura ON usuarios FOR SELECT
  USING (id = auth.uid() OR fn_es_gerencia());

-- Solo Gerencia crea usuarios.
CREATE POLICY usuarios_insercion ON usuarios FOR INSERT
  WITH CHECK (fn_es_gerencia());

-- Gerencia modifica cualquier ficha.
CREATE POLICY usuarios_actualizacion ON usuarios FOR UPDATE
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());

-- Cada quien toca su propia ficha, y solo para dos cosas: marcar que ya cambió la clave
-- (CU-32) y sellar su último acceso (CU-28). Qué columnas puede mover lo decide el trigger
-- tg_congelar_ficha_propia, no esta política: RLS filtra filas, nunca columnas.
CREATE POLICY usuarios_actualizacion_propia ON usuarios FOR UPDATE
  USING      (id = auth.uid() AND activo)
  WITH CHECK (id = auth.uid() AND activo);

-- El catálogo de cargos lo lee todo el mundo y lo escribe solo Gerencia.
CREATE POLICY cargos_lectura  ON cargos FOR SELECT USING (TRUE);
CREATE POLICY cargos_escritura ON cargos FOR ALL
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());

-- Movimientos: ambos tipos registran; solo Gerencia anula
CREATE POLICY mov_lectura   ON movimientos FOR SELECT USING (TRUE);
CREATE POLICY mov_insercion ON movimientos FOR INSERT WITH CHECK (creado_por = auth.uid());
CREATE POLICY mov_anulacion ON movimientos FOR UPDATE USING (fn_es_gerencia());

-- Retiros, pro-labore y costos: exclusivos de Gerencia
CREATE POLICY ret_solo_gerencia ON aportes_retiros FOR ALL
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());
CREATE POLICY costos_solo_gerencia ON costos_producto FOR ALL
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());

-- Nómina: Gerencia ve todo; Operación ve únicamente su propio desprendible
CREATE POLICY nom_lectura ON nomina_detalle FOR SELECT
  USING (
    fn_es_gerencia()
    OR empleado_id IN (SELECT id FROM empleados WHERE usuario_id = auth.uid())
  );
CREATE POLICY nom_escritura ON nomina_detalle FOR INSERT WITH CHECK (fn_es_gerencia());

-- Auditoría: solo Gerencia puede leerla, y nadie la modifica
CREATE POLICY aud_lectura ON auditoria FOR SELECT USING (fn_es_gerencia());
```

Las políticas de `usuarios` usan `fn_es_gerencia()` y no una subconsulta escrita a mano. No es
gusto: una política sobre `usuarios` que consulte `usuarios` se llama a sí misma y PostgreSQL la
rechaza con `infinite recursion detected in policy for relation "usuarios"`. La función corta el
ciclo porque es `SECURITY DEFINER` y su dueño es el dueño de la tabla, y el dueño de una tabla no
pasa por RLS. Son dos condiciones que hay que sostener: la crea el mismo rol dueño de `usuarios`,
y `usuarios` **no** lleva `FORCE ROW LEVEL SECURITY`. Con eso último la recursión vuelve.

> **Toda función `SECURITY DEFINER` lleva `SET search_path = public, pg_temp`.** Sin eso,
> cualquiera con permiso de crear objetos arma su propia tabla `usuarios`, la pone de primera en
> su `search_path` y hace que `fn_es_gerencia()` le conteste que sí. La función corre con los
> permisos del dueño, así que el engaño sale carísimo. Aplica a `fn_auditar()`, a
> `fn_es_gerencia()` y a los dos guardianes de abajo.

**Por qué `usuarios_actualizacion` lleva `WITH CHECK` además de `USING`.** Si se omite,
PostgreSQL reutiliza el `USING` como `WITH CHECK`, así que la política no queda abierta por ese
lado. El problema es otro y es peor: `fn_es_gerencia()` no mira la fila, solo mira quién
pregunta. Una política escrita así **nunca** puede impedir que alguien se cambie el `tipo`. El
comentario original decía «nadie cambia su propio tipo» y era falso: la política solo decide
quién puede ejecutar el `UPDATE`, no en qué puede convertir la fila. Lo escribimos explícito
para que se vea que la restricción de columnas no está ahí, sino en el trigger siguiente.

```sql
-- Operación puede tocar su propia ficha, pero solo dos columnas.
CREATE OR REPLACE FUNCTION fn_congelar_ficha_propia() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
BEGIN
  IF fn_es_gerencia() THEN
    RETURN NEW;
  END IF;
  IF (to_jsonb(NEW) - 'debe_cambiar_clave' - 'ultimo_acceso')
     IS DISTINCT FROM
     (to_jsonb(OLD) - 'debe_cambiar_clave' - 'ultimo_acceso') THEN
    RAISE EXCEPTION
      'Solo Gerencia cambia el tipo, el cargo, el usuario, el nombre o el estado de una ficha';
  END IF;
  RETURN NEW;
END;
$fn$;

CREATE TRIGGER tg_congelar_ficha_propia
  BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION fn_congelar_ficha_propia();
```

La comparación es una **lista blanca**: se le quitan al `jsonb` las dos columnas que sí se pueden
mover y todo lo demás tiene que quedar idéntico. Escrito al revés —enumerando lo prohibido— una
columna nueva nacería desprotegida y nadie se acordaría de agregarla a la lista.

Sin esta pareja de política y trigger, `usuarios` quedaba en un punto muerto. La única política
de `UPDATE` era la de Gerencia, así que **una usuaria de Operación no podía apagar su propio
`debe_cambiar_clave` ni sellar su `ultimo_acceso`**: [CU-32](02-casos-de-uso.md#cu-32), [RF-79](03-requisitos-y-bdd.md#rf-79) y [RF-80](03-requisitos-y-bdd.md#rf-80) no tenían por dónde
cumplirse, y la pantalla de «Crea tu contraseña» se volvía un callejón sin salida.

Y un guardián que no se puede dejar por fuera:

```sql
-- Siempre debe quedar al menos un usuario activo de tipo gerencia.
CREATE OR REPLACE FUNCTION fn_proteger_ultima_gerencia() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
BEGIN
  IF (OLD.tipo = 'gerencia' AND OLD.activo)
     AND (NEW.tipo <> 'gerencia' OR NOT NEW.activo) THEN
    IF (SELECT count(*) FROM usuarios
         WHERE tipo = 'gerencia' AND activo AND id <> OLD.id) = 0 THEN
      RAISE EXCEPTION 'No se puede desactivar ni degradar al último usuario de Gerencia';
    END IF;
  END IF;
  RETURN NEW;
END;
$fn$;

CREATE TRIGGER tg_proteger_ultima_gerencia
  BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION fn_proteger_ultima_gerencia();

-- Red de seguridad para la desactivación masiva. El trigger de fila cuenta fila por fila y
-- antes de escribir; este se evalúa una sola vez, al final de la sentencia, sobre la tabla ya
-- escrita. Es el único que atrapa un UPDATE que apague a todas las gerencias de un golpe.
CREATE OR REPLACE FUNCTION fn_verificar_gerencia_restante() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
BEGIN
  IF (SELECT count(*) FROM usuarios WHERE tipo = 'gerencia' AND activo) = 0 THEN
    RAISE EXCEPTION 'El sistema no puede quedar sin ningún usuario activo de Gerencia';
  END IF;
  RETURN NULL;
END;
$fn$;

CREATE TRIGGER tg_verificar_gerencia_restante
  AFTER UPDATE ON usuarios
  FOR EACH STATEMENT EXECUTE FUNCTION fn_verificar_gerencia_restante();
```

Entre los dos cubren los tres caminos que dejarían el sistema sin nadie que pueda administrarlo:
desactivar a la última Gerencia, degradarla a `operacion` y apagarlas a todas de un solo
`UPDATE`. Viven en la base y no en la pantalla porque la pantalla se puede saltar.

Dos detalles del primer trigger que no se ven a simple vista:

- `OLD.tipo` y `OLD.activo` son `NOT NULL`, así que la condición se evalúa limpia cuando la fila
  no era de Gerencia: da falso y el trigger no hace nada. No hay lógica de tres valores escondida.
- La función es `SECURITY DEFINER` **a propósito**. Sin eso, el `count(*)` pasaría por RLS y
  contaría solo las filas que quien actualiza alcanza a ver. Daría cero por falta de permiso, no
  por falta de gerentes, y el guardián bloquearía cambios perfectamente legítimos.

`DELETE` no necesita guardián propio: está revocado en el motor ([§5.1](#51-revocación-real-del-borrado)).

**Por qué importa que esté aquí y no en la pantalla.** Si los permisos vivieran en el código de
la interfaz, bastaría con abrir las herramientas del navegador para pedir los datos
directamente y verlos. Con RLS, PostgreSQL **no devuelve esas filas** a una sesión de tipo
Operación, sin importar cómo se construya la petición.

**Las ocho tablas sensibles que faltaban.** El [§3](#3-catálogo-de-entidades) marca como sensibles ocho tablas que el bloque
de arriba no nombraba: `clientes`, `activos`, `prolabore_config`, `empleados`,
`nomina_periodos`, `adelantos`, `sobres_config` y `cierres_mensuales`. Sin RLS, **cualquier
sesión autenticada las lee enteras** —salarios acordados, pro-labore y utilidad del mes
incluidos—, que es exactamente lo que niega la matriz de permisos de
[`01-vision-y-alcance.md`](01-vision-y-alcance.md) [§4](01-vision-y-alcance.md#4-matriz-de-tipos-de-usuario-y-permisos) y lo que
[`ADR-006`](adr/ADR-006-rls-por-rol.md) decidió impedir dentro de PostgreSQL.

Encenderlas a secas tampoco sirve: una tabla con RLS y sin política no devuelve nada. Primero
hay que decidir, tabla por tabla, qué alcanza el tipo Operación.

| Tabla | Qué alcanza el tipo Operación | Quién escribe |
|---|---|---|
| `clientes` | Los lee todos y crea nuevos | Corregir y anular: Gerencia |
| `activos` | Nada: conjunto vacío | Gerencia |
| `prolabore_config` | Nada: conjunto vacío | Gerencia |
| `empleados` | **Su propia ficha**, por `usuario_id = auth.uid()` | Gerencia |
| `nomina_periodos` | Solo los períodos donde tiene desprendible propio | Gerencia |
| `adelantos` | **Los suyos**, los que se le descuentan | Gerencia |
| `sobres_config` | Nada: conjunto vacío | Gerencia |
| `cierres_mensuales` | Nada: conjunto vacío | Gerencia |

Las cuatro filas de «nada» salen derecho de la matriz: «Registrar inversiones», «Definir el
pro-labore», «Configurar los 4 sobres» y «Ver reportes mensuales y anuales» son ❌ para
Operación, y `cierres_mensuales` guarda la utilidad causada y la caja libre de cada mes cerrado.

Las otras cuatro necesitan explicación, porque no son un simple «sí» o «no»:

- **`clientes` es un dato personal de terceros, no un secreto del negocio.** Lo protege la Ley
  1581 —ver [`11-riesgos-y-proteccion-de-datos.md`](11-riesgos-y-proteccion-de-datos.md) [§3](11-riesgos-y-proteccion-de-datos.md#3-protección-de-datos-personales)—,
  no la separación entre Gerencia y Operación. [CU-05](02-casos-de-uso.md#cu-05) dice «cliente existente o nuevo»: quien
  registra un pedido tiene que poder buscarlo y crearlo, y [CU-08](02-casos-de-uso.md#cu-08) le muestra el nombre en el
  listado. Lo que sí es de Gerencia es corregirlo y anularlo, porque anular un cliente es
  anonimizarlo ([§3.4 del doc 11](11-riesgos-y-proteccion-de-datos.md#34-la-tensión-entre-no-borrar-nunca-y-el-derecho-de-supresión)) y eso no se hace de paso.
- **`empleados` guarda `salario_acordado`.** Cada quien llega a su propia ficha y a ninguna
  otra, igual que en `usuarios`. No es una concesión: el desprendible de pago lleva nombre,
  documento, cargo y fecha de ingreso —[§8](#8-datos-iniciales) de
  [`06-nomina-y-capacidad-de-pago.md`](06-nomina-y-capacidad-de-pago.md)— y todo eso vive en
  esa fila.
- **`nomina_periodos` no guarda plata, pero sí el calendario de nómina del negocio.** Abrirla
  entera diría cuántos meses se han liquidado y cuándo se cerró cada uno. Operación ve
  únicamente los períodos en los que tiene desprendible, que es lo único que necesita para
  ponerle un encabezado al suyo.
- **`adelantos` es plata que se le descuenta a la persona de su propio desprendible.** Verlos es
  parte de ver su liquidación. Registrarlos es [CU-26](02-casos-de-uso.md#cu-26) y es de Gerencia.

```sql
-- Clientes: dato personal de terceros, no secreto comercial. Operación los lee y los crea
-- porque sin cliente no hay pedido (CU-05). Corregir y anular es de Gerencia.
CREATE POLICY clientes_lectura ON clientes FOR SELECT USING (TRUE);
CREATE POLICY clientes_insercion ON clientes FOR INSERT WITH CHECK (TRUE);
CREATE POLICY clientes_actualizacion ON clientes FOR UPDATE
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());

-- Patrimonio, sueldo de la propiedad, sobres y cierres: nada de esto le corresponde a
-- Operación, ni siquiera para leer.
CREATE POLICY activos_solo_gerencia ON activos FOR ALL
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());
CREATE POLICY prolabore_solo_gerencia ON prolabore_config FOR ALL
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());
CREATE POLICY sobres_solo_gerencia ON sobres_config FOR ALL
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());
CREATE POLICY cierres_solo_gerencia ON cierres_mensuales FOR ALL
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());

-- Empleados: Gerencia ve a todo el personal; cada quien ve su propia ficha y ninguna otra.
-- Escribirla —salario, retiro, anulación— es exclusivo de Gerencia.
CREATE POLICY empleados_lectura ON empleados FOR SELECT
  USING (fn_es_gerencia() OR usuario_id = auth.uid());
CREATE POLICY empleados_insercion ON empleados FOR INSERT WITH CHECK (fn_es_gerencia());
CREATE POLICY empleados_actualizacion ON empleados FOR UPDATE
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());

-- Períodos de nómina: Operación ve solo aquellos en los que tiene desprendible propio.
CREATE POLICY nom_per_lectura ON nomina_periodos FOR SELECT
  USING (
    fn_es_gerencia()
    OR id IN (
      SELECT d.periodo_id FROM nomina_detalle d
       WHERE d.empleado_id IN (SELECT id FROM empleados WHERE usuario_id = auth.uid())
    )
  );
CREATE POLICY nom_per_insercion ON nomina_periodos FOR INSERT WITH CHECK (fn_es_gerencia());
CREATE POLICY nom_per_actualizacion ON nomina_periodos FOR UPDATE
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());

-- Adelantos: cada quien ve los suyos, que son los que se le descuentan del desprendible.
-- Registrarlos y marcarlos descontados es de Gerencia (CU-26).
CREATE POLICY adelantos_lectura ON adelantos FOR SELECT
  USING (
    fn_es_gerencia()
    OR empleado_id IN (SELECT id FROM empleados WHERE usuario_id = auth.uid())
  );
CREATE POLICY adelantos_insercion ON adelantos FOR INSERT WITH CHECK (fn_es_gerencia());
CREATE POLICY adelantos_actualizacion ON adelantos FOR UPDATE
  USING (fn_es_gerencia()) WITH CHECK (fn_es_gerencia());

-- Recién ahora, con todas las políticas escritas, se encienden las ocho tablas.
ALTER TABLE clientes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE activos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE prolabore_config  ENABLE ROW LEVEL SECURITY;
ALTER TABLE empleados         ENABLE ROW LEVEL SECURITY;
ALTER TABLE nomina_periodos   ENABLE ROW LEVEL SECURITY;
ALTER TABLE adelantos         ENABLE ROW LEVEL SECURITY;
ALTER TABLE sobres_config     ENABLE ROW LEVEL SECURITY;
ALTER TABLE cierres_mensuales ENABLE ROW LEVEL SECURITY;
```

**El orden importa y es al revés del bloque de arriba.** `CREATE POLICY` no exige que la tabla
tenga RLS encendida: la política queda escrita y dormida hasta el `ALTER TABLE`. Sobre una base
vacía el orden da igual, pero sobre una base con datos encender primero deja una ventana —de
segundos o de todo el despliegue si algo falla en medio— en la que la tabla no le devuelve nada
a nadie y la aplicación se cae. Con las políticas puestas antes, el `ALTER TABLE` es el
instante en que empiezan a responder.

**Encender `empleados` es lo que hacía falta para no romper `nom_lectura`.** Esa política mira
`empleados` en una subconsulta, y las subconsultas de una política **sí pasan por el RLS de las
tablas que tocan**. Mientras `empleados` no tuvo RLS, el subselect veía la tabla completa; ahora
ve lo que deje `empleados_lectura`, que para una sesión de Operación es justo su propia fila
—que es la única que `nom_lectura` necesita— y para Gerencia ni se evalúa, porque
`fn_es_gerencia()` va primero en el `OR`. Si `empleados` se hubiera cerrado a secas con un
`FOR ALL USING (fn_es_gerencia())`, el subselect se habría quedado sin insumo y el desprendible
propio habría dejado de cargarle a Operación, sin un solo mensaje de error: un conjunto vacío no
se queja. Lo mismo vale para `nom_per_lectura`, que llega a `empleados` dando un salto más por
`nomina_detalle`. Ninguna de las tres políticas se llama a sí misma, así que no hay recursión
que cortar como en `usuarios`.

`empleados.usuario_id` admite `NULL`: un contratista externo o alguien que trabaja sin acceso al
sistema. `NULL = auth.uid()` da `NULL`, no verdadero, así que esa ficha no le pertenece a nadie
y solo la ve Gerencia. La lógica de tres valores juega a favor aquí y no hace falta un
`IS NOT NULL` de más.

Una advertencia sobre `clientes_insercion`: se abre sin amarrar al autor, como sí hace
`mov_insercion` con `creado_por = auth.uid()`. No es descuido, es que `clientes` no tiene
columna `creado_por` y **tampoco está entre las tablas con trigger `fn_auditar()`** ([§5.4](#54-auditoría-por-triggers)).
Quién creó o corrigió un cliente hoy no queda escrito en ninguna parte. Abrirle el `INSERT` a
Operación no empeora eso, pero lo deja a la vista: es el candidato obvio para el próximo
trigger de auditoría.

> **Lo que estas ocho políticas no cierran.** Cierran las tablas, no todos los caminos al dato.
> `mov_lectura` sigue siendo `USING (TRUE)`, así que una sesión de Operación ve la fila de
> `movimientos` de un retiro de pro-labore o de un adelanto ajeno —su valor y su fecha— aunque
> no alcance `prolabore_config` ni los `adelantos` de otra persona. Es el precio del libro
> único: es uno solo y en él escriben los dos tipos. Cerrarlo por tipo de movimiento es una
> decisión aparte, con su propio costo sobre lo que Operación necesita ver del día a día, y no
> se toma aquí.

**Y la decimoquinta sensible: `peticiones_idempotentes`.** Es la entidad 25 del [§3](#3-catálogo-de-entidades) y llega con la
regla más simple de todo el documento: cada persona alcanza las claves que ella misma generó, y
ninguna más.

```sql
-- Idempotencia: cada quien ve y escribe solo sus propias claves.
CREATE POLICY idem_lectura ON peticiones_idempotentes FOR SELECT
  USING (usuario_id = auth.uid());
CREATE POLICY idem_insercion ON peticiones_idempotentes FOR INSERT
  WITH CHECK (usuario_id = auth.uid());
CREATE POLICY idem_actualizacion ON peticiones_idempotentes FOR UPDATE
  USING (usuario_id = auth.uid()) WITH CHECK (usuario_id = auth.uid());

ALTER TABLE peticiones_idempotentes ENABLE ROW LEVEL SECURITY;
```

**Y la decimosexta: `nonces_vistos`.** Entidad 26 del [§3](#3-catálogo-de-entidades), misma regla y por la misma razón. No
lleva política de `UPDATE`: un nonce se escribe una vez y no se toca nunca más.

```sql
-- Nonce del canal firmado: cada quien ve y escribe solo los suyos.
CREATE POLICY nonce_lectura ON nonces_vistos FOR SELECT
  USING (usuario_id = auth.uid());
CREATE POLICY nonce_insercion ON nonces_vistos FOR INSERT
  WITH CHECK (usuario_id = auth.uid());

ALTER TABLE nonces_vistos ENABLE ROW LEVEL SECURITY;
```

> **Ojo con una tentación: no hace falta leer para rechazar.** La defensa contra el reenvío es el
> `INSERT` contra la llave primaria, no una consulta previa. Un `SELECT` antes del `INSERT` sería
> más lento y además abriría una carrera entre las dos operaciones. Se inserta, y si choca, se
> responde `40103`.

**Y la decimoséptima: `sesiones`.** Entidad 27 del [§3](#3-catálogo-de-entidades), la misma regla otra vez, y sin `UPDATE`
por la misma razón: una sesión se abre una vez y no se modifica.

```sql
-- La clave de firma de cada sesión: cada quien la suya, y nadie más.
CREATE POLICY sesiones_lectura ON sesiones FOR SELECT
  USING (usuario_id = auth.uid());
CREATE POLICY sesiones_insercion ON sesiones FOR INSERT
  WITH CHECK (usuario_id = auth.uid());

ALTER TABLE sesiones ENABLE ROW LEVEL SECURITY;
```

> **Aquí Gerencia tampoco es excepción, y es la vez que más importa.** En el resto del modelo, la
> excepción de Gerencia deja **ver** lo que Operación no ve. Una clave de firma no se ve: se
> **usa**, y quien la tenga puede firmar peticiones a nombre de otra persona. Darle esa excepción a
> Gerencia sería darle la capacidad de suplantar a cualquiera, que es exactamente lo que ningún
> permiso del taller debería poder hacer.

**Aquí `fn_es_gerencia()` no aparece, y es una decisión.** Es la única tabla sensible sin
excepción de Gerencia, porque no hay nada en ella que Gerencia necesite. La clave y la huella no
son información del negocio: son el comprobante de que una petición ya se atendió, y solo le
sirven a quien la envió. Abrirla «por si acaso» solo agregaría un sitio más donde queda legible
el cuerpo de una respuesta ajena, guardado en `respuesta`. Lo que Gerencia sí necesita —quién
hizo qué y cuándo— vive en `auditoria`, que para eso está.

La política de `UPDATE` no sobra: la fila nace `en_curso` y se sella `terminada` con su `status` y
su `respuesta` en la misma transacción ([§4.9](#49-claves-de-idempotencia)). Sin ella, el segundo paso se quedaría sin permiso y
ninguna clave llegaría nunca a servir para un reintento.

`DELETE` no lleva política, y por eso la purga del [§4.9](#49-claves-de-idempotencia) no corre como la aplicación: corre como el
rol de migraciones, que es dueño de la tabla y tiene `BYPASSRLS`.

Con esto, las dieciséis tablas que el [§3](#3-catálogo-de-entidades) marca como sensibles tienen política, y con `cargos` son
diecisiete las que llevan RLS encendida. Las nueve restantes —`cuentas`, `categorias`, `adjuntos`,
`pedidos`, `pedido_lineas`, `anticipos`, `productos`, `cotizaciones` y `cotizacion_lineas`—
siguen sin RLS a propósito: los dos tipos trabajan con ellas todo el día y no hay nada que
separar. El principio 6 del [§1](#1-principios-del-modelo) se lee así: **en cada tabla donde haya algo que proteger.**

Las pruebas que ejercen estas políticas con una sesión real de tipo Operación son [P-16](12-pruebas-y-calidad.md#p-16) a [P-31](12-pruebas-y-calidad.md#p-31)
de [`12-pruebas-y-calidad.md`](12-pruebas-y-calidad.md) [§3](12-pruebas-y-calidad.md#3-pruebas-de-permisos).

### 7.1 `FORCE ROW LEVEL SECURITY`: por qué ahora sí hace falta

`ENABLE ROW LEVEL SECURITY` tiene una excepción escrita en PostgreSQL: **el dueño de la tabla no
pasa por sus políticas.** Hasta ahora eso no importaba, porque el único que hablaba con la base
era el navegador con el rol `authenticated`, que no es dueño de nada.

Con `prisma_api` en medio la cosa cambia. La API se conecta con un usuario de base de datos, y
si ese usuario terminara siendo el dueño de las tablas —lo más fácil de hacer sin pensarlo, y lo
que pasa solo si se reutiliza el rol de las migraciones— todas las políticas de este documento
se apagarían en silencio. No fallaría nada. Simplemente se vería todo.

`FORCE ROW LEVEL SECURITY` quita esa excepción: ni el dueño se libra. Es la tercera de las cuatro
condiciones de **[ADR-012](adr/ADR-012-identidad-a-postgres.md)**, y es cinturón y tirantes a
propósito: la segunda condición ya dice que
`prisma_api` no debe ser dueño ([§9](#9-el-rol-con-el-que-se-conecta-la-api)), y esta la vuelve inofensiva si alguien la incumple.

```sql
-- Ni el dueño de la tabla se salta las políticas.
ALTER TABLE cargos            FORCE ROW LEVEL SECURITY;
ALTER TABLE movimientos       FORCE ROW LEVEL SECURITY;
ALTER TABLE aportes_retiros   FORCE ROW LEVEL SECURITY;
ALTER TABLE nomina_detalle    FORCE ROW LEVEL SECURITY;
ALTER TABLE costos_producto   FORCE ROW LEVEL SECURITY;
ALTER TABLE clientes          FORCE ROW LEVEL SECURITY;
ALTER TABLE activos           FORCE ROW LEVEL SECURITY;
ALTER TABLE prolabore_config  FORCE ROW LEVEL SECURITY;
ALTER TABLE empleados         FORCE ROW LEVEL SECURITY;
ALTER TABLE nomina_periodos   FORCE ROW LEVEL SECURITY;
ALTER TABLE adelantos         FORCE ROW LEVEL SECURITY;
ALTER TABLE sobres_config     FORCE ROW LEVEL SECURITY;
ALTER TABLE cierres_mensuales FORCE ROW LEVEL SECURITY;
ALTER TABLE peticiones_idempotentes FORCE ROW LEVEL SECURITY;
ALTER TABLE nonces_vistos         FORCE ROW LEVEL SECURITY;
ALTER TABLE sesiones              FORCE ROW LEVEL SECURITY;
```

Son **quince de las diecisiete tablas con RLS**. Las dos que faltan no son un olvido: el modelo,
tal como está escrito, deja de funcionar si se les pone.

| Tabla | Por qué no lleva `FORCE` | Qué la protege en su lugar |
|---|---|---|
| `usuarios` | `fn_es_gerencia()` consulta `usuarios` y las políticas de `usuarios` la llaman. Lo que corta el ciclo es que la función corre como el dueño y el dueño no pasa por RLS. Con `FORCE` vuelve el `infinite recursion detected in policy for relation "usuarios"` que ya advierte el [§7](#7-seguridad-por-tipo-de-usuario-rls) | `prisma_api` **no es dueño**, así que sus políticas sí lo juzgan |
| `auditoria` | Solo tiene política de `SELECT`. La función `SECURITY DEFINER` del [§5.4](#54-auditoría-por-triggers) escribe la bitácora amparada en que el dueño se salta RLS; con `FORCE`, **toda la auditoría deja de escribirse** | Igual: `prisma_api` no es dueño, y `UPDATE` y `DELETE` le están cerrados por política y por motor ([§5.1](#51-revocación-real-del-borrado)) |

> **La excepción del dueño no es un hueco mientras el dueño no sea la API.** `FORCE` protege del
> descuido; lo que de verdad sostiene la seguridad es la segunda condición de [ADR-012](adr/ADR-012-identidad-a-postgres.md): el rol con
> el que `prisma_api` se conecta no crea, no posee y no hereda nada. Eso es el [§9](#9-el-rol-con-el-que-se-conecta-la-api), y no es
> opcional.

**El orden importa, como en el bloque anterior.** Este `ALTER TABLE` va después de las semillas,
nunca antes: con `FORCE` ya puesto, el `INSERT` de los seis cargos del [§4.2](#42-cargos-usuarios-y-cuentas) chocaría con
`cargos_escritura`, que exige `fn_es_gerencia()`, y durante una migración no hay `auth.uid()` a
quien preguntarle. Lo mismo vale para las semillas de `sobres_config`. En el script real este
bloque es **lo último**: corre cuando ya están creadas las tablas, escritas las políticas,
encendida la RLS y sembrados los datos iniciales del [§8](#8-datos-iniciales).

Para lo que venga después —una migración que corrija una fila de una tabla con `FORCE`— el rol de
migraciones conserva `BYPASSRLS`, que gana incluso sobre `FORCE`. Es el único rol del proyecto que
lo tiene, no atiende peticiones de usuario y su clave vive en un secreto aparte ([§9](#9-el-rol-con-el-que-se-conecta-la-api)). El script
inicial, aun así, no depende de ese atributo: se ordena bien y listo.

---

## 8. Datos iniciales

| Tabla | Contenido semilla |
|---|---|
| `cargos` | Gerente · Empleada de producción · Domiciliaria · Asistente administrativa · Aprendiz SENA · Contratista externo |
| `cuentas` | Efectivo · Nequi · Daviplata · Bancolombia |
| `categorias` ingreso | Estampado · Bordado · Diseño · Otros |
| `categorias` gasto fijo | Arriendo · Servicios · Internet · Plan de datos |
| `categorias` gasto variable | Insumos · Transferencias DTF · Mugs · Llaveros · Transporte · Mantenimiento · Publicidad |
| `productos` | Mug estampado · Camiseta DTF · Llavero acrílico · Rompecabezas A4 · Bordado (servicio) |
| `sobres_config` | 45% costo directo · 25% gastos fijos · 10% reserva · 20% retiro |

Los porcentajes iniciales de los sobres son una **sugerencia de arranque**, no una imposición:
se ajustan desde la configuración y cada cambio queda registrado con su fecha de vigencia.

---

## 9. El rol con el que se conecta la API

`prisma_api` se conecta a PostgreSQL con un rol dedicado, que también se llama `prisma_api`. No
es el rol de las migraciones, no es `service_role` y no es dueño de nada. Son la primera y la
segunda de las cuatro condiciones de **[ADR-012](adr/ADR-012-identidad-a-postgres.md)**, y sin ellas el [§7.1](#71-force-row-level-security-por-qué-ahora-sí-hace-falta) no sirve de mucho.

| Atributo | Valor | Por qué |
|---|---|---|
| `SUPERUSER` | ❌ | Un superusuario se salta RLS, los permisos y todo lo demás |
| `BYPASSRLS` | ❌ | Es exactamente el atributo que apagaría este documento entero |
| `CREATEDB` / `CREATEROLE` | ❌ | La API no crea bases ni reparte permisos |
| Dueño de las tablas | ❌ | El dueño se salta RLS salvo `FORCE`, y no queremos depender solo de eso |
| `INHERIT` | ❌ | Los permisos de `authenticated` solo llegan cuando la API los pide con `SET LOCAL ROLE` |
| Permisos sobre tablas | `SELECT`, `INSERT`, `UPDATE` | Lo mínimo para operar. `DELETE` y `TRUNCATE` revocados, igual que para `authenticated` ([§5.1](#51-revocación-real-del-borrado)) |

```sql
-- El rol con el que prisma_api abre cada conexión. La clave llega del gestor de secretos
-- del ambiente; nunca del repositorio.
CREATE ROLE prisma_api LOGIN
  NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS
  PASSWORD :'clave_prisma_api';

-- Entra al esquema, pero no crea objetos dentro de él: nada de lo que hay ahí es suyo.
GRANT USAGE ON SCHEMA public TO prisma_api;
REVOKE CREATE ON SCHEMA public FROM prisma_api;

-- Lo mínimo para operar. Nada de borrar.
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO prisma_api;
REVOKE DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM prisma_api;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO prisma_api;

-- Y lo mismo para lo que se cree después, sin tener que acordarse en cada migración.
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE ON TABLES TO prisma_api;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  REVOKE DELETE, TRUNCATE ON TABLES FROM prisma_api;

-- Puede asumir `authenticated`, que es el rol que evalúan las políticas del §7, pero tiene
-- que pedirlo: NOINHERIT obliga al SET LOCAL ROLE explícito de cada transacción.
GRANT authenticated TO prisma_api;
```

`NOINHERIT` es el detalle que más se subestima. Con `INHERIT`, `prisma_api` tendría desde el
primer instante todo lo que tiene `authenticated`, lo pida o no. Con `NOINHERIT`, la única forma
de operar como `authenticated` es el `SET LOCAL ROLE authenticated` que [ADR-012](adr/ADR-012-identidad-a-postgres.md) exige dentro de
la transacción, junto al `set_config('request.jwt.claims', …)` que alimenta a `auth.uid()`. Si
alguien escribe una consulta olvidando abrir esa transacción, no obtiene privilegios de más:
se queda con los suyos, que no incluyen nada que `authenticated` no tenga.

> **Y si el `SET LOCAL ROLE` se olvida, tampoco se cae la seguridad.** Ninguna política del [§7](#7-seguridad-por-tipo-de-usuario-rls)
> lleva cláusula `TO`, así que todas rigen para cualquier rol, `prisma_api` incluido. Sin claims
> propagados `auth.uid()` es nulo, `fn_es_gerencia()` da falso y las consultas devuelven vacío.
> **Falla cerrado.** El error se nota rápido y no filtra nada mientras tanto.

| Rol | Para qué | Dónde vive su clave |
|---|---|---|
| `prisma_api` | Atender peticiones de usuario | Secreto del ambiente, leído por la API al arrancar |
| Rol de migraciones (`postgres`) | Crear tablas, promover migraciones, sembrar | Secreto distinto, solo en la canalización de despliegue |
| `service_role` de Supabase | Migraciones, y crear identidades contra GoTrue ([ADR-033](adr/ADR-033-service-role-solo-en-auth.md)) | Secreto distinto. **Nunca contra PostgreSQL** |

Que sean tres claves distintas y no una es el punto: si la de la API se filtra, lo que se filtra
es un rol que no puede borrar, no puede crear y no se salta RLS.

La prueba que demuestra que esto funciona —entrar como Operación por la API y comprobar que la
nómina, los usuarios y el patrimonio ajenos llegan vacíos **por decisión de la base**— vive en
[ADR-012](adr/ADR-012-identidad-a-postgres.md) y se ejecuta en los cuatro ambientes.

### 9.1 `anon` no toca nada

Supabase crea dos roles que este modelo no usa: `anon`, el de quien no ha entrado, y
`service_role`, que contra PostgreSQL no se usa nunca ([ADR-033](adr/ADR-033-service-role-solo-en-auth.md)). Y a `anon` le concede por
defecto `SELECT`, `INSERT` y `UPDATE` sobre todo `public`. **Eso no es una puerta teórica:** su
clave es pública por diseño, y con la Data API encendida cualquiera escribe en las tablas que el
[§7](#7-seguridad-por-tipo-de-usuario-rls) deja sin RLS a propósito y lee las que tienen una política de lectura abierta, `movimientos`
entre ellas. Nadie habla con la base salvo `prisma_api`: ni el front, que no sabe de Supabase
([ADR-018](adr/ADR-018-front-sin-decisiones.md)), ni nada más.

```sql
-- Nada, ni ahora ni en lo que se cree después. El esquema se lo lleva a uat y a prod.
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE USAGE ON SCHEMA public FROM anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon;
```

**`authenticated` no se toca.** Es el rol que la API asume con `SET LOCAL ROLE` en cada
transacción, y es el que evalúan las políticas del [§7](#7-seguridad-por-tipo-de-usuario-rls): quitarle sus permisos apagaría el
producto entero.

> **Apagar la Data API en la consola no sustituye a esto.** Cierra el agujero en el proyecto donde
> se apaga y en ninguno más: una casilla de consola no viaja con el esquema, así que uat y prod
> nacerían abiertos. La casilla y la revocación resuelven cosas distintas y van las dos.

---

## 10. Funciones de negocio atómicas

Hay operaciones que tocan varias tablas y que **no pueden quedar a medias**. Si se escriben como
tres llamadas seguidas desde la API, basta un tiempo de espera agotado entre la segunda y la
tercera para dejar la base mintiendo: un pedido entregado que nunca causó la venta, una nómina
pagada sin descontar el adelanto.

> **Lo que tiene que ser atómico vive en la base, no en la API.** No porque la API no sepa hacer
> transacciones, sino porque la regla queda en el único sitio que nadie puede saltarse, y porque
> así hay una sola versión de los pasos en lugar de una por cada quien que llame.

| Función | Qué hace, en una sola transacción | Qué impide |
|---|---|---|
| `fn_entregar_pedido(p_pedido UUID, p_fecha DATE, p_cuenta UUID)` | Marca el pedido `entregado` con su `fecha_entrega_real`, devenga sus anticipos (`devengado_en`) y escribe el movimiento que causa la venta | Un pedido entregado cuyo anticipo sigue contando como pasivo en la caja libre |
| `fn_liquidar_nomina(p_periodo UUID, p_empleado UUID, …)` | Escribe la fila de `nomina_detalle`, marca con `descontado_en` los adelantos pendientes de esa persona y escribe el movimiento del pago | Que un adelanto se descuente dos veces, o ninguna ([RN-11](03-requisitos-y-bdd.md#rn-11)) |
| La función `SECURITY DEFINER` del [§5.4](#54-auditoría-por-triggers), usada en el [§5.7](#57-reactivar-y-revertir-escrituras-compensatorias) | Aplica el `UPDATE` que deshace un cambio y escribe la fila `cambio_revertido` con su `revierte_a` | Una bitácora que anota una reversión que no ocurrió, o al revés |

La tercera **ya está en este documento**: es la misma función del [§5.4](#54-auditoría-por-triggers) que escribe los eventos de
acceso y administración. No se duplica aquí; se nombra para dejar claro que pertenece a esta
lista y obedece las mismas reglas.

Tres reglas que valen para las tres:

1. **La API las llama; no rehace sus pasos.** Si `prisma_api` escribe por su cuenta los tres
   `UPDATE` de una entrega, ya hay dos versiones del procedimiento y solo una se prueba.
2. **Son `SECURITY INVOKER`**, que es el valor por omisión y aquí es la decisión correcta: corren
   con los permisos de quien llama, así que **RLS sigue juzgando** cada fila que tocan. La única
   excepción es la del [§5.4](#54-auditoría-por-triggers), que es `SECURITY DEFINER` porque `auditoria` no tiene política de
   `INSERT` a propósito.
3. **Llevan `SET search_path = public, pg_temp`**, igual que todas las demás funciones del
   documento y por la misma razón ([§7](#7-seguridad-por-tipo-de-usuario-rls)).

Los pasos financieros de cada una salen tal cual de
[`05-reglas-financieras.md`](05-reglas-financieras.md) y de
[`06-nomina-y-capacidad-de-pago.md`](06-nomina-y-capacidad-de-pago.md). No se repiten aquí:
dos copias de una regla financiera es exactamente el problema que estas funciones resuelven.

---

## 11. El contrato de errores

La base no sabe hablar. Cuando rechaza algo devuelve `23514 check_violation` en la restricción
`transferencia_con_destino`, y eso no se le puede mostrar a la dueña del taller. La API traduce.
Para que pueda traducir, cada restricción de este documento tiene **nombre explícito** ([§4.1](#41-tipos-y-convenciones-comunes)) y
cada nombre tiene su entrada en la tabla de traducción de `prisma_api`: un **código de cinco
dígitos** del catálogo —de donde sale el mensaje en español, que no se escribe dos veces— y el
campo del formulario al que señala.

> **La tabla existe desde la tarea [1.8](08-plan-de-desarrollo.md#tarea-1-8)** y es
> `interfaz/error/TraduccionDeRestricciones` en `prisma_api`. Casi todas sus filas comparten el
> código transversal de su clase, por lo mismo que los dominios: noventa y tres frases que dicen
> dos cosas no son noventa y tres mensajes. Un rechazo de llave foránea ocurre en cualquier
> módulo, así que su código tiene que ser uno de los transversales; darle un caso de módulo
> afirmaría pertenecer a uno al que no pertenece ([20 §2.4](20-contrato-de-api.md#24-los-rangos-por-módulo)). Lo que lleva código propio es lo que ya
> tiene contrato acordado, y el contrato de cada módulo afina el resto cuando le toca.

**La tabla de traducción se indexa por `(objeto, restricción)`, no por el nombre solo.** En este
modelo `anulacion_con_motivo` existe en `cargos`, `cuentas` y `movimientos`, y
`desactivacion_con_motivo` existe en `cargos` y en `usuarios` diciendo cosas distintas: en
`cargos` amarra `activo` con `anulado_en`, en `usuarios` amarra `activo` con las tres columnas de
desactivación. PostgreSQL permite repetir el nombre entre tablas; una tabla de traducción indexada
solo por el nombre le daría el mensaje de una a la otra.

Si la API recibe un error de la base que no está en esa tabla, **devuelve 500 y lo registra como
defecto**. Significa que hay una regla en la base que la API no conocía, y eso es lo que hay que
descubrir, no esconder.

La prueba que lo sostiene recorre el catálogo de PostgreSQL y compara:

```sql
-- Toda restricción con nombre del esquema público: las de tabla y las de dominio.
SELECT COALESCE(rel.relname, typ.typname) AS objeto,
       CASE WHEN con.contypid <> 0 THEN 'dominio' ELSE 'tabla' END AS clase,
       con.conname AS restriccion,
       con.contype AS tipo   -- c = CHECK · u = UNIQUE · f = FOREIGN KEY · x = EXCLUDE
FROM pg_constraint con
LEFT JOIN pg_class     rel ON rel.oid = con.conrelid
LEFT JOIN pg_type      typ ON typ.oid = con.contypid
JOIN      pg_namespace ns  ON ns.oid  = con.connamespace
WHERE ns.nspname = 'public'
  AND con.contype IN ('c', 'u', 'f', 'x')
ORDER BY objeto, restriccion;
```

Cada fila que salga de ahí y no tenga entrada en la tabla de traducción **hace fallar la prueba**.
Agregar una restricción y olvidar el mensaje deja de ser un descubrimiento del día de producción
y pasa a ser un rojo en la canalización.

> **La prueba mira en las dos direcciones, y eso fija el orden de los PR.** Una restricción sin
> fila rompe, y una fila sin restricción también. Así que la fila **no se puede poner antes** de que
> la migración exista: la API la agrega en el mismo PR en que recoge el esquema nuevo. Las cuatro
> restricciones que faltan por escribir lo dicen en su tarea —`destino_solo_en_transferencia` y
> `destino_distinto_del_origen` de la [3.15](08-plan-de-desarrollo.md#tarea-3-15), las dos bajo `42226`; `cancelacion_con_motivo` y
> `destino_del_anticipo_valido` de la [4.11](08-plan-de-desarrollo.md#tarea-4-11)—, y la [2.22](08-plan-de-desarrollo.md#tarea-2-22) no agrega ninguna: reusa
> `cargos_nombre_key`, que ya tiene la suya.

Tres cosas que esta consulta no cubre, y hay que decirlas:

- **`NOT NULL` no aparece en `pg_constraint`.** Llega como `23502` trayendo la tabla y la columna,
  no un nombre de restricción, así que la tabla de traducción lo resuelve por columna. Son
  decenas de columnas y un solo patrón de mensaje: «Falta *campo*».
- **Un dominio no dice qué columna falló.** `dinero_positivo_mayor_que_cero` informa el dominio,
  no el `valor` de `movimientos`. Es el precio de que la regla viva en un solo sitio, y se paga
  barato: la API sabe qué campo mandó, así que arma el mensaje con el campo de la petición y el
  texto del dominio. A cambio, el mensaje de `dinero_no_negativo` se escribe una sola vez y sirve
  para las veintidós columnas que usan ese dominio.
- **Las llaves primarias quedan fuera del filtro**, y aun así se traducen. El identificador lo pone
  quien pide, al decidir la acción ([ADR-020](adr/ADR-020-idempotencia.md)), así que el mismo dos veces es un caso real y no un
  imposible. Que la tabla tenga esas filas sin que la consulta las exija es a propósito: la
  dirección que busca traducciones muertas mira **todas** las restricciones de la base, no solo
  las de este filtro, o denunciaría como muerta la única fila que impide que ese rechazo salga
  como error del sistema.

Este contrato es la mitad que sostiene el modelo de **dos capas que deciden —la base y la API— y
una que pinta**, que [ADR-018](adr/ADR-018-front-sin-decisiones.md) fijó al reemplazar a
[ADR-015](adr/ADR-015-validacion-tres-capas.md). La otra mitad —que la API repita en su idioma las
mismas reglas que la base— solo aguanta si esta prueba corre en cada despliegue. Sin ella, las dos
capas que deciden se separan y ninguna avisa.

<!-- generado:referenciado-desde · no editar a mano: lo escribe scripts/docs/documentar.mjs -->
**🔗 Referenciado desde:** [03](03-requisitos-y-bdd.md "03 · Requisitos, reglas de negocio y escenarios BDD") · [06](06-nomina-y-capacidad-de-pago.md "06 · Nómina y capacidad de pago") · [07](07-arquitectura.md "07 · Arquitectura técnica") · [08](08-plan-de-desarrollo.md "08 · Plan de desarrollo") · [12](12-pruebas-y-calidad.md "12 · Pruebas y calidad") · [16](16-base-de-datos-y-snapshots.md "16 · Base de datos: snapshots y datos de prueba") · [17](17-resiliencia-offline-y-cache.md "17 · Resiliencia, trabajo sin conexión y caché") · [20](20-contrato-de-api.md "20 · Contrato de la API") · [21](21-trabajo-en-paralelo.md "21 · Trabajo en paralelo por carriles") · [Contrato](../contrato/README.md "Contrato de la API · v0.13.0") · [ADR-010](adr/ADR-010-almacenamiento-contrasenas.md "ADR-010 · Almacenamiento de contraseñas: hashing delegado con salt por usuario") · [ADR-012](adr/ADR-012-identidad-a-postgres.md "ADR-012 · La API propaga la identidad a PostgreSQL para que RLS siga juzgando") · [ADR-020](adr/ADR-020-idempotencia.md "ADR-020 · Idempotencia obligatoria en toda escritura") · [ADR-029](adr/ADR-029-esquema-por-etiqueta.md "ADR-029 · El esquema llega a la API por etiqueta, y la integración continua lo levanta con Supabase") · [ADR-033](adr/ADR-033-service-role-solo-en-auth.md "ADR-033 · La clave de servicio entra, pero solo para crear identidades") · [CLAUDE](../CLAUDE.md "CLAUDE.md")
<!-- /generado:referenciado-desde -->

---

### 🧭 Navegación

**⬅️ Anterior:** [03 · Requisitos y BDD](03-requisitos-y-bdd.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [05 · Reglas financieras](05-reglas-financieras.md)
