import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connectToDatabase } from './database';
import goalsRoute from './routes/goal-route';
import milestoneRoute from './routes/milestone-route';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import { logError } from './logger';
import fs from 'fs';
import validator from 'express-validator';

// establish connection with the database
connectToDatabase();

const app = express();
const swaggerDoc = yaml.safeLoad(fs.readFileSync('swagger.yml', 'utf8'));

// create directory for logs if it does not exist
if (!fs.existsSync('logs')) {
	fs.mkdirSync('logs');
}

app.use(logger('dev'));
app.use(json());
app.use(cookieParser());
app.use(urlencoded({extended: false}));
app.use(validator());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/goals', goalsRoute);
app.use('/api/goals/:goalId/milestones', milestoneRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	const status = err.status || 500;
	const message = err.message;

	logError({
		message: message,
		status: status,
		timeStamp: new Date(),
		stackTrace: err.stack
	});

	// replace all line breaks with spaces since
	// line breaks are not allowed in status messages
	res.statusMessage = message.replace('\n', ' ');

	res.status(status);
	res.end();
});

export default app;
