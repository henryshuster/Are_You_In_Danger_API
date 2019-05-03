var express = require('express');
var router = express.Router();
var Shooting = require('../models/shooting');

router.get('/search', function(req,res){

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('index');
});

router.post('/shooting', function(req,res){
  var shooting=0;
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details', shooting);
});

router.post('/arrest', function(req,res){
  var arrest=0;
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details', arrest);
});

router.delete('/shooting/:id', function(req,res){
  var shooting=0;
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details', shooting);
});

router.delete('/arrest/:id', function(req,res){
  var arrest=0;
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user_details', arrest);
});

module.exports = router;
