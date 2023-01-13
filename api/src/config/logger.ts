<<<<<<< Updated upstream
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
=======
/**
 * @returns {string} A ISO formated current date.
 */
export const getISOTimestamp = () => new Date().toISOString();

type LogType = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

interface iLog {
	type: LogType;
	namespace: string;
	message: string;
	object?: any;
}

const log: (cfg: iLog) => void = ({ type, namespace, message, object }) => {
	switch (type) {
		case 'DEBUG':
			console.log(
				'\x1b[36m', // Color
				`[${getISOTimestamp()}] [DEBUG] - ${message}`,
				'\x1b[0m', // Reset terminal to default
				object ? object : ''
			);
			break;
		case 'ERROR':
			console.log(
				'\x1b[36m',
				`[${getISOTimestamp()}]`,
				'\x1b[31m',
				`[ERROR] - ${message}`,
				'\x1b[0m',
				object ? object : ''
			);
			break;
		case 'WARN':
			console.log(
				'\x1b[36m',
				`[${getISOTimestamp()}]`,
				'\x1b[33m',
				`[WARN] - ${message}`,
				'\x1b[0m',
				object ? object : ''
			);
			break;
		default:
			console.log(
				'\x1b[36m',
				`[${getISOTimestamp()}]`,
				'\x1b[32m',
				`${message}`,
				'\x1b[0m',
				object ? object : ''
			);
			break;
	}
};

const info = (namespace: string, message: string, object?: any) =>
	log({ type: 'INFO', namespace, message, object });

const warn = (namespace: string, message: string, object?: any) =>
	log({ type: 'WARN', namespace, message, object });

const error = (namespace: string, message: string, object?: any) =>
	log({ type: 'ERROR', namespace, message, object });

const debug = (namespace: string, message: string, object?: any) =>
	log({ type: 'DEBUG', namespace, message, object });

const logger = { info, warn, error, debug };

export default logger;

/* 
StackOverflow: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"
FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"
FgGray = "\x1b[90m"
BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
BgGray = "\x1b[100m"
*/
>>>>>>> Stashed changes
