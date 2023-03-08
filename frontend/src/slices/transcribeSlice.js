import React from 'react';
import _ from 'lodash';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uuid } from '../common/stringUtils';
import { commonActions } from './commonSlice';
import { wait } from '../common/timeUtils';
import { TextField } from '../components/TextField';
import { NavbarButton } from '../components/NavbarButton';
import { GroupDivider } from '../components/GroupDivider';
import { FormScreen } from '../components/FormScreen';
import { FormScreenBottom } from '../components/FormScreenBottom';
import { Group } from '../components/Group';
import { closeMenu } from '../common/MenuUtils';
import { uploadObject, uploadWebmAudio } from '../common/fileUtils';

const initialState = {
  // default, record, edit
  mode: 'default',
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
  //     audioUrl: 'url here',
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
  title: 'Untitled  Transcript',
  interimResult: '',
  recorder: null,
  currentTime: 0,
  playing: false,
  transcribeLang: 'Japanese',
  translateLang: 'English (United States)',
  playbackSpeed: 1,
  selectedParts: [],
  keywords: null,
  switchingLanguages: false,
  cutOffType: 'auto',
  saving: false,
  id: null,
  preview: '',
};

export const sortMap = { updated_at: 'Updated at', created_at: 'Created at' };

const translateFinalResult = createAsyncThunk(
  'transcribe/translateFinalResult',
  async (text, { getState, dispatch }) => {
    const { translator, currentPartId: partId, parts, translateLang, switchingLanguages, saving } = getState().transcribe;
    const resultIndex = parts[partId].results.length;
    text = text.trim();
    dispatch(transcribeActions.onFinal(text));
    if (translateLang !== 'None') {
      let translation = await translator.translate(text);
      translation = translation.trim();
      dispatch(transcribeActions.addTranslationToFinalResult({
        translation,
        partId,
        resultIndex,
      }));
    }
    if (switchingLanguages) {
      dispatch(transcribeActions.switchLanguages());
      await wait(300);
      window.recognition.start();
    }
    dispatch(transcribeActions.setSlice({ switchingLanguages: false }));
    await wait(100);
    dispatch(commonActions.scrollToBottom());
    if (saving) {
      dispatch(transcribeActions.updatePreview());
      dispatch(transcribeActions.setSlice({ saving: false }));
      dispatch(saveTranscript());
    }
  },
);

const openTranscriptsSearch = createAsyncThunk(
  'transcribe/openTranscriptsSearch',
  async (navigate, { dispatch, getState }) => {
    const { keywords } = getState().transcribe;
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    function onSearch (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const { keywords } = Object.fromEntries(formData);
      if (keywords?.trim()) {
        navigate(`/transcribe/transcripts?keywords=${encodeURIComponent(keywords)}`);
      } else {
        navigate('/transcribe/transcripts');
      }
      closeMenu(dispatch);
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
          {/*<GroupInput twStyle="rounded-lg mt-6">*/}
          {/*  <span>Sorted by</span>*/}
          {/*  <Dropdown defaultValue={sort} name="sort">*/}
          {/*    <option value="updated_at">Updated at</option>*/}
          {/*    <option value="created_at">Created at</option>*/}
          {/*  </Dropdown>*/}
          {/*</GroupInput>*/}
          <FormScreenBottom>
            <NavbarButton onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
            <GroupDivider dir="horiz" />
            <NavbarButton twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit">Search</NavbarButton>
          </FormScreenBottom>
        </FormScreen>
      ),
    }));
  },
);

const saveTranscript = createAsyncThunk(
  'transcribe/saveTranscript',
  async (_, { getState, dispatch }) => {
    const { parts, partsOrder } = getState().transcribe;
    for (const partId of partsOrder) {
      if (parts[partId].unsaved) {
        // console.log('unsaved part', parts[partId]);
        const blobUrl = parts[partId].audioUrl;
        const s3ObjectKey = uuid() + '.webm';
        await uploadWebmAudio({ blobUrl, s3ObjectKey });
        dispatch(transcribeActions.setPartAsSaved({ partId, s3ObjectKey }));
      }
    }
    const partsUrl = uuid() + '.json';
    const { parts: parts2 } = getState().transcribe;
    // console.log('parts2', parts2);
    await uploadObject({ object: parts2, s3ObjectKey: partsUrl });
  }
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
        unsaved: true,
      };
      state.partsOrder.push(partId);
      state.newResultTime = 0;
      state.currentPartId = partId;
    },
    setLatestPart: (state, action) => {
      const partId = state.partsOrder[state.partsOrder.length - 1];
      _.merge(state.parts[partId], action.payload);
    },
    updatePreview: (state) => {
      let preview = '';
      for (const partId of state.partsOrder) {
        const part = state.parts[partId];
        for (const result of part.results) {
          preview += result.text;
          if (result.translation) {
            preview += ` (${result.translation})`;
          }
          preview += ' ';
          if (preview.length > 500) {
            break;
          }
        }
        if (preview.length > 500) {
          break;
        }
      }
      state.preview = preview;
    },
    onFinal: (state, action) => {
      const text = action.payload;
      const partId = state.partsOrder[state.partsOrder.length - 1];
      const createdAt = state.parts[partId].createdAt;
      state.parts[partId].results.push({
        timestamp: Math.max(0, ((state.newResultTime - createdAt) / 1000) - 2),
        text,
      });
      state.interimResult = '';
    },
    onInterim: (state, action) => {
      const text = action.payload;
      if (state.interimResult === '') {
        state.newResultTime = Date.now();
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
      const newSpeed = action.payload;
      if (newSpeed < 0.5 || newSpeed > 3) return;
      state.playbackSpeed = newSpeed;
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
      }
      state.partsOrder = state.partsOrder.filter((partId) => !state.selectedParts.includes(partId));
      state.selectedParts.forEach((partId) => delete state.parts[partId]);
      state.selectedParts = [];
    },
    switchLanguages: (state) => {
      const { translateLang, transcribeLang } = state;
      state.translateLang = transcribeLang;
      state.transcribeLang = translateLang;
    },
    setCurrentPartDuration: (state) => {
      const partId = state.partsOrder[state.partsOrder.length - 1];
      state.parts[partId].duration = (Date.now() - state.parts[partId].createdAt) / 1000;
    },
    setPartAsSaved: (state, action) => {
      const { partId, s3ObjectKey } = action.payload;
      delete state.parts[partId].unsaved;
      state.parts[partId].audioUrl = s3ObjectKey;
    },
  },
});

const transcribeActions = transcribeSlice.actions;
const transcribeReducer = transcribeSlice.reducer;
const transcribeSelector = (state) => state.transcribe;

export { transcribeActions, transcribeReducer, transcribeSelector };
export { translateFinalResult, openTranscriptsSearch, saveTranscript };
