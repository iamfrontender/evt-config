'use strict';

const store = require('./lib/store');
const log = require('./lib/log');

/////////////////////////////////////////////////////////

module.exports = function(field) {
  return store.get(field);
};

module.exports.add = add;
module.exports.delete = deleteKey;

['set', 'get', 'list'].forEach(method => {
  module.exports[method] = store[method].bind(store);
});

/////////////////////////////////////////////////////////

function add(field) {
  return store.set(field, {});
}

function deleteKey(key) {
  return store.set(key, undefined)
    .then(() => key);
}