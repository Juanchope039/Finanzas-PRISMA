// El plan de desarrollo como grafo de dependencias.
//
// Las tablas de tareas de docs/08-plan-de-desarrollo.md son la fuente: cada fila dice su carril, de
// qué depende y cuántos días lleva. De ahí salen las oleadas de cada sprint, el camino crítico y el
// calendario con 1, 2 o 3 carriles activos. Nada de eso se escribe a mano.

import {
  CARRILES_A_SIMULAR,
  CARRILES_DE_TRABAJO,
  COSTO_DE_COORDINACION_POR_CARRIL,
  INICIO_DEL_PLAN,
  RITMO_DIAS_POR_SEMANA,
  SEMANAS_DE_ESTABILIZACION,
} from './config.mjs';
import { decimal, lineasDeCodigo } from './markdown.mjs';

const EPSILON = 1e-9;
const CABECERA_TAREAS = /^\|\s*#\s*\|\s*Tarea\s*\|\s*Carril\s*\|\s*Depende de\s*\|\s*Días\s*\|/;

function celdasDeFila(fila) {
  return fila.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
}

export function ordenDeTarea(id) {
  const [s, n] = id.split('.').map(Number);
  return s * 1000 + n;
}

// Lee las tablas de tareas. Devuelve las tareas y los errores de forma que encuentre.
export function leerPlan(contenido) {
  const lineas = contenido.split('\n');
  const enCodigo = lineasDeCodigo(lineas);
  const tareas = [];
  const errores = [];
  const titulos = new Map();
  let sprint = null;
  let enTabla = false;
  lineas.forEach((linea, i) => {
    if (enCodigo[i]) return;
    const encabezado = linea.match(/^###\s+(?:<a id="[^"]*"><\/a>)?Sprint (\d)\b(?:\s*·\s*([^·]+?))?(?:\s*·|\s*$)/);
    if (encabezado) {
      sprint = Number(encabezado[1]);
      titulos.set(sprint, (encabezado[2] ?? '').replace(/\*\*/g, '').trim());
    }
    if (CABECERA_TAREAS.test(linea)) {
      enTabla = true;
      return;
    }
    if (!enTabla) return;
    if (!linea.startsWith('|')) {
      enTabla = false;
      return;
    }
    if (/^\|[\s:|-]+\|$/.test(linea)) return;
    const [idCelda, texto, carrilCelda, dependenciasCelda, diasCelda] = celdasDeFila(linea);
    const id = idCelda.replace(/<[^>]*>/g, '').trim();
    if (!/^\d\.\d{1,2}$/.test(id)) {
      errores.push(`línea ${i + 1}: «${idCelda}» no es un número de tarea`);
      return;
    }
    const carriles = carrilCelda.split(',').map((c) => c.trim()).filter(Boolean);
    for (const c of carriles) {
      if (!CARRILES_DE_TRABAJO.includes(c)) errores.push(`línea ${i + 1}: la tarea ${id} tiene el carril desconocido «${c}»`);
    }
    const sinEnlaces = dependenciasCelda.replace(/\]\([^)]*\)/g, ']');
    const dependencias = [...sinEnlaces.matchAll(/(?<![\d.])(\d\.\d{1,2})(?![\d])|\bH(\d{1,2})\b/g)].map((m) =>
      m[1] ? m[1] : `H${m[2]}`,
    );
    const dias = Number(diasCelda.replace(',', '.'));
    if (!(dias > 0)) errores.push(`línea ${i + 1}: la tarea ${id} no tiene días válidos («${diasCelda}»)`);
    const movida = texto.match(/⏭️\s*(?:\*\*)?(?:\[)?Sprint (\d)/);
    tareas.push({
      id,
      linea: i,
      sprint,
      sprintEfectivo: movida ? Number(movida[1]) : sprint,
      movida: Boolean(movida),
      texto,
      carriles,
      carril: carriles[0],
      dependencias,
      dias,
    });
  });
  return { tareas, errores, titulos };
}

