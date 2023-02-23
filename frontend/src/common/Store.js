import { configureStore } from '@reduxjs/toolkit';
import { commonReducer } from '../slices/commonSlice.js';
import { transcribeReducer } from '../slices/transcribeSlice.js';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    transcribe: transcribeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
