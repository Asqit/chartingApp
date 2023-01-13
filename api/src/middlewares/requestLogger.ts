import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

// prettier-ignore
export default function requestLogger(req:Request, res:Response, next:NextFunction) {
    logger.info(
		"requestLogger",
		`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
	);

	res.on('finish', () => {
		logger.info(
			"requestLogger",
			`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
		);
	});

	next();
}
