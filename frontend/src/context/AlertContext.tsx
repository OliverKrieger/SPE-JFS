// context/AlertContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Alert {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    id: string;
}

interface AlertState {
    alerts: Alert[];
}

interface AlertContextType {
    alerts: Alert[];
    addAlert: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
    removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const alertReducer = (state: AlertState, action: { type: string; id?: string; alert?: Alert }) => {
    switch (action.type) {
        case 'ADD_ALERT':
            return { ...state, alerts: [...state.alerts, action.alert!] };
        case 'REMOVE_ALERT':
            return { ...state, alerts: state.alerts.filter(alert => alert.id !== action.id) }; // Use id for filtering
        default:
            return state;
    }
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(alertReducer, { alerts: [] });

    const addAlert = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
        const id = Math.random().toString(36).substr(2, 9); // create a random ID
        dispatch({ type: 'ADD_ALERT', alert: { message, type, id } });
        setTimeout(() => dispatch({ type: 'REMOVE_ALERT', id }), 3000); // Remove alert after 3 seconds
    };

    const removeAlert = (id: string) => {
        dispatch({ type: 'REMOVE_ALERT', id });
    };

    return (
        <AlertContext.Provider value={{ alerts: state.alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
