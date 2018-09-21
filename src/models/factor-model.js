import mongoose from 'mongoose';
import { milestoneModel } from './milestone-model';
import { factorSchema } from '../schemas/factor-schema';

const Factor = mongoose.model('Factor', factorSchema);

const create = function (milestoneId, goalId, factor) {
	return milestoneModel.getSingleByParent(milestoneId, goalId).then(milestone => {
		return Factor.create(factor).then(newFactor => {
			console.log(newFactor._id);
			milestone.factors.push(newFactor._id);
			console.log(milestone);

			return milestoneModel.update(milestoneId, milestone).then(() => {
				console.log(milestone);
				return newFactor;
			});
		});
	});
};

const getAllByParent = function (milestoneId, goalId) {
	return milestoneModel.getSingleByParent(milestoneId, goalId).then(milestone => {
		return milestone.factors;
	});
};

const getSingleByParent = function (factorId, milestoneId, goalId) {
	return milestoneModel.getSingleByParent(milestoneId, goalId).then(milestone => {
		return milestone.factors.find(function(element) {
			return element._id.toString() === factorId.toString();
		});
	});
};

const update = function(factorId, factor) {
	return Factor.findByIdAndUpdate(factorId, factor);
};

const remove = function(factorId, milestoneId, goalId) {
	return milestoneModel.getSingleByParent(milestoneId, goalId).then(milestone => {
		milestone.factors.pull(factorId);

		return milestoneModel.update(milestoneId, milestone);
	}).then(() => {
		return Factor.findByIdAndRemove(factorId);
	});
};

const checkIfExists = function (factorId, milestoneId, goalId) {
	return milestoneModel.checkIfExists(milestoneId, goalId).then(milestoneExists => {
		if (!milestoneExists) {
			return false;
		} else {
			return Factor.find({_id: factorId}).then(factors => {
				return factors && factors.length > 0;
			});
		}
	});
};

const factorModel = {
	create: create,
	getSingleByParent: getSingleByParent,
	getAllByParent: getAllByParent,
	update: update,
	remove: remove,
	checkIfExists: checkIfExists
};

export {
	factorModel
};