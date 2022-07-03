import * as path from 'path';

import { FOLDER_EXTENSIONS, FOLDER_OUTPUT, FOLDER_PROJECTS } from './const';
import { loadSchemaFolder } from './loadSchemaFolder';
import { renderPath } from './renderPath';
import { GenerateOneProps } from './types/GenerateOneProps';

export const generateOne = async (props: GenerateOneProps) => {
  const startDir = path.join(
    props.startDir,
    FOLDER_PROJECTS,
    props.templatePath,
  );
  console.info('processing: ', startDir);
  const helperDir = path.join(startDir, 'helper');
  const templateDir = path.join(startDir, 'template');
  const outputDir = path.join(
    props.startDir,
    FOLDER_OUTPUT,
    props.templatePath,
    'output',
  );
  const extensionDir = path.join(startDir, FOLDER_EXTENSIONS);
  const schemaPath = path.join(startDir, 'schema');
  console.debug({
    helperDir,
    templateDir,
    outputDir,
    extensionDir,
    schemaPath,
  });

  const processingSchemas = await loadSchemaFolder({
    helperDir: helperDir,
    templateDir: templateDir,
    outputDir: outputDir,
    extensionDir: extensionDir,
    schemaPath: schemaPath,
  });

  for (const schema of processingSchemas) {
    await renderPath('', schema.context);
  }
};
