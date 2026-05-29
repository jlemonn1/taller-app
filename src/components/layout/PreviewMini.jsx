import { motion } from 'framer-motion';
import { useOrden } from '../../context/OrdenContext';

export default function PreviewMini() {
  const { state, dispatch } = useOrden();

  return (
    <motion.button
      onClick={() => dispatch({ type: 'SET_PREVIEW_EXPANDED', payload: true })}
      whileTap={{ scale: 0.97 }}
      className="shrink-0 mx-4 mb-2 p-2 bg-white rounded-xl shadow-md border border-gray-100 flex items-center gap-3 active:bg-gray-50"
    >
      <div className="w-12 h-16 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[8px] text-gray-400 font-medium">PDF</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-taller-green rounded-b-lg" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-xs font-semibold text-gray-700">Vista previa</p>
        <p className="text-[10px] text-gray-400">Toca para ver el documento</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </div>
    </motion.button>
  );
}
