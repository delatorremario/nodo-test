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

UserSchema.statics.search = function search (email, cb) {
  return this.where('email', new RegExp(email, 'i')).exec(cb);
}

module.exports = mongoose.model('User', UserSchema);