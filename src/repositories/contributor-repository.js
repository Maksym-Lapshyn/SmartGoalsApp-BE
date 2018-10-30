import models from '../database/index';

const addToParent = function (factorId, contributor) {
	contributor.id = null;

	return models.Contributor.create(contributor).then(newContributor => {
		return models.FactorContributor.create({
			factorId: factorId,
			contributorId: newContributor.id
		}).then(() => {
			return newContributor;
		});
	});
};

const getAll = function () {
	return models.Contributor.findAll();
};

const getAllByParent = function (factor) {
	return factor.getContributors();
};

const linkToParent = function(factorId, contributorId) {
	return models.FactorContributor.findCreateFind({
		where: {
			factorId: factorId,
			contributorId: contributorId
		}
	});
};

const unlinkFromParent = function(factorId, contributorId) {
	return models.FactorContributor.destroy({
		where: {
			factorId: factorId,
			contributorId: contributorId
		}
	});
};

const getSingle = function (contributorId) {
	return models.Contributor.findOne({
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
	addToParent,
	getAll,
	getSingle,
	linkToParent,
	unlinkFromParent,
	getAllByParent,
	update,
	remove,
	checkIfExists
};

export {
	contributorRepository
};