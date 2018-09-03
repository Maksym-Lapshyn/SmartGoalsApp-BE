import { logInfo } from '../logger';
import { milestoneService } from '../services/milestone-service';

const create = function (req, res, next) {
	logRequest(req);

	const milestone = req.body;
	const goalId = req.params.goalId;
	
	milestoneService.create(goalId, milestone).then(newMilestone => {
		res.status(201);
		res.json(newMilestone);
	}).catch(err => {
		next(err);
	});
}

const getAllByParent = function (req, res, next) {
	logRequest(req);

	const goalId = req.params.goalId;

	milestoneService.getAllByParent(goalId).then(milestones => {
		res.status(200);
		res.json(milestones);
	}).catch(err => {
		next(err);
	});
};

const getSingle = function (req, res, next) {
	logRequest(req);

	const id = req.params.id;

	milestoneService.getSingle(id).then(milestone => {
		res.status(200);
		res.json(milestone);
	}).catch(err => {
		next(err);
	});
}

const update = function (req, res, next) {
	logRequest(req);

	const id = req.params.id;
	const milestone = req.body;

	milestoneService.update(id, milestone).then(() => {
		res.status(204);
		res.end();
	}).catch(err => {
		next(err);
	});
}

const remove = function (req, res, next) {
	logRequest(req);

	const id = req.params.id;
	const goalId = req.params.goalId;

	milestoneService.remove(id, goalId).then(() => {
		res.status(204);
		res.end();
	}).catch(err => {
		next(err);
	});
}

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