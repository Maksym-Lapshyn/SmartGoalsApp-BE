import { find, create as _create } from '../models/goal';

var getAll = function () {
	return new Promise(function (resolve, reject) {
		find().then(goals => {
			resolve(goals);
		}).catch(error => {
			reject(error);
		});
	});
};

var create = function (newGoal) {
	return new Promise(function (resolve, reject) {
		_create(newGoal).then(goal => {
			resolve(goal);
		}).catch(error => {
			reject(error);
		});
	});
}

export const getAll = getAll;
export const create = create;