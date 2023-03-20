export interface IViewRecord {
	value: number;
	time: string;
}

export interface IViewSensor {
	location: string;
	values: IViewRecord[];
	average?: number;
	maximum?: number;
	minimum?: number;
	chartColor?: string;
}

export interface IViewRecords {
	type: string;
	sensors: IViewSensor[];
}
