import { VscLoading } from 'react-icons/vsc';

const Loader = () => (
	<div className="w-full h-screen flex items-center flex-col justify-center dark:bg-zinc-900 dark:text-white">
		<VscLoading className="animate-spin text-8xl text-emerald-600" />
	</div>
);

export { Loader };
