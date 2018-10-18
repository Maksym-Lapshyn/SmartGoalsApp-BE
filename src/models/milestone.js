const milestone = (sequelize, Sequelize) => {
	const Milestone = sequelize.define('milestone', {
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
			allowNull: false,
			field: 'planned_date'
		},
		actualDate: {
			type: Sequelize.DATE,
			allowNull: true,
			field: 'actual_date'
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
			field: 'goal_id',
			references: {
				model: 'goals',
				key: 'id'
			}
		}
	}, {
		tableName: 'milestones',
		timestamps: false
	});

	Milestone.associate = (models) => {
		Milestone.belongsTo(models.Goal, {
			foreignKey: 'goalId',
			onDelete: 'CASCADE'
		});

		Milestone.belongsToMany(models.Factor, {
			through: 'milestones_factors',
			as: 'factors',
			foreignKey: 'milestone_id'
		});
	};

	return Milestone;
};

export default milestone;