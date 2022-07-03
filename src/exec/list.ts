import * as commandLineArgs from 'command-line-args';
import { readdirSync } from 'fs';
import * as path from 'path';

const optionDefinitions = [{ name: 'startDir', alias: 'l', type: String }];
export const list = async (argv: any[]) => {
  const option = commandLineArgs(optionDefinitions, { argv });
  const startDir = option.startDir ?? process.cwd();

  const projectFileNames = readdirSync(path.join(startDir, 'projects'));

  console.log(
    [
      `List of projects registered under projects folder:`,
      ``,
      ...projectFileNames.map((k) => `* ${k}`),
    ].join('\n'),
  );
};
