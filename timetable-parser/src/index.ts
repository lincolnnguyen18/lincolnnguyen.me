import { getCellsInColumn, setAttributeOfElement, textIsPresent } from 'utils';
import { remote } from 'webdriverio';

async function googleSearch () {
  const browser = await remote({
    capabilities: {
      browserName: 'chrome',
    },
    port: 9515,
  });

  await browser.url('https://www.tv-tokyo.co.jp/timetable/broad_tvtokyo/thisweek');
  await browser.maximizeWindow();
  await browser.waitUntil(() => browser.execute(textIsPresent, '5:25'), { timeout: 10000 });

  const toResizeQuerySelector = '#timetable_weekly_body > tr:nth-child(1446) > td:nth-child(1)';
  await browser.execute(setAttributeOfElement, toResizeQuerySelector, 'style', 'height: 1000px;');

  const startingScrollPosition = 222;
  const startingPoint = { x: 250, y: 60 };
  const cells = await getCellsInColumn(browser, startingScrollPosition, startingPoint);
  
  await browser.execute((cells) => console.log('cells:', cells), cells);
}

googleSearch();
