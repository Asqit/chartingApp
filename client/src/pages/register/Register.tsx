import {
	Button,
	Typography,
	Dialog,
	DialogBody,
	DialogHeader,
	DialogFooter,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useReducer, useState } from 'react';
import { Form } from './components/form/Form';
import { registerReducer } from './reducers/registerReducer';
import { INITIAL } from './models/registerReducerModel';
import axios from 'axios';
import { Loader } from '../../components/Loader';
import { UserContext } from '../../context/userContext/userContext';

function Register() {
	const { setUser } = useContext(UserContext);
	const [modalOpen, setModalOpen] = useState(false);
	const redirect = useNavigate();
	const modalHandler = () => setModalOpen(!modalOpen);
	const [{ loading, error, payload }, dispatch] = useReducer(
		registerReducer,
		INITIAL
	);

	const handleRegister = (
		username: string,
		email: string,
		password: string
	) => {
		dispatch({ type: 'REGISTER_START' });
		const baseUrl = process.env.REACT_APP_API;
		axios
			.post(`${baseUrl}/account/register`, { username, email, password })
			.then((resp) => {
				setUser(resp.data);
				dispatch({ type: 'REGISTER_SUCCESS', payload: resp.data });

				return redirect('/dashboard');
			})
			.catch((err) => {
				modalHandler();
				if (err.response) {
					dispatch({
						type: 'REGISTER_FAIL',
						error: err.response.data?.message,
					});
					return;
				}
				dispatch({ type: 'REGISTER_FAIL', error: err.message });
			});
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<section className="w-full flex h-screen dark:bg-blue-gray-800 dark:text-gray-400">
				<figure className="hidden h-full lg:block w-auto flex-grow bg-gradient-to-bl from-teal-500 to-yellow-400" />
				<main className="w-full flex flex-col items-center justify-center lg:min-w-[480px] lg:w-1/3 lg:max-w-lg">
					<article>
						<Typography variant="h3" className="my-2">
							Registrace
						</Typography>
						<Form onSubmit={handleRegister} />
						<Typography variant="small" className="my-2">
							Již jsi členem? tak se pojd přihlásit{' '}
							<Link
								to="/login"
								className="text-teal-500 transition-all hover:underline hover:text-teal-800"
							>
								sem
							</Link>
						</Typography>
					</article>
				</main>
			</section>
			{error ? (
				<Dialog open={modalOpen} handler={modalHandler}>
					<DialogHeader>Nastala chyba</DialogHeader>
					<DialogBody>{String(error)}</DialogBody>
					<DialogFooter>
						<Button onClick={modalHandler}>dobře</Button>
					</DialogFooter>
				</Dialog>
			) : null}
		</>
	);
}

export { Register };
