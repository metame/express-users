var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    port = process.env.PORT | 8080;

app.use(express.static(__dirname + 'public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// mongo setup
// var MongoClient = require('mongodb').MongoClient();
// MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
//     "use strict";
//     if(err) throw err;
// });

app.use('/', require('./routes'));


server.listen(port, function(){
    console.log('Server listening on port ' + port);
});
