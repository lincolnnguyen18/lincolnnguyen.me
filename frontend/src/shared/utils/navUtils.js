const homeScreen = {
  path: '/',
  color: 'bg-green-custom',
  label: 'Home',
};

function getPreviousScreen (history) {
  if (history.length > 1) {
    return history[history.length - 2];
  } else {
    return homeScreen;
  }
}

function getCurrentScreen (history) {
  if (history.length > 0) {
    return history[history.length - 1];
  } else {
    return homeScreen;
  }
}

export { homeScreen, getPreviousScreen, getCurrentScreen };
