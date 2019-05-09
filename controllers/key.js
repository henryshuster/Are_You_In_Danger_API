// var express = require('express');
// var router = express.Router();
// var Shooting = require('../models/shooting');
// var Key = require('../models/apikey');
//
// class user{
//   constructor(email,key,password){
//     this.email = email;
//     this.key = key;
//     this.password = password;
//
// }}
//
// router.get('/key/new', function(req,res){
// console.log("New API Key Requested");
// res.status(200);
// res.setHeader('Content-Type', 'text/html');
// res.render('key');
// });
//
// router.post('/key/:id', function(req,res){
// var user_data={};
// user_data["email"]=req.body.email.trim();
// user_data["password"]=req.body.password.trim();
//
// var user = Key.createUser(user_data, function(u){
//   user_data["key"]=Key.generateKey(user,function(z){
//     console.log("API Key and user created");
//     res.status(200);
//     res.setHeader('Content-Type', 'text/html');
//     res.render('index', {key:user_data});
//   });
// });
// });
//
// module.exports = router;

var express = require('express');
var router = express.Router();
var Key = require('../models/apikey');

router.get('/key/new', function(req,res){
console.log("New API Key Requested");
res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('key', {feedback:1});
});

router.post('/key/user/', function(req,res){
  console.log("POST Request: /key/user")
  key=0;
  var u = {
    "email": req.body.email,
    "password": req.body.password,
  };
  console.log(u.email+", "+u.password)
  if(u.email==""||u.password==""){
    console.log("INPUT ERROR")
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('key', {feedback:-1});//finish feedback
  }
  else{
    console.log("New user: "+u.email);
    // key=1; //generate unique key
      u["key"]=Key.generateKey(u,function(){
        console.log("API Key and user created");
        res.status(200);
        res.setHeader('Content-Type', 'text/html');
        res.render('index',{user:u});
        //res.render('index', {user:u});
      });
  }
});//post
module.exports = router;
