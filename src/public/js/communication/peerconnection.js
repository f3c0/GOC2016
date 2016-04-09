define(['communication/media'], function() {

	function peerConnection() {
		this.connection = false;
		this.channel = false;
	}

	peerConnection.prototype.init = function() {
		this.connection = new RTCPeerConnection({
		iceServers: [
			{urls: "stun:23.21.150.121"},
			{urls: "stun:stun.l.google.com:19302"},
			{urls: "turn:numb.viagenie.ca", credential: "webrtcdemo", username: "louis%40mozilla.com"}
		]
	 	});
	};

	peerConnection.prototype.setListeners = function(onOpen, onClose, onMSG, onCandidate) {
		var stateChange = function(event) {
			if (this.channel) {
			  var state = this.channel.readyState;

			  if (state === "open") {
				  onOpen();
				  console.log('Channel is now open:' + status);
			  } else {
				  onClose();
				  console.log('Channel changed state to:' + state);
			  }
		   }
		}

		this.channel = this.connection.createDataChannel('sendChannel');
		this.channel.onclose = stateChange.bind(this);
		this.channel.onopen = stateChange.bind(this);
		this.channel.ondatachannel = function (event) {
        this.dataChannel = event.channel;
        this.dataChannel.onmessage = function() {
			  console.log('OnMessgae');
		  };
	  }.bind(this);

		this.connection.onicecandidate = function (e) {
			if(e.candidate) {
				onCandidate(e.candidate);
			}
	 	};
	};

	peerConnection.prototype.setCandidate = function(candidate) {
		this.connection.addIceCandidate(candidate);
	};

	peerConnection.prototype.createOffer = function(onOffer) {
		this.connection.createOffer(function(offer) {
				this.setLocalDescription(offer);
				onOffer(offer);
		}.bind(this), function() {
			console.log('Failed to create offer.');
		});
	}

	peerConnection.prototype.createAnswer = function(offer, onAnswer) {
		var description = new RTCSessionDescription(offer);
		this.connection.setRemoteDescription(description);
		this.connection.createAnswer(function(answer) {
			this.setLocalDescription(answer);
			onAnswer(answer);
		}.bind(this), function() {
			console.log('Failed to create answer.');
		});
	}

	peerConnection.prototype.setLocalDescription = function(desc) {
		var description = new RTCSessionDescription(desc);
		this.connection.setLocalDescription(description);
		if(this.channel) {
			console.log('Channel', this.channel);
		}
	};

	return peerConnection;

});
