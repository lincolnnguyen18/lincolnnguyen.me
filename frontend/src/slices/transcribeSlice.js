import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uuid } from '../common/stringUtils';
import _ from 'lodash';
import { commonActions } from './commonSlice';
import { wait } from '../common/timeUtils';
import { TextField } from '../components/TextField';
import { NavbarButton } from '../components/NavbarButton';
import { GroupDivider } from '../components/GroupDivider';
import React from 'react';
import { Dropdown } from '../components/Dropdown';
import { GroupInput } from '../components/GroupInput';
import { FormScreen } from '../components/FormScreen';
import { FormScreenBottom } from '../components/FormScreenBottom';
import { Group } from '../components/Group';

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
  //       translation: `Konnichiwa ${i}`,
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
  currentPartId: null,
  createdAt: null,
  updatedAt: null,
  title: 'Untitled Transcript',
  interimResult: '',
  recorder: null,
  currentTime: 0,
  maxTime: 0,
  playing: false,
  transcribeLanguage: 'Japanese',
  translateLanguage: 'English (United States)',
  playbackSpeed: 1,
  selectedParts: [],
  sort: null,
  keywords: null,
  searching: false,
};

export const sortMap = { updated_at: 'Updated at', created_at: 'Created at' };

const translateFinalResult = createAsyncThunk(
  'transcribe/translateFinalResult',
  async (text, { getState, dispatch }) => {
    const { translator, currentPartId: partId, parts, translateLanguage } = getState().transcribe;
    const resultIndex = parts[partId].results.length;
    text = text.trim();
    dispatch(transcribeActions.onFinal(text));
    if (translateLanguage !== 'None') {
      let translation = await translator.translate(text);
      translation = translation.trim();
      dispatch(transcribeActions.addTranslationToFinalResult({
        translation,
        partId,
        resultIndex,
      }));
    }
    setTimeout(() => {
      dispatch(commonActions.scrollToBottom());
    }, 100);
  },
);

const openTranscriptsSearch = createAsyncThunk(
  'transcribe/openTranscriptsSearch',
  async (navigate, { dispatch, getState }) => {
    const { sort, keywords } = getState().transcribe;
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    function closeMenu () {
      dispatch(commonActions.closeNavMenu());
    }

    function onSearch (e) {
      e.preventDefault();
      const { keywords, sort } = e.target;
      navigate(`/transcribe/transcripts?keywords=${encodeURIComponent(keywords.value)}&sort=${sort.value}`);
      closeMenu();
    }

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <FormScreen isForm={true} onSubmit={onSearch}>
          <Group title="Keywords">
            <TextField placeholder="Enter keywords here" autoFocus={true} defaultValue={keywords} name="keywords" />
            <span className="text-xs sm:text-sm text-gray-subtext2 mt-2">For example, enter "cse 416" to search for all transcripts with "cse 416" anywhere in their title.</span>
          </Group>
          <GroupInput twStyle="rounded-lg mt-6">
            <span>Sorted by</span>
            <Dropdown defaultValue={sort} name="sort">
              <option value="updated_at">Updated at</option>
              <option value="created_at">Created at</option>
            </Dropdown>
          </GroupInput>
          <FormScreenBottom>
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
            <GroupDivider dir="horiz" />
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit">Search</NavbarButton>
          </FormScreenBottom>
        </FormScreen>
      ),
    }));
  },
);

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
      state.newResultTime = 0;
      state.currentPartId = partId;
    },
    incrementDuration: (state, action) => {
      const partId = state.partsOrder[state.partsOrder.length - 1];
      state.parts[partId].duration += action.payload;

      state.maxTime = state.parts[partId].duration;
    },
    setLatestPart: (state, action) => {
      const partId = state.partsOrder[state.partsOrder.length - 1];
      _.merge(state.parts[partId], action.payload);
    },
    onFinal: (state, action) => {
      const text = action.payload;
      const partId = state.partsOrder[state.partsOrder.length - 1];
      state.parts[partId].results.push({
        timestamp: state.newResultTime,
        text,
      });
      state.interimResult = '';
    },
    onInterim: (state, action) => {
      const text = action.payload;
      if (state.interimResult === '') {
        state.newResultTime = Math.max(state.parts[state.currentPartId]?.duration - 2, 0);
      }
      state.interimResult = text;
    },
    addTranslationToFinalResult: (state, action) => {
      const { translation, partId, resultIndex } = action.payload;
      state.parts[partId].results[resultIndex].translation = translation;
    },
    updateMetadata: (state) => {
      if (!state.createdAt) {
        state.createdAt = Date.now();
      } else {
        state.updatedAt = Date.now();
      }
    },
    setPlaybackSpeed: (state, action) => {
      state.playbackSpeed = action.payload;
      const audio = document.querySelector('audio');
      if (audio) {
        audio.playbackRate = action.payload;
      }
    },
    updateAudioPlaybackSpeed: (state) => {
      const audio = document.querySelector('audio');
      if (audio) {
        audio.playbackRate = state.playbackSpeed;
      }
    },
    toggleSelectedPart: (state, action) => {
      const partId = action.payload;
      state.selectedParts = _.xor(state.selectedParts, [partId]);
    },
    deleteSelectedParts: (state) => {
      if (state.selectedParts.includes(state.currentPartId)) {
        state.currentPartId = null;
        state.currentTime = 0;
        state.maxTime = 0;
      }
      state.partsOrder = state.partsOrder.filter((partId) => !state.selectedParts.includes(partId));
      state.selectedParts.forEach((partId) => delete state.parts[partId]);
      state.selectedParts = [];
    },
    switchLanguages: (state) => {
      const { translateLanguage, transcribeLanguage } = state;
      state.translateLanguage = transcribeLanguage;
      state.transcribeLanguage = translateLanguage;
    },
  },
});

const transcribeActions = transcribeSlice.actions;
const transcribeReducer = transcribeSlice.reducer;
const transcribeSelector = (state) => state.transcribe;

export { transcribeActions, transcribeReducer, transcribeSelector };
export { translateFinalResult, openTranscriptsSearch };
