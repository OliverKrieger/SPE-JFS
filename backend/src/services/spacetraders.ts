import axios from 'axios';
import { config } from '../config/env';

import { SpaceTradersRegisterError, SpaceTradersRegisterSuccess, ShipResponse } from './types';

const API_BASE_URL = 'https://api.spacetraders.io';

export async function registerWithSpaceTraders(username: string, faction: string) : Promise<SpaceTradersRegisterSuccess | SpaceTradersRegisterError> {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/v2/register`,
            {
                symbol: username,
                faction: faction,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}

export async function fetchShips(AuthToken: string) {
    try {
        const response = await axios.get<ShipResponse>(`${API_BASE_URL}/v2/my/ships`, {
            headers: {
                Authorization: `Bearer ${AuthToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching ships:', error);
        throw error;
    }
}