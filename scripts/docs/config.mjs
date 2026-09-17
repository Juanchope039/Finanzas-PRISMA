// Configuración de la documentación de PRISMA.
//
// Qué documentos se cubren, qué estados y etiquetas existen y dónde se define cada familia de
// identificadores. Las reglas que esto sostiene están escritas en docs/22-documentacion.md: si
// cambia algo aquí, cambia allá en el mismo commit.

export const GITHUB = 'https://github.com/Juanchope039';

export const ESPECIFICACION = {
  nombre: 'Finanzas-PRISMA',
  github: `${GITHUB}/Finanzas-PRISMA`,
  rama: 'main',
};

// Los repositorios de código viven dentro de repositories/, que la especificación ignora
// (ADR-025). Si no están en disco —como en la CI de este repositorio— simplemente no se revisan.
export const REPOS_DE_CODIGO = [
  {
    carpeta: 'repositories/backend-api',
    nombre: 'prisma_api',
    github: `${GITHUB}/Finanzas-PRISMA-API`,
    version: { archivo: 'build.gradle.kts', patron: /^version = "([^"]+)"/m },
  },
  {
    carpeta: 'repositories/backend-db',
    nombre: 'prisma_db',
    github: `${GITHUB}/Finanzas-PRISMA-DB`,
    version: null,
  },
  {
    carpeta: 'repositories/frontend-flutter',
    nombre: 'prisma_front',
    github: `${GITHUB}/Finanzas-PRISMA-Front`,
    version: { archivo: 'pubspec.yaml', patron: /^version: ([0-9][^+\s]*)/m },
  },
];

// Documentos de la especificación que muestran además la versión de otra cosa. La verificación
// comprueba que el número del encabezado sea el del archivo.
export const VERSIONES_EXTRA = {
  'contrato/README.md': {
    columna: 'Contrato',
    archivo: 'contrato/openapi.json',
    leer: (texto) => JSON.parse(texto).info.version,
  },
};

// Archivos Markdown que no son documentación del proyecto: plantillas de terceros.
export const EXCLUIDOS = new Set([
  'repositories/frontend-flutter/ios/Runner/Assets.xcassets/LaunchImage.imageset/README.md',
]);

// Carpetas cuyo Markdown no es documentación del proyecto y no se versiona con ADR-027:
// `.claude` y `.agents` traen habilidades y configuración de agentes que quien las instala no
// escribe, así que pedirles encabezado sería pedirle a la herramienta que edite algo de otro; y
// `plan` guarda planes de trabajo, que son el registro de lo que se decidió antes de escribir el
// código y no se corrigen después. De `plan` sí se verifica el nombre, aquí abajo.
export const CARPETAS_EXCLUIDAS = ['.claude', '.agents', 'plan'];

// Los planes de trabajo: uno por cada plan que se escribe antes de tocar código, numerado en el
// orden en que se decidieron. La numeración arranca en 01, no salta y no se repite, porque de ella
// sale ese orden; `verificar` lo comprueba. Las reglas están en docs/22-documentacion.md §10.
export const CARPETA_DE_PLANES = 'plan';
export const NOMBRE_DE_PLAN = /^(\d{2,})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;

export const ZONA_HORARIA = 'America/Bogota';

// Documento donde viven las reglas: los enlaces de estado y etiqueta apuntan aquí.
export const DOC_REGLAS = 'docs/22-documentacion.md';
export const DOC_INDICE = 'docs/INDICE.md';
export const DOC_PLAN = 'docs/08-plan-de-desarrollo.md';
export const DOC_TAREAS = 'TODO.md';

// «cero»: la versión tiene que ser 0.y.z. «estable»: 1.0.0 o más. «cualquiera»: sin regla.
export const ESTADOS = {
  documento: {
    'Borrador': { icono: '📝', versiones: 'cero' },
    'Propuesta': { icono: '💡', versiones: 'cero' },
    'En revisión': { icono: '🔍', versiones: 'cero' },
    'Vigente': { icono: '✅', versiones: 'estable' },
    'Vivo': { icono: '🔄', versiones: 'estable' },
    'Reemplazado': { icono: '⛔', versiones: 'cualquiera' },
  },
  adr: {
    'Propuesto': { icono: '📝', versiones: 'cero' },
    'Aceptado': { icono: '✅', versiones: 'estable' },
    'Rechazado': { icono: '❌', versiones: 'cualquiera' },
    'Reemplazado': { icono: '⛔', versiones: 'cualquiera' },
  },
};

