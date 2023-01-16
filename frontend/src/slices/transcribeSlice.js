import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  // transcription screen
  // recording, replay
  bottomBarMode: 'recording',
  duration: 0,
  currentTime: 0,
  player: null,
  playing: false,
  recording: false,
  recorder: null,
  transcriber: null,
  // [{ timestamp, text }]
  transcriptionResults: [],
  // transcriptionResults: [{ text: 'Hello', timestamp: 0 }, { text: 'World', timestamp: 1 }],
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
      const bottomBar = { state: 'open', position: '0' };
      return { ...state, bottomBar };
    },
    closeBottomBar: (state) => {
      const bottomBar = { state: 'closed', position: '100' };
      return { ...state, bottomBar };
    },
    addTranscriptionResult: (state, action) => {
      const transcriptionResults = [...state.transcriptionResults, action.payload];
      return { ...state, transcriptionResults };
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
