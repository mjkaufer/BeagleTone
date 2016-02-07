var app = require('http').createServer(handler)
var io = require('socket.io')(app);

app.listen(80);

function handler (req, res){
  res.writeHead(200);
  res.end("boo");
}
console.log("starting")
io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  console.log("BBB connected")
  socket.on('potentiometer', function (data) {
    console.log(data);
  });
});