import mongoose from 'mongoose';
import { goalModel } from './goal-model';
import { mileStoneSchema } from '../schemas/milestone-schema';

const Milestone = mongoose.model('Milestone', mileStoneSchema);

const create = function (goalId, milestone) {
	if (!goalId) {
		throw new Error(`Argument goal id: "${goalId}" is invalid.`);
	} else if (!milestone) {
		throw new Error(`Argument milestone is invalid.`);
	}

	return goalModel.getSingle(goalId).then(goal => {
		return Milestone.create(milestone);
	}).then(newMilestone => {
		goal.milestones.push(newMilestone._id);

		return goalModel.update(goalId, goal).then(() => {
			return newMilestone;
		});
	});
};

const getAllByParent = function (goalId) {
	if (!goalId) {
		throw new Error(`Argument goal id: "${goalId}" is invalid.`);
	}

	return goalModel.getSingle(goalId).then(goal => {
		return goal.milestones;
	});
};

const getSingleByParent = function (id, goalId) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	} else if (!goalId) {
		throw new Error(`Argument goal id: "${goalId}" is invalid.`);
	}

	return goalModel.getSingle(goalId).then(goal => {
		return goal.milestones.find(function(element) {
			return element._id.toString() === id.toString();
		});
	});
};

const update = function(id, milestone) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	} else if (!milestone) {
		throw new Error(`Argument milestone: "${milestone}" is invalid.`);
	}

	return Milestone.findByIdAndUpdate(id, milestone);
};

const remove = function(id, goalId) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	} if (!goalId) {
		throw new Error(`Argument goal id: "${goalId}" is invalid.`);
	}

	return goalModel.getSingle(goalId).then(goal => {
		goal.milestones.pull(deleteCriteria);

		return goal;
	}).then(goal => {
		return goalModel.update(goalId, goal);
	}).then(() => {
		return Milestone.findByIdAndRemove(id);
	});
};

const checkIfExists = function (id) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	}

	Milestone.find({_id: id}).then(milestones => {
		return milestones && milestones.length !== 0;
	});
};

const milestoneModel = {
	create: create,
	getSingleByParent: getSingleByParent,
	getAllByParent: getAllByParent,
	update: update,
	remove: remove,
	checkIfExists: checkIfExists
};

export {
	milestoneModel
};