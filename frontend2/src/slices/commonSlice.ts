import { createSlice, isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { getActionTypePrefix, getScrollPositionFromBottom } from 'utils/miscUtils';
import { xor } from 'lodash';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  // shared values
  scrollPositionFromTop: number;
  scrollPositionFromBottom: number;
  screenWidth: number;
  screenHeight: number;

  // async values
  errors: string[];
  isPending: string[];
}

const initialState: CommonState = {
  // shared values
  scrollPositionFromTop: window.scrollY,
  scrollPositionFromBottom: getScrollPositionFromBottom(),
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,

  // async values
  errors: [],
  isPending: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<CommonState>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(isPending, isFulfilled, isRejected), (state, action) => {
        state.isPending = xor(state.isPending, [getActionTypePrefix(action)]);
      });
  },
});

const commonActions = commonSlice.actions;
const commonReducer = commonSlice.reducer;
const commonSelector = (state: { common: CommonState }) => state.common;

export { commonActions, commonReducer, commonSelector };
