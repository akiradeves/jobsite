// importing modules
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// User Model Definition
const userSchema = new Schema({
	first_name: { type: String, required: true},
	last_name: { type: String, required: true},
	email: { type: String, required: true},
	organization: { type: String, required: true},
	password: { type: String, required: true},
	role: { type: String, required: true}
});

userSchema.index({email: 1}, {unique: true});

// Schema Middleware to Encrypt password
userSchema.pre('save', function(next) {
	// Ensure password is new or modified before applying encryption
	if (!this.isModified('password'))
		return next();

	// Apply encryption
	bcrypt.hash(this.password, null, null, (err, hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	});
});

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// Export Module/Schema
module.exports = mongoose.model('User', userSchema);