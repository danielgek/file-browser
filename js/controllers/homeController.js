explorerApp.controller('homeController', ['$scope', '$log', 'adbService', function($scope, $log, adbService){
	
	$scope.platform = adbService.props['ro.board.platform'];
	$scope.brand = adbService.props['ro.product.brand'];
	$scope.device = adbService.props['ro.product.device'];
	$scope.manufacturer = adbService.props['ro.product.manufacturer'];
	$scope.model = adbService.props['ro.product.model'];
	$scope.processor = adbService.props['ro.product.processor'];
	$scope.ram = adbService.props['ro.product.ram'];
	$scope.androidVersion = adbService.props['ro.build.version.release'];
	$scope.stats = adbService.stats;

	$scope.refresh = function(){
		// adbService.getProps().then(function(){
			
		// });
		// adbService.getStats().then(function(){
			
		// });
		
		
		// $log.debug('on refresh');
		// $log.debug(adbService.props);
	}

	$scope.refresh();

    

    $scope.reboot = function(){
    	adbService.reboot();
    }
    

}]);