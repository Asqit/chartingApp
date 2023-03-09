import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
export default function errorHandler(err:AppError, req:Request, res:Response, next:NextFunction) {
	const { message, statusCode, stack } = err;
	const response: any = {
		message,
		statusCode
	};

	if (process.env.NODE_ENV === "development") {
		response.stack = stack;
	}

	res.status(statusCode).json(response);
}
