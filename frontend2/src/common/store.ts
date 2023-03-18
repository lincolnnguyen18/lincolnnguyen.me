import { configureStore } from '@reduxjs/toolkit';
import { commonReducer } from 'slices/commonSlice';

const store = configureStore({
  reducer: {
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
