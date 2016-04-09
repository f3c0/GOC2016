function initGetUserMedia() {
    navigator.mediaDevices =
    navigator.mediaDevices  ||
    (function() {
	if(isGetUserMediaSupport()) {
	    return {
		'getUserMedia': function(options){
		    return new Promise(function(resolve, reject) {
			getUserMedia().call(navigator, options, resolve, reject);
		    });
		}
	    };
	}
	return null;
    })();
};

function getUserMediaPromise(resolve, reject) {
    return new Promise(function(resolve, reject){
	if(isGetUserMediaSupport()) {
	    resolve(getUserMedia());
	}
	else {
	    reject();
	}
    });
};

function getUserMedia() {
    return  navigator.getUserMedia ||
	    navigator.mozGetUserMedia ||
	    navigator.webkitGetUserMedia ||
	    navigator.msGetUserMedia;
};

function isGetUserMediaSupport() {
    return !!(
	    navigator.getUserMedia ||
	    navigator.mozGetUserMedia ||
	    navigator.webkitGetUserMedia ||
	    navigator.msGetUserMedia
	);
};

function isGetUserMediaAvailable () {
    return (typeof navigator.mediaDevices !== null);
};

function initWebRTCGlobals () {
    window.RTCPeerConnection =	window.RTCPeerConnection ||
				window.mozRTCPeerConnection ||
				window.webkitRTCPeerConnection ||
				window.msRTCPeerConnection;
    window.RTCSessionDescription =  window.RTCSessionDescription ||
				    window.mozRTCSessionDescription ||
				    window.webkitRTCSessionDescription ||
				    window.msRTCSessionDescription;
    window.RTCIceCandidate =	window.RTCIceCandidate ||
				window.mozRTCIceCandidate ||
				window.webkitRTCIceCandidate ||
				window.msRTCIceCandidate;
}

function isRTCPeerConnection() {
    return !!window.RTCPeerConnection;
}

function isRTCSessionDescription() {
    return !!window.RTCSessionDescription;
}





initGetUserMedia();
initWebRTCGlobals();
