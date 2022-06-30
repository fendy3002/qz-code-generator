import { error } from '@fendy3002/qz-node';
import * as changeCase from 'change-case';
import * as fs from 'fs';
import * as path from 'path';

import { Context } from '../types';
import { appendObject, asArray, inArray, isArray, isObject } from './index';

export const getHelper = async (context: Context) => {
  const extensions: any = {};
  if (fs.existsSync(context.path.extension)) {
    for (const extensionFile of fs.readdirSync(context.path.extension)) {
      const extensionFullPath = path.join(
        context.path.extension,
        extensionFile,
      );
      const extensionRaw = (await import(extensionFullPath)).default;
      const extension = await extensionRaw(context.schema);
      let extensionName = '';
      if (!extension.name) {
        extensionName = path.basename(extensionFile);
      } else {
        extensionName = extension.name;
      }
      extensions['_' + extensionName] = extension.data;
    }
  }

  const renderHelper = (helperName: string, data: any) => {
    const replacedHelperName = helperName.replace('.template', '');
    let renderer = context.nunjucks.default;
    if (path.extname(replacedHelperName) == '.html') {
      renderer = context.nunjucks.html;
    }
    try {
      return renderer
        .render(path.join(context.path.helper, helperName), {
          _helper: helper,
          _data: data,
          schema: context.schema,
        })
        .replace(/\n\s*\n/g, '\n');
    } catch (ex) {
      throw error.rethrow
        .from(ex)
        .original()
        .message(`Problem rendering helper "${helperName}"`);
    }
  };

  const helper = {
    renderHelper,
    isArray: isArray,
    asArray: asArray,
    inArray: inArray,
    isObject: isObject,
    appendObject: appendObject,
    changeCase: changeCase,
    ...extensions,
    print: {
      open: '{{',
      close: '}}',
    },
    block: {
      open: '{%',
      close: '%}',
    },
  };
  return helper;
};
