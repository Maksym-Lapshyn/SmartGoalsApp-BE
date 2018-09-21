import { factorModel } from '../models/factor-model';

const create = function (milestoneId, goalId, factor) {
	return factorModel.create(milestoneId, goalId, factor);
};

const getAllByParent = function (milestoneId, goalId) {
	return factorModel.getAllByParent(milestoneId, goalId);
};

const getSingleByParent = function (factorId, milestoneId, goalId) {
	return factorModel.getSingleByParent(factorId, milestoneId, goalId);
};

const update = function(factorId, factor) {
	return factorModel.update(factorId, factor);
};

const remove = function(factorId, milestoneId, goalId) {
	return factorModel.remove(factorId, milestoneId, goalId);
};

const checkIfExists = function(factorId, milestoneId, goalId) {
	return factorModel.checkIfExists(factorId, milestoneId, goalId);
};

const factorService = {
	create: create,
	getAllByParent: getAllByParent,
	getSingleByParent: getSingleByParent,
	update: update,
	remove: remove,
	checkIfExists: checkIfExists
};

export {
	factorService
};