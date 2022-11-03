import { IModelSensorMap, IViewRecords } from '../types';
import { getProperType } from './getProperType';
import { calculateCornerValues } from './calculateCorverValues';
import { getChartColor } from './getChartColor';
import { getSensorName } from './getSensorName';

function prepareForChart(
	payload: IViewRecords[],
	sensorMap: IModelSensorMap[]
) {
	payload.forEach((record) => {
		record.type = getProperType(record.type);

		const SENSORS_LENGTH = record.sensors.length;

		for (let i = 0; i < SENSORS_LENGTH; i++) {
			let currentSensor = record.sensors[i];

			let cornerValues = calculateCornerValues(currentSensor.values);

			currentSensor.average = cornerValues.avg;
			currentSensor.minimum = cornerValues.min;
			currentSensor.maximum = cornerValues.max;

			currentSensor.chartColor = getChartColor(
				getProperType(record.type)
			);

			let sensorName = getSensorName(sensorMap, currentSensor.location);

			if (sensorName) {
				currentSensor.location = sensorName;
			}
		}
	});

	return payload;
}

export { prepareForChart };
