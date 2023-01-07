export interface IUser {
	username: string;
	email: string;
	expiration: number;
}

export interface IUserState {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	user: IUser | null;
	message: string;
}

export interface IUserCredentials {
	username?: string;
	email: string;
	password: string;
}
