import _ from 'lodash';
import React from 'react';
import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { userGqlClient } from '../gqlClients/userGqlClient';
import { wait } from '../common/timeUtils';
import { getActionName } from '../common/stringUtils';
import { Login } from '../apps/main/Login';
import { Register } from '../apps/main/Register';
import { transcribeActions } from './transcribeSlice';

const positions = ['center center', 'center top', 'center bottom'];

const initialState = {
  scrollPosition: 0,
  distanceFromBottom: 0,
  navMenu: {
    open: false,
    hideOnlyChildren: false,
    children: null,
    // left: items-start, ml-3, ml-1
    // right: items-end, mr-3 and mr-1
    containerClassName: 'items-start',
    menuClassName: 'mr-1',
    centerContent: false,
    easyClose: true,
    hideCloseButton: false,
  },
  navMenuCloseButtonDisabled: false,
  windowValues: {
    width: 0,
    height: 0,
  },
  backgroundPosition: _.sample(positions),
  loggedIn: false,
  token: undefined,
  showLogin: null,
  browser: null,
  // {"name":"chrome","version":"109.0.0","os":"Mac OS","type":"browser"}
  // name = chrome, ios, edge-chromium, safari
  // os = iOS, Android OS, Mac OS, Windows 10, Linux
  transcriptionSupported: null,
  autoScrollOn: true,
  user: undefined,
  loggingOut: false,
  indicatorTitle: null,
  indicatorMessage: null,
  errors: [],
  pending: {},
  loadingOpen: false,
  loadingTitle: 'Loading',
  alertOpen: false,
  alertTitle: null,
  alertMessage: null,
  menuOpen: false,
  menuChildren: null,
  menuChildrenHidden: false,
  menuEasyClose: true,
};

const openRegister = createAsyncThunk(
  'common/openRegister',
  async (_, { dispatch }) => {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    dispatch(commonActions.openNavMenu({
      position: 'left',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <Register />
      ),
    }));
  },
);

const openLogin = createAsyncThunk(
  'common/openLogin',
  async (_, { dispatch }) => {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    dispatch(commonActions.openNavMenu({
      position: 'left',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <Login />
      ),
    }));
  },
);

const getToken = createAsyncThunk(
  'common/getToken',
  async ({ username, password }, { dispatch }) => {
    const token = await userGqlClient.getToken({
      username,
      password,
    });
    if (token) {
      Cookies.set('token', token, { expires: 7 });
    } else {
      dispatch(commonActions.setSlice({ errors: ['Invalid username or password'] }));
    }
    dispatch(commonActions.setSlice({ token }));
  },
);

const getUser = createAsyncThunk(
  'common/getUser',
  async (_, { dispatch }) => {
    const user = await userGqlClient.getUser();
    if (user) {
      dispatch(commonActions.setSlice({ user, loggedIn: true }));
      dispatch(transcribeActions.setSlice({ transcribeLang: user.transcribeLang, translateLang: user.translateLang, playbackSpeed: user.playbackSpeed, cutOffType: user.transcribeCutOffType }));
    } else {
      Cookies.remove('token');
      dispatch(commonActions.setSlice({ showLogin: '/', loggedIn: false, token: null, user: null, loggingOut: true }));
      dispatch(openLogin());
    }
  },
);

const registerUser = createAsyncThunk(
  'common/registerUser',
  async ({ username, password, confirmPassword }, { dispatch }) => {
    const errors = await userGqlClient.registerUser({ username, password, confirmPassword });
    if (errors.length === 0) {
      dispatch(getToken({ username, password }));
    } else {
      dispatch(commonActions.setSlice({ errors }));
    }
  },
);

const switchMenuChildren = createAsyncThunk(
  'common/switchMenuChildren',
  async (props, { dispatch }) => {
    const { children, easyClose = true } = props;
    dispatch(commonActions.setSlice({ menuChildrenHidden: true }));
    await wait(200);
    dispatch(commonActions.setSlice({ menuChildren: children, menuEasyClose: easyClose }));
    await wait(50);
    dispatch(commonActions.setSlice({ menuChildrenHidden: false }));
  },
);

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    closeNavMenu: (state) => {
      // if (!state.loggedIn) state.showLogin = null;
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
        _.merge(state.navMenu, { containerClassName: 'items-start', menuClassName: '' });
      } else if (position === 'right') {
        _.merge(state.navMenu, { containerClassName: 'items-end', menuClassName: '' });
      }
      if (centerContent) {
        _.merge(state.navMenu, { menuClassName: 'w-full' });
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
    scrollToTopHard: (state, action) => {
      const ignoreAutoScroll = action.payload;
      if (!state.autoScrollOn && !ignoreAutoScroll) return;
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
      const container = document.getElementById('overflow-container');
      if (!container) return;
      container.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    },
    scrollElementIntoView: (state, action) => {
      const element = document.getElementById(action.payload);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    openLoading: (state, action) => {
      const { title = 'Loading' } = action.payload || {};
      state.loadingTitle = title;
      state.loadingOpen = true;
    },
    closeLoading: (state) => {
      state.loadingOpen = false;
    },
    openAlert: (state, action) => {
      const { open = true, title = 'Error', message = 'An error has occurred' } = action.payload || {};
      state.alertOpen = open;
      state.alertTitle = title;
      state.alertMessage = message;
    },
    closeAlert: (state) => {
      state.alertOpen = false;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
      state.menuEasyClose = true;
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
export { getToken, getUser, openLogin, openRegister, registerUser, switchMenuChildren };
