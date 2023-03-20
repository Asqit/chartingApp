import { SensorType } from '../../types';

/**
 * @param {SensorType} type
 * @returns {string} The color which should be used in client's charting component
 *
 * ### Description
 * So to ease client-side as much as possible I created this function, which basically evaluate color for each reacord type
 */
function getChartColor(type: SensorType | string) {
	switch (type) {
		case 'Teplota':
			return '#df2e36';
		case 'Vlhkost':
			return '#0264c5';
		case 'Vítr':
			return '#01a99c';
		case 'Elektřina':
			return '#f38d04';
		default:
			throw new Error('Unknown sensor type');
	}
}

export { getChartColor };
