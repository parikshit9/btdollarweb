worldTourApp.controller('wtoController', function($scope, $rootScope, $state, $timeout, $sce, $http, $window, $stateParams) {
	$scope.state = $state;
    wow = new WOW(
    {
        boxClass:     'wow',      // default
        animateClass: 'animated', // change this if you are not using animate.css
        offset:       0,          // default
        mobile:       true,       // keep it on mobile
        live:         true        // track if element updates
      }
    )
   wow.init();
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
        var options = [
            {selector: '#mainDistribution', offset: 50, callback: function(el) {
                $scope.showMainDistribution = true;
            } },
            {selector: '#bonusLine', offset: 50, callback: function(el) {
                $scope.showBonusLine = true;
            } },
            {selector: '#rewardsLine', offset: 50, callback: function(el) {
                $scope.showRewardsLine = true;
            } }
        ];
        Materialize.scrollFire(options);
    });

    // console.log(new Date().setHours(0,0,0,0), new Date('2017-11-30').setHours(0,0,0,0));

    $(document).ready(function(){
        $('.slick-car-1').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false
        });
        $('.slick-car-2').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            rtl: true
        });
        $('.slick-car-3').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false
        });
        $('.slick-car-4').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            rtl: true
        });
    });

    $(document).ready(function(){
        $timeout(function(){
            $scope.showAd = true;
        },30000)
    })

    $scope.closeAd = function(){
        $scope.showAd = false;
    }

    $scope.validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            $scope.errmsg = '';
        }else{
            $scope.errmsg = 'Invalid Email';
        }
    }

	$scope.subscribeMail = function(id){
		var postObj = {
			"subscriptionEmailId" : id
		}

		// $http.post('http://api.worldtourism.io:8080/tourcoins/subscribeTourCoins',postObj).then(success,error);
		$http.post('https://api.worldtourism.io/tourcoins/subscribeTourCoins',postObj).then(success,error);

		function success(res){
			// console.log(res);
			if (res.data.success) {
				Materialize.toast('Email ID subscribed successfully', 3000);
				$scope.mailId = null;
			}else if(res.data.error){
				Materialize.toast('Email ID already subscribed!', 3000);
			}
		}

		function error(err){
			console.log(err);
		}
	}

    $scope.forgot = {};

    $scope.sendResetLink = function(){
    	var postObj = JSON.stringify($scope.forgot.mail);
    	// $http.post('http://api.worldtourism.io:8080/tourcoins/forgotPassword',postObj).then(success,error);
    	$http.post('http://52.66.179.247/Coin_Api/UserAccess.svc/ForgotPassword',postObj).then(success,error);

    	function success(res){
            var x = res.data;
            console.log("res",res);
            var resp = JSON.parse(x);
    		if (resp.statusCode == 1) {
    			Materialize.toast(res.data.success, 3000);
                $rootScope.fm = angular.copy($scope.forgot.email);
    			$state.go('resetInstructions');
    		}else if(resp.statusCode != 1){
    			Materialize.toast(resp.Message, 3000);
    		}
    	}

    	function error(err){
    		console.log(err);
    	}
    }

    // if ($state.current.name == 'resetPassword') {
    // 	console.log($stateParams.token);
    // }

    $scope.reset = {};

    $scope.resetPassword = function(){
    	var postObj = {};
    	postObj.forgotPwdToken = $stateParams.token;
    	postObj.newPassword = $scope.reset.password;

    	// console.log(postObj);

        // $http.post('http://api.worldtourism.io:8080/tourcoins/resetPassword',postObj).then(success,error);
        $http.post('https://api.worldtourism.io/tourcoins/resetPassword',postObj).then(success,error);

        function success(res){
            // console.log(res);
            if (res.data.success) {
                Materialize.toast(res.data.success, 3000);
                $state.go('passwordChanged');
            }else if(res.data.error){
                Materialize.toast(res.data.error, 3000);
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

    $scope.compareResetPass = function(){
        if ($scope.reset.password !== $scope.reset.confPassword) {
            $scope.resetMatchError = "Passwords don't match";
        }else{
            $scope.resetMatchError = '';
        }
    }

    $scope.resetPasswordCheck = function(){
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d#$@$!%*?&]{8,}/;
        if (re.test($scope.reset.password)) {
            $scope.resetPwdErrMsg = '';
            $scope.compareResetPass();
        }else{
            $scope.resetPwdErrMsg = 'Password should be atleast 8 characters, Must contain at least one capital & small letter, one number and a special character';
        }
    }

    $scope.contact = {};

    $scope.contactUs = function(){
        var postObj = JSON.stringify($scope.contact.userFullName + "|" + $scope.contact.userEmailId + "|" + $scope.contact.userMessage);
        console.log(postObj);
        // $http.post('http://api.worldtourism.io:8080/tourcoins/contactUs',postObj).then(success,error);
        $http.post('http://52.66.179.247/Coin_Api/UserAccess.svc/ContactUs',postObj).then(success,error);

        function success(res){
            var x = res.data;
            console.log("res",res);
            var resp = JSON.parse(x);
            if (resp.statusCode == 1) {
                Materialize.toast('Your Message has been successfully sent!', 3000);
                $scope.contact = {};
                $state.go('inquiry')
            }else if(resp.statusCode != 1){
                Materialize.toast(resp.Message, 3000);
            }
        }

        function error(err){
            console.log(err);
        }
    }
});