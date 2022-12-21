import { Request, Response } from 'express';
import { createToken } from '../utils/createToken';
import { decode } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import prisma from '../config/prismaConnector';

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will create a new `User`
 *
 * **Route:** `[POST] /api/users/`
 *
 * **Access:** public
 * 
 ---------------------------------------------------------------------*/
const register = asyncHandler(async (req: Request, res: Response) => {
	const { email, username, password } = req.body;

	// Checking request parameters
	if (!email || !username || !password) {
		res.status(400);
		throw new Error('Missing credentials');
	}

	// Searching for conflict
	if (email && (await prisma.users.findFirst({ where: email }))) {
		res.status(409);
		throw new Error('Email already in use');
	}

	// Creating new user
	const SALT = await bcrypt.genSalt(10);
	const HASHED_PASSWORD = await bcrypt.hash(password, SALT);

	const newUser = await prisma.users.create({
		data: {
			username,
			email,
			password: HASHED_PASSWORD,
		},
	});

	if (!newUser) {
		res.status(400);
		throw new Error('Invalid user data');
	}

	// Sending response
	const ETA = 5 * 3600; // 5 hours in seconds
	const TOKEN = createToken({ id: newUser.id }, { expiresIn: ETA });
	const EXPIRATION = Object(decode(TOKEN)).exp;

	res.cookie('auth', TOKEN, {
		httpOnly: true,
		maxAge: ETA * 1000 + 3600000,
	});

	res.status(201).json({
		username,
		expiration: EXPIRATION,
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
const login = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

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
	const ETA = 5 * 3600; // 5 hours in seconds
	const TOKEN = createToken({ id: user.id }, { expiresIn: ETA });
	const EXPIRATION = Object(decode(TOKEN)).exp;

	res.cookie('auth', TOKEN, {
		httpOnly: true,
		maxAge: ETA * 1000 + 3600000,
	});

	res.status(200).json({
		username: user.username,
		expiration: EXPIRATION,
	});
});

/**--------------------------------------------------------------------
 * 
 * **Description:** A function, that will fetch details about user
 *
 * **Route:** `[GET] /api/users/getMe`
 *
 * **Access:** private
 * 
 --------------------------------------------------------------------*/
const getMe = asyncHandler(async (req: Request, res: Response) => {
	const { username, email } = res.locals.user;

	if (!username || !email) {
		res.status(404);
		throw new Error('Failed to fetch details');
	}

	res.status(200).json({
		username,
		email,
	});
});

/**--------------------------------------------------------------------
 * 
 * **Description:** this controller will check and responds whenever is user logged in
 *
 * **Route:** `[GET] /api/users/active`
 *
 * **Access:** public
 * 
 --------------------------------------------------------------------*/
const isActive = asyncHandler(async (req: Request, res: Response) => {
	res.status(200).end();
});

/**--------------------------------------------------------------------
 * 
 * **Description:** A function, that will clear current cookie-session
 *
 * **Route:** `[DELETE] /api/users/logout`
 *
 * **Access:** private
 * 
 --------------------------------------------------------------------*/
const logout = asyncHandler(async (req: Request, res: Response) => {
	res.cookie('auth', '', { maxAge: Date.now() });
	res.status(200).end();
});

export default { register, login, isActive, getMe, logout };
