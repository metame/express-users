var express = require('express'),
    router = express.Router(),
    passport = require('../lib/passport'),
    bcrypt = require('bcrypt');

router.get('/', function(req,res){
    res.redirect('/login');
});

router.get('/login', function(req, res){
    res.render('login', title="Login");
});

// Authorize with passport
router.post('/authorize', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
});

// login route for auth via bcrypt
// router.post('/authorize', function(req,res){
//     var db = req.db,
//         users = db.get('users'),
//         login = req.body;
        
//     users.findOne({'username':login.username},{},function(err, doc){
//         if(err) console.error(err);
//         if(!doc){
//             console.log("Username does not exist");
//         } else {
//             bcrypt.compare(login.password, doc.password, function(err, auth) {
//                 if(err) console.error(err);
//                 if(auth) {
//                     res.redirect('/users/' + login.username);
//                 } else { 
//                     res.send('Incorrect Password'); 
//                 }
//             });
            
            
//         }
//     });
// });

/* //Uncomment to route to success landing page instead of profile after login
router.get('/success', function(req, res){
    res.send('You have successfully logged in!');
});*/

router.get('/register', function(req, res){
    res.render('register', title="Register");
});

router.post('/addUser', function(req, res){
    var db = req.db,
        users = db.get('users'),
        register = req.body;
    
    bcrypt.genSalt(10, function(err, salt) {
        if(err) console.error(err);
        bcrypt.hash(register.password, salt, function(err, hash) {
            if(err) console.error(err);
            users.insert({'username': register.username, 'password': hash, 'email': register.email}, function(err, inserted){
                if(err) res.send('Username or email already exists');
            }).success(function(doc){
                console.log(doc.username + ' registered!');
                res.redirect('/registered');
            });
        });
    });
});

router.get('/registered', function(req, res){
    res.send('You have successfully signed up. <a href="/login">Click here to login!</a>');
});

router.get('/users', ensureAuthenticated, function(req, res){
    var db = req.db,
        users = db.get('users');

    users.find({},['-password','-_id','-email'],function(err, docs){
        if(err) console.error(err);
        res.render('users', {title:"Users", userlist: docs});
    });
});

router.get('/users/:username', ensureAuthenticated, function(req, res){
    var db = req.db,
        users = db.get('users'),
        thisUser = req.params.username;

    users.findOne({'username': thisUser},['-_id','-password'],function(err, doc){
        if(err) console.error(err);
        res.render('profile', {title:"Profile of " + thisUser, user: doc});
    });    
});

router.get('/users/:username/edit', ensureAuthenticated, function(req, res){
    var db = req.db,
        users = db.get('users'),
        thisUser = req.params.username;

    users.findOne({'username': thisUser},['-_id','-password'],function(err, doc){
        if(err) console.error(err);
        res.render('profile-edit',{title:"Profile of " + thisUser, user: doc});
    });
});

router.post('/users/:username/update', ensureAuthenticated, function(req, res){
    var db = req.db,
        users = db.get('users'),
        update = req.body;
    
    bcrypt.genSalt(10, function(err, salt) {
        if(err) console.error(err);
        bcrypt.hash(update.password, salt, function(err, hash) {
            if(err) console.error(err);
            users.update({'username': req.params.username},{'username': update.username, 'password': update.password, 'email': update.email}, function(err, updated){
                if(err) console.error(err);
                res.redirect('/users/' + update.username);
            });
        });
    });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}



module.exports = router;