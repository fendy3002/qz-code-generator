import { isArray } from './isArray';

export const asArray = (val: any) => {
  if (isArray(val)) {
    return val;
  } else {
    return [val];
  }
};
