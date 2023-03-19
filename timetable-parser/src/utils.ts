interface Point {
  x: number;
  y: number;
}

function getBottomRightCorner (point : Point) : { bottomRight: Point, height: number } | null {
  const element = document.elementFromPoint(point.x, point.y);
  if (!element) return null;
  console.log('Element text:', element.textContent);
  const rect = element.getBoundingClientRect();
  const bottomRight = { x: rect.x + rect.width, y: rect.y + rect.height };
  const height = rect.height;
  return { bottomRight, height };
}

function setElementBackgroundColor (point : Point) : void {
  const element = document.elementFromPoint(point.x, point.y);
  if (!element) return;
  element.setAttribute('style', 'background-color: red;');
}

function textIsPresent (text : string) : boolean {
  return document.querySelector('body')?.textContent.includes(text);
}

function wait (ms : number) : Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { getBottomRightCorner, textIsPresent, setElementBackgroundColor, wait };
