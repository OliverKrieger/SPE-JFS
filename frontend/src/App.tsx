import './styles/App.css';

import Home from './pages/Home';

import { AlertProvider } from './context/AlertContext';
import GlobalAlert from './components/utils/GlobalAlert';

import { OverlayProvider } from './context/OverlayContext';

function App() {
  return (
    <AlertProvider>
      <OverlayProvider>
        <GlobalAlert />
        <Home />
      </OverlayProvider>
    </AlertProvider>
  );
}

export default App;
