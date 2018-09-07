import { goalModel } from '../models/goal-model';

const create = function (goal) {
	return goalModel.create(goal);
};

const getAll = function () {
	return goalModel.getAll();
};

const getSingle = function (id) {
	return goalModel.getSingle(id);
};

const update = function(id, goal) {
	return goalModel.update(id, goal);
};

const remove = function(id) {
	return goalModel.remove(id);
};

const checkIfExists = function(id) {
	return goalModel.checkIfExists(id);
};

const goalService = {
	create: create,
	getAll: getAll,
	getSingle: getSingle,
	update: update,
	remove: remove,
	checkIfExists: checkIfExists
};

export {
	goalService
};