define(['jquery', 'communication/datamanager'], function($, DataManager) {


	var dataManager = new DataManager();
	dataManager.onPartnerJoin = function() {
		console.log('Ready');
		dataManager.sendData('alma');
	}

	dataManager.onData = function(data) {
		console.log('DATA erk');
		console.log(data);
	}






});
