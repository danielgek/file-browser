explorerApp.service('adbService', ['$log','$rootScope', '$mdToast', function($log, $rootScope, $mdToast){
	
	
	

	var adbService = {};
	var Promise = require('bluebird');
	adbService.adb = require('adbkit');
	adbService.client = adbService.adb.createClient();
	adbService.gplay = require('google-play-scraper');



	adbService.fileList = [];
	adbService.appsList = [];
	adbService.activeDevice = "";
	adbService.props = {};
	adbService.stats = {};
	adbService.traking = false;

	adbService.track = function(){
		if(!adbService.traking){
			adbService.traking = true;
			return adbService.client.trackDevices()
				.then(function(tracker) {
					tracker.on('add', function(device) {
						adbService.activeDevice = device.id;
						$mdToast.show($mdToast.simple().content('New Device Connected!'));
						$log.debug('Device %s was plugged in', device.id)
					})
					tracker.on('remove', function(device) {
						$mdToast.show($mdToast.simple().content('Device Disconnected!'));
						$log.debug('Device %s was unplugged', device.id)
					})
					tracker.on('end', function() {
						$log.debug('Tracking stopped')
					})
				})
				.catch(function(err) {
					$log.error('Something went wrong:', err)
				});
		}
	}

	
	
	adbService.getFileList = function(path){
		$log.debug(path);
		
		return adbService.client.readdir(adbService.activeDevice, path)
			.then(function(files) {
				adbService.fileList = files;   	
				$log.debug(files); 
			});

	};

	adbService.getAppsList = function(){
	  
		return adbService.client.getPackages(adbService.activeDevice)
			.then(function(apps) {
				//adbService.appsList = apps;    
				$log.debug(apps); 
				return Promise.map(apps, function(appId){
					console.log(appId);
					return adbService.gplay.app({ appId: appId, country: 'pt' })
					  	.then(function(app){
					  		console.log(app);
					  		if(app.icon.indexOf('http:') < 0 && app.icon.indexOf('https:') < 0){
					  			app.icon = 'http:' + app.icon;
					  		}
					  		adbService.appsList.push(app);
					    	
					    	console.log(app.icon);
					  	}).catch(function(reason) {
					  		console.log(reason);
					  	});
				});
			});

	};

	adbService.getStats = function(){
		return adbService.client.openProcStat(adbService.activeDevice)
			.then(function(stats) {
				adbService.stats = stats;
				$log.debug(stats); 
			}).catch(function(err) {
				console.error('Something went wrong:', err.stack)
			});
	}
	adbService.getProps = function(){
		return adbService.client.getProperties(adbService.activeDevice)
			.then(function(properties) {
				adbService.props = properties;
				$log.debug(properties); 
			}).catch(function(err) {
				console.error('Something went wrong:', err)
			});
	}

	adbService.reboot = function(){
		return adbService.client.reboot(adbService.activeDevice)
			.catch(function(err){
				console.error('Something went wrong:', err.stack)
			})
	}
	
	return adbService;
}]);