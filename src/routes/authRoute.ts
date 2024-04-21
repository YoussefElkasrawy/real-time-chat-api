import { login, signup, updatePassword } from '@/controller/authController';
import { isAuth } from '@/middlwares/isAuth';
import { Router } from 'express';
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/update-password', isAuth, updatePassword);

export default router;
