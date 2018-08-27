import mongoose from 'mongoose';
import { mileStoneSchema } from './milestone-schema';

const goalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	milestones: {
		type: [mileStoneSchema]
	},
	tags: {
		type: [String]
	}
});

export {
	goalSchema
};