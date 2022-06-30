#!/usr/bin/env node
import * as commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as lo from 'lodash';
import * as path from 'path';

import { getHelper } from './helper';
import { makeLogger } from './makeLogger';
import { defaultNunjucks } from './nunjucksConfiguration/defaultNunjucks';
import { htmlNunjucks } from './nunjucksConfiguration/htmlNunjucks';
import { renderPath } from './renderPath';
import * as types from './types';

const optionDefinitions = [
  { name: 'schema', alias: 's', type: String, defaultOption: true },
  { name: 'template', alias: 't', type: String },
];

const logger = makeLogger();

const doTask = async () => {
  const option = commandLineArgs(optionDefinitions);
  option.template = option.template || '';
  logger.info('process.cwd(): ', process.cwd());
  const helperDir = path.join(process.cwd(), option.template, 'helper');
  const templateDir = path.join(process.cwd(), option.template, 'template');
  const outputDir = path.join(process.cwd(), option.template, 'output');
  const extensionDir = path.join(process.cwd(), option.template, 'extension');
  const schemaPath = path.join(process.cwd(), option.schema);
  const schemaStat = fs.statSync(schemaPath);
  logger.info({
    helperDir,
    templateDir,
    outputDir,
    extensionDir,
    schemaPath,
  });
  const processingSchema = [];
  if (schemaStat.isFile()) {
    processingSchema.push(schemaPath);
  } else {
    // if directory, loop all schema
    for (const file of fs.readdirSync(schemaPath)) {
      const fullPath = path.join(schemaPath, file);
      if (path.extname(file) == '.json' || path.extname(file) == '.js') {
        processingSchema.push(fullPath);
      }
    }
  }
  for (const schemaFilePath of processingSchema) {
    let schemaObj = null;
    if (path.extname(schemaFilePath) == '.json') {
      const schemaStr = fs.readFileSync(schemaFilePath, 'utf8');
      schemaObj = JSON.parse(schemaStr);
    } else {
      schemaObj = require(schemaFilePath).default;
    }

    logger.info('schema', schemaObj);
    const context: types.Context = {
      ...option,
      path: {
        helper: helperDir,
        template: templateDir,
        output: outputDir,
        extension: extensionDir,
      },
      schemaOption: lo.merge(
        {
          prettier: null,
          excludePrettier: [],
        },
        schemaObj.option,
      ),
      schema: schemaObj.schema,
      nunjucks: {
        default: defaultNunjucks,
        html: htmlNunjucks,
      },
    };
    const helper = await getHelper(context);
    context.helper = helper;
    await renderPath(logger)('', context);
  }
};
doTask();
