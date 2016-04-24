var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var request = require('request')
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'evertonfc') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

app.post('/webhook/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
  var  event = req.body.entry[0].messaging[i];
  var  sender = event.sender.id;
    if (event.message && event.message.text) {
     var text = event.message.text;
      // Handle a text message from this sender
      console.log(text)
      sendTextMessage(sender, 'TUKKY : ' + text)
    }
  }
  res.sendStatus(200);
});

var token = "CAAPeosf3vJcBAHz1ZBGmix92Ot9lwDiZAGEyqqZCjC4w0iLpk1X5iZA4Hw8KwFnEluVYiYbYF8I8nI0ZAKeGVBV32uFriTYHL0ENxHw4p8HX1Yic5Dr8ddEz02AeVwBYq5q2Mj8W2HQxfNpJUiSZARW9eXh3hN6zsAl1TWLplxgTLcZB24hBK1BkXIxRfT34lsZD";

function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});