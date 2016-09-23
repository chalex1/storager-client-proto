(function (imports) {

  'use strict';

  module.exports = {

    apply: apply
  };

  var router;

  function apply(server, routePrefix) {
    server.use(routePrefix + '/providers', router);
  }

  router = imports.express.Router()

      .use(imports.bodyParser.json())

      .post('/', function (request, response) {
        response.json(imports.repository.create(request.body));
      })

      .get('/', function (request, response) {
        response.json(imports.repository.findAll());
      })

      .get('/:id', function (request, response) {
        response.json(imports.repository.findById(request.params.id));
      })

      .delete('/', function (request, response) {
        response.json(imports.repository.removeAll());
      })

      .delete('/:id', function (request, response) {
        response.json(imports.repository.removeById(request.params.id));
      })

      .put('/:id/grants', function (request, response) {
        response.json(imports.repository.updateGrantsById(request.params.id, request.body));
      })

      .put('/:id/token', function (request, response) {
        response.json(imports.repository.updateTokenById(request.params.id));
      })
})({

  bodyParser: require('body-parser'),
  express: require('express'),

  repository: require('./repository')
});