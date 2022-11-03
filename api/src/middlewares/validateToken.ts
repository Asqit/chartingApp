import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logging';

const NAMESPACE = 'utils/validateToken';

async function validateToken(req: Request, res: Response, next: NextFunction) {
	try {
		const header = req.headers['authorization'];
		const token = header && header.split(' ')[1];
		const salt = process.env.ACCESS_TOKEN_SECRET!;

		if (!token) {
			res.status(400).json({
				message: 'Missing authorization token',
			});
			return;
		}

		verify(token, salt, (err, details) => {
			if (err) {
				res.status(401).json({
					message: err.message,
				});
			}

			res.locals.PARSED_TOKEN = details;
			next();
		});
	} catch (error) {
		logger.error(NAMESPACE, `An error occured: ${String(error)}`, error);
		res.status(500).json({
			message: 'An error occured, please try again later.',
		});
	}
}

export { validateToken };
