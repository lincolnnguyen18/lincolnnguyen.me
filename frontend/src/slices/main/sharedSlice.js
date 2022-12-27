import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const sharedActions = sharedSlice.actions;
export const sharedReducer = sharedSlice.reducer;
export const sharedSelector = (state) => state.shared;
