#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const log = require('../lib/log');
const runner = require('../index');
const formatters = require('./formatters');

/////////////////////////////////////////////////////////

program
  .version(require('../package.json').version)
  .arguments('<cmd> [args...]');

program.on('--help', () => {
  console.log(chalk.red('AVAILABLE COMMANDS'), '///');
  console.log(`
    Syntax ${chalk.red('///')}
      evt-auth <cmd> [options...]
      
    Commands ${chalk.red('///')}
      add      adds new field to configuration store (account)
        ${chalk.grey('evt-auth add QA-42')} 
        ${chalk.grey('evt-auth add "My Account"')} 
        
      list     lists all available configuration fields
        ${chalk.grey('evt-auth list')}         
        
      set      sets the given value by given path in store
        ${chalk.grey('evt-auth set QA6.authorization i65DFShdfgdfg523FDst')} 
        ${chalk.grey('evt-auth set gist.token 5RdsY6Wt745T953TqqweT53')}
        ${chalk.grey('evt-auth set main.apiUrl https://api-eu.evrythng.com')}
        ${chalk.grey('evt-auth set user.name "Dashe Avenhrust"')}
        
      get      receives the configuration located by given path in store
        ${chalk.grey('evt-auth get QA6')}        
        ${chalk.grey('evt-auth get valut.roles.0')}
                
                
  `)
});

program
  .action(run)
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}

/////////////////////////////////////////////////////////

function run(cmd, opts) {
  if (isDefined(cmd)) {
    if (isExist(cmd)) {
      execute(cmd, opts)
        .catch(err => exit(err));
    } else {
      exit(`Command not supported: ${cmd}`);
    }
  } else {
    exit('No command given');
  }
}

function execute(cmd, opts) {
  return runner[cmd].apply(runner, opts)
    .then(r =>
      formatters[cmd] ?
        formatters[cmd](r) : formatters.default(r)
    )
    .then(msg => console.log(msg));
}

function isDefined(val) {
  return typeof val !== 'undefined';
}

function isExist(cmd) {
  return isDefined(runner[cmd]);
}

function exit(msg) {
  log.error(msg);
  process.exit(1);
}