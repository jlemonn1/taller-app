import { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import ProgressBar from './ProgressBar';
import BottomNav from './BottomNav';
import PreviewMini from './PreviewMini';
import PreviewDrawer from './PreviewDrawer';
import SplashScreen from './SplashScreen';
import Toast from './Toast';

import FormSectionOR from '../forms/FormSectionOR';
import FormSectionCliente from '../forms/FormSectionCliente';
import FormSectionVehiculo from '../forms/FormSectionVehiculo';
import FormSectionAverias from '../forms/FormSectionAverias';
import FormSectionInspeccion from '../forms/FormSectionInspeccion';
import FormSectionActividad from '../forms/FormSectionActividad';
import Resumen from './Resumen';

import { useOrden } from '../../context/OrdenContext';

const SECTIONS = [
  FormSectionOR,
  FormSectionCliente,
  FormSectionVehiculo,
  FormSectionAverias,
  FormSectionInspeccion,
  FormSectionActividad,
  Resumen,
];

export default function AppShell() {
  const { state, dispatch } = useOrden();
  const { pasoActual } = state;
  const CurrentSection = SECTIONS[pasoActual - 1];

  const [toast, setToast] = useState({ msg: '', visible: false });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const avanzar = useCallback(() => {
    if (pasoActual < 7) {
      dispatch({ type: 'AVANZAR_PASO' });
      setToast({ msg: 'Guardado', visible: true });
    }
  }, [pasoActual, dispatch]);

  const swipeThreshold = 60;

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && pasoActual < 7) {
        avanzar();
      } else if (diff < 0 && pasoActual > 1) {
        dispatch({ type: 'RETROCEDER_PASO' });
      }
    }
  };

  return (
    <div className="h-full flex flex-col relative bg-fondo">
      <SplashScreen />
      <SectionHeader />
      <ProgressBar />

      <main
        className="flex-1 overflow-y-auto no-scrollbar relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <CurrentSection key={pasoActual} />
        </AnimatePresence>
      </main>

      {/* Preview Mini persistente */}
      <PreviewMini />

      <BottomNav />
      <PreviewDrawer />
      <Toast
        message={toast.msg}
        visible={toast.visible}
        onClose={() => setToast({ msg: '', visible: false })}
      />

      {/* FAB Siguiente */}
      {pasoActual < 7 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={avanzar}
          className="absolute bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-taller-green text-white shadow-lg shadow-green-900/20 flex items-center justify-center"
        >
          <ArrowRight size={24} />
        </motion.button>
      )}
    </div>
  );
}
