import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const positions = ['center center', 'center top', 'center bottom'];

const initialState = {
  bodyScroll: true,
  navMenu: {
    open: false,
    children: null,
    // items-start, ml-3, ml-1; items-end, mr-3 and mr-1
    containerTwStyle: 'items-start',
    buttonTwStyle: 'ml-3',
    menuTwStyle: 'mr-1',
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
    mergeSlice: (state, action) => {
      _.merge(state, action.payload);
    },
    closeNavMenu: (state) => {
      _.merge(state.navMenu, { open: false, items: [] });
      state.bodyScroll = true;
    },
    openNavMenu: (state, action) => {
      const { position = 'left', children = null, isMainMenu = true } = action.payload || {};

      if (position === 'left') {
        _.merge(state.navMenu, { containerTwStyle: 'items-start', buttonTwStyle: 'ml-3', menuTwStyle: 'ml-1' });
      } else if (position === 'right') {
        _.merge(state.navMenu, { containerTwStyle: 'items-end', buttonTwStyle: 'mr-3', menuTwStyle: 'mr-1' });
      }
      const navMenu = document.getElementById('nav-menu');
      if (navMenu) {
        navMenu.scrollTop = 0;
      }
      _.merge(state.navMenu, { open: true, isMainMenu });
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
