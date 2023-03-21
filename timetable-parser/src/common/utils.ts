interface Point {
  x: number;
  y: number;
}

function textIsPresent (text: string): boolean {
  return document.querySelector('body')?.textContent.includes(text);
}

function wait (ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getElementInfo (element: Element): { text: string; rect: DOMRect } {
  return {
    text: element.textContent.trim(),
    rect: element.getBoundingClientRect(),
  };
}

function logInBrowser (...args): void {
  console.log(...args);
}

function getElementAtPoint (point: Point): Element | null {
  const element = document.elementFromPoint(point.x, point.y);
  // console.log('getElementAtPoint; element:', element);
  return element;
}

function getBoundingClientRect (element: Element): DOMRect | null {
  const rect = element.getBoundingClientRect();
  // console.log('getBoundingClientRect; rect:', rect);
  return rect;
}

function scrollTo (scrollPosition: number): void {
  window.scrollTo(0, scrollPosition);
}

function getScrollY (): number {
  return window.scrollY;
}

async function getCellsInColumn (
  browser: WebdriverIO.Browser,
  firstCell: Point,
  scrollByAmount: number,
  bottomScrollY: number,
): Promise<string[]> {
  const cells = [];
  await browser.execute(scrollTo, 0);

  do {
    const element = await browser.execute(getElementAtPoint, firstCell);
    const { text } = await browser.execute(getElementInfo, element);
    const scrollY = await browser.execute(getScrollY);
    // if (text === '' && cells.length > 0) {
    if (scrollY >= bottomScrollY) {
      break;
    }
    // check if text contains numbers matching time format such as 27:15 or 4:00 in addition to other text
    let validCell = false;
    const matchedText = text.match(/\d{1,2}:\d{2}/);
    if (matchedText?.length > 0 && matchedText[0] !== text) {
      validCell = true;
    }
    if (text !== '' && text !== cells[cells.length - 1] && validCell) {
      cells.push(text);
      await browser.execute(
        setAttributeOfElement,
        element,
        'style',
        'background-color: red;',
      );
    }
    await wait(1);
    await wait(1);
  } while (true);

  return cells;
}

async function getCellsInTable (
  browser: WebdriverIO.Browser,
  firstCell: Point,
  columnWidth: number,
  numColumns: number,
  scrollAmount: number,
  bottomScrollY: number,
): Promise<string[][]> {
  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    const cells = await getCellsInColumn(
      browser,
      { x: firstCell.x + i * columnWidth, y: firstCell.y },
      scrollAmount,
      bottomScrollY,
    );
    // console.log('cells:', cells);
    columns.push(cells);
    browser.execute(scrollTo, 0);

    await wait(100);
  }
  return columns;
}

/**
 * @param element - querySelector or Element
 */
function setAttributeOfElement (
  element: string | Element,
  attribute: string,
  value: string,
): void {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  if (!element) return;
  element.setAttribute(attribute, value);
}

function setAttributeOfElements (
  elements: string | Element[],
  attribute: string,
  value: string,
): void {
  if (typeof elements === 'string') {
    const nodeList = document.querySelectorAll(elements);
    // console.log('nodeList:', nodeList);
    elements = Array.from(nodeList);
  }
  if (!elements) return;
  elements.forEach((element) => {
    element.setAttribute(attribute, value);
  });
}

export {
  textIsPresent,
  wait,
  getCellsInColumn,
  logInBrowser,
  getElementInfo,
  getElementAtPoint,
  getBoundingClientRect,
  setAttributeOfElement,
  setAttributeOfElements,
  getCellsInTable,
};
