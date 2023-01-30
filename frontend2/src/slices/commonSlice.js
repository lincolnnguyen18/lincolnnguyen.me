import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  bodyScroll: true,
  navMenu: {
    open: false,
    items: [],
  },
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
      state.navMenu = { open: false, items: [] };
      state.bodyScroll = true;
    },
    openNavMenu: (state, action) => {
      state.navMenu = {
        open: true,
        items: action.payload,
      };
      state.bodyScroll = false;
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
