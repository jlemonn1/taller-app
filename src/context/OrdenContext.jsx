import { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_STATE } from '../data/formSchema';

function ordenReducer(state, action) {
  switch (action.type) {
    case 'SET_CAMPO': {
      const { seccion, campo, valor } = action.payload;
      return {
        ...state,
        [seccion]: { ...state[seccion], [campo]: valor },
      };
    }
    case 'SET_AVERIAS':
      return { ...state, averias: action.payload };
    case 'SET_INSPECCION':
      return { ...state, inspeccion: action.payload };
    case 'SET_ACTIVIDAD':
      return { ...state, actividad: action.payload };
    case 'SET_SUMINISTROS':
      return { ...state, suministros: action.payload };
    case 'SET_OBSERVACIONES':
      return { ...state, observaciones: action.payload };
    case 'AVANZAR_PASO':
      return { ...state, pasoActual: Math.min(state.pasoActual + 1, 7) };
    case 'RETROCEDER_PASO':
      return { ...state, pasoActual: Math.max(state.pasoActual - 1, 1) };
    case 'IR_A_PASO':
      return { ...state, pasoActual: action.payload };
    case 'SET_PREVIEW_EXPANDED':
      return { ...state, previewExpanded: action.payload };
    case 'RESET_ORDEN':
      return { ...INITIAL_STATE, pasoActual: 1 };
    case 'CARGAR_ORDEN':
      return { ...action.payload };
    default:
      return state;
  }
}

const OrdenContext = createContext(null);

function migrateOldState(parsed) {
  // Migrar de suministrosIzq/suministrosDer a suministros único
  if (!parsed.suministros && (parsed.suministrosIzq || parsed.suministrosDer)) {
    const izq = parsed.suministrosIzq || [];
    const der = parsed.suministrosDer || [];
    parsed.suministros = [...izq, ...der];
    delete parsed.suministrosIzq;
    delete parsed.suministrosDer;
  }
  return parsed;
}

export function OrdenProvider({ children }) {
  const [state, dispatch] = useReducer(ordenReducer, INITIAL_STATE, () => {
    try {
      const saved = localStorage.getItem('orden_reparacion_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return migrateOldState(parsed);
      }
    } catch (e) { /* ignore */ }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('orden_reparacion_v1', JSON.stringify(state));
  }, [state]);

  return (
    <OrdenContext.Provider value={{ state, dispatch }}>
      {children}
    </OrdenContext.Provider>
  );
}

export function useOrden() {
  const ctx = useContext(OrdenContext);
  if (!ctx) throw new Error('useOrden debe usarse dentro de OrdenProvider');
  return ctx;
}
