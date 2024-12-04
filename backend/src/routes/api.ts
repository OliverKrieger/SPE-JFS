import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { fetchShips } from '../services/spacetraders';

import {AuthenticatedRequest, validateToken} from '../middleware/validateToken';

const apiRoutes = Router();

apiRoutes.post('/ships', validateToken, async (req: Request, res: Response) => {
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

        // TODO - If already exists and not "stale", return ship data from db 
        // (can only retrieve ship names rather than return all the data)!

        const data = await fetchShips(user.AuthToken);

        // TODO - Store to database
        
        res.status(200).send({
            message: 'Fetching ships successful',
            data: data,
        });
        return;
    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send({ error: 'Error fetching ships' });
        return;
    }
});

export default apiRoutes;