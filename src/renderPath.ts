import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';

import { defaultNunjucks } from './nunjucksConfiguration/defaultNunjucks';
import { htmlNunjucks } from './nunjucksConfiguration/htmlNunjucks';
import { tsxNunjucks } from './nunjucksConfiguration/tsxNunjucks';
import { replaceFileName } from './replaceFileName';
import { Context } from './types';

const supportedPrettierFileFormat = [
  { ext: '.ts', parser: 'typescript' },
  { ext: '.js', parser: 'babel' },
  //    { ext: ".html", parser: "html" }
];

export const renderPath = (logger) => {
  const innerRenderPath = async (currentPath: string, option: Context) => {
    const replacedCurrentPath = replaceFileName(currentPath, option.schema);
    const dirs = fs.readdirSync(path.join(option.path.template, currentPath));
    for (const item of dirs) {
      const itemPath = path.join(option.path.template, currentPath, item);
      const itemOutputPath = path.join(
        option.path.output,
        replacedCurrentPath,
        replaceFileName(item, option.schema),
      );
      const fileStat = fs.lstatSync(itemPath);

      if (fileStat.isFile()) {
        logger.info({ message: 'processing file: ' + itemPath });
        const realExtension = path.extname(
          replaceFileName(item, option.schema),
        );
        let fileContent = '';
        if (realExtension == '.html') {
          fileContent = htmlNunjucks.render(itemPath, {
            _helper: option.helper,
            ...option.schema,
          });
        } else if (realExtension == '.tsx') {
          fileContent = tsxNunjucks.render(itemPath, {
            _helper: option.helper,
            ...option.schema,
          });
        } else {
          fileContent = defaultNunjucks.render(itemPath, {
            _helper: option.helper,
            ...option.schema,
          });
        }
        fileContent = fileContent.replace(/\n\s*\n/g, '\n');

        const prettierFormat = supportedPrettierFileFormat.filter(
          (k) => k.ext == realExtension,
        );
        if (
          option.schemaOption.prettier &&
          prettierFormat.length > 0 &&
          !option.schemaOption.excludePrettier.some((k) => k == realExtension)
        ) {
          fileContent = prettier.format(fileContent, {
            parser: prettierFormat[0].parser,
            arrowParens: 'always',
            tabWidth: 4,
            proseWrap: 'never',
            ...option.schemaOption.prettier,
          });
        }
        fs.writeFileSync(itemOutputPath, fileContent);
      } else {
        if (!fs.existsSync(itemOutputPath)) {
          fs.mkdirSync(itemOutputPath, {
            recursive: true,
          });
        }
        await innerRenderPath(path.join(currentPath, item), option);
      }
    }
  };
  return innerRenderPath;
};
