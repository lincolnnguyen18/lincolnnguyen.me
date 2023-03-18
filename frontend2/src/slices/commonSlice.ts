import { createSlice } from '@reduxjs/toolkit';
import { getScrollPositionFromBottom } from 'utils/measurementUtils';

interface CommonState {
  scrollPositionFromTop: number;
  scrollPositionFromBottom: number;
  screenWidth: number;
  errors: string[];
}

interface UpdateSliceAction {
  type: string;
  payload: Partial<CommonState>;
}

const initialState: CommonState = {
  scrollPositionFromTop: window.scrollY,
  scrollPositionFromBottom: getScrollPositionFromBottom(),
  screenWidth: 0,
  errors: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateSlice: (state, action: UpdateSliceAction) => {
      return { ...state, ...action.payload };
    },
  },
});

const commonActions = commonSlice.actions;
const commonReducer = commonSlice.reducer;
const commonSelector = (state: { common: CommonState }) => state.common;

export { commonActions, commonReducer, commonSelector };
