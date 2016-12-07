'use strict';

const chalk = require('chalk');

module.exports = {

  list: fields =>
    `Available configurations: ${chalk.blue(fields.join(', '))}`,

  add: field =>
    `Added configuration field: ${module.exports.default(field)}`,

  delete: field =>
    `Field ${field} was ${chalk.red('deleted')}`,

  default: msg => JSON.stringify(msg, null, 2)
};