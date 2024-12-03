import { useOverlay } from "../../context/OverlayContext";

import ConfirmationDialog from "../utils/ConfirmationDialog";

const Account: React.FC = () => {
    const { openOverlay, closeOverlay } = useOverlay();

    const handleConfirm = () => {
        console.log('User clicked Yes');
    };

    const handleCancel = () => {
        console.log('User clicked No');
        closeOverlay();
    };

    return (
        <div className='account-container'>
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