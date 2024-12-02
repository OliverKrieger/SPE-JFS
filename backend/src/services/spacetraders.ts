import axios from 'axios';
import { config } from '../config/env';

const API_BASE_URL = 'https://api.spacetraders.io';

export async function fetchShips() {
  try {
    const response = await axios.get(`${API_BASE_URL}/v2/my/ships`, {
      headers: {
        Authorization: `Bearer ${config.SPACETRADERS_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ships:', error);
    throw error;
  }
}