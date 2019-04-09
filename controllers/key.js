var express = require('express');
var router = express.Router();

router.get('/key/new', function(req,res){

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('key');
});

router.post('/key/new', function(req,res){
var key=0;

res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('index', key);
});
