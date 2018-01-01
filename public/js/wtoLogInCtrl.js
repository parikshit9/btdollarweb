worldTourApp.controller('wtoLogInCtrl', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	$scope.state = $state;
	// console.log('login ctrl');
	$scope.loginObj = {};

	$scope.login = function(){
		var postObj = angular.copy($scope.loginObj);

		// $http.post('http://api.worldtourism.io:8080/tourcoins/loginAuth',postObj).then(success,error);
		$http.post('https://api.worldtourism.io/tourcoins/loginAuth',postObj).then(success,error);

		function success(res){
			// console.log(res);
			if (res.data.success =='success') {
				$window.localStorage.wtoUserData = JSON.stringify(res.data.userData);
				if (new Date().setHours(0,0,0,0) == new Date('2017-12-01').setHours(0,0,0,0) || new Date().setHours(0,0,0,0) > new Date('2017-12-01').setHours(0,0,0,0)) {
					$state.go('dashboard_1');	
				}else{
					$state.go('dashboard');
				}
			}else if(res.data.error){
				$scope.loginError = res.data.error;
			}
		}

		function error(err){
			alert(err);
		}
	}
});