import { logInfo } from '../logger';
import { milestoneService } from '../services/milestone-service';

const create = function (req, res, next) {
	logRequest(req);
	req.checkParams('goalId', 'Goal id should be a valid identifier.').isMongoId();
	validateBody(req);
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const milestone = req.body;
		const goalId = req.params.goalId;
		
		milestoneService.create(goalId, milestone).then(newMilestone => {
			res.status(201);
			res.json(newMilestone);
			res.end();
		}).catch(err => {
			next(err);
		});
	}
}

const getAllByParent = function (req, res, next) {
	logRequest(req);
	req.checkParams('goalId', 'Goal id should be a valid identifier.').isMongoId();
	
	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const goalId = req.params.goalId;

		milestoneService.getAllByParent(goalId).then(milestones => {
			res.status(200);
			res.json(milestones);
		}).catch(err => {
			next(err);
		});
	}
};

const getSingle = function (req, res, next) {
	logRequest(req);
	validateParams(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const id = req.params.id;

		milestoneService.getSingle(id).then(milestone => {
			res.status(200);
			res.json(milestone);
		}).catch(err => {
			next(err);
		});
	}
}

const update = function (req, res, next) {
	logRequest(req);
	validateParams(req);
	validateBody(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const id = req.params.id;
		const milestone = req.body;
	
		milestoneService.update(id, milestone).then(() => {
			res.status(204);
			res.end();
		}).catch(err => {
			next(err);
		});
	}
}

const remove = function (req, res, next) {
	logRequest(req);
	validateParams(req);

	var validationErrors = req.validationErrors();

	if (validationErrors) {
		res.status(400);
		res.json(validationErrors);
	} else {
		const id = req.params.id;
		const goalId = req.params.goalId;
	
		milestoneService.remove(id, goalId).then(() => {
			res.status(204);
			res.end();
		}).catch(err => {
			next(err);
		});
	}
}

const validateParams = function(req) {
	req.checkParams('id', 'Milestone id should be a valid identifier.').isMongoId();
	req.checkParams('goalId', 'Goal id should be a valid identifier.').isMongoId();
}

const validateBody = function(req) {
	req.checkBody('name', 'Milestone name should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('description', 'Milestone description should be more than 5 characters long.').isLength({min: 5});
	req.checkBody('plannedDate', 'Milestone planned date should be a valid ISO8601 date i.e. \'2018-09-03T05:59:29+00:00\'.').isISO8601();
	req.checkBody('actualDate', 'Milestone actual date should be a valid ISO8601 date i.e. \'2018-09-03T05:59:29+00:00\'.').isISO8601();
	req.checkBody('value', 'Milestone value should be a valid number in range [1,10].').isInt({min: 1, max: 10});
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
	getSingle: getSingle,
	update: update,
	remove: remove
};

export {
	milestoneController
};