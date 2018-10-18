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
		'dialect': 'postgres',
		'operatorsAliases': false,
		'omitNull': true,
		'dialectOptions': {
			'ssl': true
		}
	}
};