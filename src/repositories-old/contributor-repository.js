import mongoose from 'mongoose';
import { factorRepository } from './factor-repository';
import { contributorSchema } from '../schemas/contributor-schema';

const Contributor = mongoose.model('Contributor', contributorSchema);

const create = function (factorId, milestoneId, goalId, contributor) {
	return factorRepository.getSingleByParent(factorId, milestoneId, goalId).then(factor => {
		return Contributor.create(contributor).then(newContributor => {
			factor.contributors.push(newContributor._id);

			return factorRepository.update(factorId, factor).then(() => {
				return newContributor;
			});
		});
	});
};

const getAllByParent = function (factorId, milestoneId, goalId) {
	return factorRepository.getSingleByParent(factorId, milestoneId, goalId).then(factor => {
		return factor.contributors;
	});
};

const getSingleByParent = function (contributorId, factorId, milestoneId, goalId) {
	return factorRepository.getSingleByParent(factorId, milestoneId, goalId).then(factor => {
		return factor.contributors.find(function(element) {
			return element._id.toString() === contributorId.toString();
		});
	});
};

const update = function(contributorId, contributor) {
	return Contributor.findById(contributorId).then(existingContributor => {
		existingContributor = Object.assign(existingContributor, contributor);

		return existingContributor.save();
	});
};

const remove = function(contributorId, factorId, milestoneId, goalId) {
	return factorRepository.getSingleByParent(contributorId, milestoneId, goalId).then(factor => {
		factor.contributors.pull(contributorId);

		return factorRepository.update(factorId, factor);
	}).then(() => {
		return Contributor.findByIdAndRemove(contributorId);
	});
};

const checkIfExists = function (contributorId, factorId, milestoneId, goalId) {
	return factorRepository.checkIfExists(factorId, milestoneId, goalId).then(factorExists => {
		if (!factorExists) {
			return false;
		} else {
			return Contributor.find({_id: contributorId}).then(contributors => {
				
				return contributors && contributors.length > 0;
			});
		}
	});
};

const contributorRepository = {
	create,
	getSingleByParent,
	getAllByParent,
	update,
	remove,
	checkIfExists
};

export {
	contributorRepository
};