// H1 es el Sprint 0, H10 el Sprint 9. Las tareas movidas cuentan en el sprint al que se movieron.
export function tareasDeHito(tareas, n) {
  return tareas.filter((t) => t.sprintEfectivo === n - 1).map((t) => t.id);
}

export function validarPlan(tareas) {
  const errores = [];
  const porId = new Map();
  for (const t of tareas) {
    if (porId.has(t.id)) errores.push(`la tarea ${t.id} está dos veces`);
    porId.set(t.id, t);
  }
  for (const t of tareas) {
    for (const d of t.dependencias) {
      if (d.startsWith('H')) {
        const n = Number(d.slice(1));
        if (n < 1 || n > 10) errores.push(`la tarea ${t.id} depende del hito ${d}, que no tiene tareas`);
      } else if (!porId.has(d)) errores.push(`la tarea ${t.id} depende de ${d}, que no existe`);
      if (d === t.id) errores.push(`la tarea ${t.id} depende de sí misma`);
    }
  }
  const estado = new Map();
  const visitar = (id, camino) => {
    if (estado.get(id) === 'hecho') return;
    if (estado.get(id) === 'visitando') {
      errores.push(`hay un ciclo de dependencias: ${[...camino, id].join(' → ')}`);
      return;
    }
    estado.set(id, 'visitando');
    for (const p of predecesores(tareas, porId.get(id))) visitar(p, [...camino, id]);
    estado.set(id, 'hecho');
  };
  if (!errores.length) for (const t of tareas) visitar(t.id, []);
  return errores;
}

function predecesores(tareas, tarea) {
  const lista = [];
  for (const d of tarea.dependencias) {
    if (d.startsWith('H')) lista.push(...tareasDeHito(tareas, Number(d.slice(1))));
    else lista.push(d);
  }
  return [...new Set(lista)].filter((p) => p !== tarea.id);
}

function ordenTopologico(tareas) {
  const porId = new Map(tareas.map((t) => [t.id, t]));
  const visto = new Set();
  const orden = [];
  const visitar = (id) => {
    if (visto.has(id)) return;
    visto.add(id);
    for (const p of predecesores(tareas, porId.get(id))) visitar(p);
    orden.push(porId.get(id));
  };
  [...tareas].sort((a, b) => ordenDeTarea(a.id) - ordenDeTarea(b.id)).forEach((t) => visitar(t.id));
  return orden;
}

// La cadena más larga de días que no se puede partir: ni con carriles de sobra baja de aquí.
export function caminoCritico(tareas) {
  const acumulado = new Map();
  const previo = new Map();
  for (const t of ordenTopologico(tareas)) {
    let mejor = 0;
    let desde = null;
    for (const p of predecesores(tareas, t)) {
      if (acumulado.get(p) > mejor) {
        mejor = acumulado.get(p);
        desde = p;
      }
    }
    acumulado.set(t.id, mejor + t.dias);
    previo.set(t.id, desde);
  }
  let fin = null;
  for (const [id, dias] of acumulado) if (fin === null || dias > acumulado.get(fin)) fin = id;
  const cadena = [];
  for (let id = fin; id; id = previo.get(id)) cadena.unshift(id);
  return { dias: acumulado.get(fin), cadena };
}

// Cuántos días de trabajo cuelgan de cada tarea, ella incluida: sirve para elegir primero lo que
// más retrasa a los demás.
function colas(tareas) {
  const sucesores = new Map(tareas.map((t) => [t.id, []]));
  for (const t of tareas) for (const p of predecesores(tareas, t)) sucesores.get(p).push(t.id);
  const porId = new Map(tareas.map((t) => [t.id, t]));
  const memo = new Map();
  const cola = (id) => {
    if (memo.has(id)) return memo.get(id);
    let mayor = 0;
    for (const s of sucesores.get(id)) mayor = Math.max(mayor, cola(s));
    const total = porId.get(id).dias + mayor;
    memo.set(id, total);
    return total;
  };
  return new Map(tareas.map((t) => [t.id, cola(t.id)]));
}

