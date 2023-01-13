import { PrismaClient } from '@prisma/client';
import logger from './logger';
import { exit } from 'process';

const prisma = new PrismaClient();

async function connectDb() {
	try {
		const response = await prisma.$connect();
		logger.info(
			'config/prismaConnector',
			`prisma has connected to database`,
			response
		);
	} catch (error) {
		logger.error(
			'config/prismaConnector',
			`prisma cannot connect to database`,
			error
		);
		exit(1);
	}
}

export { connectDb };
export default prisma;
