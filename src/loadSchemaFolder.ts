import * as fs from 'fs';
import * as lo from 'lodash';
import * as path from 'path';

import { getHelper } from './helper';
import { defaultNunjucks } from './nunjucksConfiguration/defaultNunjucks';
import { htmlNunjucks } from './nunjucksConfiguration/htmlNunjucks';
import { Context } from './types';
import { LoadSchemaResult } from './types/LoadSchemaResult';

import winston = require('winston');

export const loadSchemaFolder = async (props: {
  schemaPath: string;
  helperDir: string;
  templateDir: string;
  outputDir: string;
  extensionDir: string;
}) => {
  const { schemaPath } = props;
  const processingSchema = [];
  // if directory, loop all schema
  for (const file of fs.readdirSync(schemaPath)) {
    const fullPath = path.join(schemaPath, file);
    if (path.extname(file) == '.json' || path.extname(file) == '.js') {
      processingSchema.push(fullPath);
    }
  }
  return await loadSchema({
    ...props,
    schemaPaths: processingSchema,
  });
};

export const loadSchema = async (props: {
  schemaPaths: string[];
  helperDir: string;
  templateDir: string;
  outputDir: string;
  extensionDir: string;
}) => {
  const { schemaPaths, helperDir, templateDir, outputDir, extensionDir } =
    props;
  const result: LoadSchemaResult = [];
  for (const schemaFilePath of schemaPaths) {
    let schemaObj = null;
    if (path.extname(schemaFilePath) == '.json') {
      const schemaStr = fs.readFileSync(schemaFilePath, 'utf8');
      schemaObj = JSON.parse(schemaStr);
    } else {
      schemaObj = require(schemaFilePath).default;
    }

    console.info('schema', schemaObj);
    const context: Context = {
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
    result.push({
      schemaObj: schemaObj,
      context: context,
    });
  }
  return result;
};
