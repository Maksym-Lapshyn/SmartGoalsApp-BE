import mongoose from 'mongoose';
import { goalSchema } from '../schemas/goal-schema';
import { mileStoneSchema } from '../schemas/milestone-schema';

// load all models for child schemas in order to be populated in parents
const Milestone = mongoose.model('Milestone', mileStoneSchema);
const Goal = mongoose.model('Goal', goalSchema);

const create = function (goal) {
	return new Promise((resolve, reject) => {
		if (!goal) {
			reject(new Error(`Argument goal: "${goal}" is invalid.`));
		}

		Goal.create(goal).then(newGoal => {
			resolve(newGoal);
		}).catch(err => {
			reject(err);
		});
	});
};

const getAll = function () {
	return new Promise((resolve, reject) => {
		Goal.find().populate('milestones').then(goals => {
			resolve(goals);
		}).catch(err => {
			reject(err);
		});
	});
};

const getSingle = function (id) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error(`Argument id: "${id}" is invalid.`));
		}

		Goal.findById(id).populate('milestones').then(goal => {
			resolve(goal);
		}).catch(err => {
			reject(err);
		});
	});
};

const update = function(id, goal) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error(`Argument id: "${id}" is invalid.`));
		} else if (!goal) {
			reject(new Error(`Argument goal: "${goal}" is invalid.`));
		}

		Goal.findByIdAndUpdate(id, goal).then(() => {
			resolve();
		}).catch(err => {
			reject(err);
		});
	});
};

const remove = function(id) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error(`Argument id: "${id}" is invalid.`));
		}

		Goal.findById(id).then(goal => {
			const deleteCriteria = {
				_id: { 
					$in: goal.milestones
				}
			};

			Milestone.deleteMany(deleteCriteria).then(() => {
				Goal.findByIdAndRemove(id).then(() => {
					resolve();
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			});
		});
	});
};

const goalModel = {
	create: create,
	getAll: getAll,
	getSingle: getSingle,
	update: update,
	remove: remove
};

export {
	goalModel
};