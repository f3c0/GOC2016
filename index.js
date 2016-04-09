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
							    message.start = true;
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
					case 'offer':
					    var message = {
							'type': 'offer',
							'result': false,
							'id': socket.id,
					    };

			    		if(typeof data.offer !== 'undefined' && typeof data.room != 'undefined' && roomHandler.isRoom(data.room)) {
							console.log('Jött egy offer!');
							var participants = roomHandler.getUsersInRoomExceptMe(data.room, socket.id);
							if(participants.length > 0) {
								 console.log('Offer: Több mint egy participant.');
							    message.offer = data.offer;
							    message.result = true;
							    participants[0].emit('message', message);
							}
			    		}
			    	break;
					case 'answer':
						var message = {
						'type': 'answer',
						'result': false,
						'id': socket.id
						};

			    	if(typeof data.answer !== 'undefined' && typeof data.room !== 'undefined' && roomHandler.isRoom(data.room)) {
						var participants = roomHandler.getUsersInRoomExceptMe(data.room, socket.id);
						console.log('Jött egy answer.');
						if(participants.length > 0) {
						    message.answer = data.answer;
						    message.result = true;
						    console.log('Answer: Több mint egy participant.');
						    participants[0].emit('message', message);
						}
			    	}
			    break;
				 case 'candidate':
				    var message = {
						'type': 'candidate',
						'result': false,
						'id': socket.id
				    };

					if(typeof data.candidate !== 'undefined' && typeof data.room !== 'undefined' && roomHandler.isRoom(data.room)) {
						var participants = roomHandler.getUsersInRoomExceptMe(data.room, socket.id);
						console.log('Jött egy candidate.');
						if(participants.length > 0) {
							message.candidate = data.candidate;
							message.result = true;
							console.log('Candidate: Több mint egy participant.');
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
