import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { verify } from 'jsonwebtoken';
import prisma from '../config/prismaConnector';

const validateToken = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies.auth;
		const salt = process.env.ACCESS_TOKEN_SECRET!;

		if (token) {
			try {
				const details = Object(
					verify(token, salt, { algorithms: ['HS512'] })
				);

				res.locals.user = await prisma.users.findUnique({
					where: { id: details.id },
				});

				next();
			} catch (error) {
				res.status(401);
				throw new Error('Not authorized');
			}
		} else {
			res.status(401);
			throw new Error('Not authorized. (missing token)');
		}
	}
);

export default validateToken;
