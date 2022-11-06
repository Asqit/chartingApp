import moment from 'moment';

moment.updateLocale('en', {
	week: {
		dow: 1, // Monday is the first day of the week.
	},
});

function getToday() {
	let from = moment().hours(8).minutes(0).unix() * 1000;
	let to = moment().hours(23).minutes(59).unix() * 1000;

	return { from, to };
}

function getYesterday() {
	let base = moment().subtract(1, 'day');

	let from = base.hours(8).minutes(0).unix() * 1000;
	let to = base.hours(23).minutes(59).unix() * 1000;

	return { from, to };
}

function getWeek() {
	const from = moment().startOf('week').hours(8).minutes(0).unix() * 1000;
	const to = moment().endOf('week').hours(23).minutes(59).unix() * 1000;

	return { from, to };
}

function getMonth() {
	const from = moment().startOf('month').hours(8).minutes(0).unix() * 1000;
	const to = moment().endOf('month').hours(23).minutes(59).unix() * 1000;

	return { from, to };
}

export const getTimes = { getToday, getYesterday, getMonth, getWeek };
