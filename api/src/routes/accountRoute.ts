import controller from '../controllers/accountController';
import { expressjwt } from 'express-jwt';
import { Router, Request, Response } from 'express';

const router = Router();

// This route serves a simple purpose
// To see if user has valid token and thus still logged-in
router.get(
	'/active',
	expressjwt({
		secret: process.env.ACCESS_TOKEN_SECRET!,
		getToken: (req: Request) => req.cookies.accessToken,
		algorithms: ['HS512'],
	}),
	controller.active
);

router.delete(
	'/logout',
	expressjwt({
		secret: process.env.ACCESS_TOKEN_SECRET!,
		getToken: (req: Request) => req.cookies.accessToken,
		algorithms: ['HS512'],
	}),
	(req: Request, res: Response) => {
		// Destroy current cookie and thus the session
		res.cookie('accessToken', '', { expires: new Date() });
		res.status(200).json({ message: 'OK' });
	}
);

router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;
