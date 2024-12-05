import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from 'react-redux';
import { login } from "../store/authSlice";

import Login from "./Login";
import Dashboard from "./Dashboard";
import LoadingSpinner from "../components/utils/LoadingSpinner";

import { useAlert } from "../context/AlertContext";

import { useSelector } from 'react-redux';
import { RootState } from "../store/store";

const Home: React.FC = () => {
    const { addAlert } = useAlert();

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const [isLoading, setIsLoading] = useState(true);

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
            } finally {
                setIsLoading(false);
            }
        };

        handleAutoLogin(); // call on mount
    }, []); // empty dependencies, runs only once

    if (isLoading) {
        return (
            <div className="home-container">
                <LoadingSpinner /> {/* Show loading spinner while auto-login is in progress */}
            </div>
        );
    }
    
    return (
        <div className='home-container'>
            {!isLoggedIn ? <Login /> : <Dashboard />}
        </div>
    );
};

export default Home;