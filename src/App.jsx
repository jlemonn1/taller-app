import { OrdenProvider } from './context/OrdenContext';
import AppShell from './components/layout/AppShell';

function App() {
  return (
    <OrdenProvider>
      <AppShell />
    </OrdenProvider>
  );
}

export default App;
