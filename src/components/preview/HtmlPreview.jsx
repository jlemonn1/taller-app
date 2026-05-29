import { useEffect, useRef } from 'react';
import { useOrden } from '../../context/OrdenContext';

function processTemplate(html, state) {
  const ctx = buildContext(state);

  // 1. Variables simples {{ var }}
  Object.entries(ctx).forEach(([key, val]) => {
    if (typeof val === 'string' || typeof val === 'number' || val === null || val === undefined) {
      html = html.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), String(val ?? ''));
    }
  });

  // 2. Checks del vehículo (page 1): {% if check_radio %}checked{% endif %}
  ['check_radio', 'check_caratura', 'check_neumaticos', 'check_llave', 'check_otros'].forEach((varName) => {
    html = replaceIf(html, varName, ctx[varName]);
  });

  // 3. Inspección M/R/B (page 2): {% if inspeccion.get("Item") == "M" %}checked{% endif %}
  // Procesar TODOS los items conocidos para TODOS los estados
  Object.entries(ctx.inspeccion).forEach(([item, val]) => {
    ['M', 'R', 'B'].forEach((estado) => {
      html = replaceInspeccionIf(html, item, estado, val === estado);
    });
  });
  // También limpiar items que NO están en el dict (vacíos)
  const allInspeccionItems = [
    'Luces interiores', 'Alfombrilla', 'Elevalunas/Techo solar/C.C.', 'Cinturones de seguridad',
    'Cuadro de instrumentos', 'Mandos de intermitentes', 'Freno de estacionamiento',
    'Delantero izquierdo', 'Delantero derecho', 'Trasero izquierdo', 'Trasero derecho',
    'Nivel de refrigerante', 'Nivel de líquido de frenos', 'Nivel de líquido lavaparabrisas', 'Nivel de aceite dirección asistida',
    'Luces delanteras', 'Luna parabrisas', 'Escobillas', 'Luces traseras',
    'Placa de matrícula', 'Luces de matrícula',
    'Cenicero', 'Antena', 'Llave de seguridad para llantas', 'Otros',
    'Dirección y suspensión', 'Amortiguadores', 'Discos y pastillas de frenos',
    'Sistema de escape', 'Guardapolvos', 'Fugas de líquidos',
  ];
  allInspeccionItems.forEach((item) => {
    if (!(item in ctx.inspeccion)) {
      ['M', 'R', 'B'].forEach((estado) => {
        html = replaceInspeccionIf(html, item, estado, false);
      });
    }
  });

  // 4. Loops
  html = replaceLoop(html, 'averias', ctx.averias, ['n', 'codigo', 'denominacion', 'tipo', 'fecha', 'estado']);
  html = replaceLoop(html, 'actividad', ctx.actividad, ['n', 'especificacion', 'codigos', 'tiempo_mo', 'tiempo_acordado', 'operario', 'fecha', 'hora_ini', 'hora_fin', 'tiempo_parado']);
  html = replaceLoop(html, 'suministros_izq', ctx.suministros_izq, ['cantidad', 'bono', 'designacion', 'precio']);
  html = replaceLoop(html, 'suministros_der', ctx.suministros_der, ['cantidad', 'bono', 'designacion', 'precio']);
  html = replaceLoop(html, 'tabla_areas', ctx.tabla_areas.map((a) => ({ area: a })), ['area']);

  // 5. Limpiar cualquier bloque {% if %}...{% endif %} o {% for %}...{% endfor %} restante
  // Esto evita que tags sueltos rompan el HTML
  html = html.replace(/\{%\s*if[\s\S]*?%\}[\s\S]*?\{%\s*endif\s*%\}/gs, '');
  html = html.replace(/\{%\s*for[\s\S]*?%\}[\s\S]*?\{%\s*endfor\s*%\}/gs, '');

  // 6. Limpiar variables {{ ... }} sueltas
  html = html.replace(/\{\{[\s\S]*?\}\}/g, '');

  return html;
}

