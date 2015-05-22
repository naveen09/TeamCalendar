'use strict';

angular.module('uim4zcalendarApp')
    .controller('AllPlansCtrl', ['UserService', '$location', '$cookies', function (UserService, $location, cookies) {
        if ((cookies.username == '' || cookies.username == undefined) ||
            (cookies.pmfKey == '' || cookies.pmfKey == undefined)) {
            $location.path('/');
            return;
        }
        if (cookies.username != undefined && (UserService.getUsername() == '' || UserService.getUsername() == undefined)) {
            UserService.setUsername(cookies.username);
        }
        if (cookies.pmfKey != undefined && (UserService.getPmfKey() == '' || UserService.getPmfKey() == undefined)) {
            UserService.setUsername(cookies.pmfKey);
        }
        var self = this;
        self.today = moment();
        UserService.setShowRefresh(true);
        UserService.getAllEvents().success(function (data) {
            self.allData = data;
        });
    }])
;