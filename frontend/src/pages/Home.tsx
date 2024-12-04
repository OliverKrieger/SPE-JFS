import { useEffect } from "react";
import axios from "axios";

import { useDispatch } from 'react-redux';
import { login } from "../store/authSlice";

import Login from "./Login";
import Dashboard from "./Dashboard";

import { useAlert } from "../context/AlertContext";
import { useOverlay } from "../context/OverlayContext";

import { useSelector } from 'react-redux';
import { RootState } from "../store/store";

const Home: React.FC = () => {
    const { addAlert } = useAlert();
    const { openOverlay } = useOverlay();

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000"

    useEffect(() => {
        const handleAutoLogin = async () => {
            try {
                const response = await axios.post(apiURL + '/auth/auto-login', {}, { withCredentials: true });

                if (response.data.message) {
                    dispatch(login({
                        userId: response.data.user.userId,
                        username: response.data.user.username,
                        faction: response.data.user.faction,
                    }));

                    addAlert(`Signin for ${response.data.user.username} successful!`, 'success');
                }
            } catch (error: any) {
                console.log(error);
            }
        };

        handleAutoLogin(); // call on mount
    }, []); // empty dependencies, runs only once

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