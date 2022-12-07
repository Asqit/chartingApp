import axios from 'axios';
import { useCallback, useEffect, useReducer } from 'react';
import { INITIAL } from '../pages/branches/models/fetchBranchesModel';
import { fetchBranchesReducer } from '../pages/branches/reducers/fetchBranchesReducer';

/**
 * **Description:** This hook serves a simple purpose and that is to fetch branches from REST API.
 *
 * **Returns:** `{loading: boolean, error: boolean | string, payload: IApiResponse[] | undefined, handleFetch: () => void}`
 */
function useFetchBranches() {
	const [{ loading, error, payload }, dispatch] = useReducer(
		fetchBranchesReducer,
		INITIAL
	);

	const handleFetch = useCallback(() => {
		dispatch({ type: 'FETCH_START' });

		axios
			.get('/api/branches')
			.then((resp) => {
				dispatch({ type: 'FETCH_SUCCESS', payload: resp.data });
			})
			.catch((err) => {
				if (err.response) {
					return dispatch({
						type: 'FETCH_FAIL',
						error: err.response?.message,
					});
				}

				dispatch({ type: 'FETCH_FAIL', error: err.message });
			});
	}, []);

	useEffect(() => handleFetch(), [handleFetch]);

	return { loading, error, payload, handleFetch };
}

export { useFetchBranches };
