function getPreviousScreen (history) {
  if (history.length > 0) {
    return history[history.length - 1];
  } else {
    return {
      path: '/',
      color: 'bg-green-custom',
    };
  }
}

export { getPreviousScreen };
