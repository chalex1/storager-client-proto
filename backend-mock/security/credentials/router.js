(function (imports) {

  'use strict';

  module.exports = {

    apply: apply
  };

  var router;

  function apply(server, routePrefix) {
    server.use(routePrefix + '/security/credentials', router);
  }

  router = imports.express.Router()

      .get('/', function (request, response) {
        response.json(imports.repository.findAll());
      });
})({

  express: require('express'),

  repository: require('./repository')
});
