import { logInfo } from '../logger';
import { goalService } from '../services/goal';

const create = function (req, res, next) {
	const goal = req.body;

	logInfo({
		action: 'create goal',
		object: goal,
		timeStamp: new Date()
	});
	
	goalService.create(goal).then(newGoal => {
		res.status(201);
		res.json(newGoal);
	}).catch(err => {
		next(err);
	});
}

const getAll = function (req, res, next) {
	throw new Error('test');

	logInfo({
		action: 'get all goals',
		timeStamp: new Date()
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

	logInfo({
		action: 'get single goal',
		id: id,
		timeStamp: new Date()
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

	logInfo({
		action: 'update goal',
		id: id,
		object: goal,
		timeStamp: new Date()
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

	logInfo({
		action: 'delete goal',
		id: id,
		timeStamp: new Date()
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