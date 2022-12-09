import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

// server config files
import log from './config/log';
import config from './config/config';

// server routes
import recordRoute from './routes/recordRoute';
import accountRoute from './routes/accountRoute';
import branchRoute from './routes/branchRoute';

// Where our logs are from
const NAMESPACE = 'Server';
const router = express();

// log the request -----------------------------------
router.use((req, res, next) => {
	log.info(
		NAMESPACE,
		`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
	);

	res.on('finish', () => {
		log.info(
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
router.use('/api/account', accountRoute);
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

// starting the server -----------------------------------
const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => {
	console.clear();
	log.info(
		NAMESPACE,
		`server running on ${config.server.hostname}:${config.server.port}`
	);
});
