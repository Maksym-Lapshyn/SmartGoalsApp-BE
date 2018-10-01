const contributor = (sequelize, Sequelize) => {
	const Contributor = sequelize.define('goal', {
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
		tableName: 'contributors'
	});

	Contributor.associate = (models) => {
		Contributor.belongsTo(models.factor, {
			foreignKey: 'id',
			onDelete: 'CASCADE'
		});
	};

	return Contributor;
};

export default contributor;