function getProperType(type: string): string {
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
