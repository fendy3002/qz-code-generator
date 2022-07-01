#!/usr/bin/env node
import * as commandLineArgs from 'command-line-args';
import { copyFileSync, existsSync, lstatSync, readdirSync } from 'fs';
import * as path from 'path';

const optionDefinitions = [
  { name: 'folder', alias: 'f', type: String, defaultOption: true },
];

const copyFolderContentSync = (sourcedir: string, targetdir: string) => {
  const sourceContent = readdirSync(sourcedir);
  for (const each of sourceContent) {
    const eachPath = path.join(sourcedir, each);
    const targetEachPath = path.join(targetdir, each);
    if (lstatSync(eachPath).isDirectory()) {
      return copyFolderContentSync(eachPath, targetEachPath);
    } else {
      copyFileSync(eachPath, targetEachPath);
    }
  }
};

function main() {
  const option = commandLineArgs(optionDefinitions);
  const workdir = path.join(process.cwd(), option.folder ?? 'codegen');
  console.log(`Creating codegen app at ${workdir}`);

  if (existsSync(workdir)) {
    const dirContent = readdirSync(workdir);
    if (dirContent && dirContent.length > 0) {
      console.error('Destination folder is not empty, stopping...');
    }
  }
  copyFolderContentSync(path.join(__dirname, 'createAppSource'), workdir);
}

if (require.main === module) {
  main();
}
