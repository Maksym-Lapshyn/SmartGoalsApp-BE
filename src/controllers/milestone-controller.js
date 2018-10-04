import { logInfo } from '../logger';
import { milestoneService } from '../services/milestone-service';
import { goalService } from '../services/goal-service';

const create = function (req, res, next) {
	logRequest(req);
	validateGoalId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestone = req.body;
		const goalId = req.params.goalId;

		goalService.checkIfExists(goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return milestoneService.create(goalId, milestone).then(newMilestone => {
					res.status(201);
					res.json(newMilestone);
					res.end();
				});
			}
		}).catch(err => {
			next(err);
		});
	}
};

const getAllByParent = function (req, res, next) {
	logRequest(req);
	validateGoalId(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const goalId = req.params.goalId;

		goalService.checkIfExists(goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return milestoneService.getAllByParent(goalId).then(milestones => {
					res.status(200);
					res.json(milestones);
				});
			}
		}).catch(err => {
			next(err);
		});
	}
};

const getSingleByParent = function (req, res, next) {
	logRequest(req);
	validateGoalId(req);
	validateMilestoneId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestoneId = req.params.milestoneId;
		const goalId = req.params.goalId;

		milestoneService.getSingleByParent(milestoneId, goalId).then((milestone) => {
			if (!milestone) {
				res.status(404);
				res.statusMessage = `Milestone with id: "${milestoneId}" and goal id: "${goalId}" does not exist.`;
				res.end();
			} else {
				res.status(200);
				res.json(milestone);
			}
		}).catch(err => {
			next(err);
		});
	}
};

const update = function (req, res, next) {
	logRequest(req);
	validateMilestoneId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestoneId = req.params.milestoneId;
		const milestone = req.body;
	
		milestoneService.update(milestoneId, milestone).then(updatedMilestone => {
			if (!updatedMilestone) {
				res.status(404);
				res.statusMessage = `Milestone with id: "${milestoneId}" does not exist.`;
				res.end();
			} else {
				res.status(204);
				res.end();
			}
		}).catch(err => {
			next(err);
		});
	}
};

const remove = function (req, res, next) {
	logRequest(req);
	validateMilestoneId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestoneId = req.params.milestoneId;
	
		milestoneService.remove(milestoneId).then(removedMilestone => {
			if (!removedMilestone) {
				res.status(404);
				res.statusMessage = `Milestone with id: "${milestoneId}" does not exist.`;
				res.end();
			} else {
				res.status(204);
				res.end();
			}
		}).catch(err => {
			next(err);
		});
	}
};

const validateGoalId = function(req) {
	req.checkParams('goalId', 'Goal id should be a valid identifier.').isInt({min: 1});
};

const validateMilestoneId = function(req) {
	req.checkParams('milestoneId', 'Milestone id should be a valid identifier.').isInt({min: 1});
};

const validateBody = function(req) {
	req.checkBody('name', 'Milestone name should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('plannedDate', 'Milestone planned date should be a valid ISO8601 date i.e. \'2018-09-03T05:59:29+00:00\'.').isISO8601();
	req.checkBody('actualDate', 'Milestone actual date should be a valid ISO8601 date i.e. \'2018-09-03T05:59:29+00:00\'.').isISO8601();
	req.checkBody('value', 'Milestone value should be a valid number in range [1, 10].').isInt({min: 1, max: 10});
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

const milestoneController = {
	create,
	getAllByParent,
	getSingleByParent,
	update,
	remove
};

export {
	milestoneController
};