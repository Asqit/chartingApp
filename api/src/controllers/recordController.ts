import { Request, Response } from 'express';
import connector from '../config/connector';
import { differentiateRecords } from '../utils/differentiateRecords';
import { prepareForChart } from '../utils/prepareForChart';
import { getSensorMap } from '../utils/getSensorMap';
import moment from 'moment';
import logging from '../config/logging';

async function getRecord(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const response = await connector.query(
			'SELECT * FROM `Records` WHERE id = ?',
			[id]
		);

		delete response.meta;

		res.status(200).json([...response]);
	} catch (error) {
		logging.error('controllers/recordController', `Server error`, error);
		res.status(500).json({
			message: 'An error occured, please try again later.',
		});
	}
}

async function getAllRecords(req: Request, res: Response) {
	try {
		const response = await connector.query(
			'SELECT * FROM `Records` ORDER BY `id` ASC'
		);

		delete response.meta;

		let data = differentiateRecords(response);

		res.status(200).json([...data]);
	} catch (error) {
		logging.error('controllers/recordController', `Server error`, error);
		res.status(500).json({
			message: 'An error occured, please try again later.',
		});
	}
}

async function getFilteredRecords(req: Request, res: Response) {
	try {
		const { branch, from, to, precise } = req.body;

		let dateFrom = moment(from).format('YYYY-MM-DD h-m-s');
		let dateTo = moment(to).format('YYYY-MM-DD h-m-s');

		const response = await connector.query(
			'SELECT * FROM `Records` WHERE `branchId` = ? AND `time` >= ? AND `time` <= ? ORDER BY `time` ASC',
			[branch, dateFrom, dateTo]
		);

		// clearning mariaDB's meta object
		delete response.meta;

		let sensorMap = await getSensorMap(branch);

		let preFinals = differentiateRecords(response);

		let data = prepareForChart(preFinals, sensorMap);

		res.status(200).json([...data]);
	} catch (error) {
		logging.error('controllers/recordController', `Server error`, error);
		res.status(500).json({
			message: 'An error occured, please try again later.',
		});
	}
}

export default {
	getRecord,
	getAllRecords,
	getFilteredRecords,
};
