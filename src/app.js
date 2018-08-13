import createError from 'http-errors';
import express, { json, urlencoded, static as staticFiles } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connectToDatabase } from './database';
import goalsRoute from './routes/goal';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { logError } from './logger';

// establish connection with the database
connectToDatabase();

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());

const swaggerDocument = yaml.load('swagger.yaml');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);

app.use('/api/goals', goalsRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	const status = err.status || 500;
	const message = err.message;
	const strackTrace = err.stackTrace;

	logError({
		message: message,
		status: status,
		timeStamp: new Date(),
		stackTrace: strackTrace
	});

	res.statusMessage = message;

	res.status(status);
	res.end();
});

export default app