export function ritmo(carrilesActivos) {
  return RITMO_DIAS_POR_SEMANA * (1 - COSTO_DE_COORDINACION_POR_CARRIL * (carrilesActivos - 1));
}

// Simula el desarrollo con un número de carriles activos: cuántas tareas avanzan a la vez.
//   - Dos tareas del mismo carril y del mismo sprint no van a la vez: tocan la misma capa de la
//     misma funcionalidad. De sprints distintos sí, que es el reparto por rebanadas de 21 §4.3.
//   - Primero las del sprint más temprano, y entre ellas las que más retrasan a otras.
//   - Las decisiones no ocupan un carril de desarrollo.
//   - Cada carril extra cobra su coordinación (config.mjs).
// Devuelve semanas de calendario.
export function simular(tareas, carrilesActivos, hechas = new Set()) {
  const paso = ritmo(carrilesActivos);
  const colaDe = colas(tareas);
  const fin = new Map();
  const inicio = new Map();
  for (const id of hechas) {
    fin.set(id, 0);
    inicio.set(id, 0);
  }
  const hitos = new Map();
  for (let n = 1; n <= 10; n++) hitos.set(n, tareasDeHito(tareas, n));
  const lista = (dep, ahora) => {
    const ids = dep.startsWith('H') ? hitos.get(Number(dep.slice(1))) : [dep];
    return ids.every((id) => fin.has(id) && fin.get(id) <= ahora + EPSILON);
  };
  const pendientes = tareas
    .filter((t) => !hechas.has(t.id))
    .sort(
      (a, b) =>
        a.sprintEfectivo - b.sprintEfectivo || colaDe.get(b.id) - colaDe.get(a.id) || ordenDeTarea(a.id) - ordenDeTarea(b.id),
    );
  let enCurso = [];
  let ahora = 0;
  while (pendientes.length || enCurso.length) {
    for (let i = 0; i < pendientes.length; i++) {
      const t = pendientes[i];
      if (!t.dependencias.every((d) => lista(d, ahora))) continue;
      if (enCurso.some((c) => c.tarea.carril === t.carril && c.tarea.sprintEfectivo === t.sprintEfectivo)) continue;
      const cuentan = enCurso.filter((c) => c.tarea.carril !== 'Decisión').length;
      if (t.carril !== 'Decisión' && cuentan >= carrilesActivos) continue;
      enCurso.push({ tarea: t, fin: ahora + t.dias / paso });
      inicio.set(t.id, ahora);
      pendientes.splice(i, 1);
      i--;
    }
    if (!enCurso.length) {
      if (pendientes.length) throw new Error(`el plan se bloquea: ${pendientes.map((t) => t.id).join(', ')} nunca quedan listas`);
      break;
    }
    ahora = Math.min(...enCurso.map((c) => c.fin));
    for (const c of enCurso.filter((c) => c.fin <= ahora + EPSILON)) fin.set(c.tarea.id, c.fin);
    enCurso = enCurso.filter((c) => c.fin > ahora + EPSILON);
  }
  const semanas = Math.max(0, ...[...fin.values()]);
  const semanaDeHito = new Map();
  for (const [n, ids] of hitos) {
    const pendientesDelHito = ids.filter((id) => !hechas.has(id));
    semanaDeHito.set(n, pendientesDelHito.length ? Math.max(...pendientesDelHito.map((id) => fin.get(id))) : 0);
  }
  return { semanas, inicio, fin, semanaDeHito };
}

