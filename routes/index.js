var express = require('express'),
    router = express.Router(),
    passport = require('../lib/passport');

router.get('/', function(req,res){
    res.redirect('/login');
});

router.get('/login', function(req, res){
    res.render('login', title="Login");
});

router.post('/authorize', passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
});

// basic code using non-secure login via mongodb
// router.post('/authorize', function(req,res){
//     var db = req.db,
//         users = db.get('users'),
//         login = req.body;
//     users.findOne({'username':login.username,'password':login.password},{},function(err, doc){
//         if(doc.username != login.username){
//             console.log("Username does not exist");
//         } else {
//             if(doc.password != login.password){
//                 console.log("Incorrect password");
//             }
//             else{
//                 res.redirect('/users/' + doc.username);
//             }
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

    users.insert({'username': register.username, 'password': register.password, 'email': register.email}, function(err, inserted){

        console.log(register.username + ' registered!');
        res.redirect('/registered');
    });

});

router.get('/registered', function(req, res){
    res.send('You have successfully signed up. <a href="/login">Click here to login!</a>')
});

router.get('/users', function(req, res){
    var db = req.db,
        users = db.get('users');

    users.find({},['-password','-_id','-email'],function(err, docs){

        res.render('users', {title:"Users", userlist: docs});
    });
});

router.get('/users/:username', function(req, res){
    var db = req.db,
        users = db.get('users'),
        thisUser = req.params.username;

    users.findOne({'username': thisUser},['-_id','-password'],function(err, doc){
        
        res.render('profile', {title:"Profile of " + thisUser, user: doc});
    });    
});

router.get('/users/:username/edit', function(req, res){
    var db = req.db,
        users = db.get('users'),
        thisUser = req.params.username;

    users.findOne({'username': thisUser},['-_id','-password'],function(err, doc){

        res.render('profile-edit',{title:"Profile of " + thisUser, user: doc});
    });
});

router.post('/users/:username/update', function(req, res){
    var db = req.db,
        users = db.get('users'),
        update = req.body;

    users.update({'username': req.params.username},{'username': update.username, 'password': update.password, 'email': update.email}, function(err, updated){

        res.redirect('/users/' + update.username);
    });

});




module.exports = router;