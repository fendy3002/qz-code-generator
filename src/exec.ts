#!/usr/bin/env node
import * as commandLineArgs from 'command-line-args';

import { generate } from './generate';

const optionDefinitions = [
  { name: 'template', alias: 't', type: String, defaultOption: true },
];
export const doExec = async () => {
  const option = commandLineArgs(optionDefinitions);
  option.template = option.template ?? '';
  await generate({
    templatePath: option.template,
  });
};
doExec();
