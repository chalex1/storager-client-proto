(function () {

  'use strict';

  angular
        .module('application', [
          'ui.router',
          'application.logon',
          'application.lost',
          'application.periodList'
        ]);
}) ();
