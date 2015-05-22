'use strict';

angular.module('uim4zcalendarApp')
    .controller('NavbarCtrl', ['UserService', '$scope', '$location', '$cookies', function (UserService, $scope, $location, cookies) {
        this.showRefresh = UserService.isShowRefresh();
        console.log("ref", this.showRefresh);
        $scope.menu = [
            {
                'title': 'My Plan',
                'link': '/calendar'
            },
            {
                'title': 'All',
                'link': '/all'
            }
        ];
        this.logout = function () {
            cookies.remove("username");
            cookies.remove("pmfKey");
            $location.path('/');
        }
        $scope.username = cookies.username;
        $scope.$on('LOGIN', function (event, value) {
            $scope.username = value;
        });
        $scope.isActive = function (route) {
            return route === $location.path();
        };
    }]).filter("camelCase", function () {
        return function (name) {
            return name == undefined ? "" : name.charAt(0).toUpperCase() + name.slice(1);
        };
    });