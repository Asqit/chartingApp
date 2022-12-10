import controller from '../controllers/userController';
import validateToken from '../middlewares/tokenMiddleware';
import { Router } from 'express';

const router = Router();

// private routes --------------------------
router.get('/active', validateToken, controller.isActive);
router.delete('/logout', validateToken, controller.logout);
router.get('/getMe', validateToken, controller.getMe);

// public routes ---------------------------
router.post('/', controller.register);
router.post('/login', controller.login);

export default router;
