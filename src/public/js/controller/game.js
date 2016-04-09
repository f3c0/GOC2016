define(['jquery', 'game/Game'], function ($, Game) {
	console.log('Game module loaded.');

	var canvas = document.getElementById('game');

	var game = new Game(canvas, function(player, index) {
		console.info(player);
		console.info(index);
	});
	game.start();
});
