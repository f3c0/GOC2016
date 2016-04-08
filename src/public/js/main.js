requirejs.config({
    baseUrl: 'static/js',
    paths: {
        'jquery': 'lib/jquery',
        'page': 'lib/router',
		  'gameController': 'controller/game',
		  'indexController': 'controller/index',
		  'offlineController': 'controller/offline'
    }
});


require(['jquery', 'page'], function($, page) {

	page('/', function(){
		//Index
	  require(['indexController']);
	});


	page('/game/:channel', function(context){
		//Gane
	  require(['gameController']);
	});

	page('/offline', function(context){
		//Game
	  require(['offlineController']);
	});


	//Init the routing process
	page();

});
