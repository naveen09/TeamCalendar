'use strict';

angular.module('uim4zcalendarApp')
    .controller('LoginCtrl', ['UserService', '$location', '$cookies', function (UserService, location, cookies) {
        var self = this;
        self.teamName = "UIM4Z Team Calendar";
        self.pmfKey = '';
        self.username = '';
        self.showModal = true;
        self.login = function () {
            console.log('Login Ctrl login ', self.username);
            if (self.username != '' && self.pmfKey != '') {
                self.showModal = false;
                cookies.pmfKey = self.pmfKey;
                cookies.username = self.username;
                UserService.setUsername(self.username);
                UserService.setPmfKey(self.pmfKey);
                location.path('/calendar');
            }
        };
    }]);