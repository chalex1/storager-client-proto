(function () {

  'use strict';

  // NOTE: require external dependencies
  var bodyParser = require('body-parser');
  var express = require ('express');

  // NOTE: require internal dependencies
  var notRemoved = require('./utils/not-removed');
  var nullOrUndefined = require('./utils/null-or-undefined');
  var processSubtree = require('./utils/process-subtree');

  var server = express ();

  server.use (express.static ('src'));
  server.use (bodyParser.json ());

  // --- PERIODS

  var mockPeriods = [

    {
      code: "DAY",
      title: "День"
    },

    {
      code: "WEEK",
      title: "Неделя"
    },

    {
      code: "MONTH",
      title: "Месяц"
    },

    {
      code: "QUARTER",
      title: "Квартал"
    },

    {
      code: "HALF_YEAR",
      title: "Полугодие"
    },

    {
      code: "YEAR",
      title: "Год"
    }
  ]

  server.get ('/data/periods', function (req, res) {

      res.json (mockPeriods);
  });


  // --- TERRITORIES

  var mockTerritories = [

    {
      code: "1001",
      title: "Территория 1001",
      terminal: false,
      parentCode: null
    },

    {
      code: "1001.1",
      title: "Территория 1001.1",
      terminal: true,
      parentCode: "1001"
    },

    {
      code: "1001.2",
      title: "Территория 1001.2",
      terminal: true,
      parentCode: "1001"
    },

    {
      code: "1002",
      title: "Территория 1002",
      terminal: true,
      parentCode: null
    }
  ];


  server.get ('/data/territories/:code', function (req, res) {

    var code = req.params.code;
    var filtered = mockTerritories.filter (function (territory) {
      return territory.code === code && notRemoved (territory);
    });
    if (filtered.length === 0) {
      res.status (404).send ("no such territoty");
    } else {
      res.json (filtered[0]);
    }
  });

  server.get ('/data/territories/:code/descendants', function (req, res) {

    var code = req.params.code;
    res.json (mockTerritories.filter (function (territory) {
      return territory.parentCode === code && notRemoved (territory);
    }));
  });

  server.get ('/data/territories', function (req, res) {

    res.json (mockTerritories
            .filter (function (territory) {
              return notRemoved (territory);
            })
            .filter (function (territory) {
              return territory.parentCode === null;
            })
           );
  });

  server.post ('/data/territories', function (req, res) {

    var newTerritory = req.body;

    var territoryExists;
    var parentFound;

    mockTerritories.forEach (function (territory) {
      if (territory.code === newTerritory.code && notRemoved (territory)) {
        territoryExists = true;
      }
      if (territory.code === newTerritory.parentCode && notRemoved (territory)) {
        parentFound = territory.code;
      }
    });
    
    if (territoryExists) {
      res.status (404).send ("territory code already exists");
      return;
    }

    if (!parentFound && !nullOrUndefined(newTerritory.parentCode)) {
      res.status (404).send ("parent territory not found");
      return;
    }

    newTerritory.terminal = true;
    mockTerritories.push (newTerritory);
    
    res.json (newTerritory);
  });

  server.delete ('/data/territories/:code', function (req, res) {

    processSubtree (mockTerritories, req.params.code, function (territory) {
      territory.removed = true;
    });

    res.status (204).json ({});
  });

  /*
  GET /territories/tops // <- get top-level territories
  GET /territories/{code} // <- get speocific territory by code
  GET /territories/{code}/descendants // <- get descendants of code specific territory

  POST /territories // <- add new territory
  PUT /territories/{code} // <- update territory
  DELETE /territories/{code} // <- delete territory (soft)
  */



  server.listen (8090);
})();
