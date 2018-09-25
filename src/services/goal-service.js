import { goalModel } from '../repositories/goal-repository';

const create = function (goal) {
	return goalModel.create(goal);
};

const getAll = function () {
	return goalModel.getAll();
};

const getSingle = function (goalId) {
	return goalModel.getSingle(goalId);
};

const update = function(goalId, goal) {
	return goalModel.update(goalId, goal);
};

const remove = function(goalId) {
	return goalModel.remove(goalId);
};

const checkIfExists = function(goalId) {
	return goalModel.checkIfExists(goalId);
};

const goalService = {
	create,
	getAll,
	getSingle,
	update,
	remove,
	checkIfExists
};

export {
	goalService
};