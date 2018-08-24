import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

export {
	goalSchema
};