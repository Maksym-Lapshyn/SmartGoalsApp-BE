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
		},
		milestoneId: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'milestone_id',
			references: {
				model: 'milestones',
				key: 'id'
			}
		}
	}, {
		tableName: 'factors',
		timestamps: false
	});

	Factor.associate = (models) => {
		Factor.belongsTo(models.Milestone, {
			foreignKey: 'milestoneId',
			onDelete: 'SET NULL'
		});

		Factor.hasMany(models.Contributor, {
			foreignKey: 'factorId',
			as: 'contributors',
		});
	};

	return Factor;
};

export default factor;