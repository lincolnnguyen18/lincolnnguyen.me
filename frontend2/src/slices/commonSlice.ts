import { createSlice } from '@reduxjs/toolkit';
import { User } from 'slices/commonAsyncActions';
import { getScrollPositionFromBottom } from 'utils/scrollUtils';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  // shared values
  scrollPositionFromTop: number;
  scrollPositionFromBottom: number;
  screenWidth: number;
  screenHeight: number;
  root: any;

  // async values
  errors: string[];
  user?: User | null;
}

const initialState: CommonState = {
  // shared values
  scrollPositionFromTop: window.scrollY,
  scrollPositionFromBottom: getScrollPositionFromBottom(),
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  root: document.getElementById('root') as HTMLElement,
  
  // async values
  errors: [],
  user: undefined,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<CommonState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

const commonActions = commonSlice.actions;
const commonReducer = commonSlice.reducer;
const commonSelector = (state: { common: CommonState }) => state.common;

export { commonActions, commonReducer, commonSelector };
