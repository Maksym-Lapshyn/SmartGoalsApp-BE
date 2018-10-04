import mongoose from 'mongoose';
import { goalRepository } from './goal-repository';
import { mileStoneSchema } from '../schemas/milestone-schema';

const Milestone = mongoose.model('Milestone', mileStoneSchema);

const create = function (goalId, milestone) {
	return goalRepository.getSingle(goalId).then(goal => {
		return Milestone.create(milestone).then(newMilestone => {
			goal.milestones.push(newMilestone._id);

			return goalRepository.update(goalId, goal).then(() => {
				return newMilestone;
			});
		});
	});
};

const getAllByParent = function (goalId) {
	return goalRepository.getSingle(goalId).then(goal => {
		return goal.milestones;
	});
};

const getSingleByParent = function (milestoneId, goalId) {
	return goalRepository.getSingle(goalId).then(goal => {
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
	return goalRepository.getSingle(goalId).then(goal => {
		goal.milestones.pull(milestoneId);

		return goalRepository.update(goalId, goal);
	}).then(() => {
		return Milestone.findByIdAndRemove(milestoneId);
	});
};

const checkIfExists = function (milestoneId, goalId) {
	return goalRepository.checkIfExists(goalId).then(goalExists => {
		if (!goalExists) {
			return false;
		} else {
			return Milestone.find({_id: milestoneId}).then(milestones => {
				return milestones && milestones.length > 0;
			});
		}
	});
};

const milestoneRepository = {
	create,
	getSingleByParent,
	getAllByParent,
	update,
	remove,
	checkIfExists
};

export {
	milestoneRepository
};