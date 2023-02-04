import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const positions = ['center center', 'center top', 'center bottom'];

const initialState = {
  bodyScroll: true,
  scrollPosition: 0,
  navMenu: {
    open: false,
    hideOnlyChildren: false,
    children: null,
    // left: items-start, ml-3, ml-1
    // right: items-end, mr-3 and mr-1
    containerTwStyle: 'items-start',
    buttonTwStyle: 'ml-3',
    menuTwStyle: 'mr-1',
    centerContent: false,
    easyClose: true,
  },
  windowValues: {
    width: 0,
    height: 0,
  },
  backgroundPosition: _.sample(positions),
  count: 0,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    closeNavMenu: (state) => {
      _.merge(state.navMenu, { open: false, items: [], easyClose: true });
      state.bodyScroll = true;
    },
    hideNavMenuChildren: (state) => {
      _.merge(state.navMenu, { hideOnlyChildren: true });
    },
    openNavMenu: (state, action) => {
      const { position = 'left', children = null, isMainMenu = true, hideOnlyChildren = false, centerContent = false, easyClose = true } = action.payload || {};

      if (position === 'left') {
        _.merge(state.navMenu, { containerTwStyle: 'items-start', buttonTwStyle: 'ml-3', menuTwStyle: 'ml-1' });
      } else if (position === 'right') {
        _.merge(state.navMenu, { containerTwStyle: 'items-end', buttonTwStyle: 'mr-3', menuTwStyle: 'mr-1' });
      }
      if (centerContent) {
        _.merge(state.navMenu, { menuTwStyle: 'mr-1 w-full' });
      }
      const navMenu = document.getElementById('nav-menu');
      if (navMenu) {
        navMenu.scrollTop = 0;
      }
      _.merge(state.navMenu, { open: true, isMainMenu, hideOnlyChildren, centerContent, easyClose });
      state.bodyScroll = false;
      state.navMenu.children = children;
    },
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

const commonActions = commonSlice.actions;
const commonReducer = commonSlice.reducer;
const commonSelector = (state) => state.common;

export { commonActions, commonReducer, commonSelector };
