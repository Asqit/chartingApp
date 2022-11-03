import {
	Navbar,
	MobileNav,
	Typography,
	Avatar,
	IconButton,
} from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import brand from '../assets/brand/brand.svg';

const navList = (
	<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
		<Typography
			as="li"
			variant="small"
			color="blue-gray"
			className="p-1 font-normal"
		>
			<Link to="/dashboard">Nástěnka</Link>
		</Typography>
		<Typography
			as="li"
			variant="small"
			color="blue-gray"
			className="p-1 font-normal"
		>
			<Link to="/register">Registrace</Link>
		</Typography>
		<Typography
			as="li"
			variant="small"
			color="blue-gray"
			className="p-1 font-normal"
		>
			<Link to="/login">Přihlášení</Link>
		</Typography>
	</ul>
);

function Nav() {
	const [openNav, setOpenNav] = useState(false);

	useEffect(() => {
		window.addEventListener(
			'resize',
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	return (
		<Navbar className="mx-auto py-2 px-4 lg:px-8 lg:py-4" fullWidth={true}>
			<div className="container mx-auto flex items-center justify-between text-blue-gray-900">
				<Typography
					as="a"
					href="#"
					variant="small"
					className="mr-4 cursor-pointer py-1.5 font-normal"
				>
					<Avatar src={brand} size="md" />
					<Link to="/">MaR</Link>
				</Typography>
				<div className="hidden lg:block">{navList}</div>
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
			<MobileNav open={openNav}>{navList}</MobileNav>
		</Navbar>
	);
}

export { Nav };
