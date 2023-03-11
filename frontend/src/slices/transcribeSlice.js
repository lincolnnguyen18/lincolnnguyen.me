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
import { RenameTranscript } from '../apps/transcribe/TranscriptScreen/RenameTranscript';
import { NameTranscript } from '../apps/transcribe/TranscriptScreen/NameTranscript';
import { transcribeGqlClient } from '../gqlClients/transcribeGqlClient';
import { uploadJsObject, uploadWebmAudio } from '../common/fileUtils';

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
  title: 'Unsaved Transcript',
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
  listTranscriptsResult: null,
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
    if (saving) {
      dispatch(transcribeActions.updatePreview());
      dispatch(transcribeActions.setSlice({ saving: false }));
      dispatch(saveTranscript());
      // dispatch(openNameTranscript());
    }
    if (switchingLanguages) {
      dispatch(transcribeActions.switchLanguages());
      await wait(300);
      window.recognition.start();
    }
    dispatch(transcribeActions.setSlice({ switchingLanguages: false }));
    await wait(100);
    dispatch(commonActions.scrollToBottom());
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
          {/*    <DropdownOption value="updated_at">Updated at</DropdownOption>*/}
          {/*    <DropdownOption value="created_at">Created at</DropdownOption>*/}
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

const openRenameTranscript = createAsyncThunk(
  'transcribe/openRenameTranscript',
  async (_, { dispatch }) => {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <RenameTranscript />
      ),
    }));
  },
);

const openNameTranscript = createAsyncThunk(
  'transcribe/openNameTranscript',
  async (_, { dispatch }) => {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      hideCloseButton: true,
      children: (
        <NameTranscript />
      ),
    }));
  },
);

const saveTranscript = createAsyncThunk(
  'transcribe/saveTranscript',
  async (__, { getState, dispatch }) => {
    const { id, parts, partsOrder, preview, createdAt, updatedAt } = getState().transcribe;
    const newTranscript = createdAt === updatedAt;
    if (newTranscript) {
      let elipsis = '';
      if (preview.length > 30) {
        elipsis = '...';
      }
      dispatch(transcribeActions.setSlice({ title: preview.slice(0, 30) + elipsis }));
    }
    for (const partId of partsOrder) {
      if (parts[partId].unsaved) {
        // console.log('unsaved part', parts[partId]);
        const blobUrl = parts[partId].audioUrl;
        const audioKey = `transcribe/${id}/${partId}.webm`;
        await uploadWebmAudio({ blobUrl, s3ObjectKey: audioKey });
        dispatch(transcribeActions.setPartAsSaved({ partId, s3ObjectKey: audioKey }));
      }
    }
    const partsKey = `transcribe/${id}/parts.json`;
    const { parts: parts2 } = _.cloneDeep(getState().transcribe);
    for (const partId of Object.keys(parts2)) {
      delete parts2[partId].audioUrl;
    }
    await uploadJsObject({ jsObject: parts2, s3ObjectKey: partsKey });

    const { title } = getState().transcribe;
    const transcript = {
      id,
      title,
      createdAt,
      updatedAt,
      preview,
      partsOrder,
      partsKey,
    };
    console.log('transcript', transcript);
    const res = await transcribeGqlClient.putTranscript({
      id,
      title,
      preview,
      createdAt,
      updatedAt,
      partsOrder,
      partsKey,
    });
    console.log('res', res);
  }
);

const listTranscripts = createAsyncThunk(
  'transcribe/listTranscripts',
  async (_, { dispatch }) => {
    const res = await transcribeGqlClient.listTranscripts({});
    dispatch(transcribeActions.setSlice({ listTranscriptsResult: res }));
  }
);

const deleteTranscript = createAsyncThunk(
  'transcribe/deleteTranscript',
  async ({ id }) => {
    await transcribeGqlClient.deleteTranscript({ id });
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
      // for (const partId of state.partsOrder) {
      //   const part = state.parts[partId];
      //   for (const result of part.results) {
      //     preview += result.text;
      //     if (result.translation) {
      //       preview += ` (${result.translation})`;
      //     }
      //     preview += ' ';
      //     if (preview.length > 500) {
      //       break;
      //     }
      //   }
      //   if (preview.length > 500) {
      //     break;
      //   }
      // }

      for (const partId of state.partsOrder) {
        const part = state.parts[partId];
        for (const result of part.results) {
          preview += result.text;
          preview += ' ';
          if (preview.length > 250) {
            break;
          }
        }
        if (preview.length > 250) {
          break;
        }
      }
      for (const partId of state.partsOrder) {
        const part = state.parts[partId];
        for (const result of part.results) {
          if (result.translation) {
            preview += result.translation;
            preview += ' ';
            if (preview.length > 500) {
              break;
            }
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
      const offset = 1;
      state.parts[partId].results.push({
        timestamp: Math.max(0, ((state.newResultTime - createdAt) / 1000) - offset),
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
        state.createdAt = new Date().toISOString();
      } else {
        state.updatedAt = new Date().toISOString();
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
      state.parts[partId].s3ObjectKey = s3ObjectKey;
    },
    resetState: () => {
      return initialState;
    },
  },
});

const transcribeActions = transcribeSlice.actions;
const transcribeReducer = transcribeSlice.reducer;
const transcribeSelector = (state) => state.transcribe;

export { transcribeActions, transcribeReducer, transcribeSelector };
export { translateFinalResult, openTranscriptsSearch, saveTranscript, openRenameTranscript, openNameTranscript, listTranscripts, deleteTranscript };
