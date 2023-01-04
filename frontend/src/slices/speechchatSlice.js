import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // default, add-contact, search-contacts
  navbarMode: 'default',
  navbarTextInputValue: '',
  contacts: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
};

// const getContacts = createAsyncThunk('speechchat/getContacts', async () => {
//   // language=GraphQL
//   const query = `
//     query Contact {
//       speechChat {
//         contacts {
//           contacts {
//             id
//             picture
//             email
//             familyName
//             givenName
//             updatedAt
//           }
//         }
//       }
//     }
//   `;
// });

const speechchatSlice = createSlice({
  name: 'speechchat',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const speechchatActions = speechchatSlice.actions;
const speechchatReducer = speechchatSlice.reducer;
const speechchatSelector = (state) => state.speechchat;

export { speechchatActions, speechchatReducer, speechchatSelector };
