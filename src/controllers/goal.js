import Goal from '../models/goal';
import { logInfo } from '../logger';

const createGoal = function (req, res, next) {
	const goal = req.body;

	logInfo({
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
	logInfo({
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

	logInfo({
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

	logInfo({
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

	logInfo({
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