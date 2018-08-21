import { logInfo } from '../logger';
import { goalService } from '../services/goal';

const create = function (req, res, next) {
	logRequest(req);

	const goal = req.body;
	
	goalService.create(goal).then(newGoal => {
		res.status(201);
		res.json(newGoal);
	}).catch(err => {
		next(err);
	});
}

const getAll = function (req, res, next) {
	logRequest(req);

	goalService.getAll().then(goals => {
		res.status(200);
		res.json(goals);
	}).catch(err => {
		next(err);
	});
};

const getSingle = function (req, res, next) {
	logRequest(req);

	const id = req.params.id;

	goalService.getSingle(id).then(goal => {
		res.status(200);
		res.json(goal);
	}).catch(err => {
		next(err);
	});
}

const update = function (req, res, next) {
	logRequest(req);

	const id = req.params.id;
	const goal = req.body;

	goalService.update(id, goal).then(() => {
		res.status(204);
		res.end();
	}).catch(err => {
		next(err);
	});
}

const remove = function (req, res, next) {
	logRequest(req);

	const id = req.params.id;

	goalService.remove(id).then(() => {
		res.status(204);
		res.end();
	}).catch(err => {
		next(err);
	});
}

const logRequest = function(req) {
	logInfo({
		httpMethod: req.httpMethod,
		data: req.body,
		routeParams: req.params,
		timeStamp: new Date(),
		url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
	});
};

const goalController = {
	create: create,
	getAll: getAll,
	getSingle: getSingle,
	update: update,
	remove: remove
};

export {
	goalController
}