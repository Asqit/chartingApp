function getToday() {
	let today = new Date();

	today.setHours(8, 0, 0);

	let shiftStart = new Date(today).getTime();

	let shiftEnd = new Date(today.setHours(23, 0, 0)).getTime();

	return {
		from: shiftStart,
		to: shiftEnd,
	};
}

function getYesterday() {
	let yesterday = new Date();

	yesterday.setHours(8, 0, 0);
	yesterday.setDate(yesterday.getDate() - 1);

	let shiftStart = yesterday.getTime();

	let shiftEnd = new Date(yesterday.setHours(23, 0, 0)).getTime();

	return {
		from: shiftStart,
		to: shiftEnd,
	};
}

function getWeek() {
	let base = new Date();
	let week = [];

	for (let i = 0; i <= 7; i++) {
		let first = base.getDate() - base.getDay() + i;
		let day = new Date(base.setDate(first)).getTime();

		week.push(day);
	}

	return {
		from: week[0],
		to: week[6],
	};
}

function getMonth() {
	let time = new Date();

	let first = new Date(time.getFullYear(), time.getMonth(), 1).getTime();
	let last = new Date(time.getFullYear(), time.getMonth() + 1, 0).getTime();

	return {
		from: first,
		to: last,
	};
}

export default { getToday, getYesterday, getMonth, getWeek };
