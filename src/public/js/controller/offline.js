define(['jquery', 'game/Game'], function($, Game) {
	console.log('Offline module loaded.');

	var canvas = document.getElementById('game');

	var game = new Game(canvas, function(player, index) {
		console.info(player);
		console.info(index);
		console.log(player);
	});

	// 
	// var dataManager = new DataManager();
	// dataManager.onPartnerJoin = function() {
	// 	console.log('Ready');
	// 	dataManager.sendData('alma');
	// }
	//
	// dataManager.onData = function(data) {
	// 	console.log('DATA erk');
	// 	console.log(data);
	// }



	//game.getPlayer(0).cordinate.y
	game.start();
});
