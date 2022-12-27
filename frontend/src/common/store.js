import { configureStore } from '@reduxjs/toolkit';
import { sharedReducer } from '../slices/main/sharedSlice';

export const store = configureStore({
  reducer: {
    shared: sharedReducer,
  },
});
