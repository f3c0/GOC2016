define(['communication/media'], function() {

	function peerConnection() {
		this.connection = false;
	}

	peerConnection.prototype.init = function() {
		this.connection = new RTCPeerConnection();
	};

	peerConnection.prototype.setListeners = function(onOpen, onClose, onMSG, onCandidate) {
		var stateChange = function(event) {
			if (sendChannel) {
			  var state = sendChannel.readyState;

			  if (state === "open") {
				  onOpen();
				  console.log('Channel is now open:' + status);
			  } else {
				  onClose();
				  console.log('Channel changed stat to:' + state);
			  }
		   }
		}

		this.connection.onclose = stateChange;
		this.connection.onopen = stateChange;
		this.connection.onicecandidate = function (e) {
			if(e.candidate) {
				onCandidate(candidate);
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
		}.bind(this));
	}

	peerConnection.prototype.createAnswer = function(offer, onAnswer) {
		var description = new RTCSessionDescription(offer);
		this.connection.setRemoteDescription(description);
		this.connection.createAnswer(function(answer) {
			this.setLocalDescription(answer);
			onAnswer(answer);
		}.bind(this));
	}

	peerConnection.prototype.setLocalDescription = function(desc) {
		var description = new RTCSessionDescription(desc);
		this.connection.setLocalDescription(description);
	};
	
});
