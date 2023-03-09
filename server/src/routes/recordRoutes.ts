import * as controller from '../controllers/recordController';
import { protectedRoute } from '../middlewares/protectedRoute';
import { Router } from 'express';

const router = Router();

router.get('/:branch', protectedRoute, controller.getBranchRecords);
router.get('/:branch/:from/:to', protectedRoute, controller.getFilteredRecords);

export default router;
