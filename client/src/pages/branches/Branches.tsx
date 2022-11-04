import { Button, Typography } from '@material-tailwind/react';
import { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import { fetchBranchesReducer } from './reducers/fetchBranchesReducer';
import { INITIAL } from './models/fetchBranchesModel';
import { Loader } from '../../components/Loader';
import { ErrorModal } from '../../components/ErrorModal';
import { BranchCard } from './components/branchCard/BranchCard';

function Branches() {
	const [{ loading, error, payload }, dispatch] = useReducer(
		fetchBranchesReducer,
		INITIAL
	);

	const handleFetch = useCallback(() => {
		dispatch({ type: 'FETCH_START' });
		axios
			.get(`/api/branches/`)
			.then((resp) => {
				dispatch({ type: 'FETCH_SUCCESS', payload: resp.data });
			})
			.catch((err) => {
				if (err.response) {
					dispatch({
						type: 'FETCH_FAIL',
						error: err.response.data?.message,
					});
					return;
				}
				dispatch({ type: 'FETCH_FAIL', error: err.message });
			});
	}, []);

	useEffect(() => handleFetch, [handleFetch]);

	//====================================[BODY]===================================//
	if (loading) {
		return <Loader />;
	}

	return (
		<section className="w-full h-full flex flex-col">
			<article className="p-1 my-2 flex items-center justify-between">
				<div>
					<Typography variant="h2">Pobočky</Typography>
					<Typography variant="paragraph">
						Zde je výpis všech v současnosti podporovaných poboček
					</Typography>
				</div>
			</article>
			<div className="flex-grow flex gap-2 justify-center items-center flex-row flex-wrap border shadow-sm rounded-2xl p-2">
				{payload
					? payload.map((branch, id) => {
							return <BranchCard {...branch} key={id} />;
					  })
					: null}
				{!payload ? (
					<div className="text-center">
						<Typography variant="h2">žádné pobočky</Typography>
						<Typography>
							Bohužel jsme nenašly, žádné pobočky.
						</Typography>
						<Button color="teal" onClick={handleFetch}>
							Opakovat
						</Button>
					</div>
				) : null}
			</div>
			{error ? <ErrorModal open={true} error={String(error)} /> : null}
		</section>
	);
}

export { Branches };
