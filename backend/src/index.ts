import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import apiRoutes from './routes/api';
app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});