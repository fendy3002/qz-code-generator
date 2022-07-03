import { readdirSync } from 'fs';
import * as path from 'path';
import * as ramda from 'ramda';

import { generateOne } from './generateOne';
import { GenerateProps } from './types/GenerateProps';

export const generate = async (props: GenerateProps) => {
  console.info(
    'START: generate for projects: ' +
      (props.projectNames?.length > 0
        ? props.projectNames.join(', ')
        : '[ALL]'),
  );
  const projectFileNames = readdirSync(path.join(props.startDir, 'projects'));
  let processingProjects = projectFileNames;
  if (props.projectNames && props.projectNames.length > 0) {
    // verify first if any projects is not recognized
    const notFoundProjects = ramda.difference(
      props.projectNames,
      projectFileNames,
    );
    if (notFoundProjects.length > 0) {
      console.error(
        `Project ${notFoundProjects.join(', ')} is missing in projects folder`,
      );
      return;
    }
    processingProjects = props.projectNames;
  }
  for (const processingProject of processingProjects) {
    await generateOne({
      startDir: props.startDir,
      templatePath: processingProject,
    });
  }
};
