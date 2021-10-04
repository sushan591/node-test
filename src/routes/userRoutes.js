import { Router } from 'express';

import * as UserController from '../controllers/users';
import { validateAuthUser } from '../middlewares/auth';
import { forgotPasswordValidator, resetPasswordValidator, userInsertValidator, userUpdateValidator } from '../validators/userValidator';


const router = Router();

/**
 * GET /api/users
 */
router.get('/', validateAuthUser, UserController.fetchAll);

/**
 * GET /api/users/:id/verify-reset-token
 */
router.get('/:id/verify-reset-token', UserController.verifyResetToken);

/**
 * POST /api/users/:id/reset-password
 */
router.post('/:id/reset-password', resetPasswordValidator, UserController.resetPassword);

/**
 * GET /api/users/:id
 */
router.get('/:id', UserController.show);

/**
 * POST /api/users
 */
router.post('/', userInsertValidator, UserController.createUser);

/**
 * PUT /api/users/:id
 */
router.put('/:id', userUpdateValidator, UserController.updateUser);

/**
 * POST /api/users/forgot-password
 */
router.post('/forgot-password', forgotPasswordValidator, UserController.forgotPassword);





export default router;
