var express = require('express');
var fs = require('fs');

var app = express();

var port = 3000;

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());

app.use(require('./controllers/key'));
app.use(require('./controllers/data'));

app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  console.log('Request- default route');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});
