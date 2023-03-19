import { remote } from 'webdriverio';
import { getBottomRightCorner, setElementBackgroundColor, textIsPresent } from 'utils';

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
  // await browser.execute(() => alert('Page loaded!'));

  const point = { x: 250, y: 350 };
  const { bottomRight, height } = await browser.execute(getBottomRightCorner, point);
  console.log('Bottom right corner:', bottomRight);
  console.log('Height:', height);
  await browser.execute(setElementBackgroundColor, bottomRight);
  // console.log('Bottom right corner:', bottomRightCorner);

  // // const searchInput = await browser.$('[name="q"]');
  // // await searchInput.setValue('webdriverio');
  // // await browser.keys(Key.Enter);
  // // await browser.pause(2000); // Wait for the search results to load
  // // const searchResults = await browser.$$('#search .g');
  // // console.log(`Number of search results: ${searchResults.length}`);
  // // await browser.deleteSession();
}

googleSearch();
