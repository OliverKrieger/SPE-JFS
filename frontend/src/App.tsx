import './styles/App.css';
import Home from './pages/Home';
import { AlertProvider } from './context/AlertContext';
import GlobalAlert from './components/utils/GlobalAlert';

function App() {
  return (
    <>
      <AlertProvider>
        <GlobalAlert />
        <Home />
      </AlertProvider>
    </>
  );
}

export default App;
