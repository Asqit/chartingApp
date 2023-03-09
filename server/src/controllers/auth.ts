import { Request, Response } from 'express';
import { createAccessToken, createRefreshToken } from '../utils/createToken';
import { decode } from 'jsonwebtoken';
import { loginSchema, registerSchema } from "../validation/user";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import prisma from '../config/prismaConnector';
import {AppError} from '../utils/AppError';
import {UserDTO} from '../dto/user';

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will create a new `User`
 *
 * **Route:** `[POST] /api/users/`
 *
 * **Access:** public
 * 
 ---------------------------------------------------------------------*/
export const register = asyncHandler(async (req: Request, res: Response) => {
	const { email, username, password } = await registerSchema.validate(req.body);

	const match = await prisma.users.findFirst({
		where: {
			email,
			OR: { username }
		}
	});
	
	if (match) {
		throw new AppError(409, "Email is already in use");
	}

	// Creating new user
	const SALT = await bcrypt.genSalt(10);
	const HASHED_PASSWORD = await bcrypt.hash(password, SALT);
	const REFREH_ETA = 48 * 3600; // 2 days in seconds
	const ACCESS_ETA = 5 * 3600; // 5 hours in seconds 
	const ACCESS_TOKEN = createAccessToken(email, { expiresIn: ACCESS_ETA });
	const REFRESH_TOKEN = createRefreshToken(email, { expiresIn: REFREH_ETA });

	const newUser = await prisma.users.create({
		data: {
			username,
			email,
			password: HASHED_PASSWORD,
		},
	});

	const usetDto = new UserDTO().initialize(newUser);

	res.cookie('auth', REFRESH_TOKEN, {
		httpOnly: true,
		maxAge: REFREH_ETA * 1000 + 3600000,
	});

	res.status(201).json({
		user: usetDto,
		accessToken: ACCESS_TOKEN,
	});
});

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will search for a `User` and responds by that
 *
 * **Route:** `[POST] /api/users/login`
 *
 * **Access:** public
 * 
 ---------------------------------------------------------------------*/
export const login = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = await registerSchema.validate(req.body);

	// Getting user
	const user = await prisma.users.findFirst({
		where: { email },
	});

	// Check for conflicts and errors
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	if (!(await bcrypt.compare(password, user.password))) {
		res.status(404);
		throw new Error('User not found!');
	}

	// Sending response
	const REFREH_ETA = 48 * 3600; // 2 days in seconds
	const ACCESS_ETA = 5 * 3600; // 5 hours in seconds 
	const ACCESS_TOKEN = createAccessToken(email, { expiresIn: ACCESS_ETA });
	const REFRESH_TOKEN = createRefreshToken(email, { expiresIn: REFREH_ETA });

	res.cookie('auth', REFRESH_TOKEN, {
		httpOnly: true,
		maxAge: REFREH_ETA * 1000 + 3600000,
	});

	res.status(200).json({
		username: user.username,
		accessToken: ACCESS_TOKEN,
		accessExpiration: ACCESS_ETA,
	});
});


