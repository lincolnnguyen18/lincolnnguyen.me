import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  duration: 0,
  createdAt: null,
  results: [],
  interimResult: '',
  audioUrl: null,
  startRecording: null,
  stopRecording: null,
};

const recorderSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    incrementDuration: (state, action) => {
      state.duration += action.payload;
    },
    addResult: (state, action) => {
      state.results.push({ timestamp: state.duration, text: action.payload });
    },
  },
});

const { actions: recorderActions, reducer: recorderReducer } = recorderSlice;
const recorderSelector = (state) => state.recorder;
export { recorderActions, recorderReducer, recorderSelector };
