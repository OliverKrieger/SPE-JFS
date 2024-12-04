import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.session_token;

        if (!token) {
            res.status(401).send({ error: 'No token provided' });
            return
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        // Check if the token exists in the database
        const session = await prisma.sessionTokensTable.findUnique({
            where: { SessionTokenID: token },
        });

        if (!session) {
            res.clearCookie('session_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            res.status(401).send({ error: 'Invalid token, logged out' });
            return
        }

        // Check if the token has expired
        if (session.ExpiryTime < new Date()) {
            await prisma.sessionTokensTable.delete({
                where: { SessionTokenID: token },
            });
            res.clearCookie('session_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            res.status(401).send({ error: 'Token has expired, logged out' });
            return
        }

        // Attach userId to the request object
        (req as AuthenticatedRequest).userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.clearCookie('session_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(500).send({ error: 'Error verifying token, logged out' });
        return
    }
};