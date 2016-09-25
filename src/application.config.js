(function () {

  'use strict';

  angular
        .module('application')
        .config([
          '$locationProvider',
          configureLocationProvider
        ])
        .config([
          '$stateProvider',
          configureStateProvider
        ]);

  var states = [

    {
      name: 'periods',
      url: '/periods',
      views: {
        'periodList': {
          component: 'periodList'
        }
      }
    }
  ];

  function configureLocationProvider($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  function configureStateProvider($stateProvider) {
    states.forEach(function (state) {
      $stateProvider.state(state);
    });
  }
})();
