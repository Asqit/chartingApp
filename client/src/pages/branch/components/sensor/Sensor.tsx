import { IViewSensor } from '../../models/apiResponse';
import { Typography } from '@material-tailwind/react';
import { Chart } from '../chart/Chart';

function Sensor(parameters: IViewSensor) {
	return (
		<section className="p-2 m-2 rounded-2xl bg-gray-100 border border-gray-200 shadow-sm dark:shadow-none dark:border-none dark:bg-blue-gray-900 dark:text-gray-400">
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
					<li>Minimum {parameters.minimum}</li>
					<li>Průměr {parameters.average}</li>
					<li>Maximum {parameters.maximum}</li>
				</ul>
			</div>
		</section>
	);
}

export { Sensor };
