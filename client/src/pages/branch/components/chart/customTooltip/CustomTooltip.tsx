import { Typography } from '@material-tailwind/react';
import { FC } from 'react';

export interface ICustomTooltip {
	active: boolean;
	payload?: any[];
	label?: string;
}

const CustomTooltip: FC<ICustomTooltip> = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white dark:bg-blue-gray-700 p-2 rounded-md outline-none">
				<Typography>Hodnota: {payload[0].value}</Typography>
				<Typography>
					Čas: {new Date(label!).toLocaleString()}
				</Typography>
			</div>
		);
	}

	return null;
};
export { CustomTooltip };
