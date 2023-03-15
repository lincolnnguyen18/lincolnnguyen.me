import { formatStringForTimer } from './stringUtils';

describe('stringUtils', () => {
  it('formatStringForTimer', () => {
    const input = 12;
    const res = formatStringForTimer(input);
    console.log(res);
  });
});
