import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

const Goal = mongoose.model('Goal', GoalSchema);

export default Goal