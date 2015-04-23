// mongo setup
var mongo = require('mongodb'),
    db = require('monk')('localhost:27017/profile-app');
    
module.exports = db;