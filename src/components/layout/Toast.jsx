import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 2000);
      return () => clearTimeout(t);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg pointer-events-none"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
