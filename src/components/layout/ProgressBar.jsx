import { useOrden } from '../../context/OrdenContext';

export default function ProgressBar() {
  const { state } = useOrden();
  const { pasoActual } = state;
  const total = 7;
  const porcentaje = (pasoActual / total) * 100;

  return (
    <div className="w-full h-1.5 bg-gray-100 shrink-0">
      <div
        className="h-full bg-taller-green transition-all duration-300 ease-out"
        style={{ width: `${porcentaje}%` }}
      />
    </div>
  );
}
