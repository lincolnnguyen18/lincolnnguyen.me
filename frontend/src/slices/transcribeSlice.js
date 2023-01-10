import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

const initialState = {
  bottomBar: {
    // recording, replay
    mode: 'recording',
    state: 'open',
  },
  statuses: {},
};

const transcribeSlice = createSlice({
  name: 'transcribe',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearStatus: (state, action) => {
      const statuses = { ...state.statuses };
      delete statuses[action.payload];
      return { ...state, statuses };
    },
    openBottomBar: (state) => {
      const bottomBar = { state: 'open', position: '0' };
      return { ...state, bottomBar };
    },
    closeBottomBar: (state) => {
      const bottomBar = { state: 'closed', position: '100' };
      return { ...state, bottomBar };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => isPending(action) || isFulfilled(action) || isRejected(action),
        (state, action) => {
          let status = 'pending';
          if (isFulfilled(action)) {
            status = 'fulfilled';
          } else if (isRejected(action)) {
            status = 'rejected';
          }
          const newStatuses = { ...state.statuses };
          const actionPrefix = action.type.split('/').slice(0, -1).join('/');
          newStatuses[actionPrefix] = status;
          // console.log('statuses', newStatuses);
          return { ...state, statuses: newStatuses };
        });
  },
});

const transcribeActions = transcribeSlice.actions;
const transcribeReducer = transcribeSlice.reducer;
const transcribeSelector = (state) => state.transcribe;

export { transcribeActions, transcribeReducer, transcribeSelector };
