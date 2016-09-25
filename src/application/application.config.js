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

  function configureLocationProvider($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  function configureStateProvider($stateProvider) {

    $stateProvider

                  .state('application', {
                    url: '/',
                    views: {
                      'application': {
                        component: 'application'
                      }
                    }
                  })

                  .state('application.periods', {
                    url: 'periods',
                    views: {
                      'periodList': {
                        component: 'periodList'
                      }
                    }
                  })
  }
})();
