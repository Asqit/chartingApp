import {
	IconButton,
	Typography,
	Avatar,
	Navbar,
	MobileNav,
} from '@material-tailwind/react';
import { Outlet, Link } from 'react-router-dom';
import { ulOptions } from '../.././../../data/sidebar';
import { UserContext } from '../../../../context/userContext/userContext';
import { useContext, useState } from 'react';
import brand from '../../../../assets/brand/brand.svg';
import { BsPerson } from 'react-icons/bs';
import blobs from '../../../../assets/images/pattern_blobs.png';

const navList = (
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

function Layout() {
	const [openNav, setOpenNav] = useState(false);
	const { user } = useContext(UserContext);

	return (
		<>
			<section className="w-full h-screen relative">
				<img
					src={blobs}
					className="hidden lg:block absolute object-cover -z-10 w-full h-32"
					alt="blobs pattern illustration"
				/>
				<div className="flex h-full p-2 gap-2">
					<aside className="hidden lg:block lg:min-w-[280px] lg:w-1/3 lg:max-w-sm bg-white rounded-2xl shadow-md">
						<div className="w-full px-4 py-4 text-center flex items-center justify-center">
							<Avatar src={brand} size="md" />
							<Typography
								variant="h4"
								className="mr-4 cursor-pointer py-1.5 font-bold"
							>
								<Link to="/">MaR</Link>
							</Typography>
						</div>
						<div className="w-full px-4 py-5 flex flex-col items-center">
							<div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-teal-300 text-white">
								<BsPerson className="text-3xl" />
							</div>
							<h1 className="font-semibold capitalize mb-2">
								{user?.username ? user.username : 'Pan neznámý'}
							</h1>
							<button
								className="text-emerald-500 hover:underline active:text-emerald-600"
								onClick={() => {}}
							>
								odhlásit
							</button>
						</div>
						<ul className="my-8">
							{ulOptions.map((option) => {
								return (
									<Link
										to={option.to}
										key={ulOptions.indexOf(option)}
										className="w-1/2 mx-auto my-4 flex items-center gap-4 font-medium transition-all hover:gap-5"
									>
										<option.icon />
										<span>{option.name}</span>
									</Link>
								);
							})}
						</ul>
					</aside>
					<article className="flex-grow flex flex-col gap-2 lg:gap-4">
						<div className="hidden lg:block w-full h-36 min-h-[8rem]" />
						<Navbar
							className="mx-auto py-2 px-4 rounded-2xl lg:hidden"
							fullWidth={true}
						>
							<div className="container mx-auto flex items-center justify-between text-blue-gray-900">
								<div className="mr-4 cursor-pointer py-1.5 font-normal">
									<Avatar src={brand} size="md" />
									<Link to="/">MaR</Link>
								</div>
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
						<main className="flex-grow p-2 bg-white shadow-md rounded-2xl lg:rounded-none lg:shadow-none overflow-x-hidden lg:overflow-y-auto">
							<Outlet />
						</main>
					</article>
				</div>
			</section>
		</>
	);
}

export { Layout };
