import Login from "./Login";

import { useAlert } from "../context/AlertContext";
import { useOverlay } from "../context/OverlayContext";

const Home: React.FC = () => {
    const { addAlert } = useAlert();
    const { openOverlay } = useOverlay();

    return (
        <div className='home-container'>
            <Login />
            <button onClick={() => addAlert('This is a success message!', 'success')}>Show Success</button>
            <button onClick={() => addAlert('This is an error message!', 'error')}>Show Error</button>
            <button onClick={() => openOverlay('This is an Overlay Message')}>Show Overlay</button>
        </div>
    );
};

export default Home;