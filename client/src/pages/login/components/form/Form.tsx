import { Button, Input, Checkbox } from '@material-tailwind/react';
import { FC, useState, FormEvent } from 'react';

export interface IForm {
	onSubmit: (email: string, password: string) => void;
}

const Form: FC<IForm> = ({ onSubmit }) => {
	const [revealed, setRevealed] = useState(false);
	const [inputs, setInputs] = useState({
		email: '',
		emailError: false,
		password: '',
		passwordError: false,
	});

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault();

		const target = e.currentTarget;
		const name = target.name;
		const value = target.value;

		setInputs({
			...inputs,
			emailError: false,
			passwordError: false,
			[name]: value,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { password, email } = inputs;

		let emailTest = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		if (!emailTest.test(email)) {
			setInputs({
				...inputs,
				emailError: true,
			});
			return;
		}

		let passwordTest = new RegExp(
			/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,}$/
		);

		if (!passwordTest.test(password)) {
			setInputs({
				...inputs,
				passwordError: true,
			});
			return;
		}

		onSubmit(password, email);
	};

	const handlePasswordReveal = () => setRevealed(!revealed);

	return (
		<form onSubmit={handleSubmit} className="w-72 flex flex-col gap-4">
			<Input
				variant="standard"
				color="teal"
				type="email"
				label="Zadejte email"
				name="email"
				error={inputs.emailError}
				onChange={handleChange}
			/>

			<Input
				variant="standard"
				color="teal"
				type={`${revealed ? 'text' : 'password'}`}
				label="Zadejte heslo"
				name="password"
				error={inputs.passwordError}
				onChange={handleChange}
			/>

			<div className="-ml-2.5">
				<Checkbox
					color="teal"
					label="Ukaž heslo"
					onClick={handlePasswordReveal}
				/>
			</div>

			<Button color="teal" type="submit">
				Přihlaš mě!
			</Button>
		</form>
	);
};

export { Form };
