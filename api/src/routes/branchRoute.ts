import controller from '../controllers/branchController';
import { Router } from 'express';
import { expressjwt } from 'express-jwt';
import { Request } from 'express-jwt';

const router = Router();

router.get(
	'/:id',
	expressjwt({
		secret: process.env.ACCESS_TOKEN_SECRET!,
		getToken: (req: Request) => req.cookies.accessToken,
		algorithms: ['HS512'],
	}),
	controller.getBranch
);

router.get(
	'/',
	expressjwt({
		secret: process.env.ACCESS_TOKEN_SECRET!,
		getToken: (req: Request) => req.cookies.accessToken,
		algorithms: ['HS512'],
	}),
	controller.getBranches
);

export default router;
