export const SECCIONES = [
  { id: 1, titulo: 'Datos O.R.', icono: 'ClipboardList' },
  { id: 2, titulo: 'Cliente', icono: 'User' },
  { id: 3, titulo: 'Vehículo', icono: 'Car' },
  { id: 4, titulo: 'Averías', icono: 'AlertTriangle' },
  { id: 5, titulo: 'Inspección', icono: 'Search' },
  { id: 6, titulo: 'Actividad', icono: 'Wrench' },
  { id: 7, titulo: 'Resumen', icono: 'FileCheck' },
];

export const BLOQUES_INSPECCION = [
  { key: 'interior', titulo: 'INTERIOR', items: [
    'Luces interiores', 'Alfombrilla', 'Elevalunas/Techo solar/C.C.',
    'Cinturones de seguridad', 'Cuadro de instrumentos', 'Mandos de intermitentes', 'Freno de estacionamiento'
  ]},
  { key: 'neumaticos', titulo: 'NEUMÁTICOS', items: [
    'Delantero izquierdo', 'Delantero derecho', 'Trasero izquierdo', 'Trasero derecho'
  ]},
  { key: 'motor', titulo: 'COMPARTIMENTO MOTOR', items: [
    'Nivel de refrigerante', 'Nivel de líquido de frenos', 'Nivel de líquido lavaparabrisas', 'Nivel de aceite dirección asistida'
  ]},
  { key: 'visibilidad', titulo: 'VISIBILIDAD', items: [
    'Luces delanteras', 'Luna parabrisas', 'Escobillas', 'Luces traseras'
  ]},
  { key: 'matricula', titulo: 'MATRÍCULA', items: [
    'Placa de matrícula', 'Luces de matrícula'
  ]},
  { key: 'extraibles', titulo: 'ELEMENTOS EXTRAÍBLES', items: [
    'Cenicero', 'Antena', 'Llave de seguridad para llantas', 'Otros'
  ]},
  { key: 'elevado', titulo: 'VEHÍCULO ELEVADO', items: [
    'Dirección y suspensión', 'Amortiguadores', 'Discos y pastillas de frenos',
    'Sistema de escape', 'Guardapolvos', 'Fugas de líquidos'
  ]},
];

export const INITIAL_STATE = {
  pasoActual: 1,
  or: {
    nOr: '',
    matricula: '',
    bastidor: '',
    fechaApertura: '',
    fechaCita: '',
    fechaEntrada: '',
    fechaSalida: '',
    km: '',
    combustible: '',
    recepcionista: '',
  },
  cliente: {
    nombre: '',
    contacto: '',
    direccion: '',
    poblacion: '',
    nif: '',
    telefonos: '',
    email: '',
  },
  vehiculo: {
    modelo: '',
    color: '',
    contrato: '',
    inicioGarantia: '',
    matriculacion: '',
    anomalias: '',
    checks: { radio: false, caratula: false, neumaticos: false, llave: false, otros: false },
    tablaAreas: Array(10).fill(''),
  },
  averias: [
    { n: '01', codigo: '', denominacion: '', tipo: '', fecha: '', estado: '' },
  ],
  inspeccion: {},
  actividad: [
    { n: '1', especificacion: '', codigos: '', tiempoMo: '', tiempoAcordado: '', operario: '', fecha: '', horaIni: '', horaFin: '', tiempoParado: '' },
  ],
  suministros: [
    { cantidad: '', bono: '', designacion: '', precio: '' },
  ],
  observaciones: '',
  previewExpanded: false,
};
