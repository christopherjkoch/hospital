var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require('./lib/database');

var indexRouter = require('./routes/index');
var patientsRouter = require('./routes/patients');
var medicationsRouter = require('./routes/medications');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/patients', patientsRouter);
app.use('/medications', medicationsRouter);

// Implement error handling middleware to avoid error handling in every route
// app.use(function(err, req, res, next){
//     if (err) {
//         //TODO: Post error to error hadling service or log error to file
//         console.log(err.message);
//         res.status(500).send(err);
//     }
// })

module.exports = app;
