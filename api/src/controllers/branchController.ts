import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import maria from '../config/mariaConnector';

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will get a single `Branch`
 *
 * **Route:** `[GET] /api/users/:id`
 *
 * **Access:** private
 * 
 ---------------------------------------------------------------------*/
const getBranch = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const response = await maria.query(
		'SELECT * FROM `Branches` WHERE `id` = ?',
		id
	);

	res.status(200).json(...response);
});

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will get all `Branches`
 *
 * **Route:** `[GET] /api/users/`
 *
 * **Access:** private
 * 
 ---------------------------------------------------------------------*/
const getBranches = asyncHandler(async (req: Request, res: Response) => {
	const response = await maria.query('SELECT * FROM `Branches`');

	res.status(200).json([...response]);
});

export default { getBranch, getBranches };
