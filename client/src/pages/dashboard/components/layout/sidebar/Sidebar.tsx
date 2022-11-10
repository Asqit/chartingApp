import { Avatar, Typography } from '@material-tailwind/react';
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FC } from 'react';

import brand from '../../../../../assets/brand/brand.svg';
import { IUser } from '../../../../../context/userContext/userContext';
import { ulOptions } from '../../../../../data/sidebar';

export interface ISidebar {
	user: IUser | undefined;
	logoutHandler: () => void;
}

const Sidebar: FC<ISidebar> = ({ user, logoutHandler }) => {
	return (
		<aside className="hidden md:block md:w-1/3 md:max-w-xs bg-white dark:bg-blue-gray-800 dark:text-gray-400 xl:rounded-2xl">
			<header className="w-full px-4 py-4 text-center flex items-center justify-center">
				<Avatar src={brand} size="md" />
				<Typography
					variant="h4"
					className="mr-4 cursor-pointer py-1.5 font-bold"
				>
					<Link to="/dashboard">MaR</Link>
				</Typography>
			</header>
			<article className="w-full px-4 py-5 flex flex-col items-center">
				<div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-teal-300 text-white">
					<BsPerson className="text-3xl" />
				</div>
				<h1 className="font-semibold capitalize mb-2">
					{user?.username ? user.username : 'Pan neznámý'}
				</h1>
				<button
					className="text-teal-500 hover:underline active:text-teal-600"
					onClick={logoutHandler}
				>
					odhlásit
				</button>
			</article>
			<ul>
				{ulOptions.map((option) => {
					return (
						<Link
							to={option.to}
							key={ulOptions.indexOf(option)}
							className="w-1/2 mx-auto my-4 flex items-center gap-4 font-medium transition-all hover:gap-5 hover:text-teal-500"
						>
							<option.icon />
							<span>{option.name}</span>
						</Link>
					);
				})}
			</ul>
		</aside>
	);
};

export { Sidebar };
