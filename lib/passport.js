var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('./mongodb');

passport.use(new LocalStrategy(
  function(username, password, done) {
    var users = db.get('users');
    users.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;