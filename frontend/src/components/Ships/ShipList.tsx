import { useEffect, useState } from "react";
import axios from "axios";

import { useAlert } from "../../context/AlertContext";
import { useOverlay } from "../../context/OverlayContext";

import LoadingSpinner from "../utils/LoadingSpinner";
import ShipInfo from "./ShipInfo";


interface ShipsState {
    data: string[];
}
const ShipList: React.FC = () => {
    const [shipsState, setShipsState] = useState<ShipsState>({ data: [] });

    const { addAlert } = useAlert();
    const { openOverlay } = useOverlay();

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000"

    useEffect(() => {
        const handleFetchShips = async () => {
            try {
                const response = await axios.post(apiURL + '/api/get-ships', {}, { withCredentials: true });
        
                if (response.data.message) {
                    addAlert("Ships retrieved successfully!", 'success');
                    setShipsState({ data: response.data.data });
                }
            } catch (error: any) {
                addAlert(error.response?.data?.error || 'There was an error in ship retrieval.', 'error');
            }
        };
        handleFetchShips();
    }, []);

    return (
        <div className="ship-list-container">
            {shipsState.data.length > 0 ? (
                <div>
                    {shipsState.data.map((shipSymbol, index) => (
                        <div key={index} onClick={() => openOverlay(
                            <ShipInfo shipSymbol={shipSymbol} />
                        )}>
                            {shipSymbol}
                        </div>
                    ))}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};

export default ShipList;
