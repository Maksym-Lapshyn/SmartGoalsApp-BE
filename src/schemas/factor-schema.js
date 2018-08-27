import mongoose from 'mongoose';
import { contributorSchema } from './contributor-schema';

const factorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	value: {
		type: Number,
		required: true,
		min: 0,
		max: 10
	},
	weight: {
		type: Number,
		required: true,
		min: 0,
		max: 10
	},
	contributors: {
		type: [contributorSchema]
	}
});

export {
	factorSchema
};