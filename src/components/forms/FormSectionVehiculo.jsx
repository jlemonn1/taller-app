import { motion } from 'framer-motion';
import { Car, PaintBucket, FileDigit, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useOrden } from '../../context/OrdenContext';
import CampoTexto from './CampoTexto';
import CampoFecha from './CampoFecha';

export default function FormSectionVehiculo() {
  const { state, dispatch } = useOrden();
  const { vehiculo } = state;

  const set = (campo, valor) =>
    dispatch({ type: 'SET_CAMPO', payload: { seccion: 'vehiculo', campo, valor } });

  const toggleCheck = (key) => {
    dispatch({
      type: 'SET_CAMPO',
      payload: { seccion: 'vehiculo', campo: 'checks', valor: { ...vehiculo.checks, [key]: !vehiculo.checks[key] } },
    });
  };

  const checkItems = [
    { key: 'radio', label: 'Radio' },
    { key: 'caratula', label: 'Carátula' },
    { key: 'neumaticos', label: 'Estado Neumáticos' },
    { key: 'llave', label: 'Llave antirrobo' },
    { key: 'otros', label: 'Otros' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 p-4 pb-24"
    >
      <div className="card p-4 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
          <Car size={16} className="text-taller-green" /> Vehículo
        </h3>
        <CampoTexto label="Modelo" value={vehiculo.modelo} onChange={(v) => set('modelo', v)} icono={Car} />
        <CampoTexto label="Color" value={vehiculo.color} onChange={(v) => set('color', v)} icono={PaintBucket} />
        <CampoTexto label="Nº Contrato" value={vehiculo.contrato} onChange={(v) => set('contrato', v)} icono={FileDigit} />
        <CampoFecha label="F. Inicio Garantía" value={vehiculo.inicioGarantia} onChange={(v) => set('inicioGarantia', v)} />
        <CampoFecha label="F. Matriculación" value={vehiculo.matriculacion} onChange={(v) => set('matriculacion', v)} />
        <CampoTexto label="Anomalías observadas" value={vehiculo.anomalias} onChange={(v) => set('anomalias', v)} icono={AlertCircle} />
      </div>

      <div className="card p-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Checks laterales</h3>
        <div className="flex flex-wrap gap-2">
          {checkItems.map((item) => (
            <button
              key={item.key}
              onClick={() => toggleCheck(item.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all ${
                vehiculo.checks[item.key]
                  ? 'bg-taller-green text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {vehiculo.checks[item.key] && <CheckCircle2 size={14} />}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
