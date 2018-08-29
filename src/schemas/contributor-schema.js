import mongoose from 'mongoose';

const contributorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
});

export {
	contributorSchema
};