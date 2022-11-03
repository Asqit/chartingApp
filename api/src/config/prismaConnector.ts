import { PrismaClient } from '@prisma/client';
import logging from './logging';

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
	});

export default prisma;
