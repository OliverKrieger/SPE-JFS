import axios from 'axios';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User Sign In', () => {

    const username = "Trader1";
    const password = 'testpassword';

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash("testpassword", 10);
        // Create a user in the database using Prisma
        await prisma.usersTable.create({
            data: {
                Username: username,
                Password: hashedPassword,
                Faction: "COSMIC",
                AuthToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiVFJBREVSMSIsInZlcnNpb24iOiJ2Mi4yLjAiLCJyZXNldF9kYXRlIjoiMjAyNC0xMC0yNyIsImlhdCI6MTczMzQzNDA4Miwic3ViIjoiYWdlbnQtdG9rZW4ifQ.2to98-Kk-IBTdYmdi6aEEvW63C0CFlxJOkD8icBaJRpX0Xk55YLsoZcX2v65NdW2y4JuCkdYarKVH4AQoSFEtHjisJukMyyug7otVpN_ALnk5bZcwGCuN1j7yxlaMPHKQyJE6JNMiKW_BvGIqAbDY2sXbOhukgRzncDG7QiUEnXkxAXQzlFJlITsUM14Sr9htJlzBWnB49CpiLIV-0JzXTGk61QirUTsq70VlEdsCfbwXAsyl_PWzSNMMKBVOQTVr8RRjd4KbrvdUm6LJ8JMhVlKkIPsxFjbqSOGGxc0scVvkWcu1JcS4RlAxvT_xJ-FcVGMxTl55A-qS1R_HzJxTA"
            },
        });
    });

    // After each test, clean up the user data
    afterAll(async () => {
        const user = await prisma.usersTable.findUnique({
            where: { Username: username },
        });

        // Delete the test user
        // Delete ships associated with the user
        await prisma.shipTable.deleteMany({
            where: { UserID: user?.UserID },
        });

        // Delete session tokens associated with the user
        await prisma.sessionTokensTable.deleteMany({
            where: { UserID: user?.UserID },
        });

        // Delete user and associated session tokens
        await prisma.usersTable.delete({
            where: { UserID: user?.UserID },
        });

        // Disconnect Prisma Client
        await prisma.$disconnect();
    });

    it('should sign in the user successfully', async () => {
        const response = await axios.post('http://localhost:5000/auth/signin', {
            username: username,
            password: password,
        });

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('user');
    });

});