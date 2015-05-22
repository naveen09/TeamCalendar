/**
 * Created by avwna01 on 5/3/2015.
 */
'use strict'
angular.module('uim4zcalendarApp').directive('calendar', ['UserService', function (UserService) {
    return{
        template: '<div id="calendar"></div>',
        restrict: 'E',
        scope: true,
        link: function postLink(scope, element, attrs) {
            var calendar = element.fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                selectable: true,
                height: 500,
                default: false,
                width: 650,
                selectHelper: true,
                select: function (start, end) {
                    var title = prompt('Type of Leave on ' + moment(eDate).format('DD MMM YYYY') + ' :');
                    var eventData;
                    if (title) {
                        var sDate = moment(start).format('YYYY-MM-DD hh:mm:SS');
                        var eDate = moment(end).subtract(1, "days").format('YYYY-MM-DD hh:mm:SS');
                        eventData = {
                            title: title,
                            start: sDate,
                            end: eDate,
                            pmfkey: scope.mainCtrl.pmfKey,
                            username: scope.mainCtrl.username
                        };
                        $(element).fullCalendar('renderEvent', eventData, true); // stick? = true
                        scope.mainCtrl.addEvent(eventData).then(function (data) {
                            alert(data);
                        });
                    }
                    $(element).fullCalendar('unselect');
                },
                eventClick: function (event) {
                    var delConfirm = confirm("Delete " + event.title);
                    if (delConfirm && event.pmfkey === scope.mainCtrl.pmfKey) {
                        console.log('event id', event._id);
                        calendar.fullCalendar('removeEvents', event._id);
                        scope.mainCtrl.deleteEvent(event);
                    }
                },
                editable: true,
                eventLimit: true,
                eventSources: [
                    'api/things/all'
                ]
            });
        }
    }
}]);