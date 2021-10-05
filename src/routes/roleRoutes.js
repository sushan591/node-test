import { Router } from 'express';
import * as RoleController from '../controllers/roles';
import { validateAuthUser } from '../middlewares/auth';



const router = Router();

/**
 * GET /api/roles
 */
router.get('/', validateAuthUser, RoleController.fetchAll);

/**
 * GET /api/roles/:id
 */
router.get('/:id', validateAuthUser, RoleController.show);

export default router;
