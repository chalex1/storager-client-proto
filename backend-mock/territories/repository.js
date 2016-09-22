(function (imports) {

  'use strict';

  // NOTE: territory repository
  module.exports = {

    get: get,

    getDescendants: getDescendants,

    getRoots: getRoots,

    add: add,

    update: update,

    remove: remove
  };

  var mocks;

  // NOTE: gets a territory by its code
  function get(code) {
    return mocks
              .find(function (territory) {
                return territory.code === code && imports.notRemoved(territory);
              });
  }

  // NOTE: gets all descendants of a territory with specified code
  function getDescendants(code) {
    if (!get(code)) {
      throw "specified parent territory does not exist";
    }
    return mocks
              .filter(function (territory) {
                return territory.parentCode === code && imports.notRemoved(territory);
              });
  }

  // NOTE: gets all top-level territories
  function getRoots() {
    return mocks
              .filter(function (territory) {
                return imports.nullOrUndefined(territory.parentCode) && imports.notRemoved(territory);
              });
  }

  // NOTE: adds a new territory
  function add(territory) {
    if (get(territory.code)) {
      throw "territory with specified code already exists";
    }
    if (territory.parentCode && !get(territory.parentCode)) {
      throw "specified parent territory does not exist";
    }
    territory.terminal = true;
    mocks.push(territory);
    return get(territory.code);
  }

  // NOTE: updates an existing territory
  function update(code, territory) {
    //TODO: implement territory update
    return get(code);
  }

  // NOTE: removes an existing territory
  function remove(code) {
    const territory = get(code);
    if (!territory) {
      throw "territory with specified code does not exist";
    }
    imports.processSubtree (mocks, code, function (territory) {
      territory.removed = true;
    });
    const parentTerritory = get(territory.parentCode);
    if (parentTerritory) {
      parentTerritory.terminal = true;
    }
  }

  // NOTE: initially available territories
  mocks = [
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
})({

  notRemoved: require('../utils/not-removed'),
  nullOrUndefined: require('../utils/null-or-undefined'),
  processSubtree: require('../utils/process-subtree')
});
