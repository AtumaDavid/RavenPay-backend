import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authControllers';

const router = Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;
