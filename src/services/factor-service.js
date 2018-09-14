import { factorModel } from '../models/factor-model';

const create = function (milestoneId, factor) {
	return factorModel.create(milestoneId, factor);
};

const getAllByParent = function (milestoneId) {
	return factorModel.getAllByParent(milestoneId);
};

const getSingleByParent = function (id, milestoneId) {
	return factorModel.getSingleByParent(id, milestoneId);
};

const update = function(id, factor) {
	return factorModel.update(id, factor);
};

const remove = function(id, milestoneId) {
	return factorModel.remove(id, milestoneId);
};

const checkIfExists = function(id) {
	return factorModel.checkIfExists(id);
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