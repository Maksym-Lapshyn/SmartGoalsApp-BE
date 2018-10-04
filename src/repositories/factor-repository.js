import models from '../database/index';

const create = function (milestoneId, factor) {
	factor.id = null;
	factor.milestoneId = milestoneId;

	return models.Factor.create(factor);
};

const getAll = function () {
	return models.Factor.findAll();
};

const getAllByParent = function (milestoneId) {
	return models.Factor.findAll({
		where: {
			milestoneId: milestoneId
		}
	});
};

const getSingleByParent = function (factorId, milestoneId) {
	return models.Factor.find({
		where: {
			milestoneId: milestoneId,
			id: factorId
		}
	});
};

const update = function(factorId, factor) {
	return models.Factor.update({
		name: factor.name,
		description: factor.description,
		weight: factor.weight,
		value: factor.value,
	}, {
		where: {
			id: factorId
		},
		returning: true
	}).then(([rowsUpdated, [updatedFactor]]) => { // eslint-disable-line no-unused-vars
		return updatedFactor;
	});
};

const remove = function(factorId) {
	return models.Factor.destroy({
		where: {
			id: factorId
		}
	});
};

const checkIfExists = function (factorId) {
	return models.Factor.count({
		where: {
			id: factorId
		}
	}).then(count => {
		return count !== 0;
	});
};

const factorRepository = {
	create,
	getAll,
	getSingleByParent,
	getAllByParent,
	update,
	remove,
	checkIfExists
};

export {
	factorRepository
};