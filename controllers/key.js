var express = require('express');
var router = express.Router();
var Shooting = require('../models/shooting');
var Key = require('../models/apikey');

router.get('/key/new', function(req,res){
console.log("New API Key Requested");
res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('key');
});

router.post('/key/:id', function(req,res){
var user_data={};
user_data["email"]=req.body.email.trim();
user_data["password"]=req.body.password.trim();

var user = Key.createUser(user_data, function(u){
  user_data["key"]=Key.generateKey(user,function(z){
    console.log("API Key and user created");
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('index', {key:user_data});
  });
});
});

module.exports = router;
