import { Request, Response } from 'express';
import connector from '../config/mariaConnector';
import logging from '../config/logging';

async function getBranch(req: Request, res: Response) {
	try {
		const { id } = req.params;

		logging.debug('getBranch', 'getting token from header', req.headers);

		const response = await connector.query(
			'SELECT * FROM `Branches` WHERE `id` = ?',
			id
		);

		delete response.meta;

		res.status(200).json([...response]);
	} catch (error) {
		logging.error('controllers/branchController', `Server error`, error);
		res.status(500).json({
			message: 'An error occured, please try again later.',
		});
	}
}

async function getBranches(req: Request, res: Response) {
	try {
		const response = await connector.query('SELECT * FROM `Branches`');

		delete response.meta;

		res.status(200).json([...response]);
	} catch (error) {
		logging.error('controllers/branchController', `Server error`, error);
		res.status(500).json({
			message: 'An error occured, please try again later.',
		});
	}
}

export default { getBranch, getBranches };
