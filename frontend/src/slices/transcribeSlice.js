import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  // transcription screen
  // recording, replay
  bottomBarMode: 'recording',
  bottomBarPosition: '0',
  duration: 0,
  currentTime: 0,
  player: null,
  playing: false,
  recording: false,
  recorder: null,
  transcriber: null,
  // [{ timestamp, text }]
  transcriptionResults: [],
  interimResult: '',
  statuses: {},

  // transcriptions screen
  transcriptions: [],
};

const transcribeSlice = createSlice({
  name: 'transcribe',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateSlice: (state, action) => {
      return _.merge(state, action.payload);
    },
    clearStatus: (state, action) => {
      const statuses = { ...state.statuses };
      delete statuses[action.payload];
      return { ...state, statuses };
    },
    openBottomBar: (state) => {
      return { ...state, bottomBarPosition: '0' };
    },
    closeBottomBar: (state) => {
      return { ...state, bottomBarPosition: '-100%' };
    },
    addTranscriptionResult: (state, action) => {
      const transcriptionResults = [...state.transcriptionResults, action.payload];
      return { ...state, transcriptionResults };
    },
    updateCurrentTime: (state, action) => {
      const currentTime = action.payload;
      state.player.currentTime = currentTime;
      return { ...state, currentTime };
    },
    resetSlice: () => initialState,
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
