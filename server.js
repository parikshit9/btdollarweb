var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


var port = process.env.PORT || 80;

app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  //Path to your main file
  res.sendfile(path.join('./public/views/index.html')); 
});

app.listen(port);
console.log('app running on ' + port);
