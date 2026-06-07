#!/usr/bin/env node

import { Command } from 'commander';
import { appDescription, appName, version } from '../shared/constants';

const program = new Command();

program
  .name(appName)
  .description(appDescription)
  .version(version)
  .helpOption('-h, --help', 'display help for command');

if (process.argv.length <= 2) {
  program.outputHelp();
}

program.parse(process.argv);
