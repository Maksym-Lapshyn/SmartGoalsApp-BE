import Goal from '../models/goal';
import { logger } from '../logger';

const createGoal = function (req, res, next) {
	const goal = req.body;

	logger.info({
		action: 'create goal',
		object: goal,
		timeStamp: new Date()
	});
	
	Goal.create(goal).then(newGoal => {
		res.status(201);
		res.json(newGoal);
	}).catch(err => {
		next(err);
	});
}

const getAllGoals = function (req, res, next) {
	logger.info({
		action: 'get all goals',
		timeStamp: new Date()
	});

	Goal.find().then(goals => {
		res.status(200);
		res.json(goals);
	}).catch(err => {
		next(err);
	});
};

const getSingleGoal = function (req, res, next) {
	const id = req.params.id;

	logger.info({
		action: 'get single goal',
		id: id,
		timeStamp: new Date()
	});

	Goal.findById(id).then(goal => {
		res.status(200);
		res.json(goal);
	}).catch(err => {
		next(err);
	});
}

const updateGoal = function (req, res, next) {
	const id = req.params.id;
	const goal = req.body;

	logger.info({
		action: 'update goal',
		id: id,
		object: goal,
		timeStamp: new Date()
	});

	Goal.findByIdAndUpdate(id, goal).then(() => {
		res.status(204);
		res.end();
	}).catch(err => {
		next(err);
	});
}

const deleteGoal = function (req, res, next) {
	const id = req.params.id;

	logger.info({
		action: 'delete goal',
		id: id,
		timeStamp: new Date()
	});

	Goal.deleteOne({
		_id: id
	}).then(() => {
		res.status(204);
		res.end();
	}).catch(err => {
		next(err);
	});
}

export {
	createGoal,
	getAllGoals,
	getSingleGoal,
	updateGoal,
	deleteGoal
}