import { IModelSensorMap } from '../../types';

function getSensorName(array: IModelSensorMap[], label: string) {
	const ARRAY_LENGTH = array.length;
	const map = new Map<string, string>(); // basically: [{"1":"kitchen"}, {"2":"lobby"}...]

	// converting array to map
	for (let i = 0; i < ARRAY_LENGTH; i++) {
		let current = array[i];

		if (!map.has(current.label)) {
			map.set(current.label, current.value);
		}
	}

	if (!map.has(label)) {
		return '';
	}

	return map.get(label);
}

export { getSensorName };
