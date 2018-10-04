import { factorRepository } from '../repositories-old/factor-repository';

const create = function (milestoneId, goalId, factor) {
	return factorRepository.create(milestoneId, goalId, factor);
};

const getAllByParent = function (milestoneId, goalId) {
	return factorRepository.getAllByParent(milestoneId, goalId);
};

const getSingleByParent = function (factorId, milestoneId, goalId) {
	return factorRepository.getSingleByParent(factorId, milestoneId, goalId);
};

const update = function(factorId, factor) {
	return factorRepository.update(factorId, factor);
};

const remove = function(factorId, milestoneId, goalId) {
	return factorRepository.remove(factorId, milestoneId, goalId);
};

const checkIfExists = function(factorId, milestoneId, goalId) {
	return factorRepository.checkIfExists(factorId, milestoneId, goalId);
};

const factorService = {
	create,
	getAllByParent,
	getSingleByParent,
	update,
	remove,
	checkIfExists
};

export {
	factorService
};