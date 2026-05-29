import { motion } from 'framer-motion';
import { useOrden } from '../../context/OrdenContext';
import { BLOQUES_INSPECCION } from '../../data/formSchema';
import ChipToggle from './ChipToggle';

export default function FormSectionInspeccion() {
  const { state, dispatch } = useOrden();
  const { inspeccion } = state;

  const setValor = (item, valor) => {
    dispatch({ type: 'SET_INSPECCION', payload: { ...inspeccion, [item]: valor } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 p-4"
    >
      <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 mb-1">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-atencion-m inline-block" /> M = Inmediata</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-atencion-r inline-block" /> R = En breve</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-atencion-b inline-block" /> B = OK</span>
      </div>

      {BLOQUES_INSPECCION.map((bloque) => (
        <div key={bloque.key} className="card p-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">{bloque.titulo}</h3>
          <div className="flex flex-col divide-y divide-gray-50">
            {bloque.items.map((item) => (
              <ChipToggle
                key={item}
                item={item}
                valor={inspeccion[item] || ''}
                onChange={(v) => setValor(item, v)}
              />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
