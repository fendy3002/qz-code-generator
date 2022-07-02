import * as path from 'path';

import { loadSchemaFolder } from './loadSchemaFolder';
import { makeLogger } from './makeLogger';
import { renderPath } from './renderPath';
import { GenerateOneProps } from './types/GenerateOneProps';

const logger = makeLogger();

export const generateOne = async (props: GenerateOneProps) => {
  const startDir = path.join(props.startDir, props.templatePath);
  logger.info('processing: ', startDir);
  const helperDir = path.join(startDir, 'helper');
  const templateDir = path.join(startDir, 'template');
  const outputDir = path.join(startDir, 'output');
  const extensionDir = path.join(startDir, 'extension');
  const schemaPath = path.join(startDir, 'schema');
  logger.info({
    helperDir,
    templateDir,
    outputDir,
    extensionDir,
    schemaPath,
  });

  const processingSchemas = await loadSchemaFolder({
    logger: logger,
    helperDir: helperDir,
    templateDir: templateDir,
    outputDir: outputDir,
    extensionDir: extensionDir,
    schemaPath: schemaPath,
  });

  for (const schema of processingSchemas) {
    await renderPath(logger)('', schema.context);
  }
};