// Dentro de un sprint: qué tareas pueden ir a la vez, contando solo las dependencias del mismo
// sprint. Oleada 1 = no espera a nada del sprint.
export function oleadas(tareas, sprint) {
  const delSprint = tareas.filter((t) => t.sprint === sprint && !t.movida);
  const ids = new Set(delSprint.map((t) => t.id));
  const nivel = new Map();
  const calcular = (t) => {
    if (nivel.has(t.id)) return nivel.get(t.id);
    let n = 1;
    for (const d of t.dependencias) {
      if (ids.has(d)) n = Math.max(n, calcular(delSprint.find((x) => x.id === d)) + 1);
    }
    nivel.set(t.id, n);
    return n;
  };
  delSprint.forEach(calcular);
  const grupos = [];
  for (const t of delSprint) {
    const n = nivel.get(t.id);
    (grupos[n - 1] = grupos[n - 1] || []).push(t);
  }
  return grupos.map((g) => g.sort((a, b) => ordenDeTarea(a.id) - ordenDeTarea(b.id)));
}

export function listasYa(tareas, hechas) {
  return tareas
    .filter((t) => !hechas.has(t.id))
    .filter((t) =>
      t.dependencias.every((d) =>
        d.startsWith('H') ? tareasDeHito(tareas, Number(d.slice(1))).every((id) => hechas.has(id)) : hechas.has(d),
      ),
    )
    .sort((a, b) => ordenDeTarea(a.id) - ordenDeTarea(b.id));
}

// ---------------------------------------------------------------------------------------------
// Bloques generados
// ---------------------------------------------------------------------------------------------

const semanasTexto = (s) => `${decimal(s)} semanas`;
const numero = (n) => (Number.isInteger(n) ? String(n) : decimal(n));

export function bloqueResumen(tareas, enlaceDetalle) {
  const partes = CARRILES_A_SIMULAR.map((k) => {
    const total = simular(tareas, k).semanas + SEMANAS_DE_ESTABILIZACION;
    return `**${decimal(total)} semanas con ${k === 1 ? '1 carril' : `${k} carriles`}**`;
  });
  return `${partes.slice(0, -1).join(', ')} y ${partes[partes.length - 1]}, contando las ${SEMANAS_DE_ESTABILIZACION} de estabilización. ${enlaceDetalle}`;
}

