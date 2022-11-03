export type Action =
	| { type: 'LOGIN_START' }
	| { type: 'LOGIN_FAIL'; error: boolean | string }
	| { type: 'LOGIN_SUCCESS'; payload: IApiResponse | undefined };

export type State = {
	loading: boolean;
	error: string | boolean;
	payload: IApiResponse | undefined;
};

export interface IApiResponse {
	message: string;
	accessToken: string;
}

export const INITIAL: State = {
	loading: false,
	error: false,
	payload: undefined,
};
