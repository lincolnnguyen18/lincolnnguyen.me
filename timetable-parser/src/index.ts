import { getBoundingClientRect, getElementAtPoint, setElementBackgroundColor, textIsPresent, wait } from 'utils';
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
  // await browser.execute(() => alert('Page loaded!'));

  await browser.execute(() => {
    const element = document.querySelector('#timetable_weekly_body > tr:nth-child(1446) > td:nth-child(1)');
    if (!element) return;
    element.setAttribute('style', 'height: 1000px;');
  });

  /*

    Pseudocode

    Given starting point, get element at point
    
    While element is not null
      Set element background color to red
      Get element bounding rectangle
      Scroll element out of view (scroll to bottom of element)
      Get new element at point

  */

  await browser.execute(() => window.scrollTo(0, 222));
  await wait(1000);
  // await browser.execute(() => alert('Starting'));
  const startingPoint = { x: 250, y: 60 };
  const cells = [];
  let element = await browser.execute(getElementAtPoint, startingPoint);
  // append visible text of element to cells
  let text = await browser.execute(element => element.textContent, element);
  cells.push(text);

  while (element) {
    await browser.execute(setElementBackgroundColor, element);
    const rect = await browser.execute(getBoundingClientRect, element);
    await browser.execute(rect => window.scrollBy(0, rect.height), rect);
    element = await browser.execute(getElementAtPoint, startingPoint);
    text = await browser.execute(element => element.textContent, element);
    if (text === '') break;
    if (cells[cells.length - 1] !== text) {
      cells.push(text);
    }
    await browser.execute((cells) => console.log('cells:', cells), cells);
  }

  // const searchInput = await browser.$('[name="q"]');
  // await searchInput.setValue('webdriverio');
  // await browser.keys(Key.Enter);
  // await browser.pause(2000); // Wait for the search results to load
  // const searchResults = await browser.$$('#search .g');
  // console.log(`Number of search results: ${searchResults.length}`);
  // await browser.deleteSession();
}

googleSearch();
