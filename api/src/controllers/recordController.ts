import asyncHandler from 'express-async-handler';
import maria from '../config/mariaConnector';
import moment from 'moment';
import { Request, Response } from 'express';
import { getSensorMap } from '../utils/records/getSensorMap';
import { differentiateRecords } from '../utils/records/differentiateRecords';
import { prepareForChart } from '../utils/records/prepareForChart';

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will fetch single record
 *
 * **Route:** `[GET] /api/users/:branch/:id`
 *
 * **Access:** private
 * 
 ---------------------------------------------------------------------*/
const getRecord = asyncHandler(async (req: Request, res: Response) => {
	const { id, branch } = req.params;

	const response = await maria.query(
		'SELECT * FROM `Records` WHERE `id` = ? AND `branchId` = ?',
		[id, branch]
	);

	if (!response) {
		res.status(404);
		throw new Error('No records found');
	}

	res.status(200).json(...response);
});

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will fetch all records
 *
 * **Route:** `[GET] /api/users/:branch`
 *
 * **Access:** private
 * 
 ---------------------------------------------------------------------*/
const getRecords = asyncHandler(async (req: Request, res: Response) => {
	const { branch } = req.params;

	const response = await maria.query(
		'SELECT * FROM `Records` WHERE `branchId` = ?',
		[branch]
	);

	if (!response) {
		res.status(404);
		throw new Error('No records found');
	}

	res.status(200).json(response);
});

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will fetch filtered records
 *
 * **Route:** `[POST] /api/users/`
 *
 * **Access:** private
 * 
 ---------------------------------------------------------------------*/
const getFilteredRecords = asyncHandler(async (req: Request, res: Response) => {
	const { branch, from, to } = req.body;

	// Converting JS date to MySQL compatible format
	let dateFrom = moment(from).format('YYYY-MM-DD k-m-s');
	let dateTo = moment(to).format('YYYY-MM-DD k-m-s');

	const resp = await maria.query(
		'SELECT * FROM `Records` WHERE `branchId` = ? AND `time` >= ? AND `time` <= ? ORDER BY `time` ASC',
		[branch, dateFrom, dateTo]
	);

	if (!resp) {
		res.status(404);
		throw new Error('No records found');
	}

	let sensorMap = await getSensorMap(branch);
	let temporaryData = differentiateRecords(resp);
	let data = prepareForChart(temporaryData, sensorMap);

	res.status(200).json([...data]);
});

export default { getRecord, getRecords, getFilteredRecords };
