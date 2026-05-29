export default function CampoTexto({ label, value, onChange, placeholder = '', type = 'text', icono: Icono }) {
  const completado = !!value;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
        {label}
        {completado && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-taller-green">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </label>
      <div className="relative">
        {Icono && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            <Icono size={18} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icono ? 'pl-10' : 'pl-3'} pr-3 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-taller-green/30 focus:border-taller-green transition-all ${
            completado ? 'border-taller-green/40 bg-green-50/30' : 'border-gray-200'
          }`}
        />
      </div>
    </div>
  );
}
