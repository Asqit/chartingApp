import controller from '../controllers/userController';
import protectedRoute from '../middlewares/protectedRoute';
import { Router } from 'express';

const router = Router();

// private routes --------------------------
router.get('/active', protectedRoute, controller.isActive);
router.delete('/logout', protectedRoute, controller.logout);
router.get('/getMe', protectedRoute, controller.getMe);

// public routes ---------------------------
router.post('/', controller.register);
router.post('/login', controller.login);

export default router;
