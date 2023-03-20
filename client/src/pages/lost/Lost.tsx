import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import lost from '../../assets/svg/lost.svg';

function Lost() {
	const redirect = useNavigate();

	return (
		<section className="w-full h-screen flex flex-col md:flex-row-reverse items-center justify-center gap-2 p-2">
			<img
				src={lost}
				alt="Aliens representing 404 error"
				className="min-w-[120px] w-a max-w-[256px]"
			/>
			<article className="max-w-md text-center md:text-left">
				<Typography variant="h1" className="my-1">
					404
				</Typography>
				<Typography variant="h4" className="my-1">
					Oops...vaše stránka nebyla nalezena
				</Typography>
				<Typography variant="paragraph" className="my-1">
					Je nám líto, ale stránka, kterou hledáte, ne-existuje a nebo
					byla přesunuta, přejmenována nebo je dočasně nedostupná.
				</Typography>
				<Button color="teal" onClick={() => redirect(-1)}>
					Zpět
				</Button>
			</article>
		</section>
	);
}

export { Lost };
