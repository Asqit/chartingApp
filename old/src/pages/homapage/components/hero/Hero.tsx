import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import heroImage from '../../../../assets/svg/hero.svg';

const Hero = () => {
	return (
		<section className="w-full h-screen flex flex-col-reverse lg:flex-row items-center justify-center p-16 dark:bg-blue-gray-800 dark:text-gray-400">
			<article className="max-w-lg">
				<Typography variant="h1">
					<span className="text-teal-500">M</span>ěření{' '}
					<span className="text-teal-500">a</span>{' '}
					<span className="text-teal-500">R</span>egulace
				</Typography>
				<Typography variant="paragraph">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Ullam, quae consequatur voluptatum sunt repellendus cum eum
					aperiam, iure ea et exercitationem beatae eligendi numquam
					qui enim quisquam sed perspiciatis temporibus?
				</Typography>
				<Button color="teal" size="md">
					<Link to="/register">Registrace</Link>
				</Button>
			</article>
			<figure className="max-w-xl">
				<img
					src={heroImage}
					alt="An illustration of 3 people standing in front of a chart"
				/>
			</figure>
		</section>
	);
};

export { Hero };
