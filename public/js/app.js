'use strict';

var worldTourApp = angular.module('worldTourApp', ['ui.router', 'ngRoute', 'chart.js', '720kb.tooltips']);

worldTourApp.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode({
    //     enabled: true
    // });

    //token interceptor
    //$httpProvider.interceptors.push('authInterceptor');

    //Enable cross domain calls
    // $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "/views/home.html",
            controller: "wtoController"
        })
        .state("team", {
            url: "/team",
            templateUrl: "/views/team.html",
            controller: "wtoController"
        })
        .state("login", {
            url: "/login",
            templateUrl: "/views/login.html",
            controller: "wtoLogInCtrl"
        })
        .state("signup", {
            url: "/signup/:token",
            templateUrl: "/views/signup.html",
            controller: "wtoSignUpCtrl"
        })
        .state("terms", {
            url: "/terms",
            templateUrl: "/views/terms.html",
            controller: "wtoController"
        })
        .state("faq", {
            url: "/faq",
            templateUrl: "/views/faq.html",
            controller: "wtoController"
        })
        .state("verify", {
            url: "/verify",
            templateUrl: "/views/verify.html",
            controller: "wtoController"
        })
        .state("forgotPassword", {
            url: "/forgotpassword",
            templateUrl: "/views/forgotPassword.html",
            controller: "wtoController"
        })
        .state("resetInstructions", {
            url: "/resetinstructions",
            templateUrl: "/views/resetInstructions.html",
            controller: "wtoController"
        })
        .state("resetPassword", {
            url: "/resetpassword/:token",
            templateUrl: "/views/resetPassword.html",
            controller: "wtoController"
        })
        .state("passwordChanged", {
            url: "/passwordchanged",
            templateUrl: "/views/passwordChanged.html",
            controller: "wtoController"
        })
        .state("contactUs", {
            url: "/contactus",
            templateUrl: "/views/contactUs.html",
            controller: "wtoController"
        })
        .state("inquiry", {
            url: "/inquiry",
            templateUrl: "/views/inquiry.html",
            controller: "wtoController"
        })
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "/views/dashboard.html",
            controller: "wtoDashboardCtrl"
        })
        .state("ecosystem", {
            url: "/ecosystem",
            templateUrl: "/views/ecoSystem.html",
            controller: "wtoController"
        })
        .state("success", {
            url: "/success",
            templateUrl: "/views/success.html",
            controller: "wtoController"
        })
        .state("failure", {
            url: "/failure",
            templateUrl: "/views/failure.html",
            controller: "wtoController"
        })
    // $locationProvider.html5Mode(true);
});

worldTourApp.config(['ChartJsProvider', function (ChartJsProvider) {
// Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ["#204f84","#53a8e2","#50e3c2","#dbecf8"],
        responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: false
    });
}])

worldTourApp.run(["$rootScope", "$anchorScroll" , function ($rootScope, $anchorScroll) {
    $rootScope.$on("$locationChangeSuccess", function() {
        $anchorScroll();
    });
}]);