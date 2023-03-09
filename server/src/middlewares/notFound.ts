import { Request, Response, NextFunction } from "express";

export default function notFound(req: Request, res: Response, next: NextFunction) {
	res.sendStatus(404);
	next();
}
