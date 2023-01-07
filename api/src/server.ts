import cluster from 'cluster';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { cpus } from 'os';

// Server utils
import logger from './config/logger';
import config from './config/config';
import errorHandler from './middlewares/errorMiddleware';

// API endpoints
import recordRoutes from './routes/recordRoutes';
import userRoutes from './routes/userRoutes';
import branchRoutes from './routes/branchRoutes';

function prepareWorkers() {
	const NUMBER_OF_CORES = cpus().length;
	logger.info(
		'Server',
		`Master process(${process.pid}) is starting ${NUMBER_OF_CORES} child processes`
	);

	for (let i = 0; i < NUMBER_OF_CORES; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		logger.error(
			'Server',
			`Thread ${worker.process.pid} died with code ${code} and signal ${signal}`
		);

		logger.info('Server', `Starting replacement thread`);
		cluster.fork();
	});
}

function prepareExpress() {
	const { hostname, port } = config.server;
	const app = express();

	// Log incoming request
	app.use((req, res, next) => {
		logger.info(
			'Server',
			`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
		);

		res.on('finish', () => {
			logger.info(
				'Server',
				`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
			);
		});

		if (req.method == 'OPTIONS') {
			res.header(
				'Access-Control-Allow-Methods',
				'GET PATCH DELETE POST PUT'
			);
			return res.status(200).end();
		}

		next();
	});

	// Applying parsing middleware
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(cookieParser());
	app.use(cors());

	// hide framework info (pathetic attack slowdown)
	app.disable('x-powered-by');

	// Serve api endpoints
	app.use('/api/users', userRoutes);
	app.use('/api/branches', branchRoutes);
	app.use('/api/records', recordRoutes);

	// Serve compiled client
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../../client/build')));
		app.get('*', (req, res) =>
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
	}

	app.use(errorHandler);

	app.listen(port, () => {
		logger.info(
			'Server',
			`Thread(${process.pid}) is now listening on ${hostname}:${port}`
		);
	});
}

function prepareServer(areWorkersRequired = false) {
	if (areWorkersRequired && cluster.isPrimary) {
		prepareWorkers();
	} else {
		prepareExpress();
	}
}

prepareServer(false);
