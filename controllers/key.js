var express = require('express');
var router = express.Router();

router.get('/key/new', function(req,res){
console.log("New API Key Requested");
res.status(200);
res.setHeader('Content-Type', 'text/html');
res.render('key', {feedback:1});
});

router.post('/key/user', function(req,res){
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
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('index');
}
});

module.exports = router;
