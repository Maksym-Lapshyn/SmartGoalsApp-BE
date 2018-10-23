const factorContributor = (sequelize, Sequelize) => {
	const FactorContributor = sequelize.define('factorContributor', {
		factorId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'factor_id'
		},
		contributorId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'contributor_id'
		}
	}, {
		tableName: 'factors_contributors',
		timestamps: false
	});

	FactorContributor.associate = (models) => {
		models.Factor.belongsToMany(models.Contributor, {
			through: FactorContributor,
			as: 'contributors'
		});

		models.Contributor.belongsToMany(models.Factor, {
			through: FactorContributor,
			as: 'factors'
		});
	};

	return FactorContributor;
};

export default factorContributor;