import { createSlice } from '@reduxjs/toolkit';
import { User } from 'slices/userAsyncActions';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  redirectToAfterLogin?: string;
  user?: User | null;
}

const initialState: UserState = {
  redirectToAfterLogin: undefined,
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
const userSelector = (state: { user: UserState }) => state.user;

export { userActions, userReducer, userSelector };
