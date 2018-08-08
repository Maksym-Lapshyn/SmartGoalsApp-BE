import { Schema, model } from 'mongoose';

const GoalSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

export default model('Goal', GoalSchema);