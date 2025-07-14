import { Router } from 'express';
import { handleTransfer } from '../controllers/transferController';
import { getTransactions } from '../controllers/accountControllers';
import { handleExternalTransfer } from '../controllers/externalTransferController';

const router = Router();

router.post('/transfer', handleTransfer);
router.get('/transactions/:userId', getTransactions);
router.post('/external-transfer', handleExternalTransfer);

export default router;
