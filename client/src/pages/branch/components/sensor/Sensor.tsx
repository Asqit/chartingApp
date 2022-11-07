import { IViewSensor } from '../../models/apiResponse';
import { Typography } from '@material-tailwind/react';
import { Chart } from '../chart/Chart';

function Sensor(parameters: IViewSensor) {
	return (
		<section className="border p-2 rounded-2xl my-2">
			<div className="flex flex-col">
				<Typography variant="lead" className="text-center">
					{parameters.location}
				</Typography>
				<figure className="w-full h-80">
					<Chart
						data={parameters.values}
						color={parameters.chartColor}
					/>
				</figure>
				<ul className="flex gap-2 justify-center">
					<li>Průměr {parameters.average}</li>
					<li>Minimum {parameters.minimum}</li>
					<li>Maximum {parameters.maximum}</li>
				</ul>
			</div>
		</section>
	);
}

export { Sensor };
