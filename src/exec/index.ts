#!/usr/bin/env node
import * as commandLineArgs from 'command-line-args';

import { generate } from './generate';
import { list } from './list';
import { makeExtension } from './makeExtension';

const optionDefinitions = [
  { name: 'command', type: String, defaultOption: true },
];

const mainOptions = commandLineArgs(optionDefinitions, {
  stopAtFirstUnknown: true,
});
const argv = mainOptions._unknown || [];

if (mainOptions.command === 'generate') {
  generate(argv);
} else if (mainOptions.command === 'make:extension') {
  makeExtension(argv);
} else if (mainOptions.command === 'list') {
  list(argv);
}
