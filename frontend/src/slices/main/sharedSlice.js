import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { graphQLClient } from '../../shared/clients';
import { gql } from 'graphql-request';

const initialState = {
  userData: null,
  loggingInTo: null,
};

const getUserData = createAsyncThunk('shared/login', async ({ tokenType, token }) => {
  let query;
  if (tokenType === 'googleToken') {
    query = gql`
        query {
            shared {
                userData(googleToken: "${token}") {
                    picture
                    email
                    familyName
                    givenName
                    sessionToken
                    lastLogin
                }
            }
        }
    `;
  } else if (tokenType === 'sessionToken') {
    query = gql`
        query {
            shared {
                userData {
                    picture
                    email
                    familyName
                    givenName
                    lastLogin
                }
            }
        }
    `;
  }
  return graphQLClient.request(query);
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
          Cookies.set('sessionToken', userData.sessionToken, { expires: 7 });
          graphQLClient.setHeader('authorization', `Bearer ${userData.sessionToken}`);
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
