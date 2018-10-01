import Sequelize from 'sequelize';
import config from './config/config';

const envConfig = config[process.env.NODE_ENV || 'development'];// eslint-disable-line no-undef
const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);

const models = {
	// Todo: sequelize.import('./models/todo'),
	// TodoItem: sequelize.import('./models/todoitem'),
};

Object.keys(models).forEach(modelName => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

const connectToDatabase = async function(){
	await sequelize.sync();
};

export {
	connectToDatabase
};