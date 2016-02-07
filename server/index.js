var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var webaudio = require('webaudio')
var fs = require('fs');

app.listen(80);

function handler (req, res) {
	console.log(req.url)
	var serve = req.url
	if(req.url == "/")
		serve = "index.html"

  fs.readFile(__dirname + '/public/' + serve,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + serve);
    }

    res.writeHead(200);
    res.end(data);
  });
}

console.log("starting")

io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  console.log("connected")
  socket.on('potentiometer', function (data) {
    // console.log(data);
    io.emit('potentiometerReceived', data)
  });
});


/*
var express = require('express')
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);

console.log("starting")
 
// function sine(time, i){
//   return Math.sin(time * Math.PI * 2 * 440)
// }

// var channel = webaudio(sine);
 
// channel.play()

io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  console.log("BBB connected")
  socket.on('potentiometer', function (data) {
    console.log(data);
  });
});

console.log("test")
// app.use(express.static('public'));
app.listen(80);
console.log("test2")
*/