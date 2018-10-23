import models from '../database/index';

const addToParent = function (milestoneId, factor) {
	factor.id = null;

	return models.Factor.create(factor).then(newFactor => {
		return models.MilestoneFactor.create({
			milestoneId: milestoneId,
			factorId: newFactor.id
		}).then(() => {
			return newFactor;
		});
	});
};

const getAll = function () {
	return models.Factor.findAll();
};

const getAllByParent = function (milestone) {
	return milestone.getFactors();
};

const linkToParent = function(milestoneId, factorId) {
	return models.MilestoneFactor.findCreateFind({
		where: {
			milestoneId: milestoneId,
			factorId: factorId
		}
	});
};

const unlinkFromParent = function(milestoneId, factorId) {
	return models.MilestoneFactor.destroy({
		where: {
			milestoneId: milestoneId,
			factorId: factorId
		}
	});
};

const getSingle = function (factorId) {
	return models.Factor.findOne({
		where: {
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
	addToParent,
	getAll,
	getSingle,
	getAllByParent,
	linkToParent,
	unlinkFromParent,
	update,
	remove,
	checkIfExists
};

export {
	factorRepository
};