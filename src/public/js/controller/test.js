define(['jquery', 'communication/socket'], function($, SocketHandler) {
	var socketHandler = new SocketHandler();
	var connectionPromise = socketHandler.connect();
	connectionPromise.then(function() {



		console.log('Kapcsolódott');
	}, function() {
		console.log('Nem kapcsolodott');
	});

});
