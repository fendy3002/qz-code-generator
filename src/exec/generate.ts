import * as commandLineArgs from 'command-line-args';

import { generate as generateLib } from '../generate';
import { makeLogger } from '../makeLogger';

const optionDefinitions = [
  { name: 'template', alias: 't', type: String, defaultOption: true },
  { name: 'startDir', alias: 'l', type: String },
];
const logger = makeLogger();

export const generate = async (argv: any[]) => {
  logger.info('process.cwd(): ', process.cwd());

  const option = commandLineArgs(optionDefinitions, { argv });
  option.template = option.template ?? '';

  await generateLib({
    templatePath: option.template,
    startDir: option.startDir ?? process.cwd(),
  });
};
