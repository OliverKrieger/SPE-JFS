import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import apiRoutes from './routes/api';
import authRoutes from './routes/auth';

dotenv.config();

const app: Application = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true, 
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Server Start
app.listen(BACKEND_PORT, () => {
  console.log(`Server is running on http://localhost:${BACKEND_PORT}`);
});