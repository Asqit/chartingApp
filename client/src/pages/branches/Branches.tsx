import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { fetchBranchesReducer } from './reducers/fetchBranchesReducer';
import { INITIAL } from './models/fetchBranchesModel';
import { Loader } from '../../components/ui/Loader';
import { BranchTable } from './components/branchTable/BranchTable';
import { Typography, Input, Button, Tooltip } from '@material-tailwind/react';
import { BranchCard } from './components/branchCard/BranchCard';
import sampleMap from '../../assets/images/sample.png';

function Branches() {
	const [{ loading, error, payload }, dispatch] = useReducer(
		fetchBranchesReducer,
		INITIAL
	);

	useEffect(() => {
		dispatch({ type: 'FETCH_START' });
		const baseUrl = process.env.REACT_APP_API;

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
				<div className="flex gap-2">
					<Tooltip content="Funkce zatím není implementována">
						<Input label="Vyhledat pobočku" color="teal" />
					</Tooltip>
					<Button
						color="teal"
						className="shadow-none hover:shadow-none"
					>
						hledej!
					</Button>
				</div>
			</article>
			<div className="flex-grow border rounded-2xl p-2 flex">
				<div className="p-2 w-1/2">
					{payload
						? payload.map((record) => {
								return <BranchCard {...record} />;
						  })
						: null}
					{payload
						? payload.map((record) => {
								return <BranchCard {...record} />;
						  })
						: null}

					{!payload ? (
						<div className="w-full h-full flex flex-col items-center justify-center">
							<Typography variant="h4">Chyba</Typography>
							<Typography variant="paragraph">
								Nebyly nalezeny žádné pobočky
							</Typography>
						</div>
					) : null}
				</div>
				<img
					src={sampleMap}
					alt="sda"
					className="w-1/2 object-cover rounded-2xl"
				/>
			</div>
		</section>
	);
}

export { Branches };
