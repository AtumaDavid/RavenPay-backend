import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authControllers';
// import { handleWebhook } from '../controllers/webhookController';

const router = Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
// router.post('/webhook', handleWebhook);

export default router;
