// express setup
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    port = process.env.PORT | 8080;

// require dependencies
var bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('./lib/passport'),
    db = require('./lib/mongodb');
    
// create unique indexes for username and password
var users = db.get('users');
users.index('username', {unique : true});
users.index('email', {unique : true});

// set up for passport sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.findById(id, function (err, user) {
    done(err, user);
  });
});

// Setup public directory for static serving
app.use(express.static(__dirname + 'public'));

// Use bodyParser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Passport initialize
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

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
