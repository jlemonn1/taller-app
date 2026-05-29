import { motion } from 'framer-motion';
import { Hash, CarFront, Ruler } from 'lucide-react';
import { useOrden } from '../../context/OrdenContext';
import CampoTexto from './CampoTexto';
import CampoFecha from './CampoFecha';
import CampoNumero from './CampoNumero';

export default function FormSectionOR() {
  const { state, dispatch } = useOrden();
  const { or } = state;

  const set = (campo, valor) =>
    dispatch({ type: 'SET_CAMPO', payload: { seccion: 'or', campo, valor } });

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
          <Hash size={16} className="text-taller-green" /> Identificación
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <CampoTexto label="Nº O.R." value={or.nOr} onChange={(v) => set('nOr', v)} icono={Hash} />
          <CampoTexto label="Matrícula" value={or.matricula} onChange={(v) => set('matricula', v)} icono={CarFront} />
        </div>
        <CampoTexto label="Bastidor" value={or.bastidor} onChange={(v) => set('bastidor', v)} />
      </div>

      <div className="card p-4 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Datos de la Orden</h3>
        <CampoFecha label="F. Apertura" value={or.fechaApertura} onChange={(v) => set('fechaApertura', v)} />
        <CampoFecha label="F. Cita" value={or.fechaCita} onChange={(v) => set('fechaCita', v)} />
        <CampoFecha label="F. Entrada Vehículo" value={or.fechaEntrada} onChange={(v) => set('fechaEntrada', v)} />
        <CampoFecha label="F. Salida Vehículo" value={or.fechaSalida} onChange={(v) => set('fechaSalida', v)} />
        <CampoNumero label="Kilómetros" value={or.km} onChange={(v) => set('km', v)} placeholder="Ej: 78619" icono={Ruler} />
        <CampoTexto label="Combustible" value={or.combustible} onChange={(v) => set('combustible', v)} placeholder="Ej: 1/4 Depósito" />
        <CampoTexto label="Recepcionista" value={or.recepcionista} onChange={(v) => set('recepcionista', v)} />
      </div>
    </motion.div>
  );
}
