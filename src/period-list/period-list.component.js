(function () {

  'use strict';

  angular
        .module('application.periodList')
        .component('periodList', {
          controller: 'periodListController',
          controllerAs: 'it',
          templateUrl: '/static/period-list/period-list.component.html'
        });
}) ();
