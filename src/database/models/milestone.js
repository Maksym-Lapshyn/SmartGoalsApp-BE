const milestone = (sequelize, Sequelize) => {
	const Milestone = sequelize.define('goal', {
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
		plannedDate: {
			type: Sequelize.DATE,
			allowNull: false
		},
		actualDate: {
			type: Sequelize.DATE,
			allowNull: true
		},
		value: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 10
			}
		},
		goalId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'goals',
				key: 'id'
			}
		}
	}, {
		tableName: 'milestones'
	});

	Milestone.associate = (models) => {
		Milestone.belongsTo(models.goal, {
			foreignKey: 'goalId',
			onDelete: 'CASCADE'
		});

		Milestone.hasMany(models.factor, {
			foreignKey: 'id',
			as: 'factors',
		});
	};

	return Milestone;
};

export default milestone;