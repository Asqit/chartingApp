import { sign, SignOptions } from 'jsonwebtoken';

const SECRET = process.env.ACCESS_TOKEN_SECRET!;

function createToken(payload: object, options?: SignOptions) {
	return sign(payload, SECRET, {
		expiresIn: '5 hours',
		...options,
		// We need to override whatever algorithm was defined in options
		// Because we require HS512 method in token validation
		algorithm: 'HS512',
	});
}

export { createToken };
