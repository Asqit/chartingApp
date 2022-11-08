import { Request, Response } from 'express';
import connector from '../config/prismaConnector';
import { createToken } from '../utils/createToken';
import bcrypt from 'bcrypt';
import { IViewUser } from '../types';
import logging from '../config/logging';
import { decode } from 'jsonwebtoken';

async function register(req: Request, res: Response) {
	try {
		const { email, username, password } = req.body;

		if (!email || !username || !password) {
			res.status(400).json({
				message: 'Missing credentials',
			});
			return;
		}

		// Searching for conflict
		let conflict = await connector.users.findFirst({
			where: {
				email: email,
			},
		});

		if (conflict) {
			res.status(409).json({
				message: 'Email is already taken',
			});
			return;
		}

		// Creating a new User
		let dbPassword = await bcrypt.hash(password, 10);

		let newUser = await connector.users.create({
			data: {
				email,
				username,
				password: dbPassword,
			},
		});

		let tokenPayload: IViewUser = {
			username: newUser.username,
			email: newUser.email!,
		};

		let token = createToken(tokenPayload);

		const TOKEN = Object(decode(token));

		res.cookie('accessToken', token, {
			httpOnly: true,
			maxAge: TOKEN.exp,
		});

		res.status(200).json({
			username,
			email,
			token,
		});
	} catch (error) {
		logging.error('controllers/accountController', `Server error`, error);
		res.status(500).json({
			message: 'An error occured, please try again later.',
		});
	}
}

async function login(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({
				message: 'missing credentials',
			});
			return;
		}

		// Search for user
		let query = await connector.users.findFirst({
			where: {
				email: email,
			},
		});

		if (!query) {
			res.status(401).json({
				message: 'Wrong email',
			});
			return;
		}

		// Check if passwords are matching
		let passwordMatch = await bcrypt.compare(password, query.password);

		if (!passwordMatch) {
			res.status(401).json({
				message: 'Wrong password',
			});
			return;
		}

		let tokenPayload: IViewUser = {
			username: query.username,
			email: query.email!,
		};

		let token = createToken(tokenPayload);

		res.cookie('accessToken', token, { httpOnly: true });

		res.status(200).json({
			username: query.username,
			email,
			token,
		});
	} catch (error) {
		logging.error('controllers/accountController', `Server error`, error);
		res.status(500).json({
			message: 'An error occured, please try again later.',
		});
	}
}

async function active(req: Request, res: Response) {
	try {
		const TOKEN = req.cookies.accessToken;

		const user = Object(decode(TOKEN));

		res.status(200).json({
			username: user.username,
			email: user.email,
			token: TOKEN,
		});
	} catch (err) {}
}

export default { login, register, active };
