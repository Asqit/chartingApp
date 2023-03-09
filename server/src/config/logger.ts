import { createLogger, transports, format } from "winston";

const getTimeStamp = () => new Date().toISOString();

const customFormat = format.printf((info) => {
	return `[${getTimeStamp().toUpperCase()}] [${info.level.toUpperCase()}] ${info.message}`;
});

const logger = createLogger({
	level: "info",
	format: customFormat,
	transports: [
		new transports.Console(),
	]
});


export default logger;
