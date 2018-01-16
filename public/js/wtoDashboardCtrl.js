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

	$scope.fetchData = function(){
		var postObj = {};
		postObj.userId = $scope.userData.userId;

		// console.log(postObj);

		// $http.post('http://api.worldtourism.io:8080/tourcoins/dataOnDashboard',postObj).then(success,error);
		$http.post('https://api.worldtourism.io/tourcoins/dataOnDashboard',postObj).then(success,error);

		function success(res){
			console.log("res",res.data.data);
			if (res.data.data) {
				$scope.dashData = res.data.data;
				if ($scope.dashData.userWallet.bitcoin.walletId == '') {
					$scope.btcFlag = false;
				}else{
					$scope.btcFlag = true;
				}
				if ($scope.dashData.userWallet.eherium.walletId == '') {
					$scope.ethFlag = false;
				}else{
					$scope.ethFlag = true;
				}
				$scope.editBtcMode = false;
				$scope.editEthMode = false;
			}
		}

		function error(err){
			console.log(err);
		}
	}
	
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
		var url = "https://api.worldtourism.io/tourcoins/transactionDetails/" + $scope.userData.userId;
		$http.get(url).then(success,error);

		function success(res){
			// console.log(res);
			$scope.transactionDetails = res.data.response;
			$timeout(function(){
				fetchTransactions();
			},50000);
		}

		function error(err){
			console.log(err);
		}
	}
	fetchTransactions();

	$scope.tab = "dash";
	$scope.tabChanger = function(name){
		$scope.tab = name;
	}
});