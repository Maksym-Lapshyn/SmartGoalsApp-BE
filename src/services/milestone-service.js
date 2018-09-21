import { milestoneModel } from '../models/milestone-model';

const create = function (goalId, milestone) {
	return milestoneModel.create(goalId, milestone);
};

const getAllByParent = function (goalId) {
	return milestoneModel.getAllByParent(goalId);
};

const getSingleByParent = function (milestoneId, goalId) {
	return milestoneModel.getSingleByParent(milestoneId, goalId);
};

const update = function(milestoneId, milestone) {
	return milestoneModel.update(milestoneId, milestone);
};

const remove = function(milestoneId, goalId) {
	return milestoneModel.remove(milestoneId, goalId);
};

const checkIfExists = function(milestoneId, goalId) {
	return milestoneModel.checkIfExists(milestoneId, goalId);
};

const milestoneService = {
	create: create,
	getAllByParent: getAllByParent,
	getSingleByParent: getSingleByParent,
	update: update,
	remove: remove,
	checkIfExists: checkIfExists
};

export {
	milestoneService
};