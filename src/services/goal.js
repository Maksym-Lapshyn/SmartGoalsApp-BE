import {  goalModel } from '../models/goal';

const create = function (goal) {
	return new Promise((resolve, reject) => {
		goalModel.create(goal).then(newGoal => {
			resolve(newGoal);
		}).catch(err => {
			reject(err);
		});
	});
};

const getAll = function () {
	return new Promise((resolve, reject) => {
		goalModel.getAll().then(goals => {
			resolve(goals);
		}).catch(err => {
			reject(err);
		});
	});
};

const getSingle = function (id) {
	return new Promise((resolve, reject) => {
		goalModel.getSingle(id).then(goal => {
			resolve(goal);
		}).catch(err => {
			reject(err);
		});
	});
};

const update = function(id, goal) {
	return new Promise((resolve, reject) => {
		goalModel.update(id, goal).then(() => {
			resolve();
		}).catch(err => {
			next(err);
		});
	});
};

const remove = function(id) {
	return new Promise((resolve, reject) => {
		goalModel.remove(id).then(() => {
			resolve();
		}).catch(err => {
			next(err);
		});
	});
};

const goalService = {
	create: create,
	getAll: getAll,
	getSingle: getSingle,
	update: update,
	remove: remove
};

export {
	goalService
};