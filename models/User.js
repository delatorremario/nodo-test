/* Mongoose - User */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	gender: String,
	"location.street": String,
	"location.city": String,
	"location.state": String,
	"location.postcode": String,
	"picture.large": String,
	"picture.medium": String,
	"picture.thumbnail": String
});

/* TODO: Métodos de clase */

module.exports = mongoose.model('User', UserSchema);