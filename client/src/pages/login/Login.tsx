import { Form } from './components/form/Form';
import { useReducer, useState } from 'react';
import { loginReducer } from './reducers/loginReducer';
import { INITIAL } from './models/loginReducerModel';
import {
	Button,
	Typography,
	Dialog,
	DialogBody,
	DialogHeader,
	DialogFooter,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../../components/ui/Loader';

function Login() {
	const [modalOpen, setModalOpen] = useState(false);
	const [{ loading, error, payload }, dispatch] = useReducer(
		loginReducer,
		INITIAL
	);

	const redirect = useNavigate();

	const handleLogin = (password: string, email: string) => {
		dispatch({ type: 'LOGIN_START' });
		const baseUrl = process.env.REACT_APP_API;

		axios
			.post(`/api/account/login`, {
				email: email,
				password: password,
			})
			.then((resp) => {
				dispatch({ type: 'LOGIN_SUCCESS', payload: resp.data });
				return redirect('/dashboard');
			})
			.catch((err) => {
				modalHandler();
				if (err.response) {
					dispatch({
						type: 'LOGIN_FAIL',
						error: err.response.data?.message,
					});
					return;
				}
				dispatch({ type: 'LOGIN_FAIL', error: err.message });
			});
	};

	const modalHandler = () => setModalOpen(!modalOpen);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<section className="w-full flex h-screen">
				<figure className="hidden h-full lg:block w-auto flex-grow bg-gradient-to-tr from-teal-500 to-purple-400" />
				<main className="w-full flex flex-col items-center justify-center lg:min-w-[480px] lg:w-1/3 lg:max-w-lg">
					<article>
						<Typography variant="h3" className="my-2">
							Přihlášení
						</Typography>
						<Form onSubmit={handleLogin} />
						<Typography variant="small" className="my-2">
							Ještě nemáš účet? Tak si jeden založ{' '}
							<Link
								to="/register"
								className="text-teal-500 transition-all hover:underline hover:text-teal-800"
							>
								zde
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

export { Login };
