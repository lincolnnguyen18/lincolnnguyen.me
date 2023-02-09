import { configureStore } from '@reduxjs/toolkit';
import { commonReducer } from '../slices/commonSlice.js';
import { transcribeReducer } from '../slices/transcribeSlice.js';
import { recorderReducer } from '../slices/recorderSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    transcribe: transcribeReducer,
    recorder: recorderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
