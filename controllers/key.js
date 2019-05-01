var express = require('express');
var router = express.Router();
var Shooting = require('../models/shooting');

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

Shooting.createUser(user_data, function(u){
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('index', {key:user_data});
});
});

module.exports = router;
