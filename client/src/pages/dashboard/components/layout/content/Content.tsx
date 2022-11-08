import { Outlet } from 'react-router-dom';
import { Header } from './header/Header';

const Content = () => {
	return (
		<article className="flex-grow flex flex-col gap-2 lg:gap-4">
			<div className="hidden lg:block w-full h-36 min-h-[8rem]" />
			<Header />
			<main className="flex-grow p-2 lg:shadow-none overflow-x-hidden dark:bg-blue-gray-900">
				<Outlet />
			</main>
		</article>
	);
};

export { Content };
