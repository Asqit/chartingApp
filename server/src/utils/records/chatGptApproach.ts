import { Records } from '@prisma/client';

export type RecordsByType = {
	type: string;
	values: Records[];
};

export type ViewRecord = {
	value: number;
	time: string;
};

export type ViewSensor = {
	location: string;
	values: ViewRecord[];
	average?: number;
	minimum?: number;
	maximum?: number;
	chartColor?: string;
};

export type ViewRecords = {
	type: string;
	sensors: ViewSensor[];
};

function groupBy<T, K>(arr: T[], key: (item: T) => K) {
	return arr.reduce((acc, item) => {
		const group = key(item);
		// @ts-ignore
		acc[group] = acc[group] || [];
		// @ts-ignore
		acc[group].push(item);
		return acc;
	}, {} as { [key: string]: T[] });
}

export function differentiateRecords(records: Records[]) {
	const recordsByType = groupBy(records, (record) => record.type);
	const finalResult = Object.entries(recordsByType).map(([type, values]) => {
		const locationMap = groupBy(values, (record) => record.label);
		const sensors = Object.entries(locationMap).map(
			([location, locationValues]) => ({
				location,
				values: locationValues.map((locationValue) => ({
					value: locationValue.value,
					time: locationValue.time.toString(),
				})),
			})
		);
		return { type, sensors };
	});
	return finalResult;
}
