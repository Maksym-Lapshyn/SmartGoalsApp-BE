import { logInfo } from '../logger';
import { factorService } from '../services/factor-service';
import { milestoneService } from '../services/milestone-service';
import { goalService } from '../services/goal-service';

const create = function (req, res, next) {
	logRequest(req);
	validateParentIds(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const factor = req.body;
		const milestoneId = req.params.milestoneId;
		const goalId = req.params.goalId;

		goalService.checkIfExists(goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return milestoneService.checkIfExists(milestoneId);
			}
		}).then(milestoneExists => {
			if (!milestoneExists) {
				res.status(404);
				res.statusMessage = `Milestone with id: "${milestoneId}" does not exist.`;
				res.end();
			} else {
				return factorService.create(milestoneId, factor);
			}
		}).then(newFactor => {
			res.status(201);
			res.json(newFactor);
			res.end();
		}).catch(err => {
			next(err);
		});
	}
};

const getAllByParent = function (req, res, next) {
	logRequest(req);
	validateParentIds(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		goalService.checkIfExists(goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return milestoneService.checkIfExists(milestoneId);
			}
		}).then(milestoneExists => {
			if (!milestoneExists) {
				res.status(404);
				res.statusMessage = `Milestone with id: "${milestoneId}" does not exist.`;
				res.end();
			} else {
				return factorService.getAllByParent(milestoneId);
			}
		}).then(factors => {
			res.status(200);
			res.json(factors);
		}).catch(err => {
			next(err);
		});
	}
};

const getSingleByParent = function (req, res, next) {
	logRequest(req);
	validateParentIds(req);
	validateMilestoneId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const id = req.params.id;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		goalService.checkIfExists(goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return milestoneService.checkIfExists(milestoneId);
			}
		}).then(milestoneExists => {
			if (!milestoneExists) {
				res.status(404);
				res.statusMessage = `Milestone with id: "${milestoneId}" does not exist.`;
				res.end();
			} else {
				return factorService.getSingleByParent(id, milestoneId);
			}
		}).then(factor => {
			if (!factor) {
				res.status(404);
				res.statusMessage = `Factor with id: "${id}" does not exist.`;
				res.end();
			} else {
				res.status(200);
				res.json(factor);
			}
		}).catch(err => {
			next(err);
		});
	}
};

const update = function (req, res, next) {
	logRequest(req);
	validateParentIds(req);
	validateMilestoneId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const id = req.params.id;
		const factor = req.body;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		goalService.checkIfExists(goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return milestoneService.checkIfExists(milestoneId);
			}
		}).then(milestoneExists => {
			if (!milestoneExists) {
				res.status(404);
				res.statusMessage = `Milestone with id: "${milestoneId}" does not exist.`;
				res.end();
			} else {
				return factorService.update(id, factor);
			}
		}).then(() => {
			res.status(204);
			res.end();
		}).catch(err => {
			next(err);
		});
	}
};

const remove = function (req, res, next) {
	logRequest(req);
	validateParentIds(req);
	validateMilestoneId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const id = req.params.id;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;
	
		goalService.checkIfExists(goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not exist.`;
				res.end();
			} else {
				return milestoneService.checkIfExists(milestoneId);
			}
		}).then(milestoneExists => {
			if (!milestoneExists) {
				res.status(404);
				res.statusMessage = `Milestone with id: "${milestoneId}" does not exist.`;
				res.end();
			} else {
				return factorService.remove(id, milestoneId);
			}
		}).then(() => {
			res.status(204);
			res.end();
		}).catch(err => {
			next(err);
		});
	}
};

const validateParentIds = function(req) {
	req.checkParams('goalId', 'Goal id should be a valid identifier.').isMongoId();
	req.checkParams('milestoneId', 'Milestone id should be a valid identifier.').isMongoId();
};

const validateMilestoneId = function(req) {
	req.checkParams('id', 'Milestone id should be a valid identifier.').isMongoId();
};

const validateBody = function(req) {
	req.checkBody('name', 'Factor name should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('description', 'Factor description should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('value', 'Factor value should be an int in range [0..10].').isInt({min: 0, max: 10});
	req.checkBody('weight', 'Factor weight should be an int in range [0..10].').isInt({min: 0, max: 10});
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

const factorController = {
	create: create,
	getAllByParent: getAllByParent,
	getSingle: getSingleByParent,
	update: update,
	remove: remove
};

export {
	factorController
};