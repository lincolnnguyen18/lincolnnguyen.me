import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { commonReducer } from 'slices/commonSlice';
import { menuReducer } from 'slices/menuSlice';
import { userReducer } from 'slices/userSlice';

const store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
