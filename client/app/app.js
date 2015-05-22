'use strict';

angular.module('uim4zcalendarApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularMoment'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl'
            })
            .when('/calendar', {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            }).when('/all', {
                templateUrl: 'app/allPlans/allPlans.html',
                controller: 'AllPlansCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });