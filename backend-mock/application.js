(function (imports) {

  'use strict';

  // NOTE: application module
  module.exports = {

    addRouter: addRouter,

    start: start
  };

  // NOTE: default configuration properties
  var defaults = {

    routes: {

      data: '/data/'
    }
  };

  function addRouter(router, prefix) {
    router.apply(server, prefix);
    return server;
  }

  function start(configuration) {

    var server = imports.express();

    server
        .use(imports.bodyParser.json())
        .use(imports.express.static(configuration.paths.assets))
        .listen (configuration.port);
  }
})({

  bodyParser: require('body-parser'),
  express: require('express'),

  notRemoved: require('./utils/not-removed'),
  nullOrUndefined: require('./utils/null-or-undefined'),
  processSubtree: require('./utils/process-subtree')
});
