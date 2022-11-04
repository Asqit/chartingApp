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
			<div className="bg-white p-2 rounded-md">
				<Typography>Hodnota: {payload[0].value}</Typography>
				<Typography>Čas: {label}</Typography>
			</div>
		);
	}

	return null;
};
export { CustomTooltip };
