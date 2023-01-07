import moment from 'moment';

const getTimeStamp = () => moment().format('DD-MM-YY HH:mm:SS');

type LogType = 'INFO' | 'WARN' | 'ERROR';

interface IGenericLogParams {
	object?: any;
	namespace: string;
	message: string;
	type: LogType;
}

// "\x1b[0m" = reset
// "\x1b[31m" = font red
// "\x1b[33m" = font yellow
// "\x1b[36m" = font cyan
// "\x1b[32m" = font green

function genericLog(params: IGenericLogParams) {
	const { object, message, namespace, type } = params;

	switch (type) {
		case 'ERROR':
			console.log(
				'\x1b[36m',
				`[${getTimeStamp()}]`,
				'\x1b[31m',
				`[${namespace}] [ERROR] - ${message}`,
				'\x1b[0m',
				object ? object : ''
			);
			break;
		case 'WARN':
			console.log(
				'\x1b[36m',
				`[${getTimeStamp()}]`,
				'\x1b[33m',
				`[${namespace}] [WARN] - ${message}`,
				'\x1b[0m',
				object ? object : ''
			);
			break;
		default:
			console.log(
				'\x1b[36m',
				`[${getTimeStamp()}]`,
				'\x1b[32m',
				`[${namespace}] [INFO] - ${message}`,
				'\x1b[0m',
				object ? object : ''
			);
			break;
	}
}

function info(namespace: string, message: string, object?: any) {
	genericLog({
		namespace,
		message,
		object,
		type: 'INFO',
	});
}

function warn(namespace: string, message: string, object?: any) {
	genericLog({
		namespace,
		message,
		object,
		type: 'WARN',
	});
}

function error(namespace: string, message: string, object?: any) {
	genericLog({
		namespace,
		message,
		object,
		type: 'ERROR',
	});
}

const logger = { info, error, warn };

export default logger;
