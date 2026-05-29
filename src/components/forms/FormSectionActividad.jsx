import { motion } from 'framer-motion';
import { useOrden } from '../../context/OrdenContext';
import TablaDinamica from './TablaDinamica';
import CampoTexto from './CampoTexto';

const COLS_ACTIVIDAD = [
  { key: 'n', label: 'Nº' },
  { key: 'especificacion', label: 'Especificación' },
  { key: 'codigos', label: 'Códigos' },
  { key: 'tiempoMo', label: 'Tiempo M.O.' },
  { key: 'tiempoAcordado', label: 'Tiempo Acord.' },
  { key: 'operario', label: 'Operario' },
  { key: 'fecha', label: 'Fecha', type: 'date' },
  { key: 'horaIni', label: 'Hora inicio' },
  { key: 'horaFin', label: 'Hora fin' },
  { key: 'tiempoParado', label: 'Parado' },
];

const COLS_SUMINISTROS = [
  { key: 'cantidad', label: 'Cant.', type: 'number', inputMode: 'numeric' },
  { key: 'bono', label: 'Bono/Ref.' },
  { key: 'designacion', label: 'Designación' },
  { key: 'precio', label: 'Precio' },
];

export default function FormSectionActividad() {
  const { state, dispatch } = useOrden();
  const { actividad, suministros, observaciones } = state;

  const addAct = () => {
    const nextNum = String(actividad.length + 1);
    dispatch({
      type: 'SET_ACTIVIDAD',
      payload: [...actividad, { n: nextNum, especificacion: '', codigos: '', tiempoMo: '', tiempoAcordado: '', operario: '', fecha: '', horaIni: '', horaFin: '', tiempoParado: '' }],
    });
  };

  const removeAct = (idx) => {
    if (actividad.length <= 1) return;
    dispatch({ type: 'SET_ACTIVIDAD', payload: actividad.filter((_, i) => i !== idx) });
  };

  const addSum = () => {
    dispatch({
      type: 'SET_SUMINISTROS',
      payload: [...suministros, { cantidad: '', bono: '', designacion: '', precio: '' }],
    });
  };

  const removeSum = (idx) => {
    if (suministros.length <= 1) return;
    dispatch({ type: 'SET_SUMINISTROS', payload: suministros.filter((_, i) => i !== idx) });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 p-4 pb-8"
    >
      <div className="card p-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Actividad del Operario</h3>
        <TablaDinamica
          filas={actividad}
          columnas={COLS_ACTIVIDAD}
          onChange={(nuevas) => dispatch({ type: 'SET_ACTIVIDAD', payload: nuevas })}
          onAdd={addAct}
          onRemove={removeAct}
        />
      </div>

      <div className="card p-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Lista de Suministros</h3>
        <p className="text-xs text-gray-400 mb-3">
          Se repartirán automáticamente entre las dos columnas del PDF.
        </p>
        <TablaDinamica
          filas={suministros}
          columnas={COLS_SUMINISTROS}
          onChange={(nuevas) => dispatch({ type: 'SET_SUMINISTROS', payload: nuevas })}
          onAdd={addSum}
          onRemove={removeSum}
        />
      </div>

      <div className="card p-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Observaciones</h3>
        <textarea
          value={observaciones}
          onChange={(e) => dispatch({ type: 'SET_OBSERVACIONES', payload: e.target.value })}
          rows={3}
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-taller-green/30 focus:border-taller-green resize-none"
        />
      </div>
    </motion.div>
  );
}
