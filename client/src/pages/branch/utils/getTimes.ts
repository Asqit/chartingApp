function getToday() {
	let today = new Date();

	today.setHours(8, 0);

	let shiftStart = new Date(new Date(today).setHours(8, 0)).getTime();

	let shiftEnd = new Date(today.setHours(23, 59, 0)).getTime();

	return {
		from: shiftStart,
		to: shiftEnd,
	};
}

function getYesterday() {
	let shiftStart = new Date();

	shiftStart.setDate(shiftStart.getDate() - 1);
	shiftStart.setHours(8, 0);

	let shiftEnd = new Date();

	shiftEnd.setDate(shiftEnd.getDate() - 1);
	shiftEnd.setHours(23, 59, 0);

	let from = shiftStart.getTime();
	let to = shiftEnd.getTime();

	return { from, to };
}

function getWeek() {
	let base = new Date();
	let week = [];

	for (let i = 0; i <= 7; i++) {
		let first = base.getDate() - base.getDay() + i;
		let day = new Date(base.setDate(first));

		week.push(day);
	}

	let from = week[0].setHours(8, 0);
	let to = week[6].setHours(23, 59);

	return { from, to };
}

function getMonth() {
	let time = new Date();

	let first = new Date(time.getFullYear(), time.getMonth(), 1).setHours(8, 0);
	let last = new Date(time.getFullYear(), time.getMonth() + 1, 0).setHours(
		23,
		59
	);

	return {
		from: first,
		to: last,
	};
}

export const getTimes = { getToday, getYesterday, getMonth, getWeek };
