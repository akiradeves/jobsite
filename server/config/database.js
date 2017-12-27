const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
	server: 'mongodb://db_admin:adminadmin@ds121456.mlab.com:21456/',
	secret: crypto,//new Buffer(crypto, 'base64'),
	db: 'idhaystack'
}