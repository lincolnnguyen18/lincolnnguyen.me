import nhkg from 'output/nhkg.json';
import { parseNhkTimetableData } from 'common/parsers';
import { writeFileSync } from 'fs';

describe('Parsers', () => {
  it('parseNhkTimetableData', () => {
    const res = parseNhkTimetableData(nhkg, new Date('2022-02-21'));
    console.log(res);
    writeFileSync('src/output/nhkg-parsed.json', JSON.stringify(res, null, 2));
  });
});
