module.exports = {// eslint-disable-line no-undef
	'development': {
		'username': 'pmwjiwgaxxigwr',//'maksym',
		'password': '44dd5094bb5dd83cb00bfe783aeafc368d7a34e673dc526998254dc458caaa90',//'ggglolpvp',
		'database': 'dfmd8bflt75472',//'smartgoalsapp',
		'host': 'ec2-54-217-235-137.eu-west-1.compute.amazonaws.com',//'127.0.0.1',
		'port': '5432',
		'dialect': 'postgres',
		'operatorsAliases': false,
		'omitNull': true,
		'dialectOptions': {
			'ssl': true
		}
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