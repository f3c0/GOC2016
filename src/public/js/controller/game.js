define(['jquery', 'game/Game', 'lib/lodash', 'communication/datamanager', 'game/Coordinate'], function ($, Game, lodash, DataManager, Coordinate) {
	console.log('Game module loaded.');

	var isStarted = false;
	var gamerKey = null;
	var otherGamerKey = function(i) {
		if(i === 0) { return 1; } else { return 0; }
	}
	var master = function(i) {
		if(i === 0) { return true; } else { return false; }
	}
	var canvas = document.getElementById('game');
	var dataManager = new DataManager();
	var game = {};

	dataManager.startGame = function(key) {
		isStarted = true;
		gamerKey = key;
		otherGamerKey = otherGamerKey(gamerKey);
		master = master(gamerKey);

		console.log('Start, OtherGamerKey, GamerKey ' + otherGamerKey + gamerKey+master);
		game.addInputProcessor(gamerKey);
		game.start();
	}

	var sendToParter = lodash.throttle(function(players, ball) {

		var data = {
			'coordinate': players[gamerKey].coordinate,
			'direction': players[gamerKey].direction
		};

		if(master === true) {
			data.ballCoordtinate = ball.coordinate;
		}

		dataManager.sendData(data);

	}, 100, {'trailing': true })

	dataManager.onData = function(data) {

		if(isStarted === true) {
			game.getPlayer(otherGamerKey).coordinate.x = data.coordinate.x;
			game.getPlayer(otherGamerKey).coordinate.y = data.coordinate.y;
			game.getPlayer(otherGamerKey).direction = data.direction;

			if(master === false) {
				game.moveBall(new Coordinate(data.ballCoordtinate.x, data.ballCoordtinate.y));
				game.draw();
			}
		}
	}
	game = new Game(canvas, function(players, ball) {
		if(isStarted === true) {
			//dataManager.sendData(data);
			sendToParter(players, ball);
		}
	}, master);

//False a labda mozgast kihagyja
//game.moveBall(new Cordinate(x, y))


});
