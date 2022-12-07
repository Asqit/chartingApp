// ================================================ //
// MaR - server					     	21.11.2022	//
// Ondřej Tuček		     	ondrejtucek9@gmail.com	//
// ================================================ //
import http from 'http';
import express, { Request, Response, NextFunction, application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

// server config files
import logging from './config/logging';
import config from './config/config';

// server routes
import recordRoute from './routes/recordRoute';
import accountRoute from './routes/accountRoute';
import branchRoute from './routes/branchRoute';
import publicRoute from './routes/publicRoutes';

// Where our logs are from
const NAMESPACE = 'Server';

// minimal router
const router = express();

// Logging the request -----------------------------------
router.use((req, res, next) => {
	logging.info(
		NAMESPACE,
		`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
	);

	res.on('finish', () => {
		logging.info(
			NAMESPACE,
			`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
		);
	});

	next();
});

// parsing the request -----------------------------------
router.use(express.urlencoded({ extended: true })); // String, Array
router.use(express.json()); // JSON
router.use(cookieParser()); // cookies
router.use(cors()); // cross-site policy

// setting rules of the API -----------------------------------
router.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Controll-Allow-Headers',
		'Origin, X-Requester-With, Content-Type, Accept, Authorization'
	);

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
		return res.status(200).end();
	}

	next();
});

// hiding api informations
router.disable('x-powered-by');

// serving endpoints -----------------------------------
router.use('/api/public', publicRoute);
router.use('/api/account', accountRoute);

// Protected by JWT cookie
router.use('/api/branches', branchRoute);
router.use('/api/records', recordRoute);

// serving client-side or sample page. Depending on NODE_ENV
if (process.env.NODE_ENV === 'production') {
	router.use(express.static(path.join(__dirname, '../../client/build')));
	router.get('*', (req, res) =>
		res.sendFile(
			path.resolve(
				__dirname,
				'../',
				'../',
				'client',
				'build',
				'index.html'
			)
		)
	);
} else {
	router.use('/', express.static(path.join(__dirname, '/public')));
}

// Unknown route handling -----------------------------------
router.use((req, res) => {
	return res.status(404).json({
		message: 'Not found',
	});
});

// starting the server -----------------------------------
const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () =>
	logging.info(
		NAMESPACE,
		`server running on ${config.server.hostname}:${config.server.port}`
	)
);
