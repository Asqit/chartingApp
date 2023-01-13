import { Action, State, INITIAL } from '../models/registerReducerModel';

function registerReducer(state: State, action: Action) {
	switch (action.type) {
		case 'REGISTER_START':
			return {
				...INITIAL,
				loading: true,
			};
		case 'REGISTER_FAIL':
			return {
				...INITIAL,
				error: action.error,
			};
		case 'REGISTER_SUCCESS':
			return {
				...INITIAL,
				payload: action.payload,
			};
		default:
			return INITIAL;
	}
}

export { registerReducer };
