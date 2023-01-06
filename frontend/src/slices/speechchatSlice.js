import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { graphQLClient } from '../shared/clients';
import { gql } from 'graphql-request';

const initialState = {
  // default, add-contact, search-contacts
  navbarMode: 'default',
  navbarTextInputValue: '',
  contacts: null,
  selectedContact: null,
  statuses: {},
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

const getContact = createAsyncThunk('speechchat/getContact', async ({ id }) => {
  // language=GraphQL
  const query = gql`
      query Contact($contactId: ID!) {
          speechChat {
              contact(contactId: $contactId) {
                  id
                  picture
                  email
                  familyName
                  givenName
                  updatedAt
                  messages {
                      messages {
                          text
                          createdAt
                          direction
                      }
                  }
              }
          }
      }
  `;
  return graphQLClient.request(query, { contactId: id });
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
    clearStatus: (state, action) => {
      const statuses = { ...state.statuses };
      delete statuses[action.payload];
      return { ...state, statuses };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        const { contacts } = action.payload.speechChat.contacts;
        // console.log('contacts', contacts);

        const duplicateContacts = [];
        for (let i = 0; i < 30; i++) {
          duplicateContacts.push(...contacts);
        }
        return { ...state, contacts: duplicateContacts };

        // return { ...state, contacts };
      })
      .addCase(getContact.fulfilled, (state, action) => {
        console.log('getContact.fulfilled', action.payload);
        const { contact } = action.payload.speechChat;
        return { ...state, selectedContact: contact };
      })
      .addMatcher(
        (action) => isPending(action) || isFulfilled(action) || isRejected(action),
        (state, action) => {
          let status = 'pending';
          if (isFulfilled(action)) {
            status = 'fulfilled';
          } else if (isRejected(action)) {
            status = 'rejected';
          }
          const newStatuses = { ...state.statuses };
          const actionPrefix = action.type.split('/').slice(0, -1).join('/');
          newStatuses[actionPrefix] = status;
          console.log('statuses', newStatuses);
          return { ...state, statuses: newStatuses };
        });
  },
});

const speechchatActions = speechchatSlice.actions;
const speechchatReducer = speechchatSlice.reducer;
const speechchatSelector = (state) => state.speechchat;

export { speechchatActions, speechchatReducer, speechchatSelector };
export { getContacts, getContact, addConnection };
