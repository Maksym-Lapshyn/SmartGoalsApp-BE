const contributor = (sequelize, Sequelize) => {
	const Contributor = sequelize.define('contributor', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		factorId: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'factor_id',
			references: {
				model: 'factors',
				key: 'id'
			}
		}
	}, {
		tableName: 'contributors',
		timestamps: false
	});

	Contributor.associate = (models) => {
		Contributor.belongsTo(models.Factor, {
			foreignKey: 'factorId',
			onDelete: 'SET NULL'
		});
	};

	return Contributor;
};

export default contributor;