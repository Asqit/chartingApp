import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';

// Server config
import logger from './config/logger';
import config from './config/config';
import errorHandler from './middlewares/errorMiddleware';
import requestLogger from './middlewares/requestLogger';
import notFound from './middlewares/notFound';

// Api endpoints
import branchRoutes from './routes/branchRoutes';
import userRoutes from './routes/userRoutes';
import recordRoutes from './routes/recordRoutes';
import { connectDb } from './config/prismaConnector';

function prepareClustering() {
	const NUMBER_OF_CORES = cpus().length;

	logger.info(
		'Server',
		`The main process (pid: ${process.pid}) is now preparing ${NUMBER_OF_CORES} threads`
	);

	for (let i = 0; i < NUMBER_OF_CORES; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		logger.warn(
			'Server',
			`Thread (pid:${worker.process.pid}) died with code ${code} and signal ${signal}`
		);
		logger.info('Server', `Preparing a replacement thread now`);

		cluster.fork();
	});
}

function prepareExpress() {
	const router = express();

	router.use(express.urlencoded({ extended: false }));
	router.use(express.json());
	router.use(cookieParser());
	router.use(helmet());
	router.use(cors());
	router.use(requestLogger);

	// serving api endpoints
	router.use('/api/users', userRoutes);
	router.use('/api/branches', branchRoutes);
	router.use('/api/records', recordRoutes);

	// serving production build of react client
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
	}

	// minimizing footnote and using middlewares
	router.use(notFound);
	router.disable('x-powered-by');
	router.use(errorHandler);

	// Using http instead of express
	// this way we can easily add support for https
	// we would simply import certificates and https package
	// and use it the same way as we do with http
	// The http server would become a fallback server
	const server = http.createServer(router);

	const { port, hostname } = config.server;

	server.listen(port, () => {
		logger.info(
			'Server',
			`Thread - [${process.pid}] is now listening on ${hostname}:${port}`
		);
	});

	connectDb();
}

function prepareServer(isCluster = false) {
	if (isCluster && cluster.isPrimary) {
		prepareClustering();
	} else {
		prepareExpress();
	}
}

if (process.env.NODE_ENV === 'production') {
	prepareServer(true);
} else {
	prepareServer();
}
