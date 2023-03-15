import React from 'react';
import { useSelector } from 'react-redux';
import { transcribeSelector } from '../../../slices/transcribeSlice';
import { userGqlClient } from '../../../gqlClients/userGqlClient';
import { useDidMountEffect } from '../../../common/stateUtils';

export function SyncTranscriberSettings () {
  const { transcribeLang, translateLang, cutOffType, playbackSpeed } = useSelector(transcribeSelector);

  useDidMountEffect(() => {
    userGqlClient.updateUser({ transcribeLang, translateLang, transcribeCutOffType: cutOffType, playbackSpeed });
  }, [transcribeLang, translateLang, cutOffType, playbackSpeed]);

  return (
    <></>
  );
}
