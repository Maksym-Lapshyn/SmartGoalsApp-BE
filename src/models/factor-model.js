import mongoose from 'mongoose';
import { milestoneModel } from './milestone-model';
import { factorSchema } from '../schemas/factor-schema';

const Factor = mongoose.model('Factor', factorSchema);

const create = function (milestoneId, factor) {
	if (!milestoneId) {
		throw new Error(`Argument milestone id: "${milestoneId}" is invalid.`);
	} else if (!factor) {
		throw new Error('Argument factor is invalid.');
	}

	return milestoneModel.getSingle(milestoneId).then(milestone => {
		return Factor.create(factor).then(newFactor => {
			milestone.factors.push(newFactor._id);

			return milestoneModel.update(milestoneId, milestone).then(() => {
				return newFactor;
			});
		});
	});
};

const getAllByParent = function (milestoneId) {
	if (!milestoneId) {
		throw new Error(`Argument milestone id: "${milestoneId}" is invalid.`);
	}

	return milestoneModel.getSingle(milestoneId).then(milestone => {
		return milestone.factors;
	});
};

const getSingleByParent = function (id, milestoneId) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	} else if (!milestoneId) {
		throw new Error(`Argument milestone id: "${milestoneId}" is invalid.`);
	}

	return milestoneModel.getSingle(milestoneId).then(milestone => {
		return milestone.factors.find(function(element) {
			return element._id.toString() === id.toString();
		});
	});
};

const update = function(id, factor) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	} else if (!factor) {
		throw new Error(`Argument factor: "${factor}" is invalid.`);
	}

	return Factor.findByIdAndUpdate(id, factor);
};

const remove = function(id, milestoneId) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	} if (!milestoneId) {
		throw new Error(`Argument milestone id: "${milestoneId}" is invalid.`);
	}

	return milestoneModel.getSingle(milestoneId).then(milestone => {
		milestone.factors.pull(id);

		return milestoneModel.update(milestoneId, milestone);
	}).then(() => {
		return Factor.findByIdAndRemove(id);
	});
};

const checkIfExists = function (id) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	}

	Factor.find({_id: id}).then(factors => {
		return factors && factors.length !== 0;
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