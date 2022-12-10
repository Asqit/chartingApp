import controller from '../controllers/branchController';
import validateToken from '../middlewares/tokenMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/:id', validateToken, controller.getBranch);
router.get('/', validateToken, controller.getBranches);

export default router;
