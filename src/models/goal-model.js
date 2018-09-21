import mongoose from 'mongoose';
import { goalSchema } from '../schemas/goal-schema';
import { mileStoneSchema } from '../schemas/milestone-schema';
import { factorSchema } from '../schemas/factor-schema';

mongoose.model('Factor', factorSchema);

const Milestone = mongoose.model('Milestone', mileStoneSchema);
const Goal = mongoose.model('Goal', goalSchema);

const create = function (goal) {
	return Goal.create(goal);
};

const getAll = function () {
	return Goal.find().populate({
		path: 'milestones',
		populate: {
			path: 'factors'
		}
	});
};

const getSingle = function (goalId) {
	return Goal.findById(goalId).populate({
		path: 'milestones',
		populate: {
			path: 'factors'
		}
	});
};

const update = function(goalId, goal) {
	return Goal.findByIdAndUpdate(goalId, goal);
};

const remove = function (goalId) {
	return Goal.findById(goalId).then(goal => {
		return Milestone.deleteMany({
			_id: {
				$in: goal.milestones
			}
		}).then(() => {
			return Goal.findByIdAndRemove(goalId);
		});
	});
};

const checkIfExists = function (id) {
	return Goal.find({_id: id}).then(goals => {
		return goals && goals.length > 0;
	});
};

const goalModel = {
	create: create,
	getAll: getAll,
	getSingle: getSingle,
	update: update,
	remove: remove,
	checkIfExists: checkIfExists
};

export {
	goalModel
};