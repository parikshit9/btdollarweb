worldTourApp.controller('wtoHeaderCtrl', function($scope, $window, $state, $timeout, $rootScope, $http, $location, $stateParams, $sce) {
    $rootScope.state = $state;

    $scope.logout = function(){
    	delete $window.localStorage.wtoUserData;
    	$state.go('home');
    }
});