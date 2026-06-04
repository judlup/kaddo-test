#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('todo')
  .description('A simple CLI TODO app')
  .version('0.1.0');

program.parse(process.argv);
