worldTourApp.controller('wtoDashboardCtrl', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	$scope.state = $state;
	// console.log('Dashboard ctrl');
	// $scope.userData = JSON.parse($window.localStorage.wtoUserData);

	$(document).ready(function(){
		$('.parallax').parallax();
		$('.collapsible').collapsible();
		$('.scrollspy').scrollSpy();
        $(".dropdown-button").dropdown();
        $(".button-collapse").sideNav(
            {
              closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
		$('.scrollspy').on('scrollSpy:enter', function() {
			$('.wto-fixed-nav').find('a').removeClass('anchor-active');
			$('.wto-fixed-nav').find('a[href="#'+$(this).attr('id')+'"]').addClass('anchor-active');
		});
		// $('scrollspy').on('scrollSpy:exit', function(){
		// 	console.log('getting');
		// 	$('.wto-fixed-nav').find('a[href="#'+$(this).attr('id')+'"]').parent().removeClass('active');
		// });
    });
	
	if (!$window.localStorage.wtoUserData) {
		$state.go('home');
	}else{
		$scope.userData = JSON.parse($window.localStorage.wtoUserData);
		console.log($scope.userData);
		// $scope.fetchData();
	}

	// console.log($scope.userData);

	$scope.refer = function(){
		$scope.showLink = true;
	}

	$scope.copyRefer = function(){
		var copyText = document.getElementById("referLink");
		copyText.select();
		document.execCommand("Copy");
		Materialize.toast('Copied referral link!', 3000);
	}

	function fetchTransactions(){
		var url = "https://api.bitcoindollar.io/UserAccess.svc/UserTransactions";
		console.log($scope.userData);
		var s = String($scope.userData.UserID);
		var postObj = "" + s;
		// var postObj = "17";
		console.log(postObj)
		$http.post(url,postObj).then(success,error);

		function success(res){
			// console.log(res);
			$scope.transactionDetails = JSON.parse(res.data);
			console.log($scope.transactionDetails);
			$timeout(function(){
				fetchTransactions();
			},50000);
		}

		function error(err){
			console.log(err);
		}
	}
	fetchTransactions();

	$scope.tab = "crowd";
	$scope.tabChanger = function(name){
		$scope.tab = name;
	}

	$scope.bonus = 50;
	$scope.btd_total = 1.5;
	$scope.btd = 1;
	$scope.usd = 2;

	$scope.changeBTD = function(){
		$scope.usd = $scope.btd * 2;
		$scope.btd_total = $scope.btd + ($scope.btd*($scope.bonus/100)); 
	}

	$scope.changeUSD = function(){
		$scope.btd = $scope.usd/2;
		$scope.btd_total = $scope.btd + ($scope.btd*($scope.bonus/100)); 
	}
});