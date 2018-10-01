#!/usr/bin/env node

import '@babel/polyfill';
import app from '../app';
import { createServer } from 'http';

var port = normalizePort(process.env.PORT || '3000'); // eslint-disable-line no-undef
app.set('port', port);

var server = createServer(app);

server.listen(port);

server.on('error', function (error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ?
		'Pipe ' + port :
		'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges'); // eslint-disable-line no-console
		process.exit(1); // eslint-disable-line no-undef
		break;
	case 'EADDRINUSE':
		console.error(bind + ' is already in use'); // eslint-disable-line no-console
		process.exit(1); // eslint-disable-line no-undef
		break;
	default:
		throw error;
	}
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}
