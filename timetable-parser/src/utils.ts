interface Point {
  x: number;
  y: number;
}

function setElementBackgroundColor (element: Element) : void {
  element.setAttribute('style', 'background-color: red;');
}

function textIsPresent (text : string) : boolean {
  return document.querySelector('body')?.textContent.includes(text);
}

function wait (ms : number) : Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getElementInfo (element : Element) : { text : string, rect : DOMRect } {
  return {
    text: element.textContent.trim(),
    rect: element.getBoundingClientRect(),
  };
}

function logInBrowser (message : any) : void {
  console.log(message);
}

function getElementAtPoint (point : Point) : Element | null {
  const element = document.elementFromPoint(point.x, point.y);
  console.log('getElementAtPoint; element:', element);
  return element;
}

function getBoundingClientRect (element: Element) : DOMRect | null {
  const rect = element.getBoundingClientRect();
  console.log('getBoundingClientRect; rect:', rect);
  return rect;
}

function scrollTo (scrollPosition : number) : void {
  window.scrollTo(0, scrollPosition);
}

async function getCellsInColumn (browser, startingScrollPosition: number, startingPoint : Point) : Promise<string[]> {
  const cells = [];
  await browser.execute(scrollTo, startingScrollPosition);
  await wait(1000);

  do {
    const element = await browser.execute(getElementAtPoint, startingPoint);
    const { text, rect } = await browser.execute(getElementInfo, element);
    if (text === '') {
      break;
    }
    cells.push(text);
    await browser.execute(setElementBackgroundColor, element);
    await browser.execute(rect => window.scrollBy(0, rect.height), rect);
  } while (true);
  
  return cells;
}

function setAttributeOfElement (querySelector : string, attribute : string, value : string) : void {
  const element = document.querySelector(querySelector);
  if (!element) return;
  element.setAttribute(attribute, value);
}

export { textIsPresent, setElementBackgroundColor, wait, getCellsInColumn, logInBrowser, getElementInfo, getElementAtPoint, getBoundingClientRect, setAttributeOfElement };
