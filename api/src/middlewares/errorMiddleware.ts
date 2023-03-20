const errorHandler = (err: any, req: any, res: any, next: any) => {
	const STATUS_CODE = res.statusCode ? res.statusCode : 500;

	res.status(STATUS_CODE);

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

export default errorHandler;
