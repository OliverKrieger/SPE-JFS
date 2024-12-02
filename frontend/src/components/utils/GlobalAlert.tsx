import { useAlert } from "../../context/AlertContext";
import Alert from "./Alert";

const GlobalAlert: React.FC = () => {
    const { alerts } = useAlert();

    return (
        <div className='global-alert-container'>
            {alerts.map(alert => (
                <Alert key={alert.id} message={alert.message} type={alert.type} />
            ))}
        </div>
    );
};

export default GlobalAlert;