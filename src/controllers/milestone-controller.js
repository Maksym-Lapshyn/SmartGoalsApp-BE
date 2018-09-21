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
				milestoneService.create(goalId, milestone).then(newMilestone => {
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
				milestoneService.getAllByParent(goalId).then(milestones => {
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

		goalService.checkIfExists(goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				milestoneService.getSingleByParent(milestoneId, goalId).then((milestone) => {
					if (!milestone) {
						res.status(404);
						res.statusMessage = `Milestone with id: "${milestoneId}" does not exist.`;
						res.end();
					} else {
						res.status(200);
						res.json(milestone);
					}
				});
			}
		}).catch(err => {
			next(err);
		});
	}
};

const update = function (req, res, next) {
	logRequest(req);
	validateGoalId(req);
	validateMilestoneId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestoneId = req.params.milestoneId;
		const milestone = req.body;
		const goalId = req.params.goalId;
	
		milestoneService.checkIfExists(milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not contain milestone with id "${milestoneId}".`;
				res.end();
			} else {
				milestoneService.update(milestoneId, milestone).then(() => {
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
	validateGoalId(req);
	validateMilestoneId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestoneId = req.params.milestoneId;
		const goalId = req.params.goalId;
	
		milestoneService.checkIfExists(milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not contain milestone with id "${milestoneId}".`;
				res.end();
			} else {
				milestoneService.remove(milestoneId, goalId).then(() => {
					res.status(204);
					res.end();
				});
			}
		}).catch(err => {
			next(err);
		});
	}
};

const validateGoalId = function(req) {
	req.checkParams('goalId', 'Goal id should be a valid identifier.').isMongoId();
};

const validateMilestoneId = function(req) {
	req.checkParams('milestoneId', 'Milestone id should be a valid identifier.').isMongoId();
};

const validateBody = function(req) {
	req.checkBody('name', 'Milestone name should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('description', 'Milestone description should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('plannedDate', 'Milestone planned date should be a valid ISO8601 date i.e. \'2018-09-03T05:59:29+00:00\'.').isISO8601();
	req.checkBody('actualDate', 'Milestone actual date should be a valid ISO8601 date i.e. \'2018-09-03T05:59:29+00:00\'.').isISO8601();
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
	create: create,
	getAllByParent: getAllByParent,
	getSingle: getSingleByParent,
	update: update,
	remove: remove
};

export {
	milestoneController
};