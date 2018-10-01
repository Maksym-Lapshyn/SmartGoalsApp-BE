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
			allowNull: false
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'goals'
	});

	Goal.associate = (models) => {
		Goal.hasMany(models.milestone, {
			foreignKey: 'id',
			as: 'milestones',
		});
	};

	return Goal;
};

export default goal;