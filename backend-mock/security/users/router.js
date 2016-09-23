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

      .get('/', function (request, response) {
        response.json(imports.repository.findAll());
      })

      .get('/current', function (request, response) {
        var login = "root"; // TODO: 
        response.json(imports.repository.findByLogin(login));
      });
})({

  express: require('express'),

  repository: require('./repository')
});
