import mongoose from 'mongoose';

const mileStoneSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
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
	factors: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Factor'
	}]
});

export {
	mileStoneSchema
};