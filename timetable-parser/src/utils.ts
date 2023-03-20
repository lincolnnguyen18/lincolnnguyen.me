interface Point {
  x: number;
  y: number;
}

function getBottomRightCorner (point : Point) : { bottomRight: Point, height: number } | null {
  const element = document.elementFromPoint(point.x, point.y);
  if (!element) {
    console.log('getBottomRightCorner; No element found at point:', point);
    return null;
  }
  console.log('Element text:', element.textContent);
  const rect = element.getBoundingClientRect();
  const bottomRight = { x: rect.x + rect.width, y: rect.y + rect.height };
  const height = rect.height;
  
  bottomRight.x -= 10;
  bottomRight.y -= 10;

  console.log('Bottom right corner:', bottomRight);
  console.log('Height:', height);

  // insert 10px by 10px blue circle at bottomRight position, use absolute positioning
  const circle = document.createElement('div');
  // set id to circle
  circle.setAttribute('style', 'position: absolute; width: 10px; height: 10px; border-radius: 50%; background-color: white; z-index: 999999; top: ' + bottomRight.y + 'px; left: ' + bottomRight.x + 'px;');
  document.body.appendChild(circle);

  return { bottomRight, height };
}

function getHeight (point : Point) : number | null {
  const element = document.elementFromPoint(point.x, point.y);
  if (!element) {
    console.log('getHeight; No element found at point:', point);
    return null;
  }
  const rect = element.getBoundingClientRect();
  const height = rect.height;
  console.log('Height:', height);
  return height;
}

// function setElementBackgroundColor (point : Point) : void {
//   const element = document.elementFromPoint(point.x, point.y);
//   if (!element) {
//     console.log('setElementBackgroundColor; No element found at point:', point);
//     return;
//   }
//   element.setAttribute('style', 'background-color: red;');
//   const children = element.querySelectorAll('*');
//   children.forEach((child) => {
//     child.setAttribute('style', 'color: white;');
//   });
// }

function setElementBackgroundColor (element: Element) : void {
  element.setAttribute('style', 'background-color: red;');
}

function textIsPresent (text : string) : boolean {
  return document.querySelector('body')?.textContent.includes(text);
}

function wait (ms : number) : Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function scrollIntoView (point : Point) : void {
  const element = document.elementFromPoint(point.x, point.y);
  if (!element) return;
  element.scrollIntoView();
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

export { getBottomRightCorner, textIsPresent, setElementBackgroundColor, wait, getHeight, scrollIntoView, getElementAtPoint, getBoundingClientRect };
