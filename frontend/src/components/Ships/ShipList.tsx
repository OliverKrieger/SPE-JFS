import { useEffect, useState } from "react";
import axios from "axios";

import { useAlert } from "../../context/AlertContext";

interface ShipsState {
    data: string;
}

const ShipList: React.FC = () => {
    const [shipsState, setShipsState] = useState<ShipsState>({ data: ""});

    const { addAlert } = useAlert();

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000"

    useEffect(() => {
        const handleFetchShips = async () => {
            try {
                const response = await axios.post( apiURL+'/api/ships', {}, { withCredentials: true });

                if (response.data.message) {
                    addAlert(response.data.message, 'success');
                    console.log("SHIP DATA: ", response.data);
                    setShipsState({data:"Retrieved"});
                }
            } catch (error: any) {
                addAlert(error.response?.data?.error || 'There was an error in ship retrieval.', 'error');
            }
        }
        handleFetchShips();
    }, []);

    return (
        <div className="ship-list-container">
            {shipsState ? (
                <div></div>
            ) : (
                <span>Loading</span>
            )}
        </div>
    );
};

export default ShipList;
