import { motion } from 'framer-motion';
import { ChevronLeft, FileText } from 'lucide-react';
import { useOrden } from '../../context/OrdenContext';

export default function SectionHeader() {
  const { state, dispatch } = useOrden();
  const { pasoActual } = state;

  const titulos = [
    'Datos O.R.',
    'Cliente',
    'Vehículo',
    'Averías',
    'Inspección',
    'Actividad',
    'Resumen',
  ];

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
      <button
        onClick={() => dispatch({ type: 'RETROCEDER_PASO' })}
        disabled={pasoActual === 1}
        className={`p-2 rounded-full ${pasoActual === 1 ? 'text-gray-300' : 'text-gray-700 active:bg-gray-100'}`}
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold text-gray-800">{titulos[pasoActual - 1]}</span>
        <span className="text-xs text-gray-400">Paso {pasoActual} de 7</span>
      </div>

      <button
        onClick={() => dispatch({ type: 'SET_PREVIEW_EXPANDED', payload: true })}
        className="p-2 rounded-full text-taller-green active:bg-green-50"
      >
        <FileText size={22} />
      </button>
    </div>
  );
}
