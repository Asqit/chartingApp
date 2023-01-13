import { Request, Response, NextFunction } from 'express';
<<<<<<< Updated upstream

// prettier-ignore
function errorHandler(err:Error, req:Request, res:Response, next:NextFunction) {
	const STATUS_CODE = req.statusCode ? req.statusCode : 500;

	if(process.env.NODE_ENV === "development") {
		res.status(STATUS_CODE).json({
			message: "An error occurred in server-side",
			stack: err.stack
		});
		return;
	}

	res.status(STATUS_CODE).json({
		message: "An error occurred in server-side"
	})
}
=======
import logger from '../config/logger';

// prettier-ignore
export default function errorHandler(err: Error, req:Request, res:Response, next:NextFunction) {
	const STATUS_CODE = res.statusCode ? res.statusCode : 500;

	logger.error("errorHandler", `An error occurred`, err);

	if(process.env.NODE_ENV === "production") {
		res.status(STATUS_CODE).json({
			message: err.message
		});
		return;
	}
>>>>>>> Stashed changes

	res.status(STATUS_CODE).json({
		message: err.message,
		stack: err.stack
	})
}
