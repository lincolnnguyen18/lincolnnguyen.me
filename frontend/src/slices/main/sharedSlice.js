import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from 'graphql-request';
import Cookies from 'js-cookie';

const initialState = {
  userData: null,
  loggingInTo: null,
};

const getUserData = createAsyncThunk('shared/login', async ({ tokenType, token }) => {
  const query = `
      query {
          shared {
              userData(${tokenType}: "${token}") {
                  picture
                  email
                  familyName
                  givenName
                  ${tokenType === 'googleToken' ? 'sessionToken' : ''}
              }
          }
      }
  `;
  return request(process.env.REACT_APP_GRAPHQL_URL, query);
});

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      // console.log('getUserData.fulfilled', action.meta.arg);
      // console.log('action', action);

      const { tokenType } = action.meta.arg;
      const userData = action.payload.shared.userData;
      console.log('userData', userData);

      if (tokenType === 'googleToken') {
        if (userData && userData.sessionToken) {
          Cookies.set('sessionToken', userData.sessionToken);
        }
      } else if (tokenType === 'sessionToken') {
        if (!userData) {
          Cookies.remove('sessionToken');
        }
      }

      return { ...state, userData };
    });
  },
});

const sharedActions = sharedSlice.actions;
const sharedReducer = sharedSlice.reducer;
const sharedSelector = (state) => state.shared;

export { sharedActions, sharedReducer, sharedSelector };
export { getUserData };
