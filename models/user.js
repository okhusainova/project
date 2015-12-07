var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    role : "patient" | "admin",
	username: String,
	email: String,
	password: String,
	firstname: String,
	lastname: String,
	description: String
});

module.exports = mongoose.model('User', UserSchema);