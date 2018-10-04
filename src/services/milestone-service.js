import { milestoneRepository } from '../repositories/milestone-repository';

const create = function (goalId, milestone) {
	return milestoneRepository.create(goalId, milestone);
};

const getAllByParent = function (goalId) {
	return milestoneRepository.getAllByParent(goalId);
};

const getSingle = function (milestoneId) {
	return milestoneRepository.getSingleByParent(milestoneId);
};

const update = function(milestoneId, milestone) {
	return milestoneRepository.update(milestoneId, milestone);
};

const remove = function(milestoneId, goalId) {
	return milestoneRepository.remove(milestoneId, goalId);
};

const checkIfExists = function(milestoneId) {
	return milestoneRepository.checkIfExists(milestoneId);
};

const milestoneService = {
	create,
	getAllByParent,
	getSingle,
	update,
	remove,
	checkIfExists
};

export {
	milestoneService
};