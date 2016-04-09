define(['jquery', 'communication/socket', 'communication/peerconnection'], function($, SocketHandler, PC) {
	var socketHandler = new SocketHandler();
	var connectionPromise = socketHandler.connect();
	var peerConnection = new PC();

	function messageManager(message) {
		console.log(message);
		switch(message.type) {
			case 'connect':
				peerConnection.init();
				peerConnection.setListeners(
					function() {
					//ONOPEN
					},
					function() {
					//ONCLOSE
					},
					function() {
					//ONMSG
					},
					function() {
					//ONCandidate
					console.log('Jött candidate!');
						socketHandler.sendMessage({
							 'type': 'candidate',
							 'room': config.roomName,
							 'candidate': message.candidate
						});
					}
				);
				if(message.start == true) {
					console.log('Crate offer!');
					peerConnection.createOffer(function(offer) {
						console.log('Sending offer:' + offer);
						socketHandler.sendMessage({
						    'type': 'offer',
						    'room': config.roomName,
							 'offer': offer
						});
					});
				}
				else {

				}
			break;
			case 'offer':
				console.log('Create answer!');
				peerConnection.createAnswer(message.offer, function(answer) {
					console.log('Sending answer:' + answer)
					socketHandler.sendMessage({
						 'type': 'answer',
						 'room': config.roomName,
						 'answer': answer
					});
				});
			break;
			case 'answer':
				console.log('Answer received');
				peerConnection.setLocalDescription(message.answer);
			break;
		}
	}

	connectionPromise.then(function() {
		socketHandler.messageCallback = messageManager;
		socketHandler.messageListener();
		socketHandler.sendMessage({
		    'type': 'connect',
		    'room': config.roomName
		});
	}, function() {
		console.log('Cannot connect to signalling server.');
	});

});
