define(['lib/socket'], function(io) {

	var socketHandler = function() {
		this.connection = false;
	};

	socketHandler.prototype.connect = function() {
		return new Promise(function(resolve, reject) {
			this.connection = io(config.wsIP + ':' + config.wsPort);
			this.connection.on('connect', resolve);
			this.connection.on('connect_error', reject);
		}.bind(this));
	};

	socketHandler.prototype.messageListener = function() {
		this.connection.on('message', this.messageCallback);
	};

	socketHandler.prototype.messageCallback = function(){};


	socketHandler.prototype.sendMessage = function(data) {
		this.connection.emit('message', data);
	};

	return socketHandler;
});
