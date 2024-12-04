import React from 'react';
import axios from 'axios';

import { useAlert } from "../../context/AlertContext";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';

const Logout: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    const { addAlert } = useAlert();
    const dispatch = useDispatch();

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000"

    const handleLogout = async () => {
        try {
            const response = await axios.post( apiURL+'/auth/logout', {}, { withCredentials: true });

            if (response.data.message) {
                dispatch(logout());

                addAlert(`Logout successful!`, 'success');
            }
        } catch (error: any) {
            addAlert(error.response?.data?.error || 'An error occurred during signup.', 'error');
        }
    };

    return (
        <div className='logout-container'>
            {user ? (
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            ) : (
                <span>Error</span>
            )}
        </div>
    );
};

export default Logout;