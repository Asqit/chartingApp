import { useLocation } from 'react-router-dom';
import { useReducer, useCallback, useEffect } from 'react';
import { fetchRecordsReducer } from './reducers/fetchRecordsReducer';
import { INITIAL_STATE } from './models/fetchRecordsModel';
import { Loader } from '../../components/Loader';
import { ErrorModal } from '../../components/ErrorModal';
import axios from 'axios';
import { Typography, Select, Option } from '@material-tailwind/react';
import getTimes from './utils/getTimes';
import { TypeDivider } from './components/typeDivider/TypeDivider';

function Branch() {
	const params = useLocation();
	const { id, name, location, phone } = params.state;
	const [{ loading, error, payload }, dispatch] = useReducer(
		fetchRecordsReducer,
		INITIAL_STATE
	);

	const handleFetch = useCallback(
		(from: number, to: number) => {
			dispatch({ type: 'FETCH_START' });
			axios
				.post('/api/records/filter', { branch: id, from, to })
				.then((resp) => {
					dispatch({ type: 'FETCH_SUCCESS', payload: resp.data });
				})
				.catch((err) => {
					dispatch({ type: 'FETCH_FAIL', error: err });
				});
		},
		[id]
	);

	useEffect(() => {
		let today = getTimes.getToday();

		handleFetch(today.from, today.to);
	}, [handleFetch]);

	const handleSelect = (selectValue: any) => {
		let condition = String(selectValue);
		let parameters = { from: 0, to: 0 };
		switch (condition) {
			case 'today':
				parameters = getTimes.getToday();
				break;
			case 'yesterday':
				parameters = getTimes.getYesterday();
				break;
			case 'week':
				parameters = getTimes.getWeek();
				break;
			case 'month':
				parameters = getTimes.getMonth();
				break;
			default:
				return dispatch({ type: 'FETCH_FAIL', error: 'špatný filtr' });
		}

		handleFetch(parameters.from, parameters.to);
	};

	//====================================[BODY]===================================//
	if (loading) {
		return <Loader />;
	}

	return (
		<section className="w-full h-full">
			<div className="flex justify-between">
				<article>
					<Typography variant="h2">{name}</Typography>
					<Typography variant="small">Adresa: {location}</Typography>
					<Typography variant="small">Telefon: {phone}</Typography>
				</article>
				<div>
					<Select
						label="Výběr dle datumu"
						color="teal"
						onChange={handleSelect}
					>
						<Option value="today">Dnes</Option>
						<Option value="yesterday">Včera</Option>
						<Option value="week">Tento týden</Option>
						<Option value="month">Tento měsíc</Option>
					</Select>
				</div>
			</div>
			<div>
				{payload
					? payload.map((record, index) => {
							return (
								<TypeDivider
									key={index}
									type={record.type}
									payload={record.sensors}
								/>
							);
					  })
					: null}
				{!payload ? (
					<div className="p-8">
						<Typography variant="h4">Chyba</Typography>
						<Typography variant="paragraph">
							Nebyly nalezeny žádné pobočky
						</Typography>
					</div>
				) : null}
			</div>
			{error ? <ErrorModal open={true} error={String(error)} /> : null}
		</section>
	);
}

export { Branch };
