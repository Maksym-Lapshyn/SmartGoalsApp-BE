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

	Contributor.associate = (models) => {
		Contributor.belongsToMany(models.Factor, {
			through: 'factors_contributors',
			foreignKey: 'contributor_id',
			as: 'factors'
		});
	};

	return Contributor;
};

export default contributor;