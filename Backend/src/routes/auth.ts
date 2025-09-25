import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validate } from '../middleware/validation';
import { requireAuth, requireNoAuth } from '../middleware/auth';
import { createUserValSchema, userLoginValSchema } from '../schemas/zod';
import passport from '../config/passport';

const router: Router = Router();

// POST /auth/register - User Registration
router.post('/register', 
  requireNoAuth,
  validate(createUserValSchema), 
  AuthController.registerUser
);

// POST /auth/login - User Login
router.post('/login',
  requireNoAuth,
  validate(userLoginValSchema),
  passport.authenticate('local', {
    failureMessage: true
  }),
  AuthController.loginUser
);

// POST /auth/logout - User Logout
router.post('/logout',
  requireAuth,
  AuthController.logoutUser
);

// GET /auth/me - Get Current User
router.get('/me',
  requireAuth,
  AuthController.getCurrentUser
);

export default router;