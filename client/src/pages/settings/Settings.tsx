import { Typography, Switch } from '@material-tailwind/react';
import { useDarkMode } from '../../hooks/useDark';

function Settings() {
	const [isDark, setIsDark] = useDarkMode();

	return (
		<article className="w-full h-full dark:text-gray-400 p-4">
			<Typography variant="h2">Nastavení</Typography>
			<div className="flex flex-wrap justify-evenly items-center gap-2 bg-white dark:bg-blue-gray-800 rounded-md">
				<div className="w-full flex justify-between items-center p-2">
					<Typography className="lead dark:text-gray-300">
						Temný režim
					</Typography>
					<Switch
						color="teal"
						defaultChecked={isDark}
						onClick={(e: any) => setIsDark(e.target.checked)}
					/>
				</div>
			</div>
		</article>
	);
}

export { Settings };
