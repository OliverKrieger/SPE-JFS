import Login from "./Login";
import Dashboard from "./Dashboard";

import { useAlert } from "../context/AlertContext";
import { useOverlay } from "../context/OverlayContext";

import { useSelector } from 'react-redux';
import { RootState } from "../store/store";

const Home: React.FC = () => {
    const { addAlert } = useAlert();
    const { openOverlay } = useOverlay();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <div className='home-container'>
            {!isLoggedIn ? <Login /> : <Dashboard />}
            <button onClick={() => addAlert('This is a success message!', 'success')}>Show Success</button>
            <button onClick={() => addAlert('This is an error message!', 'error')}>Show Error</button>
            <button onClick={() => openOverlay('This is an Overlay Message')}>Show Overlay</button>
        </div>
    );
};

export default Home;