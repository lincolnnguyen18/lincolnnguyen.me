import { configureStore } from '@reduxjs/toolkit';
import { sharedReducer } from '../slices/sharedSlice';
import { messagesReducer } from '../slices/messagesSlice';

export const store = configureStore({
  reducer: {
    shared: sharedReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
