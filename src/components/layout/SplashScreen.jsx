import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, FileText, ArrowRight } from 'lucide-react';
import { useOrden } from '../../context/OrdenContext';

export default function SplashScreen() {
  const { state, dispatch } = useOrden();
  const [mostrar, setMostrar] = useState(true);
  const [tieneDatos, setTieneDatos] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('orden_reparacion_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hayDatos = parsed.or?.nOr || parsed.or?.matricula || parsed.cliente?.nombre;
        setTieneDatos(!!hayDatos);
      } catch { /* ignore */ }
    }
  }, []);

  const nuevaOrden = () => {
    dispatch({ type: 'RESET_ORDEN' });
    localStorage.removeItem('orden_reparacion_v1');
    setMostrar(false);
  };

  const continuar = () => {
    setMostrar(false);
  };

  return (
    <AnimatePresence>
      {mostrar && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-taller-green flex items-center justify-center shadow-lg mb-6"
          >
            <ClipboardList size={40} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            Taller Herm. Sabir
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 text-center mb-10"
          >
            Órdenes de reparación
          </motion.p>

          {tieneDatos ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full flex flex-col gap-3"
            >
              <div className="card p-4 flex items-center gap-3 mb-2">
                <FileText size={24} className="text-taller-green" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">Orden en curso</p>
                  <p className="text-xs text-gray-500">{state.or.matricula || 'Sin matrícula'} — {state.cliente.nombre || 'Sin cliente'}</p>
                </div>
              </div>
              <button
                onClick={continuar}
                className="w-full py-3.5 rounded-xl bg-taller-green text-white font-semibold text-sm flex items-center justify-center gap-2 active:opacity-90 shadow-md shadow-green-900/10"
              >
                Continuar orden <ArrowRight size={18} />
              </button>
              <button
                onClick={nuevaOrden}
                className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm active:bg-gray-50"
              >
                Empezar nueva orden
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setMostrar(false)}
              className="w-full py-3.5 rounded-xl bg-taller-green text-white font-semibold text-sm flex items-center justify-center gap-2 active:opacity-90 shadow-md shadow-green-900/10"
            >
              Comenzar <ArrowRight size={18} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
