import { milestoneRepository } from '../repositories/milestone-repository';

const create = function (goalId, milestone) {
	return milestoneRepository.createMilestone(goalId, milestone);
};

const getAllByParent = function (goalId) {
	return milestoneRepository.getAllMilestonesByParent(goalId);
};

const getSingleByParent = function (milestoneId, goalId) {
	return milestoneRepository.getSingleMilestoneByParent(milestoneId, goalId);
};

const update = function(milestoneId, milestone) {
	return milestoneRepository.updateMilestone(milestoneId, milestone);
};

const remove = function(milestoneId, goalId) {
	return milestoneRepository.removeMilestone(milestoneId, goalId);
};

const checkIfExists = function(milestoneId, goalId) {
	return milestoneRepository.checkIfMilestoneExists(milestoneId, goalId);
};

const milestoneService = {
	create,
	getAllByParent,
	getSingleByParent,
	update,
	remove,
	checkIfExists
};

export {
	milestoneService
};