import { configureStore } from '@reduxjs/toolkit';
import { commonReducer } from '../slices/commonSlice.js';

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
