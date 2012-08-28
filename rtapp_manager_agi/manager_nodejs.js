//--------------------------------------------------------
//--------------------------------------------------------
//------------------   NODE SOCKET   ---------------------
//--------------------------------------------------------
//--------------------------------------------------------

var io = require('socket.io').listen(8080);

// VARIABLE GLOBAL
var channel;

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
	if(evt.channel != null ){
		channel = evt.channel;
	}
	//console.log(evt);
	io.sockets.emit('evento_recibido',evt);
	if(evt.event 
== 'newstate' && evt.channelstate == 5){
	        io.sockets.emit('ringing',evt);
	}
});
manager.on('response', function(res) {
});

manager.connect();


//-----------------------
//--- EVENTOS SOCKET IO--
//-----------------------
io.sockets.on('connection', function (socket) {
  console.log('Cliente Conectado');
  socket.on('llamar_a_103', function (data) {
	console.log('Llamando a la extension 103');
	manager.action({
		'action':'originate',
		'channel':'SIP/103',
		'context':'interno',
		'extension':103,
		'priority':1
	}, function(err, res) {});

  });
  socket.on('reproducir_monos', function (data) {
	manager.action({
		'Action':'AGI',
		'ActionID':'2312312',
		'Channel': channel,
		'Command':'EXEC Playback tt-monkeys',
		'CommandID':'12312313'
	}, function(err, res) {});
	console.log('Reproduciendo Monos en el canal: ' + channel);
  });
  socket.on('colgar', function (data) {
	manager.action({
		'Action':'Hangup',
		'Channel': data.channel
	}, function(err, res) { console.log(err); console.log(res);});
	console.log('Se ha colgado el canal: ' + data.channel);
  });

  socket.on('transferir_a_paco', function (data) {
	manager.action({
		'Action':'Redirect',
		'Channel': data.channel,
		'Context': 'interno',
		'Exten': 107,
		'Priority': 1
	}, function(err, res) { console.log(err); console.log(res);});
	console.log('Transferido la llamada del canal ' + data.channel + ' a Paco 107');
  });
});
