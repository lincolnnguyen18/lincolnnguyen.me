import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // default, add-contact, search-contacts
  navbarMode: 'default',
  navbarTextInputValue: '',
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const contactsActions = contactsSlice.actions;
const contactsReducer = contactsSlice.reducer;
const contactsSelector = (state) => state.contacts;

export { contactsActions, contactsReducer, contactsSelector };
