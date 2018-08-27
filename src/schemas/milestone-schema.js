import mongoose from 'mongoose';
import { factorSchema } from './factor-schema';

const mileStoneSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	plannedDate: {
		type: Date,
		required: true
	},
	actualDate: {
		type: Date
	},
	value: {
		type: Number,
		required: true,
		min: 0,
		max: 10
	},
	factors: {
		type: [factorSchema]
	}
});

export {
	mileStoneSchema
};