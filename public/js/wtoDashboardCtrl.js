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
		// console.log($scope.userData);
		// $scope.fetchData();
	}

	// console.log($scope.userData);

	$scope.copyRefer = function(){
		var copyText = document.getElementById("referLink");
		copyText.select();
		document.execCommand("Copy");
		Materialize.toast('Copied referral link!', 3000);
	}

	function fetchTransactions(){
		var url = "https://api.bitcoindollar.io/UserAccess.svc/UserTransactions";
		// console.log($scope.userData);
		var s = String($scope.userData.UserID);
		var postObj = "" + s;
		// var postObj = "17";
		// console.log(postObj)
		$http.post(url,postObj).then(success,error);

		function success(res){
			// console.log(res);
			$scope.transactionDetails = JSON.parse(res.data);
			// console.log($scope.transactionDetails);
			$timeout(function(){
				fetchTransactions();
			},50000);
		}

		function error(err){
			console.log(err);
		}
	}
	fetchTransactions();

	function fetchReferralList(){
		var url = "https://api.bitcoindollar.io/UserAccess.svc/ReferralList";
		// console.log($scope.userData);
		var s = String($scope.userData.UserID);
		var postObj = "" + s;
		// var postObj = "17";
		// console.log(postObj)
		$http.post(url,postObj).then(success,error);

		function success(res){
			// console.log(res);
			$scope.ReferralList = JSON.parse(res.data);
			// console.log($scope.ReferralList);
		}

		function error(err){
			console.log(err);
		}
	}
	fetchReferralList();

	$scope.tab = "dash";
	$scope.tabChanger = function(name){
		$scope.tab = name;
	}

	$scope.referTab = "reward";
	$scope.referTabChanger = function(name){
		$scope.referTab = name;
	}

	$scope.bonus = 50;
	$scope.btd_total = 1.5;
	$scope.btd = 1;
	$scope.usd = 3;

	$scope.changeBTD = function(){
		$scope.usd = $scope.btd * 3;
		$scope.btd_total = $scope.btd + ($scope.btd*($scope.bonus/100)); 
	}

	$scope.changeUSD = function(){
		$scope.btd = $scope.usd/3;
		$scope.btd_total = $scope.btd + ($scope.btd*($scope.bonus/100)); 
	}

	// Create Base64 Object
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

	// Define the string
	var string = String($scope.userData.UserID);

	// Encode the String
	var encodedString = Base64.encode(string);
	$scope.referralLink = "https://bitcoindollar.io/#!/signup/" + encodedString;

	// Decode the String
	// var decodedString = Base64.decode(encodedString);

	function fetchWalletId(){
		var url = "https://api.bitcoindollar.io/UserAccess.svc/GetWalletId";
		// console.log($scope.userData);
		var s = String($scope.userData.UserID);
		var postObj = "" + s;
		// var postObj = "17";
		// console.log(postObj)
		$http.post(url,postObj).then(success,error);

		function success(res){
			// console.log(res);
			$scope.userWalletId = JSON.parse(res.data).Message;
			if ($scope.userWalletId.length>0) {
				$scope.btcFlag = true;
			}else{
				$scope.btcFlag = false;
			}
			// console.log($scope.ReferralList);
		}

		function error(err){
			console.log(err);
		}
	}
	fetchWalletId();
	$scope.editMode = false;
	$scope.addWalletId = function(walletId){
		if ($scope.editMode) {
			var url = "https://api.bitcoindollar.io/UserAccess.svc/EditWalletId";
		}else{
			var url = "https://api.bitcoindollar.io/UserAccess.svc/InsertWalletId";
		}
		// console.log($scope.userData);
		var s = String($scope.userData.UserID + "|" + walletId);
		var postObj = "" + s;
		// var postObj = "17";
		// console.log(postObj)
		$http.post(url,postObj).then(success,error);

		function success(res){
			// console.log(res);
			$scope.editMode = false;
			Materialize.toast("Wallet Id save successfuly", 3000);
			fetchWalletId();
			// $scope.userWalletId = JSON.parse(res.data);
			// console.log($scope.ReferralList);
		}

		function error(err){
			console.log(err);
		}
	}

	$scope.showEdit = function(){
		$scope.editMode = true;
		$scope.btcFlag = false;
	}
});