// Sa → Sb si alguna tarea de Sb depende de una de Sa, sin las flechas que ya se deducen de otras.
// Dos sprints que dependen el uno del otro —por tareas distintas— se dibujan juntos en un recuadro:
// ninguno va entero antes que el otro.
export function bloqueGrafoDeSprints(tareas, titulos) {
  const sprintDe = new Map(tareas.map((t) => [t.id, t.sprintEfectivo]));
  const sprints = [...new Set(tareas.map((t) => t.sprintEfectivo))].sort((a, b) => a - b);
  const sucesores = new Map(sprints.map((s) => [s, new Set()]));
  for (const t of tareas) {
    for (const p of predecesores(tareas, t)) {
      if (sprintDe.get(p) !== t.sprintEfectivo) sucesores.get(sprintDe.get(p)).add(t.sprintEfectivo);
    }
  }

  // Componentes fuertemente conexos (Tarjan).
  let indice = 0;
  const pila = [];
  const datos = new Map();
  const componentes = [];
  const conectar = (v) => {
    datos.set(v, { indice, bajo: indice, enPila: true });
    indice++;
    pila.push(v);
    for (const w of sucesores.get(v)) {
      if (!datos.has(w)) {
        conectar(w);
        datos.get(v).bajo = Math.min(datos.get(v).bajo, datos.get(w).bajo);
      } else if (datos.get(w).enPila) datos.get(v).bajo = Math.min(datos.get(v).bajo, datos.get(w).indice);
    }
    if (datos.get(v).bajo === datos.get(v).indice) {
      const componente = [];
      let w;
      do {
        w = pila.pop();
        datos.get(w).enPila = false;
        componente.push(w);
      } while (w !== v);
      componentes.push(componente.sort((a, b) => a - b));
    }
  };
  sprints.forEach((s) => datos.has(s) || conectar(s));
  const componenteDe = new Map();
  componentes.forEach((c, i) => c.forEach((s) => componenteDe.set(s, i)));
  const idDe = (i) => (componentes[i].length === 1 ? `S${componentes[i][0]}` : `G${componentes[i].join('')}`);

  // Aristas entre componentes, y su reducción transitiva, que en un grafo sin ciclos es única.
  const entre = new Map(componentes.map((_, i) => [i, new Set()]));
  for (const [a, destinos] of sucesores) {
    for (const b of destinos) if (componenteDe.get(a) !== componenteDe.get(b)) entre.get(componenteDe.get(a)).add(componenteDe.get(b));
  }
  const alcanza = (desde, hasta, sinDirecta) => {
    const pendientes = [...entre.get(desde)].filter((x) => !(sinDirecta && x === hasta));
    const visto = new Set();
    while (pendientes.length) {
      const x = pendientes.pop();
      if (x === hasta) return true;
      if (visto.has(x)) continue;
      visto.add(x);
      pendientes.push(...entre.get(x));
    }
    return false;
  };
  const aristas = [];
  for (const [a, destinos] of entre) for (const b of destinos) if (!alcanza(a, b, true)) aristas.push([a, b]);
  const orden = (i) => componentes[i][0];
  aristas.sort((x, y) => orden(x[0]) - orden(y[0]) || orden(x[1]) - orden(y[1]));

  const etiqueta = (s) => `S${s} · ${(titulos.get(s) ?? '').replace(/"/g, "'")}`;
  const lineas = ['```mermaid', 'graph LR'];
  componentes
    .map((c, i) => [c, i])
    .sort((x, y) => x[0][0] - y[0][0])
    .forEach(([c, i]) => {
      if (c.length === 1) {
        lineas.push(`  S${c[0]}["${etiqueta(c[0])}"]`);
        return;
      }
      lineas.push(`  subgraph ${idDe(i)}["Se entrelazan por tareas"]`);
      for (const s of c) lineas.push(`    S${s}["${etiqueta(s)}"]`);
      lineas.push('  end');
    });
  for (const [a, b] of aristas) lineas.push(`  ${idDe(a)} --> ${idDe(b)}`);
  lineas.push('```');
  return lineas.join('\n');
}

export function bloqueCalendario(tareas, enlaceHito) {
  const total = tareas.reduce((s, t) => s + t.dias, 0);
  const corridas = CARRILES_A_SIMULAR.map((k) => ({ k, ...simular(tareas, k) }));
  const base = corridas[0].semanas + SEMANAS_DE_ESTABILIZACION;
  const filas = corridas.map(({ k, semanas }) => {
    const totalK = semanas + SEMANAS_DE_ESTABILIZACION;
    const ahorro = k === 1 ? '—' : `−${decimal(base - totalK)} semanas`;
    return `| ${k} | ${semanasTexto(semanas)} | ${SEMANAS_DE_ESTABILIZACION} semanas | **${semanasTexto(totalK)}** | ${ahorro} |`;
  });
  const hitos = [];
  for (let n = 1; n <= 10; n++) {
    hitos.push(`| ${enlaceHito(n)} | ${corridas.map((c) => `semana ${Math.ceil(c.semanaDeHito.get(n) - EPSILON)}`).join(' | ')} |`);
  }
  hitos.push(
    `| ${enlaceHito(11)} | ${corridas.map((c) => `semana ${Math.ceil(c.semanas + SEMANAS_DE_ESTABILIZACION - EPSILON)}`).join(' | ')} |`,
  );
  return [
    `**${numero(total)} días de trabajo en ${tareas.length} tareas.** Un carril avanza ${decimal(RITMO_DIAS_POR_SEMANA, 2)} días por semana, el ritmo del plan original; cada carril extra le quita un ${Math.round(COSTO_DE_COORDINACION_POR_CARRIL * 100)} % a todos por coordinación; y dos tareas del mismo carril y del mismo sprint no van a la vez.`,
    '',
    '| Carriles activos | Desarrollo | Estabilización | Total | Frente a 1 carril |',
    '|:---:|---:|---:|---:|---:|',
    ...filas,
    '',
    `| Hito | ${CARRILES_A_SIMULAR.map((k) => (k === 1 ? '1 carril' : `${k} carriles`)).join(' | ')} |`,
    `|---|${CARRILES_A_SIMULAR.map(() => ':---:').join('|')}|`,
    ...hitos,
  ].join('\n');
}

