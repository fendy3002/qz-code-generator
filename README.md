# @fendy3002/qz-code-generator

Simple code generator made by nodejs.

# Installation

Use `@fendy3002/qz-exec` to initialize a code-generator project easily, by running:

```
npx @fendy3002/qz-exec@latest create_codegen <project_name>
```

If the `project_name` is not supplied, it'll create one in a folder named `codegen`. If the target folder is not empty, the command will fail.

Afterwards, cd into the project folder (`codegen` by default). Then run `npm install` (or `yarn install` if you use yarn). Then you can try `npm run generate` and see the result at `output/myproject` folder.

# Schema

The first is schema files, located at `projects/myproject/schema` folder. There's one schema pre-generated named `myschema.json`. Schema is the business model, or one can say it's simply a sql table, or mongodb collection.

It is a json file, with unrestricted content except it must be an object and not an array. That means you can put any properties, sub-properties and data anyway you want it to be rendered.

# Template

Next is template folder, located at `projects/myproject/template`. Inside, you can put any folder and file to be compiled & filled with information from schema file. After you run `npm run generate`, the compilation result will be created at `output/myproject` folder.

# Extension

Extension is a bunch of `.ts` file that can help during generate. Run the command `npm run make:extension` to make one. The result from `data` property can be used in `Template`.

# option.json

`option.json` is a file, located at `projects/myproject/option.json`. It is a json file used to configure generation process, such as prettier configuration.