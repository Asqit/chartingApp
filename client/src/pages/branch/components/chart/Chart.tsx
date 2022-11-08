import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { CustomTooltip } from './customTooltip/CustomTooltip';
import { IViewRecord } from '../../models/apiResponse';
import { FC, useEffect } from 'react';

export interface IChart {
	data: IViewRecord[];
	color?: string;
}

const Chart: FC<IChart> = ({ data, color }) => {
	useEffect(() => {
		data.forEach((record) => {
			// converting mysql time to local
			record.time = new Date(record.time).toLocaleString();
		});
	}, [data]);

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart data={data}>
				<YAxis />
				<XAxis dataKey="time" />
				<Tooltip
					content={
						<CustomTooltip active={true} payload={[]} label={''} />
					}
				/>
				<Area
					type="monotone"
					dataKey="value"
					stroke={color}
					fill={color}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export { Chart };
