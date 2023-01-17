import { createSlice } from '@reduxjs/toolkit';
import { statusMatcherReducer } from '../shared/utils/stateUtils';

const initialTranscriptionState = {
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
  recordingDone: false,
};

const initialTranscriptionsState = {
  transcriptions: [],
};

const transcribeSlice = createSlice({
  name: 'transcribe',
  initialState: { ...initialTranscriptionState, ...initialTranscriptionsState },
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
    resetTranscriptionSlice: (state) => {
      return { ...state, ...initialTranscriptionState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(...statusMatcherReducer);
  },
});

const transcribeActions = transcribeSlice.actions;
const transcribeReducer = transcribeSlice.reducer;
const transcribeSelector = (state) => state.transcribe;

export { transcribeActions, transcribeReducer, transcribeSelector };
