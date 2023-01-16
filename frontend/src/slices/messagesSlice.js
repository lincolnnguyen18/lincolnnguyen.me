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

const getContacts = createAsyncThunk('messages/getContacts', async () => {
  // language=GraphQL
  const query = `
      query Contact {
          messages {
              contacts {
                  paginatedItems {
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

const getContact = createAsyncThunk('messages/getContact', async ({ id }) => {
  // language=GraphQL
  const query = gql`
      query Contact($contactId: ID!) {
          messages {
              contact(contactId: $contactId) {
                  id
                  picture
                  email
                  familyName
                  givenName
                  updatedAt
                  messages {
                      paginatedItems {
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

const addConnection = createAsyncThunk('messages/addConnection', async ({ email }) => {
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

const messagesSlice = createSlice({
  name: 'messages',
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
        // console.log(action.payload);
        const { paginatedItems } = action.payload.messages.contacts;
        // console.log('contacts', paginatedItems);

        const duplicateContacts = [];
        for (let i = 0; i < 30; i++) {
          duplicateContacts.push(...paginatedItems);
        }
        return { ...state, contacts: duplicateContacts };

        // return { ...state, contacts };
      })
      .addCase(getContact.fulfilled, (state, action) => {
        console.log('getContact.fulfilled', action.payload);
        const { contact } = action.payload.messages;
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
          // console.log('statuses', newStatuses);
          return { ...state, statuses: newStatuses };
        });
  },
});

const messagesActions = messagesSlice.actions;
const messagesReducer = messagesSlice.reducer;
const messagesSelector = (state) => state.messages;

export { messagesActions, messagesReducer, messagesSelector };
export { getContacts, getContact, addConnection };
