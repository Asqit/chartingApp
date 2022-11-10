import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './customTooltip/CustomTooltip';
import { IViewRecord } from '../../models/apiResponse';
import { FC, useEffect } from 'react';
import moment from 'moment';

export interface IChart {
	data: IViewRecord[];
	color?: string;
}

const Chart: FC<IChart> = ({ data, color }) => {
	useEffect(() => {
		data.forEach((record) => {
			// converting mysql time to local
			record.time = moment(record.time).local().toString();
		});
	}, [data]);

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart data={data}>
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
