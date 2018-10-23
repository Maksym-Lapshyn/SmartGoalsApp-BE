const milestoneFactor = (sequelize, Sequelize) => {
	const MilestoneFactor = sequelize.define('milestoneFactor', {
		milestoneId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'milestone_id'
		},
		factorId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'factor_id'
		}
	}, {
		tableName: 'milestones_factors',
		timestamps: false
	});

	MilestoneFactor.associate = (models) => {
		models.Milestone.belongsToMany(models.Factor, {
			through: MilestoneFactor,
			as: 'factors'
		});

		models.Factor.belongsToMany(models.Milestone, {
			through: MilestoneFactor,
			as: 'milestones'
		});
	};

	return MilestoneFactor;
};

export default milestoneFactor;