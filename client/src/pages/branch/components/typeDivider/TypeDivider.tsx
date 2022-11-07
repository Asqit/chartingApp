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
		<div className="border rounded-2xl p-2 shadow-sm my-2">
			<Typography variant="h4">{type}</Typography>
			{payload.map((sensor, id) => {
				return <Sensor {...sensor} key={id} />;
			})}
		</div>
	);
}

export { TypeDivider };
