import mongoose from 'mongoose';
import { milestoneRepository } from './milestone-repository';
import { factorSchema } from '../schemas/factor-schema';

const Factor = mongoose.model('Factor', factorSchema);

const create = function (milestoneId, goalId, factor) {
	return milestoneRepository.getSingleByParent(milestoneId, goalId).then(milestone => {
		return Factor.create(factor).then(newFactor => {
			milestone.factors.push(newFactor._id);

			return milestoneRepository.update(milestoneId, milestone).then(() => {
				return newFactor;
			});
		});
	});
};

const getAllByParent = function (milestoneId, goalId) {
	return milestoneRepository.getSingleByParent(milestoneId, goalId).then(milestone => {
		return milestone.factors;
	});
};

const getSingleByParent = function (factorId, milestoneId, goalId) {
	return milestoneRepository.getSingleByParent(milestoneId, goalId).then(milestone => {
		return milestone.factors.find(function(element) {
			return element._id.toString() === factorId.toString();
		});
	});
};

const update = function(factorId, factor) {
	return Factor.findById(factorId).then(existingFactor => {
		existingFactor = Object.assign(existingFactor, factor);

		return existingFactor.save();
	});
};

const remove = function(factorId, milestoneId, goalId) {
	return milestoneRepository.getSingleByParent(milestoneId, goalId).then(milestone => {
		milestone.factors.pull(factorId);

		return milestoneRepository.update(milestoneId, milestone);
	}).then(() => {
		return Factor.findByIdAndRemove(factorId);
	});
};

const checkIfExists = function (factorId, milestoneId, goalId) {
	return milestoneRepository.checkIfExists(milestoneId, goalId).then(milestoneExists => {
		if (!milestoneExists) {
			return false;
		} else {
			return Factor.find({_id: factorId}).then(factors => {
				
				return factors && factors.length > 0;
			});
		}
	});
};

const factorRepository = {
	create,
	getSingleByParent,
	getAllByParent,
	update,
	remove,
	checkIfExists
};

export {
	factorRepository
};