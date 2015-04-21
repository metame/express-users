var express = require('express'),
    router = express.Router();

router.get('/', function(req,res){
    res.redirect('/login');
});

router.get('/login', function(req, res){
    res.render('login', title="Login");
});

router.post('/authorize', function(req,res){
    var db = req.db,
        users = db.get('users'),
        login = req.body;
    users.findOne({'username':login.username,'password':login.password},{},function(err, doc){
        if(doc.username != login.username){
            console.log("Username does not exist");
        } else {
            if(doc.password != login.password){
                console.log("Incorrect password");
            }
            else{
                res.redirect('/success');
            }
        }
    });
});

router.get('/success', function(req, res){
    res.send('You have successfully logged in!');
});

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

    users.find({},{'username':1, '_id':0},function(err, docs){
        res.render('users', {title:"Users", userlist: docs});
    });
});

router.get('/users/:username', function(req, res){
    var thisUser = req.params.username;
    res.render('profile', title="Profile of " + thisUser);
});

router.get('/search', function(req, res){
    res.send('Search page');
});

module.exports = router;