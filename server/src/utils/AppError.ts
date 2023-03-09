interface IAppError {
	message: string;
	statusCode: number;
}

export class AppError extends Error implements IAppError {
	public message: string;
	public statusCode: number;

	constructor(statusCode: number, message: string) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}
