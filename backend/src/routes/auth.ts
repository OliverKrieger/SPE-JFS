import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

import { registerWithSpaceTraders } from '../services/spacetraders';

// Define the types for request bodies
interface SignUpBody {
    username: string;
    faction: string;
    password: string;
}

interface SignInBody {
    username: string;
    password: string;
}

// Define response types for success and error cases
interface ErrorResponse {
    error: string;
}

interface SuccessResponse {
    message: string;
    user?: object;
}

type AuthResponse = SuccessResponse | ErrorResponse;

// Create the authRoutes router instance
const authRoutes = Router();

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Sign Up Route
authRoutes.post('/signup', async (req: Request<{}, {}, SignUpBody>, res: Response<AuthResponse>) => {
    const { username, password, faction } = req.body;

    if (!username || !password || !faction) {
        res.status(400).send({ error: 'All fields are required' });
        return;
    }

    try {
        const existingUser = await prisma.usersTable.findUnique({
            where: { Username: username },
        });

        if (existingUser) {
            res.status(400).send({ error: 'Username already exists' });
            return;
        }

        // Attempt to register with space traders
        const spaceTradersResponse = await registerWithSpaceTraders(username, faction);

        if ('error' in spaceTradersResponse) {
            res.status(spaceTradersResponse.error.code).send({ error: 'Failed to register with SpaceTraders.io' });
            return;
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.usersTable.create({
                data: {
                    Username: username,
                    Faction: faction,
                    AuthToken: spaceTradersResponse.data.token,
                    Password: hashedPassword
                },
            });

            res.status(201).send({
                message: 'User created successfully',
                user: { username: newUser.Username, faction: newUser.Faction },
            });
        }
        return;
    } catch (error) {
        console.log('Error during Sign-up:', error)
        res.status(500).send({ error: 'Error creating user' });
        return;
    }
});

// Sign In Route
authRoutes.post('/signin', async (req: Request<{}, {}, SignInBody>, res: Response<AuthResponse>) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send({ error: 'Both username and password are required' });
        return;
    }

    try {
        const user = await prisma.usersTable.findUnique({
            where: { Username: username },
        });

        if (!user) {
            res.status(400).send({ error: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.Password);

        if (!isPasswordValid) {
            res.status(400).send({ error: 'Invalid password' });
            return;
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user.UserID, username: user.Username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Store the token in the SessionTokensTable
        await prisma.sessionTokensTable.create({
            data: {
                UserID: user.UserID,
                SessionTokenID: token,
                ExpiryTime: new Date(Date.now() + 60 * 60 * 1000), // Token expiry time set to 1 hour
            },
        });

        // Set the token in an HTTP-only cookie
        res.cookie('session_token', token, {
            httpOnly: true, // Prevent access from JavaScript
            secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
            sameSite: 'strict', // CSRF protection
            maxAge: 3600 * 1000, // Token valid for 1 hour
        });

        // Send the success response with the token
        res.status(200).send({
            message: 'Login successful',
            user: {
                userId: user.UserID,
                username: user.Username,
                faction: user.Faction
            },

        });
        return;
    } catch (error) {
        console.log('Error during Sign-in:', error)
        res.status(500).send({ error: 'Error signing in' });
        return;
    }
});

// Auto-login with session token
authRoutes.post('/auto-login', async (req: Request, res: Response<AuthResponse>) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting a Bearer token

    if (!token) {
        res.status(401).send({ error: 'No token provided' });
        return;
    }

    try {
        // Decode and verify the JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        // Look up the token in the database
        const session = await prisma.sessionTokensTable.findUnique({
            where: { SessionTokenID: token },
        });

        if (!session) {
            res.status(401).send({ error: 'Invalid token' });
            return;
        }

        // Check if the token has expired
        if (session.ExpiryTime < new Date()) {
            await prisma.sessionTokensTable.delete({
                where: { SessionTokenID: token },
            });
            res.status(401).send({ error: 'Token has expired, please log in again' });
            return;
        }

        // Find the user associated with the token
        const user = await prisma.usersTable.findUnique({
            where: { UserID: decoded.userId },
        });

        if (!user) {
            res.status(404).send({ error: 'User not found' });
            return;
        }

        // Respond with a success message and optionally user info
        res.status(200).send({
            message: 'User logged in successfully',
            user: {
                userId: user.UserID,
                username: user.Username,
                faction: user.Faction
            },
        });
        return;
    } catch (error) {
        console.error('Error during auto-login:', error);
        res.status(500).send({ error: 'Error verifying token' });
        return;
    }
});

// Logout Route
authRoutes.post('/logout', async (req: Request, res: Response<AuthResponse>) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting a Bearer token

    if (!token) {
        res.status(400).send({ error: 'Token is required' });
        return;
    }

    try {
        // Check if the token exists in the database
        const session = await prisma.sessionTokensTable.findUnique({
            where: { SessionTokenID: token },
        });

        if (!session) {
            res.status(404).send({ error: 'Token not found or already invalidated' });
            return;
        }

        // Delete the session token
        await prisma.sessionTokensTable.delete({
            where: { SessionTokenID: token },
        });

        // Clear the session token cookie
        res.clearCookie('session_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).send({ message: 'Logout successful' });
        return;
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send({ error: 'Error logging out' });
        return;
    }
});


// Delete User Route
authRoutes.delete('/delete', async (req: Request<{}, {}, { token: string }>, res: Response<AuthResponse>) => {
    const { token } = req.body;

    if (!token) {
        res.status(400).send({ error: 'Session token is required' });
        return;
    }

    try {
        const session = await prisma.sessionTokensTable.findUnique({
            where: { SessionTokenID: token },
        });

        if (!session) {
            res.status(400).send({ error: 'Invalid session token' });
            return;
        }

        const userId = session.UserID;

        // Delete ships associated with the user
        await prisma.shipTable.deleteMany({
            where: { UserID: userId },
        });

        // Delete session tokens associated with the user
        await prisma.sessionTokensTable.deleteMany({
            where: { UserID: userId },
        });

        // Delete user and associated session tokens
        const deletedUser = await prisma.usersTable.delete({
            where: { UserID: userId },
        });

        res.status(200).send({
            message: 'User '+deletedUser.Username+' deleted successfully',
        });
        return;
    } catch (error) {
        console.log('Error during delete:', error)
        res.status(500).send({ error: 'Error deleting user' });
        return;
    }
});

export default authRoutes;
