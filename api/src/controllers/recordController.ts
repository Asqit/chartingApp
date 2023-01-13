import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
<<<<<<< Updated upstream
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
=======
import prisma from '../config/prismaConnector';
import moment from 'moment';
>>>>>>> Stashed changes

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will fetch all records
 *
 * **Route:** `[GET] /api/users/:branch`
 *
 * **Access:** private
 * 
 ---------------------------------------------------------------------*/
const getBranchRecords = asyncHandler(async (req: Request, res: Response) => {
	const { branch } = req.params;

	const response = await prisma.records.findMany({
		where: { branchId: +branch },
	});

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
	const { branch, from, to } = req.params;

	const dateFrom = moment(from).format('YYYY-MM-DD k-m-s');
	const dateTo = moment(to).format('YYYY-MM-DD k-m-s');

	const records = await prisma.records.findMany({
		where: {
			branchId: +branch,
			AND: {
				time: {
					gte: dateFrom,
					lte: dateTo,
				},
			},
		},
	});

	if (!records) {
		res.status(404);
		throw new Error('No records were found');
	}

	// TODO: Implement data structure conversion

	res.status(200).json(records);
});

export default { getBranchRecords, getFilteredRecords };
