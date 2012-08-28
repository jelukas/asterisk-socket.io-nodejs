var  fs = require('fs');

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var app = require('http').createServer(handler);
var  io = require('socket.io').listen(app);

app.listen(8080);


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// Para Enviar un mensaje a todos los sockets abiertos
//io.sockets.emit('news', { will: 'hola'});
