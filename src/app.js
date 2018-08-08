import createError from 'http-errors';
import express, { json, urlencoded, static as staticFiles } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connectToDatabase } from './database';
import goalsRoute from './routes/goal-route';

// establish connection with the database
connectToDatabase();

var app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(staticFiles(join(__dirname, 'public')));

app.use('/goals', goalsRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);

	if (req.app.get('env') === 'development') {
		res.json({
			message: err.message,
			error: err
		});
	} else {
		res.json({
			message: err.message
		});
	}
});

export default app;
