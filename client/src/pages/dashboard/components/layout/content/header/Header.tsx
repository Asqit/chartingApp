import {
	Navbar,
	Avatar,
	IconButton,
	MobileNav,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NavList } from '../../../NavList/NavList';
import brand from '../../../../../../assets/brand/brand.svg';

const Header = () => {
	const [openNav, setOpenNav] = useState(false);

	return (
		<Navbar
			className="mx-auto py-2 px-4 md:hidden bg-white dark:bg-blue-gray-800 border-none"
			fullWidth={true}
		>
			<div className="container mx-auto flex items-center justify-between text-blue-gray-900 dark:text-white">
				<div className="mr-4 cursor-pointer py-1.5 font-normal">
					<Avatar src={brand} size="md" />
					<Link to="/">MaR</Link>
				</div>
				<div className="hidden lg:block">
					<NavList />
				</div>
				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={true}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							className="h-6 w-6"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</IconButton>
			</div>
			<MobileNav open={openNav}>
				<NavList />
			</MobileNav>
		</Navbar>
	);
};

export { Header };
