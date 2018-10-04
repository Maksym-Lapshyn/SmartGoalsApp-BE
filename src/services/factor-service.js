import { factorRepository } from '../repositories/factor-repository';

const create = function (milestoneId, factor) {
	return factorRepository.create(milestoneId, factor);
};

const getAll = function () {
	return factorRepository.getAll();
};

const getAllByParent = function (milestoneId) {
	return factorRepository.getAllByParent(milestoneId);
};

const getSingleByParent = function (factorId, milestoneId) {
	return factorRepository.getSingleByParent(factorId, milestoneId);
};

const update = function(factorId, factor) {
	return factorRepository.update(factorId, factor);
};

const remove = function(factorId) {
	return factorRepository.remove(factorId);
};

const checkIfExists = function(factorId) {
	return factorRepository.checkIfExists(factorId);
};

const factorService = {
	create,
	getAll,
	getAllByParent,
	getSingleByParent,
	update,
	remove,
	checkIfExists
};

export {
	factorService
};