import { logInfo } from '../logger';
import { factorRepository } from '../repositories/factor-repository';
import { milestoneRepository } from '../repositories/milestone-repository';

const create = function (req, res, next) {
	logRequest(req);
	validateMilestoneId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const factor = req.body;
		const milestoneId = req.params.milestoneId;

		milestoneRepository.checkIfExists(milestoneId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Milestone with id "${milestoneId}" does not exist.`;
				res.end();
			} else {
				return factorRepository.addToParent(milestoneId, factor).then(newFactor => {
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

const getAll = function (req, res, next) {
	logRequest(req);

	return factorRepository.getAll().then(factors => {
		res.status(200);
		res.json(factors);
	}).catch(err => {
		next(err);
	});
};

const getAllByParent = function (req, res, next) {
	logRequest(req);
	validateMilestoneId(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestoneId = req.params.milestoneId;

		milestoneRepository.getSingle(milestoneId).then(milestone => {
			if (!milestone) {
				res.status(404);
				res.statusMessage = `Milestone with id "${milestoneId}" does not exist.`;
				res.end();
			} else {
				return factorRepository.getAllByParent(milestone).then(factors => {
					res.status(200);
					res.json(factors);
				});
			}
		}).catch(err => {
			next(err);
		});
	}
};

const linkToParent = function (req, res, next) {
	logRequest(req);
	validateMilestoneId(req);
	validateFactorId(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestoneId = req.params.milestoneId;
		const factorId = req.params.factorId;

		factorRepository.linkToParent(milestoneId, factorId).then(() => {
			res.status(204);
			res.json();
		}).catch(err => {
			next(err);
		});
	}
};

const unlinkFromParent = function (req, res, next) {
	logRequest(req);
	validateMilestoneId(req);
	validateFactorId(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestoneId = req.params.milestoneId;
		const factorId = req.params.factorId;

		factorRepository.unlinkFromParent(milestoneId, factorId).then(() => {
			res.status(204);
			res.json();
		}).catch(err => {
			next(err);
		});
	}
};

const getSingle = function (req, res, next) {
	logRequest(req);
	validateFactorId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const factorId = req.params.factorId;

		factorRepository.getSingle(factorId).then(factor => {
			if (!factor) {
				res.status(404);
				res.statusMessage = `Factor with id: "${factorId}" does not exist.`;
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
	validateFactorId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const factorId = req.params.factorId;
		const factor = req.body;

		return factorRepository.update(factorId, factor).then(updatedFactor => {
			if (!updatedFactor) {
				res.status(404);
				res.statusMessage = `Factor with id: "${factorId}" does not exist.`;
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
	validateFactorId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const factorId = req.params.factorId;

		return factorRepository.remove(factorId).then(removedFactor => {
			if (!removedFactor) {
				res.status(404);
				res.statusMessage = `Factor with id: "${factorId}" does not exist.`;
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

const validateMilestoneId = function(req) {
	req.checkParams('milestoneId', 'Milestone id should be a positive integer.').isInt({min: 1});
};

const validateFactorId = function(req) {
	req.checkParams('factorId', 'Factor id should be a positive integer.').isInt({min: 1});
};

const validateBody = function(req) {
	req.checkBody('name', 'Factor name should be more than 5 characters long.').isLength({min: 5});
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
	create,
	getAll,
	getAllByParent,
	linkToParent,
	unlinkFromParent,
	getSingle,
	update,
	remove
};

export {
	factorController
};