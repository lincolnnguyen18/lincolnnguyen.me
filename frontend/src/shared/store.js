import { configureStore } from '@reduxjs/toolkit';
import { sharedReducer } from '../slices/sharedSlice';
import { messagesReducer } from '../slices/messagesSlice';
import { transcribeReducer } from '../slices/transcribeSlice';

export const store = configureStore({
  reducer: {
    shared: sharedReducer,
    messages: messagesReducer,
    transcribe: transcribeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
