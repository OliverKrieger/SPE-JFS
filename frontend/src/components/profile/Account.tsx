import axios from "axios";

import { useAlert } from "../../context/AlertContext";
import { useOverlay } from "../../context/OverlayContext";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from "../../store/authSlice";

import ConfirmationDialog from "../utils/ConfirmationDialog";

const Account: React.FC = () => {
    const { openOverlay, closeOverlay } = useOverlay();
    const user = useSelector((state: RootState) => state.auth.user);

    const { addAlert } = useAlert();
    const dispatch = useDispatch();

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000"

    const handleConfirm = async () => {
        try {
            const response = await axios.post( apiURL+'/auth/delete', {}, { withCredentials: true });

            if (response.data.message) {
                addAlert(`Account deleted successfully.`, 'success');
                dispatch(logout());
            }
        } catch (error: any) {
            addAlert(error.response?.data?.error || 'An error occurred during deleting the account.', 'error');
        }
    };

    const handleCancel = () => {
        closeOverlay();
    };

    return (
        <div className='account-container'>
            {user ? (
                <div>
                    <span>{user.username}</span>
                    <span>{user.faction}</span>
                </div>
            ) : (
                <div>
                    <span>Error</span>
                </div>
            )}
            <button onClick={() => openOverlay(
                <ConfirmationDialog
                    message="Are you sure you want to delete your account?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}>
                Delete Account
            </button>
        </div>
    );
};

export default Account;