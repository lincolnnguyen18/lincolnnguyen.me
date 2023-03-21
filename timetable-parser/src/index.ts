import { scrapeNhkgTimetable } from 'common/scrapers';
import fs from 'fs';

async function main () {
  const timestamp = Date.now();

  // const columns = await parseTvTokyoTimetable();
  // fs.writeFileSync('src/output/tvtokyo.json', JSON.stringify(columns, null, 2));

  const columns = await scrapeNhkgTimetable();
  fs.writeFileSync(`src/output/nhkg#${timestamp}.json`, JSON.stringify(columns, null, 2));
}

main();
