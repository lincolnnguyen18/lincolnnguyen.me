import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

const homeScreen = {
  path: '/',
  color: 'bg-green-custom',
  label: 'Home',
};

const messagesScreen = {
  path: '/messages',
  color: 'bg-red-custom',
  label: 'Messages',
};

const transcribeScreen = {
  path: '/transcribe',
  color: 'bg-purple-custom',
  label: 'Transcribe',
};

const nonHomeScreens = [messagesScreen, transcribeScreen];

const noNav = ['/login', '/testing'];
const subScreen = ['/account'];

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

function getNavColor (location, history) {
  if (!noNav.some(path => location.pathname.startsWith(path))) {
    let color = getCurrentScreen(history).color;
    if (subScreen.some(path => location.pathname.startsWith(path))) {
      color = getPreviousScreen(history).color;
    }
    return color;
  }
}

function statusReducer (state, action) {
  let status = 'pending';
  if (isFulfilled(action)) {
    status = 'fulfilled';
  } else if (isRejected(action)) {
    status = 'rejected';
  }
  const newStatuses = { ...state.statuses };
  const actionPrefix = action.type.split('/').slice(0, -1).join('/');
  newStatuses[actionPrefix] = status;
  // console.log('statuses', newStatuses);
  return { ...state, statuses: newStatuses };
}

function statusMatcher (action) {
  return isPending(action) || isFulfilled(action) || isRejected(action);
}

const statusMatcherReducer = [statusMatcher, statusReducer];

const actionStatus = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export {
  homeScreen,
  messagesScreen,
  transcribeScreen,
  nonHomeScreens,
  getPreviousScreen,
  getCurrentScreen,
  getNavColor,
  actionStatus,
  statusMatcherReducer,
};
