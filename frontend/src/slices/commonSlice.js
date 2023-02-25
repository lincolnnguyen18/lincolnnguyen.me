import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const positions = ['center center', 'center top', 'center bottom'];

const initialState = {
  scrollPosition: 0,
  navMenu: {
    open: false,
    hideOnlyChildren: false,
    children: null,
    // left: items-start, ml-3, ml-1
    // right: items-end, mr-3 and mr-1
    containerTwStyle: 'items-start',
    menuTwStyle: 'mr-1',
    centerContent: false,
    easyClose: true,
    hideCloseButton: false,
  },
  windowValues: {
    width: 0,
    height: 0,
  },
  backgroundPosition: _.sample(positions),
  loggedIn: true,
  showLogin: null,
  browser: null,
  // {"name":"chrome","version":"109.0.0","os":"Mac OS","type":"browser"}
  // name = chrome, ios, edge-chromium, safari
  // os = iOS, Android OS, Mac OS, Windows 10, Linux
  transcriptionSupported: null,
  autoScrollOn: true,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    closeNavMenu: (state) => {
      if (!state.loggedIn) state.showLogin = null;
      _.merge(state.navMenu, { open: false, items: [], easyClose: true });
    },
    hideNavMenuChildren: (state) => {
      _.merge(state.navMenu, { hideOnlyChildren: true });
    },
    clearNavMenuChildren: (state) => {
      _.merge(state.navMenu, { children: null });
    },
    openNavMenu: (state, action) => {
      const { position = 'left', children = null, isMainMenu = true, hideOnlyChildren = false, centerContent = false, easyClose = true, hideCloseButton = false } = action.payload || {};

      if (position === 'left') {
        _.merge(state.navMenu, { containerTwStyle: 'items-start', menuTwStyle: '' });
      } else if (position === 'right') {
        _.merge(state.navMenu, { containerTwStyle: 'items-end', menuTwStyle: '' });
      }
      if (centerContent) {
        _.merge(state.navMenu, { menuTwStyle: 'w-full' });
      }
      const navMenu = document.getElementById('nav-menu');
      if (navMenu) {
        navMenu.scrollTop = 0;
      }
      _.merge(state.navMenu, { open: true, isMainMenu, hideOnlyChildren, centerContent, easyClose, hideCloseButton });
      state.navMenu.children = children;
    },
    scrollToTop: (_, action) => {
      const { useSmoothScroll = true } = action.payload || {};
      window.scrollTo({
        top: 0,
        behavior: useSmoothScroll ? 'smooth' : 'auto',
      });
      const container = document.getElementById('overflow-container');
      if (!container) return;
      container.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    scrollToBottom: (state, action) => {
      const ignoreAutoScroll = action.payload;
      if (!state.autoScrollOn && !ignoreAutoScroll) return;
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
      const container = document.getElementById('overflow-container');
      if (!container) return;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    },
    scrollElementIntoView: (state, action) => {
      const element = document.getElementById(action.payload);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  },
});

const commonActions = commonSlice.actions;
const commonReducer = commonSlice.reducer;
const commonSelector = (state) => state.common;

export { commonActions, commonReducer, commonSelector };
