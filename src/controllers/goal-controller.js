import { logInfo } from '../logger';
import { goalService } from '../services/goal-service';

const create = function (req, res, next) {
	logRequest(req);
	validateBody(req);

	var validationErrors = req.validationErrors();
	
	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const goal = req.body;
	
		goalService.create(goal).then(newGoal => {
			res.status(201);
			res.json(newGoal);
		}).catch(err => {
			next(err);
		});
	}
};

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
	validateParams(req);
	
	var validationErrors = req.validationErrors();
	
	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const goalId = req.params.goalId;

		goalService.getSingle(goalId).then(goal => {
			if (!goal) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				res.status(200);
				res.json(goal);
			}
		}).catch(err => {
			next(err);
		});
	}
};

const update = function (req, res, next) {
	logRequest(req);
	validateParams(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const goalId = req.params.goalId;
		const goal = req.body;

		goalService.checkIfExists(goalId).then(goalExists => {
			if (!goalExists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return goalService.update(goalId, goal).then(() => {
					res.status(204);
					res.end();
				});
			}
		}).catch(err => {
			next(err);
		});
	}
};

const remove = function (req, res, next) {
	logRequest(req);
	validateParams(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const goalId = req.params.goalId;

		goalService.checkIfExists(goalId).then(goalExists => {
			if (!goalExists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return goalService.remove(goalId).then(() => {
					res.status(204);
					res.end();
				});
			}
		}).catch(err => {
			next(err);
		});
	}
};

const validateParams = function(req) {
	req.checkParams('goalId', 'Goal id should be a valid identifier.').isMongoId();
};

const validateBody = function(req) {
	req.checkBody('name', 'Goal name should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('description', 'Goal description should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('startDate', 'Goal start date should be a valid ISO8601 date i.e. \'2018-09-03T05:59:29+00:00\'.').isISO8601();
	req.checkBody('endDate', 'Goal end date should be a valid ISO8601 date i.e. \'2018-09-03T05:59:29+00:00\'.').isISO8601();
};

const logRequest = function(req) {
	logInfo({
		httpMethod: req.method,
		data: req.body,
		routeParams: req.params,
		timeStamp: new Date(),
		url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
	});
};

const goalController = {
	create,
	getAll,
	getSingle,
	update,
	remove
};

export {
	goalController
};