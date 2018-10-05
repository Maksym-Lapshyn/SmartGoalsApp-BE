import models from '../database/index';

const create = function (factorId, contributor) {
	contributor.id = null;
	contributor.factorId = factorId;

	return models.Contributor.create(contributor);
};

const getAll = function () {
	return models.Contributor.findAll();
};

const getAllByParent = function (factorId) {
	return models.Contributor.findAll({
		where: {
			factorId: factorId
		}
	});
};

const getSingle = function (contributorId) {
	return models.Contributor.find({
		where: {
			id: contributorId
		}
	});
};

const update = function(contributorId, factor) {
	return models.Contributor.update({
		name: factor.name,
		description: factor.description
	}, {
		where: {
			id: contributorId
		},
		returning: true
	}).then(([rowsUpdated, [updatedContributor]]) => { // eslint-disable-line no-unused-vars
		return updatedContributor;
	});
};

const remove = function(contributorId) {
	return models.Contributor.destroy({
		where: {
			id: contributorId
		}
	});
};

const checkIfExists = function (contributorId) {
	return models.Contributor.count({
		where: {
			id: contributorId
		}
	}).then(count => {
		return count !== 0;
	});
};

const contributorRepository = {
	create,
	getAll,
	getSingle,
	getAllByParent,
	update,
	remove,
	checkIfExists
};

export {
	contributorRepository
};