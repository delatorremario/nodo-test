var http = require('http');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/nodo-test');

var User = require('../models/User');

/* TODO: Implementar la llamada HTTP para cargar los dummy-users desde 'https://randomuser.me/api/' en la BD (autoseed) */