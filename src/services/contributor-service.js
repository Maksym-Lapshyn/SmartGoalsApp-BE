import { contributorRepository } from '../repositories/contributor-repository';

const create = function (factorId, contributor) {
	return contributorRepository.create(factorId, contributor);
};

const getAll = function() {
	return contributorRepository.getAll();
};

const getAllByParent = function (factorId) {
	return contributorRepository.getAllByParent(factorId);
};

const getSingle = function (contributorId) {
	return contributorRepository.getSingle(contributorId);
};

const update = function(contributorId, contributor) {
	return contributorRepository.update(contributorId, contributor);
};

const remove = function(contributorId) {
	return contributorRepository.remove(contributorId);
};

const checkIfExists = function(contributorId) {
	return contributorRepository.checkIfExists(contributorId);
};

const contributorService = {
	create,
	getAll,
	getAllByParent,
	getSingle,
	update,
	remove,
	checkIfExists
};

export {
	contributorService
};