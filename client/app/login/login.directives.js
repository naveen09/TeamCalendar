-/**
 * Created by avwna01 on 5/3/2015.
 */
    'use strict'
angular.module('uim4zcalendarApp').directive('LoginForm', function () {
    return {
        template: '<div></div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;
        }
    };
});