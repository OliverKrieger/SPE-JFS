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
        <div className='account-container h-full w-full'>
            <div className="flex flex-col h-full items-center justify-center">
                {user ? (
                    <div className="text-center space-y-4 mb-4">
                        <div className="text-lg"><strong>Username: </strong>{user.username}</div>
                        <div className="text-lg"><strong>Faction: </strong>{user.faction}</div>
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
        </div>
    );
};

export default Account;