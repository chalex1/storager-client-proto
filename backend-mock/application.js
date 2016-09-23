(function (imports) {

  'use strict';

  // NOTE: application module
  module.exports = {

    start: start
  };

  // NOTE: default configuration properties
  const defaults = {

    routes: {

      data: '/data'
    }
  };

  // NOTE: application startup
  function start(config) {

    const server = imports.express();

    imports.indicatorRouter.apply(server, defaults.routes.data);
    imports.periodRouter.apply(server, defaults.routes.data);
    imports.providerRouter.apply(server, defaults.routes.data);
    imports.territoryRouter.apply(server, defaults.routes.data);

    imports.credentialRouter.apply(server, defaults.routes.data);
    imports.logonRouter.apply(server, defaults.routes.data);
    imports.logoutRouter.apply(server, defaults.routes.data);
    imports.tokenRouter.apply(server, defaults.routes.data);
    imports.userRouter.apply(server, defaults.routes.data);

    server
        .use(imports.express.static(config.paths.assets))
        .listen (config.port);
  }
})({

  express: require('express'),

  indicatorRouter: require ('./indicators/router'),
  periodRouter: require('./periods/router'),
  providerRouter: require('./providers/router'),
  territoryRouter: require('./territories/router'),

  credentialRouter: require('./security/credentials/router'),
  logonRouter: require('./security/logon/router'),
  logoutRouter: require('./security/logout/router'),
  tokenRouter: require('./security/tokens/router'),
  userRouter: require('./security/users/router')
});
