const factor = (sequelize, Sequelize) => {
	const Factor = sequelize.define('goal', {
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
		},
		milestoneId: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'milestones',
				key: 'id'
			}
		}
	}, {
		tableName: 'factors'
	});

	Factor.associate = (models) => {
		Factor.belongsTo(models.milestone, {
			foreignKey: 'id',
			onDelete: 'SET NULL'
		});

		Factor.hasMany(models.contributor, {
			foreignKey: 'id',
			as: 'contributors',
		});
	};

	return Factor;
};

export default factor;