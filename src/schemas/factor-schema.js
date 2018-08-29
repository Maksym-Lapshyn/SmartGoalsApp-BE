import mongoose from 'mongoose';
import { contributorSchema } from './contributor-schema';

const factorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
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
	contributors: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Contributor'
	}]
});

export {
	factorSchema
};