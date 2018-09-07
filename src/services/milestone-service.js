import {  milestoneModel } from '../models/milestone-model';

const create = function (goalId, milestone) {
	return milestoneModel.create(goalId, milestone);
};

const getAllByParent = function (goalId) {
	return milestoneModel.getAllByParent(goalId);
};

const getSingleByParent = function (id, goalId) {
	return milestoneModel.getSingleByParent(id, goalId);
};

const update = function(id, milestone) {
	return milestoneModel.update(id, milestone);
};

const remove = function(id, goalId) {
	return milestoneModel.remove(id, goalId);
};

const checkIfExists = function(id) {
	return milestoneModel.checkIfExists(id);
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