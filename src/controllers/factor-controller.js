import { logInfo } from '../logger';
import { factorService } from '../services/factor-service';
import { milestoneService } from '../services/milestone-service';

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

		milestoneService.checkIfExists(milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not contain milestone with id "${milestoneId}".`;
				res.end();
			} else {
				factorService.create(milestoneId, goalId, factor).then(newFactor => {
					res.status(201);
					res.json(newFactor);
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
	validateParentIds(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		milestoneService.checkIfExists(milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not contain milestone with id "${milestoneId}".`;
				res.end();
			} else {
				factorService.getAllByParent(milestoneId, goalId).then(factors => {
					res.status(200);
					res.json(factors);
				});
			}
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
		const factorId = req.params.factorId;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		milestoneService.checkIfExists(milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Goal with id: "${goalId}" does not contain milestone with id "${milestoneId}".`;
				res.end();
			} else {
				factorService.getSingleByParent(factorId, milestoneId).then(factor => {
					if (!factor) {
						res.status(404);
						res.statusMessage = `Factor with id: "${factorId}" does not exist.`;
						res.end();
					} else {
						res.status(200);
						res.json(factor);
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
	validateParentIds(req);
	validateMilestoneId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const factorId = req.params.factorId;
		const factor = req.body;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		factorService.checkIfExists(factorId, milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = 'Combination of specified ids does not match any existing factor.';
				res.end();
			} else {
				factorService.update(factorId, factor).then(() => {
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
	validateParentIds(req);
	validateMilestoneId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const factorId = req.params.factorId;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		factorService.checkIfExists(factorId, milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = 'Combination of specified ids does not match any existing factor.';
				res.end();
			} else {
				factorService.remove(factorId, milestoneId).then(() => {
					res.status(204);
					res.end();
				});
			}
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