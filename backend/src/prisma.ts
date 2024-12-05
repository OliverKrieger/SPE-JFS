import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectWithRetry() {
    const maxRetries = 5;
    const retryDelay = 5000; // 5 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await prisma.$connect();
            console.log("Database connection successful!");
            return;
        } catch (error) {
            console.error(`Database connection attempt ${attempt} failed. Retrying in ${retryDelay / 1000} seconds...`);
            if (attempt === maxRetries) {
                console.error("Max retries reached. Exiting...");
                process.exit(1);
            }
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
    }
}

connectWithRetry();

export default prisma;
