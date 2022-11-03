import {
	IModelRecords,
	IViewRecords,
	IViewSensor,
	RecordByType,
} from '../types';

function diffByType(payload: IModelRecords[]) {
	const PAYLOAD_LENGTH = payload.length;
	const TYPE_MAP = new Map<string, RecordByType>();

	for (let i = 0; i < PAYLOAD_LENGTH; i++) {
		let current = payload[i];

		// If map don't know current type, then we assing it with initial value
		if (!TYPE_MAP.has(current.type)) {
			TYPE_MAP.set(current.type, {
				type: current.type,
				values: [current],
			});
			continue; // skipping next step
		}

		const PREVIOUS = TYPE_MAP.get(current.type);

		if (!PREVIOUS) {
			continue;
		}

		PREVIOUS.values.push(current);

		TYPE_MAP.set(current.type, PREVIOUS);
	}

	let result: RecordByType[] = [];

	TYPE_MAP.forEach((type) => result.push(type));

	return result;
}

function diffByLocations(payload: RecordByType[]) {
	const RESULT: IViewRecords[] = [];

	payload.forEach((record) => {
		const VALUES_LENGTH = record.values.length;
		const LOC_MAP = new Map<string, IViewSensor>();

		for (let i = 0; i < VALUES_LENGTH; i++) {
			let current = record.values[i];

			if (!LOC_MAP.has(current.label)) {
				LOC_MAP.set(current.label, {
					location: current.label,
					values: [
						{
							time: current.time,
							value: current.value,
						},
					],
				});
				continue;
			}

			const PREVIOUS = LOC_MAP.get(current.label);

			if (!PREVIOUS) {
				continue;
			}

			PREVIOUS.values.push({
				time: current.time,
				value: current.value,
			});

			LOC_MAP.set(current.label, PREVIOUS);
		}

		let tmp: IViewSensor[] = [];

		// Converting Map into Array
		LOC_MAP.forEach((location) => tmp.push(location));

		// Array of IVMRecords (ready for direct use in View)
		RESULT.push({
			type: record.type,
			sensors: tmp,
		});
	});

	return RESULT;
}

function differentiateRecords(payload: IModelRecords[]) {
	let byType = diffByType(payload);
	let final = diffByLocations(byType);

	return final;
}

export { differentiateRecords };
