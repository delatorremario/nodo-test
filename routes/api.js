var express = require('express');
var _ = require('lodash');

/* Mongoose Models */
var User = require('../models/User');

var router = express.Router();

// Index Graph
router.get('/', function (req, res) {
    res.render('index.ejs', { title: 'NODO - Graph' });
});

/* TODO: Retornar el objeto con el formato requerido por D3 desde los usuarios de la BD poblada */
router.get('/tree_data', function (req, res) {
    /* get Users*/
    User.find({}, (err, users) => {
        if (err) { console.log(err.message); return; }

        const nodes = _.map(users, user => {
            return { id: user.email, group: _.random(1, 6) }
        });

        const links = [];
        _.each(users, user => {
            const cantLinks = _.random(3, 6);
            const userslinked = _.sampleSize(users, cantLinks);
            _.each(userslinked, link => {
                links.push({ "source": user.email, "target": link.email, "value": _.random(1, 10) })
            });
        });
        const d3_data = { nodes: nodes, links: links }
        res.json(d3_data);
    })
});

/* TODO: Retornar el User de id=:id */
router.get('/users/:id', function (req, res) {
    User.search(req.params.id, function (err, user) {
        if (err) { console.error(err.message); return; }
        res.json(user && user[0] || {});
    })
});

module.exports = router;