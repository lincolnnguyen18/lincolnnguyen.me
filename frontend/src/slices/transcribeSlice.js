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
import { downloadJsObject, downloadMp3Audio, uploadJsObject, uploadMp3Audio } from '../common/fileUtils';

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
  transcribeLang: null,
  translateLang: null,
  playbackSpeed: null,
  selectedParts: [],
  keywords: null,
  switchingLanguages: false,
  cutOffType: null,
  newTranscript: null,
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
    const { id, parts, partsOrder, preview, createdAt, updatedAt, version } = getState().transcribe;
    // console.log('version', version);
    const newTranscript = createdAt === updatedAt;
    if (newTranscript) {
      let elipsis = '';
      if (preview.length > 30) {
        elipsis = '...';
      }
      dispatch(transcribeActions.setSlice({ title: preview.slice(0, 30) + elipsis }));
    }
    const audioToUpload = [];
    for (const partId of partsOrder) {
      if (parts[partId].unsaved) {
        // console.log('unsaved part', parts[partId]);
        const blobUrl = parts[partId].audioUrl;
        const audioKey = `transcribe/${id}/${partId}.mp3`;
        // await uploadMp3Audio({ blobUrl, s3ObjectKey: audioKey });
        audioToUpload.push({ blobUrl, s3ObjectKey: audioKey });
        dispatch(transcribeActions.setPartAsSaved({ partId, s3ObjectKey: audioKey }));
      }
    }
    const partsKey = `transcribe/${id}/parts.json`;
    const { parts: parts2 } = _.cloneDeep(getState().transcribe);
    for (const partId of Object.keys(parts2)) {
      delete parts2[partId].audioUrl;
    }

    const { title } = getState().transcribe;
    // const transcript = {
    //   id,
    //   title,
    //   createdAt,
    //   updatedAt,
    //   preview,
    //   partsOrder,
    //   partsKey,
    // };
    // console.log('transcript', transcript);
    let errors;
    if (newTranscript) {
      errors = await transcribeGqlClient.putTranscript({
        id,
        title,
        preview,
        createdAt,
        updatedAt,
        partsOrder,
        partsKey,
      });
    } else {
      errors = await transcribeGqlClient.updateTranscript({
        id,
        title,
        preview,
        updatedAt,
        partsOrder,
        partsKey,
        version,
      });
    }
    if (errors.length === 0) {
      await uploadJsObject({ jsObject: parts2, s3ObjectKey: partsKey });
      for (const { blobUrl, s3ObjectKey } of audioToUpload) {
        await uploadMp3Audio({ blobUrl, s3ObjectKey });
      }
      dispatch(transcribeActions.incrementVersion());
    }
    dispatch(commonActions.closeLoading());
    // console.log('errors', errors);
    if (errors.length > 0) {
      // openAlert({ dispatch, title: 'Error', message: errors[0] });
      dispatch(commonActions.openAlert({ title: 'Error', message: errors[0] }));
    }
  }
);

const listTranscripts = createAsyncThunk(
  'transcribe/listTranscripts',
  async (_, { dispatch, getState }) => {
    const { listTranscriptsResult } = getState().transcribe;
    const lastEvaluatedKey = listTranscriptsResult?.lastEvaluatedKey;
    if (!lastEvaluatedKey) dispatch(commonActions.openLoading({ title: 'Loading' }));
    const res = await transcribeGqlClient.listTranscripts({ lastEvaluatedKey });
    if (!lastEvaluatedKey) {
      dispatch(transcribeActions.setSlice({ listTranscriptsResult: res }));
    } else {
      const { items, lastEvaluatedKey } = res;
      dispatch(transcribeActions.setSlice({
        listTranscriptsResult: {
          items: listTranscriptsResult.items.concat(items),
          lastEvaluatedKey,
        },
      }));
    }
    dispatch(commonActions.closeLoading());
  }
);

