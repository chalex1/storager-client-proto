(function () {

  'use strict';

  // TODO: decrease complexity of this configuration

  angular
        .module('application')
        .factory('httpRequestInterceptor', [
          '$localStorage',
          httpRequestInterceptor
        ])
        .config([
          '$httpProvider',
          configureHttpProvider
        ])
        .config([
          '$provide',
          configureHttp
        ])
        .config([
          '$locationProvider',
          configureLocationProvider
        ])
        .config([
          '$urlRouterProvider',
          configureUrlRouterProvider
        ])
        .config([
          '$stateProvider',
          configureStateProvider
        ]);

  function configureHttpProvider($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
  }

  function httpRequestInterceptor($localStorage) {
    return {
      request: function (config) {
        config.headers['X-Auth-Token'] = $localStorage.authTokenId;
        return config;
      }
    };
  }

  function configureStateProvider($stateProvider) {

    $stateProvider

                  .state('application', {
                    abstract: true,
                    url: '/',
                    views: {
                      '': {
                        component: 'application'
                      }
                    }
                  })

                  .state('application.logon', {
                    url: 'logon',
                    views: {
                      '@application': {
                        component: 'logon'
                      }
                    }
                  })

                  .state('application.periods', {
                    url: 'periods',
                    views: {
                      '@application': {
                        component: 'periodList'
                      }
                    }
                  })

                  .state('application.lost', {
                    url: '*path',
                    views: {
                      '@application': {
                        component: 'lost'
                      }
                    }
                  });
  }

  function configureUrlRouterProvider($urlRouterProvider) {
    $urlRouterProvider.when('/', '/periods');
  }

  function configureLocationProvider($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  function configureHttp($provide, $state) {

    $provide.decorator('$http', function($delegate, $injector) {

      var $localStorage = $injector.get('$localStorage');
      var $state = $injector.get('$state');

      function handleUnauthorizedError(error) {
        if (error && error.indexOf('NOT_AUTHENTICATED') > -1) {
          $state.go('application.logon');
        }
      }

      var originalDelete = $delegate.delete;

      $delegate.delete = function () {
        return originalDelete
                        .apply($delegate, arguments)
                        .error(handleUnauthorizedError);
      };

      var originalGet = $delegate.get;

      $delegate.get = function () {
        return originalGet
                        .apply($delegate, arguments)
                        .error(handleUnauthorizedError);
      };

      var originalPost = $delegate.post;

      $delegate.post = function () {
        return originalPost
                        .apply($delegate, arguments)
                        .error(handleUnauthorizedError);
      };

      var originalPut = $delegate.put;

      $delegate.put = function () {
        return originalPut
                        .apply($delegate, arguments)
                        .error(handleUnauthorizedError);
      };

      return $delegate;
    });
  }
})();
