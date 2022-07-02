import * as commandLineArgs from 'command-line-args';
import * as path from 'path';

const optionDefinitions = [{ name: 'startDir', alias: 'l', type: String }];
export const list = async (argv: any[]) => {
  const option = commandLineArgs(optionDefinitions, { argv });
  const startDir = option.startDir ?? process.cwd();

  const projectsFile = path.join(startDir, 'projects.ts');
  const projects = await (await import(projectsFile)).projects();
  const registeredProjectNames = Object.keys(projects);

  console.log(
    [
      `List of projects registered under projects.ts:`,
      ``,
      ...registeredProjectNames.map((k) => `* ${k}`),
    ].join('\n'),
  );
};
