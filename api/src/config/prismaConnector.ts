import { PrismaClient } from '@prisma/client';
import logging from './logger';
import { exit } from 'process';

const prisma = new PrismaClient();

prisma
	.$connect()
	.then((resp: unknown) => {
		logging.info(
			'config/prismaConnector',
			`prisma has connected to database`,
			resp
		);
	})
	.catch((err: unknown) => {
		logging.error(
			'config/prismaConnector',
			`prisma cannot connect to database`,
			err
		);
		exit(1);
	});

export default prisma;
