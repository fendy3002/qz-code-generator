import * as path from 'path';

import { loadSchemaFolder } from './loadSchemaFolder';
import { makeLogger } from './makeLogger';
import { renderPath } from './renderPath';
import { GenerateProps } from './types/GenerateProps';

const logger = makeLogger();

export const generate = async (props: GenerateProps) => {
  logger.info('process.cwd(): ', process.cwd());
  const startDir = process.cwd();
  const helperDir = path.join(startDir, props.templatePath, 'helper');
  const templateDir = path.join(startDir, props.templatePath, 'template');
  const outputDir = path.join(startDir, props.templatePath, 'output');
  const extensionDir = path.join(startDir, props.templatePath, 'extension');
  const schemaPath = path.join(startDir, props.templatePath, 'schema');
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
