import { SensorType } from '../types';

/**
 * @param {string} type
 * @returns {SensorType}
 *
 * ### Description
 * As I mentioned in description of `SensorType`.
 * there was a problem with IoT and database writing, so this stupid redundant function
 * is here to fix problem with type
 */
function getProperType(type: string): SensorType {
	switch (type) {
		case '1':
			return 'Teplota';
		case '2':
			return 'Vlhkost';
		case '3':
			return 'Vítr';
		default:
			return 'Elektřina';
	}
}

export { getProperType };
