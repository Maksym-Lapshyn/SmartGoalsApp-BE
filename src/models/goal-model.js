import mongoose from 'mongoose';
import { goalSchema } from '../schemas/goal-schema';
import { mileStoneSchema } from '../schemas/milestone-schema';
import { factorSchema } from '../schemas/factor-schema';

mongoose.model('Factor', factorSchema);
const Milestone = mongoose.model('Milestone', mileStoneSchema);
const Goal = mongoose.model('Goal', goalSchema);

const create = function (goal) {
	if (!goal) {
		throw new Error('Argument goal is invalid.');
	}

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

const getSingle = function (id) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	}

	return Goal.findById(id).populate({
		path: 'milestones',
		populate: {
			path: 'factors'
		}
	});
};

const update = function(id, goal) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	} else if (!goal) {
		throw new Error('Argument goal is invalid.');
	}

	return Goal.findByIdAndUpdate(id, goal);
};

const remove = function (id) {
	if (!id) {
		throw new Error(`Argument id: "${id}" is invalid.`);
	}

	return Goal.findById(id).then(goal => {
		return Milestone.deleteMany({
			_id: {
				$in: goal.milestones
			}
		}).then(() => {
			return Goal.findByIdAndRemove(id);
		});
	});
};

const checkIfExists = function (id) {
	return Goal.find({_id: id}).then(goals => {
		return goals && goals.length !== 0;
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