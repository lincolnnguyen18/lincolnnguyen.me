function getScrollPositionFromBottom () {
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;
  const distanceFromBottom = documentHeight - (scrollPosition + viewportHeight);
  return distanceFromBottom;
}

export { getScrollPositionFromBottom };