function buildContext(state) {
  return {
    taller_nombre: 'TALLER HERMANOS SABIR',
    taller_especialidad: 'Mecánica general - Turismos, tractores y agricultura',
    taller_direccion: 'C/ María Cristina, 9. 45100 SONSECA - Toledo',
    taller_telefono: '925 05 07 61',
    taller_movil: '637 935 639',
    taller_email: 'tallerhermanossabir@hotmail.es',
    taller_nif: '',
    taller_ri: '',
    f_prev_entrega: state.or.fechaApertura || '',
    n_or: state.or.nOr || '',
    matricula: state.or.matricula || '',
    bastidor: state.or.bastidor || '',
    or_fecha_apertura: state.or.fechaApertura || '',
    or_fecha_cita: state.or.fechaCita || '',
    or_fecha_entrada: state.or.fechaEntrada || '',
    or_fecha_salida: state.or.fechaSalida || '',
    or_km: state.or.km || '',
    or_combustible: state.or.combustible || '',
    or_recepcionista: state.or.recepcionista || '',
    cliente_nombre: state.cliente.nombre || '',
    cliente_contacto: state.cliente.contacto || '',
    cliente_direccion: state.cliente.direccion || '',
    cliente_poblacion: state.cliente.poblacion || '',
    cliente_nif: state.cliente.nif || '',
    cliente_telefonos: state.cliente.telefonos || '',
    cliente_email: state.cliente.email || '',
    veh_modelo: state.vehiculo.modelo || '',
    veh_color: state.vehiculo.color || '',
    veh_contrato: state.vehiculo.contrato || '',
    veh_inicio_garantia: state.vehiculo.inicioGarantia || '',
    veh_matriculacion: state.vehiculo.matriculacion || '',
    veh_anomalias: state.vehiculo.anomalias || '',
    check_radio: state.vehiculo.checks.radio,
    check_caratura: state.vehiculo.checks.caratula,
    check_neumaticos: state.vehiculo.checks.neumaticos,
    check_llave: state.vehiculo.checks.llave,
    check_otros: state.vehiculo.checks.otros,
    tabla_areas: state.vehiculo.tablaAreas,
    averias: state.averias,
    observaciones: state.observaciones || '',
    p2_fecha: state.or.fechaApertura || '',
    p2_combustible: state.or.combustible || '',
    inspeccion: state.inspeccion,
    extraibles_rueda: '',
    extraibles_chaleco: '',
    comentarios: ['', '', '', '', ''],
    actividad: state.actividad,
    suministros_izq: splitSuministros(state.suministros || []).izq,
    suministros_der: splitSuministros(state.suministros || []).der,
  };
}

function splitSuministros(lista) {
  const n = lista.length;
  if (n === 0) return { izq: [], der: [] };
  const mitad = Math.ceil(n / 2);
  return { izq: lista.slice(0, mitad), der: lista.slice(mitad) };
}

function replaceIf(html, varName, value) {
  // Patrón: {% if varName %}content{% endif %}
  const pattern = new RegExp(
    `\\{%-?\\s*if\\s+${varName}\\s*-?%\\}([\\s\\S]*?)\\{%-?\\s*endif\\s*-?%\\}`,
    'gs'
  );
  return html.replace(pattern, value ? '$1' : '');
}

function replaceInspeccionIf(html, item, estado, activo) {
  // Patrón: {% if inspeccion.get("Item") == "Estado" %}checked{% endif %}
  const safeItem = item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `\\{%-?\\s*if\\s+inspeccion\\.get\\("${safeItem}"\\)\\s*==\\s*"${estado}"\\s*-?%\\}checked\\{%-?\\s*endif\\s*-?%\\}`,
    'gs'
  );
  return html.replace(pattern, activo ? 'checked' : '');
}

function replaceLoop(html, listName, items, keys) {
  const startPattern = new RegExp(
    `\\{%-?\\s*for\\s+\\w+\\s+in\\s+${listName}\\s*-?%\\}([\\s\\S]*?)(?=\\{%-?\\s*endfor\\s*-?%\\})`,
    's'
  );
  const match = html.match(startPattern);
  if (!match) return html;

  const template = match[1];
  let rendered = '';
  items.forEach((item) => {
    let row = template;
    keys.forEach((key) => {
      row = row.replace(new RegExp(`\\{\\{\\s*\\w+\\.${key}\\s*\\}\\}`, 'g'), String(item[key] ?? ''));
    });
    rendered += row;
  });

  const fullPattern = new RegExp(
    `\\{%-?\\s*for\\s+\\w+\\s+in\\s+${listName}\\s*-?%\\}[\\s\\S]*?\\{%-?\\s*endfor\\s*-?%\\}`,
    's'
  );
  return html.replace(fullPattern, rendered);
}

export default function HtmlPreview() {
  const { state } = useOrden();
  const iframeRef = useRef(null);

  useEffect(() => {
    async function render() {
      try {
        const res = await fetch('/templates/orden_reparacion.html');
        const html = await res.text();
        const processed = processTemplate(html, state);

        if (iframeRef.current) {
          const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
          doc.open();
          doc.write(processed);
          doc.close();
        }
      } catch (e) {
        console.error('Preview error:', e);
      }
    }
    render();
  }, [state]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      className="w-full h-full border-0"
      style={{ minHeight: '100%' }}
    />
  );
}
