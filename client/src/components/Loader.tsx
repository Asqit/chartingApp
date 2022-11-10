import { VscLoading } from 'react-icons/vsc';

const Loader = () => (
	<div className="w-full h-screen flex items-center flex-col justify-center dark:bg-blue-gray-900 dark:text-gray-400">
		<VscLoading className="animate-spin text-8xl text-emerald-600" />
	</div>
);

export { Loader };
