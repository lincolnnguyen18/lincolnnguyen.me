import _ from 'lodash';
import React from 'react';
import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { userGqlClient } from '../gqlClients/userGqlClient';
import { wait } from '../common/timeUtils';
import { closeMenu } from '../common/MenuUtils';
import { TextField } from '../components/TextField';
import { NavbarButton } from '../components/NavbarButton';
import { GroupDivider } from '../components/GroupDivider';
import { getActionName } from '../common/stringUtils';
import { Login } from '../apps/main/Login';

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
  errors: [],
  pending: {},
};

const openRegister = createAsyncThunk(
  'common/openRegister',
  async (_, { dispatch }) => {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    function onRegister (e) {
      e.preventDefault();
      dispatch(commonActions.setSlice({ showLogin: null, loggedIn: true }));
      closeMenu(dispatch);
    }

    dispatch(commonActions.openNavMenu({
      position: 'left',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <form className="flex flex-col w-full text-white items-center" onSubmit={onRegister}>
          <div className="flex flex-col w-full mt-3 mb-6 gap-2">
            <span className="font-semibold">Register</span>
            <div className="flex flex-col">
              <TextField placeholder="Username" autoFocus={true} type="username" name="title" dir="vert" />
              <GroupDivider dir="vert" />
              <TextField placeholder="Password" type="password" name="password" dir="vert" />
              <GroupDivider dir="vert" />
              <TextField placeholder="Confirm password" name="password2" type="password" dir="vert" />
            </div>
          </div>
          <div className="flex">
            <NavbarButton onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
            <GroupDivider dir="horiz" />
            <NavbarButton onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit">Register</NavbarButton>
          </div>
        </form>
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
      Cookies.set('token', token);
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
    } else {
      dispatch(commonActions.setSlice({ token: null }));
      Cookies.remove('token');
    }
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
export { getToken, getUser, openLogin, openRegister };
