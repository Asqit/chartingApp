export type Action =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_FAIL'; error: boolean | string }
	| { type: 'FETCH_SUCCESS'; payload: IApiResponse[] | undefined };

export type State = {
	loading: boolean;
	error: string | boolean;
	payload: IApiResponse[] | undefined;
};

export interface IApiResponse {
	id: number;
	name: string;
	location: string;
	phone: string;
}

export const INITIAL: State = {
	loading: false,
	error: false,
	payload: undefined,
};
