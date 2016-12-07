'use strict';

const Logger = require('logplease');
const Configurable = require('./configurable');
const defaultConfig = {
  level: Logger.LogLevels.INFO
};

/////////////////////////////////////////////////////////

/**
 * Tiny configurable wrapper over logger
 *
 * @type {Log}
 */
module.exports = new (class Log extends Configurable {

  /**
   * @param {Object} config
   * @param {String} config.level log level
   */
  constructor(config) {
    super(config);

    this.logger = Logger.create('evt-auth');
    this.levels = Logger.LogLevels;

    ['debug', 'info', 'error']
      .forEach(method => this[method] = this.logger[method].bind(this.logger));
  }

  /**
   * Merges new configuration to existing one.
   *
   * @param {Object} newConfig
   */
  setup(newConfig) {
    super.setup(newConfig);

    Logger.setLogLevel(this.config.level);
  }
})(defaultConfig);