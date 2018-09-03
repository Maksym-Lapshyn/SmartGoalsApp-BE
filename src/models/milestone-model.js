import mongoose from 'mongoose';
import { goalModel } from './goal-model';
import { mileStoneSchema } from '../schemas/milestone-schema';
import { factorSchema } from '../schemas/factor-schema';

// load all models for child schemas in order to be populated in parents
mongoose.model('Factor', factorSchema);

const Milestone = mongoose.model('Milestone', mileStoneSchema);

const create = function (goalId, milestone) {
	return new Promise((resolve, reject) => {
		if (!goalId) {
			reject(new Error(`Argument goal id: "${goalId}" is invalid.`));
		} else if (!milestone) {
			reject(new Error(`Argument milestone: "${milestone}" is invalid.`));
		}

		milestone._id = undefined;

		Milestone.create(milestone).then(newMilestone => {
			goalModel.getSingle(goalId).then(goal => {
				goal.milestones.push(milestone._id);

				goalModel.update(goalId, goal).then(() => {
					resolve(newMilestone);
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	});
};

const getAllByParent = function (goalId) {
	return new Promise((resolve, reject) => {
		if (!goalId) {
			reject(new Error(`Argument goal id: "${goalId}" is invalid.`));
		}

		goalModel.getSingle(goalId).then(goal => {
			resolve(goal.milestones);
		}).catch(err => {
			reject(err);
		});
	});
}

const getSingle = function (id) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error(`Argument id: "${id}" is invalid.`));
		}

		const searchCriteria = {
			_id: id
		};

		Milestone.findOne(searchCriteria).then(milestone => {
			resolve(milestone);
		}).catch(err => {
			reject(err);
		});
	});
};

const update = function(id, milestone) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error(`Argument id: "${id}" is invalid.`));
		} else if (!milestone) {
			reject(new Error(`Argument milestone: "${milestone}" is invalid.`));
		}

		milestone._id = undefined;

		Milestone.findByIdAndUpdate(id, milestone).then(() => {
			resolve();
		}).catch(err => {
			reject(err);
		});
	});
};

const remove = function(id, goalId) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error(`Argument id: "${id}" is invalid.`));
		} if (!goalId) {
			reject(new Error(`Argument goal id: "${goalId}" is invalid.`));
		}

		const searchCriteria = {
			_id: goalId
		};

		goalModel.findOne(searchCriteria).then(goal => {
			const deleteCriteria = {
				_id: id
			};

			goal.milestones.pull(deleteCriteria);

			goalModel.update(goalId, goal).then(updatedGoal => {
				Milestone.deleteOne(deleteCriteria).then(() => {
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

const milestoneModel = {
	create: create,
	getSingle: getSingle,
	getAllByParent: getAllByParent,
	update: update,
	remove: remove
};

export {
	milestoneModel
};