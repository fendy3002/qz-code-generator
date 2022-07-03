import * as commandLineArgs from 'command-line-args';
import { readdirSync } from 'fs';
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

  const projectFileNames = readdirSync(path.join(startDir, 'projects'));

  let selectedProject: string;
  if (option.project) {
    if (!projectFileNames.some((k) => k == option.project)) {
      console.error(
        `ERROR: project ${option.project} is does not exists in projects folder`,
      );
      return;
    }
    selectedProject = option.project;
  } else {
    while (!selectedProject) {
      const promptsResult = await prompts({
        type: 'select',
        name: 'value',
        message: 'Choose the project to create extension to:',
        choices: projectFileNames.map((k) => ({
          title: k,
          value: k,
        })),
        initial: 0,
      });
      selectedProject = promptsResult.value;
    }
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
    startDir: path.join(startDir, selectedProject),
    selectedProject: selectedProject,
    extensionName: extensionName,
  });
};
