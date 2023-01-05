import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { graphQLClient } from '../shared/clients';

const initialState = {
  // default, add-contact, search-contacts
  navbarMode: 'default',
  navbarTextInputValue: '',
  contacts: null,
};

const getContacts = createAsyncThunk('speechchat/getContacts', async () => {
  // language=GraphQL
  const query = `
    query Contact {
      speechChat {
        contacts {
          contacts {
            id
            picture
            email
            familyName
            givenName
            updatedAt
            lastMessage {
              type
              direction
              text
              createdAt
            }
          }
        }
      }
    }
  `;
  return graphQLClient.request(query);
});

const addConnection = createAsyncThunk('speechchat/addConnection', async ({ email }) => {
  // language=GraphQL
  const query = `
    mutation Mutation($receiverEmail: String!) {
      addConnection(receiverEmail: $receiverEmail) {
        field
        message
      }
    }
  `;
  const { addConnection } = await graphQLClient.request(query, { receiverEmail: email });
  return addConnection;
});

const speechchatSlice = createSlice({
  name: 'speechchat',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        // log payload
        // console.log('getContacts.fulfilled', action.payload);
        const { contacts } = action.payload.speechChat.contacts;
        console.log('contacts', contacts);
        return { ...state, contacts };
      });
  },
});

const speechchatActions = speechchatSlice.actions;
const speechchatReducer = speechchatSlice.reducer;
const speechchatSelector = (state) => state.speechchat;

export { speechchatActions, speechchatReducer, speechchatSelector };
export { getContacts, addConnection };
