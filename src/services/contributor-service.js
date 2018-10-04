import { contributorRepository } from '../repositories-old/contributor-repository';

const create = function (factorId, milestoneId, goalId, contributor) {
	return contributorRepository.create(factorId, milestoneId, goalId, contributor);
};

const getAllByParent = function (factorId, milestoneId, goalId) {
	return contributorRepository.getAllByParent(factorId, milestoneId, goalId);
};

const getSingleByParent = function (contributorId, factorId, milestoneId, goalId) {
	return contributorRepository.getSingleByParent(contributorId, factorId, milestoneId, goalId);
};

const update = function(contributorId, contributor) {
	return contributorRepository.update(contributorId, contributor);
};

const remove = function(contributorId, factorId, milestoneId, goalId) {
	return contributorRepository.remove(contributorId, factorId, milestoneId, goalId);
};

const checkIfExists = function(contributorId, factorId, milestoneId, goalId) {
	return contributorRepository.checkIfExists(contributorId, factorId, milestoneId, goalId);
};

const contributorService = {
	create,
	getAllByParent,
	getSingleByParent,
	update,
	remove,
	checkIfExists
};

export {
	contributorService
};