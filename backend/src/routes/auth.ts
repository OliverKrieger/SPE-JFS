import { Router, Request, Response } from 'express';

const router = Router();

router.post('/signin', (req: Request, res: Response) => {
    res.json({ message: 'Sign in' });
});

router.post('/signup', (req: Request, res: Response) => {
    res.json({ message: 'Sign in' });
});

export default router;