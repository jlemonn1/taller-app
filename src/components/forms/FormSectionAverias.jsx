import { motion } from 'framer-motion';
import { useOrden } from '../../context/OrdenContext';
import TablaDinamica from './TablaDinamica';

const COLUMNAS_AVERIAS = [
  { key: 'n', label: 'Nº', type: 'text' },
  { key: 'codigo', label: 'Código', type: 'text' },
  { key: 'denominacion', label: 'Denominación', type: 'text' },
  { key: 'tipo', label: 'Tipo', type: 'text' },
  { key: 'fecha', label: 'Fecha', type: 'date' },
  { key: 'estado', label: 'Estado', type: 'text' },
];

export default function FormSectionAverias() {
  const { state, dispatch } = useOrden();
  const { averias } = state;

  const addRow = () => {
    const nextNum = String(averias.length + 1).padStart(2, '0');
    dispatch({
      type: 'SET_AVERIAS',
      payload: [...averias, { n: nextNum, codigo: '', denominacion: '', tipo: '', fecha: '', estado: '' }],
    });
  };

  const removeRow = (idx) => {
    if (averias.length <= 1) return;
    const nuevas = averias.filter((_, i) => i !== idx);
    dispatch({ type: 'SET_AVERIAS', payload: nuevas });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 p-4"
    >
      <div className="card p-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Tabla de Averías</h3>
        <TablaDinamica
          filas={averias}
          columnas={COLUMNAS_AVERIAS}
          onChange={(nuevas) => dispatch({ type: 'SET_AVERIAS', payload: nuevas })}
          onAdd={addRow}
          onRemove={removeRow}
        />
      </div>
    </motion.div>
  );
}
