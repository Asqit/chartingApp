import { expressjwt } from 'express-jwt';
import { Request } from 'express-jwt';

expressjwt({
	secret: process.env.ACCESS_TOKEN_SECRET!,
	getToken: (req: Request) => req.cookies.accessToken,
	algorithms: ['HS512'],
});

export { expressjwt };
