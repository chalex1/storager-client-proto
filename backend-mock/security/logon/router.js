(function (imports) {

  'use strict';

  module.exports = {

    apply: apply
  };

  var router;

  function apply(server, routePrefix) {
    server.use(routePrefix + '/security/logon', router);
  }

  router = imports.express.Router()

      .use(imports.bodyParser.json())

      .post('/', function (request, response) {
        const clientCredential = request.body;
        if (!clientCredential || !clientCredential.userLogin || !clientCredential.userSecret) {
          throw "security credentials are missing";
        }
        const login = clientCredential.userLogin;
        const secret = clientCredential.userSecret;
        const credential = imports.credentialRepository.findByUserLogin(login);
        if (!credential || credential.userLogin !== login || credential.userSecret !== secret) {
          throw "specified security credentials are invalid";
        }
        response.json(imports.tokenRepository.create(login));
      });
})({

  bodyParser: require('body-parser'),
  express: require('express'),

  credentialRepository: require('../credentials/repository'),
  tokenRepository: require('../tokens/repository')
});