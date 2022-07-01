#!/usr/bin/env node
import * as commandLineArgs from 'command-line-args';

import { generate } from './generate';
import { makeLogger } from './makeLogger';

const optionDefinitions = [
  { name: 'template', alias: 't', type: String, defaultOption: true },
  { name: 'startDir', alias: 'l', type: String },
];
const logger = makeLogger();

export const doExec = async () => {
  logger.info('process.cwd(): ', process.cwd());

  const option = commandLineArgs(optionDefinitions);
  option.template = option.template ?? '';

  await generate({
    templatePath: option.template,
    startDir: option.startDir ?? process.cwd(),
  });
};
doExec();
