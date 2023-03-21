import { parseTvTokyoTimetable } from 'common/parsers';
import fs from 'fs';

async function main () {
  const columns = await parseTvTokyoTimetable();
  fs.writeFileSync('src/data/tvtokyo.json', JSON.stringify(columns, null, 2));
}

main();
