import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

import { FOLDER_EXTENSIONS, FOLDER_PROJECTS } from '../const';
import { MakeExtensionProps } from '../types/MakeExtensionProps';

export const makeExtension = async (props: MakeExtensionProps) => {
  const extensionFileName = `${props.extensionName}.ts`;
  const extensionFolderPath = path.join(
    props.startDir,
    FOLDER_PROJECTS,
    props.selectedProject,
    FOLDER_EXTENSIONS,
  );
  if (!existsSync(extensionFolderPath)) {
    mkdirSync(extensionFolderPath, { recursive: true });
  }
  const extensionFilePath = path.join(extensionFolderPath, extensionFileName);

  if (existsSync(extensionFilePath)) {
    console.error(`Extension file ${extensionFilePath} already exists`);
  }
  const assetFilePath = path.join(
    __dirname,
    '..',
    '..',
    'assets',
    'sampleExtension',
    'index.ts',
  );
  const contentToWrite = readFileSync(assetFilePath, 'utf8').replace(
    '{NAME}',
    props.extensionName,
  );

  writeFileSync(extensionFilePath, contentToWrite);
  console.info(
    `Extension ${props.extensionName} has been created in ${path.join(
      FOLDER_PROJECTS,
      props.selectedProject,
      FOLDER_EXTENSIONS,
      extensionFileName,
    )}`,
  );
};
