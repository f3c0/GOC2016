define(['jquery', './Game'], function($, Game) {
	console.log('Offline module loaded.');

	var canvas = document.getElementById('game');

	var game = new Game(canvas);
	game.start();
});
