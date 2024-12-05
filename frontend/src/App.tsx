import { Provider } from 'react-redux';
import store from './store/store';

import './styles/App.css';

import Home from './pages/Home';

import { AlertProvider } from './context/AlertContext';
import GlobalAlert from './components/utils/GlobalAlert';

import { OverlayProvider } from './context/OverlayContext';

function App() {
  return (
    <Provider store={store}>
      <AlertProvider>
        <OverlayProvider>
            <GlobalAlert />
            <Home />
        </OverlayProvider>
      </AlertProvider>
    </Provider>
  );
}

export default App;
