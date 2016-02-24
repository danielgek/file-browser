explorerApp.controller('filesController', ['$scope', '$log', 'adbService', function($scope, $log, adbService){
	$scope.fileList = [];
	$scope.path = '/';
	$scope.fileList = adbService.fileList;
	$scope.getFileList = function(path){
    	adbService.getFileList(path)
    		.then(function(){
    			$scope.fileList = adbService.fileList;
    			$scope.$apply();
    		});
    };
	
	 
	$scope.refresh = function(){
		$scope.getFileList($scope.path);
	};
	$scope.goTo = function(path){
		$log.debug(path);
		$scope.path = $scope.path + path + '/';
		$scope.refresh();
	};
	$scope.back = function(){
		var aux = $scope.path.substring(0, $scope.path.length - 1);
		aux = aux.substring(0, aux.lastIndexOf('/')+1);
		$scope.path = aux;
		$scope.refresh();
	};
}]);