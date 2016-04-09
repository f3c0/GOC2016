define(['communication/socket'], function(SocketHandler) {
	function dataManager() {
		this.master = false;
		this.socketHandler = new SocketHandler();
		this.init();
	}

	dataManager.prototype.init = function() {
		var connectionPromise = this.socketHandler.connect();

		connectionPromise.then(function() {
			this.socketHandler.messageCallback = function(msg) {
				this.resolveMSG(msg);
			}.bind(this);

			this.socketHandler.messageListener();

			this.socketHandler.sendMessage({
				'room': config.roomName,
				'type': 'connect'
			});
		}.bind(this));
	}

	dataManager.prototype.resolveMSG = function(msg) {
		switch(msg.type){
			case 'start':
				this.startGame(msg.key);
			break;
			case 'data':
				this.onData(msg.data);
			break;
		}
	}

	dataManager.prototype.startGame = function() {

	}

	dataManager.prototype.sendData = function(data) {
		this.socketHandler.sendMessage({
			'room': config.roomName,
			'type': 'data',
			'data': data
		});
	}

	dataManager.prototype.onData = function(data) {
	}

	return dataManager;

});
