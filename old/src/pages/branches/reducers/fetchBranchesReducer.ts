import { Action, State, INITIAL } from '../models/fetchBranchesModel';

function fetchBranchesReducer(state: State, action: Action) {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...INITIAL,
				loading: true,
			};
		case 'FETCH_FAIL':
			return {
				...INITIAL,
				error: action.error,
			};
		case 'FETCH_SUCCESS':
			return {
				...INITIAL,
				payload: action.payload,
			};
	}
}

export { fetchBranchesReducer };
