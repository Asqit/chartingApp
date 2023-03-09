import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import prisma from '../config/prismaConnector';

/**--------------------------------------------------------------------
 * 
 * **Description:** This function will get a single `Branch`
 *
 * **Route:** `[GET] /api/users/:id`
 *
 * **Access:** private
 * 
 ---------------------------------------------------------------------*/
export const getBranch = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const response = await prisma.branches.findUnique({
		where: { id: +id },
	});

	if (!response) {
		res.status(404);
		throw new Error('Branch not found');
	}

	res.status(200).json(response);
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
export const getBranches = asyncHandler(async (req: Request, res: Response) => {
	const response = await prisma.branches.findMany();

	if (!response) {
		res.status(404);
		throw new Error('No branches were found');
	}

	res.status(200).json(response);
});
