import Goal from '../models/goal';

var getAllGoals = function () {
	return new Promise(function (resolve, reject) {
		Goal.find().then(goals => {
			resolve(goals);
		}).catch(error => {
			reject(error);
		});
	});
};

var createGoal = function (newGoal) {
	return new Promise(function (resolve, reject) {
		Goal.create(newGoal).then(goal => {
			resolve(goal);
		}).catch(error => {
			reject(error);
		});
	});
}

export {
	getAllGoals,
	createGoal
}