export const ETIQUETAS = {
  'negocio': 'Negocio',
  'finanzas': 'Finanzas',
  'nomina': 'Nómina',
  'requisitos': 'Requisitos',
  'ux': 'UX',
  'arquitectura': 'Arquitectura',
  'api': 'API',
  'front': 'Front',
  'base-de-datos': 'Base de datos',
  'seguridad': 'Seguridad',
  'datos-personales': 'Datos personales',
  'calidad': 'Calidad',
  'entrega': 'Entrega',
  'plan': 'Plan',
  'paralelo': 'Paralelo',
  'contrato': 'Contrato',
  'proceso': 'Proceso',
};

// Dónde se define cada familia de identificadores. El ancla es el identificador en minúsculas
// (RF-01 → #rf-01). Si la familia tiene sección propia para algunos casos —como CU-01—, el ancla
// va en ese encabezado y la fila de la tabla enlaza a él.
export const FAMILIAS = [
  { familia: 'BDD', documento: 'docs/03-requisitos-y-bdd.md' },
  { familia: 'RNF', documento: 'docs/03-requisitos-y-bdd.md' },
  { familia: 'RF', documento: 'docs/03-requisitos-y-bdd.md' },
  { familia: 'RN', documento: 'docs/03-requisitos-y-bdd.md' },
  { familia: 'CU', documento: 'docs/02-casos-de-uso.md' },
  { familia: 'R', documento: 'docs/11-riesgos-y-proteccion-de-datos.md' },
  { familia: 'RE', documento: 'docs/12-pruebas-y-calidad.md' },
  { familia: 'P', documento: 'docs/12-pruebas-y-calidad.md' },
  { familia: 'A', documento: 'docs/12-pruebas-y-calidad.md' },
  { familia: 'M', documento: 'docs/12-pruebas-y-calidad.md' },
  { familia: 'I', documento: 'docs/12-pruebas-y-calidad.md' },
  { familia: 'F', documento: 'docs/12-pruebas-y-calidad.md' },
  { familia: 'T', documento: 'docs/12-pruebas-y-calidad.md' },
  { familia: 'C', documento: 'docs/12-pruebas-y-calidad.md' },
  { familia: 'D', documento: 'docs/14-roadmap-e-ideas.md' },
  { familia: 'S', documento: 'docs/01-vision-y-alcance.md' },
  { familia: 'H', documento: 'docs/08-plan-de-desarrollo.md' },
];

// Los documentos que solo son índices no cuentan en «Referenciado desde»: enlazan a todo.
export const NO_CUENTAN_COMO_REFERENCIA = new Set([
  'README.md',
  'TODO.md',
  'docs/INDICE.md',
  'docs/adr/README.md',
]);

// El calendario del plan. Un carril avanza al ritmo del plan original: 151,5 días de trabajo en 23
// semanas de desarrollo. La estabilización no se parte: son 3 semanas con cualquier número de
// carriles (21-trabajo-en-paralelo.md §5).
export const RITMO_DIAS_POR_SEMANA = 151.5 / 23;
// Cada carril activo de más le quita un 10 % de ritmo a todos: revisiones cruzadas, acuerdos de
// contrato e integración. Con 2 carriles el calendario da ≈17,7 semanas, lo mismo que 21 §5
// estimaba a ojo antes de que existiera este cálculo.
export const COSTO_DE_COORDINACION_POR_CARRIL = 0.1;
// Fecha en que arrancó el desarrollo; solo sirve para dibujar el diagrama de Gantt.
export const INICIO_DEL_PLAN = '2026-09-15';
export const SEMANAS_DE_ESTABILIZACION = 3;
export const CARRILES_A_SIMULAR = [1, 2, 3];
export const CARRILES_DE_TRABAJO = ['API', 'Base', 'Front', 'Contrato', 'Decisión'];
