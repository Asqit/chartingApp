export type Action =
	| { type: 'REGISTER_START' }
	| { type: 'REGISTER_FAIL'; error: boolean | string }
	| { type: 'REGISTER_SUCCESS'; payload: IApiResponse | undefined };

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
