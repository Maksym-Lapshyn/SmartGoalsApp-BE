import mongoose from 'mongoose';
import { goalSchema } from '../schemas/goal-schema';
import { mileStoneSchema } from '../schemas/milestone-schema';

// load all models for child schemas in order to be populated
mongoose.model('Milestone', mileStoneSchema);

const goal = mongoose.model('Goal', goalSchema);

const create = function (goal) {
	return new Promise((resolve, reject) => {
		if (!goal) {
			reject(new Error('Argument \'goal\' is invalid.'));
		}

		goal._id = undefined;

		goal.create(goal).then(newGoal => {
			resolve(newGoal);
		}).catch(err => {
			reject(err);
		});
	});
};

const getAll = function () {
	return new Promise((resolve, reject) => {
		goal.find()
			.then(goals => {
				resolve(goals);
			}).catch(err => {
				reject(err);
			});
	});
};

const getSingle = function (id) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error('Argument \'id\' is invalid.'));
		}

		const searchCriteria = {
			_id: id
		};

		goal
			.findOne(searchCriteria)
			.then(goal => {
				resolve(goal);
			})
			.catch(err => {
				reject(err);
			});
	});
};

const update = function(id, goal) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error('Argument \'id\' is invalid.'));
		} else if (!goal) {
			reject(new Error('Argument \'goal\' is invalid.'));
		}

		goal._id = undefined;

		goal.findByIdAndUpdate(id, goal).then(() => {
			resolve();
		}).catch(err => {
			next(err);
		});
	});
};

const remove = function(id) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject(new Error('Argument \'id\' is invalid.'));
		}

		goal.deleteOne({
			_id: id
		}).then(() => {
			resolve();
		}).catch(err => {
			next(err);
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