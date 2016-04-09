define(['jquery'], function($) {
	console.log('Index module loaded.');
	$('.btn-enter').on('click', function() {
		var roomName = prompt('Enter a room name:');
		window.location.href = '/room/' + roomName;
	});
});
