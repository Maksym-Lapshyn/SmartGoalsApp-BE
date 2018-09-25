import { goalRepository } from '../repositories/goal-repository';

const create = function (goal) {
	return goalRepository.create(goal);
};

const getAll = function () {
	return goalRepository.getAll();
};

const getSingle = function (goalId) {
	return goalRepository.getSingle(goalId);
};

const update = function(goalId, goal) {
	return goalRepository.update(goalId, goal);
};

const remove = function(goalId) {
	return goalRepository.remove(goalId);
};

const checkIfExists = function(goalId) {
	return goalRepository.checkIfExists(goalId);
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