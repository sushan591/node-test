import { Router } from 'express';

import * as UserController from '../controllers/users';
import { validateAuthUser } from '../middlewares/auth';
import { authLoginValidator, changePasswordValidator } from '../validators/authValidator';

const router = Router();

/**
 * GET /api/auth/user
 */
router.get('/user', validateAuthUser, UserController.getAuthDetail);

/**
 * POST /api/auth/login
 */
router.post('/login', authLoginValidator, UserController.authLogin);

/**
 * POST /api/auth/:id
 */
router.post('/change-password', validateAuthUser, changePasswordValidator, UserController.changePassword);


export default router;
