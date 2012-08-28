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
	console.log('Evento Recicido');
	//console.log(evt);
	if(evt.event == 'hangup'){
		console.log('Se ha colgado la llamada');
		io.sockets.emit('news','se ha colgado la llamada');
	}
});

manager.on('response', function(res) {

});

manager.connect();

