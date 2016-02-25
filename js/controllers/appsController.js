explorerApp.controller('appsController', ['$scope', '$log', 'adbService', function($scope, $log, adbService){
	
	$scope.appsList = adbService.appsList;

}]);