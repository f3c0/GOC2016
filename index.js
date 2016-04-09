var express = require('express');
var io = require('socket.io')(7777);
console.log('Socket server running on port 7777!');

var app = express();
var RoomHandler = require('./src/server/room.js');
var roomHandler = new RoomHandler();

app.use('/static', express.static('src/public/'));


app.get('/', function(req, resp) {
	resp.sendFile(__dirname + '/src/view/index.html');
});

app.get('/offline', function(req, resp) {
	resp.sendFile(__dirname + '/src/view/game.html');
});

app.get('/room/:game', function(req, resp) {
	resp.sendFile(__dirname + '/src/view/game.html');
});

app.get('*', function(req, resp) {
	resp.sendFile(__dirname + '/src/view/index.html');
});

app.listen(8888, function () {
  console.log('App listening on port 8888!');
});



io.on('connection', function(socket) {
	 socket.on('message', function(data) {
		if(typeof data.type !== 'undefined' && typeof data.room !== 'undefined') {
		    switch(data.type) {
				 	case 'connect':
						var message = {
							'type': 'connect',
							'result': false,
							'start': false,
							'id': socket.id,
						};
						if(roomHandler.isRoom(data.room)) {
							console.log('Van room!');
							var room = roomHandler.getRoom(data.room);
							if(room.users.length == 1) {
							    roomHandler.addUser(data.room, socket);
							    message.result = true;
								 var users = roomHandler.getUsersInRoom(data.room);
								 users.forEach(function(userSocket, key) {
									 userSocket.emit('message', {
										 'type': 'start',
										 'result': true,
										 'key': key
									 });
								 });
							}
			    		}
						else {
							console.log('Nincs room, csinálok!');
							roomHandler.addRoom(data.room);
							roomHandler.addUser(data.room, socket);
							message.result = true;
			    		}

			    		socket.emit('message', message);
			    	break;
					case 'data':
						console.log(data);
					    var message = {
							'type': 'data',
							'result': false,
							'data': {},
					    };

			    		if(typeof data.data !== 'undefined' && typeof data.room != 'undefined' && roomHandler.isRoom(data.room)) {
							var participants = roomHandler.getUsersInRoomExceptMe(data.room, socket.id);
							if(participants.length > 0) {
							    message.data = data.data;
							    message.result = true;
							    participants[0].emit('message', message);
							}
			    		}
			    	break;

		    }
		}
	 });

    socket.on('disconnect', function() {
		 roomHandler.deleteUser(socket.id);
    });
});
