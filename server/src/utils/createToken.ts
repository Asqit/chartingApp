import { sign, SignOptions, JwtPayload } from 'jsonwebtoken';
import {AppError} from './AppError';

interface IChartingAppToken extends JwtPayload {
	email: string;
}

function isChartingAppToken(test: unknown): test is IChartingAppToken {
	return (test as IChartingAppToken).email !== undefined;
}

function createToken(email: string, SECRET: string, options?: SignOptions) {
	return sign(email, SECRET, {
		expiresIn: '5 hours',
		...options,
		// We need to override whatever algorithm was defined in options
		// Because we require HS512 method in token validation
		algorithm: 'HS512',
	});
}

function createAccessToken(email: string, options?: SignOptions) {
	const SECRET = process.env.ACCESS_TOKEN_SECRET;
	
	if (!SECRET) {
		throw new AppError(500, "Server runtime error");
	}

	return createToken(email, SECRET, {
		expiresIn: "5 hours",
		...options,
	});
}

function createRefreshToken(email: string, options?: SignOptions) {
	const SECRET = process.env.REFRESH_TOKEN_SECRET;
	
	if (!SECRET) {
		throw new AppError(500, "Server runtime error");
	}
	
	return createToken(email, SECRET,{	
		expiresIn: "2 days",
		...options,
	});
}

export {
	createAccessToken, 
	createRefreshToken,
	isChartingAppToken
}
