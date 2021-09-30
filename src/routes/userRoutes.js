import { Router } from 'express';

import * as UserController from '../controllers/users';
import { userInsertValidator } from '../validators/userValidator';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', UserController.fetchAll);

/**
 * GET /api/users/:id
 */
router.get('/:id', UserController.show);

/**
 * POST /api/users
 */
router.post('/', userInsertValidator, UserController.createUser);


export default router;
