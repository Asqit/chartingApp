function getChartColor(type: string) {
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
