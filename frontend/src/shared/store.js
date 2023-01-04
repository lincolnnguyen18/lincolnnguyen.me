import { configureStore } from '@reduxjs/toolkit';
import { sharedReducer } from '../slices/sharedSlice';
import { speechchatReducer } from '../slices/speechchatSlice';

export const store = configureStore({
  reducer: {
    shared: sharedReducer,
    speechchat: speechchatReducer,
  },
});
