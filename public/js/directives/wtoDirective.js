var worldTourApp = angular.module('worldTourApp');

worldTourApp.directive('wtoFooter', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/wtoFooter.html'
    };
});

worldTourApp.directive('wtoHeader', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/wtoHeader.html',
        controller: 'wtoHeaderCtrl'
    };
});

worldTourApp.directive("scroll", function($window,$state) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 100) {
                scope.boolChangeClass = true;
                /*console.log('Scrolled below header.');*/
            }else{
            	scope.boolChangeClass = false;
            }
            scope.$apply();
        }); 
    };
});