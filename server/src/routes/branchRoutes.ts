import * as controller from '../controllers/branchController';
import { protectedRoute } from '../middlewares/protectedRoute';
import { Router } from 'express';

const router = Router();

router.get('/:id', protectedRoute, controller.getBranch);
router.get('/', protectedRoute, controller.getBranches);

export default router;
