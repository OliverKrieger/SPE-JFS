export interface SpaceTradersRegisterError {
    error: {
        message: string;
        code: number;
        data: {
            agentSymbol?: string;  // Optional since it's included in error data
        };
    };
}

export interface SpaceTradersRegisterSuccess {
    data: {
        token: string;
        agent: {
            accountId: string;
            symbol: string;
            headquarters: string;
            credits: number;
            startingFaction: string;
            shipCount: number;
        };
        contract: {
            id: string;
            factionSymbol: string;
            type: string;
            terms: {
                deadline: string;
                payment: {
                    onAccepted: number;
                    onFulfilled: number;
                };
                deliver: Array<{
                    tradeSymbol: string;
                    destinationSymbol: string;
                    unitsRequired: number;
                    unitsFulfilled: number;
                }>;
            };
            accepted: boolean;
            fulfilled: boolean;
            expiration: string;
            deadlineToAccept: string;
        };
        faction: {
            symbol: string;
            name: string;
            description: string;
            headquarters: string;
            traits: Array<{
                symbol: string;
                name: string;
                description: string;
            }>;
            isRecruiting: boolean;
        };
        ship: {
            symbol: string;
            nav: {
                systemSymbol: string;
                waypointSymbol: string;
                route: {
                    origin: {
                        symbol: string;
                        type: string;
                        systemSymbol: string;
                        x: number;
                        y: number;
                    };
                    destination: {
                        symbol: string;
                        type: string;
                        systemSymbol: string;
                        x: number;
                        y: number;
                    };
                    arrival: string;
                    departureTime: string;
                };
                status: string;
                flightMode: string;
            };
            crew: {
                current: number;
                capacity: number;
                required: number;
                rotation: string;
                morale: number;
                wages: number;
            };
            fuel: {
                current: number;
                capacity: number;
                consumed: {
                    amount: number;
                    timestamp: string;
                };
            };
            cooldown: {
                shipSymbol: string;
                totalSeconds: number;
                remainingSeconds: number;
            };
            frame: {
                symbol: string;
                name: string;
                description: string;
                moduleSlots: number;
                mountingPoints: number;
                fuelCapacity: number;
                condition: number;
                integrity: number;
                requirements: {
                    power: number;
                    crew: number;
                };
            };
            reactor: {
                symbol: string;
                name: string;
                description: string;
                condition: number;
                integrity: number;
                powerOutput: number;
                requirements: {
                    crew: number;
                };
            };
            engine: {
                symbol: string;
                name: string;
                description: string;
                condition: number;
                integrity: number;
                speed: number;
                requirements: {
                    power: number;
                    crew: number;
                };
            };
            modules: Array<{
                symbol: string;
                name: string;
                description: string;
                capacity: number;
                requirements: {
                    crew: number;
                    power: number;
                    slots: number;
                };
            }>;
            mounts: Array<{
                symbol: string;
                name: string;
                description: string;
                strength: number;
                requirements: {
                    crew: number;
                    power: number;
                };
            }>;
            registration: {
                name: string;
                factionSymbol: string;
                role: string;
            };
            cargo: {
                capacity: number;
                units: number;
                inventory: Array<any>;
            };
        };
    };
}

export interface ShipResponse {
    data: Ship[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface Ship {
    symbol: string;
    nav: {
        systemSymbol: string;
        waypointSymbol: string;
        route: {
            origin: LocationDetails;
            destination: LocationDetails;
            arrival: string;
            departureTime: string;
        };
        status: string;
        flightMode: string;
    };
    crew: {
        current: number;
        capacity: number;
        required: number;
        rotation: string;
        morale: number;
        wages: number;
    };
    fuel: {
        current: number;
        capacity: number;
        consumed: {
            amount: number;
            timestamp: string;
        };
    };
    cooldown: {
        shipSymbol: string;
        totalSeconds: number;
        remainingSeconds: number;
    };
    frame: {
        symbol: string;
        name: string;
        description: string;
        moduleSlots: number;
        mountingPoints: number;
        fuelCapacity: number;
        condition: number;
        integrity: number;
        requirements: {
            power: number;
            crew: number;
        };
    };
    reactor: {
        symbol: string;
        name: string;
        description: string;
        condition: number;
        integrity: number;
        powerOutput: number;
        requirements: {
            crew: number;
        };
    };
    engine: {
        symbol: string;
        name: string;
        description: string;
        condition: number;
        integrity: number;
        speed: number;
        requirements: {
            power: number;
            crew: number;
        };
    };
    modules: Module[];
    mounts: Mount[];
    registration: {
        name: string;
        factionSymbol: string;
        role: string;
    };
    cargo: {
        capacity: number;
        units: number;
        inventory: Inventory[];
    };
}

interface LocationDetails {
    symbol: string;
    type: string;
    systemSymbol: string;
    x: number;
    y: number;
}

interface Module {
    symbol: string;
    name: string;
    description: string;
    capacity?: number;
    requirements: {
        crew: number;
        power: number;
        slots: number;
    };
}

interface Mount {
    symbol: string;
    name: string;
    description: string;
    strength: number;
    deposits?: string[];
    requirements: {
        crew: number;
        power: number;
    };
}

interface Inventory {
    itemSymbol: string;
    units: number;
}