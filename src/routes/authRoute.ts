import { login, signup, updatePassword } from '@/controller/authController';
import { ApiError } from '@/error';
import { isAuth } from '@/middlwares/isAuth';
import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: (_, __, next, options) => next(new ApiError(options.message, options.statusCode)),
});

const router = Router();

router.post('/login', limiter, login);
router.post('/signup', signup);
router.post('/update-password', isAuth, updatePassword);

export default router;
