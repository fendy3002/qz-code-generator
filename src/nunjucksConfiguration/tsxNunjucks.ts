import * as nunjucks from 'nunjucks';

export const tsxNunjucks = nunjucks.configure({
  tags: {
    blockStart: '|%',
    blockEnd: '%|',
    variableStart: '|$',
    variableEnd: '$|',
    commentStart: '|#',
    commentEnd: '#|',
  },
});
