import controller from '../controllers/accountController';
import { Router } from 'express';

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;
