(function (imports) {

  'use strict';

  // NOTE: generic hierarchic item repository factory
  module.exports = function (items) {

    return {

      get: get,

      getDescendants: getDescendants,

      getRoots: getRoots,

      add: add,

      update: update,

      remove: remove
    };

    // NOTE: gets an item by its code
    function get(code) {
      return items
                .find(function (item) {
                  return item.code === code && imports.notRemoved(item);
                });
    }

    // NOTE: gets all descendants of an item with specified code
    function getDescendants(code) {
      if (!get(code)) {
        throw "specified code does not exist";
      }
      return items
                .filter(function (item) {
                  return item.parentCode === code && imports.notRemoved(item);
                });
    }

    // NOTE: gets all top-level items
    function getRoots() {
      return items
                .filter(function (item) {
                  return imports.nullOrUndefined(item.parentCode) && imports.notRemoved(item);
                });
    }

    // NOTE: adds a new item
    function add(item) {
      if (get(item.code)) {
        throw "specified code already exists";
      }
      if (item.parentCode && !get(item.parentCode)) {
        throw "specified parent code does not exist";
      }
      item.terminal = true;
      items.push(item);
      return get(item.code);
    }

    // NOTE: updates an existing item
    function update(code, item) {
      //TODO: implement item update action
      return get(code);
    }

    // NOTE: removes an existing item
    function remove(code) {
      const item = get(code);
      if (!item) {
        throw "specified code does not exist";
      }
      imports.processSubtree (items, code, function (item) {
        item.removed = true;
      });
      const parentItem = get(item.parentCode);
      if (parentItem) {
        parentItem.terminal = true;
      }
    }
  };
})({

  notRemoved: require('./not-removed'),
  nullOrUndefined: require('./null-or-undefined'),
  processSubtree: require('./process-subtree')
});
