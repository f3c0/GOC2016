requirejs.config({
    baseUrl: 'static/js',
    paths: {
        'jquery': 'lib/jquery',
        'page': 'lib/router',
		  'gameController': 'controller/game',
		  'indexController': 'controller/index'
    }
});


require(['jquery', 'page'], function($, page) {

	page('/', function(){
		//Index
	  require(['gameController']);
	});


	//Init the routing process
	page();

});
