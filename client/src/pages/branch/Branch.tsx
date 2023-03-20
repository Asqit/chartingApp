import {
	Typography,
	Select,
	Option,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Button,
} from '@material-tailwind/react';
import { fetchRecordsReducer } from './reducers/fetchRecordsReducer';
import { TypeDivider } from './components/typeDivider/TypeDivider';
import {
	useReducer,
	useCallback,
	useEffect,
	useState,
	ChangeEvent,
} from 'react';
import { INITIAL_STATE } from './models/fetchRecordsModel';
import { ErrorModal } from '../../components/ErrorModal';
import { Loader } from '../../components/Loader';
import { useLocation } from 'react-router-dom';
import { getTimes } from './utils/getTimes';
import axios from 'axios';

function Branch() {
	const params = useLocation();
	const { id, name, location, phone } = params.state;
	const [modalOpen, setModalOpen] = useState(false);
	const [details, setDetails] = useState({
		dateFrom: '',
		timeFrom: '',
		dateTo: '',
		timeTo: '',
	});
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
				handleFetch(parameters.from, parameters.to);
				break;
			case 'yesterday':
				parameters = getTimes.getYesterday();
				handleFetch(parameters.from, parameters.to);
				break;
			case 'week':
				parameters = getTimes.getWeek();
				handleFetch(parameters.from, parameters.to);
				break;
			case 'month':
				parameters = getTimes.getMonth();
				handleFetch(parameters.from, parameters.to);
				break;
			case 'detailed':
				setModalOpen(!modalOpen);
				break;
			default:
				return dispatch({ type: 'FETCH_FAIL', error: 'špatný filtr' });
		}
	};

	const handleDetailChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const name = target.name;
		const value = target.value;

		setDetails({
			...details,
			[name]: value,
		});
	};

	const handleDetailsSubmit = () => {
		const { dateFrom, dateTo, timeFrom, timeTo } = details;

		if (!dateFrom || !dateTo) {
			dispatch({
				type: 'FETCH_FAIL',
				error: 'Špatně vyplněné filtry (datumy)',
			});
			return;
		}

		if (!timeFrom || !timeTo) {
			dispatch({
				type: 'FETCH_FAIL',
				error: 'Špatně vyplněné filtry (časy)',
			});
			return;
		}
		const from = new Date(dateFrom).setHours(
			Number(...timeFrom.split(':'))
		);
		const to = new Date(dateTo).setHours(Number(...timeTo.split(':')));

		handleFetch(from, to);
		setModalOpen(!modalOpen);
	};

	//====================================[BODY]===================================//
	if (loading) {
		return <Loader />;
	}

	return (
		<section className="w-full h-full dark:text-gray-400 p-2">
			<div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
				<article>
					<Typography variant="h2">{name}</Typography>
					<Typography variant="small">Adresa: {location}</Typography>
					<Typography variant="small">Telefon: {phone}</Typography>
				</article>
				<div className="flex items-center md:flex-wrap gap-2">
					<Select
						label="Výběr dat"
						color="teal"
						onChange={handleSelect}
					>
						<Option value="today">Dnes</Option>
						<Option value="yesterday">Včera</Option>
						<Option value="week">Tento týden</Option>
						<Option value="month">Tento měsíc</Option>
						<Option value="detailed">Detailní vyhledávání</Option>
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
				{payload?.length === 0 ? (
					<div className="p-8">
						<Typography variant="h4">Chyba</Typography>
						<Typography variant="paragraph">
							Nebyly nalezeny žádné záznamy
						</Typography>
					</div>
				) : null}
			</div>
			{modalOpen ? (
				<Dialog
					open={modalOpen}
					handler={() => setModalOpen(!modalOpen)}
					className="dark:bg-blue-gray-800"
				>
					<DialogHeader className="dark:text-gray-400">
						Výběr dat
					</DialogHeader>
					<DialogBody className="flex justify-evenly items-center">
						<div className="flex flex-col gap-4 dark:text-gray-400">
							<Input
								color="teal"
								type="date"
								label="Počáteční datum"
								name="dateFrom"
								onChange={handleDetailChange}
							/>
							<Input
								color="teal"
								type="time"
								name="timeFrom"
								label="Počáteční čas"
								onChange={handleDetailChange}
							/>
						</div>

						<div className="flex flex-col gap-4 dark:text-gray-400">
							<Input
								color="teal"
								type="date"
								name="dateTo"
								label="Koncové datum"
								onChange={handleDetailChange}
							/>
							<Input
								color="teal"
								type="time"
								name="timeTo"
								label="Koncový čas"
								onChange={handleDetailChange}
							/>
						</div>
					</DialogBody>
					<DialogFooter>
						<Button
							variant="text"
							color="red"
							onClick={() => setModalOpen(!modalOpen)}
						>
							konec
						</Button>
						<Button
							variant="text"
							color="teal"
							size="sm"
							onClick={handleDetailsSubmit}
						>
							Hledej!
						</Button>
					</DialogFooter>
				</Dialog>
			) : null}
			{error ? <ErrorModal open={true} error={String(error)} /> : null}
		</section>
	);
}

export { Branch };
