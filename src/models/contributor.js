import FactorContributor from './factor-contributor';

const contributor = (sequelize, Sequelize) => {
	const Contributor = sequelize.define('contributor', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		}
	}, {
		tableName: 'contributors',
		timestamps: false
	});

	return Contributor;
};

export default contributor;