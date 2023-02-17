import { createSlice } from '@reduxjs/toolkit';
import { uuid } from '../common/stringUtils';
import _ from 'lodash';

const initialState = {
  // default, record, edit
  mode: 'record',
  // parts: Object.fromEntries(Array(5).fill(0).map((_, i) => [i, {
  //   createdAt: 1675670582 + i *
  //   duration: 35,
  //   results: Array(20).fill(0).map((_, j) => ({
  //     timestamp: j,
  //     text: `Hello ${j}`,
  //   })),
  // }])),
  // partsOrder: Array(5).fill(0).map((_, i) => i),
  // results: [{ timestamp: 0, text: 'Hello' }, { timestamp: 35, text: 'World' }],
  // parts: {
  //   0: {
  //     createdAt: 1675670582,
  //     duration: 35,
  //     results: Array(35).fill(0).map((_, i) => ({
  //       timestamp: i,
  //       text: `Hello ${i}`,
  //     })),
  //   },
  //   1: {
  //     createdAt: 2885672582,
  //     duration: 30,
  //     results: Array(30).fill(0).map((_, i) => ({
  //       timestamp: i,
  //       text: `Hello ${i}`,
  //     })),
  //   },
  //   2: {
  //     createdAt: 3885672582,
  //     duration: 30,
  //     results: Array(30).fill(0).map((_, i) => ({
  //       timestamp: i,
  //       text: `Hello ${i}`,
  //     })),
  //   },
  // },
  // partsOrder: [0, 1, 2],
  parts: {},
  partsOrder: [],
  lastPart: null,
  createdAt: null,
  updatedAt: null,
  title: 'Untitled Transcript',
  unsaved: true,
  isNew: true,
  interimResult: '',
  interimTimestamp: null,
  recorder: null,
  currentTime: 0,
  maxTime: 0,
  playing: false,
};

const transcribeSlice = createSlice({
  name: 'transcribe',
  initialState,
  reducers: {
    setSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    addPart: (state) => {
      const partId = uuid();
      state.parts[partId] = {
        createdAt: Date.now(),
        duration: 0,
        results: [],
      };
      state.partsOrder.push(partId);
      state.unsaved = true;
      state.lastPart = partId;
    },
    incrementDuration: (state, action) => {
      const partId = state.partsOrder[state.partsOrder.length - 1];
      state.parts[partId].duration += action.payload;

      state.maxTime = state.parts[partId].duration;
    },
    setInterimTimestamp: (state) => {
      const partId = state.partsOrder[state.partsOrder.length - 1];
      state.interimTimestamp = state.parts[partId].duration;
    },
    setLatestPart: (state, action) => {
      const partId = state.partsOrder[state.partsOrder.length - 1];
      _.merge(state.parts[partId], action.payload);
    },
    addResult: (state, action) => {
      const partId = state.partsOrder[state.partsOrder.length - 1];
      state.parts[partId].results.push({
        timestamp: state.interimTimestamp,
        text: action.payload,
      });
    },
  },
});

const transcribeActions = transcribeSlice.actions;
const transcribeReducer = transcribeSlice.reducer;
const transcribeSelector = (state) => state.transcribe;

export { transcribeActions, transcribeReducer, transcribeSelector };
