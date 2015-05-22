/**
 * Created by avwna01 on 5/3/2015.
 */
angular.module('uim4zcalendarApp')
    .factory('UserService', ['$http', function (http) {
        var self = this;
        var showRefresh = false;
        return {
            setShowRefresh: function (d) {
                showRefresh = d;
            },
            isShowRefresh: function () {
                return showRefresh;
            },
            addEvent: function (event) {
                return http.post('/api/things/addEvent', event);
            },
            deleteEvent: function (event) {
                return http.post('/api/things/deleteEvent', event);
            },
            getEvents: function (username) {
                return http.get('/api/things/' + username + '');
            },
            getAllEvents: function () {
                return http.get('/api/things/all');
            },
            getPmfKey: function () {
                console.log('get  pmfKey service called', self.pmfKey);
                return self.pmfKey;
            },
            setPmfKey: function (pmf) {
                self.pmfKey = pmf;
            },
            setUsername: function (usr) {
                console.log('user service called', usr);
                self.username = usr;
            },
            getUsername: function () {
                return self.username;
            }
        };
    }])