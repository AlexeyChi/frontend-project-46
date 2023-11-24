#!/usr/bin/env node
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information');

program
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format');

program.parse();