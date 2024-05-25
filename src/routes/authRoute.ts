import { login, signup, updatePassword } from '@/controller/authController';
import { ApiError } from '@/error';
import { isAuth } from '@/middlwares/isAuth';
import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 15,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_, __, next, options) => next(new ApiError(options.message, options.statusCode)),
});

const router = Router();

router.post('/login', limiter, login);
router.post('/signup', limiter, signup);
router.post('/update-password', limiter, isAuth, updatePassword);

export default router;
