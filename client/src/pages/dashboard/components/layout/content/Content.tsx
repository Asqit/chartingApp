import { Outlet } from 'react-router-dom';
import { Header } from './header/Header';

const Content = () => {
	return (
		<article className="flex-grow flex flex-col gap-2 lg:gap-4 bg-gray-100 dark:bg-blue-gray-900">
			<Header />
			<main className="flex-grow p-2 lg:shadow-none overflow-x-hidden">
				<Outlet />
			</main>
		</article>
	);
};

export { Content };
