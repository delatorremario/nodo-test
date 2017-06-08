/* Mongoose - User */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema   = new Schema({
	name: String
	/* TODO: Agregar los campos necesarios para el funcionamiento de la app */	
});

/* TODO: Métodos de clase */

module.exports = mongoose.model('User', UserSchema);