import { logInfo } from '../logger';
import { factorRepository } from '../repositories/factor-repository';
import { contributorRepository } from '../repositories/contributor-repository';

const addToParent = function (req, res, next) {
	logRequest(req);
	validateFactorId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributor = req.body;
		const factorId = req.params.factorId;

		factorRepository.checkIfExists(factorId).then(exists => {
			if (!exists) {
				res.status(404);
				res.statusMessage = `Factor with id: "${factorId}" does not exist.`;
				res.end();
			} else {
				return contributorRepository.addToParent(factorId, contributor).then(newContributor => {
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

const getAll = function (req, res, next) {
	logRequest(req);

	return contributorRepository.getAll().then(contributors => {
		res.status(200);
		res.json(contributors);
	}).catch(err => {
		next(err);
	});
};

const getAllByParent = function (req, res, next) {
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
				return contributorRepository.getAllByParent(factor).then(contributors => {
					res.status(200);
					res.json(contributors);
				});
			}
		}).catch(err => {
			next(err);
		});
	}
};

const getSingle = function (req, res, next) {
	logRequest(req);
	validateContributorId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributorId = req.params.contributorId;

		contributorRepository.getSingle(contributorId).then(contributor => {
			if (!contributor) {
				res.status(404);
				res.statusMessage = `Contributor with id: "${contributorId}" does not exist.`;
				res.end();
			} else {
				res.status(200);
				res.json(contributor);
			}
		}).catch(err => {
			next(err);
		});
	}
};

const linkToParent = function (req, res, next) {
	logRequest(req);
	validateContributorId(req);
	validateFactorId(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributorId = req.params.contributorId;
		const factorId = req.params.factorId;

		return contributorRepository.linkToParent(factorId, contributorId).then(() => {
			res.status(204);
			res.end();
		}).catch(err => {
			next(err);
		});
	}
};

const unlinkFromParent = function (req, res, next) {
	logRequest(req);
	validateContributorId(req);
	validateFactorId(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributorId = req.params.contributorId;
		const factorId = req.params.factorId;

		return contributorRepository.linkToParent(factorId, contributorId).then(() => {
			res.status(204);
			res.end();
		}).catch(err => {
			next(err);
		});
	}
};

const update = function (req, res, next) {
	logRequest(req);
	validateContributorId(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributorId = req.params.contributorId;
		const contributor = req.body;

		return contributorRepository.update(contributorId, contributor).then(udpatedContributor => {
			if (!udpatedContributor) {
				res.status(404);
				res.statusMessage = `Contributor with id: "${contributorId}" does not exist.`;
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
	validateContributorId(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const contributorId = req.params.contributorId;

		contributorRepository.remove(contributorId).then(removedContributor => {
			if (!removedContributor) {
				res.status(404);
				res.statusMessage = `Contributor with id: "${contributorId}" does not exist.`;
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

const validateFactorId = function(req) {
	req.checkParams('factorId', 'Factor id should be a positive integer.').isInt({min: 1});
};

const validateContributorId = function(req) {
	req.checkParams('contributorId', 'Contributor id should be a positive integer.').isInt({min: 1});
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
	addToParent,
	getAll,
	getAllByParent,
	linkToParent,
	unlinkFromParent,
	getSingle,
	update,
	remove
};

export {
	contributorController
};