import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { graphQLClient } from '../shared/clients';

const initialState = {
  userData: null,
  loggingInTo: null,
  loggedIn: null,
  sessionToken: null,
  toast: {
    position: '32',
    message: '',
  },
  sidebarPosition: '100',
  cardMenu: {
    state: 'hidden',
    items: [],
  },
  history: [],
};

const getSessionToken = createAsyncThunk('shared/getSessionToken', async ({ googleToken }) => {
  // language=GraphQL
  const query = `
      query SessionToken($googleToken: String!) {
          sessionToken(googleToken: $googleToken)
      }
  `;
  return graphQLClient.request(query, { googleToken });
});

const getUserData = createAsyncThunk('shared/getUserData', async () => {
  // language=GraphQL
  const query = `
      query User {
          user {
              id
              picture
              email
              familyName
              givenName
          }
      }
  `;
  return graphQLClient.request(query);
});

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    pushHistory: (state, action) => {
      return { ...state, history: [...state.history, action.payload] };
    },
    popHistory: (state, action) => {
      const history = state.history.slice();
      history.pop();
      if (action.payload?.navigate) {
        const lastPath = history[history.length - 1]?.path || '/';
        // console.log('lastPath', lastPath);
        action.payload.navigate(lastPath);
      }
      return { ...state, history };
    },
    openToast: (state, action) => {
      const { message } = action.payload;
      const toast = { state: 'visible', message };
      return { ...state, toast };
    },
    closeToast: (state) => {
      const toast = { ...state.toast };
      toast.state = 'hidden';
      return { ...state, toast };
    },
    openSidebar: (state) => {
      const sidebarPosition = '0';
      return { ...state, sidebarPosition };
    },
    closeSidebar: (state) => {
      const sidebarPosition = '100';
      return { ...state, sidebarPosition };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionToken.fulfilled, (state, action) => {
        const { sessionToken } = action.payload;
        // console.log('sessionToken', sessionToken);
        Cookies.set('sessionToken', sessionToken, { expires: 7 });
        graphQLClient.setHeader('authorization', `Bearer ${sessionToken}`);
        return { ...state, sessionToken };
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        const { user: userData } = action.payload;
        if (!userData) {
          console.log('invalid sessionToken');
          Cookies.remove('sessionToken');
          return { ...state, userData: null, loggedIn: false, sessionToken: null };
        } else {
          console.log('userData', userData);
          return { ...state, userData, loggedIn: true };
        }
      })
      .addCase(getUserData.rejected, (state, action) => {
        console.log('rejected', action);
        Cookies.remove('sessionToken');
        return { ...state, userData: null, loggedIn: false, sessionToken: null };
      });
  },
});

const sharedActions = sharedSlice.actions;
const sharedReducer = sharedSlice.reducer;
const sharedSelector = (state) => state.shared;

export { sharedActions, sharedReducer, sharedSelector };
export { getSessionToken, getUserData };
