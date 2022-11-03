import { Action, State, INITIAL } from '../models/loginReducerModel';

function loginReducer(state: State, action: Action) {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				...INITIAL,
				loading: true,
			};
		case 'LOGIN_FAIL':
			return {
				...INITIAL,
				error: action.error,
			};
		case 'LOGIN_SUCCESS':
			return {
				...INITIAL,
				payload: action.payload,
			};
		default:
			return INITIAL;
	}
}

export { loginReducer };
