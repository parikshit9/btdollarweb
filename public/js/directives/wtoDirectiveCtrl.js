worldTourApp.controller('wtoHeaderCtrl', function($scope, $window, $state, $timeout, $rootScope, $http, $location, $stateParams, $sce) {
    $rootScope.state = $state;
    $scope.$watchCollection(function() {
        return $window.localStorage.wtoUserData;
    }, function() {
       	if ($window.localStorage.wtoUserData) {
	    	$scope.userData = JSON.parse($window.localStorage.wtoUserData);
	    }else{
	    	$scope.userData = null;
	    } 
    });

    $scope.logout = function(){
    	delete $window.localStorage.wtoUserData;
    	$state.transitionTo('home',{},{reload:true});
    }
});