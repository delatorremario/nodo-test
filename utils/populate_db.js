var mongoose = require('mongoose');
const request = require("jsonrequest");
const _ = require("lodash");

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/nodo-test');

var User = require('../models/User');

/* TODO: Implementar la llamada HTTP para cargar los dummy-users desde 'https://randomuser.me/api/' en la BD (autoseed) */

User.find({}, (err, users) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('users count', users.length);

    if (users.length < 50) {

        console.log('populate db');
        request("https://randomuser.me/api/?seed=node-test&results=" + (50 - users.length), (err, data) => {
            if (err) { console.log(err.message); return; }
            
            _.each(data.results, user => {
                let instance = new User();
                instance.name = user.name.first + " " + user.name.last;
                instance.gender = user.gender;
                instance.location.street = user.location.street;
                instance.location.city = user.location.city;
                instance.location.state = user.location.state;
                instance.location.postcode = user.location.postcode;
                instance.email = user.email;
                instance.picture.large = user.picture.large;
                instance.picture.medium = user.picture.medium;
                instance.picture.thumbnail = user.picture.thumbnail;
                instance.save(function (err) {
                    if (err) console.error(err.message);
                });
            })
            console.log('Populated!')
        });
    }
    else console.log('limit of 50 users reached, not populate')
});