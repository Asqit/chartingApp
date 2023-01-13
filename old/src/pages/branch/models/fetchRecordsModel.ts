import { IViewRecords } from './apiResponse';

export type State = {
	loading: boolean;
	error: boolean | string;
	payload: IViewRecords[] | undefined;
};

export type Action =
	| {
			type: 'FETCH_START';
	  }
	| {
			type: 'FETCH_FAIL';
			error: boolean | string;
	  }
	| {
			type: 'FETCH_SUCCESS';
			payload: IViewRecords[] | undefined;
	  };

export const INITIAL_STATE: State = {
	loading: false,
	error: false,
	payload: undefined,
};
