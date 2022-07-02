import * as commandLineArgs from 'command-line-args';

import { generate as generateLib } from '../generate';

const optionDefinitions = [
  {
    name: 'projects',
    alias: 'p',
    type: String,
    defaultOption: true,
    multiple: true,
  },
  { name: 'startDir', alias: 'l', type: String },
];
export const generate = async (argv: any[]) => {
  const option = commandLineArgs(optionDefinitions, { argv });
  const startDir = option.startDir ?? process.cwd();
  console.info('starting directory: ', startDir);

  option.projects = option.projects ?? [];

  await generateLib({
    startDir: startDir,
    projectNames: option.projects,
  });
};
