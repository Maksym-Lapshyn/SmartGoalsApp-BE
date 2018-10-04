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
			foreignKey: 'id',
			onDelete: 'CASCADE'
		});
	};

	return Contributor;
};

export default contributor;