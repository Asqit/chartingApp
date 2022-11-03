import controller from '../controllers/recordController';
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
	controller.getRecord
);

router.get(
	'/',
	expressjwt({
		secret: process.env.ACCESS_TOKEN_SECRET!,
		getToken: (req: Request) => req.cookies.accessToken,
		algorithms: ['HS512'],
	}),
	controller.getAllRecords
);

router.post(
	'/filter',
	expressjwt({
		secret: process.env.ACCESS_TOKEN_SECRET!,
		getToken: (req: Request) => req.cookies.accessToken,
		algorithms: ['HS512'],
	}),
	controller.getFilteredRecords
);

export default router;
