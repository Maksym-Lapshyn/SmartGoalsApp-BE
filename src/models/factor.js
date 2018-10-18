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

	Factor.associate = (models) => {
		Factor.belongsToMany(models.Milestone, {
			through: 'milestones_factors',
			foreignKey: 'factor_id',
			as: 'milestones'
		});

		Factor.belongsToMany(models.Contributor, {
			through: 'factors_contributors',
			foreignKey: 'factor_id',
			as: 'contributors'
		});
	};

	return Factor;
};

export default factor;