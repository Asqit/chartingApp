import { ViewRecord } from './differentiateRecords';

export type StatsValues = { min: number; avg: number; max: number };

function calculateCornerValues(payload: ViewRecord[]): StatsValues {
	const PAYLOAD_LENGTH = payload.length;
	let min, max, avg;

	max = payload[0].value;
	min = payload[0].value;
	avg = 0;

	for (let i = 1; i < PAYLOAD_LENGTH - 1; i++) {
		if (payload[i].value > max) {
			max = payload[i].value;
		}

		if (payload[i].value < min) {
			min = payload[i].value;
		}

		avg += payload[i].value;
	}

	avg /= PAYLOAD_LENGTH;

	// rouding number to two deciman points e.g. 3.14
	min = Math.round(min * 100) / 100;
	avg = Math.round(avg * 100) / 100;
	max = Math.round(max * 100) / 100;

	return {
		min,
		avg,
		max,
	};
}

export { calculateCornerValues };
