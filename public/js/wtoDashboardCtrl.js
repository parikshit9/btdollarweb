worldTourApp.controller('wtoDashboardCtrl', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	$scope.state = $state;
	// console.log('Dashboard ctrl');

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

    var end = new Date('12/01/2017 12:00 AM');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'EXPIRED!';

            return;
        }else if ($state.current.name != 'dashboard') {
        	clearInterval(timer);
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById('countdash-dy').innerHTML = ('0'+days).slice(-2);
        document.getElementById('countdash-hr').innerHTML = ('0'+hours).slice(-2);
        document.getElementById('countdash-mn').innerHTML = ('0'+minutes).slice(-2);
        document.getElementById('countdash-sc').innerHTML = ('0'+seconds).slice(-2);
    }
    timer = setInterval(showRemaining, 1000);
    

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
		$scope.fetchData();
	}

	// console.log($scope.userData);

	$scope.addWalletId = function(type,id){
		if (id.length == 0 || id == null) {
			Materialize.toast('Wallet address can not be empty', 3000);
		}else{
			var postObj = {};
			postObj.userId = $scope.userData.userId;
			postObj.currencyType = type;
			postObj.bitcoinWalletId = id;
			if (type == 'ETH') {
				postObj.ethWalletId = id;
			}else if(type == 'BITCOIN'){
				postObj.bitcoinWalletId = id;
			}

			// $http.post('http://api.worldtourism.io:8080/tourcoins/saveWalletId',postObj).then(success,error);
			$http.post('https://api.worldtourism.io/tourcoins/saveWalletId',postObj).then(success,error);

			function success(res){
				// console.log(res);
				if (res.data.success) {
					Materialize.toast('Wallet Id Added Successfully', 3000);
				}
				$scope.fetchData();
			}

			function error(err){
				console.log(err);
			}
		}
	}
	$scope.edit = {};
	$scope.showEdit = function(id){
		if (id == "BTC") {
			$scope.editBtcMode = true;
			$scope.edit.btcWallet = angular.copy($scope.dashData.userWallet.bitcoin.walletId);	
		}else if (id == "ETH") {
			$scope.editEthMode = true;
			$scope.edit.ethWallet = angular.copy($scope.dashData.userWallet.eherium.walletId);
		}
	}

	$scope.editWalletId = function(type,id){
		if (id.length == 0 || id == null) {
			Materialize.toast('Wallet address can not be empty', 3000);
		}else{
			var postObj = {};
			postObj.userId = $scope.userData.userId;
			postObj.currencyType = type;
			if (type == 'ETH') {
				postObj.ethWalletId = id;
			}else if(type == 'BITCOIN'){
				postObj.bitcoinWalletId = id;
			}

			// $http.post('http://api.worldtourism.io:8080/tourcoins/editWalletId',postObj).then(success,error);
			$http.post('https://api.worldtourism.io/tourcoins/editWalletId',postObj).then(success,error);

			function success(res){
				// console.log(res);
				if (res.data.success) {
					Materialize.toast('Wallet Id Updated Successfully', 3000);
				}
				$scope.fetchData();
			}

			function error(err){
				console.log(err);
			}
		}
	}

	$scope.refer = function(){
		$scope.showLink = true;
	}

	$scope.copyRefer = function(){
		var copyText = document.getElementById("referLink");
		copyText.select();
		document.execCommand("Copy");
		Materialize.toast('Copied referral link!', 3000);
	}

	$scope.copyEth = function(){
		var eth = document.getElementById("ethId");
		eth.select();
		document.execCommand("Copy");
		Materialize.toast('Copied Wallet Id!', 3000);
	}

	$scope.copyBtc = function(){
		var btc = document.getElementById("btcId");
		btc.select();
		document.execCommand("Copy");
		Materialize.toast('Copied Wallet Id!', 3000);
	}

	$scope.addCheck = function(){
		Materialize.toast('Please Add Your Respective Wallet Id First!', 3000);
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