export function bloqueCaminoCritico(tareas, enlaceTarea) {
  const { dias, cadena } = caminoCritico(tareas);
  return [
    `**La cadena más larga de dependencias suma ${numero(dias)} días en ${cadena.length} tareas.** Un día de retraso en cualquiera de ellas es un día de retraso del plan entero, tenga los carriles que tenga:`,
    '',
    cadena.map(enlaceTarea).join(' → '),
  ].join('\n');
}

export function bloqueOleadas(tareas, sprint, enlaceTarea) {
  const grupos = oleadas(tareas, sprint);
  const movidas = tareas.filter((t) => t.sprint === sprint && t.movida);
  const filas = grupos.map((g, i) => {
    const dias = g.reduce((s, t) => s + t.dias, 0);
    const carriles = [...new Set(g.map((t) => t.carril))].join(', ');
    return `| ${i + 1} | ${g.map((t) => enlaceTarea(t.id)).join(' · ')} | ${carriles} | ${numero(dias)} |`;
  });
  const lineas = [
    '**Qué puede ir a la vez en este sprint.** Cada oleada espera solo a las anteriores; dentro de una oleada, todo arranca junto.',
    '',
    '| Oleada | Tareas | Carriles | Días |',
    '|:---:|---|---|---:|',
    ...filas,
  ];
  if (movidas.length) {
    lineas.push('', `Fuera de las oleadas, porque se hacen en otro sprint: ${movidas.map((t) => enlaceTarea(t.id)).join(' · ')}.`);
  }
  return lineas.join('\n');
}

