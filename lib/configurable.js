'use strict';

/**
 * Implements base for classes with configuration state
 *
 * @type {Configurable}
 */
module.exports = class Configurable {
  /**
   * @param {Object} defaultConfig
   */
  constructor(defaultConfig) {
    this.config = defaultConfig;
  }

  /**
   * Merges new config to current one
   *
   * @param {Object} newConfig
   */
  setup(newConfig) {
    let key;

    for (key in newConfig) {
      if (newConfig.hasOwnProperty(key) && this.config[key]) {
        this.config[key] = newConfig[key];
      }
    }
  }
};