import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

import apiRoutes from './routes/api';
import authRoutes from './routes/auth';

const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const app: Application = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.listen(BACKEND_PORT, () => {
  console.log(`Server is running on http://localhost:${BACKEND_PORT}`);
});