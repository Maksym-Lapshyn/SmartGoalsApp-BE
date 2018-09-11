// Import the mongoose module
import Mongoose from 'mongoose';

const connectToDatabase = async function(){
	const url = 'mongodb://maksym:maksym2018@ds020218.mlab.com:20218/smartgoals';

	await Mongoose.connect(url, {
		useNewUrlParser: true
	});
};

export {
	connectToDatabase
};