/**
 * This is helper type. Its used in `differentiateRecords` and its there just to represent temporary shape of `IModelRecords[]`
 */
export type RecordByType = {
	type: string;
	values: IModelRecords[];
};

export type CornerValues = {
	min: number;
	avg: number;
	max: number;
};

export type RGB = { red: number; blue: number; green: number };

/**
 * ### Description
 * This is little helper type. it is used in `prepareForChart` function
 *
 * ### Details
 * So initialy it was planed to use `varchar(255)` in database to
 * specify location & type of each sensor, but the IoT side of project failed to do so
 * and thus we re-used the varchar as a number or number in string.
 *
 * Its little chaotic I know. Anyway this is used for actually specifing
 * where each sensor is located and what type is it.
 * For more information check the `getSensorName` function
 */
export type SensorType = 'Teplota' | 'Vlhkost' | 'Elektřina' | 'Vítr';

/**
 * **IModelRecords**: How is each record stored in database/model
 */
export interface IModelRecords {
	id: number;
	branchId: number;
	value: number;
	time: string;
	type: string;
	label: string;
}

/**
 * **IModelUser**: How is user stored in database/model
 */
export interface IModelUser {
	id: number;
	username: string;
	email: string;
	password: string;
	verified: boolean;
	salt: string;
}

/**
 * **IModelSensorMap:** This interface is for table called `SensorMap`
 * its used mainly for representing shape of table and its rows.
 */
export interface IModelSensorMap {
	id: number;
	branchId: number;
	label: string;
	value: string;
}

export interface IModelBranch {
	id: number;
	name: string;
	location: string;
	phone: string;
}

/**
 * **IViewRecord:** what client actually used for charting
 */
export interface IViewRecord {
	value: number;
	time: string;
}

/**
 * **IViewSensor:** Again the model shape of `Records` table is different, than we actually need.
 * So we transform these privitive `Records` into three different pieces.
 */
export interface IViewSensor {
	location: string;
	values: IViewRecord[];
	average?: number;
	maximum?: number;
	minimum?: number;
	chartColor?: string | RGB;
}

/**
 * **IViewRecords:** Clientside needs records from table, but I doesn't need them in the `IModelRecords` form
 * so naturally I split these records into several pieces (`IViewSensor`, `IViewRecord`), that are sent.
 *
 * *Note:* this is used as wrapper for rest of `Records`
 */
export interface IViewRecords {
	type: string | SensorType;
	sensors: IViewSensor[];
}

/**
 * **IViewUser:** This is shape of `Users` table which will be sent to client-side
 */
export interface IViewUser {
	username: string;
	email: string;
	token?: string; // <-- is usually sent, but its optional cuz of my lazy ass (don't wanna fix typos)
}

export interface IViewBranch extends IModelBranch {}