const deleteTranscript = createAsyncThunk(
  'transcribe/deleteTranscript',
  async ({ id }) => {
    await transcribeGqlClient.deleteTranscript({ id });
  }
);

const getTranscript = createAsyncThunk(
  'transcribe/getTranscript',
  async ({ id }, { dispatch }) => {
    dispatch(commonActions.openLoading({ title: 'Loading' }));
    const res = await transcribeGqlClient.getTranscript({ id });
    // console.log('res', res);
    if (res) {
      const { title, preview, createdAt, updatedAt, partsOrder, partsKey, version } = res;
      dispatch(transcribeActions.setSlice({ id, title, preview, createdAt, updatedAt, partsOrder, version }));
      const parts = await downloadJsObject(partsKey);
      // console.log('parts', parts);
      dispatch(transcribeActions.setSlice({ parts, newTranscript: false }));
      for (const partId of partsOrder) {
        const s3ObjectKey = parts[partId].s3ObjectKey;
        const audioUrl = await downloadMp3Audio(s3ObjectKey);
        dispatch(transcribeActions.setPartAudioUrl({ partId, audioUrl }));
      }
      const firstPartId = partsOrder[0];
      const firstPartResults = parts[firstPartId].results;
      if (firstPartResults.length > 0) {
        dispatch(transcribeActions.loadPart({ partId: firstPartId, timestamp: firstPartResults[0].timestamp }));
      }
    } else {
      dispatch(transcribeActions.setSlice({ newTranscript: true, version: -1 }));
    }
    dispatch(commonActions.closeLoading());
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
      const timestamp = Date.now();
      const timestampISO = new Date(timestamp).toISOString();
      state.parts[partId] = {
        createdAt: timestamp,
        duration: 0,
        results: [],
        unsaved: true,
      };
      state.updatedAt = timestampISO;
      if (!state.createdAt) {
        state.createdAt = timestampISO;
      }
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
      if (state.interimResult === '' && !state.saving) {
        state.newResultTime = Date.now();
      }
      state.interimResult = text;
    },
    addTranslationToFinalResult: (state, action) => {
      const { translation, partId, resultIndex } = action.payload;
      state.parts[partId].results[resultIndex].translation = translation;
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
    resetState: (state) => {
      const fieldsToSkip = ['transcribeLang', 'translateLang', 'playbackSpeed'];
      const newState = {};
      for (const field of Object.keys(initialState)) {
        if (fieldsToSkip.includes(field)) {
          newState[field] = state[field];
        } else {
          newState[field] = initialState[field];
        }
      }
      return newState;
    },
    setPartAudioUrl: (state, action) => {
      const { partId, audioUrl } = action.payload;
      state.parts[partId].audioUrl = audioUrl;
    },
    loadPart: (state, action) => {
      const { partId, timestamp } = action.payload;
      const src = state.parts[partId].audioUrl;
      const audio = document.querySelector('audio');
      audio.autoplay = false;
      if (audio.src !== src) audio.src = src;
      audio.currentTime = timestamp;
      state.currentTime = timestamp;
      state.currentPartId = partId;
    },
    incrementVersion: (state) => {
      state.version += 1;
    },
    seekTo: (state, action) => {
      let newTime = action.payload;
      if (newTime < 0) newTime = 0;
      const maxTime = state.parts[state.currentPartId].duration;
      if (newTime > maxTime) newTime = maxTime;
      state.currentTime = newTime;
      const audio = document.querySelector('audio');
      audio.currentTime = newTime;
    },
  },
});

const transcribeActions = transcribeSlice.actions;
const transcribeReducer = transcribeSlice.reducer;
const transcribeSelector = (state) => state.transcribe;

export { transcribeActions, transcribeReducer, transcribeSelector };
export { translateFinalResult, openTranscriptsSearch, saveTranscript, openRenameTranscript, openNameTranscript, listTranscripts, deleteTranscript, getTranscript };
