import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

const Goal = mongoose.model('Goal', GoalSchema);

const create = function (goal) {
	return new Promise((resolve, reject) => {
		if (!goal) {
			reject(new Error('Argument \'goal\' is invalid.'));
		}

		goal._id = undefined;

		Goal.create(goal).then(newGoal => {
			resolve(newGoal);
		}).catch(err => {
			reject(err);
		});
	});
};

const getAll = function () {
	return new Promise((resolve, reject) => {
		Goal.find().then(goals => {
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

		Goal.findById(id).then(goal => {
			resolve(goal);
		}).catch(err => {
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

		Goal.findByIdAndUpdate(id, goal).then(() => {
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

		Goal.deleteOne({
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
}