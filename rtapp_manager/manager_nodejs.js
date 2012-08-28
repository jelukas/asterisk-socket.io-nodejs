//--------------------------------------------------------
//--------------------------------------------------------
//------------------   NODE SOCKET   ---------------------
//--------------------------------------------------------
//--------------------------------------------------------

var io = require('socket.io').listen(8080);


//--------------------------------------------------------
//--------------------------------------------------------
//------------------   ASTERISK MANAGER   ----------------
//--------------------------------------------------------
//--------------------------------------------------------


var manager = new (require('./asterisk'))(5038, 'localhost');

manager.on('connect', function(err, val) {
    manager.authenticate('nodejs', 'nodejs');
});

manager.on('close', function() {
});

manager.on('error', function(err) {
});

manager.on('managerevent', function(evt) {
	console.log('Evento Recibido');
	//console.log(evt);
	io.sockets.emit('evento_recibido',evt);
	if(evt.event = 'newstate' && evt.channelstate == 5){
	        io.sockets.emit('ringing',evt);
	}
});
manager.on('response', function(res) {
});

manager.connect();
