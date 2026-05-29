import { ClipboardList, User, Car, AlertTriangle, Search, Wrench, FileCheck } from 'lucide-react';
import { useOrden } from '../../context/OrdenContext';

const icons = {
  ClipboardList, User, Car, AlertTriangle, Search, Wrench, FileCheck,
};

export default function BottomNav() {
  const { state, dispatch } = useOrden();
  const { pasoActual } = state;

  const items = [
    { id: 1, label: 'O.R.', icon: ClipboardList },
    { id: 2, label: 'Cliente', icon: User },
    { id: 3, label: 'Vehículo', icon: Car },
    { id: 4, label: 'Averías', icon: AlertTriangle },
    { id: 5, label: 'Inspección', icon: Search },
    { id: 6, label: 'Actividad', icon: Wrench },
    { id: 7, label: 'Resumen', icon: FileCheck },
  ];

  return (
    <nav className="shrink-0 bg-white border-t border-gray-100 px-2 pb-safe pt-1">
      <div className="flex justify-around items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const activo = pasoActual === item.id;
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'IR_A_PASO', payload: item.id })}
              className={`flex flex-col items-center py-2 px-1 min-w-[3rem] rounded-lg transition-colors ${
                activo ? 'text-taller-green' : 'text-gray-400'
              }`}
            >
              <Icon size={20} strokeWidth={activo ? 2.5 : 2} />
              <span className={`text-[10px] mt-0.5 ${activo ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
