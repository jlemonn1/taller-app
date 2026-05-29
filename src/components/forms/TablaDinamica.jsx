import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function TablaDinamica({ filas, columnas, onChange, onAdd, onRemove }) {
  return (
    <div className="flex flex-col gap-3">
      {filas.map((fila, idx) => (
        <div key={idx} className="card p-3 flex flex-col gap-3 relative border-l-4 border-l-taller-green">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical size={16} className="text-gray-300" />
              <span className="text-[10px] font-bold text-taller-green uppercase tracking-wide">Fila {idx + 1}</span>
            </div>
            <button
              onClick={() => onRemove(idx)}
              className="p-1.5 text-gray-300 hover:text-red-500 active:bg-red-50 rounded-full transition-colors"
              disabled={filas.length <= 1}
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Modo tarjeta vertical: cada celda es label+input en columna */}
          <div className="flex flex-col gap-2.5">
            {columnas.map((col) => (
              <div key={col.key} className="flex flex-col gap-1">
                <span className="text-[10px] font-medium text-gray-400 uppercase">{col.label}</span>
                <input
                  type={col.type || 'text'}
                  inputMode={col.inputMode}
                  value={fila[col.key] || ''}
                  onChange={(e) => {
                    const nuevas = [...filas];
                    nuevas[idx] = { ...nuevas[idx], [col.key]: e.target.value };
                    onChange(nuevas);
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-taller-green/30 focus:border-taller-green transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm font-medium active:bg-gray-50 transition-colors"
      >
        <Plus size={20} />
        Añadir fila
      </button>
    </div>
  );
}
