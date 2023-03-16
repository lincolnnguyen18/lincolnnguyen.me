import { calculateActualStringForTimer, formatStringForTimer } from './stringUtils';

describe('stringUtils', () => {
  it('formatStringForTimer', () => {
    const input = '990';
    const res = formatStringForTimer(input);
    console.log(res);
  });

  it('calculateActualStringForTimer', () => {
    const input = '00:09:90';
    const res = calculateActualStringForTimer(input);
    console.log(res);
  });
});
