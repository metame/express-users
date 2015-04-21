// express setup
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    port = process.env.PORT | 8080;

// require dependencies
var bodyParser = require('body-parser');

// mongo setup
var mongo = require('mongodb'),
    db = require('monk')('localhost:27017/profile-app');

// Setup public directory for static serving
app.use(express.static(__dirname + 'public'));

// Use bodyParser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// make db accessible to routes
app.use(function(req,res,next) {
    req.db = db;
    next();
});

app.use('/', require('./routes'));


server.listen(port, function(){
    console.log('Server listening on port ' + port);
});
