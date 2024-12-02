import dotenv from 'dotenv';
dotenv.config();

export const config = {
  SPACETRADERS_API_KEY: process.env.SPACETRADERS_API_KEY || '',
};