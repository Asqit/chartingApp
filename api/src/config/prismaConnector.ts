import { PrismaClient } from '@prisma/client';
import logging from './log';

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
		process.exit(1);
	});

export default prisma;
