import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	milestones: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Milestone'
	}],
	tags: {
		type: [String]
	}
});

goalSchema.pre('find' | 'findOne', function () {
	this.populate('milestones');
});

export {
	goalSchema
};