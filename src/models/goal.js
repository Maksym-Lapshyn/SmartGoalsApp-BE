const goal = (sequelize, DataTypes) => {
	const Goal = sequelize.define('goal', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'start_date'
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'end_date'
		}
	}, {
		tableName: 'goals',
		timestamps: false
	});

	Goal.associate = (models) => {
		Goal.hasMany(models.Milestone, {
			foreignKey: 'goalId',
			as: 'milestones',
		});
	};

	return Goal;
};

export default goal;