var express = require('express');
var app = express();

app.use('/static', express.static('src/public/'));


app.get('/', function(req, resp) {
	resp.sendFile(__dirname + '/src/view/index.html');
});

app.get('/offline', function(req, resp) {
	resp.sendFile(__dirname + '/src/view/game.html');
});

app.get('*', function(req, resp) {
	resp.sendFile(__dirname + '/src/view/index.html');
});

app.listen(8888, function () {
  console.log('Example app listening on port 8888!');
});
