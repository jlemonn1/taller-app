import { motion } from 'framer-motion';
import { User, Phone, MapPin, Mail, Contact } from 'lucide-react';
import { useOrden } from '../../context/OrdenContext';
import CampoTexto from './CampoTexto';

export default function FormSectionCliente() {
  const { state, dispatch } = useOrden();
  const { cliente } = state;

  const set = (campo, valor) =>
    dispatch({ type: 'SET_CAMPO', payload: { seccion: 'cliente', campo, valor } });

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
          <User size={16} className="text-taller-green" /> Cliente
        </h3>
        <CampoTexto label="Nombre del cliente" value={cliente.nombre} onChange={(v) => set('nombre', v)} icono={User} />
        <CampoTexto label="Persona de contacto" value={cliente.contacto} onChange={(v) => set('contacto', v)} icono={Contact} />
        <CampoTexto label="Dirección" value={cliente.direccion} onChange={(v) => set('direccion', v)} icono={MapPin} />
        <CampoTexto label="Población (CP + Ciudad)" value={cliente.poblacion} onChange={(v) => set('poblacion', v)} icono={MapPin} />
        <CampoTexto label="NIF" value={cliente.nif} onChange={(v) => set('nif', v)} />
        <CampoTexto label="Teléfonos" value={cliente.telefonos} onChange={(v) => set('telefonos', v)} placeholder="Separados por /" icono={Phone} />
        <CampoTexto label="Email" value={cliente.email} onChange={(v) => set('email', v)} type="email" icono={Mail} />
      </div>
    </motion.div>
  );
}
