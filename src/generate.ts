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
  const projectsFile = path.join(props.startDir, 'projects.ts');
  const projects = await (await import(projectsFile)).projects();
  const registeredProjectNames = Object.keys(projects);
  let processingProjects = registeredProjectNames;
  if (props.projectNames && props.projectNames.length > 0) {
    // verify first if any projects is not recognized
    const notFoundProjects = ramda.difference(
      props.projectNames,
      registeredProjectNames,
    );
    if (notFoundProjects.length > 0) {
      console.error(
        `Project ${notFoundProjects.join(', ')} is missing in projects.ts file`,
      );
      return;
    }
    processingProjects = props.projectNames;
  }
  for (const processingProject of processingProjects) {
    await generateOne({
      startDir: props.startDir,
      templatePath: projects[processingProject],
    });
  }
};
