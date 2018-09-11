import winston from 'winston';

const debugLogger = winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: 'logs/debug.log',
			level: 'debug'
		}),
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error'
		}),
		new winston.transports.File({
			filename: 'logs/info.log',
			level: 'info'
		})
	]
});

const errorLogger = winston.createLogger({
	level: 'error',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error'
		})
	]
});

const infoLogger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: 'logs/info.log',
			level: 'info'
		})
	]
});

const logDebug = debugLogger.debug;
const logError = errorLogger.error;
const logInfo = infoLogger.info;

export {
	logDebug,
	logError,
	logInfo
};