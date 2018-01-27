worldTourApp.controller('wtoSignUpCtrl', function($scope, $rootScope, $state, $timeout, $sce, $http, $window, $stateParams) {
	$scope.state = $state;
	// console.log('signUp ctrl');

	$scope.registerObj = {};

	$scope.register = function(){
		var hash = md5($scope.registerObj.userPassword);
		var postObj = JSON.stringify($scope.registerObj.userEmail + "|" + hash + "|" + "0");
		// delete postObj.pass;
		// if ($stateParams.token) {
		// 	postObj.userReferralToken = $stateParams.token;
		// }else{
		// 	postObj.userReferralToken = "";
		// }

		console.log(postObj);

		// $http.post('http://api.worldtourism.io:8080/tourcoins/createAccount',postObj).then(success,error);
		$http.post('https://api.bitcoindollar.io/UserAccess.svc/UserRegistration',postObj,{
			headers: { 'Content-Type': 'application/json' }
		}).then(success,error);

		function success(res){
			var x = res.data;
			console.log("res",res);
			var resp = JSON.parse(x);
			if (resp.statusCode == 1) {
				$state.go('verify');
			}else if(resp.statusCode != 1){
				Materialize.toast("You are already registered, Please verify email", 3000);
				$scope.registerObj = {};
			}else{
				Materialize.toast(resp.Message, 3000);
				$scope.registerObj = {};
			}
		}

		function error(err){
			console.log(err);
		}
	}

	$scope.comparePass = function(){
		if ($scope.registerObj.pass !== $scope.registerObj.userPassword) {
			$scope.matchError = "Passwords don't match";
		}else{
			$scope.matchError = '';
		}
	}
	$scope.pwdErrMsg = '';
	$scope.passwordCheck = function(){
		var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d#$@$!%*?&]{8,}/;
        if (re.test($scope.registerObj.userPassword)) {
            $scope.pwdErrMsg = '';
            $scope.comparePass();
        }else{
            $scope.pwdErrMsg = 'Password should be atleast 8 characters, Must contain at least one capital & small letter, one number and a special character';
        }
	}
});