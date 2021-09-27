#!/usr/bin/env node

const { Command } = require('commander');
const { version } = require('../package.json')
const program = new Command();
const deleteBranch = require('./deleteBranch')

program
  .option('-d, --grD', 'delete git branches', deleteBranch)

program.version(version);

program.parse();

if (!process.argv.slice(2).length) {
  program.outputHelp()
}