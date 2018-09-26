import { logInfo } from '../logger';
import { factorService } from '../services/factor-service';
import { contributorService } from '../services/contributor-service';

const create = function (req, res, next) {
	logRequest(req);
	validateParentIds(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributor = req.body;
		const factorId = req.params.factorId;
		const milestoneId = req.params.milestoneId;
		const goalId = req.params.goalId;

		factorService.checkIfExists(factorId, milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = 'Combination of specified ids does not match any existing factor.';
				res.end();
			} else {
				return contributorService.create(factorId, milestoneId, goalId, contributor).then(newContributor => {
					res.status(201);
					res.json(newContributor);
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
		const factorId = req.params.factorId;

		factorService.checkIfExists(factorId, milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = 'Combination of specified ids does not match any existing factor.';
				res.end();
			} else {
				return contributorService.getAllByParent(factorId, milestoneId, goalId).then(contributors => {
					res.status(200);
					res.json(contributors);
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
	validateContributorId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributorId = req.params.contributorId;
		const factorId = req.params.factorId;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		factorService.checkIfExists(factorId, milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = 'Combination of specified ids does not match any existing factor.';
				res.end();
			} else {
				return contributorService.getSingleByParent(contributorId, factorId, milestoneId, goalId).then(contributor => {
					if (!contributor) {
						res.status(404);
						res.statusMessage = `Contributor with id: "${contributorId}" does not exist.`;
						res.end();
					} else {
						res.status(200);
						res.json(contributor);
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
	validateContributorId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributorId = req.params.contributorId;
		const factorId = req.params.factorId;
		const contributor = req.body;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		contributorService.checkIfExists(contributorId, factorId, milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = 'Combination of specified ids does not match any existing contributor.';
				res.end();
			} else {
				return contributorService.update(contributorId, contributor).then(() => {
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
	validateContributorId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributorId = req.params.contributorId;
		const factorId = req.params.factorId;
		const goalId = req.params.goalId;
		const milestoneId = req.params.milestoneId;

		contributorService.checkIfExists(contributorId, factorId, milestoneId, goalId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = 'Combination of specified ids does not match any existing contributor.';
				res.end();
			} else {
				return contributorService.remove(contributorId, factorId, milestoneId, goalId).then(() => {
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
	req.checkParams('factorId', 'Factor id should be a valid identifier.').isMongoId();
};

const validateContributorId = function(req) {
	req.checkParams('contributorId', 'Contributor id should be a valid identifier.').isMongoId();
};

const validateBody = function(req) {
	req.checkBody('name', 'Contributor name should be more than 5 characters long.').isLength({min: 5});
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

const contributorController = {
	create,
	getAllByParent,
	getSingleByParent,
	update,
	remove
};

export {
	contributorController
};