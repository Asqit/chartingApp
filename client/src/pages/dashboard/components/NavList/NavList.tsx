import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { ulOptions } from '../.././../../data/sidebar';

const NavList = () => (
	<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
		{ulOptions.map((option) => {
			return (
				<Link
					to={option.to}
					key={ulOptions.indexOf(option)}
					className="p-2"
				>
					<Typography variant="small" as="li" color="black">
						{option.name}
					</Typography>
				</Link>
			);
		})}
	</ul>
);

export { NavList };
