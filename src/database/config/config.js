module.exports = {// eslint-disable-line no-undef
	'development': {
		'username': 'maksym',
		'password': 'ggglolpvp',
		'database': 'smartgoalsapp',
		'host': '127.0.0.1',
		'port': '5432',
		'dialect': 'postgres',
		'operatorsAliases': false,
		'omitNull': true
	},
	'production': {
		'username': process.env.PG_USER,// eslint-disable-line no-undef
		'password': process.env.PG_PWD,// eslint-disable-line no-undef
		'database': process.env.PG_DB,// eslint-disable-line no-undef
		'host': process.env.PG_HOST,// eslint-disable-line no-undef
		'port': process.env.PG_PORT,// eslint-disable-line no-undef
		'dialect': 'postgres',
		'operatorsAliases': false,
		'omitNull': true
	}
};