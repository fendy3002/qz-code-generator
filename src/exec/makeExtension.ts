import * as commandLineArgs from 'command-line-args';
import * as path from 'path';
import * as prompts from 'prompts';

import { makeExtension as makeExtensionLib } from '../makeExtension';

const optionDefinitions = [
  {
    name: 'startDir',
    alias: 'l',
    type: String,
  },
  { name: 'project', alias: 'p', type: String },
  { name: 'name', alias: 'n', type: String, defaultOption: true },
];
export const makeExtension = async (argv: any[]) => {
  const option = commandLineArgs(optionDefinitions, { argv });
  const startDir = option.startDir ?? process.cwd();

  const projectsFile = path.join(startDir, 'projects.ts');
  const projects = await (await import(projectsFile)).projects();
  const registeredProjectNames = Object.keys(projects);

  let selectedProject: string;
  if (option.project) {
    if (!registeredProjectNames.some((k) => k == option.project)) {
      console.error(
        `ERROR: project ${option.project} is does not exists in projects.ts`,
      );
      return;
    }
    selectedProject = option.project;
  } else {
    const promptsResult = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose the project to create extension to:',
      choices: registeredProjectNames.map((k) => ({
        title: k,
        value: k,
      })),
      initial: 0,
    });
    selectedProject = promptsResult.value;
  }

  let extensionName: string;
  if (option.name) {
    extensionName = option.name;
  } else {
    while (!extensionName) {
      const promptsResult = await prompts({
        type: 'text',
        message: 'Name of the extension (without .ts): ',
        name: 'value',
      });
      extensionName = promptsResult.value;
    }
  }
  await makeExtensionLib({
    startDir: path.join(startDir, projects[selectedProject]),
    selectedProject: selectedProject,
    extensionName: extensionName,
  });
};
