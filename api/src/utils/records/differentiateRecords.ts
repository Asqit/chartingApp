import { Records } from '@prisma/client';

type RecordsByType = {
	type: string;
	values: Records[];
};

type ViewRecord = {
	value: number;
	time: string;
};

type ViewSensor = {
	location: string;
	values: ViewRecord[];
	average?: number;
	minimum?: number;
	maximum?: number;
	chartColor?: string;
};

type ViewRecords = {
	type: string;
	sensors: ViewSensor[];
};

function differentiateByType(records: Records[]) {
	const RECORDS_LENGTH = records.length;
	const typeMap = new Map<string, RecordsByType>();

	for (let i = 0; i < RECORDS_LENGTH; i++) {
		const current = records[i];

		if (typeMap.has(current.type)) {
			const previous = typeMap.get(current.type);

			previous?.values.push(current);

			typeMap.set(current.type, previous!);
			continue;
		}

		typeMap.set(current.type, {
			type: current.type,
			values: [current],
		});
	}

	// Converting Map<string, RecordsByType> to array of RecordsByType[]
	const result: RecordsByType[] = [];

	typeMap.forEach((type) => result.push(type));

	return result;
}

function differentiateByLabel(records: RecordsByType[]) {
	const result: ViewRecords[] = [];
	records.forEach((record) => {
		const VALUES_LENGTH = record.values.length;
		const locationMap = new Map<string, ViewSensor>();

		for (let i = 0; i < VALUES_LENGTH; i++) {
			const current = record.values[i];

			if (locationMap.has(current.label)) {
				const previous = locationMap.get(current.label);

				if (!previous) continue;

				previous.values.push({
					value: current.value,
					time: current.time.toString(),
				});

				locationMap.set(current.label, previous);

				continue;
			}

			locationMap.set(current.label, {
				location: current.label,
				values: [
					{ value: current.value, time: current.time.toString() },
				],
			});
		}

		let locationArray: ViewSensor[] = [];

		locationMap.forEach((sensor) => locationArray.push(sensor));

		result.push({
			type: record.type,
			sensors: locationArray,
		});
	});
}

export function differentiateRecords(records: Records[]) {
	const recordsByType = differentiateByType(records);
	const finalResult = differentiateByLabel(recordsByType);

	return finalResult;
}
