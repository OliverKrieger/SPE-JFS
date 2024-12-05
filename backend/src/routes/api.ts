import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { fetchShips } from '../services/spacetraders';

import {AuthenticatedRequest, validateToken} from '../middleware/validateToken';

const apiRoutes = Router();

apiRoutes.post('/get-ships', validateToken, async (req: Request, res: Response) => {
    const { userId } = req as AuthenticatedRequest;

    if (!userId) {
        res.status(401).send({ error: 'Unauthorized access' });
        return;
    }

    try {
        const user = await prisma.usersTable.findUnique({
            where: { UserID: userId },
        });

        if (!user) {
            res.status(404).send({ error: 'User not found' });
            return;
        }

        // Check database for existing ship data
        const existingShips = await prisma.shipTable.findMany({
            where: { UserID: userId },
        });

        const currentTime = new Date();

        if (
            existingShips.length > 0 &&
            existingShips.every((ship) => ship.ExpiryTime > currentTime)
        ) {
            // Return ship names from database
            const shipNames = existingShips.map((ship) => ship.Symbol);
            res.status(200).send({
                message: 'Ships retrieved from database',
                data: shipNames,
            });
            return;
        }

        // If data did not exist or has expired, fetch from api
        const shipResponse = await fetchShips(user.AuthToken);

        // Store new ship data in the database with an expiry time
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getMinutes() + 5);

        await prisma.shipTable.deleteMany({ where: { UserID: userId } }); // Clear old data
        await prisma.shipTable.createMany({
            data: shipResponse.data.map((ship: any) => ({
                UserID: userId,
                Symbol: ship.symbol,
                ExpiryTime: expiryTime,
                Data: ship,
            })),
        });
        
        res.status(200).send({
            message: 'Fetching ships successful',
            data: shipResponse.data.map(ship => ship.symbol) // only return ship symbols
        });
        return;
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send({ error: 'Error fetching ships' });
        return;
    }
});

apiRoutes.post('/get-ship', validateToken, async (req: Request, res: Response) => {
    const { userId } = req as AuthenticatedRequest;

    if (!userId) {
        res.status(401).send({ error: 'Unauthorized access' });
        return;
    }

    const { shipSymbol } = req.body;

    if (!shipSymbol) {
        res.status(400).send({ error: 'Missing shipSymbol parameter' });
        return;
    }

    try {
        // Ensure the user exists
        const user = await prisma.usersTable.findUnique({
            where: { UserID: userId },
        });

        if (!user) {
            res.status(404).send({ error: 'User not found' });
            return;
        }

        // Fetch the ship data associated with the userId and shipSymbol
        const ship = await prisma.shipTable.findFirst({
            where: {
                UserID: userId,
                Symbol: shipSymbol as string,
            },
        });

        if (!ship) {
            res.status(404).send({ error: 'Ship not found' });
            return;
        }

        // Return the ship data
        res.status(200).send(ship.Data);
        return
    } catch (error) {
        console.error('Error fetching ship data:', error);
        res.status(500).send({ error: 'An error occurred while fetching ship data' });
        return;
    }
});

export default apiRoutes;