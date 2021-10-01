import { Router } from 'express';

import * as UserController from '../controllers/users';
import { validateAuthUser } from '../middlewares/auth';
import { authLoginValidator } from '../validators/authValidator';

const router = Router();

/**
 * GET /api/auth/user
 */
router.get('/user', validateAuthUser, UserController.getAuthDetail);

/**
 * POST /api/auth/login
 */
router.post('/login', authLoginValidator, UserController.authLogin);


export default router;
