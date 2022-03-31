import type { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
	res.status(200).json({ message: 'Spotify Data Current Playing' });
});

export default router;
