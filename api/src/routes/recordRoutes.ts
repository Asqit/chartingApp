import controller from '../controllers/recordController';
import validateToken from '../middlewares/tokenMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/:branch/:id', validateToken, controller.getRecord);
router.get('/:branch', validateToken, controller.getRecords);
router.post('/', validateToken, controller.getFilteredRecords);

export default router;
