import { removeEmptyLines, splitText } from './stringUtils';
import { text } from './testData';

describe('stringUtils', () => {
  it('splitText', () => {
    const res = splitText(text);
    console.log(res.length);
  });

  it('removeEmptyLines', () => {
    const res = removeEmptyLines(text);
    console.log(res);
  });
});
