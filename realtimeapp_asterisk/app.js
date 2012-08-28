var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// Para Enviar un mensaje a todos los sockets abiertos
//io.sockets.emit('news', { will: 'hola'});
