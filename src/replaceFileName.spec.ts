import { replaceFileName } from './replaceFileName';

describe('fileNameReplacer', function () {
  it('should replace', async function () {
    const schema = {
      Route: {
        Module: {
          Code: 'MyCode',
          Code2: 'MyCode2',
        },
      },
    };
    const fileNames = [
      '[Route.Module.Code].template',
      '[Route.Module.Code]-[Route.Module.Code].template',
      '[Route.Module.Code]-[Route.Module.Code2].template',
    ];
    const expected = ['MyCode', 'MyCode-MyCode', 'MyCode-MyCode2'];
    let index = 0;
    for (const fileName of fileNames) {
      const replacedFileName = replaceFileName(fileName, schema);
      expect(replacedFileName).toBe(expected[index]);
      index++;
    }
  });
});
