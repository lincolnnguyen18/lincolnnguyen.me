import _ from 'lodash';
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { getActionName } from '../common/stringUtils';

const positions = ['center center', 'center top', 'center bottom'];

const initialState = {
  scrollPosition: 0,
  distanceFromBottom: 0,
  windowValues: {
    width: 0,
    height: 0,
  },
  backgroundPosition: _.sample(positions),
  browser: null,
  errors: [],
  pending: {},
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
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
    scrollToBottomHard: (state, action) => {
      const ignoreAutoScroll = action.payload;
      if (!state.autoScrollOn && !ignoreAutoScroll) return;
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'auto',
      });
      const container = document.getElementById('overflow-container');
      if (!container) return;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'auto',
      });
    },
    scrollElementIntoView: (state, action) => {
      const element = document.getElementById(action.payload);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  },
  extraReducers (builder) {
    builder
      .addMatcher(isPending, (state, action) => {
        state.errors = [];
        state.pending[getActionName(action)] = true;
        state.navMenuCloseButtonDisabled = true;

      })
      .addMatcher(isFulfilled, (state, action) => {
        state.pending[getActionName(action)] = false;
        state.navMenuCloseButtonDisabled = false;
      })
      .addMatcher(isRejected, (state, action) => {
        state.pending[getActionName(action)] = false;
        state.navMenuCloseButtonDisabled = false;
      });
  },
});

const commonActions = commonSlice.actions;
const commonReducer = commonSlice.reducer;
const commonSelector = (state) => state.common;

export { commonActions, commonReducer, commonSelector };
