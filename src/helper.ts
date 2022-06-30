import path = require('path');
import fs = require('fs');
import { error } from '@fendy3002/qz-node';
import * as types from './types';

import nunjucks = require('nunjucks');
const getHelper = async (context: types.Context) => {
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
  const isArr = (val: any) => {
    return Array.isArray(val);
  };
  const asArr = (val: any) => {
    if (isArr(val)) {
      return val;
    } else {
      return [val];
    }
  };
  const inArray = (stack: [any], needle: any) => {
    return stack.some(needle);
  };
  const isObj = (val: any) => {
    return typeof val == 'object';
  };
  const appendObj = (original, additional) => {
    return {
      ...original,
      ...additional,
    };
  };

  const helper = {
    renderHelper,
    isArr,
    asArr,
    inArray,
    isObj,
    appendObj,
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
export default getHelper;
