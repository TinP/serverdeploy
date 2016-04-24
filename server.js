var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'evertonfc') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

app.listen(3000);