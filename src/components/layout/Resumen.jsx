import { motion } from 'framer-motion';
import { FileText, Printer, RotateCcw, CarFront, User, Hash, Fuel } from 'lucide-react';
import { useOrden } from '../../context/OrdenContext';

export default function Resumen() {
  const { state, dispatch } = useOrden();
  const { or, cliente, vehiculo } = state;

  const handlePrint = () => {
    dispatch({ type: 'SET_PREVIEW_EXPANDED', payload: true });
    setTimeout(() => {
      const iframe = document.querySelector('iframe[title="Preview"]');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    }, 500);
  };

  const datosResumen = [
    { icon: CarFront, label: 'Matrícula', value: or.matricula || '—', color: 'text-blue-600' },
    { icon: User, label: 'Cliente', value: cliente.nombre || '—', color: 'text-purple-600' },
    { icon: Hash, label: 'Nº O.R.', value: or.nOr || '—', color: 'text-orange-600' },
    { icon: Fuel, label: 'Combustible', value: or.combustible || '—', color: 'text-amber-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 p-4 pb-24"
    >
      <div className="card p-5 flex flex-col gap-4 items-center text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center shadow-sm">
          <FileText size={32} className="text-taller-green" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">Orden completada</h2>
          <p className="text-sm text-gray-500 mt-1">
            Revisa la vista previa y descarga el PDF.
          </p>
        </div>
      </div>

      {/* Tarjetas de datos clave */}
      <div className="grid grid-cols-2 gap-3">
        {datosResumen.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="card p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className={item.color} />
                <span className="text-[10px] font-medium text-gray-400 uppercase">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800 truncate">{item.value}</span>
            </div>
          );
        })}
      </div>

      <div className="card p-4 flex flex-col gap-2.5">
        <button
          onClick={() => dispatch({ type: 'SET_PREVIEW_EXPANDED', payload: true })}
          className="w-full py-3.5 rounded-xl bg-taller-green text-white font-semibold text-sm flex items-center justify-center gap-2 active:opacity-90 shadow-md shadow-green-900/10"
        >
          <FileText size={18} />
          Ver vista previa
        </button>
        <button
          onClick={handlePrint}
          className="w-full py-3.5 rounded-xl bg-gray-800 text-white font-semibold text-sm flex items-center justify-center gap-2 active:opacity-90"
        >
          <Printer size={18} />
          Descargar PDF
        </button>
        <button
          onClick={() => {
            if (confirm('¿Empezar una orden nueva? Se borrarán los datos actuales.')) {
              dispatch({ type: 'RESET_ORDEN' });
              localStorage.removeItem('orden_reparacion_v1');
            }
          }}
          className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm flex items-center justify-center gap-2 active:bg-gray-50"
        >
          <RotateCcw size={18} />
          Nueva orden
        </button>
      </div>
    </motion.div>
  );
}
