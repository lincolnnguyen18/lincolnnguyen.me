import { configureStore } from '@reduxjs/toolkit';
import { sharedReducer } from '../slices/main/sharedSlice';
import { contactsReducer } from '../slices/speech-chat/contactsSlice';

export const store = configureStore({
  reducer: {
    shared: sharedReducer,
    contacts: contactsReducer,
  },
});
