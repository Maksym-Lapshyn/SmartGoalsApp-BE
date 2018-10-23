import MilestoneFactor from './milestone-factor';
import FactorContributor from './factor-contributor';

const factor = (sequelize, Sequelize) => {
	const Factor = sequelize.define('factor', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: true
		},
		value: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				min: 0,
				max: 10
			}
		},
		weight: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				min: 0,
				max: 10
			}
		}
	}, {
		tableName: 'factors',
		timestamps: false
	});

	return Factor;
};

export default factor;