import models from '../database/index';

const create = function (goal) {
	goal.id = null;

	return models.Goal.create(goal);
};

const getAll = function () {
	return models.Goal.findAll();
};

const getSingle = function (goalId) {
	return models.Goal.findOne({
		where: {
			id: goalId
		},
		include: [{
			model: models.Milestone,
			as: 'milestones'
		}]
	});
};

const update = function (goalId, goal) {
	return models.Goal.update({
		name: goal.name,
		description: goal.description,
		startDate: goal.startDate,
		endDate: goal.endDate
	}, {
		where: {
			id: goalId
		},
		returning: true
	}).then(([rowsUpdated, [updatedGoal]]) => { // eslint-disable-line no-unused-vars
		return updatedGoal;
	});
};

const remove = function (goalId) {
	return models.Goal.destroy({
		where: {
			id: goalId
		}
	});
};

const checkIfExists = function (goalId) {
	return models.Goal.count({
		where: {
			id: goalId
		}
	}).then(count => {
		return count !== 0;
	});
};

const goalRepository = {
	create,
	getAll,
	getSingle,
	update,
	remove,
	checkIfExists
};

export {
	goalRepository
};