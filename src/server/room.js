var Lodash = require('lodash');

function RoomHandler() {
    this.rooms = [];
}

RoomHandler.prototype.isRoom = function(roomName) {
    var roomKey = this.findRoom(roomName);
    if(roomKey !== -1) {
	return true;
    }
    else {
	return false;
    }
};

RoomHandler.prototype.addUser = function (roomName, socket) {
    var roomKey = this.findRoom(roomName);
    this.rooms[roomKey].users.push(socket);
};

RoomHandler.prototype.addRoom = function (name) {
    if(this.findRoom(name) === -1) {
	this.rooms.push({
	    'name': name,
	    'users': []
	});
    }
};

RoomHandler.prototype.getUsersInRoomExceptMe = function(roomName, socketId) {
    var roomKey = this.findRoom(roomName);
    var users = [];
    if(roomKey !== -1) {
	this.rooms[roomKey].users.forEach(function(socket) {
	    if(socket.id != socketId) {
		users.push(socket);
	    }
	});
    }
    return users;
};

RoomHandler.prototype.getUsersInRoom = function(roomName) {
    var roomKey = this.findRoom(roomName);
    return this.rooms[roomKey].users;
};

RoomHandler.prototype.findRoom = function(name) {
    return Lodash.findIndex(this.rooms, function(room) {
	return (room.name === name) ? true : false;
    });
};

RoomHandler.prototype.getRoom = function(name) {
    var roomKey = this.findRoom(name);
    if(roomKey !== -1) {
	return this.rooms[roomKey];
    }
    return false;
};


RoomHandler.prototype.getUser = function(roomName, socketId) {
    var roomKey = this.findRoom(roomName);
    var user = false;
    var key = false;
    if(roomKey !== -1) {
	this.rooms[roomKey].users.forEach(function(socket, i) {
	    if(socket.id == socketId) {
		user = socket;
		key = i;
	    }
	});
	if(user !== false) {
	    return {
		'roomKey': roomKey,
		'userKey': key,
		'user': user,
	    };
	}
    }
    return false;

};

RoomHandler.prototype.deleteUser = function(socketId) {
    var roomName = '';
    this.rooms.forEach(function(room) {
	var userInfo = this.getUser(room.name, socketId);
	if(userInfo !== false) {
	    this.rooms[userInfo.roomKey].users.splice(userInfo.userKey, 1);
	    if(this.rooms[userInfo.roomKey].users.length == 0) {
		console.log("Removing room: " + this.rooms[userInfo.roomKey].name);
		this.rooms.splice(userInfo.roomKey, 1);
	    }
	    roomName = this.rooms[userInfo.roomKey];
	}
    }.bind(this));
    return roomName;
};

module.exports = RoomHandler;
