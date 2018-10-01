const express = require('express');
const bodyParser = require('body-parser');
const find = require('./routes/find');
const morgan = require('morgan');
const logger = require('../middleware/logger');
const app = express();
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');

//Database
var items = require('../database-mongo');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('tiny'));
app.use('/find', find);
app.use(logger);

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

