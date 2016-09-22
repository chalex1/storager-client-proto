(function (imports) {

  'use strict';

  // NOTE: territory router
  module.exports = {

    apply: apply
  };

  var router;

  // NOTE: applies the router to specified server
  function apply(server, routePrefix) {
    server.use(routePrefix + '/territories', router);
  }

  router = imports.express.Router()

      .use(imports.bodyParser.json())

      // NOTE: gets top-level territories
      .get('/', function (request, response) {
        response.json(imports.repository.getRoots());
      })

      // NOTE: gets a territory by its code
      .get('/:code', function (request, response) {
        response.json(imports.repository.get(request.params.code));
      })

      // NOTE: gets all descendants of a territory with specified code
      .get('/:code/descendants', function (request, response) {
        response.json(imports.repository.getDescendants(request.params.code));
      })

      // NOTE: adds a new territory
      .post('/', function (request, response) {
        response.json(imports.repository.add(request.body));
      })

      // NOTE: updates an existing territory
      .put('/:code', function (request, response) {
        response.json(imports.repository.update(request.params.code, request.body));
      })

      // NOTE: removes an existing territory
      .delete('/:code', function (request, response) {
        response.json(imports.repository.remove(request.params.code));
      });
})({

  bodyParser: require('body-parser'),
  express: require('express'),

  repository: require('./repository')
});
