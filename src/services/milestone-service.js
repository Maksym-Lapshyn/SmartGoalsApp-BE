import {  milestoneModel } from '../models/milestone-model';

const create = function (goalId, milestone) {
	return new Promise((resolve, reject) => {
		milestoneModel.create(goalId, milestone).then(newMilestone => {
			resolve(newMilestone);
		}).catch(err => {
			reject(err);
		});
	});
};

const getAllByParent = function (goalId) {
	return new Promise((resolve, reject) => {
		milestoneModel.getAllByParent(goalId).then(milestones => {
			resolve(milestones);
		}).catch(err => {
			reject(err);
		});
	});
};

const getSingleByParent = function (id, goalId) {
	return new Promise((resolve, reject) => {
		milestoneModel.getSingleByParent(id, goalId).then(milestone => {
			resolve(milestone);
		}).catch(err => {
			reject(err);
		});
	});
};

const update = function(id, milestone) {
	return new Promise((resolve, reject) => {
		milestoneModel.update(id, milestone).then(() => {
			resolve();
		}).catch(err => {
			reject(err);
		});
	});
};

const remove = function(id, goalId) {
	return new Promise((resolve, reject) => {
		milestoneModel.remove(id, goalId).then(() => {
			resolve();
		}).catch(err => {
			reject(err);
		});
	});
};

const milestoneService = {
	create: create,
	getAllByParent: getAllByParent,
	getSingleByParent: getSingleByParent,
	update: update,
	remove: remove
};

export {
	milestoneService
};