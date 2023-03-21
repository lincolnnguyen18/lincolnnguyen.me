import { getCellsInTable, logInBrowser, setAttributeOfElement, setAttributeOfElements, textIsPresent, wait } from 'common/utils';
import { ChannelsUrls } from 'data/data';
import { remote } from 'webdriverio';

async function parseTvTokyoTimetable (closeBrowerOnFinish = true): Promise<string[][]> {
  const browser = await remote({
    capabilities: {
      browserName: 'chrome',
    },
    port: 9515,
  });

  await browser.url(ChannelsUrls.tvtokyo);
  await browser.maximizeWindow();
  await browser.waitUntil(() => browser.execute(textIsPresent, '5:25'), { timeout: 10000 });

  const toResizeQuerySelector = '#timetable_weekly_body > tr:nth-child(1446) > td:nth-child(1)';
  await browser.execute(setAttributeOfElement, toResizeQuerySelector, 'style', 'height: 7000px;');

  const toAddPaddingQuerySelector = '.tbcms_timetable--state_weekly .tbcms_timetable__inner';
  await browser.execute(setAttributeOfElements, toAddPaddingQuerySelector, 'style', 'padding-right: 70px; !important');
  await wait(100);

  const firstCell = { x: 247, y: 165 };
  const columnWidth = 220;
  const numColumns = 7;
  const scrollAmount = 70;
  const bottomScrollY = 7000;
  const columns = await getCellsInTable(browser, firstCell, columnWidth, numColumns, scrollAmount, bottomScrollY);
  
  if (closeBrowerOnFinish) {
    await browser.deleteSession();
  } else {
    await browser.execute(logInBrowser, 'columns:', columns);
  }

  return columns;
}

async function parseNhkgTimetable (): Promise<string[][]> {
  const browser = await remote({
    capabilities: {
      browserName: 'chrome',
    },
    port: 9515,
  });

  await browser.url(ChannelsUrls.nhkg);
  await browser.maximizeWindow();
  await browser.waitUntil(() => browser.execute(textIsPresent, '6:00'), { timeout: 10000 });

  const firstCell = { x: 400, y: 340 };
  const columnWidth = 145;
  const numColumns = 8;
  const scrollAmount = 3;
  const bottomScrollY = 4700;

  const columns = await getCellsInTable(browser, firstCell, columnWidth, numColumns, scrollAmount, bottomScrollY);
  
  await browser.execute(logInBrowser, 'columns:', columns);

  return columns;
}

export { parseTvTokyoTimetable, parseNhkgTimetable };
