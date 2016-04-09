requirejs.config({
    baseUrl: '/static/js',
    paths: {
        'jquery': 'lib/jquery',
        'page': 'lib/router',
		  'gameController': 'controller/game',
		  'indexController': 'controller/index',
		  'offlineController': 'controller/offline',
		  'testController': 'controller/test'
    }
});

var config = {
	'wsIP':'10.0.105.101',
	'wsPort':'7777',
	'context': {}
};

require(['jquery', 'page'], function($, page) {

	page('/', function(){
		//Index
	  require(['indexController']);
	});


	page('/game/:channel', function(context){
		//Gane
		config.context = context;
	  require(['gameController']);
	});

	page('/offline', function(){
		//Game
	  require(['offlineController']);
	});

	page('/room/:room', function(context){
		//Game
		config.roomName = context.params.room;
	  require(['gameController']);
	});


	//Init the routing process
	page();

});
