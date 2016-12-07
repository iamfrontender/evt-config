'use strict';

const fs = require('fs-promise');
const _ = require('lodash');
const expandTilde = require('expand-tilde');

const Configurable = require('./configurable');

const defaultConfig = {
  file: expandTilde('~/.evt-auth')
};

/////////////////////////////////////////////////////////

/**
 * Base class for the module, responsible for working with
 * configuration tree
 *
 * @type {Store}
 */
module.exports = new (class Store extends Configurable {

  /**
   * @param config
   *   @param {string} config.file path to store file
   */
  constructor(config) {
    super(config);

    ['list', 'set', 'get', 'save', 'setData', 'getData']
      .forEach(method => this[method] = this[method].bind(this));

    this.init = this.initStorage();
  }

  /**
   * Resolves with the top level config keys.
   *
   * @returns {Promise}
   */
  list() {
    return this.init
      .then(this.getData)
      .then(Object.keys);
  }

  /**
   * Sets the given value by given path.
   *
   * @param {string} key
   * @param {*} value
   * @returns {Promise}
   */
  set(key, value) {
    return this.init
      .then(() => _.set(this.data, key, value))
      .then(this.save)
      .then(() => value);
  }

  /**
   * Gets the given value by given path.
   *
   * @param {string} key
   * @returns {Promise}
   */
  get(key) {
    return this.init
      .then(() => _.get(this.data, key));
  }

  /**
   * Updates the in-mem storage with given val.
   *
   * @param {Object} val
   */
  setData(val) {
    this.data = val;
  }

  /**
   * Returns the current storage.
   *
   * @returns {Object|*}
   */
  getData() {
    return this.data;
  }

  /**
   * Ensures that store file exists, reads it,
   * parses the content and saves it in-mem.
   *
   * @returns {Promise}
   */
  initStorage() {
    return fs.ensureFile(this.config.file)
      .then(() => fs.readFile(this.config.file))
      .then(String)
      .then(c => c || '{}')
      .then(JSON.parse)
      .then(this.setData);
  }

  /**
   * Saves the current version of in-mem store to fs.
   *
   * @returns {*}
   */
  save() {
    return fs.writeFile(this.config.file, JSON.stringify(this.data));
  }

  /**
   * Applies the new configuration
   *
   * @param {object} newConfig
   * @param {string} newConfig.file
   * @returns {Promise}
   */
  setup(newConfig) {
    super.setup(newConfig);

    return this.initStorage();
  }
})(defaultConfig);