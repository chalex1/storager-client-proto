(function (imports) {

  'use strict';

  // NOTE: application module
  module.exports = {

    start: start
  };

  // NOTE: default configuration properties
  var defaults = {

    routes: {

      data: '/data'
    }
  };

  // NOTE: application startup
  function start(configuration) {

    var server = imports.express();

    imports.periodRouter.apply(server, defaults.routes.data);

    server
        .use(imports.bodyParser.json())
        .use(imports.express.static(configuration.paths.assets))
        .listen (configuration.port);
  }
})({

  bodyParser: require('body-parser'),
  express: require('express'),

  periodRouter: require('./periods/router'),

  notRemoved: require('./utils/not-removed'),
  nullOrUndefined: require('./utils/null-or-undefined'),
  processSubtree: require('./utils/process-subtree')
});
