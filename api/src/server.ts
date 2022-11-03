import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// server config files
import logging from './config/logging';
import config from './config/config';

// server routes
import recordRoute from './routes/recordRoute';
import accountRoute from './routes/accountRoute';
import branchRoute from './routes/branchRoute';

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
router.use(express.urlencoded({ extended: true })); // learning express about String, Array
router.use(express.json()); // learning express about JSON
router.use(cookieParser()); // learning express about cookies
router.use(cors());

// setting rules of the API -----------------------------------
router.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Controll-Allow-Headers',
		'Origin, X-Requester-With, Content-Type, Accept, Authorization'
	);
	//  res.header('Access-Control-Allow-Credentials', true)
	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
		return res.status(200).json({});
	}

	next();
});

// serving routes -----------------------------------
router.use('/api/account', accountRoute);
router.use('/api/branches', branchRoute); // protected by JWT cookie
router.use('/api/records', recordRoute); // protected by JWT cookie
router.use('/api/', express.static('src/public/')); // serving either static index.html or transpilled version of client

// Unknown route handling -----------------------------------
router.use((req, res) => {
	const error = new Error('Not found');

	return res.status(404).json({
		message: error.message,
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
