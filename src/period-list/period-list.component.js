(function () {

  var periodList = angular.module('app.periodList');

  periodList.component ('periodList', {
    controller: 'periodListController',
    controllerAs: 'it',
    templateUrl: '/static/period-list/period-list.component.html'
  });
}) ();
