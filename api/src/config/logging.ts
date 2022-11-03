const getTimeStamp = () => {
	return new Date().toISOString();
};

/**
 * @param namespace - specified location from where this function was executed
 * @param message - little details or description of this log
 * @param object - could be used for debbuging or error handling
 * @returns {void}
 */
const info = (namespace: string, message: string, object?: any) => {
	console.log('\x1b[32m');
	if (object) {
		console.log(
			`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`,
			object
		);
		return;
	}
	console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
};

/**
 * @param namespace - specified location from where this function was executed
 * @param message - little details or description of this log
 * @param object - could be used for debbuging or error handling
 * @returns {void}
 */
const warn = (namespace: string, message: string, object?: any) => {
	console.log('\x1b[33m');
	if (object) {
		console.log(
			`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`,
			object
		);
		return;
	}
	console.log(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
};

/**
 * @param namespace - specified location from where this function was executed
 * @param message - little details or description of this log
 * @param object - could be used for debbuging or error handling
 * @returns {void}
 */
const error = (namespace: string, message: string, object?: any) => {
	console.log('\x1b[31m');
	if (object) {
		console.log(
			`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
			object
		);
		return;
	}
	console.log(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
};

/**
 * @param namespace - specified location from where this function was executed
 * @param message - little details or description of this log
 * @param object - could be used for debbuging or error handling
 * @returns {void}
 */
const debug = (namespace: string, message: string, object?: any) => {
	console.log('\x1b[34m');
	if (object) {
		console.log(
			`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
			object
		);
		return;
	}
	console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
};

export default { info, warn, error, debug };
