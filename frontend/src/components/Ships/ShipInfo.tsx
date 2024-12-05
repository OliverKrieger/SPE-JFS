import { useState, useEffect } from "react";
import axios from "axios";

import { useAlert } from "../../context/AlertContext";

import LoadingSpinner from "../utils/LoadingSpinner";

import { ShipType } from "../../types/ships/ShipTypes";

interface ShipInfoProps{
    shipSymbol: string
}

interface ShipState{
    ship: ShipType | null
}

const ShipInfo: React.FC<ShipInfoProps> = ({shipSymbol}) => {
    const [shipState, setShipState] = useState<ShipState>({ ship: null });

    const { addAlert } = useAlert();

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000"

    useEffect(() => {
        const handleGetShip = async () => {
            try {
                const response = await axios.post( apiURL+'/api/get-ship', { shipSymbol }, { withCredentials: true });

                if (response.data) {
                    addAlert("Ship retrieved successfully!", 'success');
                    console.log("DATA: ", response.data)
                    setShipState({ ship: response.data });
                }
                return response.data; // The ship data
            } catch (error: any) {
                console.error('Error fetching ship:', error.response?.data || error.message);
                addAlert("Failed to retrieve ship!", 'error');
            }
        };

        handleGetShip();
    }, []);

    return (
        <div className="ship-info-container">
            {shipState.ship ? (
                <div>
                    <h2>Ship</h2>
                    <p>{shipState.ship.symbol}</p>
                    
                    <h2>Cargo</h2>
                    <p><strong>Capacity:</strong>{shipState.ship.cargo.capacity}</p>
                    <p><strong>Units:</strong>{shipState.ship.cargo.units}</p>
                    
                    <h2>Navigation</h2>
                    <p><strong>System:</strong> {shipState.ship.nav.systemSymbol}</p>
                    <p><strong>Waypoint:</strong> {shipState.ship.nav.waypointSymbol}</p>

                    <h3>Route</h3>
                    <p><strong>Origin:</strong> {shipState.ship.nav.route.origin.symbol} (Type: {shipState.ship.nav.route.origin.type})</p>
                    <p><strong>Destination:</strong> {shipState.ship.nav.route.destination.symbol} (Type: {shipState.ship.nav.route.destination.type})</p>
                    <p><strong>Arrival:</strong> {new Date(shipState.ship.nav.route.arrival).toLocaleString()}</p>
                    <p><strong>Departure Time:</strong> {new Date(shipState.ship.nav.route.departureTime).toLocaleString()}</p>

                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};

export default ShipInfo;