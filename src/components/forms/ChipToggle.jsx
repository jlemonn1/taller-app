import { motion } from 'framer-motion';

const ESTADOS = {
  M: { label: 'M', color: 'bg-atencion-m text-white shadow-orange-500/30', title: 'Atención inmediata' },
  R: { label: 'R', color: 'bg-atencion-r text-white shadow-yellow-500/30', title: 'Atención en breve' },
  B: { label: 'B', color: 'bg-atencion-b text-white shadow-green-500/30', title: 'Comprobado OK' },
};

export default function ChipToggle({ item, valor, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-700 flex-1 pr-3 font-medium">{item}</span>
      <div className="flex gap-1.5">
        {Object.entries(ESTADOS).map(([key, cfg]) => {
          const activo = valor === key;
          return (
            <motion.button
              key={key}
              whileTap={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => onChange(activo ? '' : key)}
              title={cfg.title}
              className={`w-10 h-10 rounded-full text-xs font-bold flex items-center justify-center transition-all shadow-sm ${
                activo ? `${cfg.color} shadow-md` : 'bg-gray-100 text-gray-300'
              }`}
            >
              {cfg.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
