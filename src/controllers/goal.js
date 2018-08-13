import { logInfo } from '../logger';
import { goalService } from '../services/goal';

const create = function (req, res, next) {
	const goal = req.body;
	const url = req.protocol + '://' + req.get('host') + req.originalUrl;

	logInfo({
		message: 'Http request received (POST)',
		action: 'Create goal',
		object: goal,
		timeStamp: new Date(),
		url: url
	});
	
	goalService.create(goal).then(newGoal => {
		res.status(201);
		res.json(newGoal);
	}).catch(err => {
		next(err);
	});
}

const getAll = function (req, res, next) {
	const url = req.protocol + '://' + req.get('host') + req.originalUrl;

	logInfo({
		message: 'Http request received (GET)',
		action: 'get all goals',
		timeStamp: new Date(),
		url: url
	});

	goalService.getAll().then(goals => {
		res.status(200);
		res.json(goals);
	}).catch(err => {
		next(err);
	});
};

const getSingle = function (req, res, next) {
	const id = req.params.id;
	const url = req.protocol + '://' + req.get('host') + req.originalUrl;

	logInfo({
		message: 'Http request received (GET)',
		action: 'Get single goal',
		id: id,
		timeStamp: new Date(),
		url: url
	});

	goalService.getSingle(id).then(goal => {
		res.status(200);
		res.json(goal);
	}).catch(err => {
		next(err);
	});
}

const update = function (req, res, next) {
	const id = req.params.id;
	const goal = req.body;
	const url = req.protocol + '://' + req.get('host') + req.originalUrl;

	logInfo({
		message: 'Http request received (UPDATE)',
		action: 'Update goal',
		id: id,
		object: goal,
		timeStamp: new Date(),
		url: url
	});

	goalService.update(id, goal).then(() => {
		res.status(204);
		res.end();
	}).catch(err => {
		next(err);
	});
}

const remove = function (req, res, next) {
	const id = req.params.id;
	const url = req.protocol + '://' + req.get('host') + req.originalUrl;

	logInfo({
		message: 'Http request received (DELETE)',
		action: 'Delete goal',
		id: id,
		timeStamp: new Date(),
		url: url
	});

	goalService.remove(id).then(() => {
		res.status(204);
		res.end();
	}).catch(err => {
		next(err);
	});
}

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