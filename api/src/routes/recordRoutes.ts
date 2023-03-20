import controller from '../controllers/recordController';
import protectedRoute from '../middlewares/protectedRoute';
import { Router } from 'express';

const router = Router();

router.get('/:branch/:id', protectedRoute, controller.getRecord);
router.get('/:branch', protectedRoute, controller.getRecords);
router.post('/', protectedRoute, controller.getFilteredRecords);

export default router;
