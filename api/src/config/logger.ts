const getTimeStamp = () => new Date().toISOString();

const _genericLog = (
	namespace: string,
	variant: string,
	message: string,
	object?: any
) => {
	if (!object) {
		return console.log(
			`[${getTimeStamp()}] [${variant}] [${namespace}] - ${message}`
		);
	}

	console.log(
		`[${getTimeStamp()}] [${variant}] [${namespace}] - ${message}`,
		object
	);
};

const info = (namespace: string, message: string, object?: any) => {
	return _genericLog(namespace, 'INFO', message, object);
};

const warn = (namespace: string, message: string, object?: any) => {
	return _genericLog(namespace, 'WARN', message, object);
};

const error = (namespace: string, message: string, object?: any) => {
	return _genericLog(namespace, 'ERROR', message, object);
};

const debug = (namespace: string, message: string, object?: any) => {
	return _genericLog(namespace, 'DEBUG', message, object);
};

export default { info, warn, error, debug };
