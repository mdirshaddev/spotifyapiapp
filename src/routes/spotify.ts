import { Router } from 'express';
import { GetCurrentPlaying } from 'controllers/GetCurrentPlaying';

const router = Router();

router.get('/', GetCurrentPlaying);

export default router;
