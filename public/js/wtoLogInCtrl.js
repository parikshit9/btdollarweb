worldTourApp.controller('wtoLogInCtrl', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	$scope.state = $state;
	// console.log('login ctrl');
	$scope.loginObj = {};

	$scope.login = function(){
		var random = Math.random().toString().slice(2,12);
		var hash = md5(md5($scope.loginObj.userPassword) + random);
		var postObj = JSON.stringify($scope.loginObj.userEmail + "|" + hash + "|" + random + "|" + "0.0.0.0");
		console.log(postObj);
		// $http.post('http://api.worldtourism.io:8080/tourcoins/loginAuth',postObj).then(success,error);
		$http.post('http://52.66.179.247/Coin_Api/UserAccess.svc/UserLogin',postObj).then(success,error);

		function success(res){
			var x = res.data;
            console.log("res",res);
            var resp = JSON.parse(x);
			if (resp.statusCode == 1) {
				$window.localStorage.wtoUserData = JSON.stringify(res.data.userData);
				$state.go('dashboard');
			}else if(resp.statusCode != 1){
				$scope.loginError = resp.Message;
			}
		}

		function error(err){
			alert(err);
		}
	}
});