import { useAlert } from "../../context/AlertContext";
import Alert from "./Alert";

const GlobalAlert: React.FC = () => {
    const { alerts } = useAlert();

    return (
        <div className='global-alert-container absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-96 z-10 text-center'>
            {alerts.map(alert => (
                <Alert key={alert.id} message={alert.message} type={alert.type} />
            ))}
        </div>
    );
};

export default GlobalAlert;