(function (imports) {

  'use strict';

  module.exports = {

    apply: apply
  };

  var router;

  function apply(server, routePrefix) {
    server.use(routePrefix + '/security/logout', router);
  }

  router = imports.express.Router()

      .use(imports.bodyParser.json())

      .post('/', function (request, response) {
        imports.rejectUnauthorized([], request);
        // TODO: use header instead of body
        response.json(imports.tokenRepository.removeById(request.body.id));
      });
})({

  bodyParser: require('body-parser'),
  express: require('express'),

  tokenRepository: require('../tokens/repository'),
  rejectUnauthorized: require('../../utils/reject-unauthorized')
});
