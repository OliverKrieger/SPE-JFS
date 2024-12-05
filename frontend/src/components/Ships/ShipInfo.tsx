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
        <div className="ship-info-container pb-10">
            {shipState.ship ? (
                <div className="space-y-6">
                    <h1>Ship Details</h1>
                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Ship Symbol</h2>
                        <p>{shipState.ship.symbol}</p>
                    </section>
                    
                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Navigation</h2>
                        <ul>
                            <li><strong>System Symbol:</strong> {shipState.ship.nav.systemSymbol}</li>
                            <li><strong>Waypoint Symbol:</strong> {shipState.ship.nav.waypointSymbol}</li>
                            <li><strong>Origin:</strong> {shipState.ship.nav.route.origin.symbol}</li>
                            <li><strong>Destination:</strong> {shipState.ship.nav.route.destination.symbol}</li>
                            <li><strong>Arrival:</strong> {new Date(shipState.ship.nav.route.arrival).toLocaleString()}</li>
                            <li><strong>Departure Time:</strong> {new Date(shipState.ship.nav.route.departureTime).toLocaleString()}</li>
                            <li><strong>Status:</strong> {shipState.ship.nav.status}</li>
                            <li><strong>Flight Mode:</strong> {shipState.ship.nav.flightMode}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Crew</h2>
                        <ul>
                            <li><strong>Current Crew:</strong> {shipState.ship.crew.current}</li>
                            <li><strong>Capacity:</strong> {shipState.ship.crew.capacity}</li>
                            <li><strong>Required Crew:</strong> {shipState.ship.crew.required}</li>
                            <li><strong>Rotation:</strong> {shipState.ship.crew.rotation}</li>
                            <li><strong>Morale:</strong> {shipState.ship.crew.morale}</li>
                            <li><strong>Wages:</strong> {shipState.ship.crew.wages}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Fuel</h2>
                        <ul>
                            <li><strong>Current Fuel:</strong> {shipState.ship.fuel.current}</li>
                            <li><strong>Fuel Capacity:</strong> {shipState.ship.fuel.capacity}</li>
                            <li><strong>Fuel Consumed:</strong> {shipState.ship.fuel.consumed.amount} (since {new Date(shipState.ship.fuel.consumed.timestamp).toLocaleString()})</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Cooldown</h2>
                        <ul>
                            <li><strong>Ship Symbol:</strong> {shipState.ship.cooldown.shipSymbol}</li>
                            <li><strong>Total Seconds:</strong> {shipState.ship.cooldown.totalSeconds}</li>
                            <li><strong>Remaining Seconds:</strong> {shipState.ship.cooldown.remainingSeconds}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Frame</h2>
                        <ul>
                            <li><strong>Name:</strong> {shipState.ship.frame.name}</li>
                            <li><strong>Description:</strong> {shipState.ship.frame.description}</li>
                            <li><strong>Module Slots:</strong> {shipState.ship.frame.moduleSlots}</li>
                            <li><strong>Fuel Capacity:</strong> {shipState.ship.frame.fuelCapacity}</li>
                            <li><strong>Condition:</strong> {shipState.ship.frame.condition}</li>
                            <li><strong>Integrity:</strong> {shipState.ship.frame.integrity}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Reactor</h2>
                        <ul>
                            <li><strong>Name:</strong> {shipState.ship.reactor.name}</li>
                            <li><strong>Description:</strong> {shipState.ship.reactor.description}</li>
                            <li><strong>Condition:</strong> {shipState.ship.reactor.condition}</li>
                            <li><strong>Integrity:</strong> {shipState.ship.reactor.integrity}</li>
                            <li><strong>Power Output:</strong> {shipState.ship.reactor.powerOutput}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Engine</h2>
                        <ul>
                            <li><strong>Name:</strong> {shipState.ship.engine.name}</li>
                            <li><strong>Description:</strong> {shipState.ship.engine.description}</li>
                            <li><strong>Condition:</strong> {shipState.ship.engine.condition}</li>
                            <li><strong>Integrity:</strong> {shipState.ship.engine.integrity}</li>
                            <li><strong>Speed:</strong> {shipState.ship.engine.speed}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Modules</h2>
                        <ul>
                            {shipState.ship.modules.map((module, index) => (
                                <li key={index}>
                                    <strong>{module.name}</strong>: {module.description} (Capacity: {module.capacity})
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Mounts</h2>
                        <ul>
                            {shipState.ship.mounts.map((mount, index) => (
                                <li key={index}>
                                    <strong>{mount.name}</strong>: {mount.description} (Strength: {mount.strength})
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Registration</h2>
                        <ul>
                            <li><strong>Name:</strong> {shipState.ship.registration.name}</li>
                            <li><strong>Faction Symbol:</strong> {shipState.ship.registration.factionSymbol}</li>
                            <li><strong>Role:</strong> {shipState.ship.registration.role}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg text-bold text-slate-50 tracking-wider uppercase">Cargo</h2>
                        <ul>
                            <li><strong>Capacity:</strong> {shipState.ship.cargo.capacity}</li>
                            <li><strong>Units:</strong> {shipState.ship.cargo.units}</li>
                            <li><strong>Inventory:</strong>
                                <ul>
                                    {shipState.ship.cargo.inventory.map((item, index) => (
                                        <li key={index}>{item.itemSymbol}: {item.units} units</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </section>

                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};

export default ShipInfo;