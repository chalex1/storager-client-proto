(function (imports) {

  'use strict';

  module.exports = {

    apply: apply
  };

  var router;

  function apply(server, routePrefix) {
    server.use(routePrefix + '/security/users', router);
  }

  router = imports.express.Router()

      // NOTE: returns all available periods
      .get('/current', function (request, response) {
        response.json(imports.repository.getAll());
      });
})({

  express: require('express'),

  repository: require('./repository')
});
