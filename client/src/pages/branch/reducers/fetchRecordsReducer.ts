import { Action, State, INITIAL_STATE } from '../models/fetchRecordsModel';

function fetchRecordsReducer(state: State, action: Action) {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...INITIAL_STATE,
				loading: true,
			};
		case 'FETCH_SUCCESS':
			return {
				...INITIAL_STATE,
				payload: action.payload,
			};
		case 'FETCH_FAIL':
			return {
				...INITIAL_STATE,
				error: action.error,
			};
	}
}

export { fetchRecordsReducer };
