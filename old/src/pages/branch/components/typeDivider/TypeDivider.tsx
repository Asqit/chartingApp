import { Typography } from '@material-tailwind/react';
import { IViewSensor } from '../../models/apiResponse';
import { Sensor } from '../sensor/Sensor';

function TypeDivider({
	type,
	payload,
}: {
	type: string;
	payload: IViewSensor[];
}) {
	return (
		<div className="rounded-2xl p-2 shadow-sm my-2 bg-white dark:bg-blue-gray-800">
			<Typography variant="h3" className="p-2">
				{type}
			</Typography>
			<div>
				{payload.map((sensor, id) => {
					return <Sensor {...sensor} key={id} />;
				})}
			</div>
		</div>
	);
}

export { TypeDivider };
