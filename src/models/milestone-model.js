import mongoose from 'mongoose';
import { goalModel } from './goal-model';
import { mileStoneSchema } from '../schemas/milestone-schema';

const Milestone = mongoose.model('Milestone', mileStoneSchema);

const create = function (goalId, milestone) {
	return goalModel.getSingle(goalId).then(goal => {
		return Milestone.create(milestone).then(newMilestone => {
			goal.milestones.push(newMilestone._id);

			return goalModel.update(goalId, goal).then(() => {
				return newMilestone;
			});
		});
	});
};

const getAllByParent = function (goalId) {
	return goalModel.getSingle(goalId).then(goal => {
		return goal.milestones;
	});
};

const getSingleByParent = function (milestoneId, goalId) {
	return goalModel.getSingle(goalId).then(goal => {
		return goal.milestones.find(function(element) {
			return element._id.toString() === milestoneId.toString();
		});
	});
};

const update = function(milestoneId, milestone) {
	return Milestone.findById(milestoneId).then(existingMilestone => {
		existingMilestone = Object.assign(existingMilestone, milestone);

		return existingMilestone.save();
	});
};

const remove = function(milestoneId, goalId) {
	return goalModel.getSingle(goalId).then(goal => {
		goal.milestones.pull(milestoneId);

		return goalModel.update(goalId, goal);
	}).then(() => {
		return Milestone.findByIdAndRemove(milestoneId);
	});
};

const checkIfExists = function (milestoneId, goalId) {
	return goalModel.checkIfExists(goalId).then(goalExists => {
		if (!goalExists) {
			return false;
		} else {
			return Milestone.find({_id: milestoneId}).then(milestones => {
				return milestones && milestones.length > 0;
			});
		}
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