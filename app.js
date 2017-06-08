'use strict';

const express = require('express');
const partials = require('express-partials');
const path = require('path');
const mongoose = require('mongoose');

// Mongoose
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/nodo-test')
    .then(console.log('connect mongodb'))
    .catch(err => console.error(err.message));

// Routes
const api = require('./routes/api');

const app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Statics Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

app.use('/', api);

// Run Server
app.listen(3000);