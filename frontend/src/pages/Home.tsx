import Login from "./Login";

import { useAlert } from "../context/AlertContext";

const Home: React.FC = () => {
    const { addAlert } = useAlert();

    return (
        <div className='home-container'>
            <Login />
            <button onClick={() => addAlert('This is a success message!', 'success')}>Show Success</button>
            <button onClick={() => addAlert('This is an error message!', 'error')}>Show Error</button>
        </div>
    );
};

export default Home;