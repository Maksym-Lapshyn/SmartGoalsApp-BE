// Import the mongoose module
import Mongoose from 'mongoose';

const connectToDatabase = async () => {
	const url = 'mongodb://maksym:maksym2018@ds020218.mlab.com:20218/smartgoals';

	const options = {
		useNewUrlParser: true,
		promiseLibrary: global.Promise
	};

	await Mongoose.connect(url, options);
}

export {
	connectToDatabase
};