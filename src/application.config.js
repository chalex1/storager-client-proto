(function () {

  'use strict';

  angular
        .module('application')
        .config(function($locationProvider) {
          $locationProvider.html5Mode(true);
        })
        .config(function($stateProvider) {
          var periodListState = {
            name: 'pariods',
            url: '/periods',
            component: 'periodList'
          };
          $stateProvider.state(periodListState);
        });
})();