// Un diagrama por carril con 3 carriles activos: cada barra es un sprint en ese carril.
export function bloqueGantt(tareas) {
  const k = Math.max(...CARRILES_A_SIMULAR);
  const { inicio, fin, semanas } = simular(tareas, k);
  const fecha = (semana) => {
    const d = new Date(`${INICIO_DEL_PLAN}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + Math.round(semana * 7));
    return d.toISOString().slice(0, 10);
  };
  const lineas = [
    '```mermaid',
    'gantt',
    `    title Desarrollo de PRISMA con ${k} carriles activos`,
    '    dateFormat YYYY-MM-DD',
    '    axisFormat %d/%m',
  ];
  for (const carril of CARRILES_DE_TRABAJO) {
    const delCarril = tareas.filter((t) => t.carril === carril);
    if (!delCarril.length) continue;
    lineas.push('', `    section ${carril}`);
    const sprints = [...new Set(delCarril.map((t) => t.sprintEfectivo))].sort((a, b) => a - b);
    for (const s of sprints) {
      const grupo = delCarril.filter((t) => t.sprintEfectivo === s);
      const desde = Math.min(...grupo.map((t) => inicio.get(t.id)));
      const hasta = Math.max(...grupo.map((t) => fin.get(t.id)));
      const fin7 = fecha(hasta) === fecha(desde) ? fecha(desde + 1 / 7) : fecha(hasta);
      lineas.push(`    S${s} :${carril.toLowerCase().replace(/[^a-z]/g, '')}${s}, ${fecha(desde)}, ${fin7}`);
    }
  }
  lineas.push(
    '',
    '    section Implantación',
    `    Estabilización y aprobación en UAT :est, ${fecha(semanas)}, ${fecha(semanas + 2)}`,
    `    Migración y capacitación :mig, ${fecha(semanas + 2)}, ${fecha(semanas + SEMANAS_DE_ESTABILIZACION)}`,
    `    Go-live :milestone, ${fecha(semanas + SEMANAS_DE_ESTABILIZACION)}, 0d`,
    '```',
  );
  return lineas.join('\n');
}

// Para TODO.md: lo que falta desde hoy, con lo marcado como hecho.
export function bloqueRestante(tareas, hechas) {
  const pendientes = tareas.filter((t) => !hechas.has(t.id));
  const dias = pendientes.reduce((s, t) => s + t.dias, 0);
  const filas = CARRILES_A_SIMULAR.map((k) => {
    const { semanas } = simular(tareas, k, hechas);
    return `| ${k} | ${semanasTexto(semanas)} | **${semanasTexto(semanas + SEMANAS_DE_ESTABILIZACION)}** |`;
  });
  return [
    `Quedan **${pendientes.length} tareas y ${numero(dias)} días de trabajo** de ${tareas.length} tareas del plan.`,
    '',
    '| Carriles activos | Desarrollo que falta | Con la estabilización |',
    '|:---:|---:|---:|',
    ...filas,
  ].join('\n');
}

// El tablero por sprint: cuántas tareas tiene, cuántas están hechas, cuántas en progreso y cuánto
// falta. Sale de las mismas marcas del TODO, así que no puede contradecir a la lista de abajo.
//
// Una tarea movida a otro sprint (⏭️) cuenta en el sprint al que se movió, que es donde de verdad se
// va a hacer: contarla en el viejo diría que ese sprint no termina nunca.
export function bloqueTablero(tareas, hechas, enProgreso, titulos, enlaceSprint) {
  const sprints = [...new Set(tareas.map((t) => t.sprintEfectivo))].sort((a, b) => a - b);
  const filas = [];
  const total = { tareas: 0, hechas: 0, progreso: 0, pendientes: 0, dias: 0 };
  for (const s of sprints) {
    const delSprint = tareas.filter((t) => t.sprintEfectivo === s);
    const hech = delSprint.filter((t) => hechas.has(t.id)).length;
    const prog = delSprint.filter((t) => !hechas.has(t.id) && enProgreso.has(t.id)).length;
    const pend = delSprint.length - hech - prog;
    const dias = delSprint.filter((t) => !hechas.has(t.id)).reduce((suma, t) => suma + t.dias, 0);
    total.tareas += delSprint.length;
    total.hechas += hech;
    total.progreso += prog;
    total.pendientes += pend;
    total.dias += dias;
    const titulo = titulos.get(s) ? ` · ${titulos.get(s)}` : '';
    filas.push(
      `| ${enlaceSprint(s)}${titulo} | ${delSprint.length} | ${hech} | ${prog} | ${pend} | ${numero(dias)} |`,
    );
  }
  return [
    '| Sprint | Tareas | ✅ Hechas | 🚧 En progreso | ⬜ Pendientes | Días que faltan |',
    '|---|---:|---:|---:|---:|---:|',
    ...filas,
    `| **Total** | **${total.tareas}** | **${total.hechas}** | **${total.progreso}** | **${total.pendientes}** | **${numero(total.dias)}** |`,
  ].join('\n');
}

export function bloqueListasYa(tareas, hechas, enlaceTarea) {
  const listas = listasYa(tareas, hechas);
  if (!listas.length) return 'Nada: todo lo pendiente espera a algo.';
  const porCarril = new Map();
  for (const t of listas) (porCarril.get(t.carril) || porCarril.set(t.carril, []).get(t.carril)).push(t);
  const filas = CARRILES_DE_TRABAJO.filter((c) => porCarril.has(c)).map(
    (c) => `| **${c}** | ${porCarril.get(c).map((t) => enlaceTarea(t.id)).join(' · ')} |`,
  );
  return [
    '| Carril | Pueden empezar hoy, porque todo lo que necesitan ya está hecho |',
    '|---|---|',
    ...filas,
  ].join('\n');
}
