import { Router, Request, Response } from 'express';

const router = Router();

router.get('/example', (req: Request, res: Response) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

export default router;