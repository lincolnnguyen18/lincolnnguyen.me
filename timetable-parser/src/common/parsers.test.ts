import nhkg from 'output/nhkg.json';
import { parseTvTokyoTimetableData } from 'common/parsers';
import { writeFileSync } from 'fs';

describe('Parsers', () => {
  it('should parse a string', () => {
    const res = parseTvTokyoTimetableData(nhkg, new Date('2022-02-21'));
    console.log(res);
    writeFileSync('src/output/tvtokyo-parsed.json', JSON.stringify(res, null, 2));
  });
});
