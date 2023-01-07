import { Request, Response, NextFunction } from 'express';

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

export default errorHandler;
