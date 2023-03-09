import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prisma from "../config/prismaConnector";
import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError";
import {isChartingAppToken} from "../utils/createToken";

export const protectedRoute = asyncHandler(
	async (req:Request, res:Response, next:NextFunction) => {
		const HEADER = req.headers["authorization"];
		const ACCESS_TOKEN = HEADER && HEADER.split(" ")[1];

		if (!ACCESS_TOKEN) {
			throw new AppError(401, "Missing access token");
		}

		const SECRET = process.env.ACCESS_TOKEN_SECRET;

		if (!SECRET) {
			throw new AppError(500, "Server error");
		}
		
		const decoded = verify(ACCESS_TOKEN, SECRET, { algorithms: ["HS512"] }); 
	
		if (!isChartingAppToken(decoded)) {
			throw new AppError(401, "Invalid token");
		}

		const userTest = await prisma.users.findFirst({
			where: { email: decoded.email }
		});

		if (!userTest) {
			throw new AppError(401, "Invalid token payload");
		}

		res.locals.userId = userTest.id;

		next();
	}
);
