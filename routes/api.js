var express = require('express');
var _ = require('lodash');
var d3_data = require('../public/json/dummy.json'); //Objeto de ejemplo, debe ser reemplazado por la llamada en la ruta

/* Mongoose Models */
var User = require('../models/User');

var router = express.Router();

// Index Graph
router.get('/', function(req, res) {
    res.render('index.ejs', { title: 'NODO - Graph' });
});

/* TODO: Retornar el objeto con el formato requerido por D3 desde los usuarios de la BD poblada */
router.get('/tree_data', function(req, res) {
    res.json(d3_data);
});

/* TODO: Retornar el User de id=:id */
router.get('/users/:id', function(req, res) {
	var user = {};
    
    res.json(user);
});

module.exports = router;