import { PrismaClient } from '@prisma/client';
import logging from './logger';
import { exit } from 'process';

const prisma = new PrismaClient();

prisma
	.$connect()
	.then((resp) => {
		logging.info(
			'config/prismaConnector',
			`prisma has conected to database`,
			resp
		);
	})
	.catch((err) => {
		logging.error(
			'config/prismaConnector',
			`prisma cannot connect to database`,
			err
		);
		exit(1);
	});

export default prisma;
