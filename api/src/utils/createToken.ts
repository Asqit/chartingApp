import { sign, SignOptions } from 'jsonwebtoken';

const SECRET = process.env.ACCESS_TOKEN_SECRET!;

function createToken(payload: object, options?: SignOptions) {
	return sign(payload, SECRET, {
		expiresIn: '5 hours',
		algorithm: 'HS512',
		...options,
	});
}

export { createToken };
