var express = require('express'),
    router = express.Router();

router.get('/', function(req,res){
    res.redirect('/login');
});

router.get('/login', function(req, res){
    res.render('login', title="Login");
});

router.get('/register', function(req, res){
    res.render('register', title="Register");
});

router.post('/addUser', function(req, res){

});

router.get('/users', function(req, res){
    var userList = ['test1','test2','test3','test4'];
    res.render('users', {title:"Users", userlist: userList});
});

router.get('/users/:username', function(req, res){
    var thisUser = req.params.username;
    res.render('profile', title="Profile of " + thisUser);
});

router.get('/search', function(req, res){
    res.send('Search page');
});

module.exports = router;