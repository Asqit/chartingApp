import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export default function requestLogger(req: Request, res: Response, next: NextFunction) {
	const { method, url, socket } = req;

	logger.info(`Method - [${method}], Url - [${url}], Ip - [${socket.remoteAddress}]`);

	res.on("finish", () => {
		logger.info(`Method - [${method}], Url - [${url}], Ip - [${socket.remoteAddress}], Status - [${res.statusCode}]`);
	});

	next();
}
