import { Router } from 'express';
import { getAccount } from '../controllers/accountControllers';

const router = Router();

router.get('/:userId', getAccount);

export default router;
