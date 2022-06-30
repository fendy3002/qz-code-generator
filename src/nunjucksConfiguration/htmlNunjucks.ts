import * as nunjucks from 'nunjucks';

export const htmlNunjucks = nunjucks.configure({
  tags: {
    blockStart: '|%',
    blockEnd: '%|',
    variableStart: '|$',
    variableEnd: '$|',
    commentStart: '|#',
    commentEnd: '#|',
  },
});
