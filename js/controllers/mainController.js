explorerApp.controller('mainController', ['$scope', '$log', '$mdSidenav', function($scope, $log, $mdSidenav){
	 
	$scope.toggle = function(){
		$mdSidenav('left').toggle();
	};

}]);