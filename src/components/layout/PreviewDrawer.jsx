import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { useOrden } from '../../context/OrdenContext';
import HtmlPreview from '../preview/HtmlPreview';

export default function PreviewDrawer() {
  const { state, dispatch } = useOrden();
  const { previewExpanded } = state;
  const [dragY, setDragY] = useState(0);

  const toggle = () => dispatch({ type: 'SET_PREVIEW_EXPANDED', payload: !previewExpanded });

  return (
    <AnimatePresence>
      {previewExpanded && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute inset-0 z-50 bg-white flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shrink-0">
            <h2 className="text-sm font-semibold text-gray-700">Vista previa</h2>
            <button onClick={toggle} className="p-2 rounded-full active:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-gray-50">
            <HtmlPreview />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
